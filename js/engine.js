// ================= LOL 电竞生涯模拟器 · 引擎 =================
import {
  APP_TITLE, TAGLINE, MODES, POSITIONS, REGIONS, LEAGUES, TEAMS,
  EVENTS, SHOWDOWNS, TITLES, FAREWELL_STYLES, GOODBYE_STYLES, WALKAWAY_STYLES,
  LEGENDS, MEMES,
} from './data.js';

// ---------- RNG ----------
export function xmur3(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return (h ^= h >>> 16) >>> 0;
  };
}

export function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function nextRng(state) {
  const fn = mulberry32(state);
  return { v: fn(), state: (fn() * 4294967296) >>> 0 || 12345 };
}

// 用一次性序列推进：确保每次调用都消耗两个随机数，行为稳定
export function roll(rngState, n = 1) {
  let s = rngState;
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = nextRng(s);
    out.push(r.v);
    s = r.state;
  }
  return { v: out, state: s };
}

export function chance(rngState, p) {
  const r = roll(rngState);
  return { ok: r.v[0] < p, state: r.state };
}

export function pickWeighted(rngState, items, weightFn) {
  const total = items.reduce((s, it) => s + weightFn(it), 0);
  if (total <= 0) return { item: items[0], state: rngState };
  const r = roll(rngState);
  let t = r.v[0] * total;
  for (const it of items) {
    t -= weightFn(it);
    if (t <= 0) return { item: it, state: r.state };
  }
  return { item: items[items.length - 1], state: r.state };
}

export function genSeed() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `${t}-${r}`;
}

// ---------- 格式化 ----------
export function fmtMoney(v) {
  if (v == null || isNaN(v)) return '—';
  if (v >= 10000) {
    const y = v / 10000;
    return (y >= 100 ? Math.round(y) : y.toFixed(y >= 10 ? 1 : 2)) + '亿';
  }
  if (v >= 1000) return Math.round(v) + '万';
  return Math.round(v) + '万';
}

export function fmtInt(n) {
  if (n == null) return '0';
  return Math.round(n).toLocaleString('zh-CN');
}

export function fmtAvg(n) {
  if (n == null) return '0';
  return n.toFixed(1);
}

export function percentileOf(overall) {
  if (overall >= 99) return 99;
  if (overall >= 96) return 97;
  if (overall >= 93) return 94;
  if (overall >= 90) return 88;
  if (overall >= 87) return 80;
  if (overall >= 84) return 70;
  if (overall >= 80) return 56;
  if (overall >= 76) return 40;
  if (overall >= 72) return 25;
  if (overall >= 68) return 13;
  return 5;
}

export function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

export function potentialRank(p) {
  if (p >= 94) return 'S';
  if (p >= 87) return 'A';
  if (p >= 74) return 'B';
  return 'C';
}

export function teamById(id) {
  return TEAMS[id] || null;
}

export function leagueById(id) {
  return LEAGUES[id] || null;
}

export function regionById(code) {
  return REGIONS[code] || null;
}

export function kdaOf(avg) {
  if (!avg) return 0;
  return (avg.kills + avg.assists) / Math.max(avg.deaths, 1);
}

const ROLE_NAMES = ['边缘替补', '轮换选手', '首发主力', '队内核心', '赛区巨星'];
export const ROLE_KEYS = ['edge', 'rotation', 'starter', 'star', 'superstar'];

export function roleName(role) {
  const i = ROLE_KEYS.indexOf(role);
  return i >= 0 ? ROLE_NAMES[i] : '轮换选手';
}

export function roleFactor(role) {
  const map = { edge: 0.5, rotation: 0.72, starter: 0.92, star: 1.1, superstar: 1.26 };
  return map[role] ?? 0.92;
}

// ---------- 生涯创建 ----------
export function tournamentSchedule(maxAge = 40) {
  const list = [];
  for (let age = 18; age <= maxAge; age++) {
    list.push({ type: 'worlds', age, qualified: null });
    if (age >= 19) list.push({ type: 'msi', age, qualified: null });
    if (age >= 20) list.push({ type: 'allstar', age, qualified: true });
    if ((age - 18) % 4 === 0) list.push({ type: 'asian_games', age, qualified: null });
    if (age >= 19 && (age - 19) % 2 === 0) list.push({ type: 'rift_rivals', age, qualified: null });
  }
  return list;
}

export function newGame({ seed, mode, name, nationality, position, hand, number, domesticDreamTeamId, foreignDreamTeamId }) {
  const seedHash = xmur3(seed)();
  const rng = mulberry32(seedHash);
  const initial = clamp(56 + Math.floor(rng() * 9), 54, 64); // 15 岁初始能力
  const region = REGIONS[nationality];
  const pos = POSITIONS[position];
  const league = LEAGUES[region.league] || LEAGUES.lpl;
  // 潜力：有高低之分——C 级平庸、B 级普通、A 级天才、S 级妖人
  const r0 = rng();
  let potential;
  if (r0 < 0.18) potential = clamp(62 + Math.floor(rng() * 12), 62, 73);
  else if (r0 < 0.55) potential = clamp(74 + Math.floor(rng() * 13), 74, 86);
  else if (r0 < 0.85) potential = clamp(87 + Math.floor(rng() * 7), 87, 93);
  else potential = clamp(94 + Math.floor(rng() * 6), 94, 99);
  const growthLuck = +(0.65 + rng() * 0.75).toFixed(2);
  const player = {
    name: name || '未命名',
    nationality: region.zh,
    nationalityCode: nationality,
    position,
    positionZh: pos.zh,
    age: 15,
    overall: initial,
    potential,
    potentialRank: potentialRank(potential),
    growthLuck,
    debutOverall: initial,
    marketValue: marketValueOf(initial, 16, league),
    domesticDreamTeamId: domesticDreamTeamId || null,
    foreignDreamTeamId: foreignDreamTeamId || null,
  };
  const rival = makeRival(player, rng);
  return {
    seed,
    mode,
    step: 0,
    phase: 'career',
    stage: 'youth',
    year: 2026,
    player,
    currentTeamId: null,
    contractTeamId: null,
    contractYears: 0,
    teamBonus: { growth: 1, trophy: 1, salary: 1, roleShift: 0, label: '' },
    seasons: [],
    nationalTeamPeriods: [],
    totals: { apps: 0, kills: 0, deaths: 0, assists: 0, cs: 0, dmg: 0, vis: 0, salary: 0, trophies: [], awards: [] },
    hasNationalTeamCallup: false,
    nationalTeamRetiredAge: undefined,
    tournaments: tournamentSchedule(),
    period: { periodIndex: 0, remaining: 1, run: 0, modifiers: {}, youth: true },
    currentEvent: null,
    lastEventOutcome: null,
    pendingHonors: [],
    usedEventKeys: [],
    transfers: [],
    farewell: null,
    goodbye: null,
    walkaway: null,
    retirementReason: null,
    endingBeat: null,
    showdownWins: { last_shot: 0, free_throw: 0, game7: 0, qualifier_showdown: 0, world_cup_showdown: 0 },
    legacyLines: [],
    highlights: [],
    rival,
    rivalSeries: [],
    usedRivalAges: [],
    suspensionSeasonsRemaining: 0,
    suspensionRustRemaining: 0,
    pendingTransfer: null,
    pendingWorldCupUpgrade: null,
    pendingQualifier: null,
    championsFarewellOffered: false,
    noOffersOffered: false,
    lastVoluntaryOfferAge: 0,
    usedTransferOfferAges: [],
    lastTransferAge: 16,
    rngState: seedHash,
  };
}

function randomRegion(rng) {
  const codes = Object.keys(REGIONS);
  return REGIONS[codes[Math.floor(rng() * codes.length)]];
}

function makeRival(player, rng) {
  const sameRegion = rng() < 0.45;
  let pool = LEGENDS.filter(l => l.pos === player.position);
  if (!pool.length) pool = LEGENDS;
  const regionPool = sameRegion ? pool.filter(l => l.region === player.nationalityCode) : [];
  const use = regionPool.length ? regionPool : pool;
  const legend = use[Math.floor(rng() * use.length)];
  const potential = clamp(player.potential + Math.floor(rng() * 13) - 6, 72, 99);
  const overall = clamp(player.debutOverall + Math.floor(rng() * 7) - 3, 55, 70);
  return {
    name: legend.name,
    zhName: legend.zh,
    nationality: REGIONS[legend.region].zh,
    meme: legend.meme,
    position: player.position,
    overall,
    potential,
    peak: overall,
    totals: { kills: 0, champs: 0, mvp: 0, apps: 0 },
  };
}

function rivalSeason(rival, age, rng) {
  if (age <= 21) rival.overall = Math.min(rival.potential, rival.overall + (rng() < 0.75 ? 2 : 1));
  else if (age <= 29) rival.overall = Math.min(rival.potential, rival.overall + (rng() < 0.35 ? 1 : 0));
  else if (age >= 33) rival.overall = Math.max(55, rival.overall - (rng() < 0.65 ? 1 : 0));
  rival.peak = Math.max(rival.peak, rival.overall);
  const w = POSITIONS[rival.position].weight;
  const scale = clamp((rival.overall - 40) / 59, 0.05, 1);
  const ageF = ageFactor(age);
  const teamStr = 72 + rng() * 14;
  const diff = rival.overall - teamStr;
  const idx = diff <= -8 ? 0 : diff <= -3 ? 1 : diff <= 3 ? 2 : diff <= 8 ? 3 : 4;
  const role = ROLE_KEYS[clamp(idx, 0, 4)];
  const rf = roleFactor(role);
  const gameRange = { edge: [30, 48], rotation: [48, 64], starter: [62, 78], star: [70, 84], superstar: [74, 88] }[role];
  const g = Math.round((gameRange[0] + rng() * (gameRange[1] - gameRange[0])) * ageF);
  const per = (1.2 + 3.2 * scale) * w.kills * rf * (0.95 + rng() * 0.1) * ageF;
  const champ = rng() < clamp((rival.overall - 72) * 0.005 + 0.03, 0.02, 0.3);
  const mvp = rival.overall >= 86 && rng() < 0.25;
  const kills = per * g;
  rival.totals.kills += kills;
  rival.totals.apps += g;
  rival.totals.champs += champ ? 1 : 0;
  rival.totals.mvp += mvp ? 1 : 0;
  return { kills, champ, mvp, g };
}

