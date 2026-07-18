import Link from "next/link";
import { cookies } from "next/headers";
import { SiteShell } from "@/components/SiteShell";
import { BackgroundLoopVideo } from "@/components/BackgroundLoopVideo";
import { buildPageMetadata } from "@/lib/seo";
import { defaultLng, isSupportedLanguage } from "@/i18n/settings";

export const metadata = buildPageMetadata({
  title: "Cómo conectarme al servidor",
  description:
    "Guía oficial BLACKOUT WOW 3.3.5a: crear cuenta, descargar cliente, configurar realmlist (logon.blackoutwow.com) e iniciar sesión en el reino WotLK custom.",
  pathname: "/como-conectarme",
  keywords: [
    "realmlist Blackout WoW",
    "conectar WoW 3.3.5a",
    "cliente WotLK private server",
  ],
});

export default async function ComoConectarmePage() {
  const cookieStore = await cookies();
  const rawLang = cookieStore.get("lang")?.value;
  const lang = isSupportedLanguage(rawLang) ? rawLang : defaultLng;
  const tx = {
    es: {
      badge: "Guia oficial",
      title: "Como conectarme a BLACKOUT WOW",
      intro:
        "Sigue estos pasos y entra al reino en pocos minutos. La guia esta pensada para jugadores nuevos que quieren comenzar rapido y sin errores de configuracion.",
      create: "Crear cuenta ahora",
      hasAccount: "Ya tengo cuenta",
      tips: "Recomendaciones rapidas",
      tip1: "Usa solo cliente 3.3.5a para evitar errores al entrar.",
      tip2: "Ejecuta el juego como administrador si tienes bloqueos.",
      tip3: "Si olvidaste tu clave, recuperala desde la pagina de soporte.",
      recover: "Recuperar contrasena",
      steps: [
        {
          title: "1) Crea tu cuenta",
          body: "Registrate en el portal con un correo valido. Ese usuario y contrasena sera la misma que usaras dentro del juego.",
          ctaLabel: "Ir a registro",
          ctaHref: "/registro",
        },
        {
          title: "2) Descarga el cliente 3.3.5a",
          body: "Instala el cliente recomendado para evitar errores de compatibilidad y entrar al servidor con la configuracion correcta.",
          ctaLabel: "Descargar cliente",
          ctaHref: "/downloads/blackout-wow-3.3.5a-client.zip",
        },
        {
          title: "3) Configura el realmlist",
          body: "Abre el archivo realmlist.wtf y reemplaza su contenido con la direccion oficial del reino para poder autenticarte.",
          code: "set realmlist logon.blackout-wow.com",
        },
        {
          title: "4) Inicia sesion y juega",
          body: "Ejecuta Wow.exe, selecciona tu reino y entra con la cuenta del portal. Ya estaras listo para comenzar tu aventura.",
          ctaLabel: "Iniciar sesion",
          ctaHref: "/login",
        },
      ],
    },
    en: {
      badge: "Official guide",
      title: "How to connect to BLACKOUT WOW",
      intro:
        "Follow these steps and join the realm in minutes. This guide is designed for new players who want a quick and clean setup.",
      create: "Create account now",
      hasAccount: "I already have an account",
      tips: "Quick recommendations",
      tip1: "Use only the 3.3.5a client to avoid login errors.",
      tip2: "Run the game as administrator if you have launch issues.",
      tip3: "If you forgot your password, recover it from support.",
      recover: "Recover password",
      steps: [
        {
          title: "1) Create your account",
          body: "Sign up on the portal with a valid email. These credentials are the same ones you will use in-game.",
          ctaLabel: "Go to sign up",
          ctaHref: "/registro",
        },
        {
          title: "2) Download 3.3.5a client",
          body: "Install the recommended client to avoid compatibility issues and connect with the correct setup.",
          ctaLabel: "Download client",
          ctaHref: "/downloads/blackout-wow-3.3.5a-client.zip",
        },
        {
          title: "3) Configure realmlist",
          body: "Open `realmlist.wtf` and replace its content with the official realm address to authenticate.",
          code: "set realmlist logon.blackout-wow.com",
        },
        {
          title: "4) Log in and play",
          body: "Run `Wow.exe`, select your realm and log in with your portal account.",
          ctaLabel: "Log in",
          ctaHref: "/login",
        },
      ],
    },
    pt: {
      badge: "Guia oficial",
      title: "Como conectar no BLACKOUT WOW",
      intro:
        "Siga estes passos e entre no reino em poucos minutos. Este guia foi feito para novos jogadores com configuração rápida e sem erros.",
      create: "Criar conta agora",
      hasAccount: "Já tenho conta",
      tips: "Recomendações rápidas",
      tip1: "Use apenas o cliente 3.3.5a para evitar erros ao entrar.",
      tip2: "Execute o jogo como administrador se houver bloqueios.",
      tip3: "Se esqueceu sua senha, recupere pela página de suporte.",
      recover: "Recuperar senha",
      steps: [
        {
          title: "1) Crie sua conta",
          body: "Cadastre-se no portal com um e-mail válido. Esse usuário e senha serão os mesmos usados no jogo.",
          ctaLabel: "Ir para cadastro",
          ctaHref: "/registro",
        },
        {
          title: "2) Baixe o cliente 3.3.5a",
          body: "Instale o cliente recomendado para evitar erros de compatibilidade e entrar com a configuração correta.",
          ctaLabel: "Baixar cliente",
          ctaHref: "/downloads/blackout-wow-3.3.5a-client.zip",
        },
        {
          title: "3) Configure o realmlist",
          body: "Abra o arquivo `realmlist.wtf` e substitua pelo endereço oficial do reino para autenticar.",
          code: "set realmlist logon.blackout-wow.com",
        },
        {
          title: "4) Entre e jogue",
          body: "Execute o `Wow.exe`, selecione seu reino e entre com sua conta do portal.",
          ctaLabel: "Entrar",
          ctaHref: "/login",
        },
      ],
    },
  }[lang];
  return (
    <SiteShell>
      <section className="section-fire-aura relative min-h-128 overflow-hidden border-b border-white/10">
        <BackgroundLoopVideo
          startAtSec={1}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.28]"
          autoPlay
          muted
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source
            src="https://video.wixstatic.com/video/5dd8a0_00a855e7ddb049518bd8983809fb9a23/720p/mp4/file.mp4"
            type="video/mp4"
          />
        </BackgroundLoopVideo>
        <div className="pointer-events-none absolute inset-0 bg-black/50" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(249,115,22,0.16),transparent_40%),radial-gradient(circle_at_80%_60%,rgba(56,189,248,0.14),transparent_36%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.12),transparent_50%),linear-gradient(to_top,rgba(2,6,23,0.75)_0%,transparent_50%),linear-gradient(to_bottom,rgba(5,5,8,0.65)_0%,transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-20">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-sky-200/80">
            {tx.badge}
          </p>
          <h1 className="font-display mt-4 max-w-3xl text-3xl font-bold leading-tight text-zinc-50 md:text-5xl">
            {tx.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300 md:text-lg">
            {tx.intro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/registro"
              className="rounded-md bg-linear-to-r from-amber-600 to-orange-500 px-6 py-3 text-sm font-semibold text-black hover:from-amber-500 hover:to-orange-400"
            >
              {tx.create}
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5"
            >
              {tx.hasAccount}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-2">
          {tx.steps.map((step) => (
            <article
              key={step.title}
              className="home-card rounded-xl border border-white/10 bg-zinc-950/65 p-6"
            >
              <h2 className="font-display text-xl text-zinc-100">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                {step.body}
              </p>

              {step.code ? (
                <div className="mt-4 rounded-md border border-sky-400/30 bg-black/45 p-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-sky-300/75">
                    Realmlist
                  </p>
                  <code className="mt-2 block text-sm text-sky-100">
                    {step.code}
                  </code>
                </div>
              ) : null}

              {step.ctaHref && step.ctaLabel ? (
                <Link
                  href={step.ctaHref}
                  className="mt-5 inline-flex rounded-md border border-amber-500/35 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-500/20"
                >
                  {step.ctaLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-8">
          <h2 className="font-display text-2xl font-semibold text-zinc-100">
            {tx.tips}
          </h2>
          <ul className="mt-5 space-y-3 text-sm text-zinc-300">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
              <span>{tx.tip1}</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
              <span>{tx.tip2}</span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
              <span>{tx.tip3}</span>
            </li>
          </ul>
          <div className="mt-6">
            <Link
              href="/recuperar"
              className="text-sky-300 hover:text-sky-200 hover:underline"
            >
              {tx.recover}
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
