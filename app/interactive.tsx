"use client";

import Image from "next/image";
import { mediaPath } from "./media-path";
import { LazyMotion, domAnimation } from "framer-motion";
import * as m from "framer-motion/m";
import { useEffect, useRef, useState, type FormEvent } from "react";

export type Photo = { src: string; alt: string };

export function HeroMedia({photo, video}: {photo: Photo; video?: string}) {
  const [canPlay, setCanPlay] = useState(false);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    function update() { setCanPlay(!preference.matches); }
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  return <>
    <LazyMotion features={domAnimation} strict><m.div className="hero-media" initial={{scale: 1.035}} animate={{scale: 1}} transition={{duration: 1.3}}>
      <Image {...photo} src={mediaPath(photo.src)} fill sizes="100vw" quality={65} loading="eager" fetchPriority="high" />
      {video && canPlay && playing && <video autoPlay muted loop playsInline preload="none" poster={mediaPath(photo.src)} src={video} aria-hidden="true" />}
    </m.div></LazyMotion>
    {video && canPlay && <button className="video-toggle" onClick={() => setPlaying(!playing)}>{playing ? "Pause video" : "Play video"}</button>}
  </>;
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
    <nav id="site-nav" aria-label="Main navigation" data-open={open} onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
      }
    }}>
      {[["Our Work", "work"], ["Services", "services"], ["Process", "process"], ["Contact", "contact"]].map(([label, id]) => <a key={id} href={"#" + id} onClick={() => setOpen(false)}>{label}</a>)}
    </nav>
  </>;
}

export function Gallery({photos, label}: {photos: Photo[]; label: string}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  function move(offset: number) {
    setIndex(current => (current + offset + photos.length) % photos.length);
  }
  return <>
    <div className="gallery-grid">
      {photos.map((photo, i) => <button key={photo.src} type="button" className="gallery-photo" aria-label={"Enlarge photo: " + photo.alt} onClick={(event) => {
        trigger.current = event.currentTarget;
        setIndex(i);
        dialog.current?.showModal();
      }}>
        <Image {...photo} src={mediaPath(photo.src)} fill sizes={i === 0 ? "(max-width: 760px) 92vw, 53vw" : "(max-width: 760px) 30vw, 18vw"} />
        <span aria-hidden="true">↗</span>
      </button>)}
    </div>
    <dialog ref={dialog} aria-label={label} onClose={() => trigger.current?.focus()} onKeyDown={(event) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    }} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="lightbox">
        <div className="lightbox-bar">
          <span>{label}</span>
          <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button>
        </div>
        <div className="lightbox-image">
          {photos[index] && <Image {...photos[index]} src={mediaPath(photos[index].src)} fill sizes="90vw" loading="lazy" />}
        </div>
        {photos.length > 1 && <div className="lightbox-bar">
          <button type="button" onClick={() => move(-1)}>Previous</button>
          <span aria-live="polite">{index + 1} / {photos.length}</span>
          <button type="button" onClick={() => move(1)}>Next</button>
        </div>}
      </div>
    </dialog>
  </>;
}

export function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Future integration: send FormData to a server-side Resend route or a Formspree endpoint.
    setSubmitted(true);
  }
  return <form onSubmit={submit} className="project-form">
    <div className="form-grid">
      <label>Name <input name="name" autoComplete="name" required /></label>
      <label>Company <input name="company" autoComplete="organization" /></label>
      <label>Email <input name="email" type="email" autoComplete="email" required /></label>
      <label>Phone <input name="phone" type="tel" autoComplete="tel" /></label>
      <label>Type of space <select name="space" defaultValue="" required>
        <option value="" disabled>Select a type</option>
        {["Restaurant/Café", "Spa/Clinic/Studio", "School/Education", "Office/Retail", "Other"].map(option => <option key={option}>{option}</option>)}
      </select></label>
      <label>Approx. size in sq ft <input name="size" type="number" min="1" inputMode="numeric" /></label>
      <label className="wide">Target opening date <input name="opening" type="date" /></label>
      <label className="wide">Project details <textarea name="details" rows={4} required /></label>
    </div>
    <button type="submit" className="button button-brass">Submit Project Details <span aria-hidden="true">↗</span></button>
    <p className="form-status" role="status">{submitted ? "Thanks. Your form submission was confirmed in this demo. Please email us directly to discuss your project." : ""}</p>
  </form>;
}





