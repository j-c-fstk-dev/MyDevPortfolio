"use client";

import type { Locale } from "@/data/portfolio";
import { matrixCopy } from "./copy";
import { useCallback, useEffect, useState } from "react";
import { errorBuzz, keyClick, setSoundOn, successChime, useSoundOn } from "./sound";

type LineKind = "cmd" | "info" | "err" | "ok" | "out";

/**
 * The Matrix hero terminal. It opens with a broken build being diagnosed and
 * fixed (the work Jorge does), then introduces him. The log stays on the page,
 * so scrolling back up shows it from the start.
 */
const SCRIPT: { kind: LineKind; text: string; pt?: string; pause: number }[] = [
  { kind: "cmd", text: "npm run build", pause: 500 },
  { kind: "info", text: "Creating an optimized production build...", pt: "Criando um build otimizado para produção...", pause: 900 },
  { kind: "err", text: "✗ Module not found: Can't resolve './auth' in src/lib/session.ts", pt: "✗ Módulo './auth' não encontrado em src/lib/session.ts", pause: 250 },
  { kind: "err", text: "✗ Build failed in 3.2s", pt: "✗ Build falhou em 3,2 s", pause: 1100 },
  { kind: "cmd", text: "jorge --diagnose", pause: 500 },
  { kind: "info", text: "› cause: session.ts imports './auth', the file lives at '../auth'", pt: "› causa: session.ts importa './auth', mas o arquivo está em '../auth'", pause: 500 },
  { kind: "info", text: "› fix: corrected the import, added a regression test", pt: "› correção: import ajustado e teste de regressão adicionado", pause: 500 },
  { kind: "info", text: "› pushed to branch fix/auth-import", pt: "› alterações enviadas para a branch fix/auth-import", pause: 900 },
  { kind: "cmd", text: "npm run build", pause: 500 },
  { kind: "ok", text: "✓ Compiled successfully", pt: "✓ Build concluído com sucesso", pause: 1200 },
  { kind: "cmd", text: "whoami", pause: 300 },
  { kind: "out", text: "jorge_cristo // full-stack developer // Brazil, UTC-3", pt: "jorge_cristo // desenvolvedor full-stack // Brasil, UTC-3", pause: 900 },
  { kind: "cmd", text: "cat services.txt", pause: 300 },
  { kind: "out", text: "> app rescue (React, Next.js, Node, including Lovable, Bolt or Cursor)", pt: "> resgate de apps (React, Next.js, Node, incluindo Lovable, Bolt ou Cursor)", pause: 250 },
  { kind: "out", text: "> web3: dApps, Solidity review, Farcaster mini apps", pt: "> web3: dApps, revisão de Solidity, mini apps para Farcaster", pause: 250 },
  { kind: "out", text: "> features & automation: Stripe, LLMs, n8n", pt: "> funcionalidades e automação: Stripe, LLMs, n8n", pause: 900 },
  { kind: "cmd", text: "status", pause: 300 },
  { kind: "ok", text: "● AVAILABLE FOR FREELANCE WORK", pt: "● DISPONÍVEL PARA PROJETOS FREELANCE", pause: 0 },
];

/** The line whose appearance means the build is fixed. */
const COMPILED_AT = SCRIPT.findIndex((line) => line.kind === "ok");
const TYPE_MS = 60;

/** Session flags: the log only plays once, and a closed terminal stays closed. */
const PLAYED_KEY = "matrix-booted";
const CLOSED_KEY = "matrix-terminal-closed";

const lineColor: Record<LineKind, string> = {
  cmd: "text-matrix-light-gray",
  info: "text-matrix-highlight/80",
  err: "text-red-400",
  ok: "text-matrix-accent text-phosphor-glow",
  out: "text-matrix-light-gray/90",
};

function readFlag(key: string) {
  try {
    return sessionStorage.getItem(key) === "1";
  } catch {
    return false;
  }
}

function writeFlag(key: string, on: boolean) {
  try {
    if (on) sessionStorage.setItem(key, "1");
    else sessionStorage.removeItem(key);
  } catch {
    // Storage blocked: the terminal just behaves as on a first visit.
  }
}

