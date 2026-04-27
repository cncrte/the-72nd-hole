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
const WEB3FORMS_KEY = '33067708-dec8-4be6-8a94-6da1bf2cf8c7';

function Waitlist({ formRef }) {
  const [email, setEmail] = useStateW('');
  const [postcode, setPostcode] = useStateW('');
  const [err, setErr] = useStateW('');
  const [submitting, setSubmitting] = useStateW(false);
  const [submitted, setSubmitted] = useStateW(false);

  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const submit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErr('Please enter a valid email.');
      return;
    }
    setErr('');
    setSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New 72nd Hole waitlist signup',
          from_name: 'The 72nd Hole — Waitlist',
          email,
          postcode,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Submission failed.');
      setSubmitted(true);
    } catch (e2) {
      setErr(e2.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
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
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Joining…' : <>Join <span className="btn-arrow">→</span></>}
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
              <li><a href="#waitlist">Waitlist</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© MMXXVI · The 72<sup>nd</sup> Hole · Play more. Win more.</span>
          <span className="footer-credit">
            Built by <a href="https://cncrte.co" target="_blank" rel="noopener noreferrer">cncrte.co</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

window.Juniors = Juniors;
window.Waitlist = Waitlist;
window.Footer = Footer;