export function marketValueOf(overall, age, league) {
  let v;
  if (overall < 75) v = 20 + (overall - 60) * 8;
  else if (overall < 85) v = 150 * Math.pow(1.35, overall - 75);
  else if (overall < 95) v = 3200 * Math.pow(1.30, overall - 85);
  else v = 46000 * Math.pow(1.22, overall - 95);
  const ageFactor =
    age <= 18 ? 0.45 : age <= 20 ? 0.62 : age <= 23 ? 0.85 :
    age <= 26 ? 1.0 : age <= 28 ? 0.82 : age <= 30 ? 0.62 : 0.45;
  const leagueFactor = { 1: 1.12, 2: 1.0, 3: 0.82 }[league.tier] ?? 0.8;
  return Math.round(v * ageFactor * leagueFactor);
}

export function salaryOf(marketValue, role) {
  const ratio = { edge: 0.10, rotation: 0.14, starter: 0.18, star: 0.20, superstar: 0.22 }[role] ?? 0.15;
  return Math.round(marketValue * ratio);
}

// ---------- 事件池 ----------
function fillText(state, s) {
  if (!s || !String(s).includes('{legend}')) return s;
  let pool = LEGENDS.filter(l => l.pos === state.player.position);
  if (!pool.length) pool = LEGENDS;
  const lr = mulberry32(state.rngState ^ 0xabcdef01);
  const legend = pool[Math.floor(lr() * pool.length)];
  return String(s).replace(/\{legend\}/g, legend.name);
}

function youthEvents() {
  return Object.values(EVENTS).filter(e => e.minAge <= 17);
}

function poolForAge(state, age) {
  const pool = Object.values(EVENTS).filter(e => {
    if (e.minAge > age || e.maxAge < age) return false;
    if (state.usedEventKeys.includes(e.key)) return false;
    if (e.key === 'national_retire' && state.nationalTeamRetiredAge !== undefined) return false;
    return true;
  });
  const weighted = pool.map(e => ({ e, w: e.weight * (e.key.includes('injury') && age >= 32 ? 2 : 1) }));
  return weighted;
}

function pickEvent(state, age) {
  const pool = poolForAge(state, age);
  if (pool.length === 0) return null;
  const { item, state: s } = pickWeighted(state.rngState, pool, x => x.w);
  const fillDeep = (obj) => JSON.parse(fillText(state, JSON.stringify(obj)));
  const ev = {
    ...item.e,
    title: fillText(state, item.e.title),
    text: fillText(state, item.e.text),
    options: item.e.options.map(o => ({
      ...o,
      hint: fillText(state, o.hint),
      outcomes: (o.outcomes || []).map(x => fillDeep(x)),
    })),
  };
  state.rngState = s;
  state.usedEventKeys.push(ev.key);
  if (state.usedEventKeys.length > 12) state.usedEventKeys.shift();
  ev.id = `${ev.key}-${state.step}`;
  return ev;
}

function signContractEvent(state) {
  const region = REGIONS[state.player.nationalityCode];
  const leagueId = region.league;
  const candidates = Object.values(TEAMS).filter(t => t.league === leagueId).sort((a, b) => b.strength - a.strength);
  // 强/中/弱混合报价，让选队有取舍
  const midStart = Math.max(0, Math.floor(candidates.length / 2) - 1);
  const pool = [
    ...candidates.slice(0, 2),
    ...candidates.slice(midStart, midStart + 2),
    ...candidates.slice(-2),
  ];
  const list = [...new Map(pool.map(t => [t.id, t])).values()].slice(0, 6);
  return {
    id: `sign-${state.step}`,
    type: 'sign_contract',
    title: '青训签约',
    text: `18 岁生日那天，${state.player.nationality}的几支战队给你发来了职业合同。你的第一步走哪儿。`,
    options: list.map(t => ({
      id: `sign-${t.id}`,
      label: `${t.zh}（${LEAGUES[t.league].zh}）`,
      hint: offerHint(state, t),
      teamId: t.id,
    })),
  };
}

function offerHint(state, t) {
  const pv = teamPreview(state, t);
  return `${LEAGUES[t.league].zh} · 强度 ${t.strength} · 预计${roleName(pv.role)}${pv.bonus.label ? ' · ' + pv.bonus.label : ''}`;
}

export function transferChooseEvent(state, allowStay = true) {
  const cur = state.currentTeamId ? TEAMS[state.currentTeamId] : null;
  const curTier = cur ? LEAGUES[cur.league].tier : 3;
  const overall = state.player.overall;
  const candidates = Object.values(TEAMS).filter(t => {
    if (cur && t.id === cur.id) return false;
    const tier = LEAGUES[t.league].tier;
    if (overall >= 86) return tier <= 2;                 // 顶级选手：只去一二级赛区强队
    if (overall >= 80) return tier <= 3;                 // 明星选手：一二三级都考虑
    return tier <= curTier + 1 && tier >= Math.max(1, curTier - 1);
  });
  // 评分：队伍强度 + 你去了能不能打上首发 + 梦想加成 + 主场加成
  const score = t => {
    const fit = t.strength + (overall - t.strength) * 0.2;
    const dream = (t.id === state.player.foreignDreamTeamId || t.id === state.player.domesticDreamTeamId) ? 9 : 0;
    const home = cur && t.league === cur.league ? 1.5 : 0;
    const majorBoost = LEAGUES[t.league].tier === 1 ? 2 : 0;
    return fit + dream + home + majorBoost;
  };
  const sorted = candidates.sort((a, b) => score(b) - score(a));
  const picked = [];
  const rng = mulberry32(state.rngState ^ 0x9e3779b9);
  // 前两名强队基本必在，后面随机抽 2-3 支
  for (let i = 0; i < sorted.length && picked.length < 5; i++) {
    if (picked.length < 2 || rng() < 0.55) picked.push(sorted[i]);
  }
  if (picked.length < 3 && sorted.length > 3) {
    for (let i = sorted.length - 1; i >= 0 && picked.length < 4; i--) {
      if (!picked.includes(sorted[i])) picked.push(sorted[i]);
    }
  }
  state.rngState = (mulberry32(state.rngState)(0) * 4294967296) >>> 0 || 12345;
  const stayOption = allowStay && cur ? [{
    id: 'stay',
    label: `留在${cur.zh}续约`,
    hint: `继续为${cur.zh}效力，不转会`,
  }] : [];
  return {
    id: `transfer-${state.step}`,
    type: 'transfer_choose',
    title: '新东家 · 战队邀约',
    text: '经纪人摆出几份报价：你的实力起来了，各大赛区的战队都在抢人。你看着那些队徽，做了一个决定。',
    options: [
      ...stayOption,
      ...picked.map(t => ({
      id: `tf-${t.id}`,
      label: `${t.zh}`,
      hint: `${offerHint(state, t)}${t.id === state.player.foreignDreamTeamId || t.id === state.player.domesticDreamTeamId ? ' · 你的儿时主队！' : ''}`,
      teamId: t.id,
      })),
    ],
  };
}

// 选队预览：预测角色与加成
export function teamPreview(state, team) {
  const overall = state.player.overall;
  const age = state.player.age;
  let idx = overall - team.strength <= -8 ? 0 : overall - team.strength <= -3 ? 1 : overall - team.strength <= 3 ? 2 : overall - team.strength <= 8 ? 3 : 4;
  if (age <= 18) idx = Math.max(0, idx - 1);
  if (age >= 27 && idx >= 2) idx -= 1;
  if (age >= 30 && idx >= 3) idx -= 1;
  idx = clamp(idx, 0, 4);

  const bonus = { growth: 1, trophy: 1, salary: 1, roleShift: 0, label: '' };
  if (team.strength >= 88) {
    bonus.trophy = 1.15;
    bonus.salary = 1.2;
    bonus.roleShift = overall >= team.strength - 3 ? 0 : -1;
    bonus.label = '豪门：夺冠/薪资加成，但竞争激烈';
  } else if (team.strength >= 82) {
    bonus.trophy = 1.05;
    bonus.salary = 1.1;
    bonus.label = '强队：夺冠和薪资略有加成';
  } else if (team.strength <= 78) {
    bonus.roleShift = 1;
    bonus.growth = 1.15;
    bonus.salary = 0.85;
    bonus.label = '平民队：核心培养、成长加速、薪资偏低';
  } else {
    bonus.label = '中游：均衡发展';
  }
  const tier = LEAGUES[team.league].tier;
  if (tier === 1) {
    bonus.salary *= 1.1;
    bonus.label += ' · 顶级赛区曝光高';
  } else if (tier === 3) {
    bonus.salary *= 0.85;
    bonus.label += ' · 外卡曝光低';
  }
  return { role: ROLE_KEYS[clamp(idx + bonus.roleShift, 0, 4)], bonus };
}

const SHOWDOWN_MODS = {
  last_shot: { three: -0.06, drive: 0.05, pass: 0.03 },
  free_throw: { calm: 0.06, quick: -0.02 },
  adc_showdown: { position: 0.05, kite: 0.02 },
  mid_showdown: { duel: -0.03, roam: 0.05 },
  top_showdown: { split: 0.04, tp: 0.02 },
  sup_showdown: { ward: 0.06, engage: -0.03 },
  game7: { iso: -0.04, screen: 0.06 },
  qualifier_showdown: { aggressive: -0.06, steady: 0.07 },
  world_cup_showdown: { hero: -0.05, team: 0.05 },
};

export function showdownMod(key, optId) {
  return SHOWDOWN_MODS[key]?.[optId] || 0;
}

// ---------- 赛季模拟 ----------
function roleFor(state, team, age, modifiers) {
  const diff = state.player.overall - team.strength;
  let idx =
    diff <= -8 ? 0 : diff <= -3 ? 1 : diff <= 3 ? 2 : diff <= 8 ? 3 : 4;
  if (age <= 18) idx = Math.max(0, idx - 1);
  if (age >= 27 && idx >= 2) idx -= 1;
  if (age >= 30 && idx >= 3) idx -= 1;
  idx = clamp(idx + (modifiers.roleShift || 0), 0, 4);
  return ROLE_KEYS[idx];
}

function ageFactor(age) {
  if (age <= 18) return 0.72;
  if (age <= 20) return 0.92;
  if (age <= 25) return 1.0;
  if (age <= 27) return 0.96;
  if (age <= 29) return 0.88;
  if (age <= 31) return 0.76;
  return 0.58;
}

