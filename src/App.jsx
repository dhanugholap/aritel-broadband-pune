import { useState, useEffect } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Gamepad2,
  Headphones,
  Home,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Router,
  ShieldCheck,
  Sparkles,
  Users,
  Wifi,
  X,
} from "lucide-react";
import { siteConfig, whatsappMessage } from "./siteConfig";
import "./App.css";
import "./banner.css";

const benefitCopy = [
  "Compare suitable speeds for your household needs.",
  "Understand what is available at your exact address.",
  "Choose an option based on your usage and budget.",
  "Submit your details so installation can be discussed.",
  "Reach our team by phone or WhatsApp for help.",
  "A short form makes starting your enquiry easy.",
];
const useCases = [
  [Monitor, "Work from home"],
  [BookOpen, "Online classes"],
  [Sparkles, "Video streaming"],
  [Gamepad2, "Gaming"],
  [Users, "Video calls"],
  [Home, "Smart home devices"],
];
const faqs = [
  "How can I check broadband availability?",
  "How long does installation take?",
  "Which broadband plans are available?",
  "What documents are required?",
  "Are installation charges applicable?",
  "Is a router included?",
  "How can I contact customer support?",
  "Are plans available in my area?",
  "Can I change my broadband plan?",
  "How can I request a new connection?",
];

