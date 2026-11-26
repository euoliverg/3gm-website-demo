import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Gallery, HeroMedia, Navigation, ProjectForm, type Photo } from "./interactive";
import media from "./work.json";
import { mediaPath } from "./media-path";

const work: { spa: Photo[]; projects: { title: string; photos: Photo[] }[] } = media;

const spa: Photo = {
  caption: "Slatted walls and cove lighting",
  src: "/media/spa-liberty-village-01.webp",
  alt: "Liberty Village spa room with walnut-toned slatted walls, a stone counter, a vessel sink and cove lighting",
};
const spaHero: Photo = {
  caption: "Stone, plaster and millwork",
  src: "/media/spa-liberty-village-03.webp",
  alt: "Completed Liberty Village spa room with a pebble-stone accent wall, wood cabinetry and a stone vessel sink",
};
const sectors = [
  ["Food Service", "Fit-outs for restaurants and cafés, with the service floor and back of house planned together."],
  ["Health & Wellness", "Interiors for spas, clinics and studios, shaped around the way clients and staff use each room."],
  ["Education", "Fit-outs and renovations for learning environments, planned around how the space needs to operate."],
];
const services = [
  ["Commercial Fit-Outs", "Turn an empty commercial unit into a space ready for your team and customers."],
  ["Renovations", "Rework existing interiors, from layout changes to detailed finish upgrades."],
  ["General Contracting", "Coordinate trades and manage site work from rough-in through final finishes."],
  ["Project Management", "Keep scope, scheduling and decisions aligned from planning to handover."],
];
const processSteps = [
  ["Site Visit", "Walk the space together and discuss how it needs to work."],
  ["Quote & Plan", "Define the scope, pricing and schedule before work begins."],
  ["Build", "Coordinate trades and keep you informed as work progresses."],
  ["Handover", "Walk through the finished space and review closeout items together."],
];

export default function Home() {
  const videoPath = "/media/spa-liberty-village-hero.mp4";
  const video = existsSync(join(process.cwd(), "public", videoPath.slice(1))) ? videoPath : undefined;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <div className="shell header-inner">
        <a href="#main" className="brand">
          <Image src={mediaPath("/media/3gm-logo.jpg")} alt="" width={48} height={48} unoptimized />
          <span><strong>3GM</strong>{" "}<small>General Contracting Inc.</small></span>
        </a>
        <Navigation />
        <a href="#contact" className="button header-cta">Start a Project <span aria-hidden="true">↗</span></a>
      </div>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-visual"><HeroMedia photo={spaHero} video={video ? mediaPath(video) : undefined} /></div>
        <div className="shell hero-inner">
          <div className="hero-copy">
          <p className="hero-location"><span aria-hidden="true"></span> Commercial construction in Ontario</p>
          <h1 id="hero-title">We build the rooms your business runs in.</h1>
          <p className="hero-description">Commercial fit-outs and renovations across Ontario. 20+ years building spaces for food service, health &amp; wellness and education.</p>
          <div className="hero-actions">
            <a className="button button-brass" href="#contact">Start a Project <span aria-hidden="true">↗</span></a>
            <a className="button button-outline" href="#work">See Our Work <span aria-hidden="true">↓</span></a>
          </div>
        </div>
          <a className="hero-caption" href="#work"><span><strong>Liberty Village Spa</strong><small>Toronto, Ontario</small></span><span aria-hidden="true">↘</span></a>
        </div>
      </section>
      <div className="credentials">
        <ul className="shell">
          <li><strong>20+</strong> years of experience</li>
          <li>Commercial specialists</li>
          <li>GC &amp; Project Management</li>
          <li>Ontario</li>
        </ul>
      </div>
      <section className="section shell" aria-labelledby="sectors">
        <h2 id="sectors">Who we build for</h2>
        <div className="sector-grid">
          {sectors.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>
      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="feature">
            <div className="feature-copy">
              <p className="location">Selected work <span aria-hidden="true">/</span> Toronto, Ontario</p>
              <h2 id="work-title">Liberty Village Spa</h2>
              <p>A commercial fit-out with a different finish story in each room, from pebble stone and plaster to wood slats and concealed lighting.</p>
            </div>
            <blockquote>“Once this space was constructed into a spa, a detailed finish was required in every room. Great team effort once again.”</blockquote>
          </div>
          <div className="feature-photo"><Gallery photos={[spa, spaHero, ...work.spa]} label="Liberty Village Spa" editorial /></div>
          <div className="other-work">
            <h3>More projects</h3>
            <div className="other-grid">
              <article><p className="location">Oakville, Ontario</p><h4>Triangular atrium</h4><p>LED outlines, fluted paneling and matched paint at a 35-foot-high atrium.</p></article>
              <article><p className="location">Oakville, Ontario</p><h4>Commercial interior fit-out</h4><p>Framing, drywall, flooring and painting, with coordinated mechanical, electrical, plumbing and fire safety work.</p></article>
              {work.projects.map(project => <article key={project.title}><h4>{project.title}</h4><Gallery photos={project.photos} label={project.title} /></article>)}
            </div>
          </div>
        </div>
      </section>
      <section className="section shell split" id="services" aria-labelledby="services-title">
        <div className="section-intro"><h2 id="services-title">Services</h2><p>Bring us in for a full fit-out or a defined renovation. We coordinate the trades and manage the work on site.</p><a className="text-link" href="#contact">Discuss your scope <span aria-hidden="true">↗</span></a></div>
        <div className="service-list">
          {services.map(([title, description]) => <article key={title}><h3>{title}</h3><p>{description}</p></article>)}
        </div>
      </section>
      <section className="section process" id="process" aria-labelledby="process-title">
        <div className="shell">
          <h2 id="process-title">From site visit to handover</h2>
          <ol className="steps">
            {processSteps.map(([title, description], index) => <li key={title}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{description}</p></li>)}
          </ol>
        </div>
      </section>
      <section className="section shell split contact" id="contact" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">Start a project</h2>
          <p>Tell us about your space, the work you need and when you plan to open.</p>
          <address><span>Serving Vaughan, Toronto, the GTA and across Ontario</span><a href="mailto:mario1976@hotmail.com">mario1976@hotmail.com <span aria-hidden="true">↗</span></a></address>
        </div>
        <ProjectForm />
      </section>
    </main>
    <footer><div className="shell footer-inner"><strong>3GM General Contracting Inc.</strong><span>Vaughan, Ontario · © {new Date().getFullYear()}</span><a href="#main">Back to top <span aria-hidden="true">↑</span></a></div></footer>
  </>;
}