function simulateSeason(state, team, age, modifiers, phase = 'summer') {
  const rng = mulberry32(state.rngState);
  const player = state.player;
  const league = LEAGUES[team.league];
  const suspended = modifiers.suspended;
  const injury = modifiers.injury;
  const form = 1 + (modifiers.tempDelta || 0) * 0.045;
  const isSpring = phase === 'spring';
  const isSummer = !isSpring;

  let role, g, stats;
  if (suspended) {
    role = 'edge';
    g = 0;
    stats = { g: 0, kills: 0, deaths: 0, assists: 0, cs: 0, dmg: 0, vis: 0 };
  } else {
    const teamMods = { ...modifiers, roleShift: (modifiers.roleShift || 0) + (state.teamBonus.roleShift || 0) };
    role = roleFor(state, team, age, teamMods);
    const rf = roleFactor(role);
    const af = ageFactor(age);
    const lf = { 1: 1.0, 2: 0.96, 3: 0.9 }[league.tier] ?? 0.9;
    const scale = clamp((player.overall - 40) / 59, 0.05, 1);
    const w = POSITIONS[player.position].weight;
    const noise = () => 0.88 + rng() * 0.24;
    const injFactor = injury ? 0.72 : 1;
    const base = {
      kills: (1.2 + 3.2 * scale) * w.kills * rf * af * lf * injFactor * form * noise(),
      deaths: ((0.9 + 1.6 * scale) * w.deaths * rf * af * lf * injFactor * form * noise() * 0.92) + 0.4,
      assists: (2.0 + 7.0 * scale) * w.assists * rf * af * lf * injFactor * form * noise(),
      cs: (70 + 130 * scale) * w.cs * rf * af * lf * injFactor * form * noise(),
      dmg: (6000 + 13000 * scale) * w.dmg * rf * af * lf * injFactor * form * noise(),
      vis: (25 + 55 * scale) * w.vis * rf * af * lf * injFactor * form * noise(),
    };
    const gameRange = { edge: [30, 48], rotation: [48, 64], starter: [62, 78], star: [70, 84], superstar: [74, 88] }[role];
    const rawG = gameRange[0] + rng() * (gameRange[1] - gameRange[0]);
    const fullG = Math.round(rawG * (league.games / 82) * (injury ? 0.62 : 1));
    const springG = Math.round(fullG * 0.48);
    g = isSpring ? springG : fullG - springG;
    stats = {
      g,
      kills: base.kills * g,
      deaths: base.deaths * g,
      assists: base.assists * g,
      cs: base.cs * g,
      dmg: base.dmg * g,
      vis: base.vis * g,
      avg: { kills: base.kills, deaths: base.deaths, assists: base.assists, cs: base.cs, dmg: base.dmg, vis: base.vis },
    };
  }

  // 战队战绩
  const teamPower = team.strength * 0.62 + player.overall * 0.38 + roleFactor(role) * 1.5;
  let champP = clamp(0.03 + (teamPower - 74) * 0.005, 0.015, 0.34);
  champP *= { 1: 1.18, 2: 1.0, 3: 0.9 }[league.tier] ?? 0.9;
  if (modifiers.trophyMult) champP *= modifiers.trophyMult;
  if (state.teamBonus.trophy) champP *= state.teamBonus.trophy;
  if (suspended) champP *= 0.7;

  const r1 = rng();
  let result;
  if (isSpring) {
    // 春季赛不决出联赛冠军，只决定 MSI 名额和季后赛位置
    if (r1 < champP * 0.5) result = { league: 'final' };
    else if (r1 < champP * 1.4) result = { league: 'semis' };
    else if (r1 < champP * 2.6) result = { league: 'quarters' };
    else if (r1 < champP * 3.8) result = { league: 'playoffs' };
    else result = { league: 'missed' };
  } else {
    if (r1 < champP) result = { league: 'champion' };
    else if (r1 < champP + champP * 0.55) result = { league: 'final' };
    else if (r1 < champP * 2.2) result = { league: 'semis' };
    else if (r1 < champP * 3.4) result = { league: 'quarters' };
    else if (r1 < champP * 4.6) result = { league: 'playoffs' };
    else result = { league: 'missed' };
  }

  let cup = null;
  if (isSummer && league.cup && !suspended) {
    if (rng() < champP * 0.8) cup = 'cup_champion';
    else if (rng() < champP * 0.6) cup = 'cup_final';
  }

  // 个人奖项：按年颁发，只在夏季赛结算
  const awards = [];
  if (isSummer && !suspended && g > 0) {
    if (player.overall >= 78 && rng() < 0.75) awards.push('allstar');
    if (player.overall >= 84 && rng() < 0.65) awards.push('all_team');
    if (player.overall >= 86 && rng() < 0.4) awards.push('mvp');
    if (result.league === 'champion' && player.overall >= 84 && rng() < 0.55) awards.push('fmvp');
    if (player.overall >= 85 && rng() < 0.35 && ['adc', 'mid', 'top'].includes(player.position)) awards.push('kill_title');
    if (player.overall >= 85 && rng() < 0.3 && ['adc', 'mid', 'top'].includes(player.position)) awards.push('cs_title');
    if (player.overall >= 84 && rng() < 0.35 && ['sup', 'jg', 'mid'].includes(player.position)) awards.push('assist_title');
    if (player.overall >= 83 && rng() < 0.3 && ['sup', 'jg'].includes(player.position)) awards.push('vision_title');
    if (age === 18 && player.overall >= 74 && rng() < 0.7) awards.push('rookie');
    if (player.overall >= 82 && rng() < 0.28 && ['top', 'mid'].includes(player.position)) awards.push('solo_kill_title');
    if (player.overall >= 81 && player.overall < 90 && rng() < 0.35) awards.push('second_team');
    if (age >= 19 && age <= 23 && player.overall - player.debutOverall >= 10 && rng() < 0.5) awards.push('most_improved');
    if (player.overall >= 78 && rng() < 0.08) awards.push('popular');
  }

  const trophies = [];
  if (isSummer && result.league === 'champion') trophies.push(`league:${team.league}`);
  if (isSummer && cup === 'cup_champion') trophies.push(`cup:${team.league}`);

  const marketValue = isSummer ? marketValueOf(player.overall, age, league) : 0;
  const salary = isSummer ? salaryOf(marketValue, role) * (modifiers.salaryMult || 1) * (state.teamBonus.salary || 1) : 0;

  // 能力成长/下滑：一年结算一次（夏季赛末）
  if (isSummer) {
    const dev = develop(player, age, rng, state.teamBonus.growth || 1, modifiers.tempDelta || 0);
    player.overall = dev;
  }

  let highlight = null;
  if (!suspended && g > 0) {
    const a = stats.avg;
    const kda = (a.kills + a.assists) / Math.max(a.deaths, 1);
    if (a.kills >= 6.5) highlight = `${isSpring ? '春季赛' : '夏季赛'}场均 ${a.kills.toFixed(1)} 击杀`;
    else if (kda >= 7) highlight = `${isSpring ? '春季赛' : '夏季赛'} KDA ${kda.toFixed(1)}`;
    else if (result.league === 'champion' && awards.includes('fmvp')) highlight = '联赛冠军 + 总决赛MVP';
    else if (awards.includes('mvp')) highlight = '荣膺常规赛MVP';
    else if (awards.includes('kill_title')) highlight = '荣膺赛季击杀王';
    else if (awards.includes('cs_title')) highlight = '荣膺赛季补刀王';
    else if (awards.includes('assist_title')) highlight = '荣膺赛季助攻王';
    else if (awards.includes('vision_title')) highlight = '荣膺赛季视野王';
    else if (awards.includes('rookie')) highlight = '荣膺最佳新秀';
    else if (a.kills >= 5 && rng() < 0.18) highlight = '单场五杀';
    else if (a.kills >= 4 && rng() < 0.12) highlight = '单场 20 杀';
  }

  const snapshot = {
    age,
    year: state.year,
    phase,
    teamId: team.id,
    leagueId: team.league,
    overall: player.overall,
    role,
    suspended: !!suspended,
    stats,
    result,
    cup,
    trophies,
    awards,
    salary,
    marketValue,
    highlight,
    teamBonus: state.teamBonus.label || null,
    note: null,
  };

  state.rngState = (rng() * 4294967296) >>> 0 || 12345;
  return { snapshot, rng };
}

function develop(player, age, rng, growthMult = 1, tempDelta = 0) {
  const p = player.potential;
  let target;
  if (age <= 25) target = p;
  else if (age <= 27) target = p - 1;
  else if (age <= 29) target = p - 3;
  else if (age <= 31) target = p - 6;
  else target = p - 10;
  // 天赋流失：长期状态差（负面选择累积）会真的掉潜力
  if (tempDelta <= -1 && rng() < 0.14 && player.potential > 62) {
    player.potential -= 1;
    player.potentialRank = potentialRank(player.potential);
  }
  const luck = player.growthLuck || 1;
  let delta = 0;
  if (player.overall < target) {
    const speed = age <= 21 ? 2.5 : age <= 25 ? 1.35 : age <= 28 ? 0.8 : 0.4;
    // 成长不是必然：状态差、运气差时会停滞甚至倒退
    const stall = rng() < clamp(0.14 - (luck - 1) * 0.18 + tempDelta * 0.035, 0.02, 0.5);
    if (stall) {
      delta = rng() < 0.35 ? -(0.5 + rng() * 0.9) : 0;
    } else {
      delta = speed * (0.75 + rng() * 0.7) * luck * growthMult;
    }
  } else if (player.overall > target) {
    delta = -(age >= 28 ? 0.7 + rng() * 0.9 : 0.25 + rng() * 0.3);
  }
  return clamp(Math.round(player.overall + delta), 40, 99);
}

// ---------- 赛区代表队 & 大赛 ----------
function nationalThreshold(region) {
  return { 1: 72, 2: 77, 3: 80 }[region.tier] ?? 80;
}

function qualifyProb(state, region) {
  const boost = (state.player.overall - 80) * 0.012;
  let p = region.qualify + boost;
  if (state.nationalTeamRetiredAge !== undefined) p = 0;
  return clamp(p, 0.05, 0.97);
}

function depthGames(result) {
  return { champion: 14, semis: 12, quarters: 10, group: 7 }[result] ?? 7;
}

