import Image from "next/image";
import LiveGallery from "./components/live-gallery";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const steps = [
  ["Arrive", "Settle in, exhale, and share what your hair needs today."],
  ["Restore", "Receive thoughtful care designed for your texture and goals."],
  ["Rise", "Leave rooted, renewed, and crowned in confidence."],
];

function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`leaf-sprig ${className}`} viewBox="0 0 240 420" aria-hidden="true">
      <path className="leaf-stem" d="M118 412C111 327 114 241 130 158C140 104 159 55 190 12" />
      <path className="leaf" d="M128 311C75 295 42 254 38 205C91 215 124 250 128 311Z" />
      <path className="leaf" d="M132 257C180 239 207 202 206 158C160 170 134 205 132 257Z" />
      <path className="leaf" d="M143 183C101 163 80 128 85 89C124 103 146 137 143 183Z" />
      <path className="leaf" d="M157 125C192 107 211 78 210 45C176 56 158 84 157 125Z" />
    </svg>
  );
}

export default async function Home() {
  const content = await getSiteContent();
  const bookingUrl = content.squareBookingUrl || process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rooted In Soul home">
          <span className="brand-mark brand-mark-logo"><Image src="/images/rooted-in-soul-mark.jpg" alt="" width={42} height={42} priority /></span>
          <span><strong>Rooted In Soul</strong><small>Hair &amp; Co.</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a><a href="#services">Services</a><a href="#ritual">The Ritual</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-book" href="#book">Book Now <span aria-hidden="true">↗</span></a>
      </header>
      {content.announcement && <div className="announcement"><span>ROOTED NOTE</span>{content.announcement}</div>}

      <section className="hero" id="top">
        <div className="hero-noise" />
        <LeafSprig className="hero-leaf hero-leaf-left" />
        <LeafSprig className="hero-leaf hero-leaf-right" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Rooted in heritage. Styled with intention.</p>
          <h1>Where Hair<br />Is <em>Heritage.</em></h1>
          <p className="hero-lede">A warm, elevated hair experience created to honor your texture, your story, and the confidence you carry.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#book">Book Now <span>↗</span></a>
            <a className="text-link" href="#services">Explore services <span>↓</span></a>
          </div>
          <div className="location"><span>●</span> Now welcoming clients in Tallahassee, Florida</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="arch arch-back" />
          <div className="arch arch-front"><Image src="/images/shawnie-portrait.jpeg" alt="" fill priority sizes="(max-width: 980px) 76vw, 33vw" /></div>
          <div className="heritage-stamp"><span>ROOTED</span><strong>R</strong><span>IN SOUL</span></div>
          <div className="leopard-card" />
        </div>
        <div className="scroll-note">SCROLL TO GET ROOTED <span>↓</span></div>
      </section>

      <section className="marquee" aria-label="Brand values"><div>HEALTHY HAIR <i>✦</i> ROOTED CONFIDENCE <i>✦</i> INTENTIONAL CARE <i>✦</i> HERITAGE IN EVERY STRAND</div></section>

      <section className="about section" id="about">
        <LeafSprig className="section-leaf about-leaf" />
        <div className="about-visual">
          <div className="portrait-frame"><Image src="/images/shawnie-portrait.jpeg" alt="Shawnie, founder and stylist of Rooted In Soul" fill sizes="(max-width: 980px) 90vw, 36vw" /></div>
          <div className="about-badge"><small>EST.</small><strong>RIS</strong><small>TALLAHASSEE</small></div>
          <p className="script-note">care for the crown</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow dark"><span /> Welcome, crowned one.</p>
          <h2>Hair care that feels<br />like coming <em>home.</em></h2>
          <p className="large-copy">Rooted In Soul is more than a salon chair. It is a space where culture, care, and confidence meet.</p>
          <p>Founded by Shawnie, every appointment is shaped by a genuine love for natural hair and the belief that your crown deserves to be understood—not managed. Here, the details matter and the experience is personal.</p>
          <div className="signature-row"><Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul illustrated mark" width={62} height={62} /><div><strong>Shawnie</strong><small>FOUNDER &amp; STYLIST</small></div></div>
        </div>
      </section>

      <section className="services section" id="services">
        <LeafSprig className="section-leaf services-leaf" />
        <div className="section-heading"><div><p className="eyebrow"><span /> Care for your crown</p><h2>Services, <em>rooted.</em></h2></div><p>Thoughtful services made for real life, healthy hair, and the version of you walking out the door.</p></div>
        <div className="service-grid">
          {content.services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-top"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div>
              {service.imageUrl ? <div className="service-illustration service-photo"><img src={service.imageUrl} alt={`${service.title} by Rooted In Soul`} loading="lazy" /></div> : <div className={`service-illustration art-0${(index % 3) + 1}`}><LeafSprig className="card-leaf" /><span>{service.title.charAt(0)}</span><small>ROOTED CARE</small></div>}
              {service.category && <span className="service-category">{service.category}</span>}<h3>{service.title}</h3>{service.price && <strong className="service-price">{service.price}</strong>}<p>{service.description}</p><a href="#book">View booking details <span>→</span></a>
            </article>
          ))}
        </div>
        <p className="services-note">Exact offerings, timing, and pricing will appear in Square Appointments once booking is connected.</p>
      </section>

      <section className="rooted-edit section" aria-label="Rooted In Soul brand story">
        <div className="edit-heading"><p className="eyebrow dark"><span /> The Rooted Edit</p><h2>Earthy by nature.<br /><em>Unapologetically you.</em></h2></div>
        <div className="edit-grid">
          <article className="edit-card edit-card-photo"><Image src="/images/shawnie-portrait.jpeg" alt="Shawnie, founder of Rooted In Soul" fill sizes="(max-width: 900px) 100vw, 38vw" /><div><small>01 / THE FOUNDER</small><strong>Rooted in purpose.</strong></div></article>
          <article className="edit-card edit-card-quote"><LeafSprig className="edit-leaf" /><small>THE PHILOSOPHY</small><blockquote>“Your crown carries a story. Let it be cared for with intention.”</blockquote><span>WHERE HAIR IS HERITAGE</span></article>
          <article className="edit-card edit-card-detail"><Image src="/images/shawnie-portrait.jpeg" alt="Rooted In Soul brand portrait detail" fill sizes="(max-width: 900px) 100vw, 24vw" /><div><small>02 / THE ENERGY</small><strong>Soft. Grounded. Confident.</strong></div></article>
        </div>
        <p className="lookbook-note">Now featuring real Rooted In Soul client work. New looks will be added straight from Shawnie’s stylist studio.</p>
      </section>

      <LiveGallery />

      <section className="ritual section" id="ritual">
        <LeafSprig className="section-leaf ritual-leaf" />
        <div className="ritual-intro"><p className="eyebrow"><span /> The Rooted Ritual</p><h2>More than an<br /><em>appointment.</em></h2><p>From the first hello to the final look, your time in the chair is designed to feel unrushed, affirming, and entirely yours.</p></div>
        <div className="ritual-steps">{steps.map((step, index) => <article key={step[0]}><span className="step-number">0{index + 1}</span><div><h3>{step[0]}</h3><p>{step[1]}</p></div></article>)}</div>
      </section>

      <section className="book section" id="book">
        <div className="book-copy"><p className="eyebrow dark"><span /> Your chair is waiting</p><h2>Ready to get<br /><em>rooted?</em></h2><p>Choose your service, find a time that works, and let the ritual begin. Square Appointments will handle confirmation and appointment details directly.</p><div className="book-assurances"><span>✓ Easy online booking</span><span>✓ Mobile confirmations</span><span>✓ Secure through Square</span></div><details className="booking-rules"><summary><small>BEFORE YOU BOOK</small><span>Read the full policies</span><b aria-hidden="true">+</b></summary><div>{content.bookingRules.map((rule) => <p key={rule}>{rule}</p>)}</div></details></div>
        <div className="booking-shell">
          <div className="booking-header"><div><small>ROOTED IN SOUL</small><strong>Book an appointment</strong></div><span>R</span></div>
          <div className="booking-body"><span className="square-tag">SQUARE APPOINTMENTS</span><h3>{bookingUrl ? "Online booking is open" : "Booking connection coming soon"}</h3><p>{bookingUrl ? "Use the secure booking page to choose your service and appointment time." : "This space is ready for Shawnie’s Square booking link. Once connected, clients will book here and receive confirmations on their phones."}</p>{bookingUrl ? <a className="button button-dark" href={bookingUrl} target="_blank" rel="noreferrer">Choose a service <span>↗</span></a> : <span className="button button-disabled" aria-disabled="true">Square booking goes here</span>}<small className="safe-note">Bookings and payments will be securely managed by Square.</small></div>
          <div className="booking-leopard" />
        </div>
      </section>

      <section className="social section" id="contact"><div className="social-card"><Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul brand illustration" width={180} height={180} /><div><p className="eyebrow"><span /> Stay connected</p><h2>Follow the <em>journey.</em></h2><p>Fresh styles, hair moments, booking news, and a little soul—straight from the chair.</p></div><a className="button button-light" href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">@rootedinsoul.co <span>↗</span></a></div></section>

      <footer><div className="footer-brand"><strong>Rooted In Soul</strong><span>WHERE HAIR IS HERITAGE</span></div><div><small>VISIT</small><p>Tallahassee, Florida<br />By appointment</p></div><div><small>CONNECT</small><p><a href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">Instagram ↗</a><br /><a href="#book">Book Now</a></p></div><div className="footer-bottom"><span>© 2026 Rooted In Soul Hair &amp; Co.</span><a className="footer-stylist-login" href="/studio">Stylist Login <span aria-hidden="true">→</span></a><span>Made with intention.</span></div></footer>
    </main>
  );
}
import Image from "next/image";
import LiveGallery from "./components/live-gallery";
import { getSiteContent } from "@/lib/site-content";

