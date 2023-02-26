!function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://evs.sdns.prio4.com/yvbu21dbeC/go18rexsDtdqGBkYKzwMq.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="Bj8l9tfy18TcGSOckGO9nm6RGkTWTWLB";analytics._cdn = "https://evs.sdns.prio4.com";analytics.SNIPPET_VERSION="4.15.3";
analytics.load("Bj8l9tfy18TcGSOckGO9nm6RGkTWTWLB");
}}();  

window.analytics.ready(() => {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Grab OptanonConsent cookie value
    let cookie_OptanonConsent = decodeURIComponent(getCookie("OptanonConsent"));
    
    // Set Default for Strictly Necessary Consent
    let consent_onetrust = "C0001:1";

    // Check for additional consent
    if (cookie_OptanonConsent.indexOf('&groups=') > -1) {
        consent_onetrust = cookie_OptanonConsent.split('&groups=')[1].split('&')[0];
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
    })

    // Send Pageview
    analytics.page();
});