function tournamentStats(state, games, mult) {
  const w = POSITIONS[state.player.position].weight;
  const scale = clamp((state.player.overall - 40) / 59, 0.1, 1);
  const pg = {
    kills: (1.4 + 4.2 * scale) * w.kills,
    deaths: ((1.0 + 1.8 * scale) * w.deaths * 0.9) + 0.4,
    assists: (2.2 + 8.0 * scale) * w.assists,
    cs: (80 + 140 * scale) * w.cs,
    dmg: (7000 + 14000 * scale) * w.dmg,
    vis: (28 + 58 * scale) * w.vis,
  };
  return {
    g: games,
    kills: pg.kills * games * mult,
    deaths: pg.deaths * games * mult,
    assists: pg.assists * games * mult,
    cs: pg.cs * games * mult,
    dmg: pg.dmg * games * mult,
    vis: pg.vis * games * mult,
    avg: pg,
  };
}

function clubQualify(clubResult, type, tier) {
  const base = {
    worlds: { champion: 1, final: 0.85, semis: 0.65, quarters: 0.4, playoffs: 0.15, missed: 0.02 },
    msi: { champion: 1, final: 0.55, semis: 0.3, playoffs: 0.1, missed: 0.02 },
    rift_rivals: { champion: 1, final: 0.8, semis: 0.6, quarters: 0.35, playoffs: 0.1, missed: 0.02 },
  }[type] || { champion: 1, final: 0.5, semis: 0.3, playoffs: 0.1, missed: 0.02 };
  const tierBoost = tier === 1 ? 0.12 : tier === 2 ? 0.03 : -0.1;
  return clamp((base[clubResult] ?? 0.02) + tierBoost, 0.02, 0.98);
}

function tournamentResult(state, tournament, modifiers, rng, clubResult) {
  const overall = state.player.overall;
  const region = REGIONS[state.player.nationalityCode];
  const suspended = modifiers.suspended;
  const t = tournament.type;

  if (t === 'allstar') {
    if (overall < 78 || suspended) return { called: false, result: 'not_called', stats: null, awards: [] };
    const winP = clamp((overall - 70) * 0.006 + 0.08, 0.06, 0.5);
    const r = rng();
    const result = r < winP ? 'champion' : r < winP + 0.25 ? 'semis' : 'group';
    const awards = [];
    if (result === 'champion' && rng() < 0.5) awards.push('allstar_mvp');
    return { called: true, result, stats: tournamentStats(state, 5, 0.7), awards };
  }

  if (t === 'asian_games') {
    const threshold = nationalThreshold(region);
    const calledUp = overall >= threshold && state.nationalTeamRetiredAge === undefined && !suspended;
    if (!calledUp) return { called: false, result: 'not_called', stats: null, awards: [] };
    let q = qualifyProb(state, region);
    if (modifiers.nationalMult) q *= modifiers.nationalMult;
    if (state.pendingQualifier && state.pendingQualifier.age === tournament.age) {
      q = state.pendingQualifier.won ? 1 : 0;
    }
    const qualified = tournament.qualified === false ? false : rng() < q;
    if (!qualified) return { called: true, result: 'not_qualified', stats: null, awards: [] };

    const strength = (region.tier === 1 ? 80 : region.tier === 2 ? 70 : 60) + (overall - 80) * 0.45 + (modifiers.nationalMult ? (modifiers.nationalMult - 1) * 15 : 0);
    const championP = clamp((strength - 68) * 0.006 + 0.02, 0.01, 0.34);
    const r = rng();
    const result = r < championP ? 'champion' : r < championP + championP * 2.2 ? 'semis' : r < championP + championP * 4 ? 'quarters' : 'group';
    if (result === 'semis' && overall >= 84) state.pendingWorldCupUpgrade = { age: tournament.age, type: t };
    const awards = [];
    if (result === 'champion' && overall >= 86) awards.push('tournament_mvp');
    if ((result === 'champion' || result === 'semis') && overall >= 83) awards.push('tournament_all_team');
    return { called: true, result, stats: tournamentStats(state, depthGames(result), 1), awards };
  }

  // 俱乐部级大赛：全球总决赛 / MSI / 洲际对抗赛
  if (t === 'worlds' || t === 'msi' || t === 'rift_rivals') {
    const team = state.currentTeamId ? TEAMS[state.currentTeamId] : null;
    const tier = team ? LEAGUES[team.league].tier : 3;
    const q = clubQualify(clubResult, t, tier);
    if (suspended || rng() >= q) return { called: true, result: 'not_qualified', stats: null, awards: [] };

    const strength = 74 + (overall - 70) * 0.55 + (tier === 1 ? 4 : tier === 2 ? 0 : -4);
    const baseP = { worlds: 0.02, msi: 0.028, rift_rivals: 0.05 }[t] ?? 0.03;
    const championP = clamp(baseP + (strength - 74) * 0.0028 + (modifiers.trophyMult ? (modifiers.trophyMult - 1) * 0.008 : 0), 0.012, t === 'worlds' ? 0.3 : 0.38);
    const r = rng();
    const result = r < championP ? 'champion' : r < championP * 2.4 ? 'semis' : r < championP * 4.5 ? 'quarters' : 'group';
    if (t === 'worlds' && result === 'semis' && overall >= 84) state.pendingWorldCupUpgrade = { age: tournament.age, type: t };
    const awards = [];
    if (t === 'worlds' && result === 'champion' && overall >= 85) awards.push('fmvp');
    if (t === 'msi' && result === 'champion' && overall >= 83) awards.push('msi_mvp');
    if (t === 'rift_rivals' && result === 'champion' && overall >= 83) awards.push('tournament_mvp');
    return { called: true, result, stats: tournamentStats(state, depthGames(result) * 1.3, 1), awards };
  }

  return { called: false, result: 'not_called', stats: null, awards: [] };
}

// ---------- 推进 ----------
export function step(state) {
  if (state.phase !== 'career') return { state, screen: 'summary' };
  if (state.currentEvent) return { state, screen: 'event' };

  const age = state.player.age;
  const modifiers = state.period.modifiers || {};

  if (state.stage === 'youth') {
    const snapshot = {
      age,
      year: state.year,
      teamId: null,
      leagueId: null,
      overall: state.player.overall,
      role: 'starter',
      stats: { g: 0, kills: 0, deaths: 0, assists: 0, cs: 0, dmg: 0, vis: 0 },
      result: { league: 'youth' },
      trophies: [],
      awards: [],
      salary: 0,
      marketValue: state.player.marketValue,
      youth: true,
    };
    state.seasons.push(snapshot);
    state.period.run += 1;
    state.player.age += 1;
    state.year += 1;
    if (state.period.run === 1) {
      // 15 岁青训赛季后有一次青训决策
      state.currentEvent = pickEvent(state, 15);
    } else if (state.period.run === 2) {
      // 16 岁青训赛季后再来一次
      state.currentEvent = pickEvent(state, 16);
    } else {
      // 17 岁青训结束，18 岁签约进战队
      state.stage = 'sign';
      state.currentEvent = signContractEvent(state);
      state.period = { periodIndex: 1, remaining: 2, run: 0, modifiers: {} };
    }
    return { state, screen: 'banner', snapshot };
  }

  // 职业赛季
  const team = TEAMS[state.currentTeamId];
  if (!team) {
    state.phase = 'summary';
    state.retirementReason = state.retirementReason || 'no_offers';
    return { state, screen: 'summary' };
  }

  const suspended = state.suspensionSeasonsRemaining > 0;
  const seasonModifiers = {
    ...modifiers,
    suspended: suspended ? '禁赛' : modifiers.injury,
    roleShift: modifiers.roleShift || (state.suspensionRustRemaining > 0 ? -1 : 0),
  };

  const phase = state.period.run === 0 ? 'spring' : 'summer';
  const isSummer = phase === 'summer';
  const { snapshot } = simulateSeason(state, team, age, seasonModifiers, phase);

  // 结算
  const t = state.totals;
  t.apps += snapshot.stats.g;
  t.kills += snapshot.stats.kills;
  t.deaths += snapshot.stats.deaths;
  t.assists += snapshot.stats.assists;
  t.cs += snapshot.stats.cs;
  t.dmg += snapshot.stats.dmg;
  t.vis += snapshot.stats.vis;
  t.salary += snapshot.salary;
  snapshot.trophies.forEach(tid => t.trophies.push(tid));
  snapshot.awards.forEach(aid => t.awards.push(aid));
  snapshot.trophies.forEach(tid => state.pendingHonors.push({ kind: 'trophy', id: tid }));
  snapshot.awards.forEach(aid => state.pendingHonors.push({ kind: 'award', id: aid }));
  if (snapshot.highlight) state.highlights.push({ age, text: snapshot.highlight });

  // 宿敌对位：一年一次（夏季赛）
  if (isSummer && state.rival) {
    const rr = mulberry32(state.rngState);
    const rs = rivalSeason(state.rival, age, rr);
    state.rngState = (rr() * 4294967296) >>> 0 || 12345;
    state.rivalSeries.push({
      age,
      my: snapshot.stats.kills,
      rival: rs.kills,
      myChamp: snapshot.result.league === 'champion',
      rivalChamp: rs.champ,
      myMvp: snapshot.awards.includes('mvp'),
      rivalMvp: rs.mvp,
    });
  }

  if (isSummer && suspended) {
    state.suspensionSeasonsRemaining -= 1;
    if (state.suspensionSeasonsRemaining === 0) state.suspensionRustRemaining = 2;
  } else if (isSummer && state.suspensionRustRemaining > 0) {
    state.suspensionRustRemaining -= 1;
  }

  // 大赛：春季赛打 MSI / 全明星，夏季赛打世界赛 / 亚运会 / 洲际赛
  const region = REGIONS[state.player.nationalityCode];
  const tourneyTypes = isSummer ? ['worlds', 'asian_games', 'rift_rivals'] : ['msi', 'allstar'];
  const tourneys = state.tournaments.filter(t2 => t2.age === age && tourneyTypes.includes(t2.type));
  for (let ti = 0; ti < tourneys.length; ti++) {
    const tournament = tourneys[ti];
    if (tournament.type === 'asian_games' && state.nationalTeamRetiredAge !== undefined) continue;
    const tr = tournamentResult(state, tournament, modifiers, mulberry32(state.rngState ^ (0x51ab + ti * 7919)), snapshot.result.league);
    snapshot.tournaments = snapshot.tournaments || [];
    if (tr.called) {
      state.hasNationalTeamCallup = true;
      if (tr.result !== 'not_called' && tr.result !== 'not_qualified') {
        const nat = { age, year: state.year, type: tournament.type, result: tr.result, stats: tr.stats, awards: tr.awards || [] };
        state.nationalTeamPeriods.push(nat);
        if (tr.stats) {
          t.apps += tr.stats.g;
          t.kills += tr.stats.kills;
          t.deaths += tr.stats.deaths;
          t.assists += tr.stats.assists;
          t.cs += tr.stats.cs;
          t.dmg += tr.stats.dmg;
          t.vis += tr.stats.vis;
        }
        if (tr.result === 'champion') {
          const tid = tournament.type === 'worlds' ? 'worlds' : tournament.type === 'msi' ? 'msi' : tournament.type === 'asian_games' ? 'asian_games' : tournament.type === 'rift_rivals' ? 'rift_rivals' : 'allstar';
          t.trophies.push(tid);
          state.pendingHonors.push({ kind: 'trophy', id: tid });
          snapshot.trophies = snapshot.trophies || [];
          snapshot.trophies.push(tid);
          if (tournament.type === 'worlds') {
            state.legacyLines.push('你把召唤师杯举过头顶。');
            state.highlights.push({ age, text: `S${state.year - 2010} 全球总决赛冠军` });
          }
          if (tournament.type === 'msi') state.legacyLines.push('季中冠军赛，你捧起了金杯。');
          if (tournament.type === 'asian_games') state.legacyLines.push(`你为${region.zh}拿下亚运会金牌。`);
          if (tournament.type === 'rift_rivals') state.legacyLines.push(`洲际对抗赛，你们把冠军留在了${region.zh}。`);
          if (tournament.type === 'allstar') state.legacyLines.push('全明星表演赛，你笑到了最后。');
        }
        tr.awards?.forEach(a => t.awards.push(a));
        tr.awards?.forEach(a => state.pendingHonors.push({ kind: 'award', id: a }));
        snapshot.tournaments.push(nat);
      } else {
        snapshot.tournaments.push({ age, year: state.year, type: tournament.type, result: tr.result, stats: null, awards: [] });
      }
      if (tournament.type !== 'allstar') {
        tournament.qualified = ['champion', 'semis', 'quarters', 'group'].includes(tr.result);
      }
    } else {
      snapshot.tournaments.push({ age, year: state.year, type: tournament.type, result: 'not_called', stats: null, awards: [] });
    }
  }

  if (state.pendingWorldCupUpgrade && state.pendingWorldCupUpgrade.age === age) {
    const tw = state.tournaments.find(t2 => t2.age === age && t2.type === state.pendingWorldCupUpgrade.type);
    state.currentEvent = showdownEvent('world_cup_showdown', state, tw);
  }

  // 亚运会预选赛生死战（大赛前一年夏季触发）
  if (isSummer) {
    const upcomingNat = state.tournaments.find(t2 => t2.age === age + 1 && t2.type === 'asian_games' && t2.qualified === null);
    if (upcomingNat && state.nationalTeamRetiredAge === undefined && state.player.overall >= nationalThreshold(region) - 3) {
      const qp = qualifyProb(state, region) * (modifiers.nationalMult || 1);
      if (qp > 0.32 && qp < 0.72) {
        state.currentEvent = showdownEvent('qualifier_showdown', state, upcomingNat);
        state.pendingQualifier = { age: upcomingNat.age, won: null };
      }
    }
  }

  state.seasons.push(snapshot);

  // 夏季赛打到半决赛/决赛：可能触发 BO5 决胜局
  if (isSummer && !state.currentEvent && ['semis', 'final'].includes(snapshot.result.league)) {
    const r = roll(state.rngState);
    state.rngState = r.state;
    if (r.v[0] < 0.45) state.currentEvent = showdownEvent('game7', state, null);
  }

  state.period.run += 1;
  const yearEnd = state.period.run >= state.period.remaining;
  if (yearEnd) {
    // 年末：年龄 +1，进入下一年
    state.player.age += 1;
    state.year += 1;
    if (state.contractYears > 0) state.contractYears -= 1;
    const league = LEAGUES[team.league];
    state.player.marketValue = marketValueOf(state.player.overall, state.player.age, league);
    state.period.run = 0;
  }
  // 阶段结束：本次决策的影响只作用于下一个半程
  state.period.modifiers = {};
  if (!state.currentEvent) {
    const ev = scheduleNextEvent(state);
    if (ev) state.currentEvent = ev;
  }

  return { state, screen: 'banner', snapshot };
}