export const dynamic = "force-dynamic";

const steps = [
  ["Arrive", "Settle in, exhale, and share what your hair needs today."],
  ["Restore", "Receive thoughtful care designed for your texture and goals."],
  ["Rise", "Leave rooted, renewed, and crowned in confidence."],
];

function LeafSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`leaf-sprig ${className}`} viewBox="0 0 240 420" aria-hidden="true">
      <path className="leaf-stem" d="M118 412C111 327 114 241 130 158C140 104 159 55 190 12" />
      <path className="leaf" d="M128 311C75 295 42 254 38 205C91 215 124 250 128 311Z" />
      <path className="leaf" d="M132 257C180 239 207 202 206 158C160 170 134 205 132 257Z" />
      <path className="leaf" d="M143 183C101 163 80 128 85 89C124 103 146 137 143 183Z" />
      <path className="leaf" d="M157 125C192 107 211 78 210 45C176 56 158 84 157 125Z" />
    </svg>
  );
}

export default async function Home() {
  const content = await getSiteContent();
  const bookingUrl = content.squareBookingUrl || process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rooted In Soul home">
          <span className="brand-mark">R</span>
          <span><strong>Rooted In Soul</strong><small>Hair &amp; Co.</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a><a href="#services">Services</a><a href="#ritual">The Ritual</a><a href="#contact">Contact</a>
        </nav>
        <a className="nav-book" href="#book">Book your ritual <span aria-hidden="true">↗</span></a>
      </header>
      {content.announcement && <div className="announcement"><span>ROOTED NOTE</span>{content.announcement}</div>}

      <section className="hero" id="top">
        <div className="hero-noise" />
        <LeafSprig className="hero-leaf hero-leaf-left" />
        <LeafSprig className="hero-leaf hero-leaf-right" />
        <div className="hero-copy reveal">
          <p className="eyebrow"><span /> Rooted in heritage. Styled with intention.</p>
          <h1>Where Hair<br />Is <em>Heritage.</em></h1>
          <p className="hero-lede">A warm, elevated hair experience created to honor your texture, your story, and the confidence you carry.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#book">Book your ritual <span>↗</span></a>
            <a className="text-link" href="#services">Explore services <span>↓</span></a>
          </div>
          <div className="location"><span>●</span> Now welcoming clients in Tallahassee, Florida</div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="arch arch-back" />
          <div className="arch arch-front"><Image src="/images/shawnie-portrait.jpeg" alt="" fill priority sizes="(max-width: 980px) 76vw, 33vw" /></div>
          <div className="heritage-stamp"><span>ROOTED</span><strong>R</strong><span>IN SOUL</span></div>
          <div className="leopard-card" />
        </div>
        <div className="scroll-note">SCROLL TO GET ROOTED <span>↓</span></div>
      </section>

      <section className="marquee" aria-label="Brand values"><div>HEALTHY HAIR <i>✦</i> ROOTED CONFIDENCE <i>✦</i> INTENTIONAL CARE <i>✦</i> HERITAGE IN EVERY STRAND</div></section>

      <section className="about section" id="about">
        <LeafSprig className="section-leaf about-leaf" />
        <div className="about-visual">
          <div className="portrait-frame"><Image src="/images/shawnie-portrait.jpeg" alt="Shawnie, founder and stylist of Rooted In Soul" fill sizes="(max-width: 980px) 90vw, 36vw" /></div>
          <div className="about-badge"><small>EST.</small><strong>RIS</strong><small>TALLAHASSEE</small></div>
          <p className="script-note">care for the crown</p>
        </div>
        <div className="about-copy">
          <p className="eyebrow dark"><span /> Welcome, crowned one.</p>
          <h2>Hair care that feels<br />like coming <em>home.</em></h2>
          <p className="large-copy">Rooted In Soul is more than a salon chair. It is a space where culture, care, and confidence meet.</p>
          <p>Founded by Shawnie, every appointment is shaped by a genuine love for natural hair and the belief that your crown deserves to be understood—not managed. Here, the details matter and the experience is personal.</p>
          <div className="signature-row"><Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul illustrated mark" width={62} height={62} /><div><strong>Shawnie</strong><small>FOUNDER &amp; STYLIST</small></div></div>
        </div>
      </section>

      <section className="services section" id="services">
        <LeafSprig className="section-leaf services-leaf" />
        <div className="section-heading"><div><p className="eyebrow"><span /> Care for your crown</p><h2>Services, <em>rooted.</em></h2></div><p>Thoughtful services made for real life, healthy hair, and the version of you walking out the door.</p></div>
        <div className="service-grid">
          {content.services.map((service, index) => (
            <article className="service-card" key={service.title}>
              <div className="service-top"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">↗</span></div>
              <div className={`service-illustration art-0${(index % 3) + 1}`}><LeafSprig className="card-leaf" /><span>{service.title.charAt(0)}</span><small>ROOTED CARE</small></div>
              <h3>{service.title}</h3>{service.price && <strong className="service-price">{service.price}</strong>}<p>{service.description}</p><a href="#book">View booking details <span>→</span></a>
            </article>
          ))}
        </div>
        <p className="services-note">Exact offerings, timing, and pricing will appear in Square Appointments once booking is connected.</p>
      </section>

      <section className="rooted-edit section" aria-label="Rooted In Soul brand story">
        <div className="edit-heading"><p className="eyebrow dark"><span /> The Rooted Edit</p><h2>Earthy by nature.<br /><em>Unapologetically you.</em></h2></div>
        <div className="edit-grid">
          <article className="edit-card edit-card-photo"><Image src="/images/shawnie-portrait.jpeg" alt="Shawnie, founder of Rooted In Soul" fill sizes="(max-width: 900px) 100vw, 38vw" /><div><small>01 / THE FOUNDER</small><strong>Rooted in purpose.</strong></div></article>
          <article className="edit-card edit-card-quote"><LeafSprig className="edit-leaf" /><small>THE PHILOSOPHY</small><blockquote>“Your crown carries a story. Let it be cared for with intention.”</blockquote><span>WHERE HAIR IS HERITAGE</span></article>
          <article className="edit-card edit-card-detail"><Image src="/images/shawnie-portrait.jpeg" alt="Rooted In Soul brand portrait detail" fill sizes="(max-width: 900px) 100vw, 24vw" /><div><small>02 / THE ENERGY</small><strong>Soft. Grounded. Confident.</strong></div></article>
        </div>
        <p className="lookbook-note">Now featuring real Rooted In Soul client work. New looks will be added straight from Shawnie’s stylist studio.</p>
      </section>

      <LiveGallery />

      <section className="ritual section" id="ritual">
        <LeafSprig className="section-leaf ritual-leaf" />
        <div className="ritual-intro"><p className="eyebrow"><span /> The Rooted Ritual</p><h2>More than an<br /><em>appointment.</em></h2><p>From the first hello to the final look, your time in the chair is designed to feel unrushed, affirming, and entirely yours.</p></div>
        <div className="ritual-steps">{steps.map((step, index) => <article key={step[0]}><span className="step-number">0{index + 1}</span><div><h3>{step[0]}</h3><p>{step[1]}</p></div></article>)}</div>
      </section>

      <section className="book section" id="book">
        <div className="book-copy"><p className="eyebrow dark"><span /> Your chair is waiting</p><h2>Ready to get<br /><em>rooted?</em></h2><p>Choose your service, find a time that works, and let the ritual begin. Square Appointments will handle confirmation and appointment details directly.</p><div className="book-assurances"><span>✓ Easy online booking</span><span>✓ Mobile confirmations</span><span>✓ Secure through Square</span></div><details className="booking-rules"><summary><small>BEFORE YOU BOOK</small><span>Read the full policies</span><b aria-hidden="true">+</b></summary><div>{content.bookingRules.map((rule) => <p key={rule}>{rule}</p>)}</div></details></div>
        <div className="booking-shell">
          <div className="booking-header"><div><small>ROOTED IN SOUL</small><strong>Book an appointment</strong></div><span>R</span></div>
          <div className="booking-body"><span className="square-tag">SQUARE APPOINTMENTS</span><h3>{bookingUrl ? "Online booking is open" : "Booking connection coming soon"}</h3><p>{bookingUrl ? "Use the secure booking page to choose your service and appointment time." : "This space is ready for Shawnie’s Square booking link. Once connected, clients will book here and receive confirmations on their phones."}</p>{bookingUrl ? <a className="button button-dark" href={bookingUrl} target="_blank" rel="noreferrer">Choose a service <span>↗</span></a> : <span className="button button-disabled" aria-disabled="true">Square booking goes here</span>}<small className="safe-note">Bookings and payments will be securely managed by Square.</small></div>
          <div className="booking-leopard" />
        </div>
      </section>

      <section className="social section" id="contact"><div className="social-card"><Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul brand illustration" width={180} height={180} /><div><p className="eyebrow"><span /> Stay connected</p><h2>Follow the <em>journey.</em></h2><p>Fresh styles, hair moments, booking news, and a little soul—straight from the chair.</p></div><a className="button button-light" href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">@rootedinsoul.co <span>↗</span></a></div></section>

      <footer><div className="footer-brand"><strong>Rooted In Soul</strong><span>WHERE HAIR IS HERITAGE</span></div><div><small>VISIT</small><p>Tallahassee, Florida<br />By appointment</p></div><div><small>CONNECT</small><p><a href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">Instagram ↗</a><br /><a href="#book">Book a ritual</a></p></div><div className="footer-bottom"><span>© 2026 Rooted In Soul Hair &amp; Co.</span><span>Made with intention.</span></div></footer>
    </main>
  );
}
