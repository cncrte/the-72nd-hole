/* global React, SectionHead */
const { useState: useStateG, useEffect: useEffectG, useRef: useRefG } = React;

/* ============== Games ============== */
const GAMES = [
  {
    title: 'Putting Challenge',
    body: 'Read the green, line up the stroke, sink it. Daily putts of varying difficulty across simulated courses. Closest to centre takes the day.',
    daily: '24h',
    hardest: '22 ft',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="32" cy="44" rx="22" ry="6"/>
        <ellipse cx="32" cy="44" rx="6" ry="1.6" fill="currentColor"/>
        <path d="M32 44 L32 12"/>
        <path d="M32 12 L46 14 L42 18 L46 22 L32 20 Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    title: 'Longest Drive',
    body: 'Pick your club, pick your line, swing for the back of the fairway. Distance is measured against the daily field.',
    daily: '24h',
    hardest: '342 yds',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="14" cy="50" r="3" fill="currentColor"/>
        <path d="M14 50 Q32 8 58 14"/>
        <path d="M10 56 L58 56" strokeDasharray="2 4"/>
      </svg>
    ),
  },
  {
    title: 'Hole-in-One',
    body: 'One swing. One chance. One hole. Land it for the day\'s biggest prize. Tee box rotates daily across signature par 3s.',
    daily: '1 shot',
    hardest: 'Par 3',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="32" r="22"/>
        <circle cx="32" cy="32" r="14"/>
        <circle cx="32" cy="32" r="6"/>
        <circle cx="32" cy="32" r="2" fill="currentColor"/>
        <path d="M32 6 L32 14 M32 50 L32 58 M6 32 L14 32 M50 32 L58 32" strokeWidth="0.8"/>
      </svg>
    ),
  },
];

function Games() {
  return (
    <section className="games" id="games">
      <div className="container">
        <SectionHead
          index="§ 03 — Daily Games"
          eyebrow="Three games. Every day."
          title="Play daily. Climb daily."
          lede="Three games. Every day. Climb the leaderboard and win real prizes — golf gear, course memberships, free cart hire, lessons with pros, and more."
        />
        <div className="games-grid reveal-stagger">
          {GAMES.map(g => (
            <article className="game-card" key={g.title}>
              <div className="game-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <p>{g.body}</p>
              <div className="meta">
                <span>Resets <span className="gold">{g.daily}</span></span>
                <span>Today: <span className="gold">{g.hardest}</span></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== Leaderboard (live animated) ============== */
const SEED = [
  { name: 'Marcus T.', loc: 'Royal Melbourne · VIC', initial: 'MT', pts: 18420 },
  { name: 'Aroha P.', loc: 'Wairakei · NZ', initial: 'AP', pts: 17985 },
  { name: 'Daniel K.', loc: 'The Lakes · NSW', initial: 'DK', pts: 17612 },
  { name: 'You', loc: 'Sign up to compete', initial: 'YU', pts: 16240, you: true },
  { name: 'Sarah J.', loc: 'Kingston Heath · VIC', initial: 'SJ', pts: 15980 },
  { name: 'Tane W.', loc: 'Cape Kidnappers · NZ', initial: 'TW', pts: 15402 },
  { name: 'Olivia R.', loc: 'New South Wales GC', initial: 'OR', pts: 14890 },
];

function LeaderboardCard() {
  const [tab, setTab] = useStateG('Daily');
  const [rows, setRows] = useStateG(SEED);
  const [bumpIdx, setBumpIdx] = useStateG(-1);
  const [delta, setDelta] = useStateG(0);

  useEffectG(() => {
    let active = true;
    const interval = setInterval(() => {
      if (!active) return;
      const idx = Math.floor(Math.random() * rows.length);
      const bump = Math.floor(Math.random() * 80) + 12;
      setBumpIdx(idx);
      setDelta(bump);
      setRows(prev => {
        const next = prev.map((r, i) => i === idx ? { ...r, pts: r.pts + bump } : r);
        next.sort((a, b) => b.pts - a.pts);
        return next;
      });
      setTimeout(() => { if (active) setBumpIdx(-1); }, 1400);
    }, 2400);
    return () => { active = false; clearInterval(interval); };
  }, []);

  return (
    <div className="leaderboard">
      <div className="lb-head">
        <div className="title">Leaderboard</div>
        <div className="lb-tabs">
          {['Daily', 'Monthly', 'Yearly'].map(t => (
            <button
              key={t}
              className={`lb-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >{t}</button>
          ))}
        </div>
      </div>
      <div className="lb-rows">
        {rows.map((r, i) => {
          const isBumping = rows.findIndex(x => x.name === SEED[bumpIdx]?.name) === i && bumpIdx !== -1;
          return (
            <div
              key={r.name}
              className={`lb-row ${r.you ? 'you' : ''} ${isBumping ? 'bumping' : ''}`}
            >
              <div className="lb-rank">{String(i + 1).padStart(2, '0')}</div>
              <div className="lb-name">
                <div className="lb-avatar">{r.initial}</div>
                <div className="lb-info">
                  <div className="nm">{r.name}</div>
                  <div className="loc">{r.loc}</div>
                </div>
              </div>
              <div className="lb-points">{r.pts.toLocaleString()}</div>
              <div className="lb-delta">+{delta}</div>
            </div>
          );
        })}
      </div>
      <div className="lb-foot">
        <span>{tab} · 24h reset</span>
        <span className="live"><span className="dot"></span>Live</span>
      </div>
    </div>
  );
}

/* ============== Prizes ============== */
const PRIZE_ROWS = [
  { when: 'Daily', what: 'Golf balls, branded gear, free cart hire', mute: 'Awarded to top 3 across each game', value: '$50–$250' },
  { when: 'Weekly', what: 'Lessons with partner pros, range vouchers', mute: 'Top 10 weekly leaderboard', value: '$300–$800' },
  { when: 'Monthly', what: 'Course memberships, premium gear packages', mute: 'Top 5 monthly leaderboard', value: '$1.5K–$5K' },
  { when: 'Yearly', what: 'Major prizes, golf trips, tournament invites', mute: 'Top players on the annual board', value: '$10K+' },
];

function Prizes() {
  return (
    <section className="prizes" id="prizes">
      <div className="container">
        <SectionHead
          index="§ 04 — Leaderboards & Prizes"
          eyebrow="Real Rewards"
          title="The more you play, the higher you climb."
          lede="Top performers win real rewards — not just bragging rights. Daily, monthly, and yearly leaderboards across every game and across every member."
        />
        <div className="prizes-layout">
          <div className="reveal">
            <div className="small-caps" style={{ color: 'var(--gold)', marginBottom: 18 }}>Prize Tiers</div>
            <div className="prize-list">
              {PRIZE_ROWS.map(p => (
                <div className="prize-row" key={p.when}>
                  <div className="when">{p.when}</div>
                  <div className="what">
                    {p.what}
                    <span className="mute">{p.mute}</span>
                  </div>
                  <div className="value">{p.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: '0.15s' }}>
            <LeaderboardCard />
          </div>
        </div>
      </div>
    </section>
  );
}

window.Games = Games;
window.Prizes = Prizes;
window.LeaderboardCard = LeaderboardCard;