function scheduleNextEvent(state) {
  const age = state.player.age;
  // 32 岁必退
  if (age >= 32) {
    state.retirementReason = 'age';
    return retirementStyleEvent(state, 'age');
  }
  // 合同到期：先看俱乐部要不要续约
  if (state.contractYears <= 0 && state.currentTeamId) {
    return contractRenewalEvent(state);
  }
  // 28 岁起每两年可以主动选择挂靴
  if (age >= 28 && age - state.lastVoluntaryOfferAge >= 2) {
    state.lastVoluntaryOfferAge = age;
    return {
      id: `retire-voluntary-${state.step}`,
      type: 'voluntary_retire',
      title: '退役的决定',
      text: `${age} 岁，那份合同在桌上摆了两个星期，你始终没签。剩下的只是怎么让人知道。`,
      options: [
        { id: 'keep', label: '再打两年', hint: '继续职业生涯，不退役' },
        { id: 'retire', label: '就此结束职业生涯', hint: '主动退役' },
      ],
    };
  }
  // 决胜时刻
  {
    const r = roll(state.rngState);
    state.rngState = r.state;
    const pos = state.player.position;
    const roleShowdown = pos === 'jg' ? 'free_throw' : pos === 'adc' ? 'adc_showdown' : pos === 'mid' ? 'mid_showdown' : pos === 'top' ? 'top_showdown' : 'sup_showdown';
    if (r.v[0] < 0.16) return showdownEvent('last_shot', state, null);
    if (r.v[0] < 0.26) return showdownEvent(roleShowdown, state, null);
  }
  // 宿敌对决
  if (state.rival && [20, 24, 28].includes(age) && !state.usedRivalAges.includes(age)) {
    state.usedRivalAges.push(age);
    return rivalDuelEvent(state);
  }
  // 转会邀约：实力起来了，各大赛区的战队会来抢人，每两季一次机会
  if (age >= 19 && age - state.lastTransferAge >= 2 && !state.usedTransferOfferAges.includes(age)) {
    const p = clamp((state.player.overall - 76) * 0.014, 0.04, 0.5);
    const r = roll(state.rngState);
    state.rngState = r.state;
    if (r.v[0] < p) {
      state.usedTransferOfferAges.push(age);
      state.lastTransferAge = age;
      return transferChooseEvent(state);
    }
  }
  const ev = pickEvent(state, age);
  return ev;
}

function retirementStyleEvent(state, reason) {
  const styles = reason === 'no_offers' || reason === 'contract' ? WALKAWAY_STYLES : FAREWELL_STYLES;
  return {
    id: `retire-style-${state.step}`,
    type: reason === 'no_offers' || reason === 'contract' ? 'walkaway_style' : 'farewell_style',
    title: '谢幕',
    text: '你宣布了退役的决定。剩下的只是怎么让人知道。',
    options: styles.map(s => ({ id: s.id, label: s.label, hint: s.hint })),
  };
}

export function contractRenewalEvent(state) {
  const team = TEAMS[state.currentTeamId];
  const last = state.seasons.filter(s => !s.youth && s.teamId).pop();
  const role = last ? last.role : 'starter';
  const overall = last ? last.overall : state.player.overall;
  const age = state.player.age;
  if (role === 'star' || role === 'superstar' || overall >= 84) {
    return {
      id: `contract-renew-${state.step}`,
      type: 'contract_renewal',
      title: '续约谈判',
      text: `${age} 岁，${team.zh}把一份顶薪续约合同拍在桌上：你这三年的表现，配得上这份价码。`,
      options: [
        { id: 'renew', label: '续约三年', hint: '留队，地位更稳，薪资上涨', years: 3 },
        { id: 'hear', label: '先听听其他战队报价', hint: '手握主动权，货比三家' },
      ],
    };
  }
  if (role === 'starter' || overall >= 80) {
    return {
      id: `contract-renew-${state.step}`,
      type: 'contract_renewal',
      title: '续约谈判',
      text: `${age} 岁，${team.zh}愿意续约，但只给一份普通合同：你的状态不算差，也不算顶。`,
      options: [
        { id: 'renew', label: '续约两年', hint: '留队，保住首发', years: 2 },
        { id: 'hear', label: '听听其他战队报价', hint: '可能更好，也可能没有' },
      ],
    };
  }
  return {
    id: `contract-norenew-${state.step}`,
    type: 'contract_renewal',
    title: '不续约',
    text: `${age} 岁，俱乐部评估了你的状态，决定不再续约。经纪人把话说得很直：得看有没有人愿意接盘。`,
    options: [
      { id: 'offers', label: '去转会市场找下家', hint: '可能有好队，也可能无人问津' },
      { id: 'backup', label: '接受替补合同留下', hint: '降薪留下，机会变少' },
      { id: 'retire', label: '就此退役', hint: '结束职业生涯' },
    ],
  };
}

function showdownEvent(key, state, tournament) {
  const sd = SHOWDOWNS[key];
  return {
    id: `${key}-${state.step}`,
    type: 'showdown',
    showdownKey: key,
    title: sd.title,
    text: sd.text,
    tournamentAge: tournament ? tournament.age : null,
    options: sd.options.map(o => ({ ...o })),
  };
}

function rivalDuelEvent(state) {
  const r = state.rival;
  const myKills = state.rivalSeries.reduce((s, x) => s + x.my, 0);
  const hisKills = state.rivalSeries.reduce((s, x) => s + x.rival, 0);
  const lead = hisKills > myKills ? `总击杀上，他还压着你。` : `总击杀上，你压着他。`;
  return {
    id: `rival-${state.step}`,
    type: 'career_event',
    title: '宿敌对决',
    text: `${state.player.age} 岁这年，你和${r.name}的每一次碰面都像世界赛决赛。${lead}${r.meme ? ` 全网都叫他「${r.meme}」。` : ''}`,
    options: [
      {
        id: 'train', label: '赛后加练，研究他的打法', hint: '练成能力上涨，练过头有伤', outcomes: [
          { prob: 0.6, text: `你把${r.name}的套路研究透了，场上压得他难受。`, effects: { overallDelta: 1, permanent: true, legacy: `你和${r.name}的恩怨，又多了一页。` } },
          { prob: 0.4, text: '加练过猛，手腕拉伤。', effects: { injury: '手腕拉伤', tempDelta: -1 } },
        ],
      },
      {
        id: 'trash', label: '赛后当众放话', hint: '热度拉满，赢了封神输了挨骂', outcomes: [
          { prob: 0.5, text: `你在采访里点了${r.name}的名字，第二天全网都在讨论。`, effects: { tempDelta: 1, money: 200, legacy: `你向${r.name}下了战书。` } },
          { prob: 0.5, text: '话放出去了，下一场被打爆，成了笑柄。', effects: { tempDelta: -2 } },
        ],
      },
      {
        id: 'respect', label: '赛后握手致敬', hint: '英雄相惜', outcomes: [
          { prob: 1, text: `你和${r.name}互换了队服。他说：下一场，我不会放水。`, effects: { roleShift: 1, legacy: `你和${r.name}互换了队服。` } },
        ],
      },
    ],
  };
}

