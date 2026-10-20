"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { DISCORD_INVITE_URL, DISCORD_WIDGET_URL } from "@/lib/site-config";
import { communityCopy } from "@/lib/community-copy";

function DiscordMark() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52l-.6 1.23a18.43 18.43 0 0 0-5.66 0l-.62-1.23a19.74 19.74 0 0 0-4.89 1.53C.57 8.97-.27 13.45.15 17.87a19.9 19.9 0 0 0 6 3.03l1.29-2.09a12.7 12.7 0 0 1-2.02-.98l.5-.39c3.88 1.79 8.1 1.79 11.93 0l.51.39c-.65.39-1.33.72-2.03.99l1.29 2.08a19.8 19.8 0 0 0 6-3.03c.5-5.12-.85-9.56-3.3-13.5ZM8.02 15.16c-1.17 0-2.13-1.07-2.13-2.39s.94-2.39 2.13-2.39c1.2 0 2.15 1.08 2.13 2.39 0 1.32-.94 2.39-2.13 2.39Zm7.96 0c-1.17 0-2.13-1.07-2.13-2.39s.94-2.39 2.13-2.39c1.2 0 2.15 1.08 2.13 2.39 0 1.32-.93 2.39-2.13 2.39Z" /></svg>;
}

export function DiscordCommunity() {
  const { i18n } = useTranslation();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => setActive(visible && !document.hidden && !reduced.matches);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(element);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
  const c = communityCopy[i18n.language as keyof typeof communityCopy] ?? communityCopy.es;

  return (
    <section ref={root} className="wc-section wc-community" id="comunidad" aria-labelledby="community-title" data-active={active}>
      <div className="wc-wrap wc-community-frame">
        <svg className="wc-community-border" aria-hidden="true"><rect width="100%" height="100%" rx="17" pathLength="100" /></svg>
        <div className="wc-community-ambience" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="wc-community-copy">
          <p className="wc-kicker">{c.eyebrow}</p>
          <h2 id="community-title">{c.title}<br /><em>{c.accent}</em></h2>
          <p className="wc-community-intro">{c.intro}</p>
          <ul className="wc-community-badges">{c.badges.map(badge => <li key={badge}>{badge}</li>)}</ul>
          <a className="wc-discord-button" href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer"><DiscordMark />{c.join}<span aria-hidden="true">↗</span></a>
          <p className="wc-community-help">{c.help}</p>
        </div>
        <div className="wc-community-panel">
          <iframe
            src={DISCORD_WIDGET_URL}
            title={c.widget}
            width="500"
            height="460"
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />
        </div>
      </div>
    </section>
  );
}
