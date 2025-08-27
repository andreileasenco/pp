(function () {
    var hamburger = document.getElementById('hamburger');
    var mobileMenu = document.getElementById('mobile-menu');
    var closeBtn = document.getElementById('mobile-menu-close');

    if (!hamburger || !mobileMenu || !closeBtn) return;

    function openMenu() {
        mobileMenu.classList.add('is-open');
        hamburger.classList.add('is-active');
        mobileMenu.setAttribute('aria-hidden', 'false');
        hamburger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        // Hide hamburger while menu is open to avoid duplicate close icons
        hamburger.style.display = 'none';
    }

    function closeMenu() {
        mobileMenu.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        mobileMenu.setAttribute('aria-hidden', 'true');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        // Restore hamburger display on close
        hamburger.style.display = 'inline-flex';
    }

    hamburger.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.contains('is-open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeBtn.addEventListener('click', closeMenu);

    mobileMenu.addEventListener('click', function (e) {
        if (e.target === mobileMenu) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
})();