// ---------- 决策 ----------
export function decide(state, optionId) {
  const ev = state.currentEvent;
  if (!ev) return { state, screen: 'event' };
  const opt = ev.options.find(o => o.id === optionId);
  if (!opt) return { state, screen: 'event' };

  if (ev.type === 'sign_contract') {
    state.currentTeamId = opt.teamId;
    state.contractTeamId = opt.teamId;
    state.contractYears = 3;
    const team = TEAMS[opt.teamId];
    const pv = teamPreview(state, team);
    state.teamBonus = { ...pv.bonus };
    state.player.marketValue = marketValueOf(state.player.overall, state.player.age, LEAGUES[team.league]);
    state.lastEventOutcome = { eventKey: 'sign_contract', optionKey: opt.teamId, text: `你穿上了${team.zh}的队服，预计${roleName(pv.role)}${pv.bonus.label ? '（' + pv.bonus.label + '）' : ''}。`, kind: 'positive' };
    state.step += 1;
    state.currentEvent = null;
    return { state, screen: 'career' };
  }

  if (ev.type === 'transfer_choose') {
    if (opt.id === 'stay') {
      const curTeam = TEAMS[state.currentTeamId];
      state.lastTransferAge = state.player.age;
      const pv = teamPreview(state, curTeam);
      state.teamBonus = { ...pv.bonus };
      state.lastEventOutcome = { eventKey: 'transfer', optionKey: 'stay', text: `你选择留在${curTeam.zh}续约，预计${roleName(pv.role)}。`, kind: 'positive' };
      state.step += 1;
      state.currentEvent = null;
      state.pendingTransfer = null;
      const mods = state.period.modifiers || {};
      mods.roleShift = (mods.roleShift || 0) + 1;
      return { state, screen: 'career' };
    }
    const from = state.currentTeamId ? TEAMS[state.currentTeamId] : null;
    const team = TEAMS[opt.teamId];
    state.transfers.push({ age: state.player.age, from: from ? from.id : null, to: team.id });
    state.lastTransferAge = state.player.age;
    state.currentTeamId = team.id;
    state.contractTeamId = team.id;
    state.contractYears = 3;
    const pv = teamPreview(state, team);
    state.teamBonus = { ...pv.bonus };
    const league = LEAGUES[team.league];
    state.player.marketValue = marketValueOf(state.player.overall, state.player.age, league);
    if (team.id === state.player.foreignDreamTeamId || team.id === state.player.domesticDreamTeamId) {
      state.legacyLines.push(`你穿上了儿时主队${team.zh}的队服。`);
    }
    state.lastEventOutcome = { eventKey: 'transfer', optionKey: team.id, text: `你加盟了${team.zh}，预计${roleName(pv.role)}${pv.bonus.label ? '（' + pv.bonus.label + '）' : ''}。`, kind: 'positive' };
    state.step += 1;
    state.currentEvent = null;
    state.pendingTransfer = null;
    return { state, screen: 'career' };
  }

  if (ev.type === 'contract_renewal') {
    const mods = state.period.modifiers || {};
    const team = TEAMS[state.currentTeamId];
    if (opt.id === 'renew') {
      state.contractYears = opt.years || 2;
      mods.roleShift = (mods.roleShift || 0) + 1;
      state.lastEventOutcome = { eventKey: 'contract_renewal', optionKey: 'renew', text: `你和${team.zh}续约，再战${opt.years || 2}年。`, kind: 'positive' };
      state.currentEvent = null;
      state.step += 1;
      return { state, screen: 'career' };
    }
    if (opt.id === 'hear' || opt.id === 'offers') {
      state.lastEventOutcome = { eventKey: 'contract_renewal', optionKey: opt.id, text: opt.id === 'hear' ? '你让经纪人放出风声，先看看各队的诚意。' : '合同没谈拢，你进入了自由市场。', kind: 'neutral' };
      state.currentEvent = null;
      state.currentEvent = transferChooseEvent(state, opt.id === 'hear');
      return { state, screen: 'event', skipReceipt: true };
    }
    if (opt.id === 'backup') {
      state.contractYears = 1;
      mods.roleShift = (mods.roleShift || 0) - 2;
      mods.salaryMult = (mods.salaryMult || 1) * 0.7;
      state.lastEventOutcome = { eventKey: 'contract_renewal', optionKey: 'backup', text: `你接受了替补合同，降薪留在${team.zh}。`, kind: 'negative' };
      state.currentEvent = null;
      state.step += 1;
      return { state, screen: 'career' };
    }
    if (opt.id === 'retire') {
      state.lastEventOutcome = { eventKey: 'contract_renewal', optionKey: 'retire', text: '没有合适的报价，你决定就此退役。', kind: 'neutral' };
      state.currentEvent = null;
      return { ...beginRetirement(state, 'no_offers'), skipReceipt: true };
    }
  }

  if (ev.type === 'farewell_offer') {
    if (optionId === 'keep') {
      state.lastEventOutcome = { eventKey: 'farewell_offer', optionKey: 'keep', text: '你还想再打一年。', kind: 'neutral' };
      state.currentEvent = null;
      state.step += 1;
      return { state, screen: 'career' };
    }
    state.retirementReason = 'farewell';
    if (optionId === 'accept') {
      state.lastEventOutcome = { eventKey: 'farewell_offer', optionKey: 'accept', text: '赛季最后一个主场，为你办一场告别赛。', kind: 'neutral' };
      state.currentEvent = {
        id: `farewell-style-${state.step}`,
        type: 'farewell_style',
        title: '告别赛',
        text: '赛季最后一个主场，为你办一场。你想怎么告别。',
        options: FAREWELL_STYLES.map(s => ({ id: s.id, label: s.label, hint: s.hint })),
      };
    } else {
      state.lastEventOutcome = { eventKey: 'farewell_offer', optionKey: 'decline', text: '不办，安静地离开。', kind: 'neutral' };
      state.currentEvent = {
        id: `goodbye-style-${state.step}`,
        type: 'goodbye_style',
        title: '谢幕',
        text: '不办，安静地离开。',
        options: GOODBYE_STYLES.map(s => ({ id: s.id, label: s.label, hint: s.hint })),
      };
    }
    state.step += 1;
    return { state, screen: 'event' };
  }

  if (ev.type === 'farewell_style' || ev.type === 'goodbye_style' || ev.type === 'walkaway_style') {
    if (ev.type === 'farewell_style') state.farewell = optionId;
    if (ev.type === 'goodbye_style') state.goodbye = optionId;
    if (ev.type === 'walkaway_style') state.walkaway = optionId;
    state.currentEvent = null;
    return finalize(state);
  }

  if (ev.type === 'voluntary_retire') {
    if (optionId === 'keep') {
      state.lastEventOutcome = { eventKey: 'voluntary_retire', optionKey: 'keep', text: '你还想再打两年。', kind: 'neutral' };
      state.currentEvent = null;
      state.step += 1;
      return { state, screen: 'career' };
    }
    state.lastEventOutcome = { eventKey: 'voluntary_retire', optionKey: 'retire', text: '你决定把退役消息发出去。', kind: 'neutral' };
    state.currentEvent = null;
    return beginRetirement(state, 'voluntary');
  }

  if (ev.type === 'showdown') {
    return resolveShowdown(state, ev, opt);
  }

  // 普通生涯事件：掷结果
  const rng = mulberry32(state.rngState);
  const outcomes = opt.outcomes;
  let pickR = rng();
  let picked = outcomes[0];
  let acc = 0;
  for (const o of outcomes) {
    acc += o.prob;
    if (pickR < acc) { picked = o; break; }
  }
  state.rngState = (rng() * 4294967296) >>> 0 || 12345;

  const effects = picked.effects || {};
  const wasPositive = effects.overallDelta > 0 || effects.transfer || effects.money > 0 || effects.roleShift > 0;
  state.lastEventOutcome = {
    eventKey: ev.key,
    optionKey: optionId,
    text: picked.text,
    kind: wasPositive ? 'positive' : (effects.overallDelta < 0 || effects.injury || effects.suspended ? 'negative' : 'neutral'),
  };
  state.step += 1;

  // 应用效果
  const mods = state.period.modifiers || {};
  if (effects.overallDelta) {
    // 天赋不同，同样的选择效果不同：妖人更容易起飞，平庸者容易白练
    const scale = 0.75 + (state.player.growthLuck || 1) * 0.45;
    state.player.overall = clamp(state.player.overall + Math.round(effects.overallDelta * scale), 40, 99);
  }
  if (effects.roleShift) mods.roleShift = (mods.roleShift || 0) + effects.roleShift;
  if (effects.tempDelta) mods.tempDelta = (mods.tempDelta || 0) + effects.tempDelta;
  if (effects.trophyMult) mods.trophyMult = (mods.trophyMult || 1) * effects.trophyMult;
  if (effects.nationalMult) mods.nationalMult = (mods.nationalMult || 1) * effects.nationalMult;
  if (effects.salaryMult) mods.salaryMult = (mods.salaryMult || 1) * effects.salaryMult;
  if (effects.injury) mods.injury = effects.injury;
  if (effects.suspended) {
    state.suspensionSeasonsRemaining = effects.suspended;
    mods.suspended = true;
  }
  if (effects.money) state.totals.salary += effects.money;
  if (effects.nationalTeamRetired) state.nationalTeamRetiredAge = state.player.age;
  if (effects.legacy) {
    state.legacyLines.push(effects.legacy);
    const mr = mulberry32(state.rngState ^ 0xbeef);
    if (mr() < 0.3) state.legacyLines.push(MEMES[Math.floor(mr() * MEMES.length)]);
  }
  if (effects.award) {
    state.totals.awards.push(effects.award);
    state.pendingHonors.push({ kind: 'award', id: effects.award });
  }
  if (effects.forceRetire) {
    state.currentEvent = null;
    return beginRetirement(state, 'no_offers');
  }
  if (effects.transfer) {
    state.currentEvent = null;
    state.pendingTransfer = true;
    state.currentEvent = transferChooseEvent(state);
    return { state, screen: 'event' };
  }
  if (effects.dreamTeam) {
    const dream = state.player.domesticDreamTeamId || state.player.foreignDreamTeamId;
    if (dream) {
      state.transfers.push({ age: state.player.age, from: state.currentTeamId, to: dream });
      state.currentTeamId = dream;
      state.contractTeamId = dream;
      state.contractYears = 3;
      const pv = teamPreview(state, TEAMS[dream]);
      state.teamBonus = { ...pv.bonus };
      state.legacyLines.push(`你穿上了儿时主队${TEAMS[dream].zh}的队服。`);
    }
  }

  state.currentEvent = null;
  return { state, screen: 'career' };
}

