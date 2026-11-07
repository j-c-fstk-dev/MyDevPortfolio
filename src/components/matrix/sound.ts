"use client";

import { useSyncExternalStore } from "react";

/**
 * Optional Matrix sound effects, synthesized with the Web Audio API (no audio
 * files). Off by default; the choice is remembered in this browser.
 */

const STORAGE_KEY = "matrix-sound";
const EVENT = "matrix-sound-change";

let ctx: AudioContext | null = null;
/** Cached preference, so the store snapshot stays stable between reads. */
let memory: boolean | null = null;

function readPref(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "on";
  } catch {
    return false;
  }
}

export function setSoundOn(on: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, on ? "on" : "off");
  } catch {
    // Storage blocked: the toggle still works for this page view.
  }
  memory = on;
  window.dispatchEvent(new Event(EVENT));
}

const isOn = () => (memory ??= readPref());

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/** Whether sound is on, kept in sync across components. */
export const useSoundOn = () => useSyncExternalStore(subscribe, isOn, () => false);

function audio(): AudioContext | null {
  if (!isOn() || typeof window === "undefined") return null;
  ctx ??= new AudioContext();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(freq: number, duration: number, type: OscillatorType, volume: number, when = 0) {
  const ac = audio();
  if (!ac) return;
  const start = ac.currentTime + when;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(volume, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

/** A short key click for each typed character. */
export function keyClick() {
  const ac = audio();
  if (!ac) return;
  const length = Math.floor(ac.sampleRate * 0.012);
  const buffer = ac.createBuffer(1, length, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  const source = ac.createBufferSource();
  const gain = ac.createGain();
  gain.gain.value = 0.12;
  source.buffer = buffer;
  source.connect(gain).connect(ac.destination);
  source.start();
}

/** Low buzz for a failed build. */
export const errorBuzz = () => tone(110, 0.28, "sawtooth", 0.05);

/** Two rising notes for a successful build. */
export function successChime() {
  tone(660, 0.18, "sine", 0.06);
  tone(990, 0.3, "sine", 0.05, 0.12);
}
