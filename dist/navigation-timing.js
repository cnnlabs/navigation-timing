/* jshint browser: true, node: false */

window.NTAPI = window.NTAPI || {};

(function () {
    'use strict';

    function mergeMetrics(base, diff) {
        var i,
            prop,
            props = [],
            result = {};

        if (typeof base === 'object') {
            for (prop in base) {
                if (base.hasOwnProperty(prop)) {
                    props.push(prop);
                }
            }
        }

        if (typeof diff === 'object') {
            for (prop in diff) {
                if (diff.hasOwnProperty(prop)) {
                    if (props.indexOf(prop) < 0) {
                        props.push(prop);
                    }
                }
            }
        }

        props.sort();

        for (i = 0; i < props.length; i++) {
            prop = props[i];
            if (typeof diff[prop] === 'undefined') {
                result[prop] = base[prop];
            } else if (typeof base[prop] === 'undefined') {
                result[prop] = diff[prop];
            } else if (typeof diff[prop] === 'object' && !Array.isArray(diff[prop]) && !Array.isArray(base[prop])) {
                result[prop] = mergeMetrics(base[prop], diff[prop]);
            } else {
                result[prop] = diff[prop];
            }
        }

        return result;
    }

    function getDomContentLoaded(perf) {
        var complete = perf.domComplete - perf.navigationStart;

        if (window.debug) {
            console.log(document.readyState);
            console.log('Page load time: ' + complete + 'ms');
        }

        return complete;
    }

    /* These are values that should be sent with every API Post */
    function baseMetrics() {
        var now = new Date(),
            metrics = {
                navigator: (window.navigator ? window.navigator : {}),
                timing: {
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
                dimensions: {
                    width: (window.innerWidth ? window.innerWidth : 0),
                    height: (window.innerHeight ? window.innerHeight : 0)
                }
            };

        return metrics;
    }

    function postMetrics(metrics) {
        metrics = metrics || {};

        /* combine custom metrics with base metrics */
        metrics = mergeMetrics(baseMetrics(), metrics);

        if (window.debug) {
            console.log('Navigation Timing posting metrics:');
            console.log(metrics);
        }

        if (metrics.type && window.NTAPI.PostUrl) {
            var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
            xmlhttp.open('POST', window.NTAPI.PostUrl);
            xmlhttp.setRequestHeader('Content-Type', 'application/json');
            xmlhttp.send(JSON.stringify(metrics));
        } else if (window.debug) {
            console.log('Navigation Timing Settings Definition Error. Metrics Type:', metrics.type, 'PostUrl:', window.NTAPI.PostUrl);
        }
    }

    /* get the metrics we have after page load */
    function postMetricsOnLoad() {
        var metrics = {
                type: 'onLoad',
                complete: '',
                timing: {
                    performance: ((window.performance && window.performance.timing) ? window.performance.timing : {})
                }
            },
            debug = (window.location.search.indexOf('debug=true') > -1) || false;

        window.debug = debug;

        metrics.complete = getDomContentLoaded(metrics.timing.performance);

        postMetrics(metrics);

        return metrics;
    }

    if (window.addEventListener) {
        window.addEventListener('load', postMetricsOnLoad);
    } else {
        window.attachEvent('onload', postMetricsOnLoad);
    }

    window.NTAPI.postMetrics = postMetrics;
})();
