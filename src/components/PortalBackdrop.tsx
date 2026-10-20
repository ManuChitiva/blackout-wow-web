"use client";
import { AmbientVideo } from "./WarcraftMotion";
export function PortalBackdrop({ path }: { path: string }) {
  const fel = /servidor|cuenta|puntos/.test(path);
  return <div className={"portal-backdrop " + (fel ? "portal-fel" : "portal-frost")} aria-hidden="true"><AmbientVideo src={"/warcraft/" + (fel ? "illidan" : "blackout-orc") + ".mp4"} poster={"/warcraft/" + (fel ? "illidan" : "blackout-orc") + "-poster.webp"}/><div className="portal-shade"/></div>;
}
