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

### POST data to an endpoint (Segment.com)

To save data for historical purposes, set the property `window.timingPostUrl = <host>`

### Setup for Segment.com:

- 0.) Endpoints should now be created via Segment.com (https://segment.com) integration applications and you should be given access to a Segment.com account via our Turner account to get started: (contact: Prabhu.Duraisamy@turner.com or AD.Slaton@turner.com)
- 1.) lazy load or application initialize your Segment.com client SDK into your application
- 2.) Be sure that you've got module or global access to the two following variables: performanceMetricsArr (to hold metrics under lazy loading is complete) and analytics (for Segment.com)
- 3.) log your metrics as they come through and test the metrics are coming through the debugger in Segment.com dashboard

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
