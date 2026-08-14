// LOL 电竞生涯模拟器 · 无头生涯流程测试
// 用法：node test/sim.js
import * as E from '../js/engine.js';
import * as D from '../js/data.js';

function play(seed, mode, nationality, position, opts = {}) {
  const st = E.newGame({
    seed, mode, name: opts.name || '测试选手', nationality, position,
    hand: '右', number: 1,
    domesticDreamTeamId: opts.domestic || null,
    foreignDreamTeamId: opts.foreign || null,
  });
  let steps = 0;
  const choices = [];
  let maxHonors = 0;
  while (st.phase !== 'summary' && steps < 6000) {
    if (st.currentEvent) {
      const ev = st.currentEvent;
      const opt = ev.options[Math.floor(Math.random() * ev.options.length)];
      choices.push(`${ev.type}:${opt.id}`);
      E.decide(st, opt.id);
    } else {
      E.step(st);
    }
    maxHonors = Math.max(maxHonors, st.pendingHonors?.length || 0);
    steps++;
  }
  const sum = E.buildSummary(st);
  return { st, sum, steps, choices, maxHonors };
}

let fails = 0;
function check(name, cond, detail = '') {
  if (!cond) {
    fails++;
    console.log('FAIL', name, detail);
  } else {
    console.log('ok  ', name);
  }
}

// 1. 确定性：同一编号 + 同一决策序列 → 结果完全一致
{
  const a = play('det-1', 'standard', 'LPL', 'mid');
  const st = E.newGame({ seed: 'det-1', mode: 'standard', name: '测试选手', nationality: 'LPL', position: 'mid', hand: '右', number: 1 });
  let steps = 0;
  let ci = 0;
  while (st.phase !== 'summary' && steps < 6000) {
    if (st.currentEvent) {
      const ev = st.currentEvent;
      const want = a.choices[ci++];
      const opt = ev.options.find(o => `${ev.type}:${o.id}` === want) || ev.options[0];
      E.decide(st, opt.id);
    } else {
      E.step(st);
    }
    steps++;
  }
  const sumB = E.buildSummary(st);
  check('确定性(同 seed 同决策)', JSON.stringify(a.sum.totals) === JSON.stringify(sumB.totals) && a.st.seasons.length === st.seasons.length && a.choices.length === ci);
}

// 2. 全分路/全赛区能跑完
for (const pos of ['top', 'jg', 'mid', 'adc', 'sup']) {
  const r = play(`pos-${pos}`, 'standard', 'LPL', pos);
  check(`分路 ${pos} 正常结算`, r.st.phase === 'summary' && r.sum.seasonsCount > 0, `steps=${r.steps}`);
}
for (const reg of Object.keys(D.REGIONS)) {
  const r = play(`reg-${reg}`, 'quick', reg, 'mid');
  check(`赛区 ${reg} 正常结算`, r.st.phase === 'summary', `steps=${r.steps}`);
}

// 3. 宿敌来自现实选手名单
for (let i = 0; i < 12; i++) {
  const r = play(`rival-${i}`, 'standard', 'LPL', 'mid');
  check(`宿敌 ${r.sum.rival ? r.sum.rival.name : '(无)'} 在名单内`,
    !r.sum.rival || D.LEGENDS.some(l => l.name === r.sum.rival.name));
}

// 4. 称号 id 全部合法
for (let i = 0; i < 8; i++) {
  const r = play(`title-${i}`, 'standard', 'LPL', ['top','mid','adc'][i % 3]);
  for (const t of r.sum.titles) {
    check(`称号 ${t.id} 存在于图鉴`, D.TITLES.some(x => x.id === t.id));
  }
}

// 5. 事件里没有残留的 {legend} 占位符
{
  const seen = new Set();
  let bad = 0;
  for (let i = 0; i < 30; i++) {
    const r = play(`evt-${i}`, 'immersive', 'LPL', 'mid');
    for (const s of r.st.seasons) {
      if (s.youth) continue;
      if (s.highlight && String(s.highlight).includes('{')) bad++;
    }
    for (const l of r.st.legacyLines) if (String(l).includes('{legend}')) bad++;
    for (const l of r.st.highlights) if (String(l.text).includes('{')) bad++;
  }
  check('无 {legend} 残留', bad === 0, `bad=${bad}`);
}

// 6. 存档/读档 roundtrip（模拟 localStorage）
{
  const store = {};
  globalThis.localStorage = {
    getItem: k => store[k] ?? null,
    setItem: (k, v) => { store[k] = v; },
    removeItem: k => { delete store[k]; },
  };
  const r = play('save-1', 'standard', 'LCK', 'sup');
  E.saveState(r.st);
  const loaded = E.loadState('save-1');
  check('存档/读档 roundtrip', !!loaded && loaded.seed === 'save-1' && loaded.seasons.length === r.st.seasons.length);
}

