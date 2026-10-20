"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ClassSpells } from "./ClassSpells";
import { RaceCustomization } from "./RaceCustomization";
import { SiteShell } from "./SiteShell";
import { serverCopy } from "@/lib/server-copy";
import { warcraftCopy } from "@/lib/warcraft-copy";
import { DISCORD_INVITE_URL } from "@/lib/site-config";

export default function ServerContent() {
  const { i18n } = useTranslation();
  const language = i18n.language as keyof typeof serverCopy;
  const c = serverCopy[language] ?? serverCopy.es;
  const profile = warcraftCopy[language] ?? warcraftCopy.es;
  return (
    <SiteShell>
      <section className="lore-hero">
        <span className="lore-kicker">{c.eyebrow}</span>
        <h1>{c.title}<br /><em>{c.accent}</em></h1>
        <p>{c.intro}</p>
        <p className="wc-realm-profile">{profile.realmProfile}</p>
        <div className="lore-actions">
          <Link className="lore-button" href="/registro">{c.join}<span aria-hidden="true">↗</span></Link>
          <Link href="/como-conectarme">{c.download} →</Link>
        </div>
      </section>
      <section className="lore-container">
        <div className="lore-stats">
          {["255", "35", "19", "30+"].map((value, index) => (
            <div key={value}><strong>{value}</strong><span>{c.labels[index]}</span>{index === 2 && <small>{c.customRaidsNote}</small>}</div>
          ))}
        </div>
        <div className="lore-heading"><h2>{c.experience}</h2></div>
        <div className="lore-features">
          {c.features.map((feature, index) => (
            <article className="lore-feature" id={["pve", "pvp", "clases", "sistemas"][index]} key={feature.tag}>
              <span className="lore-kicker">{feature.tag}</span>
              <h3>{feature.title}</h3>
              <ul>{feature.items.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
        <ClassSpells />
        <RaceCustomization />
        <div className="lore-fair">
          <span aria-hidden="true">✧</span>
          <div><h2>{c.fair}</h2><p>{c.fairText}</p></div>
          <Link href="/terminos-y-condiciones">{c.rules} ↗</Link>
        </div>
        <div className="lore-community">
          <span className="lore-kicker">{c.communityTag}</span>
          <h2>{c.community}</h2><p>{c.communityText}</p>
          <a className="lore-button" href={DISCORD_INVITE_URL} target="_blank" rel="noopener noreferrer">{c.discord}<span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </SiteShell>
  );
}
