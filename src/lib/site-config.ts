/**
 * URLs públicas del sitio (variables NEXT_PUBLIC_*).
 * Widget: Discord → Configuración del servidor → Widget → ID del servidor.
 */
export const DISCORD_WIDGET_URL =
  process.env.NEXT_PUBLIC_DISCORD_WIDGET_URL?.trim() ??
  "https://discord.com/widget?id=1026731303925710948&theme=dark";

export const DISCORD_INVITE_URL =
  process.env.NEXT_PUBLIC_DISCORD_INVITE_URL?.trim() ??
  "https://discord.gg/cBnyKeAvpg";

export const hasDiscordWidget = DISCORD_WIDGET_URL.length > 0;

export const hasDiscordInvite = DISCORD_INVITE_URL.length > 0;
