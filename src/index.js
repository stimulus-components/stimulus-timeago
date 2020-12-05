import { Controller } from 'stimulus'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class extends Controller {
  static values = {
    datetime: String,
    refreshInterval: Number,
    includeSeconds: Boolean,
    addSuffix: Boolean
  }

  initialize () {
    this.isValid = true
  }

  connect () {
    this.load()

    if (this.hasRefreshIntervalValue && this.isValid) {
      this.startRefreshing()
    }
  }

  disconnect () {
    this.stopRefreshing()
  }

  load () {
    const datetime = this.datetimeValue
    const date = Date.parse(datetime)
    const options = {
      includeSeconds: this.hasIncludeSecondsValue,
      addSuffix: this.hasAddSuffixValue,
      locale: this.locale
    }

    if (Number.isNaN(date)) {
      this.isValid = false

      console.error(
        `[stimulus-timeago] Value given in 'data-timeago-datetime' is not a valid date (${datetime}). Please provide a ISO 8601 compatible datetime string. Displaying given value instead.`
      )
    }

    this.element.dateTime = datetime
    this.element.innerHTML = this.isValid ? formatDistanceToNow(date, options) : datetime
  }

  startRefreshing () {
    this.refreshTimer = setInterval(() => {
      this.load()
    }, this.refreshIntervalValue)
  }

  stopRefreshing () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}
