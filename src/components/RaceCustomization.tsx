"use client";

import { useTranslation } from "react-i18next";

const appearances = ["Void Elf", "Mechagnome", "Dracthyr", "Kul Tiran", "Pandaren", "Dark Iron Dwarf", "Lightforged Draenei", "Nightborne", "Vulpera", "Zandalari Troll", "Mag’har Orc", "Highmountain Tauren"];
const copy = {
  es: {
    eyebrow: "TU PERSONAJE · TU IDENTIDAD",
    title: "Una apariencia a tu medida.",
    racesTitle: "Razas de WotLK. Diseños custom.",
    racesText: "Elige entre las razas jugables de Wrath of the Lich King y descubre un amplio sistema de personalización con diseños custom para tu personaje.",
    morphsTitle: "16 apariencias raciales mediante morphs",
    morphsText: "La selección de personaje mostrará opciones visuales de otras razas mediante morphs. Estas apariencias se distinguen de las razas base de WotLK que puedes elegir al crear tu personaje.",
    more: "y más…",
  },
  en: {
    eyebrow: "YOUR CHARACTER · YOUR IDENTITY",
    title: "Make your appearance your own.",
    racesTitle: "WotLK races. Custom designs.",
    racesText: "Choose from the playable races of Wrath of the Lich King and explore an extensive character customization system with custom designs.",
    morphsTitle: "16 racial appearances through morphs",
    morphsText: "Character selection will offer visual options from other races through morphs. These appearances are separate from the base WotLK races you can choose when creating your character.",
    more: "and more…",
  },
  pt: {
    eyebrow: "SEU PERSONAGEM · SUA IDENTIDADE",
    title: "Uma aparência do seu jeito.",
    racesTitle: "Raças de WotLK. Designs custom.",
    racesText: "Escolha entre as raças jogáveis de Wrath of the Lich King e descubra um amplo sistema de personalização com designs custom para seu personagem.",
    morphsTitle: "16 aparências raciais por meio de morphs",
    morphsText: "A seleção de personagem mostrará opções visuais de outras raças por meio de morphs. Essas aparências são distintas das raças base de WotLK que você pode escolher ao criar seu personagem.",
    more: "e mais…",
  },
};

export function RaceCustomization() {
  const { i18n } = useTranslation();
  const c = copy[i18n.language as keyof typeof copy] ?? copy.es;
  return (
    <section className="lore-customization" id="razas-y-morphs" aria-labelledby="customization-title">
      <header><span className="lore-kicker">{c.eyebrow}</span><h2 id="customization-title">{c.title}</h2></header>
      <div className="lore-customization-grid">
        <article><h3>{c.racesTitle}</h3><p>{c.racesText}</p></article>
        <article><h3>{c.morphsTitle}</h3><p>{c.morphsText}</p><ul>{appearances.map(name => <li key={name}>{name}</li>)}<li className="lore-customization-more">{c.more}</li></ul></article>
      </div>
    </section>
  );
}
