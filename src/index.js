import { Controller } from 'stimulus'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class extends Controller {
  initialize () {
    this.isValid = true
  }

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
    const datetime = this.data.get('datetime')
    const date = Date.parse(datetime)
    const options = {
      includeSeconds: this.data.has('includeSeconds') || false,
      addSuffix: this.data.has('addSuffix') || false
    }

    if (Number.isNaN(date)) {
      this.isValid = false

      console.error(
        `Value given in 'data-timeago-datetime' is not a valid date (${datetime}). Please provide a ISO 8601 compatible datetime string. Displaying given value instead.`
      )
    }

    this.element.dateTime = datetime
    this.element.innerHTML = this.isValid ? formatDistanceToNow(date, options) : datetime
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
