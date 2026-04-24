import { Mail, MapPin, Phone } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/lib/site-data";

const socials = [
  { Icon: LinkedinIcon, label: "LinkedIn", href: site.social.linkedin, handle: "in/simonepepe00" },
  { Icon: GithubIcon, label: "GitHub", href: site.social.github, handle: "github.com" },
  { Icon: InstagramIcon, label: "Instagram", href: site.social.instagram, handle: "@sjmvne" },
  { Icon: Mail, label: "Email", href: `mailto:${site.email}`, handle: site.email },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden border-t border-border/60 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[400px] accent-glow opacity-50"
      />

      <div className="container-page relative z-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
        <div className="flex flex-1 flex-col gap-6">
          <SectionHeading
            eyebrow="13 · Contact"
            title="Scrivimi."
            description="Progetti MES/ERP, siti per WebHub, idee assurde, inviti a trekking con cani. Rispondo entro 48 ore."
          />
          <div className="flex flex-wrap gap-6 pt-4 font-mono text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              {site.phone}
            </span>
          </div>
        </div>

        <ul className="grid flex-1 gap-3 sm:grid-cols-2">
          {socials.map(({ Icon, label, href, handle }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/60 p-4 transition-all hover:border-accent/40 hover:bg-accent-soft"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted">
                    {label}
                  </span>
                  <span className="truncate text-sm text-foreground">
                    {handle}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="container-page relative z-10 mt-20 flex flex-col items-start justify-between gap-3 border-t border-border/40 pt-8 font-mono text-xs text-muted sm:flex-row sm:items-center">
        <span>© 2026 Simone Pepe · sjmvne.dev</span>
        <span>Built with Next.js · deployed on Vercel</span>
      </footer>
    </section>
  );
}
