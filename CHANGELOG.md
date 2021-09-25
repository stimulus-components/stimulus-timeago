# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.0.0] - 2021-09-25

### Changed

- **Breaking** Upgrading to Stimulus 3 and new `@hotwired/stimulus` package.

## [3.0.0] - 2021-05-04

### Chore

- Adding tests with Jest and JSDom
- Moving from [Snowpack](https://www.snowpack.dev/) to [Vite](https://github.com/vitejs/vite)
- Upgrading Node to 14.16.1
- Defining `date-fns` and `Stimulus` as external dependencies reducing the package size from `51.13kb` to `0.95kb`.
- Using `stimulus` as peer dependencies.

## [2.0.0] - 2020-12-05

### Added

- Support for Stimulus 2.0
- Namespacing warn message in the console.

### Changed

**Breaking** Using the new `values` static property.

```diff
- <time data-controller="timeago" data-timeago-datetime="2018-01-30T09:00" data-timeago-refresh-interval="1000" data-timeago-include-seconds="" data-timeago-add-suffix=""></time>
+ <time data-controller="timeago" data-timeago-datetime-value="2018-01-30T09:00" data-timeago-refresh-interval-value="1000" data-timeago-include-seconds-value="" data-timeago-add-suffix-value=""></time>
```

## [1.2.0] - 2020-11-11

### Added
- Adding `locale` support.

## [1.1.0] - 2020-11-06

### Changed

- Catch`Invalid Date` error and display given value instead

## [1.0.0] - 2020-10-15

### Added

- Adding controller
