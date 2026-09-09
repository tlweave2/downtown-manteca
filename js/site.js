/* Shared site behaviour. The old per-page version toggled inline
   style.display, which fought the stylesheet; visibility is CSS's job here
   and this only manages the .active class. */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        var hamburger = document.querySelector('.hamburger');
        var navLinks = document.querySelector('.nav-links');
        if (!hamburger || !navLinks) return;

        function setOpen(open) {
            navLinks.classList.toggle('active', open);
            hamburger.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        }

        hamburger.addEventListener('click', function () {
            setOpen(!navLinks.classList.contains('active'));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setOpen(false); });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                setOpen(false);
                hamburger.focus();
            }
        });

        document.addEventListener('click', function (e) {
            if (!navLinks.classList.contains('active')) return;
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) setOpen(false);
        });

        // Leaving the mobile breakpoint should never strand the menu open
        window.matchMedia('(min-width: 769px)').addEventListener('change', function (e) {
            if (e.matches) setOpen(false);
        });
    });
})();
