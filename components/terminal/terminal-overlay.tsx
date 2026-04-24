"use client";

import { AnimatePresence, motion } from "motion/react";
import { TerminalSquare, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies, site, skillGroups } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Line = { kind: "in" | "out" | "err"; text: string };

const WELCOME: Line[] = [
  { kind: "out", text: "sjmvne.dev terminal · v1.0" },
  { kind: "out", text: "Digita 'help' o clicca un comando qui sotto." },
  { kind: "out", text: "" },
];

const SUGGESTIONS = [
  "help",
  "whoami",
  "ls",
  "projects",
  "social",
  "cat about.md",
  "contact",
  "theme dark",
  "theme light",
  "clear",
];

function runCommand(input: string, setTheme: (t: string) => void): Line[] {
  const trimmed = input.trim();
  if (!trimmed) return [];
  const [cmd, ...args] = trimmed.split(/\s+/);
  const c = cmd.toLowerCase();

  switch (c) {
    case "help":
      return [
        { kind: "out", text: "Comandi disponibili:" },
        { kind: "out", text: "  help               · mostra questo elenco" },
        { kind: "out", text: "  whoami             · identità" },
        { kind: "out", text: "  ls                 · lista sezioni" },
        { kind: "out", text: "  cat <file>         · about.md · skills.md · contact.md" },
        { kind: "out", text: "  projects           · case study featured" },
        { kind: "out", text: "  social             · link social" },
        { kind: "out", text: "  theme [dark|light] · cambia tema" },
        { kind: "out", text: "  contact            · apre email" },
        { kind: "out", text: "  clear              · pulisce il terminale" },
        { kind: "out", text: "  exit               · chiude il terminale" },
      ];
    case "whoami":
      return [
        { kind: "out", text: site.name },
        { kind: "out", text: site.role },
        { kind: "out", text: site.location },
      ];
    case "ls":
      return [
        { kind: "out", text: "about.md    timeline/    skills/    projects/" },
        { kind: "out", text: "side/       certs/       travels/   dogs/" },
        { kind: "out", text: "contact.md  cv.pdf" },
      ];
    case "cat": {
      const file = (args[0] ?? "").toLowerCase();
      if (!file) return [{ kind: "err", text: "Uso: cat <file>" }];
      if (file === "about.md" || file === "about")
        return [
          { kind: "out", text: "# Simone Pepe" },
          { kind: "out", text: "" },
          { kind: "out", text: "Developer e digital builder." },
          { kind: "out", text: "Senior in Accenture (MES/ERP), founder WebHub." },
          { kind: "out", text: "Costruisco tool AI per problemi miei." },
        ];
      if (file === "skills.md" || file === "skills")
        return skillGroups.map((g) => ({
          kind: "out" as const,
          text: `  ${g.label.padEnd(22)} ${g.skills.map((s) => s.name).join(", ")}`,
        }));
      if (file === "contact.md" || file === "contact")
        return [
          { kind: "out", text: `email    ${site.email}` },
          { kind: "out", text: `phone    ${site.phone}` },
          { kind: "out", text: `linkedin ${site.social.linkedin}` },
        ];
      return [{ kind: "err", text: `cat: ${file}: file non trovato` }];
    }
    case "projects":
      return caseStudies.map((p) => ({
        kind: "out" as const,
        text: `  ${p.client.padEnd(22)} ${p.title}`,
      }));
    case "social":
      return [
        { kind: "out", text: `linkedin  ${site.social.linkedin}` },
        { kind: "out", text: `instagram ${site.social.instagram}` },
        { kind: "out", text: `github    ${site.social.github}` },
        { kind: "out", text: `webhub    ${site.social.webhub}` },
      ];
    case "theme": {
      const mode = (args[0] ?? "").toLowerCase();
      if (mode !== "dark" && mode !== "light")
        return [{ kind: "err", text: "Uso: theme dark | light" }];
      setTheme(mode);
      return [{ kind: "out", text: `Tema impostato su ${mode}.` }];
    }
    case "contact":
      if (typeof window !== "undefined") window.location.href = `mailto:${site.email}`;
      return [{ kind: "out", text: `Apertura client email → ${site.email}` }];
    case "sudo":
      return [
        { kind: "err", text: "permission denied: no sudo on a static site" },
      ];
    case "clear":
      return [{ kind: "out", text: "__CLEAR__" }];
    case "exit":
      return [{ kind: "out", text: "__EXIT__" }];
    default:
      return [
        { kind: "err", text: `${c}: comando non trovato. Digita 'help'.` },
      ];
  }
}

