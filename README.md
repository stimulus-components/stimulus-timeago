# Stimulus Timeago

[![](https://img.shields.io/npm/dt/stimulus-timeago.svg)](https://www.npmjs.com/package/stimulus-timeago)
[![](https://img.shields.io/npm/v/stimulus-timeago.svg)](https://www.npmjs.com/package/stimulus-timeago)
[![](https://github.com/stimulus-components/stimulus-timeago/workflows/Lint/badge.svg)](https://github.com/stimulus-components/stimulus-timeago)
[![](https://img.shields.io/github/license/stimulus-components/stimulus-timeago.svg)](https://github.com/stimulus-components/stimulus-timeago)
[![Netlify Status](https://api.netlify.com/api/v1/badges/d62d950e-aae7-464d-8333-1078a16ec481/deploy-status)](https://stimulus-timeago.netlify.com)

## Getting started

A Stimulus controller that returns the distance between the given date and now in words.

This controller is using [date-fns/formatDistanceToNow](https://date-fns.org/v2.2.1/docs/formatDistanceToNow) behind the scene.

## Installation

```bash
$ yarn add stimulus-timeago
```

And use it in your JS file:
```js
import { Application } from "stimulus"
import Timeago from "stimulus-timeago"

const application = Application.start()
application.register("timeago", Timeago)
```

## Usage

In your view:
```html
<p>
  Stimulus 1.0.0 was released
  <time data-controller="timeago" data-timeago-datetime="2018-01-30T09:00"></time>.
</p>
```

## Configuration

| Attribute | Default | Description | Optional |
| --------- | ------- | ----------- | -------- |
| `data-timeago-datetime` | `undefined` | String that can be parsed by `Date.parse()`. | ❌ |
| `data-timeago-refresh-interval` | `undefined` | Interval in milliseconds to reload the distance. | ✅ |
| `data-timeago-include-seconds` | `false` | Distances less than a minute are more detailed | ✅ |
| `data-timeago-add-suffix` | `false` | Result specifies if now is earlier or later than the passed date | ✅ |

`includeSeconds` and `addSuffix` are the options of the [date-fns/formatDistanceToNow](https://date-fns.org/v2.2.1/docs/formatDistanceToNow) method.

If the datetime string passed via `data-timeago-datetime` is not parseable by `Date.parse()` it will display the given value instead.

## Extending Controller

You can use inheritance to extend the functionality of any Stimulus components.

```js
import Timeago from "stimulus-timeago"

export default class extends Timeago {
  connect() {
    super.connect()
    console.log("Do what you want here.")
  }
}
```

These controllers will automatically have access to targets defined in the parent class.

If you override the connect, disconnect or any other methods from the parent, you'll want to call `super.method()` to make sure the parent functionality is executed.

## Development

### Project setup
```bash
$ yarn install
$ yarn dev
```

### Linter
[Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) are responsible to lint and format this component:
```bash
$ yarn lint
$ yarn format
```

## Contributing

Do not hesitate to contribute to the project by adapting or adding features ! Bug reports or pull requests are welcome.

## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
