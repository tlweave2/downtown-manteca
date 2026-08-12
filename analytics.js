// Downtown Manteca — site analytics (Google Analytics 4)
//
// ---------------------------------------------------------------------------
// SETUP: paste your GA4 Measurement ID below, then commit.
//
//   1. Go to analytics.google.com and create a property for downtownmanteca.com
//   2. Admin -> Data Streams -> add a Web stream for https://downtownmanteca.com
//   3. Copy the Measurement ID (it looks like G-ABC1234XYZ)
//   4. Replace the empty string below with it
//
// Until an ID is set, this file does nothing at all: no network requests, no
// console errors, no visible change for visitors. That is deliberate — an
// unconfigured tracker should stay silent rather than break the page.
// ---------------------------------------------------------------------------

var GA_MEASUREMENT_ID = '';

(function () {
    'use strict';

    // Nothing configured yet — stop here, quietly.
    if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('G-') !== 0) {
        return;
    }

    // --- Standard GA4 bootstrap -------------------------------------------
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(tag);

    // GA4's built-in enhanced measurement already records page views, scrolls,
    // outbound link clicks, and downloads of files whose URL ends in a known
    // extension (.pdf, .docx, ...). Everything below covers only what it misses
    // on this site. Do not re-track outbound clicks here or they double-count.

    // --- Google Drive downloads -------------------------------------------
    // Links built by meeting-minutes.html look like
    //   https://drive.google.com/uc?id=FILE_ID&export=download
    // There is no file extension in that URL, so GA4's automatic file_download
    // event never fires for them. Catch them by hand.
    //
    // Note: this cannot see downloads started inside the Google Drive iframes
    // on documents.html. Those clicks happen in a cross-origin frame and are
    // invisible to any script on this page — the only fix is to replace those
    // embeds with real links.
    function isDriveDownload(url) {
        return url.indexOf('drive.google.com') !== -1 &&
               (url.indexOf('export=download') !== -1 || url.indexOf('/uc?') !== -1);
    }

    // Delegated so it also covers links rendered later by JavaScript.
    document.addEventListener('click', function (e) {
        var link = e.target.closest ? e.target.closest('a[href]') : null;
        if (!link) { return; }

        var href = link.getAttribute('href') || '';
        if (!isDriveDownload(href)) { return; }

        // Prefer the document title shown in the list over the opaque file id.
        var card = link.closest('.doc-card, .doc-list-item, .list-item');
        var title = card ? card.querySelector('.doc-title, .list-title') : null;

        gtag('event', 'file_download', {
            file_name: title ? title.textContent.trim() : 'Google Drive document',
            file_extension: 'drive',
            link_url: href
        });
    });

    // --- Form submissions --------------------------------------------------
    // Worth tracking even though neither form currently delivers anything:
    // these counts measure how many people TRIED to reach DMIA and got a
    // "thanks, we'll be in touch" message that went nowhere. That number is
    // the argument for wiring the forms up to a real backend.
    function trackSubmit(form, eventName) {
        if (!form) { return; }
        form.addEventListener('submit', function () {
            gtag('event', eventName, { form_id: form.id || form.className || 'unnamed' });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        trackSubmit(document.getElementById('contact-form'), 'contact_form_submit');
        trackSubmit(document.querySelector('.newsletter-form'), 'newsletter_signup');
    });
})();
