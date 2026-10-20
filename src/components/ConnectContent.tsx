"use client";
import Link from "next/link";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {SiteShell} from "./SiteShell";
import {DISCORD_INVITE_URL} from "@/lib/site-config";
import {connectionCopy} from "@/lib/connection-copy";
import {defaultLng, isSupportedLanguage} from "@/i18n/settings";

const patchDownloadUrl = process.env.NEXT_PUBLIC_PATCH_DOWNLOAD_URL?.trim() || "";
const hasPatchDownload = /^https:\/\//i.test(patchDownloadUrl);
const links = {
  fix: "https://drive.google.com/file/d/1_lURvxnmrZYuwzT5L7uGLgRV4G0CzIjd/view?usp=sharing",
  patch: hasPatchDownload ? patchDownloadUrl : DISCORD_INVITE_URL,
  addon: "https://drive.google.com/file/d/1-w4jnu1TxzwASASyO-qEkN_JURE8NPk-/view?usp=sharing",
  es: "https://drive.google.com/file/d/15eqo-VXNtD-8JelsrHfoPnogeNKddJKE/view?usp=sharing",
  en: "https://drive.google.com/file/d/1_3-KSxI1XKdsgpOJwkeKi6gboDQ1M1Mg/view?usp=sharing"
};
export default function ConnectContent() {
  const {i18n} = useTranslation();
  const c = connectionCopy[isSupportedLanguage(i18n.language) ? i18n.language : defaultLng];
  const [copyState, setCopyState] = useState<"idle" | "done" | "error">("idle");
  const downloads = [
    {title:c.patch,desc:c.patchDesc + (hasPatchDownload ? "" : " " + c.patchPending),urls:[{url:links.patch,label:hasPatchDownload ? "GOOGLE DRIVE" : c.patchHelp}],icon:"↓"},
    {title:c.addon,desc:c.addonDesc,urls:[{url:links.addon,label:"GOOGLE DRIVE"}],icon:"✧"},
    {title:c.fix,desc:c.fixDesc,urls:[{url:links.fix,label:"GOOGLE DRIVE"}],icon:"✦"},
    {title:c.client,desc:c.clientDesc,urls:[{url:links.es,label:"esES · ESPAÑOL"},{url:links.en,label:"enUS · ENGLISH"}],icon:"⚔"}
  ];
  return <SiteShell>
    <section className="lore-hero">
      <span className="lore-kicker">{c.badge}</span><h1>{c.title}</h1><p>{c.intro}</p>
      <div className="lore-actions"><Link className="lore-button" href="/registro">{c.create}<span>↗</span></Link><Link href="/login">{c.login} →</Link></div>
    </section>
    <section className="lore-container">
      <div className="connect-steps connection-paths">{c.paths.map((path,i)=><article key={path.title}>
        <span className="lore-kicker connection-option">{c.optionLabel} {i+1}</span><h2>{path.title}</h2>
        <ol>{path.steps.map(step=><li key={step}>{step}</li>)}</ol>
        <a href="#descargas">{c.button} ↓</a>
      </article>)}</div>
      <aside className="connect-tips connection-realm">
        <h2>{c.realmTitle}</h2><p>{c.realmHelp}</p>
        <button className="connect-realmlist" aria-label={c.copy} onClick={()=>{void navigator.clipboard.writeText("set realmlist logon.blackout-wow.com").then(()=>setCopyState("done")).catch(()=>setCopyState("error"));}}>
          <code>set realmlist logon.blackout-wow.com</code><span aria-hidden="true">{copyState==="done"?"✓":"⧉"}</span>
        </button>
        <p className="connection-copy-status" role="status">{copyState==="done"?c.copied:copyState==="error"?c.copyError:""}</p>
      </aside>
      <div className="lore-heading" id="descargas"><span className="lore-kicker">BLACKOUT · 3.3.5a</span><h2>{c.downloads}</h2><p>{c.downloadIntro}</p></div>
      <div className="connect-downloads">{downloads.map(d=><article key={d.title}>
        <span className="download-symbol" aria-hidden="true">{d.icon}</span><h3>{d.title}</h3><p>{d.desc}</p>
        <div>{d.urls.map(u=><a href={u.url} key={u.url} target="_blank" rel="noopener noreferrer">{u.label}<span aria-hidden="true">↗</span></a>)}</div>
      </article>)}</div>
      <aside className="connect-tips"><h2>{c.tips}</h2><p>{c.tipText}</p><Link href="/recuperar">{c.recover} ↗</Link></aside>
    </section>
  </SiteShell>;
}
