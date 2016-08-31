# Timing

> A client timing module that passes [Navigation Timing](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API) data to an endpoint

## Installation

### Bower

```
$ bower install navigation-timing
```

### Download

Download the [latest](https://github.com/cnnlabs/navigation-timing/archive/master.zip)

## Usage

Gathers `window.performance.timing` data after the `window.onload` event fires.

### Debug

To set debug pass the query string value `?debug=true`. This will allow logs
to be shown in the browser console.

### POST data to an endpoint

To save data for historical purposes, set the property `window.timingPostUrl = <host>`

### Example

1. Run your favorite static server
2. Load /example/index.html
3. See Navigation Timing and DOMContentLoaded output

```
// Navigation Timing
connectEnd: 1472492033017
connectStart: 1472492033016
domComplete: 1472492033242
domContentLoadedEventEnd: 1472492033156
domContentLoadedEventStart: 1472492033156
domInteractive: 1472492033156
domLoading: 1472492033025
domainLookupEnd: 1472492033016
domainLookupStart: 1472492033016
fetchStart: 1472492033003
loadEventEnd: 1472492033261
loadEventStart: 1472492033247
navigationStart: 1472492033003
redirectEnd: 0
redirectStart: 0
requestStart: 1472492033017
responseEnd: 1472492033019
responseStart: 1472492033017
secureConnectionStart: 0
unloadEventEnd: 1472492033019
unloadEventStart: 1472492033019
```

```
// DOMContentLoaded
Page load time: 239ms
```
