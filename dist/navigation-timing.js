'use strict';

function getDomContentLoaded(perf) {
    var complete = perf.domComplete - perf.navigationStart;

    if (window.debug) {
        console.log(document.readyState);
        console.log(perf);
        console.log('Page load time: ' + complete + 'ms');
    }

    return complete;
}

function postMetrics(metrics) {
    if (metrics && window.timingPostUrl) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open('POST', window.timingPostUrl);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(JSON.stringify(metrics));
    }
}

function getMetrics() {
    var now = new Date(),
        metrics = {
            timing: {
                performance: ((window.performance && window.performance.timing) ? window.performance.timing : {}),
                location: {
                    hash: window.location.hash,
                    host: window.location.host,
                    href: window.location.href,
                    origin: window.location.origin,
                    pathname: window.location.pathname,
                    search: window.location.search
                },
                date: {
                    formatted: now,
                    ts: now.getTime()
                }
            },
            complete: ''
        },
        debug = (window.location.search.indexOf('debug=true') > -1) || false;

    window.debug = debug;

    if (window.debug) {
        console.log('Performance timing:');
        console.log(metrics.timing);
    }

    metrics.complete = getDomContentLoaded(metrics.timing.performance);

    postMetrics(metrics);

    return metrics;
}

if (window.addEventListener) {
    window.addEventListener('load', getMetrics);
} else {
    window.attachEvent('onload', getMetrics);
}
