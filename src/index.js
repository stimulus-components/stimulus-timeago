import { Controller } from 'stimulus'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default class extends Controller {
  connect () {
    this.load()

    if (this.data.has('refreshInterval')) {
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

    this.element.dateTime = date
    this.element.innerHTML = formatDistanceToNow(Date.parse(date), options)
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
