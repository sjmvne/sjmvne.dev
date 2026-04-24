import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { SiteHeader } from "@/components/site-header";
import { projects } from "@/lib/site-data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Progetto non trovato" };
  return {
    title: `${project.title} · ${project.client}`,
    description: project.teaser,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const backHref =
    project.category === "featured" ? "/#projects" : "/#side-projects";
  const backLabel =
    project.category === "featured" ? "Torna ai progetti" : "Torna ai side projects";

  return (
    <>
      <SiteHeader />
      <main className="flex-1 pt-14">
        <article className="container-page py-16 sm:py-24">
          <Link
            href={backHref}
            className="group mb-12 inline-flex items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            {backLabel}
          </Link>

          <header className="relative mb-16 flex flex-col gap-6 border-b border-border pb-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 -top-10 h-[400px] accent-glow opacity-50"
            />
            <div className="relative flex flex-wrap items-center gap-3 font-mono text-xs">
              <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted">
                {project.client}
              </span>
              <span className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 text-accent">
                {project.period}
              </span>
              {project.team && (
                <span className="rounded-full border border-border bg-surface px-3 py-1 text-muted">
                  {project.team}
                </span>
              )}
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-balance text-lg text-muted">
              {project.teaser}
            </p>
            <p className="font-mono text-sm text-accent">{project.role}</p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-4 py-2 font-mono text-xs text-accent transition-all hover:border-accent/60 hover:bg-accent-soft/80"
              >
                {project.urlLabel ?? "Apri live"}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}

            {project.highlight && project.highlight.length > 0 && (
              <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
                {project.highlight.map((h) => (
                  <div
                    key={h.label}
                    className="rounded-xl border border-border bg-surface/40 p-4"
                  >
                    <div className="font-mono text-xs uppercase tracking-widest text-muted">
                      {h.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold tracking-tight">
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </header>

          <div className="grid gap-16 lg:grid-cols-[1fr_260px]">
            <div className="flex flex-col gap-14">
              <Section title="Contesto" number="01">
                <p className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                  {project.sections.context}
                </p>
              </Section>

              <Section title="Cosa ho fatto" number="02">
                <ul className="flex flex-col gap-3">
                  {project.sections.work.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                      <span className="text-base leading-relaxed text-foreground/90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              <Section title="Stack" number="03">
                <p className="text-base leading-relaxed text-foreground/90">
                  {project.sections.stackDetail}
                </p>
              </Section>

              <Section title="Cosa ho imparato" number="04">
                <p className="rounded-2xl border border-accent/30 bg-accent-soft/30 p-6 text-base italic leading-relaxed text-foreground/90 sm:text-lg">
                  {project.sections.learnings}
                </p>
              </Section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-surface/40 p-5">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
                  Tech stack
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <Badge tone="muted">{s}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </article>
      </main>
    </>
  );
}

function Section({
  title,
  number,
  children,
}: {
  title: string;
  number: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-6 flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {number}
        </span>
        <span className="h-px flex-1 bg-border" />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </header>
      {children}
    </section>
  );
}
