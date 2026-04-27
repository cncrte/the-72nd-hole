/* global React */
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ============== Section Head ============== */
function SectionHead({ index, eyebrow, title, lede, children }) {
  return (
    <div className="section-head">
      <div className="index">{index}</div>
      <div className="heading">
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 18 }}><span className="dot"></span>{eyebrow}</div>}
        <h2 className="section-title">{title}</h2>
        {lede && <p className="lede" style={{ marginTop: 24 }}>{lede}</p>}
        {children}
      </div>
    </div>
  );
}

/* ============== How It Works ============== */
const HOW_STEPS = [
  { n: '01', title: 'Scan & Sign Up', body: 'Scan a QR code at any driving range, golf course, or from social. Pick your tier. You\'re in.' },
  { n: '02', title: 'Play Daily Games', body: 'Putting Challenge, Longest Drive, and Hole-in-One — all digital games inside the app. Play daily to climb.' },
  { n: '03', title: 'Earn Points & Win', body: 'Earn from gameplay, verified rounds, content uploads and referrals. Daily, monthly, and yearly prizes.' },
  { n: '04', title: 'Connect & Compete', body: 'Find nearby courses, shops, and pros. Earn your Golf Plus Handicap after 72 verified holes. Compete in live tournaments.' },
];

function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <SectionHead
          index="§ 01 — The Loop"
          eyebrow="How It Works"
          title="Four steps from scan to leaderboard."
          lede="The 72nd Hole turns the rituals of golf — daily practice, real rounds, and the social back-nine — into points, prizes, and a way to play more often."
        />
      </div>
      <div className="container">
        <div className="how-grid reveal-stagger">
          {HOW_STEPS.map(s => (
            <div className="how-step" key={s.n}>
              <div className="step-num">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Tiers ============== */
const TIERS = [
  {
    name: 'Bronze', tag: 'Entry',
    price: 19.99, accent: '#a8794d',
    summary: 'A foothold in the membership.',
    stats: [['1', 'Daily Game'], ['10', 'Draw Entries']],
    features: ['1 daily game entry', '10 entries into subscriber draws', 'Bronze-level partner discounts', 'Digital scorecards & community access'],
  },
  {
    name: 'Silver', tag: 'Regular',
    price: 49.99, accent: '#c8c8d2',
    summary: 'For golfers in the swing of it.',
    stats: [['2', 'Daily Games'], ['25', 'Draw Entries']],
    features: ['2 daily game entries', '25 draw entries', 'Better partner discounts', 'Priority challenge access'],
  },
  {
    name: 'Gold', tag: 'Committed',
    price: 69.99, accent: '#d4af5f',
    summary: 'For the player chasing a handicap.',
    stats: [['3', 'Daily Games'], ['50', 'Draw Entries']],
    features: ['3 daily game entries', '50 draw entries', 'Premium partner discounts', 'Priority tournament consideration'],
  },
  {
    name: 'Platinum', tag: 'Founding',
    price: 99.99, accent: '#e6e0d2',
    summary: 'Everything. The full membership.',
    stats: [['5', 'Daily Games'], ['100', 'Draw Entries']],
    features: ['5 daily game entries', '100 draw entries', 'Highest discount tier', 'Exclusive comps, drops, and partner rewards', 'VIP tournament access'],
  },
];

function TierCard({ tier, expanded, onToggle, onJoin }) {
  return (
    <div
      className={`tier ${expanded ? 'expanded' : ''}`}
      style={{ '--tier-accent': tier.accent }}
      onClick={onToggle}
    >
      <div className="tier-name">{tier.name}</div>
      <div className="tier-tag">{tier.tag}</div>
      <div className="tier-price">
        <span className="currency">$</span>
        <span className="amount">{tier.price.toFixed(2)}</span>
        <span className="period">/ month</span>
      </div>
      <div className="tier-summary">{tier.summary}</div>
      <div className="tier-stats">
        {tier.stats.map(([n, l]) => (
          <div className="tier-stat" key={l}>
            <span className="num">{n}</span>
            <div className="lab">{l}</div>
          </div>
        ))}
      </div>
      <ul className="tier-features">
        {tier.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <button className="btn" onClick={(e) => { e.stopPropagation(); onJoin(); }}>
        Join Waitlist
      </button>
    </div>
  );
}

function Tiers({ onJoinClick }) {
  const [expanded, setExpanded] = useStateS(null);
  return (
    <section className="tiers" id="tiers">
      <div className="container">
        <SectionHead
          index="§ 02 — Membership"
          eyebrow="Tiers"
          title="Choose how deep you play."
          lede="Five tiers, one platform. Every membership unlocks daily games, draw entries, and partner discounts. Higher tiers play more, win more, get more."
        />
        <div className="tiers-grid reveal">
          {TIERS.map((t, i) => (
            <TierCard
              key={t.name}
              tier={t}
              expanded={expanded === i}
              onToggle={() => setExpanded(expanded === i ? null : i)}
              onJoin={onJoinClick}
            />
          ))}
        </div>
        <div className="junior-card reveal">
          <div className="left">
            <div className="badge">Junior</div>
            <div>
              <h3>Free with any 18+ membership.</h3>
              <p>Add one junior to your account. Junior leaderboard, coaching videos, and skill-based prizes — gear and lessons, never cash.</p>
            </div>
          </div>
          <button className="btn btn-ghost" onClick={onJoinClick}>Add a Junior</button>
        </div>
      </div>
    </section>
  );
}

window.SectionHead = SectionHead;
window.HowItWorks = HowItWorks;
window.Tiers = Tiers;