export function TerminalOverlay() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { setTheme } = useTheme();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (e.key === "Escape") setOpen(false);
      if ((e.key === "`" || e.key === "~") && !isTyping && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const execute = useCallback(
    (command: string) => {
      const value = command.trim();
      if (!value) return;
      const result = runCommand(value, setTheme);
      setHistory((h) => [...h, value]);
      setHistoryIndex(null);

      if (result.some((l) => l.text === "__CLEAR__")) {
        setLines(WELCOME);
        setInput("");
        return;
      }
      if (result.some((l) => l.text === "__EXIT__")) {
        setOpen(false);
        setInput("");
        return;
      }

      setLines((prev) => [
        ...prev,
        { kind: "in", text: value },
        ...result,
        { kind: "out", text: "" },
      ]);
      setInput("");
    },
    [setTheme],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      execute(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex === null
          ? history.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next] ?? "");
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Apri terminal"
        className={cn(
          "fixed bottom-4 right-4 z-40 inline-flex h-11 items-center gap-2 rounded-full",
          "border border-border bg-surface/85 px-4 font-mono text-xs text-muted backdrop-blur-md",
          "shadow-lg shadow-black/30 transition-all duration-300",
          "hover:text-accent hover:border-accent/40 hover:bg-accent-soft",
        )}
      >
        <TerminalSquare className="h-4 w-4" />
        <span className="hidden sm:inline">terminal</span>
        <kbd className="hidden rounded border border-border bg-background px-1.5 py-0.5 text-[10px] sm:inline">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-md"
            onClick={close}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 240 }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "absolute inset-x-3 bottom-3 md:inset-x-auto md:left-1/2 md:bottom-10 md:-translate-x-1/2",
                "h-[80vh] md:h-[480px] w-auto md:w-[760px] max-w-[calc(100vw-1.5rem)]",
                "flex flex-col overflow-hidden rounded-2xl border border-border",
                "bg-background/95 shadow-2xl shadow-black/40 backdrop-blur-xl",
              )}
            >
              <div className="flex items-center justify-between border-b border-border/80 px-4 py-2.5">
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  </span>
                  <span className="ml-2">sjmvne@dev — /home</span>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Chiudi"
                  className="text-muted hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {lines.map((line, i) => (
                  <div
                    key={i}
                    className={cn(
                      "whitespace-pre-wrap break-words",
                      line.kind === "err" && "text-red-400",
                      line.kind === "in" && "text-foreground",
                      line.kind === "out" && "text-foreground/85",
                    )}
                  >
                    {line.kind === "in" ? (
                      <>
                        <span className="text-accent">→</span>{" "}
                        <span>{line.text}</span>
                      </>
                    ) : (
                      line.text
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-accent">→</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    autoComplete="off"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    className="flex-1 border-0 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted"
                    placeholder="help"
                  />
                </div>
              </div>

              <div className="border-t border-border/80 bg-surface/40 px-3 py-2.5">
                <div className="mb-1.5 font-mono text-[10px] uppercase tracking-widest text-muted">
                  Comandi rapidi
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => execute(s)}
                      className="rounded-full border border-border bg-background px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-accent/40 hover:bg-accent-soft hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
