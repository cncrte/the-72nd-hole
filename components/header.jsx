/* global React */
const { useState, useEffect, useRef } = React;

/* ============== Logo Mark ============== */
function FlagLogo({ size = 32, className = '' }) {
  return (
    <svg className={className} width={size} height={size * 1.125} viewBox="0 0 32 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6" y1="4" x2="6" y2="34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="6" cy="3.6" r="1.6" fill="currentColor"/>
      <path d="M6 5 L22 7.4 L18.5 11.5 L22 15.6 L6 13.2 Z" fill="var(--gold)" stroke="var(--gold)" strokeWidth="0.5" strokeLinejoin="round"/>
      <ellipse cx="6" cy="33" rx="5.5" ry="1.5" fill="none" stroke="currentColor" strokeWidth="0.8"/>
    </svg>
  );
}

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="The 72nd Hole">
      <FlagLogo size={28} />
      <div className="logo-text">
        <div className="row1">The</div>
        <div className="row2">72<sup>nd</sup> Hole</div>
      </div>
    </a>
  );
}

/* ============== Nav ============== */
function Nav({ onJoinClick }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <Logo />
        <ul className="nav-links">
          <li><a href="#how">How It Works</a></li>
          <li><a href="#tiers">Membership</a></li>
          <li><a href="#games">Games</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#juniors">Juniors</a></li>
        </ul>
        <button className="btn btn-primary" onClick={onJoinClick}>
          Join Waitlist <span className="btn-arrow">→</span>
        </button>
      </div>
    </nav>
  );
}

/* ============== Hero ============== */
function PhoneMockup() {
  return (
    <div className="phone">
      <div className="phone-notch"></div>
      <div className="phone-screen">
        <div className="ps-status">
          <span>9:41</span>
          <div className="ps-icons">
            <span className="dot-mini"></span>
            <span className="dot-mini"></span>
            <span className="dot-mini"></span>
          </div>
        </div>
        <div className="ps-head">
          <div>
            <div className="ps-eyebrow">Today · Round 14</div>
            <div className="ps-title">Leaderboard</div>
          </div>
          <div className="ps-live"><span></span>Live</div>
        </div>
        <div className="ps-balance">
          <div>
            <div className="ps-bal-lab">Points</div>
            <div className="ps-bal-val">14,820</div>
          </div>
          <div className="ps-rank-pill">
            <div className="ps-rank-num">#7</div>
            <div className="ps-rank-lab">Your rank</div>
          </div>
        </div>
        <div className="ps-tabs">
          <span>Today</span>
          <span className="active">Week</span>
          <span>All-Time</span>
        </div>
        <div className="ps-rows">
          <div className="ps-row">
            <span className="ps-rank">1</span>
            <span className="ps-av">EM</span>
            <span className="ps-nm">Eliza M.</span>
            <span className="ps-pts">21,408</span>
          </div>
          <div className="ps-row">
            <span className="ps-rank">2</span>
            <span className="ps-av">JT</span>
            <span className="ps-nm">James T.</span>
            <span className="ps-pts">19,752</span>
          </div>
          <div className="ps-row">
            <span className="ps-rank">3</span>
            <span className="ps-av">RA</span>
            <span className="ps-nm">Rohan A.</span>
            <span className="ps-pts">18,540</span>
          </div>
          <div className="ps-row">
            <span className="ps-rank">4</span>
            <span className="ps-av">SK</span>
            <span className="ps-nm">Sienna K.</span>
            <span className="ps-pts">17,210</span>
          </div>
          <div className="ps-row">
            <span className="ps-rank">5</span>
            <span className="ps-av">MD</span>
            <span className="ps-nm">Marcus D.</span>
            <span className="ps-pts">16,085</span>
          </div>
          <div className="ps-row">
            <span className="ps-rank">6</span>
            <span className="ps-av">PL</span>
            <span className="ps-nm">Priya L.</span>
            <span className="ps-pts">15,344</span>
          </div>
          <div className="ps-row you bump">
            <span className="ps-rank">7</span>
            <span className="ps-av">YOU</span>
            <span className="ps-nm">You</span>
            <span className="ps-pts">14,820</span>
          </div>
        </div>
        <div className="ps-cta">Play today's round →</div>
      </div>
    </div>
  );
}

function Hero({ heroImage, heroImageMobile, onJoinClick, variant = 'photo' }) {
  const isPhone = variant === 'phone';
  return (
    <header className={`hero${isPhone ? ' hero--phone' : ''}`} id="top">
      <div className="hero-bg">
        <picture>
          {heroImageMobile && <source media="(max-width: 980px)" srcSet={heroImageMobile} />}
          <img src={heroImage} alt="Sunset over a championship golf course" />
        </picture>
      </div>
      <div className="hero-content container">
        {isPhone ? (
          <div className="hero-phone-grid">
            <div className="hero-phone-text">
              <div className="hero-tagtop reveal">
                <span className="eyebrow"><span className="dot"></span>Australia &amp; New Zealand · Launching 2026</span>
              </div>
              <h1 className="display reveal" style={{ transitionDelay: '0.1s' }}>
                The App That <span className="ord">Rewards You</span> For Playing Golf.
              </h1>
              <p className="hero-sub reveal" style={{ transitionDelay: '0.25s' }}>
                Earn points, climb leaderboards, win cash prizes, and unlock exclusive discounts at courses, pros, and gear shops across Australia and New Zealand.
              </p>
              <div className="hero-ctas reveal" style={{ transitionDelay: '0.4s' }}>
                <button className="btn btn-primary" onClick={onJoinClick}>
                  Join the Waitlist <span className="btn-arrow">→</span>
                </button>
                <a className="btn btn-ghost" href="#how">
                  See How It Works
                </a>
              </div>
            </div>
            <div className="hero-phone-wrap reveal" style={{ transitionDelay: '0.2s' }}>
              <PhoneMockup />
            </div>
          </div>
        ) : (
          <>
            <div className="hero-tagtop reveal">
              <span className="eyebrow"><span className="dot"></span>Australia &amp; New Zealand · Launching 2026</span>
            </div>
            <h1 className="display reveal" style={{ transitionDelay: '0.1s' }}>
              The App That <span className="ord">Rewards You</span> For Playing Golf.
            </h1>
            <p className="hero-sub reveal" style={{ transitionDelay: '0.25s' }}>
              Earn points, climb leaderboards, win cash prizes, and unlock exclusive discounts at courses, pros, and gear shops across Australia and New Zealand.
            </p>
            <div className="hero-ctas reveal" style={{ transitionDelay: '0.4s' }}>
              <button className="btn btn-primary" onClick={onJoinClick}>
                Join the Waitlist <span className="btn-arrow">→</span>
              </button>
              <a className="btn btn-ghost" href="#how">
                See How It Works
              </a>
            </div>
          </>
        )}
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="scroll-line"></span>
      </div>
      <div className="hero-meta">
        <span className="meta-line"></span>
        <span>Members-only · Est. MMXXVI</span>
      </div>
    </header>
  );
}

window.FlagLogo = FlagLogo;
window.Logo = Logo;
window.Nav = Nav;
window.Hero = Hero;
