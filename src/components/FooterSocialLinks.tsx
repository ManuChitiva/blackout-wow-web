import { DISCORD_INVITE_URL, YOUTUBE_CHANNEL_URL, TIKTOK_PROFILE_URL } from '@/lib/site-config';

const socialLinks = [
  {
    name: 'Discord', href: DISCORD_INVITE_URL,
    path: 'M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52l-.6 1.23a18.43 18.43 0 0 0-5.66 0l-.62-1.23a19.74 19.74 0 0 0-4.89 1.53C.57 8.97-.27 13.45.15 17.87a19.9 19.9 0 0 0 6 3.03l1.29-2.09a12.7 12.7 0 0 1-2.02-.98l.5-.39c3.88 1.79 8.1 1.79 11.93 0l.51.39c-.65.39-1.33.72-2.03.99l1.29 2.08a19.8 19.8 0 0 0 6-3.03c.5-5.12-.85-9.56-3.3-13.5ZM8.02 15.16c-1.17 0-2.13-1.07-2.13-2.39s.94-2.39 2.13-2.39c1.2 0 2.15 1.08 2.13 2.39 0 1.32-.94 2.39-2.13 2.39Zm7.96 0c-1.17 0-2.13-1.07-2.13-2.39s.94-2.39 2.13-2.39c1.2 0 2.15 1.08 2.13 2.39 0 1.32-.93 2.39-2.13 2.39Z',
  },
  {
    name: 'YouTube', href: YOUTUBE_CHANNEL_URL,
    path: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z',
  },
  {
    name: 'TikTok', href: TIKTOK_PROFILE_URL,
    path: 'M16.6 1h-4.1v15.1a3.1 3.1 0 1 1-2.7-3.1V8.8a7.3 7.3 0 1 0 6.8 7.3V8.6a10 10 0 0 0 5.8 1.9V6.4A5.8 5.8 0 0 1 16.6 1Z',
  },
];

export function FooterSocialLinks() {
  return <div className="site-socials">
    {socialLinks.map(({ name, href, path }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="site-community">
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d={path} /></svg>
      <span>{name.toUpperCase()}</span>
      <span aria-hidden="true">↗</span>
    </a>)}
  </div>;
}
