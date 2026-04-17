function filterGallery(category, btn) {
        document.querySelectorAll('.gallery-tab').forEach(tab => tab.classList.remove('active'));
        if (btn) btn.classList.add('active');
        if (btn) btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        document.querySelectorAll('#gallery-grid .gallery-item').forEach(item => {
            const visible = item.dataset.gallery === category;
            item.style.display = visible ? 'inline-block' : 'none';
        });
        updateGalleryTabsNav();
    }

    function scrollGalleryTabs(direction) {
        const tabs = document.getElementById('gallery-tabs');
        if (!tabs) return;
        const chips = tabs.querySelectorAll('.gallery-tab');
        const fallbackStep = tabs.clientWidth / 2;
        const step = chips.length ? chips[0].offsetWidth + 8 : fallbackStep;
        tabs.scrollBy({ left: direction * step, behavior: 'smooth' });
        setTimeout(updateGalleryTabsNav, 280);
    }

    function updateGalleryTabsNav() {
        const tabs = document.getElementById('gallery-tabs');
        const left = document.getElementById('gallery-nav-left');
        const right = document.getElementById('gallery-nav-right');
        if (!tabs || !left || !right) return;

        const hasOverflow = tabs.scrollWidth > tabs.clientWidth + 2;
        if (!hasOverflow) {
            left.disabled = true;
            right.disabled = true;
            return;
        }

        left.disabled = tabs.scrollLeft <= 2;
        right.disabled = tabs.scrollLeft + tabs.clientWidth >= tabs.scrollWidth - 2;
    }

    function sortGalleryBySize() {
        const grid = document.getElementById('gallery-grid');
        if (!grid) return;

        const categories = ['best-moments', 'projects', 'uiu', 'others'];
        categories.forEach(category => {
            const items = Array.from(grid.querySelectorAll(`.gallery-item[data-gallery="${category}"]`));
            const measured = items.map(item => {
                const img = item.querySelector('img');
                const w = img?.naturalWidth || img?.width || 0;
                const h = img?.naturalHeight || img?.height || 0;
                const area = w * h;
                const ratio = h ? w / h : 1;
                return { item, area, ratio, w, h };
            });

            // Similar/smaller images first, larger resolution images later.
            measured.sort((a, b) => {
                if (a.area !== b.area) return a.area - b.area;
                if (a.ratio !== b.ratio) return a.ratio - b.ratio;
                if (a.w !== b.w) return a.w - b.w;
                return a.h - b.h;
            });

            measured.forEach(entry => grid.appendChild(entry.item));
        });
    }

    function initGallerySorting() {
        const images = Array.from(document.querySelectorAll('#gallery-grid .gallery-item img'));
        if (!images.length) return;

        let pending = images.length;
        const done = () => {
            pending -= 1;
            if (pending === 0) {
                sortGalleryBySize();
                const activeBtn = document.querySelector('.gallery-tab.active');
                const activeCategory = activeBtn?.getAttribute('onclick')?.match(/'([^']+)'/)?.[1] || 'best-moments';
                filterGallery(activeCategory, activeBtn);
            }
        };

        images.forEach(img => {
            if (img.complete) {
                done();
            } else {
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
            }
        });
    }

    filterGallery('best-moments', document.querySelector('.gallery-tab.active'));
    window.addEventListener('resize', updateGalleryTabsNav);
    document.getElementById('gallery-tabs')?.addEventListener('scroll', updateGalleryTabsNav, { passive: true });
    updateGalleryTabsNav();
    initGallerySorting();
