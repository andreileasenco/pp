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

(function () {
    function initializeCarousel(track) {
        if (!track || track.__isCarousel) return;

        // Add class to track
        track.classList.add('carousel-track');

        // Use parent as container for positioning arrows
        var container = track.parentElement;
        if (!container) return;
        container.classList.add('carousel');

        // Create buttons
        var prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.className = 'carousel-btn carousel-btn--prev';
        prevBtn.setAttribute('aria-label', 'Предыдущие');
        prevBtn.textContent = '‹';

        var nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.className = 'carousel-btn carousel-btn--next';
        nextBtn.setAttribute('aria-label', 'Следующие');
        nextBtn.textContent = '›';

        container.appendChild(prevBtn);
        container.appendChild(nextBtn);

        function updateButtons() {
            var maxScrollLeft = track.scrollWidth - track.clientWidth;
            if (maxScrollLeft <= 0) {
                prevBtn.disabled = true;
                nextBtn.disabled = true;
                return;
            }
            prevBtn.disabled = track.scrollLeft <= 1;
            nextBtn.disabled = track.scrollLeft >= maxScrollLeft - 1;
        }

        function scrollByPage(dir) {
            var delta = dir * track.clientWidth;
            track.scrollBy({ left: delta, behavior: 'smooth' });
        }

        prevBtn.addEventListener('click', function () { scrollByPage(-1); });
        nextBtn.addEventListener('click', function () { scrollByPage(1); });
        track.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);

        // Initial state
        updateButtons();

        track.__isCarousel = true;
    }

    function initAllCarousels() {
        var selectors = [
            '.afisha-cards',
            '.news-cards',
            '.jobs-list',
            '.ads-list',
            '.services-list',
            '.tasks-list'
        ];
        for (var i = 0; i < selectors.length; i++) {
            var elements = document.querySelectorAll(selectors[i]);
            for (var j = 0; j < elements.length; j++) {
                initializeCarousel(elements[j]);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllCarousels);
    } else {
        initAllCarousels();
    }
})();
