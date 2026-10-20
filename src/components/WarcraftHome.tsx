"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SiteShell } from "./SiteShell";
import { AmbientVideo } from "./WarcraftMotion";
import { warcraftCopy } from "@/lib/warcraft-copy";
import { DISCORD_INVITE_URL } from "@/lib/site-config";
import { SupportShowcase } from "./SupportShowcase";
import { DiscordCommunity } from "./DiscordCommunity";

function Corners() { return <span className="wc-corners" aria-hidden="true"><i/><i/><i/><i/></span>; }
function Ornament() { return <div className="wc-ornament" aria-hidden="true"><span/><img src="/warcraft/native/gold-header-trim.png" alt="" width="139" height="40"/><span/></div>; }

const classArtwork = {
  evoker: { width: 3095, height: 3277 },
  "demon-hunter": { width: 1052, height: 984 },
  monk: { width: 1328, height: 1144 },
} as const;

function AnimatedClassArtwork({ kind }: { kind: keyof typeof classArtwork }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let visible = false;
    const sync = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);
  return <div ref={root} className={`wc-official-character wc-official-${kind}`} data-active={active} aria-hidden="true"><div className="wc-character-motion"><Image sizes="(max-width: 600px) 610px, 800px" src={`/warcraft/classes/${kind}.png`} alt="" {...classArtwork[kind]}/></div><i className="wc-character-motes"/></div>;
}