export default function HeroTerminal({
  lang,
  onCompiled,
  reducedMotion,
}: {
  lang: Locale;
  /** Called once the build is fixed (or the log is skipped or closed). */
  onCompiled: () => void;
  reducedMotion: boolean;
}) {
  const d = matrixCopy[lang];
  const [skipped] = useState(() => reducedMotion || readFlag(PLAYED_KEY));
  const [shown, setShown] = useState(skipped ? SCRIPT.length - 1 : 0);
  const [typed, setTyped] = useState(skipped ? Infinity : 0);
  const [open, setOpen] = useState(() => !readFlag(CLOSED_KEY));
  const [shake, setShake] = useState(0);
  const sound = useSoundOn();

  const done = shown >= SCRIPT.length - 1 && typed >= SCRIPT[SCRIPT.length - 1].text.length;

  const finish = useCallback(() => {
    setShown(SCRIPT.length - 1);
    setTyped(Infinity);
  }, []);

  // A finished, skipped or closed log counts as played for this session.
  useEffect(() => {
    if (done) writeFlag(PLAYED_KEY, true);
  }, [done]);

  useEffect(() => {
    if (shown >= COMPILED_AT || !open) onCompiled();
  }, [shown, open, onCompiled]);

  // Type commands character by character; print output lines whole.
  useEffect(() => {
    if (done || !open) return;
    const line = SCRIPT[shown];
    if (line.kind === "cmd" && typed < line.text.length) {
      const t = setTimeout(() => {
        keyClick();
        setTyped(typed + 1);
      }, TYPE_MS);
      return () => clearTimeout(t);
    }
    if (shown === SCRIPT.length - 1) return;
    const t = setTimeout(() => {
      const next = SCRIPT[shown + 1];
      if (next.kind === "err" && line.kind !== "err") {
        setShake((n) => n + 1);
        errorBuzz();
      }
      if (shown + 1 === COMPILED_AT) successChime();
      setShown(shown + 1);
      setTyped(next.kind === "cmd" ? 0 : Infinity);
    }, line.pause);
    return () => clearTimeout(t);
  }, [shown, typed, done, open]);

  const close = () => {
    finish();
    setOpen(false);
    writeFlag(CLOSED_KEY, true);
  };

  const reopen = () => {
    setOpen(true);
    writeFlag(CLOSED_KEY, false);
  };

  const titleButton =
    "rounded border border-matrix-accent/30 px-2 py-0.5 text-xs text-matrix-accent/80 hover:border-matrix-accent hover:text-matrix-accent sm:text-sm";

  if (!open) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-lg border border-matrix-accent/40 bg-matrix-black/80 px-4 py-3 font-mono-matrix text-left text-matrix-accent/80">
        <span>$ {d.terminalClosed}</span>
        <button type="button" onClick={reopen} className={titleButton}>
          {d.reopenTerminal}
        </button>
      </div>
    );
  }

  return (
    <div
      key={shake}
      className={`rounded-lg border-2 border-matrix-accent bg-matrix-black/90 p-4 text-left font-mono-matrix shadow-phosphor sm:p-6 ${
        shake ? "matrix-shake" : ""
      }`}
    >
      <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={close}
            tabIndex={-1}
            aria-hidden
            title={d.closeTerminal}
            className="group flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[11px] leading-none text-red-950 hover:bg-red-400"
          >
            <span aria-hidden>×</span>
          </button>
          <span className="h-3 w-3 rounded-full bg-yellow-500" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-matrix-accent" aria-hidden />
        </div>
        <span className="min-w-0 flex-1 truncate text-center text-sm text-matrix-accent/80 sm:text-base">~/client-app</span>
        <button type="button" onClick={() => setSoundOn(!sound)} aria-label={d.terminalSound} aria-pressed={sound} className={titleButton}>
          ♪ {sound ? d.soundOn : d.soundOff}
        </button>
        {!done && (
          <button type="button" onClick={finish} className={titleButton}>
            {d.skipTerminal} ⏭
          </button>
        )}
        <button type="button" onClick={close} className={titleButton} aria-label={d.closeTerminal}>
          <span className="hidden sm:inline">{d.close} </span>✕
        </button>
      </div>

      <p className="sr-only">
        {d.terminalSummary}
      </p>

      <div className="space-y-1 text-base leading-snug sm:text-lg" aria-hidden>
        {SCRIPT.slice(0, shown + 1).map((line, i) => {
          const current = i === shown;
          const text = line.kind === "cmd" ? line.text.slice(0, current ? typed : undefined) : lang === "pt" ? line.pt ?? line.text : line.text;
          return (
            <div key={i} className={`break-words ${lineColor[line.kind]}`}>
              {line.kind === "cmd" && <span className="text-matrix-accent">$ </span>}
              {text}
              {current && line.kind === "cmd" && !done && <span className="cursor-blink text-matrix-accent">█</span>}
            </div>
          );
        })}
        {done && (
          <div className="text-matrix-light-gray">
            <span className="text-matrix-accent">$ </span>
            <span className="cursor-blink text-matrix-accent">█</span>
          </div>
        )}
      </div>
    </div>
  );
}
