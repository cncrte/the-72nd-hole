/* global React, ReactDOM, Nav, Hero, HowItWorks, Tiers, Games, Prizes, Juniors, Waitlist, Footer */
const { useState, useEffect, useRef } = React;
const TweaksPanel = window.TweaksPanel;
const useTweaks = window.useTweaks;
const TweakSection = window.TweakSection;
const TweakColor = window.TweakColor;
const TweakSelect = window.TweakSelect;
const TweakRadio = window.TweakRadio;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gold": "#c9a14a",
  "green": "#0a1410",
  "headlineFont": "Playfair Display",
  "density": "spacious",
  "heroVariant": "phone"
}/*EDITMODE-END*/;

const FONT_OPTIONS = [
  'Playfair Display',
  'Bodoni Moda',
  'DM Serif Display',
  'Cormorant Garamond',
  'Libre Caslon Display'
];

// Premium golf imagery from Unsplash (resolved at runtime to inlined blob URLs in standalone bundles)
const HERO_IMAGE = (window.__resources && window.__resources.heroImage) || 'uploads/hero.png';
const HERO_IMAGE_MOBILE = (window.__resources && window.__resources.heroImageMobile) || 'uploads/hero-mobile.jpg';
const JUNIOR_IMAGE = (window.__resources && window.__resources.juniorImage) || 'uploads/juniors.jpg';

function applyTokens(t) {
  const root = document.documentElement;
  root.style.setProperty('--gold', t.gold);
  // derive a brighter gold
  root.style.setProperty('--gold-bright', shade(t.gold, 18));
  root.style.setProperty('--gold-soft', hexToRgba(t.gold, 0.12));
  root.style.setProperty('--green-deepest', t.green);
  root.style.setProperty('--green-deep', shade(t.green, 6));
  root.style.setProperty('--green', shade(t.green, 12));
  root.style.setProperty('--green-mid', shade(t.green, 20));
  root.style.setProperty('--serif', `'${t.headlineFont}', Georgia, serif`);
  if (t.density === 'compact') {
    root.style.setProperty('--section-y', '88px');
    root.style.setProperty('--section-y-sm', '64px');
  } else if (t.density === 'spacious') {
    root.style.setProperty('--section-y', '140px');
    root.style.setProperty('--section-y-sm', '96px');
  } else {
    root.style.setProperty('--section-y', '180px');
    root.style.setProperty('--section-y-sm', '120px');
  }
}

function hexToRgba(hex, a) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
function shade(hex, pct) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (255 - v) * (pct / 100))));
  const toHex = (v) => v.toString(16).padStart(2, '0');
  return `#${toHex(f(r))}${toHex(f(g))}${toHex(f(b))}`;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    // Items already in the initial viewport reveal on first paint —
    // double rAF guarantees the browser has applied the initial
    // (opacity:0, translateY) state before we transition to .in.
    els.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        requestAnimationFrame(() => requestAnimationFrame(() => {
          el.classList.add('in');
        }));
      } else {
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, []);
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const waitlistRef = useRef(null);

  useEffect(() => { applyTokens(tweaks); }, [tweaks]);
  useReveal();

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <Nav onJoinClick={scrollToWaitlist} />
      <main>
        <Hero heroImage={HERO_IMAGE} heroImageMobile={HERO_IMAGE_MOBILE} onJoinClick={scrollToWaitlist} variant={tweaks.heroVariant} />
        <HowItWorks />
        <Tiers onJoinClick={scrollToWaitlist} />
        <Games />
        <Prizes />
        <Juniors heroImage={HERO_IMAGE} juniorImage={JUNIOR_IMAGE} />
        <Waitlist formRef={waitlistRef} />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakColor label="Accent Gold" value={tweaks.gold} onChange={(v) => setTweak('gold', v)} />
        <TweakColor label="Background Green" value={tweaks.green} onChange={(v) => setTweak('green', v)} />
        <TweakSection label="Type" />
        <TweakSelect
          label="Headline Font"
          value={tweaks.headlineFont}
          onChange={(v) => setTweak('headlineFont', v)}
          options={FONT_OPTIONS}
        />
        <TweakSection label="Density" />
        <TweakRadio
          label="Section Spacing"
          value={tweaks.density}
          onChange={(v) => setTweak('density', v)}
          options={['compact', 'spacious', 'editorial']}
        />
        <TweakSection label="Hero Layout" />
        <TweakRadio
          label="Hero Variant"
          value={tweaks.heroVariant}
          onChange={(v) => setTweak('heroVariant', v)}
          options={['photo', 'phone']}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