export default function WarcraftHome() {
  const { i18n } = useTranslation();
  const c = warcraftCopy[i18n.language as keyof typeof warcraftCopy] ?? warcraftCopy.es;
  const [selectedClass, setSelectedClass] = useState(1);
  const classNames = c.classNames;
  return <SiteShell>
    <section className="wc-hero" aria-labelledby="hero-title">
      <AmbientVideo className="wc-hero-video" src="/warcraft/blackout-orc.mp4" poster="/warcraft/blackout-orc-poster.webp"/>
      <div className="wc-hero-shade"/>
      <div className="wc-snow wc-embers" aria-hidden="true"><i/><i/><i/></div>
      <div className="wc-wrap wc-hero-layout">
        <div className="wc-hero-copy">
          <img className="wc-crest" src="/warcraft/crest.webp" width="1024" height="683" alt="Blackout WoW" fetchPriority="high"/>
          <p className="wc-kicker wc-soon"><span/> BLACKOUT 255 · {c.soon} <span/></p>
          <h1 id="hero-title">{c.title}<br/><em>{c.accent}</em></h1>
          <p className="wc-hero-intro">{c.intro}</p>
          <p className="wc-realm-profile">{c.realmProfile}</p>
          <div className="wc-actions"><Link href="/registro" className="wc-button">{c.create}<span aria-hidden="true">›</span></Link><Link href="/como-conectarme" className="wc-button wc-button-ghost">{c.play}<span aria-hidden="true">↓</span></Link><a className="wc-button wc-button-ghost" href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">{c.discord}<span aria-hidden="true">↗</span></a></div>
          <p className="wc-fair-line">{c.fair}</p>
        </div>
      </div>
      <a href="#reino" className="wc-scroll"><span>{c.explore}</span><i aria-hidden="true">⌄</i></a>
    </section>
    <div className="wc-stat-wrap wc-wrap"><div className="wc-stat-bar"><Corners/>{["255", "35", "45+", "T1—T35"].map((stat, index) => <div key={stat}><strong>{stat}</strong><span>{c.statLabels[index]}</span></div>)}</div></div>
    <section className="wc-world wc-section" id="reino" aria-labelledby="world-title">
      <div className="wc-wrap"><header className="wc-section-heading"><p className="wc-kicker">{c.chapter}</p><h2 id="world-title">{c.worldTitle}</h2><Ornament/><p>{c.worldIntro}</p></header>
        <div className="wc-paths">
          <Link href="/servidor#pve" className="wc-path wc-path-pve"><div className="wc-path-art"><img src="/warcraft/ragnaros.webp" alt="Ragnaros" width="1200" height="1548" loading="lazy"/></div><Corners/><div className="wc-path-content"><span className="wc-path-tag">PVE</span><h3>{c.pve}</h3><p>{c.pveText}</p><span className="wc-text-link">{c.details} <b>→</b></span></div><span className="wc-path-rune" aria-hidden="true">✦</span></Link>
          <Link href="/servidor#pvp" className="wc-path wc-path-pvp"><div className="wc-path-art"><img src="/warcraft/paladin.webp" alt="Paladin" width="800" height="627" loading="lazy"/></div><Corners/><div className="wc-path-content"><span className="wc-path-tag">PVP</span><h3>{c.pvp}</h3><p>{c.pvpText}</p><span className="wc-text-link">{c.details} <b>→</b></span></div><span className="wc-path-rune" aria-hidden="true">✦</span></Link>
        </div>
      </div>
    </section>
    <section className={`wc-classes wc-section wc-selected-class-${selectedClass}`} id="clases" aria-labelledby="classes-title">
      <div className="wc-class-landscape" aria-hidden="true"/>
      <div className="wc-wrap wc-class-layout">
        <div className="wc-class-figure wc-class-preview" id="class-preview" role="tabpanel" aria-labelledby={`class-tab-${selectedClass}`} tabIndex={0}>
          <AnimatedClassArtwork key={selectedClass} kind={selectedClass === 0 ? "evoker" : selectedClass === 1 ? "demon-hunter" : "monk"}/>
          <span className="wc-character-caption">{classNames[selectedClass]} <i>{c.classTypes[selectedClass]}</i></span>
        </div>
        <div className="wc-class-copy"><p className="wc-kicker">{c.classesTag}</p><h2 id="classes-title">{c.classesTitle}<br/><em>{c.classesAccent}</em></h2><p className="wc-section-intro">{c.classesText}</p>
          <p className="wc-class-choice">{c.chooseClass}</p>
          <div className="wc-class-list" role="tablist" aria-label={c.classesTag}>{classNames.map((name, i) => <button key={name} id={`class-tab-${i}`} type="button" role="tab" aria-selected={selectedClass === i} aria-controls="class-preview" tabIndex={selectedClass === i ? 0 : -1} className={"wc-class-item wc-class-" + i} onClick={() => setSelectedClass(i)} onKeyDown={event => { const next = event.key === "ArrowRight" ? (i + 1) % 3 : event.key === "ArrowLeft" ? (i + 2) % 3 : event.key === "Home" ? 0 : event.key === "End" ? 2 : null; if (next !== null) { event.preventDefault(); setSelectedClass(next); (event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next])?.focus(); } }}><span aria-hidden="true">{["◇", "✦", "◉"][i]}</span><strong>{name}<small>{c.classTypes[i]}</small></strong></button>)}</div>
          <div className="wc-spell-note"><span aria-hidden="true">✧</span><div><h3>{c.spells}</h3><p>{c.spellsText}</p></div></div>
          <Link className="wc-text-link" href="/servidor#hechizos-custom">{c.spellsLink} <b>→</b></Link>
        </div>
      </div>
    </section>
    <section className="wc-progression wc-section" id="progresion" aria-labelledby="progress-title">
      <img className="wc-progression-bg" src="/warcraft/teldrassil.webp" alt="" loading="lazy" width="946" height="2048"/>
      <div className="wc-wrap wc-progression-layout"><div className="wc-progression-copy"><p className="wc-kicker">{c.progressionTag}</p><h2 id="progress-title">{c.progressionTitle}<br/><em>{c.progressionAccent}</em></h2><p className="wc-section-intro">{c.progressionText}</p><ul className="wc-systems">{c.systems.map(s => <li key={s}><span aria-hidden="true">◆</span>{s}</li>)}</ul><Link className="wc-button wc-button-ghost" href="/servidor#sistemas">{c.more}<span aria-hidden="true">→</span></Link></div>
        <div className="wc-relic"><Corners/><p className="wc-kicker">BLACKOUT · 255</p><strong className="wc-relic-tier">T1<span>—</span>T35</strong><p className="wc-relic-label">{c.statLabels[3]}</p><div className="wc-relic-stats">{["V1–V10", "100K+", "500+"].map((s,i)=><div key={s}><strong>{s}</strong><span>{c.progressionLabels[i]}</span></div>)}</div><img src="/warcraft/native/gold-dragon.png" alt="" width="128" height="128" className="wc-dragon" loading="lazy"/></div>
      </div>
    </section>
    <DiscordCommunity />
    <SupportShowcase />
  </SiteShell>;
}
