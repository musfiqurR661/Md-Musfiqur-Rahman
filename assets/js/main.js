// CURSOR
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; cursor.style.left = mx - 5 + 'px'; cursor.style.top = my - 5 + 'px'; });
    function animateRing() { rx += (mx - rx - 18) * 0.12; ry += (my - ry - 18) * 0.12; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(animateRing); }
    animateRing();
    document.querySelectorAll('a, button, [onclick], .card, .proj-card, .cert-card, .exp-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'scale(2.5)'; ring.style.transform = 'scale(1.4)'; ring.style.borderColor = '#f59e0b'; });
        el.addEventListener('mouseleave', () => { cursor.style.transform = 'scale(1)'; ring.style.transform = 'scale(1)'; ring.style.borderColor = 'rgba(245,158,11,0.5)'; });
    });

    // STARS
    const canvas = document.getElementById('stars-canvas');
    const ctx = canvas.getContext('2d');
    let stars = [];
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    function createStars() { stars = []; for (let i = 0; i < 160; i++) { stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.2, a: Math.random(), s: 0.001 + Math.random() * 0.003 }); } }
    function drawStars() { ctx.clearRect(0, 0, canvas.width, canvas.height); stars.forEach(s => { s.a += s.s; if (s.a > 1 || s.a < 0) s.s *= -1; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${s.a * 0.5})`; ctx.fill(); }); requestAnimationFrame(drawStars); }
    resizeCanvas(); createStars(); drawStars();
    window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

    // SCROLL PROGRESS
    window.addEventListener('scroll', () => { const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100; document.getElementById('scroll-progress').style.width = pct + '%'; });

    // SCROLL REVEAL
    const revealObserver = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // SKILL BARS
    const skillObserver = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.skill-bar-fill').forEach(bar => { setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 200); }); } }); }, { threshold: 0.3 });
    const skillSection = document.getElementById('skill-bars');
    if (skillSection) skillObserver.observe(skillSection.closest('section') || skillSection);

    // TYPING
    const phrases = ['AI & Machine Learning', 'Computer Vision', 'Robotics & Embedded Systems', 'Biomedical Informatics', 'Deep Learning Research'];
    let pi = 0, ci = 0, deleting = false;
    const el = document.getElementById('typed-text');
    function type() { const current = phrases[pi]; if (!deleting) { el.textContent = current.slice(0, ++ci); if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; } } else { el.textContent = current.slice(0, --ci); if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; } } setTimeout(type, deleting ? 45 : 75); }
    type();

    // DHAKA LOCAL TIME (for profile modal)
    function updateDhakaTime() {
        const timeEl = document.getElementById('dhaka-time');
        if (!timeEl) return;
        const nowInDhaka = new Date().toLocaleTimeString('en-GB', {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeEl.textContent = `Now: ${nowInDhaka}`;
    }
    updateDhakaTime();
    setInterval(updateDhakaTime, 1000);

    // NAV ACTIVE
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navObserver = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); }); } }); }, { threshold: 0.5 });
    sections.forEach(s => navObserver.observe(s));

        let homeSettleDone = false;
        function settleHomeLanding() {
            if (homeSettleDone) return;
            homeSettleDone = true;
            const release = () => {
                document.documentElement.classList.remove('home-lock');
                document.documentElement.style.visibility = '';
                document.documentElement.style.overflow = '';
            };

            const ensureHomeTop = () => {
                const home = document.getElementById('home');
                if (!window.location.hash) {
                    const homeUrl = `${window.location.pathname}${window.location.search}#home`;
                    history.replaceState(null, '', homeUrl);
                }
                if (home) {
                    home.scrollIntoView({ behavior: 'auto', block: 'start' });
                }
                window.scrollTo(0, 0);
                requestAnimationFrame(() => {
                    window.scrollTo(0, 0);
                    release();
                });
            };

            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(() => requestAnimationFrame(ensureHomeTop));
                return;
            }
            requestAnimationFrame(ensureHomeTop);
        }

        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            settleHomeLanding();
        } else {
            document.addEventListener('DOMContentLoaded', settleHomeLanding, { once: true });
        }

        window.addEventListener('hashchange', () => {
            if (!window.location.hash) {
                history.replaceState(null, '', `${window.location.pathname}${window.location.search}#home`);
            }
        });

    // Keep section flow aligned with navigation intent.
    const gallerySection = document.getElementById('gallery');
    const githubSection = document.getElementById('github');
    if (gallerySection && githubSection && gallerySection.nextElementSibling !== githubSection) {
        gallerySection.insertAdjacentElement('afterend', githubSection);
    }

    const certsSection = document.getElementById('certs');
    const resumeSection = document.getElementById('resume');
    if (certsSection && resumeSection && certsSection.nextElementSibling !== resumeSection) {
        certsSection.insertAdjacentElement('afterend', resumeSection);
    }

window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing-resume');
    });

    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), { max: 6, speed: 400, glare: true, 'max-glare': 0.08 });

    // GitHub images fallback: replace failed images with a link card
    function ensureGithubImageFallback() {
        const ids = ['github-stats-live', 'github-streak-live'];
        ids.forEach(id => {
            const img = document.getElementById(id);
            if (!img) return;

            function replaceWithLink() {
                const a = document.createElement('a');
                a.href = 'https://github.com/musfiqurR661';
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'card p-6 flex items-center justify-center';
                a.innerHTML = `
                    <div class="w-full flex flex-col md:flex-row items-center gap-4">
                        <div class="flex-1">
                            <p class="text-xs uppercase text-zinc-500">Profile Snapshot</p>
                            <h3 class="font-display text-lg text-white font-bold">musfiqurR661</h3>
                            <p class="text-sm text-zinc-400 mt-2">Open source, research repositories, and production-ready backend systems. Visit the profile to explore projects, contributions, and live demos.</p>
                        </div>
                        <div class="flex-shrink-0">
                            <span class="btn-outline !px-5 !py-3">Open GitHub Profile</span>
                        </div>
                    </div>
                `;
                img.replaceWith(a);
            }

            img.addEventListener('error', replaceWithLink);

            // If image is already loaded but failed (naturalWidth==0), trigger replacement
            setTimeout(() => {
                if (img.complete && (!img.naturalWidth || img.naturalWidth === 0)) {
                    replaceWithLink();
                }
            }, 1200);
        });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        ensureGithubImageFallback();
    } else {
        document.addEventListener('DOMContentLoaded', ensureGithubImageFallback, { once: true });
    }