// 7. 年龄规则：15 岁开始，青训三季，18 岁进队，32 岁前必须退役
{
  const r = play('age-1', 'standard', 'LPL', 'mid');
  const youth = r.st.seasons.filter(s => s.youth);
  const pro = r.st.seasons.filter(s => !s.youth && s.teamId);
  check('15 岁开始青训', youth[0]?.age === 15, `first=${youth[0]?.age}`);
  check('青训三季 15/16/17', youth.length === 3 && youth.map(s => s.age).join(',') === '15,16,17', youth.map(s => s.age).join(','));
  check('18 岁进战队', pro[0]?.age === 18, `first pro=${pro[0]?.age}`);
  check('最迟 32 岁退役', r.st.player.age <= 32, `age=${r.st.player.age}`);
}

// 8. 转会发生：随机多局生涯里至少出现换队
{
  let transfers = 0;
  let offerEvents = 0;
  for (let i = 0; i < 6; i++) {
    const r = play(`tfchk-${i}`, 'standard', 'LPL', 'mid');
    transfers += r.st.transfers.length;
    offerEvents += r.st.usedTransferOfferAges.length;
  }
  check('生涯中出现换队', transfers > 0, `transfers=${transfers}`);
  check('转会邀约事件触发', offerEvents > 0, `offers=${offerEvents}`);
}

// 9. 半程制：职业赛季分春季/夏季，赛季数按年计
{
  const r = play('phase-1', 'standard', 'LPL', 'mid');
  const pro = r.st.seasons.filter(s => !s.youth && s.teamId);
  const phases = pro.map(s => s.phase);
  check('首段为春季赛', phases[0] === 'spring', phases[0]);
  check('春夏季交替', phases.every((p, i) => p === (i % 2 === 0 ? 'spring' : 'summer')), phases.join(','));
  check('赛季数按年份计', r.sum.seasonsCount === new Set(pro.map(s => s.year)).size, `count=${r.sum.seasonsCount}`);
  const hasSpringMSI = r.st.seasons.some(s => s.phase === 'spring' && (s.tournaments || []).some(t => t.type === 'msi'));
  const hasSummerWorlds = r.st.seasons.some(s => s.phase === 'summer' && (s.tournaments || []).some(t => t.type === 'worlds'));
  check('春季赛有 MSI 节点', hasSpringMSI);
  check('夏季赛有世界赛节点', hasSummerWorlds);
}

// 10. 分路合理化：中单不抢龙；转会可留队；合同到期按表现续约
{
  const r = play('role-1', 'standard', 'LPL', 'mid');
  check('中单不触发抢龙', r.st.showdownWins.free_throw === 0, `free_throw=${r.st.showdownWins.free_throw}`);

  const st = E.newGame({ seed: 'stay-1', mode: 'standard', name: '测试选手', nationality: 'LPL', position: 'mid', hand: '右', number: 1 });
  let guard = 0;
  while (st.stage !== 'sign' && guard++ < 30) {
    if (st.currentEvent) E.decide(st, st.currentEvent.options[0].id);
    else E.step(st);
  }
  E.decide(st, st.currentEvent.options[0].id); // 签约
  const tfEv = E.transferChooseEvent(st);
  check('转会邀约含留队选项', tfEv.options.some(o => o.id === 'stay'));
  st.currentEvent = tfEv;
  E.decide(st, 'stay');
  check('选择留队不换队', st.transfers.length === 0 && st.currentTeamId === st.contractTeamId, `transfers=${st.transfers.length}`);

  // 表现好 → 合同到期俱乐部主动续约
  st.player.overall = 92;
  st.contractYears = 0;
  E.step(st); // 春季赛
  check('合同到期触发续约谈判', st.currentEvent && st.currentEvent.type === 'contract_renewal', st.currentEvent?.type);
  const renewOpt = st.currentEvent.options.find(o => o.id === 'renew');
  check('表现好有续约选项', !!renewOpt);
  E.decide(st, renewOpt.id);
  check('续约后合同年数重置', st.contractYears > 0, `years=${st.contractYears}`);

  // 表现差 → 俱乐部不续约，只能找下家/替补/退役
  const st2 = E.newGame({ seed: 'bad-1', mode: 'standard', name: '测试选手', nationality: 'LPL', position: 'mid', hand: '右', number: 1 });
  guard = 0;
  while (st2.stage !== 'sign' && guard++ < 30) {
    if (st2.currentEvent) E.decide(st2, st2.currentEvent.options[0].id);
    else E.step(st2);
  }
  E.decide(st2, st2.currentEvent.options[0].id);
  st2.player.overall = 58;
  st2.contractYears = 0;
  E.step(st2); // 春季赛
  check('表现差不续约', st2.currentEvent && st2.currentEvent.type === 'contract_renewal' && !st2.currentEvent.options.some(o => o.id === 'renew'), st2.currentEvent?.title);
}

