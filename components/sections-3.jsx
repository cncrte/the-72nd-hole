/* global React, SectionHead, FlagLogo */
const { useState: useStateW, useEffect: useEffectW } = React;

/* ============== Juniors ============== */
function Juniors({ heroImage, juniorImage }) {
  return (
    <section className="juniors" id="juniors">
      <div className="container">
        <SectionHead
          index="§ 05 — Juniors"
          eyebrow="The Next Tee"
          title="Get the next generation hooked on golf."
        />
        <div className="juniors-layout">
          <div className="juniors-text reveal">
            <p className="lede">
              Any 18+ member can add one junior to their account, free. A junior-only leaderboard, coaching videos from partner pros, and gear-and-lessons prizes designed for skill, not chance.
            </p>
            <ul className="juniors-points">
              <li>
                <span className="check">✦</span>
                <div>
                  Junior leaderboard
                  <span className="mute">Compete only against other juniors. Age-grouped boards.</span>
                </div>
              </li>
              <li>
                <span className="check">✦</span>
                <div>
                  Coaching library
                  <span className="mute">Video tutorials from PGA-certified partner pros across AU/NZ.</span>
                </div>
              </li>
              <li>
                <span className="check">✦</span>
                <div>
                  Skill-based prizes only
                  <span className="mute">Gear, range time, and lessons. Never cash, never chance — for under-18s.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="juniors-image reveal" style={{ transitionDelay: '0.15s' }}>
            <img src={juniorImage} alt="Young golfer at sunset" />
            <div className="stamp">For ages 8 — 17</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Decorative QR (placeholder pattern) ============== */
function QRGrid() {
  // Static, deterministic pseudo-QR pattern (decorative only)
  const N = 21;
  const cells = [];
  // Simple seeded pattern
  let seed = 7;
  const rand = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      cells.push(rand() > 0.5);
    }
  }
  // Force three position markers
  const setBlock = (cx, cy) => {
    for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++) {
      const isOn = (x === 0 || x === 6 || y === 0 || y === 6) || (x >= 2 && x <= 4 && y >= 2 && y <= 4);
      cells[(cy + y) * N + (cx + x)] = isOn;
    }
  };
  setBlock(0, 0); setBlock(N - 7, 0); setBlock(0, N - 7);
  return (
    <div className="qr">
      {cells.map((on, i) => <i key={i} style={{ background: on ? 'var(--green-deepest)' : 'var(--cream)' }} />)}
    </div>
  );
}

/* ============== Waitlist ============== */
function Waitlist({ formRef }) {
  const [email, setEmail] = useStateW('');
  const [postcode, setPostcode] = useStateW('');
  const [err, setErr] = useStateW('');
  const [submitted, setSubmitted] = useStateW(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErr('Please enter a valid email.');
      return;
    }
    setErr('');
    // Persist locally for the demo
    try {
      const list = JSON.parse(localStorage.getItem('the72_waitlist') || '[]');
      list.push({ email, postcode, ts: Date.now() });
      localStorage.setItem('the72_waitlist', JSON.stringify(list));
    } catch (e) {}
    setSubmitted(true);
  };

  return (
    <section className="waitlist" id="waitlist" ref={formRef}>
      <div className="container">
        <div className="waitlist-center reveal">
          <div className="eyebrow" style={{ marginBottom: 20 }}><span className="dot"></span>Be First on the Tee</div>
          <h2 className="section-title" style={{ marginBottom: 24 }}>
            Be first on the <span className="gold" style={{ color: 'var(--gold)', fontStyle: 'italic' }}>tee</span>.
          </h2>
          <p className="lede" style={{ marginInline: 'auto', marginBottom: 44 }}>
            Join the waitlist and be the first to access The 72<sup>nd</sup> Hole when we launch in Australia and New Zealand. Early members get exclusive founding rates and bonus points.
          </p>
          {!submitted ? (
            <form className="waitlist-form" onSubmit={submit} noValidate>
              <div className="waitlist-input-row">
                <input
                  type="email"
                  className="waitlist-input"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (err) setErr(''); }}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Join <span className="btn-arrow">→</span>
                </button>
              </div>
              <input
                type="text"
                className="waitlist-input"
                placeholder="Postcode (so we can prioritise your local courses)"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
              />
              <div className={`meta ${err ? 'err' : ''}`}>
                {err || 'No spam. One launch email when we go live, plus founding-member perks.'}
              </div>
            </form>
          ) : (
            <div className="waitlist-success">
              <div className="check">✓</div>
              <h4>You're on the list.</h4>
              <p>We'll be in touch when The 72<sup>nd</sup> Hole opens to founding members. In the meantime, follow along as we sign partner courses across AU &amp; NZ.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ============== Footer ============== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>The membership golf platform that rewards active golfers. Launching across Australia and New Zealand in 2026.</p>
          </div>
          <div className="footer-col">
            <h5>Platform</h5>
            <ul>
              <li><a href="#how">How It Works</a></li>
              <li><a href="#tiers">Memberships</a></li>
              <li><a href="#prizes">Prizes</a></li>
              <li><a href="#games">Daily Games</a></li>
              <li><a href="#juniors">Juniors</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><a href="#waitlist">Waitlist</a></li>
              <li><a href="mailto:partners@the72ndhole.com">Partner With Us</a></li>
              <li><a href="mailto:hello@the72ndhole.com">Press</a></li>
              <li><a href="mailto:hello@the72ndhole.com">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Legal</h5>
            <ul>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Promotion Terms</a></li>
              <li><a href="#">Responsible Play</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© MMXXVI · The 72<sup>nd</sup> Hole · Play more. Win more.</span>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 3v3a4 4 0 0 0 4 4v3a7 7 0 0 1-4-1.3V16a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V3h3z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.5a3 3 0 0 0-2.1-2.1C18 6 12 6 12 6s-6 0-7.9.4A3 3 0 0 0 2 8.5C1.6 10.4 1.6 12 1.6 12s0 1.6.4 3.5a3 3 0 0 0 2.1 2.1C6 18 12 18 12 18s6 0 7.9-.4a3 3 0 0 0 2.1-2.1c.4-1.9.4-3.5.4-3.5s0-1.6-.4-3.5zM10 15V9l5 3-5 3z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Juniors = Juniors;
window.Waitlist = Waitlist;
window.Footer = Footer;