function WhatsAppIcon({ size = 17 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.92L.1 24l6.34-1.66a11.87 11.87 0 0 0 5.64 1.43h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.17-3.45-8.39ZM12.09 21.7h-.01a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.76.99 1-3.66-.23-.38a9.85 9.85 0 1 1 8.36 4.63Zm5.4-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5s1.07 2.9 1.22 3.1c.15.2 2.1 3.21 5.09 4.5.71.31 1.27.5 1.7.64.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [floatingVisible, setFloatingVisible] = useState(true);
  const closeMenu = () => setMenuOpen(false);

  // Intersection Observer – fires reveal animations on scroll
  useEffect(() => {
    const selectors = ".reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children";
    const els = document.querySelectorAll(selectors);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Hide floating buttons while scrolling, show when stopped
  useEffect(() => {
    let timer;
    const onScroll = () => {
      setFloatingVisible(false);
      clearTimeout(timer);
      timer = setTimeout(() => setFloatingVisible(true), 800);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const mobile = String(data.get("mobile")).replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    const payload = Object.fromEntries(data.entries());
    const leadMessage = `New broadband enquiry\nName: ${payload.name}\nMobile: ${payload.mobile}\nPincode: ${payload.pincode}\nArea: ${payload.area}\nPlan: ${payload.plan || "Not selected"}\nEmail: ${payload.email || "Not provided"}`;
    try {
      await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          _subject: "New Pune broadband enquiry",
          _captcha: "true",
        }),
      });
    } catch {
      setError("Email service is unavailable. Please use WhatsApp or call us.");
    }
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(leadMessage)}`,
      "_blank",
      "noopener,noreferrer",
    );
    form.reset();
    setSubmitted(true);
  }
  return (
    <div className="site-shell">
      <div className="notice">
        <span>Independent broadband connection assistance for Pune</span>
        <a href={`tel:+91${siteConfig.phone}`}>
          <Phone size={14} /> Call {siteConfig.phone}
        </a>
      </div>
      <header className="nav wrap">
        <a className="brand" href="#home">
          <span className="brand-symbol">PF</span>
          <span>
            <strong>{siteConfig.businessName}</strong>
            <small>{siteConfig.eyebrow}</small>
          </span>
        </a>
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>
            Home
          </a>
          <a href="#plans" onClick={closeMenu}>
            Broadband Plans
          </a>
          <a href="#benefits" onClick={closeMenu}>
            Benefits
          </a>
          <a href="#how-it-works" onClick={closeMenu}>
            How It Works
          </a>
          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>
          <a href={`tel:+91${siteConfig.phone}`} className="nav-phone">
            <Phone size={15} /> Call Now
          </a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Get Connection <ArrowRight size={15} />
          </a>
        </nav>
      </header>
      <main>
        <section className="hero wrap" id="home">
          <div className="hero-copy reveal-left">
            <p className="eyebrow">
              <span /> AIRTEL BROADBAND PUNE
            </p>
            <h1>
              Fast & reliable
              <br />
              <em>Airtel broadband for Pune.</em>
            </h1>
            <p>
              Get a new Airtel broadband internet connection in Pune — plans
              from ₹499/month. Available in Kharadi, Viman Nagar, Hadapsar,
              Wagholi, Magarpatta and all Pune areas.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#contact">
                Check availability <ArrowRight size={17} />
              </a>
              <a className="button secondary" href="#plans">
                View plans
              </a>
            </div>
            <div className="trust-points">
              <span>
                <Check size={15} /> High-speed internet
              </span>
              <span>
                <Check size={15} /> Quick installation enquiry
              </span>
              <span>
                <Check size={15} /> Local assistance
              </span>
            </div>
          </div>
          <div className="hero-visual reveal-right">
            <div className="visual-ring" />
            <div className="visual-card">
              <Wifi size={39} />
              <span>
                HOME
                <br />
                <b>CONNECTED</b>
              </span>
              <div className="signal">
                <i />
                <i />
                <i />
                <i />
              </div>
            </div>
            <div className="visual-note">
              <strong>01</strong>
              <span>
                Find a plan
                <br />
                for your home
              </span>
            </div>
          </div>
        </section>
        <section className="strip">
          <div className="wrap strip-grid stagger-children">
            <span>
              <Wifi /> High-speed connectivity
            </span>
            <span>
              <ShieldCheck /> Transparent enquiry
            </span>
            <span>
              <Headphones /> Dedicated assistance
            </span>
            <span>
              <Home /> Pune service area
            </span>
          </div>
        </section>
        <section className="section wrap" id="plans">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">
                <span /> AIRTEL XSTREAM FIBER PLANS PUNE
              </p>
              <h2>
                Airtel broadband
                <br />
                <em>plans for Pune.</em>
              </h2>
            </div>
            <p>
              Explore indicative options and submit your details to check
              current availability and pricing for your exact location.
            </p>
          </div>
          <div className="plans-grid stagger-children">
            {siteConfig.plans.map((plan, index) => (
              <article
                className={plan.featured ? "plan-card featured" : "plan-card"}
                key={plan.name}
              >
                <div className="plan-top">
                  <span>PLAN {String(index + 1).padStart(2, '0')}</span>
                  {plan.featured && <b>POPULAR CHOICE</b>}
                </div>
                <h3>{plan.name}</h3>
                {plan.planType && (
                  <p className="plan-type-badge">{plan.planType}</p>
                )}
                <p className="speed">
                  {plan.speed} <span>speed</span>
                </p>
                <div className="price">
                  <small>From</small>₹{plan.price}
                  <span>/ month</span>
                </div>
                <p className="data">{plan.data} data allowance*</p>
                <ul>
                  {plan.benefits.map((benefit) => (
                    <li key={benefit}>
                      <Check size={15} /> {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="plan-link">
                  Get this plan <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="fine-print">
            *Placeholder data only. Plans, prices, benefits, installation
            charges and availability may change. Confirm before advertising or
            selling.
          </p>
        </section>
        <section className="dark-section" id="benefits">
          <div className="wrap">
            <div className="section-heading light reveal">
              <div>
                <p className="eyebrow">
                  <span /> WHY CHOOSE AIRTEL BROADBAND PUNE
                </p>
                <h2>
                  Airtel internet
                  <br />
                  <em>starts here.</em>
                </h2>
              </div>
              <p>
                Simple information, local assistance and a clear path from
                enquiry to connection.
              </p>
            </div>
            <div className="benefit-grid stagger-children">
              {[
                "High-Speed Connectivity",
                "Reliable Service",
                "Flexible Plans",
                "Quick Installation",
                "Dedicated Assistance",
                "Easy Enquiry Process",
              ].map((title, index) => {
                const Icon = [
                  Wifi,
                  Router,
                  Sparkles,
                  Clock3,
                  Headphones,
                  Check,
                ][index];
                return (
                  <article key={title}>
                    <Icon />
                    <h3>{title}</h3>
                    <p>{benefitCopy[index]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section wrap process-section" id="how-it-works">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">
                <span /> HOW IT WORKS
              </p>
              <h2>
                Three steps to
                <br />
                <em>get connected.</em>
              </h2>
            </div>
            <p>
              We keep the process straightforward from your first enquiry to the
              availability check.
            </p>
          </div>
          <div className="process-grid stagger-children">
            <div>
              <b>01</b>
              <BookOpen />
              <h3>Submit enquiry</h3>
              <p>Share your name, number, pincode and preferred plan.</p>
            </div>
            <div>
              <b>02</b>
              <MapPin />
              <h3>Check availability</h3>
              <p>Our representative checks options for your exact locality.</p>
            </div>
            <div>
              <b>03</b>
              <Router />
              <h3>Get connected</h3>
              <p>
                Discuss installation, charges and next steps before proceeding.
              </p>
            </div>
          </div>
        </section>
        <section className="use-section">
          <div className="wrap">
            <div className="section-heading light reveal">
              <div>
                <p className="eyebrow">
                  <span /> MADE FOR YOUR DAY
                </p>
                <h2>
                  One connection.
                  <br />
                  <em>Many possibilities.</em>
                </h2>
              </div>
            </div>
            <div className="use-grid stagger-children">
              {useCases.map(([Icon, title]) => (
                <div key={title}>
                  <Icon />
                  <span>{title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="offer-section wrap">
          <div className="reveal-left">
            <p className="eyebrow">
              <span /> OFFERS & BENEFITS
            </p>
            <h2>
              Want the latest
              <br />
              <em>available offer?</em>
            </h2>
          </div>
          <div className="reveal-right">
            <p>
              Contact us to check the latest available offers for your location.
              Offers are subject to provider terms and local availability.
            </p>
            <a
              className="button primary"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              Ask on WhatsApp <WhatsAppIcon />
            </a>
          </div>
        </section>
        <section className="trust-section">
          <div className="wrap trust-grid stagger-children">
            <div>
              <ShieldCheck />
              <h3>Transparent plans</h3>
              <p>
                We share indicative information and confirm final details before
                you proceed.
              </p>
            </div>
            <div>
              <MapPin />
              <h3>Local assistance</h3>
              <p>
                Tell us your Pune area so we can guide you through the
                availability check.
              </p>
            </div>
            <div>
              <Headphones />
              <h3>Easy support</h3>
              <p>
                Call or message when you need help understanding your connection
                options.
              </p>
            </div>
          </div>
        </section>
        <section className="faq-section wrap" id="faq">
          <div className="faq-title reveal-left">
            <p className="eyebrow">
              <span /> QUESTIONS, ANSWERED
            </p>
            <h2>
              Before you
              <br />
              <em>get started.</em>
            </h2>
          </div>
          <div className="faq-list reveal-right">
            {faqs.map((question, index) => (
              <div
                className={openFaq === index ? "faq open" : "faq"}
                key={question}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  {question}
                  <ChevronDown size={18} />
                </button>
                {openFaq === index && (
                  <p>
                    Availability, charges, documents and plan benefits depend on
                    the provider and your exact address. Submit the enquiry form
                    or contact our team for current information.
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="contact-section wrap" id="contact">
          <div className="contact-copy reveal-left">
            <p className="eyebrow">
              <span /> NEW AIRTEL BROADBAND CONNECTION PUNE
            </p>
            <h2>
              Check Airtel
              <br />
              <em>availability.</em>
            </h2>
            <p>
              Get a new Airtel broadband connection in Pune. Share your
              details and our representative will check Airtel Xstream Fiber
              availability at your exact address.
            </p>
            <div className="contact-details">
              <a href={`tel:+91${siteConfig.phone}`}>
                <Phone /> {siteConfig.phone}
              </a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> WhatsApp
              </a>
              <a href={`mailto:${siteConfig.email}`}>
                <span>@</span> {siteConfig.email}
              </a>
              <span>
                <Clock3 /> {siteConfig.hours}
              </span>
            </div>
          </div>
          <form className="lead-form reveal-right" onSubmit={handleSubmit}>
            {submitted ? (
              <div className="success">
                <Check size={30} />
                <h3>Thank you, your request is received.</h3>
                <p>
                  Our representative will contact you shortly. Your WhatsApp
                  message is ready to send.
                </p>
              </div>
            ) : (
              <>
                <h3>Get Airtel Broadband Connection in Pune</h3>
                <p className="form-subtitle">Pune, Maharashtra – Airtel Xstream Fiber</p>
                <label>
                  Full Name
                  <input name="name" required placeholder="Your full name" />
                </label>
                <label>
                  Mobile Number
                  <input
                    name="mobile"
                    required
                    inputMode="numeric"
                    placeholder="10-digit Indian mobile number"
                  />
                </label>
                <div className="two-fields">
                  <label>
                    Pincode
                    <input
                      name="pincode"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      placeholder="411001"
                    />
                  </label>
                  <label>
                    Area / Locality
                    <input name="area" required placeholder="Your area" />
                  </label>
                </div>
                <label>
                  Preferred Plan
                  <select name="plan" defaultValue="" required>
                    <option value="" disabled>
                      Select a plan
                    </option>
                    {siteConfig.plans.map((plan) => (
                      <option key={plan.name}>
                        {plan.name} - {plan.speed}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Email <span>(optional)</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </label>
                {error && <p className="form-error">{error}</p>}
                <button className="button primary" type="submit">
                  Check Availability <ArrowRight size={17} />
                </button>
                <p className="form-note">
                  By submitting, you agree to be contacted about broadband
                  services.
                </p>
              </>
            )}
          </form>
        </section>
        <section className="areas-section wrap">
          <div className="reveal-left">
            <p className="eyebrow">
              <span /> AIRTEL BROADBAND SERVICE AREA PUNE
            </p>
            <h2>
              Pune areas, <em>we cover.</em>
            </h2>
            <p>
              Airtel broadband available in Kharadi, Viman Nagar, Hadapsar,
              Magarpatta, Wagholi and more. Check your pincode for exact
              Airtel Xstream Fiber availability.
            </p>
          </div>
          <div className="area-list reveal-right">
            {siteConfig.serviceAreas.map((area) => (
              <span key={area}>{area}</span>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-symbol">PF</span>
              <span>
                <strong>{siteConfig.businessName}</strong>
                <small>Airtel broadband connection assistance Pune</small>
              </span>
            </a>
            <p>
              Helping Pune customers get a new Airtel broadband internet
              connection. Serving Kharadi, Viman Nagar, Hadapsar, Wagholi,
              Magarpatta and all Pune areas.
            </p>
          </div>
          <div>
            <h4>Quick links</h4>
            <a href="#plans">Plans</a>
            <a href="#benefits">Benefits</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h4>Contact</h4>
            <a href={`tel:+91${siteConfig.phone}`}>{siteConfig.phone}</a>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              Pune, Maharashtra
            </a>
          </div>
        </div>
        <div className="footer-bottom wrap">
          <span>© 2026 {siteConfig.businessName}</span>
          <small>
            This independent enquiry website is not the official website of any
            telecom provider. Provider names, trademarks and offers are used
            only with authorization where applicable.
          </small>
        </div>
      </footer>
      <a
        className={`floating-call${floatingVisible ? "" : " floating-hidden"}`}
        href={`tel:+91${siteConfig.phone}`}
        aria-label="Call now"
      >
        <Phone size={20} />
      </a>
      <a
        className={`floating-whatsapp${floatingVisible ? "" : " floating-hidden"}`}
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
    </div>
  );
}

export default App;
