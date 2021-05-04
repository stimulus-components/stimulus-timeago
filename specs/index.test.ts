import { waitFor } from '@testing-library/dom'
import { Application } from 'stimulus'
import Timeago from '../src/index'

const startStimulus = () => {
  const application = Application.start()
  application.register('timeago', Timeago)
}

const spyError = jest.spyOn(console, 'error')

const lastMonth: Date = new Date()
lastMonth.setMonth(lastMonth.getMonth() - 1)

const fewSecondsAgo: Date = new Date()
fewSecondsAgo.setSeconds(fewSecondsAgo.getSeconds() - 8)

describe('#load', () => {
  beforeEach(() => {
    spyError.mockReset()

    startStimulus()

    document.body.innerHTML = `
      <time
        data-controller="timeago"
        data-timeago-datetime-value="${lastMonth.toISOString()}"
      ></time>.
    `
  })

  it('updates the dateTime attribute', async () => {
    const time: HTMLTimeElement = document.querySelector('time')

    await waitFor(() => {
      expect(time.getAttribute('datetime')).toBe(lastMonth.toISOString())
    })
  })

  it('updates the innerText', async () => {
    const time: HTMLTimeElement = document.querySelector('time')

    await waitFor(() => {
      expect(time.textContent).toBe('about 1 month')
    })
  })

  it('updates the innerText with suffix', async () => {
    document.body.innerHTML = `
      <time
        data-controller="timeago"
        data-timeago-datetime-value="${lastMonth.toISOString()}"
        data-timeago-add-suffix-value=""
      ></time>.
    `

    await waitFor(() => {
      const time: HTMLTimeElement = document.querySelector('time')

      expect(time.textContent).toBe('about 1 month ago')
    })
  })

  it('updates the innerText with seconds', async () => {
    document.body.innerHTML = `
      <time
        data-controller="timeago"
        data-timeago-datetime-value="${fewSecondsAgo.toISOString()}"
        data-timeago-include-seconds-value=""
      ></time>.
    `

    await waitFor(() => {
      const time: HTMLTimeElement = document.querySelector('time')

      expect(time.textContent).toBe('less than 10 seconds')
    })
  })

  it('does not update innerText', async () => {
    document.body.innerHTML = `
      <time
        data-controller="timeago"
        data-timeago-datetime-value="invalidDate"
      ></time>.
    `

    const time: HTMLTimeElement = document.querySelector('time')

    await waitFor(() => {
      expect(time.textContent).toBe('invalidDate')
      expect(console.error).toHaveBeenLastCalledWith(
        "[stimulus-timeago] Value given in 'data-timeago-datetime' is not a valid date (invalidDate). Please provide a ISO 8601 compatible datetime string. Displaying given value instead."
      )
    })
  })
})