// 11. 选队影响：不同队伍有不同的定位与加成
{
  const st = E.newGame({ seed: 'team-1', mode: 'standard', name: '测试选手', nationality: 'LPL', position: 'mid', hand: '右', number: 1 });
  let guard = 0;
  while (st.stage !== 'sign' && guard++ < 30) {
    if (st.currentEvent) E.decide(st, st.currentEvent.options[0].id);
    else E.step(st);
  }
  const signEv = st.currentEvent;
  check('签约选项显示预计定位', signEv.options.some(o => String(o.hint).includes('预计')));
  const weak = [...signEv.options].sort((a, b) => D.TEAMS[a.teamId].strength - D.TEAMS[b.teamId].strength)[0];
  E.decide(st, weak.id);
  check('平民队给成长加成', st.teamBonus.growth > 1, `growth=${st.teamBonus.growth}`);
  const pvStrong = E.teamPreview(st, D.TEAMS.t1);
  check('豪门给夺冠与薪资加成', pvStrong.bonus.trophy > 1 && pvStrong.bonus.salary > 1);
  const pvWeak = E.teamPreview(st, D.TEAMS.lgd);
  check('平民队给成长与核心加成', pvWeak.bonus.growth > 1 && pvWeak.bonus.roleShift > 0);
}

// 12. 点“看看报价”直接进报价界面，不回执串场
{
  const st = E.newGame({ seed: 'hear-1', mode: 'standard', name: '测试选手', nationality: 'LPL', position: 'mid', hand: '右', number: 1 });
  let guard = 0;
  while (st.stage !== 'sign' && guard++ < 30) {
    if (st.currentEvent) E.decide(st, st.currentEvent.options[0].id);
    else E.step(st);
  }
  E.decide(st, st.currentEvent.options[0].id);
  st.player.overall = 92;
  st.contractYears = 0;
  E.step(st); // 春季赛 → 续约谈判
  const hear = st.currentEvent.options.find(o => o.id === 'hear');
  check('表现好有「看看报价」选项', !!hear);
  const res = E.decide(st, 'hear');
  check('点报价直接进报价界面', res.skipReceipt === true && res.state.currentEvent && res.state.currentEvent.type === 'transfer_choose', res.state.currentEvent?.type);
  check('报价界面含留队选项', res.state.currentEvent.options.some(o => o.id === 'stay'));
}

// 13. 荣誉提醒队列：生涯中会产生奖杯/荣誉提醒
{
  let anyHonor = 0;
  for (let i = 0; i < 6; i++) {
    const r = play(`honor-${i}`, 'standard', 'LPL', 'mid');
    anyHonor += r.maxHonors;
  }
  check('荣誉提醒队列有产出', anyHonor > 0, `total=${anyHonor}`);
}

// 14. 奖杯归属：所有奖杯（含世界赛/MSI）都能归到效力过的战队
{
  let ok = true, detail = '';
  for (let i = 0; i < 10; i++) {
    const r = play(`club-${i}`, 'standard', 'LPL', 'mid');
    const clubTrophies = r.st.seasons.flatMap(s => s.trophies || []);
    const missing = r.st.totals.trophies.filter(id => !clubTrophies.includes(id));
    if (missing.length) {
      ok = false;
      detail = `missing=${missing.join(',')} total=${r.st.totals.trophies.length} club=${clubTrophies.length}`;
      break;
    }
  }
  check('所有奖杯都归属到战队', ok, detail);
}

// 15. 成长方差：有人一飞冲天，也有人碌碌无为
{
  const peaks = [];
  const lows = [];
  for (let i = 0; i < 40; i++) {
    const r = play(`var-${i}`, 'standard', 'LPL', 'mid');
    peaks.push(r.sum.maxOverall);
    if (r.sum.maxOverall < 76) lows.push(r.st.player.potentialRank);
  }
  const minP = Math.min(...peaks);
  const maxP = Math.max(...peaks);
  console.log('   巅峰分布: ' + minP + ' ~ ' + maxP + ' (庸才潜力档: ' + lows.join(',') + ')');
  check('存在碌碌无为(巅峰<76)', minP < 76, `min=${minP}`);
  check('存在一飞冲天(巅峰>91)', maxP > 91, `max=${maxP}`);
}

console.log(fails === 0 ? '\n全部通过' : `\n${fails} 项失败`);
process.exit(fails === 0 ? 0 : 1);
