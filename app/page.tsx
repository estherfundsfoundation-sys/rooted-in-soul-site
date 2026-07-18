import Image from "next/image";

const services = [
  {
    number: "01",
    title: "Loc Care",
    text: "Intentional care for every stage of your loc journey—from maintenance to styling.",
  },
  {
    number: "02",
    title: "Natural Hair",
    text: "Healthy-hair rituals that honor your texture, protect your crown, and keep you feeling like you.",
  },
  {
    number: "03",
    title: "Signature Styles",
    text: "Polished, expressive looks created around your lifestyle, your energy, and your next moment.",
  },
];

const steps = [
  ["Arrive", "Settle in, exhale, and share what your hair needs today."],
  ["Restore", "Receive thoughtful care designed for your texture and goals."],
  ["Rise", "Leave rooted, renewed, and crowned in confidence."],
];

export default function Home() {
  const bookingUrl = process.env.NEXT_PUBLIC_SQUARE_BOOKING_URL;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Rooted In Soul home">
          <span className="brand-mark">R</span>
          <span><strong>Rooted In Soul</strong><small>Hair &amp; Co.</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#ritual">The Ritual</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-book" href="#book">Book your ritual <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-noise" />
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
          <div className="arch arch-front">
            <Image src="/images/shawnie-portrait.jpeg" alt="" fill priority sizes="(max-width: 980px) 76vw, 33vw" />
          </div>
          <div className="heritage-stamp"><span>ROOTED</span><strong>R</strong><span>IN SOUL</span></div>
          <div className="leopard-card" />
        </div>
        <div className="scroll-note">SCROLL TO GET ROOTED <span>↓</span></div>
      </section>

      <section className="marquee" aria-label="Brand values">
        <div>HEALTHY HAIR <i>✦</i> ROOTED CONFIDENCE <i>✦</i> INTENTIONAL CARE <i>✦</i> HERITAGE IN EVERY STRAND</div>
      </section>

      <section className="about section" id="about">
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
          <div className="signature-row">
            <Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul illustrated mark" width={62} height={62} />
            <div><strong>Shawnie</strong><small>FOUNDER &amp; STYLIST</small></div>
          </div>
        </div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <div><p className="eyebrow"><span /> Care for your crown</p><h2>Services, <em>rooted.</em></h2></div>
          <p>Thoughtful services made for real life, healthy hair, and the version of you walking out the door.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-top"><span>{service.number}</span><span aria-hidden="true">↗</span></div>
              <div className={`service-illustration art-${service.number}`}><span>{service.title.charAt(0)}</span></div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href="#book">View booking details <span>→</span></a>
            </article>
          ))}
        </div>
        <p className="services-note">Exact offerings, timing, and pricing will appear in Square Appointments once booking is connected.</p>
      </section>

      <section className="ritual section" id="ritual">
        <div className="ritual-intro">
          <p className="eyebrow"><span /> The Rooted Ritual</p>
          <h2>More than an<br /><em>appointment.</em></h2>
          <p>From the first hello to the final look, your time in the chair is designed to feel unrushed, affirming, and entirely yours.</p>
        </div>
        <div className="ritual-steps">
          {steps.map((step, index) => (
            <article key={step[0]}>
              <span className="step-number">0{index + 1}</span>
              <div><h3>{step[0]}</h3><p>{step[1]}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="book section" id="book">
        <div className="book-copy">
          <p className="eyebrow dark"><span /> Your chair is waiting</p>
          <h2>Ready to get<br /><em>rooted?</em></h2>
          <p>Choose your service, find a time that works, and let the ritual begin. Square Appointments will handle confirmation and appointment details directly.</p>
          <div className="book-assurances"><span>✓ Easy online booking</span><span>✓ Mobile confirmations</span><span>✓ Secure through Square</span></div>
        </div>
        <div className="booking-shell">
          <div className="booking-header"><div><small>ROOTED IN SOUL</small><strong>Book an appointment</strong></div><span>R</span></div>
          <div className="booking-body">
            <span className="square-tag">SQUARE APPOINTMENTS</span>
            <h3>{bookingUrl ? "Online booking is open" : "Booking connection coming soon"}</h3>
            <p>{bookingUrl ? "Use the secure booking page to choose your service and appointment time." : "This space is ready for Shawnie’s Square booking link. Once connected, clients will book here and receive confirmations on their phones."}</p>
            {bookingUrl ? (
              <a className="button button-dark" href={bookingUrl} target="_blank" rel="noreferrer">Choose a service <span>↗</span></a>
            ) : (
              <span className="button button-disabled" aria-disabled="true">Square booking goes here</span>
            )}
            <small className="safe-note">Bookings and payments will be securely managed by Square.</small>
          </div>
          <div className="booking-leopard" />
        </div>
      </section>

      <section className="social section" id="contact">
        <div className="social-card">
          <Image src="/images/rooted-in-soul-mark.jpg" alt="Rooted In Soul brand illustration" width={180} height={180} />
          <div><p className="eyebrow"><span /> Stay connected</p><h2>Follow the <em>journey.</em></h2><p>Fresh styles, hair moments, booking news, and a little soul—straight from the chair.</p></div>
          <a className="button button-light" href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">@rootedinsoul.co <span>↗</span></a>
        </div>
      </section>

      <footer>
        <div className="footer-brand"><strong>Rooted In Soul</strong><span>WHERE HAIR IS HERITAGE</span></div>
        <div><small>VISIT</small><p>Tallahassee, Florida<br />By appointment</p></div>
        <div><small>CONNECT</small><p><a href="https://www.instagram.com/rootedinsoul.co" target="_blank" rel="noreferrer">Instagram ↗</a><br /><a href="#book">Book a ritual</a></p></div>
        <div className="footer-bottom"><span>© 2026 Rooted In Soul Hair &amp; Co.</span><span>Made with intention.</span></div>
      </footer>
    </main>
  );
}
