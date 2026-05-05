import { useEffect, useMemo, useState } from 'react';
import legacyHtml from './portfolio.html?raw';

function extractBodyMarkup(rawHtml) {
  const bodyMatch = rawHtml.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch ? bodyMatch[1] : rawHtml;
  return body.replace(/<script[\s\S]*?<\/script>/gi, '');
}

export default function App() {
  const [ready, setReady] = useState(false);

  const bodyMarkup = useMemo(() => extractBodyMarkup(legacyHtml), []);

  useEffect(() => {
    if (window.__legacyPortfolioBooted) {
      setReady(true);
      return undefined;
    }
    window.__legacyPortfolioBooted = true;

    let cancelled = false;

    async function boot() {
      await import('../assets/js/gallery.js');
      await import('../assets/js/modals.js');
      await import('../assets/js/main.js');
      if (!cancelled) {
        setReady(true);
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="react-legacy-shell">
      {!ready ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050507] text-zinc-400 text-sm">
          Loading portfolio...
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: bodyMarkup }} />
      )}
    </div>
  );
}
