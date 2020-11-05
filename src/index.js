import { Controller } from 'stimulus'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class extends Controller {
  static isValid = true

  connect () {
    this.load()

    if (this.data.has('refreshInterval') && this.isValid) {
      this.startRefreshing()
    }
  }

  disconnect () {
    this.stopRefreshing()
  }

  load () {
    const date = this.data.get('datetime')
    const options = {
      includeSeconds: this.data.has('includeSeconds') || false,
      addSuffix: this.data.has('addSuffix') || false
    }

    let formattedDate
    try {
      formattedDate = formatDistanceToNow(Date.parse(date), options)
    } catch (e) {
      if (e instanceof RangeError) {
        formattedDate = date
        this.isValid = false
        console.error(
          `Value given in "data-timeago-datetime" is not a valid date (${date}). Please provide a ISO 8601 compatible datetime string. Displaying given value instead.`
        )
      } else {
        throw e
      }
    }

    this.element.dateTime = date
    this.element.innerHTML = formattedDate
  }

  startRefreshing () {
    this.refreshTimer = setInterval(() => {
      this.load()
    }, this.data.get('refreshInterval'))
  }

  stopRefreshing () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}
