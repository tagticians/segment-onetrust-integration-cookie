// Configuration variables
const WEBSITE_WRITE_KEY = "sWc0wPbdtdU9QRRvJrNlow8Hnp7wPXXx"; // Your segment website source write key
const INDOMAIN_INSTRUMENTATION_URL = "https://cdn.segment.com/analytics.js/v1/" + WEBSITE_WRITE_KEY + "/analytics.min.js"; // Update to your CNAME if using Indomain Instrumentation

// Segment Analytics.js SDK without default .load calls
!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src=INDOMAIN_INSTRUMENTATION_URL;var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey=WEBSITE_WRITE_KEY;;analytics.SNIPPET_VERSION="4.15.3";
analytics.load(WEBSITE_WRITE_KEY);
}}();

window.analytics.ready(() => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // No Cookie Failsafe
    let consent_onetrust = "";

    // Grab OptanonConsent cookie value
    let cookie_OptanonConsent = getCookie("OptanonConsent");
    if (typeof cookie_OptanonConsent != 'undefined') {
        cookie_OptanonConsent = decodeURIComponent(cookie_OptanonConsent);
        // Get 'groups' from OptanonConsent cookie
        if (cookie_OptanonConsent.indexOf('&groups=') > -1) {
            consent_onetrust = cookie_OptanonConsent.split('&groups=')[1].split('&')[0];
        }
    }

    // Register OneTrust Integration plugin
    window.analytics.register({
        name: 'OneTrust Integration Cookie',
        version: '0.1.0',
        type: 'enrichment',
        isLoaded: () => true,
        load: () => Promise.resolve(),
        // context object and reference to the analytics.js instance
        page: (ctx) => {
            ctx.updateEvent(ctx.event.context['consent'] = { 'onetrust': consent_onetrust });
            return ctx
        },
        track: (ctx) => {
            ctx.updateEvent(ctx.event.context['consent'] = { 'onetrust': consent_onetrust });
            return ctx
        },
        identify: (ctx) => {
            ctx.updateEvent(ctx.event.context['consent'] = { 'onetrust': consent_onetrust });
            return ctx
        }
    });

    // Send Pageview
    analytics.page();
});