function resolveShowdown(state, ev, opt) {
  const key = ev.showdownKey;
  const overall = state.player.overall;
  let p = clamp(0.42 + (overall - 75) * 0.01, 0.28, 0.88);
  p = clamp(p + showdownMod(key, opt.id), 0.22, 0.92);
  const rng = mulberry32(state.rngState);
  const won = rng() < p;
  state.rngState = (rng() * 4294967296) >>> 0 || 12345;
  state.showdownWins[key] += won ? 1 : 0;
  const text = won ? opt.successText : opt.failText;
  state.lastEventOutcome = { eventKey: key, optionKey: opt.id, text, kind: won ? 'positive' : 'negative' };
  state.step += 1;

  if (key === 'last_shot' && won) state.legacyLines.push('终场哨响前，你打出了生涯最漂亮的一波团。');
  if (key === 'free_throw' && won) state.legacyLines.push('远古巨龙，你抢下来了。');
  if (key === 'game7' && won) state.legacyLines.push('BO5 决胜局，你带走了系列赛。');

  if (key === 'qualifier_showdown' && ev.tournamentAge) {
    const t = state.tournaments.find(t2 => t2.age === ev.tournamentAge);
    if (t) t.qualified = won;
    state.pendingQualifier = { age: ev.tournamentAge, won };
    if (won) state.legacyLines.push('生死战，你把赛区送进了亚运会。');
  }

  if (key === 'world_cup_showdown') {
    const nat = state.nationalTeamPeriods.find(n => n.age === ev.tournamentAge && (n.type === 'worlds' || n.type === 'asian_games'));
    if (nat) {
      if (won) {
        nat.result = 'champion';
        const tid = nat.type === 'worlds' ? 'worlds' : 'asian_games';
        state.totals.trophies.push(tid);
        state.pendingHonors.push({ kind: 'trophy', id: tid });
        const snap = state.seasons.find(s => !s.youth && s.teamId && s.age === nat.age && s.phase === 'summer');
        if (snap) {
          snap.trophies = snap.trophies || [];
          snap.trophies.push(tid);
        }
        state.legacyLines.push(nat.type === 'worlds' ? '你把召唤师杯举过头顶。' : '亚运会金牌挂在了你的脖子上。');
        if (nat.type === 'worlds') state.highlights.push({ age: nat.age, text: `S${nat.year - 2010} 全球总决赛冠军` });
        if (state.player.overall >= 86) {
          state.totals.awards.push('tournament_mvp');
          state.pendingHonors.push({ kind: 'award', id: 'tournament_mvp' });
        }
      } else {
        nat.result = 'semis';
      }
    }
    state.pendingWorldCupUpgrade = null;
  }

  state.currentEvent = null;
  return { state, screen: 'career' };
}

function beginRetirement(state, reason) {
  state.retirementReason = reason;
  if (reason === 'voluntary' && state.player.age <= 30) state.endingBeat = '在最好看的时候转身';
  state.currentEvent = retirementStyleEvent(state, reason);
  return { state, screen: 'event' };
}

// ---------- 结算 ----------
export function maxOverall(state) {
  let m = state.player.overall;
  for (const s of state.seasons) m = Math.max(m, s.overall);
  return m;
}

export function peakSeason(state) {
  let best = null;
  for (const s of state.seasons) {
    if (!best || s.overall > best.overall) best = s;
  }
  return best;
}

export function clubsOf(state) {
  const map = new Map();
  for (const s of state.seasons) {
    if (!s.teamId || s.youth) continue;
    const key = s.teamId;
    if (!map.has(key)) {
      map.set(key, { teamId: key, years: new Set(), seasons: 0, stats: { g: 0, kills: 0, assists: 0, dmg: 0 }, trophies: [], awards: [] });
    }
    const c = map.get(key);
    c.years.add(s.year);
    c.stats.g += s.stats.g;
    c.stats.kills += s.stats.kills;
    c.stats.assists += s.stats.assists;
    c.stats.dmg += s.stats.dmg;
    s.trophies.forEach(x => c.trophies.push(x));
    s.awards.forEach(x => c.awards.push(x));
  }
  const arr = [...map.values()];
  for (const c of arr) {
    c.seasons = c.years.size;
    delete c.years;
  }
  return arr;
}

export function trophyCounts(trophies) {
  const counts = {};
  for (const t of trophies) counts[t] = (counts[t] || 0) + 1;
  return counts;
}

export function trophyZh(id) {
  if (id === 'worlds') return '全球总决赛冠军';
  if (id === 'msi') return 'MSI冠军';
  if (id === 'asian_games') return '亚运会金牌';
  if (id === 'rift_rivals') return '洲际对抗赛冠军';
  if (id === 'allstar') return '全明星冠军';
  if (id.startsWith('league:')) {
    const lg = LEAGUES[id.slice(7)];
    return lg ? lg.champ : '联赛冠军';
  }
  if (id.startsWith('cup:')) {
    const lg = LEAGUES[id.slice(4)];
    return lg && lg.cupName ? lg.cupName : '杯赛冠军';
  }
  return '冠军';
}

export function awardZh(id) {
  const map = {
    allstar: '全明星',
    all_team: '最佳阵容',
    mvp: '常规赛MVP',
    fmvp: '总决赛MVP',
    kill_title: '赛季击杀王',
    cs_title: '赛季补刀王',
    assist_title: '赛季助攻王',
    vision_title: '赛季视野王',
    rookie: '最佳新秀',
    solo_kill_title: '赛季单杀王',
    second_team: '最佳二阵',
    most_improved: '进步最快奖',
    popular: '最受欢迎选手',
    tournament_mvp: '大赛MVP',
    tournament_all_team: '大赛最佳阵容',
    allstar_mvp: '全明星MVP',
    solo_king: 'Solo王',
    msi_mvp: 'MSI MVP',
  };
  return map[id] || id;
}

export function tournamentZh(type) {
  return { worlds: '全球总决赛', msi: '季中冠军赛', asian_games: '亚运会', rift_rivals: '洲际对抗赛', allstar: '全明星' }[type] || type;
}

export function resultZh(result, league, type = 'club') {
  if (type === 'club') {
    const map = {
      champion: '联赛冠军',
      final: '决赛',
      semis: '四强',
      quarters: '八强',
      playoffs: '季后赛',
      missed: '无缘季后赛',
      youth: '青训营',
    };
    return map[result] || result;
  }
  const map = {
    champion: '冠军',
    semis: '四强',
    quarters: '八强',
    group: '小组赛',
    not_qualified: '未出线',
    not_called: '未入选',
  };
  return map[result] || result;
}

function epitaph(state) {
  const peak = maxOverall(state);
  const t = state.totals;
  const lines = [];
  if (t.trophies.includes('worlds')) lines.push('一路打到世界之巅，能拿的都拿到了。');
  else if (peak >= 96) lines.push('天生的妖人胚子，真的打到了 ' + peak + '。');
  else if (peak >= 90 && t.trophies.length === 0) lines.push('强到无可争议，却始终两手空空。');
  else if (clubsOf(state).length === 1 && new Set(state.seasons.filter(s => !s.youth && s.teamId).map(s => s.year)).size >= 8) lines.push('一辈子只穿一件队服。');
  else if (peak >= 85 && state.player.overall <= 72) lines.push('不是每个天才都来得及长大。');
  else if (state.player.age >= 31) lines.push('同龄人都退役了，你还在名单里。');
  else lines.push('从青训到传奇，每个决定都算数。');
  if (state.endingBeat) lines.push(state.endingBeat);
  return lines.join('');
}

