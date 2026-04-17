function extractContributionCount(payload) {
        if (!payload || typeof payload !== 'object') return null;

        if (typeof payload.total === 'number' && Number.isFinite(payload.total)) {
            return payload.total;
        }

        if (payload.total && typeof payload.total === 'object') {
            const vals = Object.values(payload.total).filter(v => typeof v === 'number' && Number.isFinite(v));
            if (vals.length) return vals.reduce((sum, v) => sum + v, 0);
        }

        const days = payload.contributions || payload.days || payload.weeks;
        if (Array.isArray(days)) {
            let sum = 0;
            for (const item of days) {
                if (typeof item === 'number') sum += item;
                if (item && typeof item === 'object') {
                    if (typeof item.count === 'number') sum += item.count;
                    if (Array.isArray(item.contributionDays)) {
                        for (const d of item.contributionDays) {
                            if (d && typeof d.contributionCount === 'number') sum += d.contributionCount;
                            if (d && typeof d.count === 'number') sum += d.count;
                        }
                    }
                }
            }
            if (sum > 0) return sum;
        }

        return null;
    }

    async function loadLiveContributionCount() {
        const countEl = document.getElementById('hero-contrib-count');
        const labelEl = document.getElementById('hero-contrib-label');
        if (!countEl || !labelEl) return;

        const endpoints = [
            'https://github-contributions-api.jogruber.de/v4/musfiqurR661'
        ];

        for (const endpoint of endpoints) {
            try {
                const res = await fetch(endpoint, { cache: 'no-store' });
                if (!res.ok) continue;
                const data = await res.json();
                const count = extractContributionCount(data);
                if (typeof count === 'number' && count >= 0) {
                    countEl.textContent = `${count.toLocaleString()}+`;
                    labelEl.textContent = 'GitHub Contributions';
                    return;
                }
            } catch (err) {
                // Try next endpoint silently.
            }
        }

        countEl.textContent = 'Live';
        labelEl.textContent = 'GitHub Contributions';
    }

    loadLiveContributionCount();
    setInterval(loadLiveContributionCount, 1000 * 60 * 30);

    function refreshGitHubWidgets() {
        const stamp = `t=${Date.now()}`;
        const withStamp = (url) => `${url}${url.includes('?') ? '&' : '?'}${stamp}`;

        const stats = document.getElementById('github-stats-live');
        const streak = document.getElementById('github-streak-live');
        const graph = document.querySelector('#github img[alt="GitHub Contribution Graph"]');

        if (stats && stats.src) stats.src = withStamp(stats.src.split('&t=')[0].split('?t=')[0]);
        if (streak && streak.src) streak.src = withStamp(streak.src.split('&t=')[0].split('?t=')[0]);
        if (graph && graph.src) graph.src = withStamp(graph.src.split('&t=')[0].split('?t=')[0]);
    }

    setTimeout(refreshGitHubWidgets, 1500);
    setInterval(refreshGitHubWidgets, 1000 * 60 * 10);
