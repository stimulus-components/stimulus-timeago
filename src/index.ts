import { Controller } from "@hotwired/stimulus"
import { formatDistanceToNow, FormatDistanceToNowOptions, Locale } from "date-fns"

export default class extends Controller<HTMLTimeElement> {
  isValid: boolean
  refreshTimer: number
  locale: Pick<Locale, "formatDistance">

  hasRefreshIntervalValue: boolean
  datetimeValue: string
  addSuffixValue: boolean
  includeSecondsValue: boolean
  refreshIntervalValue: number

  static values = {
    datetime: String,
    refreshInterval: Number,
    includeSeconds: Boolean,
    addSuffix: Boolean,
  }

  initialize(): void {
    this.isValid = true
  }

  connect(): void {
    this.load()

    if (this.hasRefreshIntervalValue && this.isValid) {
      this.startRefreshing()
    }
  }

  disconnect(): void {
    this.stopRefreshing()
  }

  load(): void {
    const datetime: string = this.datetimeValue
    const date: number = Date.parse(datetime)
    const options: FormatDistanceToNowOptions = {
      includeSeconds: this.includeSecondsValue,
      addSuffix: this.addSuffixValue,
      locale: this.locale,
    }

    if (Number.isNaN(date)) {
      this.isValid = false

      console.error(
        `[@stimulus-components/timeago] Value given in 'data-timeago-datetime' is not a valid date (${datetime}). Please provide a ISO 8601 compatible datetime string. Displaying given value instead.`,
      )
    }

    this.element.dateTime = datetime
    this.element.innerHTML = this.isValid ? formatDistanceToNow(date, options) : datetime
  }

  startRefreshing(): void {
    this.refreshTimer = setInterval(() => {
      this.load()
    }, this.refreshIntervalValue)
  }

  stopRefreshing(): void {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  }
}