export function computeTitles(state) {
  const t = state.totals;
  const peak = maxOverall(state);
  const peakAge = peakSeason(state)?.age ?? 16;
  const clubs = clubsOf(state);
  const proSeasons = state.seasons.filter(s => !s.youth && s.teamId);
  const proYears = new Set(proSeasons.map(s => s.year)).size;
  const won = (id) => t.trophies.includes(id);
  const countAward = (id) => t.awards.filter(a => a === id).length;
  const champCount = t.trophies.filter(x => x.startsWith('league:') || x.startsWith('cup:') || x === 'worlds' || x === 'msi' || x === 'asian_games' || x === 'rift_rivals').length;
  const titles = [];
  const unlocked = (id, quote) => titles.push({ id, quote });

  if (peak >= 96) unlocked('tian_zhijiaozi', `巅峰能力 ${peak}，真·天之骄子。`);
  if (peak >= 93 && (state.player.debutOverall || 99) <= 72) unlocked('yao_ren_dx', `出道 ${state.player.debutOverall}，巅峰 ${peak}。`);
  if (peak >= 88 && (state.player.debutOverall || 99) <= 62 && peakAge >= 28) unlocked('da_qi_wan_cheng', `晚熟型选手，硬是把自己练到了 ${peak}。`);
  if (peak >= 85 && state.player.overall <= 72) unlocked('shang_zhong_yong', `巅峰 ${peak}，退役时只有 ${state.player.overall}。`);
  if (clubs.length === 1 && proYears >= 8) unlocked('yi_ren_yi_cheng', '一生只效力一支战队。');
  if (clubs.length >= 6) unlocked('dian_jing_liu_lang', `效力过 ${clubs.length} 支战队，走到哪都是客场。`);
  if (t.apps >= 1000) unlocked('tie_ren', `生涯出场 ${fmtInt(t.apps)} 局，铁人。`);
  if (t.kills >= 12000) unlocked('ji_sha_ji_qi', `生涯总击杀 ${fmtInt(Math.round(t.kills))}。`);
  if ((state.highlights || []).some(h => String(h.text).includes('五杀'))) unlocked('wu_sha_zhi_wang', '单场五杀，弹幕都疯了。');
  if (peak >= 90 && champCount === 0) unlocked('wu_mian_zhi_wang', `巅峰 ${peak}，却一冠未得。`);
  if (won('worlds')) unlocked('shi_jie_zhi_dian', '世界之巅，你站上去过。');
  if (won('worlds') && countAward('fmvp') >= 1 && peak >= 96) unlocked('dian_jing_zhi_shen', '全球总决赛 + FMVP + 巅峰 96，电竞之神。');
  if (won('worlds') && won('msi') && won('rift_rivals') && champCount >= 2) unlocked('jin_man_guan', '世界赛、MSI、洲际、联赛，全拿过。');
  if (consecutiveTitles(state) >= 3) unlocked('wang_chao_ji', `同一支战队 ${consecutiveTitles(state)} 连冠，王朝。`);
  if (champCount >= 12) unlocked('guan_jun_shou_ge_ji', `生涯 ${champCount} 座奖杯。`);
  if (t.salary >= 200000) unlocked('dian_jing_shou_fu', `生涯总收入 ${fmtMoney(t.salary)}。`);
  if (state.seasons.some(s => s.salary >= 30000)) unlocked('tian_jia_he_tong', `单季年薪 ${fmtMoney(Math.max(...state.seasons.map(s => s.salary)))}。`);
  if (countAward('allstar') >= 10) unlocked('quan_ming_xing_zhi_wang', `${countAward('allstar')} 次全明星。`);
  if (countAward('mvp') >= 4) unlocked('zui_you_jia_zhi', `${countAward('mvp')} 次常规赛MVP。`);
  if (countAward('fmvp') >= 3) unlocked('zong_jue_sai_zhi_wang', `${countAward('fmvp')} 次总决赛MVP。`);
  if (countAward('kill_title') >= 5) unlocked('ji_sha_wang', `${countAward('kill_title')} 次赛季击杀王。`);
  if (countAward('rookie') >= 1) unlocked('xin_ren_wang', '出道即巅峰，最佳新秀。');
  if (countAward('solo_kill_title') >= 3) unlocked('dan_sha_zhi_wang', `${countAward('solo_kill_title')} 次赛季单杀王。`);
  if (countAward('cs_title') >= 5 || t.cs >= 300000) unlocked('bu_dao_wang', '补刀就是命。');
  if (countAward('assist_title') >= 5 || t.assists >= 12000) unlocked('zu_zhi_da_shi', '把队友喂成巨星。');
  if (countAward('vision_title') >= 3) unlocked('shi_ye_da_shi', `${countAward('vision_title')} 次赛季视野王。`);
  if (state.player.age >= 30 && proYears >= 11) unlocked('bu_lao_chuan_shuo', `${state.player.age} 岁还在打，不老传说。`);
  if ((state.retirementReason === 'voluntary' || state.farewell) && state.player.age <= 30 && peak >= 90) unlocked('ji_liu_yong_tui', '在最好看的时候转身。');
  if (state.nationalTeamPeriods.filter(p => p.type === 'asian_games').length >= 3) unlocked('ya_yun_qi_zhi', `为国出战 ${state.nationalTeamPeriods.filter(p => p.type === 'asian_games').length} 届亚运会。`);
  const dreamTeam = state.player.domesticDreamTeamId || state.player.foreignDreamTeamId;
  if (dreamTeam && t.trophies.some(id => id === `league:${TEAMS[dreamTeam].league}`)) unlocked('yuan_meng_ren', '为儿时主队拿过冠军，圆梦。');
  if (state.showdownWins.last_shot > 0) unlocked('jue_sheng_zhi_wang', '最后一波团，交给我。');
  if (state.showdownWins.free_throw >= 2) unlocked('long_du_zhi_wang', '龙坑里，从不手软。');
  const rs = state.rivalSeries || [];
  if (state.rival && rs.length >= 8 && rs.filter(x => x.myChamp).length >= 1 && rs.filter(x => x.rivalChamp).length >= 1) {
    unlocked('yi_sheng_zhi_di', `你和${state.rival.name}斗了一辈子，谁也没服过谁。`);
  }
  if (state.rival && rs.length >= 6) {
    const myKills = rs.reduce((s, x) => s + x.my, 0);
    const hisKills = rs.reduce((s, x) => s + x.rival, 0);
    const myChamp = rs.filter(x => x.myChamp).length;
    const hisChamp = rs.filter(x => x.rivalChamp).length;
    if (myKills >= hisKills * 1.05 && myChamp > hisChamp) {
      unlocked('ya_zhi_su_di', `你压了${state.rival.name}一辈子。`);
    }
  }

  return titles;
}

function consecutiveTitles(state) {
  let best = 0, cur = 0, curTeam = null;
  for (const s of state.seasons) {
    const champ = s.trophies.some(x => x.startsWith('league:'));
    if (champ && s.teamId === curTeam) cur += 1;
    else if (champ) { cur = 1; curTeam = s.teamId; }
    else { cur = 0; curTeam = null; }
    best = Math.max(best, cur);
  }
  return best;
}

export function nationalLine(state) {
  const periods = state.nationalTeamPeriods.filter(p => p.type === 'asian_games');
  if (periods.length === 0) return null;
  const games = periods.reduce((s, p) => s + (p.stats ? p.stats.g : 0), 0);
  const kills = periods.reduce((s, p) => s + (p.stats ? p.stats.kills : 0), 0);
  const assists = periods.reduce((s, p) => s + (p.stats ? p.stats.assists : 0), 0);
  const golds = periods.filter(p => p.result === 'champion').length;
  return { games, kills, assists, golds };
}

export function finalize(state) {
  state.phase = 'summary';
  state.currentEvent = null;
  if (!state.endingBeat) {
    if (state.retirementReason === 'voluntary' && state.player.age <= 30) state.endingBeat = '在最好看的时候转身';
    if (state.player.age >= 31) state.endingBeat = '同龄人都退役了，你还在名单里。';
  }
  return { state, screen: 'summary' };
}

export function buildSummary(state) {
  const peak = maxOverall(state);
  const t = state.totals;
  const nat = nationalLine(state);
  const titles = computeTitles(state);
  const clubs = clubsOf(state);
  const proSeasons = state.seasons.filter(s => !s.youth && s.teamId);
  const yearCount = new Set(proSeasons.map(s => s.year)).size;
  const rs = state.rivalSeries || [];
  const rival = state.rival && rs.length ? {
    name: state.rival.name,
    nationality: state.rival.nationality,
    meme: state.rival.meme,
    peak: state.rival.peak,
    series: rs.length,
    myKills: Math.round(rs.reduce((s, x) => s + x.my, 0)),
    rivalKills: Math.round(rs.reduce((s, x) => s + x.rival, 0)),
    myChamps: rs.filter(x => x.myChamp).length,
    rivalChamps: rs.filter(x => x.rivalChamp).length,
    myMvp: rs.filter(x => x.myMvp).length,
    rivalMvp: rs.filter(x => x.rivalMvp).length,
  } : null;
  return {
    seed: state.seed,
    player: {
      name: state.player.name,
      nationality: state.player.nationality,
      position: state.player.positionZh,
      positionEn: POSITIONS[state.player.position].en,
      potentialRank: state.player.potentialRank,
    },
    maxOverall: peak,
    peakAge: peakSeason(state)?.age ?? 16,
    peakValue: Math.max(...state.seasons.map(s => s.marketValue || 0), state.player.marketValue),
    totalIncome: t.salary,
    totals: {
      apps: t.apps,
      kills: Math.round(t.kills),
      deaths: Math.round(t.deaths),
      assists: Math.round(t.assists),
      cs: Math.round(t.cs),
      dmg: Math.round(t.dmg),
      vis: Math.round(t.vis),
    },
    national: nat ? {
      games: nat.games,
      kills: Math.round(nat.kills),
      assists: Math.round(nat.assists),
      golds: nat.golds,
    } : null,
    titles,
    titleIds: titles.map(x => x.id),
    epitaph: epitaph(state),
    percentile: percentileOf(peak),
    clubs: clubs.map(c => {
      const team = TEAMS[c.teamId];
      return {
        teamId: c.teamId,
        abbr: team.abbr,
        name: team.zh,
        color: team.color,
        isLight: isLight(team.color),
        elite: team.strength >= 85,
        seasons: c.seasons,
        games: c.stats.g,
        kills: Math.round(c.stats.kills),
        assists: Math.round(c.stats.assists),
        dmg: Math.round(c.stats.dmg),
        trophies: c.trophies,
        awards: c.awards,
      };
    }),
    seasonsCount: yearCount,
    legacyLines: state.legacyLines,
    highlights: (state.highlights || []).slice(-14),
    rival,
    farewell: state.farewell,
    goodbye: state.goodbye,
    walkaway: state.walkaway,
    retirementReason: state.retirementReason,
    endingBeat: state.endingBeat,
    savedAt: Date.now(),
  };
}

export function isLight(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 165;
}

export function endingZh(reason) {
  const map = {
    age: '挂靴',
    voluntary: '主动退役',
    no_offers: '无人问津',
    farewell: '告别赛',
    contract: '合同到期',
  };
  return map[reason] || '退役';
}

// ---------- 存档 ----------
export function saveState(state) {
  try {
    localStorage.setItem(`lol-save:${state.seed}`, JSON.stringify(state));
  } catch (e) { /* ignore */ }
}

export function loadState(seed) {
  try {
    const raw = localStorage.getItem(`lol-save:${seed}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

export function clearState(seed) {
  try { localStorage.removeItem(`lol-save:${seed}`); } catch (e) { /* ignore */ }
}

export function saveArchive(summary) {
  try {
    const key = 'lol-archive';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.unshift(summary);
    const dedup = [];
    const seen = new Set();
    for (const it of list) {
      if (!seen.has(it.seed)) { seen.add(it.seed); dedup.push(it); }
    }
    localStorage.setItem(key, JSON.stringify(dedup.slice(0, 50)));
  } catch (e) { /* ignore */ }
}

export function loadArchive() {
  try {
    return JSON.parse(localStorage.getItem('lol-archive') || '[]');
  } catch (e) { return []; }
}

export function galleryState() {
  const archive = loadArchive();
  const unlocked = new Map();
  for (const a of archive) {
    for (const t of (a.titles || [])) {
      if (!unlocked.has(t.id)) unlocked.set(t.id, t.quote);
    }
  }
  return { unlocked, total: TITLES.length };
}
