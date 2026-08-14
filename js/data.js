// ================= LOL 电竞生涯模拟器 · 数据层 =================

export const APP_TITLE = 'LOL 电竞生涯模拟器';
export const TAGLINE = '从青训到传奇，峡谷里的每个决定都算数';

export const MODES = {
  quick:      { label: '速通', periodLength: 3, hint: '每三个赛季一次决策，十分钟一生' },
  standard:   { label: '标准', periodLength: 2, hint: '每两个赛季一次决策，推荐', recommended: true },
  immersive:  { label: '沉浸', periodLength: 1, hint: '每个赛季一次决策，最完整的一生' },
};

// 分路：weight 决定各项数据权重
export const POSITIONS = {
  top: { zh: '上单', en: 'TOP', weight: { kills: 0.95, deaths: 1.0, assists: 0.6, cs: 1.0, dmg: 1.0, vis: 0.5 }, hint: '对线单杀，团战切后排' },
  jg:  { zh: '打野', en: 'JGL', weight: { kills: 0.9, deaths: 1.05, assists: 1.15, cs: 0.55, dmg: 0.8, vis: 1.05 }, hint: '节奏发动机，游走与视野权重高' },
  mid: { zh: '中单', en: 'MID', weight: { kills: 1.15, deaths: 1.0, assists: 0.9, cs: 1.0, dmg: 1.25, vis: 0.7 }, hint: '线权与游走，伤害权重最高' },
  adc: { zh: '射手', en: 'ADC', weight: { kills: 1.25, deaths: 1.15, assists: 0.8, cs: 1.2, dmg: 1.3, vis: 0.45 }, hint: '后期大核，击杀与伤害权重最高' },
  sup: { zh: '辅助', en: 'SUP', weight: { kills: 0.45, deaths: 1.15, assists: 1.4, cs: 0.3, dmg: 0.45, vis: 1.4 }, hint: '团队大脑，助攻与视野权重最高' },
};

// 赛区：tier 1 顶级 / 2 中上 / 3 外卡；major 为主赛区（中/韩/北美）
export const REGIONS = {
  LPL: { zh: 'LPL·中国', continent: 'asia', tier: 1, qualify: 0.98, league: 'lpl', surnames: ['张','王','李','刘','陈','杨','赵','周','吴','徐','孙','胡'], flag: '🇨🇳', major: true },
  LCK: { zh: 'LCK·韩国', continent: 'asia', tier: 1, qualify: 0.99, league: 'lck', surnames: ['金','李','朴','崔','郑','姜','赵','权','韩','申'], flag: '🇰🇷', major: true },
  LCS: { zh: 'LCS·北美', continent: 'americas', tier: 1, qualify: 0.90, league: 'lcs', surnames: ['约翰逊','威廉姆斯','布朗','琼斯','戴维斯'], flag: '🇺🇸', major: true },
  LEC: { zh: 'LEC·欧洲', continent: 'europe', tier: 1, qualify: 0.92, league: 'lec', surnames: ['穆勒','施密特','加西亚','杜邦','约翰逊'], flag: '🇪🇺' },
  PCS: { zh: 'PCS·东南亚', continent: 'asia', tier: 2, qualify: 0.72, league: 'pcs', surnames: ['陈','林','黄','张','李'], flag: '🇹🇼' },
  VCS: { zh: 'VCS·越南', continent: 'asia', tier: 2, qualify: 0.70, league: 'vcs', surnames: ['阮','黎','范','陈','黄'], flag: '🇻🇳' },
  CBLOL: { zh: 'CBLOL·巴西', continent: 'americas', tier: 2, qualify: 0.74, league: 'cblol', surnames: ['席尔瓦','桑托斯','奥利维拉','佩雷拉','科斯塔'], flag: '🇧🇷' },
  LJL: { zh: 'LJL·日本', continent: 'asia', tier: 2, qualify: 0.68, league: 'ljl', surnames: ['佐藤','铃木','高桥','田中','渡边'], flag: '🇯🇵' },
  LLA: { zh: 'LLA·拉美', continent: 'americas', tier: 3, qualify: 0.58, league: 'lla', surnames: ['冈萨雷斯','罗德里格斯','迪亚斯','洛佩斯','马丁内斯'], flag: '🇲🇽' },
  LCO: { zh: 'LCO·大洋洲', continent: 'oceania', tier: 3, qualify: 0.56, league: 'lco', surnames: ['安德森','史密斯','格林','米切尔','威尔逊'], flag: '🇦🇺' },
  TCL: { zh: 'TCL·土耳其', continent: 'europe', tier: 3, qualify: 0.54, league: 'tcl', surnames: ['耶尔马兹','德米尔','阿卡','切利克'], flag: '🇹🇷' },
  LCL: { zh: 'LCL·独联体', continent: 'europe', tier: 3, qualify: 0.50, league: 'lcl', surnames: ['伊万诺夫','彼得罗夫','斯米尔诺夫','索科洛夫'], flag: '🇷🇺' },
};

// 联赛：tier 1 最强
export const LEAGUES = {
  lpl:  { zh: 'LPL', country: 'LPL', tier: 1, games: 80, champ: 'LPL冠军', cup: 'demacia', cupName: '德玛西亚杯' },
  lck:  { zh: 'LCK', country: 'LCK', tier: 1, games: 80, champ: 'LCK冠军', cup: 'korea', cupName: '韩国杯' },
  lec:  { zh: 'LEC', country: 'LEC', tier: 1, games: 72, champ: 'LEC冠军', cup: 'eu_masters', cupName: '欧洲大师杯' },
  lcs:  { zh: 'LCS', country: 'LCS', tier: 1, games: 72, champ: 'LCS冠军', cup: 'lock_in', cupName: '北美季前赛' },
  pcs:  { zh: 'PCS', country: 'PCS', tier: 2, games: 60, champ: 'PCS冠军', cup: 'pacific', cupName: '太平洋杯' },
  vcs:  { zh: 'VCS', country: 'VCS', tier: 2, games: 60, champ: 'VCS冠军', cup: 'vietnam', cupName: '越南杯' },
  cblol:{ zh: 'CBLOL', country: 'CBLOL', tier: 2, games: 56, champ: 'CBLOL冠军', cup: 'brasil', cupName: '巴西杯' },
  ljl:  { zh: 'LJL', country: 'LJL', tier: 2, games: 54, champ: 'LJL冠军', cup: 'ljl', cupName: '日本杯' },
  lla:  { zh: 'LLA', country: 'LLA', tier: 3, games: 48, champ: 'LLA冠军', cup: 'latin', cupName: '拉美杯' },
  lco:  { zh: 'LCO', country: 'LCO', tier: 3, games: 46, champ: 'LCO冠军', cup: 'oceania', cupName: '大洋洲杯' },
  tcl:  { zh: 'TCL', country: 'TCL', tier: 3, games: 46, champ: 'TCL冠军', cup: 'turkey', cupName: '土耳其杯' },
  lcl:  { zh: 'LCL', country: 'LCL', tier: 3, games: 44, champ: 'LCL冠军', cup: 'cis', cupName: '独联体杯' },
};

// 战队：strength 60-95，color 主色，abbr 缩写
export const TEAMS = {
  // LPL
  jdg: { zh: '京东JDG', abbr: 'JDG', color: '#D22630', league: 'lpl', strength: 90 },
  blg: { zh: '哔哩哔哩BLG', abbr: 'BLG', color: '#1B6DF9', league: 'lpl', strength: 89 },
  ig:  { zh: '仁川iG', abbr: 'iG', color: '#1F8DCD', league: 'lpl', strength: 88 },
  edg: { zh: 'EDG', abbr: 'EDG', color: '#C8102E', league: 'lpl', strength: 88 },
  rng: { zh: '皇族RNG', abbr: 'RNG', color: '#E8B339', league: 'lpl', strength: 87 },
  tes: { zh: '滔搏TES', abbr: 'TES', color: '#0E67B8', league: 'lpl', strength: 87 },
  fpx: { zh: '凤凰FPX', abbr: 'FPX', color: '#C1272D', league: 'lpl', strength: 86 },
  wbg: { zh: '微博WBG', abbr: 'WBG', color: '#6C4DF6', league: 'lpl', strength: 86 },
  lng: { zh: '李宁LNG', abbr: 'LNG', color: '#0B8BCA', league: 'lpl', strength: 85 },
  we:  { zh: 'WE', abbr: 'WE', color: '#B01E23', league: 'lpl', strength: 80 },
  al:  { zh: 'AL', abbr: 'AL', color: '#E8833A', league: 'lpl', strength: 79 },
  omg: { zh: '黑暗势力OMG', abbr: 'OMG', color: '#6B4E9E', league: 'lpl', strength: 78 },
  nip: { zh: 'NIP', abbr: 'NIP', color: '#00A3A1', league: 'lpl', strength: 77 },
  tt:  { zh: 'TT', abbr: 'TT', color: '#F5A623', league: 'lpl', strength: 76 },
  lgd: { zh: '老干爹LGD', abbr: 'LGD', color: '#D40000', league: 'lpl', strength: 75 },
  // LCK
  t1:  { zh: 'T1', abbr: 'T1', color: '#E2012D', league: 'lck', strength: 93 },
  gen: { zh: 'Gen.G', abbr: 'GEN', color: '#C9A063', league: 'lck', strength: 90 },
  hle: { zh: '韩华HLE', abbr: 'HLE', color: '#ED6E00', league: 'lck', strength: 88 },
  dk:  { zh: 'DK', abbr: 'DK', color: '#1FA7E0', league: 'lck', strength: 86 },
  kt:  { zh: 'KT', abbr: 'KT', color: '#E6492D', league: 'lck', strength: 83 },
  drx: { zh: 'DRX', abbr: 'DRX', color: '#8E3AA1', league: 'lck', strength: 82 },
  kdf: { zh: 'KDF', abbr: 'KDF', color: '#1B6B3A', league: 'lck', strength: 80 },
  ns:  { zh: 'NS', abbr: 'NS', color: '#4185C9', league: 'lck', strength: 79 },
  bro: { zh: 'BRION', abbr: 'BRO', color: '#2FA69A', league: 'lck', strength: 78 },
  fox: { zh: 'FearX', abbr: 'FOX', color: '#D9A600', league: 'lck', strength: 77 },
  // LEC
  g2:  { zh: 'G2', abbr: 'G2', color: '#C1272D', league: 'lec', strength: 88 },
  fnc: { zh: 'Fnatic', abbr: 'FNC', color: '#FF5900', league: 'lec', strength: 87 },
  mad: { zh: 'MAD', abbr: 'MAD', color: '#FFE100', league: 'lec', strength: 84 },
  koi: { zh: 'KOI', abbr: 'KOI', color: '#FF6A00', league: 'lec', strength: 82 },
  bds: { zh: 'BDS', abbr: 'BDS', color: '#FFD400', league: 'lec', strength: 81 },
  vit: { zh: 'Vitality', abbr: 'VIT', color: '#FABE00', league: 'lec', strength: 80 },
  sk:  { zh: 'SK', abbr: 'SK', color: '#1B2A4A', league: 'lec', strength: 78 },
  th:  { zh: 'Heretics', abbr: 'TH', color: '#1A1A1A', league: 'lec', strength: 77 },
  // LCS
  tl:  { zh: 'Team Liquid', abbr: 'TL', color: '#009FDF', league: 'lcs', strength: 86 },
  c9:  { zh: 'Cloud9', abbr: 'C9', color: '#00A0DF', league: 'lcs', strength: 84 },
  '100t': { zh: '100 Thieves', abbr: '100T', color: '#B4975A', league: 'lcs', strength: 82 },
  fly: { zh: 'FlyQuest', abbr: 'FLY', color: '#7A1F1F', league: 'lcs', strength: 81 },
  nrg: { zh: 'NRG', abbr: 'NRG', color: '#C8102E', league: 'lcs', strength: 79 },
  dig: { zh: 'Dignitas', abbr: 'DIG', color: '#E6BE8A', league: 'lcs', strength: 77 },
  // PCS
  psg: { zh: 'PSG Talon', abbr: 'PSG', color: '#C8B79A', league: 'pcs', strength: 82 },
  cfo: { zh: '中信飞牡蛎', abbr: 'CFO', color: '#FDB913', league: 'pcs', strength: 79 },
  jt:  { zh: 'J Team', abbr: 'JT', color: '#FFD100', league: 'pcs', strength: 77 },
  fw:  { zh: '闪电狼FW', abbr: 'FW', color: '#B4975A', league: 'pcs', strength: 76 },
  // VCS
  gam: { zh: 'GAM', abbr: 'GAM', color: '#D22630', league: 'vcs', strength: 81 },
  te:  { zh: 'Team Whales', abbr: 'TWH', color: '#00A0DF', league: 'vcs', strength: 78 },
  tw:  { zh: 'TW', abbr: 'TW', color: '#F5A623', league: 'vcs', strength: 76 },
  mb:  { zh: 'MEGA', abbr: 'MEG', color: '#00843D', league: 'vcs', strength: 74 },
  // CBLOL
  loud:{ zh: 'LOUD', abbr: 'LLL', color: '#F5A623', league: 'cblol', strength: 80 },
  png: { zh: 'paiN Gaming', abbr: 'PNG', color: '#E30613', league: 'cblol', strength: 78 },
  red: { zh: 'RED Canids', abbr: 'RED', color: '#D40000', league: 'cblol', strength: 76 },
  fur: { zh: 'FURIA', abbr: 'FUR', color: '#7C3AED', league: 'cblol', strength: 74 },
  // LJL
  dfm: { zh: 'DetonatioN FM', abbr: 'DFM', color: '#C8102E', league: 'ljl', strength: 80 },
  sg:  { zh: 'Sengoku', abbr: 'SG', color: '#00A0DF', league: 'ljl', strength: 77 },
  shg: { zh: 'SoftBank HAWKS', abbr: 'SHG', color: '#FFD700', league: 'ljl', strength: 75 },
  bc:  { zh: 'Burning Core', abbr: 'BC', color: '#7C3AED', league: 'ljl', strength: 73 },
  // LLA
  inf: { zh: 'Infinity', abbr: 'INF', color: '#E30613', league: 'lla', strength: 78 },
  est: { zh: 'Estral', abbr: 'EST', color: '#1B2A4A', league: 'lla', strength: 76 },
  r7:  { zh: 'Rainbow7', abbr: 'R7', color: '#00A0DF', league: 'lla', strength: 74 },
  aze: { zh: 'AZE', abbr: 'AZE', color: '#C8102E', league: 'lla', strength: 72 },
  // LCO
  pce: { zh: 'Pentanet.GG', abbr: 'PGG', color: '#C8102E', league: 'lco', strength: 76 },
  tb:  { zh: 'Team Bliss', abbr: 'TB', color: '#1B3C6E', league: 'lco', strength: 74 },
  mmm: { zh: 'Mammoth', abbr: 'MMM', color: '#00A0DF', league: 'lco', strength: 72 },
  // TCL
  iw:  { zh: 'İstanbul Wildcats', abbr: 'IW', color: '#D40000', league: 'tcl', strength: 75 },
  bjk: { zh: 'Besiktas', abbr: 'BJK', color: '#000000', league: 'tcl', strength: 73 },
  fb:  { zh: 'Fenerbahçe', abbr: 'FB', color: '#009E60', league: 'tcl', strength: 72 },
  pp:  { zh: 'Papara SuperMassive', abbr: 'SUP', color: '#C8102E', league: 'tcl', strength: 70 },
  // LCL
  uol: { zh: 'Unicorns of Love', abbr: 'UOL', color: '#7C3AED', league: 'lcl', strength: 75 },
  veg: { zh: 'Vega Squadron', abbr: 'VEG', color: '#00A0DF', league: 'lcl', strength: 73 },
  cc:  { zh: 'CrowCrowd', abbr: 'CC', color: '#C8102E', league: 'lcl', strength: 71 },
};

// 为数据对象补齐 id 字段（Object.values 遍历时需要）
for (const [id, team] of Object.entries(TEAMS)) team.id = id;
for (const [code, region] of Object.entries(REGIONS)) region.code = code;
for (const [id, league] of Object.entries(LEAGUES)) league.id = id;

// 现实选手图鉴：宿敌和事件会随机引用（尽量按 2025-2026 最新阵容）
export const LEGENDS = [
  // 上单
  { id: 'theshy', name: 'TheShy', zh: '姜承録', pos: 'top', region: 'LPL', meme: '天神下凡，河道剑魔，也是「送姜」本姜' },
  { id: 'bin', name: 'Bin', zh: '陈泽彬', pos: 'top', region: 'LPL', meme: 'BLG 全华班招牌，一打五，陀螺成精' },
  { id: '369', name: '369', zh: '白家浩', pos: 'top', region: 'LPL', meme: '骰子哥，摇到 9 才是 369' },
  { id: 'zeus', name: 'Zeus', zh: '崔祐齐', pos: 'top', region: 'LCK', meme: 'HLE 冠军上单，研发 i6 的冰鸟绝活哥' },
  { id: 'doran', name: 'Doran', zh: '崔玄準', pos: 'top', region: 'LCK', meme: 'T1 新上单，一打 Zeus 就来劲' },
  { id: 'nuguri', name: 'Nuguri', zh: '张夏权', pos: 'top', region: 'LCK', meme: '牛宝，刀妹绝活' },
  { id: 'marin', name: 'Marin', zh: '张庆欢', pos: 'top', region: 'LCK', meme: '马润，S5 世界第一上单' },
  { id: 'duke', name: 'Duke', zh: '李浩成', pos: 'top', region: 'LCK', meme: '锦鲤本鲤' },
  { id: 'flandre', name: 'Flandre', zh: '李炫君', pos: 'top', region: 'LPL', meme: '圣枪哥，S11 冠军上单' },
  { id: 'zoom', name: 'Zoom', zh: '张星冉', pos: 'top', region: 'LPL', meme: '公爵' },
  { id: 'letme', name: 'LetMe', zh: '严君泽', pos: 'top', region: 'LPL', meme: '众生平等' },
  { id: 'godlike', name: 'GodLike', zh: '肖旺', pos: 'top', region: 'LPL', meme: '神超' },
  { id: 'pdd', name: 'PDD', zh: '刘谋', pos: 'top', region: 'LPL', meme: '一炮四个 PDD' },
  { id: 'kingen', name: 'Kingen', zh: '金根', pos: 'top', region: 'LCK', meme: '剑魔绝活哥，NS 上单' },
  { id: 'kiin', name: 'Kiin', zh: '金基仁', pos: 'top', region: 'LCK', meme: 'GEN 万金油上单' },
  { id: 'khan', name: 'Khan', zh: '金东河', pos: 'top', region: 'LCK', meme: '可汗' },
  { id: 'impact', name: 'Impact', zh: '郑恩星', pos: 'top', region: 'LCS', meme: '北美冠军上单' },
  { id: 'evi', name: 'Evi', zh: '木村悠', pos: 'top', region: 'LJL', meme: '日本上单之光' },
  { id: 'siwoo', name: 'Siwoo', zh: '—', pos: 'top', region: 'LCK', meme: 'DK 新上单，潜力新人' },
  { id: 'zika', name: 'Zika', zh: '唐华钰', pos: 'top', region: 'LPL', meme: 'WBG 上单，薇恩绝活' },
  { id: 'sheer', name: 'sheer', zh: '徐文杰', pos: 'top', region: 'LPL', meme: 'LNG 上单，小天才' },
  { id: 'xiaoxu', name: 'Xiaoxu', zh: '徐兴祖', pos: 'top', region: 'LPL', meme: 'JDG 上单' },
  { id: 'xiaohu', name: 'Xiaohu', zh: '李元浩', pos: 'top', region: 'LPL', meme: '春之虎帝，2026 转上单' },
  // 打野
  { id: 'clearlove', name: 'Clearlove', zh: '明凯', pos: 'jg', region: 'LPL', meme: '4396，你的野区我养猪，EDG 名宿' },
  { id: 'ning', name: 'Ning', zh: '高振宁', pos: 'jg', region: 'LPL', meme: '宁王，仁川 FMVP' },
  { id: 'tian', name: 'Tian', zh: '高天亮', pos: 'jg', region: 'LPL', meme: '天，S9 克格莫' },
  { id: 'jiejie', name: 'Jiejie', zh: '赵礼杰', pos: 'jg', region: 'LPL', meme: '嘉文五世，WBG 打野' },
  { id: 'kanavi', name: 'Kanavi', zh: '徐进赫', pos: 'jg', region: 'LCK', meme: '野核之王，HLE 新打野' },
  { id: 'karsa', name: 'Karsa', zh: '洪浩轩', pos: 'jg', region: 'LPL', meme: '雷达哥，披萨' },
  { id: 'mlxg', name: 'MLXG', zh: '刘世宇', pos: 'jg', region: 'LPL', meme: '绝食流打野' },
  { id: 'sofm', name: 'SofM', zh: '黎光维', pos: 'jg', region: 'VCS', meme: '越南首富，野区发明家' },
  { id: 'canyon', name: 'Canyon', zh: '金建敷', pos: 'jg', region: 'LCK', meme: 'GEN 野区天花板' },
  { id: 'oner', name: 'Oner', zh: '文炫竣', pos: 'jg', region: 'LCK', meme: 'O神，T1 元老打野' },
  { id: 'painter', name: 'Painter', zh: '—', pos: 'jg', region: 'LCK', meme: 'T1 新打野，年轻小将' },
  { id: 'bengi', name: 'Bengi', zh: '裴性雄', pos: 'jg', region: 'LCK', meme: '笨鸡，大魔王的守护者' },
  { id: 'peanut', name: 'Peanut', zh: '韩旺乎', pos: 'jg', region: 'LCK', meme: '小花生' },
  { id: 'ambition', name: 'Ambition', zh: '姜灿荣', pos: 'jg', region: 'LCK', meme: '安掌门，弑神者' },
  { id: 'score', name: 'Score', zh: '高东彬', pos: 'jg', region: 'LCK', meme: '队长，二段笑' },
  { id: 'wei', name: 'Wei', zh: '闫扬威', pos: 'jg', region: 'LPL', meme: '涅槃' },
  { id: 'xun', name: 'Xun', zh: '邓杰', pos: 'jg', region: 'LPL', meme: 'BLG 打野，小天才' },
  { id: 'tarzan', name: 'Tarzan', zh: '李承勇', pos: 'jg', region: 'LPL', meme: '泰山' },
  { id: 'jankos', name: 'Jankos', zh: '马尔钦·扬科夫斯基', pos: 'jg', region: 'LEC', meme: '波兰野王' },
  { id: 'lucid', name: 'Lucid', zh: '崔勇赫', pos: 'jg', region: 'LCK', meme: 'DK 打野，新生代野王' },
  { id: 'cuzz', name: 'Cuzz', zh: '文友赞', pos: 'jg', region: 'LCK', meme: 'KT 打野，老将' },
  { id: 'sponge', name: 'Sponge', zh: '—', pos: 'jg', region: 'LCK', meme: 'NS 打野' },
  { id: 'junjia', name: 'JunJia', zh: '余峻嘉', pos: 'jg', region: 'LPL', meme: 'JDG 打野，雷达哥传人' },
  // 中单
  { id: 'faker', name: 'Faker', zh: '李相赫', pos: 'mid', region: 'LCK', meme: '六冠王，T1 三连冠，大飞老师本飞' },
  { id: 'rookie', name: 'Rookie', zh: '宋义进', pos: 'mid', region: 'LPL', meme: '鸡真主，仁川人' },
  { id: 'doinb', name: 'Doinb', zh: '金泰相', pos: 'mid', region: 'LPL', meme: '克烈国王，毒硬币' },
  { id: 'knight', name: 'Knight', zh: '卓定', pos: 'mid', region: 'LPL', meme: '黄金左手，定海神针手队' },
  { id: 'scout', name: 'Scout', zh: '李汭燦', pos: 'mid', region: 'LPL', meme: '小学弟，S11 FMVP' },
  { id: 'showmaker', name: 'ShowMaker', zh: '许秀', pos: 'mid', region: 'LCK', meme: '荣光哥，DK 中路' },
  { id: 'chovy', name: 'Chovy', zh: '郑志勋', pos: 'mid', region: 'LCK', meme: '补一中，GEN 大核，MSI 二连冠' },
  { id: 'caps', name: 'Caps', zh: '拉斯穆斯·温特', pos: 'mid', region: 'LEC', meme: '欧洲法王' },
  { id: 'perkz', name: 'Perkz', zh: '卢卡·佩尔科维奇', pos: 'mid', region: 'LEC', meme: '阿P，快乐电竞' },
  { id: 'godv', name: 'GodV', zh: '韦朕', pos: 'mid', region: 'LPL', meme: '反向Q，乐观家族族长' },
  { id: 'zzitai', name: 'Zzitai', zh: '刘志豪', pos: 'mid', region: 'LPL', meme: '姿态，京城贵妇' },
  { id: 'misaya', name: 'Misaya', zh: '禹景曦', pos: 'mid', region: 'LPL', meme: '若风，落地金身' },
  { id: 'pawn', name: 'PawN', zh: '许元硕', pos: 'mid', region: 'LCK', meme: '胖将军，地火' },
  { id: 'cryin', name: 'Cryin', zh: '袁成伟', pos: 'mid', region: 'LPL', meme: '果子哥' },
  { id: 'icon', name: 'icon', zh: '谢天宇', pos: 'mid', region: 'LPL', meme: '冷少' },
  { id: 'yagao', name: 'Yagao', zh: '曾奇', pos: 'mid', region: 'LPL', meme: '膏子哥' },
  { id: 'maple', name: 'Maple', zh: '黄熠棠', pos: 'mid', region: 'PCS', meme: '妈宝' },
  { id: 'fofo', name: 'Fofo', zh: '朱骏岚', pos: 'mid', region: 'PCS', meme: '沙皇人柱力' },
  { id: 'bjergsen', name: 'Bjergsen', zh: '索伦·比约格', pos: 'mid', region: 'LCS', meme: '丹麦比尔森' },
  { id: 'zeka', name: 'Zeka', zh: '金建佑', pos: 'mid', region: 'LCK', meme: 'HLE 中单，阿卡丽人柱力' },
  { id: 'bdd', name: 'Bdd', zh: '郭普成', pos: 'mid', region: 'LCK', meme: 'KT 中单，老牌法王' },
  { id: 'hongq', name: 'HongQ', zh: '蔡明宏', pos: 'mid', region: 'LPL', meme: 'JDG 新中单' },
  { id: 'nia', name: 'Nia', zh: '邹广禄', pos: 'mid', region: 'LPL', meme: 'LNG 中单' },
  // 射手
  { id: 'uzi', name: 'Uzi', zh: '简自豪', pos: 'adc', region: 'LPL', meme: '永远滴神，狂小狗' },
  { id: 'jackeylove', name: 'JackeyLove', zh: '喻文波', pos: 'adc', region: 'LPL', meme: '赌上职业生涯的闪现，暴毙王本王' },
  { id: 'deft', name: 'Deft', zh: '金赫奎', pos: 'adc', region: 'LCK', meme: '羊驼，最后一舞' },
  { id: 'viper', name: 'Viper', zh: '朴到贤', pos: 'adc', region: 'LPL', meme: '通天代，BLG 全华班新AD' },
  { id: 'ruler', name: 'Ruler', zh: '朴载赫', pos: 'adc', region: 'LCK', meme: '尺帝，跨赛区 MSI 双冠王' },
  { id: 'gala', name: 'GALA', zh: '陈伟', pos: 'adc', region: 'LPL', meme: '卡莎代言人，JDG 大C' },
  { id: 'elk', name: 'Elk', zh: '赵嘉豪', pos: 'adc', region: 'LPL', meme: 'WBG 大C，亚运会冠军AD' },
  { id: 'lwx', name: 'Lwx', zh: '林炜翔', pos: 'adc', region: 'LPL', meme: '大聪明，翔掌门' },
  { id: 'iboy', name: 'iboy', zh: '胡显昭', pos: 'adc', region: 'LPL', meme: '鱼男' },
  { id: 'smlz', name: 'Smlz', zh: '韩金', pos: 'adc', region: 'LPL', meme: '司马老贼，面瘫' },
  { id: 'mystic', name: 'Mystic', zh: '陈圣俊', pos: 'adc', region: 'LPL', meme: '大舅子' },
  { id: 'imp', name: 'Imp', zh: '具晟彬', pos: 'adc', region: 'LCK', meme: '鼠王' },
  { id: 'bang', name: 'Bang', zh: '裴俊植', pos: 'adc', region: 'LCK', meme: '推推棒，两冠AD' },
  { id: 'gumayusi', name: 'Gumayusi', zh: '李民衡', pos: 'adc', region: 'LCK', meme: '小吕布，HLE 新AD' },
  { id: 'peyz', name: 'Peyz', zh: '金修奂', pos: 'adc', region: 'LCK', meme: 'T1 新AD，大心脏' },
  { id: 'smash', name: 'Smash', zh: '—', pos: 'adc', region: 'LCK', meme: 'DK 新AD，女警绝活' },
  { id: 'teddy', name: 'Teddy', zh: '朴辰成', pos: 'adc', region: 'LCK', meme: '机长' },
  { id: 'doublelift', name: 'Doublelift', zh: '彭奕龙', pos: 'adc', region: 'LCS', meme: '大师兄，垃圾话之王' },
  { id: 'sneaky', name: 'Sneaky', zh: '扎卡里·斯卡迪', pos: 'adc', region: 'LCS', meme: '女装大佬' },
  { id: 'hanssama', name: 'Hans Sama', zh: '史蒂文·利夫', pos: 'adc', region: 'LEC', meme: '欧洲AD之光' },
  { id: 'brtt', name: 'brTT', zh: '费利佩·贡萨尔维斯', pos: 'adc', region: 'CBLOL', meme: '巴西Uzi' },
  { id: 'weixiao', name: 'WeiXiao', zh: '高学成', pos: 'adc', region: 'LPL', meme: '世界第一ADC' },
  { id: 'yutapon', name: 'Yutapon', zh: '村田雄大', pos: 'adc', region: 'LJL', meme: '日本AD之光' },
  { id: '1xn', name: '1xn', zh: '李修楠', pos: 'adc', region: 'LPL', meme: 'LNG 新AD' },
  { id: 'fenrir', name: 'FenRir', zh: '—', pos: 'adc', region: 'LCK', meme: 'KT 新AD' },
  { id: 'diable', name: 'Diable', zh: '—', pos: 'adc', region: 'LCK', meme: 'NS 新AD' },
  { id: 'deokdam', name: 'Deokdam', zh: '徐大吉', pos: 'adc', region: 'LCK', meme: 'DNS 大核' },
  // 辅助
  { id: 'ming', name: 'Ming', zh: '史森明', pos: 'sup', region: 'LPL', meme: '森明帮帮主' },
  { id: 'meiko', name: 'Meiko', zh: '田野', pos: 'sup', region: 'LPL', meme: '冠军辅助，田野' },
  { id: 'baolan', name: 'Baolan', zh: '王柳羿', pos: 'sup', region: 'LPL', meme: '蓝公主' },
  { id: 'crisp', name: 'Crisp', zh: '刘青松', pos: 'sup', region: 'LPL', meme: '撕少，S9 FMVP' },
  { id: 'keria', name: 'Keria', zh: '柳岷析', pos: 'sup', region: 'LCK', meme: 'T1 冠军辅助，小K' },
  { id: 'beryl', name: 'BeryL', zh: '赵乾熙', pos: 'sup', region: 'LCK', meme: '原神哥' },
  { id: 'wolf', name: 'Wolf', zh: '李宰晚', pos: 'sup', region: 'LCK', meme: '狼，两冠辅助' },
  { id: 'mata', name: 'Mata', zh: '赵世衡', pos: 'sup', region: 'LCK', meme: '辅助之神' },
  { id: 'madlife', name: 'Madlife', zh: '洪民基', pos: 'sup', region: 'LCK', meme: '钩子开团的辅助之神' },
  { id: 'corejj', name: 'CoreJJ', zh: '赵善瑄', pos: 'sup', region: 'LCS', meme: '冠军辅助' },
  { id: 'hylissang', name: 'Hylissang', zh: '兹德拉沃·加兰博斯', pos: 'sup', region: 'LEC', meme: '嗨了送' },
  { id: 'pyl', name: 'Pyl', zh: '陈博', pos: 'sup', region: 'LPL', meme: '死神来了' },
  { id: 'swordart', name: 'SwordArt', zh: '胡硕杰', pos: 'sup', region: 'PCS', meme: '蛇蛇，闪电狼' },
  { id: 'missing', name: 'Missing', zh: '娄运峰', pos: 'sup', region: 'LPL', meme: '米神，LNG 新辅助' },
  { id: 'on', name: 'ON', zh: '骆文俊', pos: 'sup', region: 'LPL', meme: '大O老师，BLG 开团手' },
  { id: 'delight', name: 'Delight', zh: '—', pos: 'sup', region: 'LCK', meme: 'HLE 新辅助，开团机器' },
  { id: 'career', name: 'Career', zh: '—', pos: 'sup', region: 'LCK', meme: 'DK 新辅助' },
  { id: 'duro', name: 'Duro', zh: '—', pos: 'sup', region: 'LCK', meme: 'GEN 新辅助' },
  { id: 'effort', name: 'Effort', zh: '李相浩', pos: 'sup', region: 'LCK', meme: 'KT 辅助，老将' },
  { id: 'lehends', name: 'Lehends', zh: '孙施尤', pos: 'sup', region: 'LCK', meme: 'NS 辅助，莲子' },
  { id: 'thehank', name: 'The Hank', zh: '—', pos: 'sup', region: 'LPL', meme: 'WBG 新辅助，神秘新人' },
  { id: 'vampire', name: 'Vampire', zh: '赵哲灿', pos: 'sup', region: 'LPL', meme: 'JDG 新辅助，和 GALA 整活不收徒' },
];

// 梗库：随机撒进生涯的 legacy 文案（经典 + 2025-2026 新梗）
export const MEMES = [
  '弹幕瞬间刷满了「永远滴神」。',
  '解说嗓子都喊劈了，导播切了三次回放。',
  '这波操作，已经预定世界赛 Top10 集锦。',
  '赛后热搜第一，评论区全是玩梗的。',
  '别问，问就是 4396。',
  '你被做成了表情包，全网流传。',
  '黑子们沉默了一整晚。',
  '这一波，直接封神。',
  '弹幕开始刷「陀螺」——你被单杀后原地转圈的名场面又来了。',
  '「送姜」的帽子扣在你头上，你决定用一波单杀把它摘掉。',
  '赛后统计你输出拉胯，评论区齐刷「软脚虾」。',
  '「糯手」的梗跟着你跑了一个赛季，你决定用决赛洗刷它。',
  '有人说你是「地缚灵」，一辈子待在中路补刀，你反手去游走抓爆三路。',
  '你赢了比赛，评论区还在刷「精忠报国」的剧本。',
  '「暴毙王」差点挂你头上，你硬是用一波操作活了下来。',
  '你 3:0 带走对面，弹幕刷「虐菜无情」。',
  '「还有谁？」你赢下比赛后对着镜头喊，弹幕全是「指定尽孝」。',
  '解说嘴瓢把你的 ID 念成了黑称，你微微一笑，下一场打爆全场。',
  '「补一中」是黑称也是夸奖，你用一波单杀证明自己不只是会补刀。',
  '「世一上」——每个上单都这么喊自己，你也一样，弹幕笑疯了。',
  '赛后你更新动态：「都别急」，评论区更急了。',
  '有人拿你「澡子哥」的名场面做鬼畜，你直接在下一场打服所有人。',
  '弹幕齐刷「九折水瓶？」——就这水平，你也敢？',
  '赛后采访有人起哄：表演个魔法，不收徒！',
  '「我让队友很舒服。」赛后语音一放，全网都舒服了。',
  '你的战队被做成 0-22 的应援牌，粉丝举着满场跑。',
  '八龙珠在手都被翻盘，弹幕都在刷「神人大战」。',
  '你们世界赛瑞士轮 0-3，成了网友口中的「十七强」。',
  '「大飞老师」的梗在评论区满天飞。',
  '粉丝拉出横幅：T1 三连冠，你也是见证者。',
  '「定海神针手队」——你的粉丝连夜改的应援词。',
  '你说对面不行，结果被「指定尽孝」，成了 X 一儿。',
  'WE 的「就在今天」横幅，今天真的应验了。',
  '你的 ID 被刷上了韩服峡谷之巅榜首。',
  '粉丝在基地门口拉起了横幅。',
  '网吧五连坐的兄弟们为你欢呼。',
  '赛后采访主持人问你什么感受，你说：就还好吧。',
  '「这个选手的细节，我只能说无敌。」——解说原话。',
  '对面打野在公屏上打了个问号。',
  '对方水晶爆炸的那一刻，弹幕只剩「GG」。',
  '你的名场面被做成了一分钟集锦，播放量破千万。',
];

// 称号图鉴
export const TITLES = [
  { id: 'tian_zhijiaozi', name: '天之骄子', art: '👑', hint: '巅峰能力打到 96 以上' },
  { id: 'yao_ren_dx', name: '妖人兑现', art: '✨', hint: '出道不被看好，巅峰却打到 93 以上' },
  { id: 'da_qi_wan_cheng', name: '大器晚成', art: '🌙', hint: '从低起点一路练到 88 以上' },
  { id: 'shang_zhong_yong', name: '伤仲永', art: '🍂', hint: '高开低走，巅峰之后断崖下滑' },
  { id: 'yi_ren_yi_cheng', name: '一人一城', art: '🏙️', hint: '整个生涯只效力一支战队' },
  { id: 'dian_jing_liu_lang', name: '电竞浪人', art: '🧳', hint: '效力过 6 支以上战队' },
  { id: 'tie_ren', name: '铁人', art: '🔩', hint: '生涯出场 1000 局以上' },
  { id: 'ji_sha_ji_qi', name: '击杀机器', art: '🔥', hint: '生涯总击杀突破 12000' },
  { id: 'wu_sha_zhi_wang', name: '五杀之王', art: '🎉', hint: '打出过单场五杀' },
  { id: 'wu_mian_zhi_wang', name: '无冕之王', art: '🥀', hint: '巅峰 90+，却一座奖杯都没有' },
  { id: 'shi_jie_zhi_dian', name: '世界之巅', art: '🌍', hint: '捧起全球总决赛冠军' },
  { id: 'dian_jing_zhi_shen', name: '电竞之神', art: '🐐', hint: '全球总决赛冠军 + FMVP + 巅峰 96+' },
  { id: 'jin_man_guan', name: '金满贯', art: '💎', hint: '世界赛、MSI、洲际赛、联赛全拿过' },
  { id: 'wang_chao_ji', name: '王朝奠基人', art: '🏛️', hint: '同一支战队三连冠' },
  { id: 'guan_jun_shou_ge_ji', name: '冠军收割机', art: '🏆', hint: '生涯 12 座以上重要奖杯' },
  { id: 'dian_jing_shou_fu', name: '电竞首富', art: '💰', hint: '生涯总收入突破 20 亿' },
  { id: 'tian_jia_he_tong', name: '天价合同', art: '📜', hint: '单赛季年薪突破 3 亿' },
  { id: 'quan_ming_xing_zhi_wang', name: '全明星之王', art: '🌟', hint: '10 次以上全明星' },
  { id: 'zui_you_jia_zhi', name: '最有价值', art: '🏅', hint: '4 次以上联赛MVP' },
  { id: 'zong_jue_sai_zhi_wang', name: '总决赛之王', art: '🏵️', hint: '3 次以上总决赛MVP' },
  { id: 'ji_sha_wang', name: '击杀王', art: '🎯', hint: '5 次以上赛季击杀王' },
  { id: 'xin_ren_wang', name: '新人王', art: '🌱', hint: '拿过最佳新秀' },
  { id: 'dan_sha_zhi_wang', name: '单杀王', art: '🗡️', hint: '3 次以上赛季单杀王' },
  { id: 'bu_dao_wang', name: '补刀王', art: '🍜', hint: '5 次以上补刀王或生涯补刀 300000+' },
  { id: 'zu_zhi_da_shi', name: '组织大师', art: '🎩', hint: '5 次以上助攻王或生涯助攻 12000+' },
  { id: 'shi_ye_da_shi', name: '视野大师', art: '🛡️', hint: '3 次以上视野王' },
  { id: 'bu_lao_chuan_shuo', name: '不老传说', art: '⏳', hint: '30 岁还在打主力' },
  { id: 'ji_liu_yong_tui', name: '急流勇退', art: '🚀', hint: '巅峰期 30 岁前主动退役' },
  { id: 'ya_yun_qi_zhi', name: '亚运旗帜', art: '🇨🇳', hint: '亚运会为国出战 3 届以上' },
  { id: 'yuan_meng_ren', name: '圆梦人', art: '💫', hint: '为儿时梦想战队拿过冠军' },
  { id: 'jue_sheng_zhi_wang', name: '决胜之王', art: '⏱️', hint: '关键决胜时刻把比赛杀死' },
  { id: 'long_du_zhi_wang', name: '抢龙之王', art: '🐉', hint: '两次以上关键抢龙成功' },
  { id: 'yi_sheng_zhi_di', name: '一生之敌', art: '⚔️', hint: '与宿敌同场 8 个赛季以上，且双方都拿过联赛冠军' },
  { id: 'ya_zhi_su_di', name: '压制宿敌', art: '🥊', hint: '生涯总击杀超过宿敌，冠军也比对方多' },
];

// 更新记录
export const UPDATES = [
  { version: '1.0', title: '游戏上线', items: ['选一个赛区和分路，从 16 岁青训打到退役', '转会、手伤、冒泡赛、世界赛，每个决定都算数', '结束后生成一张可保存的生涯战绩卡', '从首页就能翻回过去任意一局的战绩卡'] },
  { version: '1.1', title: '现实选手与名场面', items: ['新增 120 位现实选手：Faker 六冠王、T1 三连冠、GEN MSI 二连冠、BLG 全华班…… 按 2025-2026 最新阵容收录，他们会成为你的宿敌和对手', '事件池上新：排位撞车、反向Q、4396、捡灯笼、五十血翻盘', '新梗管够：九折水瓶、收徒、舒服了、0-22、八龙珠、十七强', '新增五杀之王、抢龙之王等称号', '更新记录入口，玩法一直在更新'] },
  { version: '1.2', title: '历史档案与称号图鉴', items: ['每一局收场都会自动留下一条记录', '称号有了一面墙：所有称号一起排列', '拿到过的显示你当时那句话', '没拿到的只给一句线索，不告诉你怎么拿'] },
  { version: '1.3', title: '编号开局', items: ['结算页给这一局一个编号，点一下就复制', '粘贴朋友给你的编号，就能复现同一段生涯', '同一个编号可以反复打，每一遍各留一份档案', '称号照点亮'] },
  { version: '1.4', title: '世界赛与亚运会', items: ['全球总决赛、MSI、洲际赛按赛季周期开打', '亚运会预选赛生死战由你来打', '你越强，赛区走得越深', '大赛奖杯单独计数'] },
  { version: '1.5', title: '一生之敌与传奇时刻', items: ['新增强力宿敌：同分路、同一年出道，一辈子的比较', '每次交手都有剧情，结算页给出你们一生的对决记录', '新增全明星、Solo王挑战赛、转会期等新事件', '每个赛季会留下高光时刻，写进你的生涯总结'] },
];

// 生涯事件池
// 每个选项：label 按钮文案；hint 效果提示；outcomes 结果数组
// effects 键：overallDelta 能力永久变化；tempDelta 阶段内临时变化；
// roleShift 地位变化；injury 伤病描述；suspended 禁赛季数；trophyMult 俱乐部夺冠加成；
// nationalMult 大赛加成；money 一次性收入（万）；transfer 转会；
// legacy 传奇文案；award 荣誉；nationalTeamRetired 退出赛区代表队

export const EVENTS = {
  // ---------- 青训期 ----------
  youth_shooting: {
  key: 'youth_shooting', type: 'career_event', minAge: 15, maxAge: 17, weight: 2,
    title: '青训营：补刀专项',
    text: '青训教练把你叫到一边，说你补刀基本功很扎实，但对线细节太糙。他丢给你一套韩服高分局的录像。',
    options: [
      { id: 'a', label: '每天加练两百刀', hint: '补刀练上去了，能力上涨', outcomes: [
        { prob: 0.75, text: '三个月后，你的补刀稳得像脚本。', effects: { overallDelta: 2, permanent: true } },
        { prob: 0.25, text: '练得太猛，手腕先抗议了。', effects: { overallDelta: -1, permanent: true, injury: '手腕劳损' } },
      ]},
      { id: 'b', label: '先练对线和换血', hint: '操作先跟上，补刀以后再说', outcomes: [
        { prob: 0.8, text: '对线压制力上来后，对面被迫漏刀。', effects: { overallDelta: 1, permanent: true, roleShift: 1 } },
        { prob: 0.2, text: '换血太贪，被单杀好几次。', effects: { overallDelta: 0, injury: '心态受挫' } },
      ]},
      { id: 'c', label: '按部就班', hint: '不出彩，也不冒险', outcomes: [
        { prob: 1, text: '青训营结束，一切照旧。', effects: {} },
      ]},
    ],
  },
  youth_point_guard: {
  key: 'youth_point_guard', type: 'career_event', minAge: 15, maxAge: 17, weight: 2,
    title: '青训营：游走支援',
    text: '队里主力中单伤了，教练让你顶上去打训练赛。对面是别的青训营的头牌，所有人都在看。',
    options: [
      { id: 'a', label: '自己打，先打出对线优势', hint: '个人能力涨，团队配合暂时落后', outcomes: [
        { prob: 0.7, text: '你单杀了对面中单，球探记下了你的 ID。', effects: { overallDelta: 2, permanent: true } },
        { prob: 0.3, text: '你打得像路人王，队友全程坐牢。', effects: { overallDelta: -1, permanent: true, roleShift: -1 } },
      ]},
      { id: 'b', label: '先游走支援', hint: '团队配合涨，对线节奏要重新找', outcomes: [
        { prob: 0.7, text: '你的游走盘活了全队，教练笑了。', effects: { overallDelta: 2, permanent: true } },
        { prob: 0.3, text: '游走太多，自己塔皮先被吃完了。', effects: { overallDelta: -1, permanent: true } },
      ]},
    ],
  },
  youth_late_growth: {
  key: 'youth_late_growth', type: 'career_event', minAge: 15, maxAge: 17, weight: 1,
    title: '青训营：手速晚熟',
    text: '体能报告说你的反应速度在同龄人里偏慢，但教练说这种选手后期往往更稳。',
    options: [
      { id: 'a', label: '狠练操作和反应', hint: '上限更高，有劳损风险', outcomes: [
        { prob: 0.55, text: '半年后你像换了个人，操作完全不一样了。', effects: { overallDelta: 4, permanent: true, roleShift: 1 } },
        { prob: 0.45, text: '练得太猛，手腕先撑不住了。', effects: { overallDelta: -1, injury: '手腕劳损' } },
      ]},
      { id: 'b', label: '慢慢来', hint: '稳妥发育', outcomes: [
        { prob: 1, text: '一年后你的操作跟上了，一切正常。', effects: { overallDelta: 2, permanent: true } },
      ]},
    ],
  },
  // ---------- 训练/休赛期 ----------
  offseason_shooting: {
    key: 'offseason_shooting', type: 'career_event', minAge: 18, maxAge: 33, weight: 3,
    title: '休赛期：操作特训',
    text: '训练师给你列了一份数据：上赛季你的技能命中率全队倒数。休赛期只有八周，你得自己定。',
    options: [
      { id: 'a', label: '每天打一百局训练模式', hint: '练成操作大涨，练过头有伤', outcomes: [
        { prob: 0.65, text: '新赛季第一场，你的技能让解说都喊起来了。', effects: { overallDelta: 2, permanent: true, roleShift: 1 } },
        { prob: 0.35, text: '手腕劳损，操作姿势不得不改回去。', effects: { overallDelta: -1, injury: '手腕劳损' } },
      ]},
      { id: 'b', label: '加练团战配合', hint: '稳定提升，幅度小', outcomes: [
        { prob: 0.9, text: '团战位置感更好了，指挥都轻松了。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.1, text: '练得中规中矩。', effects: {} },
      ]},
      { id: 'c', label: '去度假直播', hint: '放松心情，不涨能力', outcomes: [
        { prob: 1, text: '阳光、沙滩、直播间的礼物，回来状态一般。', effects: { tempDelta: -1, money: 500 } },
      ]},
    ],
  },
  offseason_strength: {
    key: 'offseason_strength', type: 'career_event', minAge: 18, maxAge: 33, weight: 3,
    title: '休赛期：反应与手速',
    text: '教练建议你上一套专门的反应训练。练成了操作脱胎换骨，练过了就是一身腱鞘炎。',
    options: [
      { id: 'a', label: '上强度', hint: '操作上台阶，练过头有伤', outcomes: [
        { prob: 0.6, text: '新赛季你的反应快得离谱，对面根本摸不到你。', effects: { overallDelta: 2, permanent: true, roleShift: 1 } },
        { prob: 0.4, text: '手指先扛不住了，训练量被迫减半。', effects: { overallDelta: -1, tempDelta: -1, injury: '手指劳损' } },
      ]},
      { id: 'b', label: '保持现在的状态', hint: '什么都不变', outcomes: [
        { prob: 1, text: '休赛期平稳度过。', effects: {} },
      ]},
    ],
  },
  offseason_ballhandling: {
    key: 'offseason_ballhandling', type: 'career_event', minAge: 18, maxAge: 33, weight: 2,
    title: '休赛期：英雄池扩展',
    text: '版本更新公告出来了，你的招牌英雄被削成了下水道。教练让你练一个新英雄。',
    options: [
      { id: 'a', label: '跟着版本练', hint: '五五开，要么起飞要么崩', outcomes: [
        { prob: 0.5, text: '新英雄练成了，版本红利吃满。', effects: { overallDelta: 3, permanent: true } },
        { prob: 0.5, text: '新英雄一直练不明白，招牌也生疏了。', effects: { overallDelta: -2, permanent: true } },
      ]},
      { id: 'b', label: '就用自己的绝活', hint: '稳定，不涨', outcomes: [
        { prob: 1, text: '你相信自己的绝活能扛过版本。', effects: {} },
      ]},
    ],
  },
  offseason_diet: {
    key: 'offseason_diet', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '休赛期：作息管理',
    text: '队医给你请了营养师和睡眠教练，要重排你的作息。身体状态变了，操作也会变。',
    options: [
      { id: 'a', label: '照着来', hint: '身体变好，夜宵得戒', outcomes: [
        { prob: 0.75, text: '体脂降了，注意力也集中了。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.25, text: '戒不掉夜宵和熬夜，白搭。', effects: {} },
      ]},
      { id: 'b', label: '维持现在的作息', hint: '不变', outcomes: [
        { prob: 1, text: '你继续快乐地干饭、熬夜。', effects: {} },
      ]},
    ],
  },
  offseason_extra_work: {
    key: 'offseason_extra_work', type: 'career_event', minAge: 18, maxAge: 31, weight: 2,
    title: '休赛期：加练',
    text: '教练组给你排了一套额外的训练量。练到位能上一个台阶，练废了就是伤。',
    options: [
      { id: 'a', label: '一天两练', hint: '练成能力大涨，练废进医院', outcomes: [
        { prob: 0.55, text: '一个夏天下来，你的操作肉眼可见地涨了。', effects: { overallDelta: 2, permanent: true } },
        { prob: 0.45, text: '训练量吃得太急，开赛前拉伤了。', effects: { overallDelta: -1, injury: '肌肉拉伤', tempDelta: -1 } },
      ]},
      { id: 'b', label: '减半做', hint: '一半的量，一半的收益', outcomes: [
        { prob: 0.85, text: '量刚好，稳步提升。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.15, text: '少了点，等于没练。', effects: {} },
      ]},
      { id: 'c', label: '只练一次', hint: '不涨，也不伤', outcomes: [
        { prob: 1, text: '象征性打了几把排位。', effects: {} },
      ]},
    ],
  },
  // ---------- 教练/体系 ----------
  coach_change: {
    key: 'coach_change', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '新教练上任',
    text: '战队换了主教练。他嘴上说你很重要，但媒体反复分析：你的打法，不适合他的体系。',
    options: [
      { id: 'a', label: '主动适应新体系', hint: '练成位置更稳，练废了更难受', outcomes: [
        { prob: 0.6, text: '你交出的表现堵住了所有分析，首发没人动得了。', effects: { overallDelta: 2, permanent: true, roleShift: 1 } },
        { prob: 0.4, text: '新体系里没有你的位置，坐穿替补席。', effects: { roleShift: -2, tempDelta: -1 } },
      ]},
      { id: 'b', label: '用自己的打法打', hint: '保持打法，和新教练顶一顶', outcomes: [
        { prob: 0.45, text: '你用自己的方式打出了数据，新教练也得服。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.55, text: '新教练不买账，你的上场时间开始减少。', effects: { roleShift: -1, tempDelta: -1 } },
      ]},
      { id: 'c', label: '申请转会', hint: '换个环境，去别的队', outcomes: [
        { prob: 0.8, text: '转会完成，新环境重新开始。', effects: { transfer: true } },
        { prob: 0.2, text: '管理层没放人，还把你按在替补席。', effects: { roleShift: -2 } },
      ]},
    ],
  },
  coach_new_system: {
    key: 'coach_new_system', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '版本要改了',
    text: '版本更新预告出来了：你的位置被大削，对面那个位置加强了。会上放的演示录像里，你坐的位置站着另一种选手。',
    options: [
      { id: 'a', label: '跟上版本节奏', hint: '适应版本，练成坐稳首发', outcomes: [
        { prob: 0.6, text: '你练出来的英雄池让教练刮目相看。', effects: { overallDelta: 2, permanent: true, roleShift: 1 } },
        { prob: 0.4, text: '版本理解跟不上，轮换边缘。', effects: { roleShift: -1 } },
      ]},
      { id: 'b', label: '找教练谈', hint: '争取战术地位', outcomes: [
        { prob: 0.5, text: '教练给你安排了几套专属战术。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.5, text: '谈话不欢而散，训练室气氛微妙。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  assistant_coach: {
    key: 'assistant_coach', type: 'career_event', minAge: 16, maxAge: 28, weight: 1,
    title: '助教的建议',
    text: '助教偷偷给你看了一份球探报告，上面是你的优缺点分析。他建议你主攻一个方向。',
    options: [
      { id: 'a', label: '练短板', hint: '练成综合大涨，练废了信心受挫', outcomes: [
        { prob: 0.5, text: '短板补上了，你成了更完整的选手。', effects: { overallDelta: 3, permanent: true } },
        { prob: 0.5, text: '短板还是短板，还丢了长板的手感。', effects: { overallDelta: -1, permanent: true } },
      ]},
      { id: 'b', label: '强化长板', hint: '把强项练到极致', outcomes: [
        { prob: 0.8, text: '你的招牌英雄成了对面 BP 必禁的对象。', effects: { overallDelta: 2, permanent: true } },
        { prob: 0.2, text: '练太多，身体开始抗议。', effects: { injury: '疲劳性伤病' } },
      ]},
    ],
  },
  // ---------- 竞争 ----------
  young_guns: {
    key: 'young_guns', type: 'career_event', minAge: 18, maxAge: 34, weight: 3,
    title: '队里冒出个小孩',
    text: '青训营提上来一个十七八岁的天才，天赋肉眼可见，打的正是你的位置。',
    options: [
      { id: 'a', label: '把他压下去', hint: '坐稳首发，能力永久提升，也可能被反超', outcomes: [
        { prob: 0.6, text: '你用表现告诉他：这个位置还轮不到他。', effects: { overallDelta: 1, permanent: true, roleShift: 1 } },
        { prob: 0.4, text: '他太出色了，你只能让出位置。', effects: { roleShift: -2 } },
      ]},
      { id: 'b', label: '带他成长', hint: '训练室声望涨，上场时间可能减少', outcomes: [
        { prob: 0.7, text: '他把你当大哥，队伍氛围好得发烫。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.3, text: '他成长太快，教练开始倾斜资源。', effects: { roleShift: -1 } },
      ]},
      { id: 'c', label: '申请转会', hint: '换个队重新开始', outcomes: [
        { prob: 0.8, text: '你带着天赋去了新战队。', effects: { transfer: true } },
        { prob: 0.2, text: '管理层不放人，位置还得争。', effects: {} },
      ]},
    ],
  },
  bought_rival: {
    key: 'bought_rival', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '俱乐部买了个人',
    text: '转会期俱乐部砸下重金，买的正是你这个位置。经理找你谈：换个角色，还是坐着。',
    options: [
      { id: 'a', label: '留下证明自己', hint: '赢了地位大涨，输了坐替补', outcomes: [
        { prob: 0.5, text: '你用表现证明了谁才是答案。', effects: { overallDelta: 2, permanent: true, roleShift: 2 } },
        { prob: 0.5, text: '新援太强，你被挤到了轮换边缘。', effects: { roleShift: -2 } },
      ]},
      { id: 'b', label: '接受替补角色', hint: '保住出场，数据下滑', outcomes: [
        { prob: 1, text: '你从替补席重新开始，机会越来越少。', effects: { roleShift: -2 } },
      ]},
      { id: 'c', label: '让经纪人找下家', hint: '换队', outcomes: [
        { prob: 0.75, text: '转会很快谈妥，你去了新战队。', effects: { transfer: true } },
        { prob: 0.25, text: '没有合适的报价，只能留下。', effects: {} },
      ]},
    ],
  },
  loan_return: {
    key: 'loan_return', type: 'career_event', minAge: 18, maxAge: 34, weight: 1,
    title: '租借归来的那个人',
    text: '两年前被租去次级联赛的那个人回来了。走的时候他排在你后面，这两年他打满了两个赛季，实力比以前强不少。',
    options: [
      { id: 'a', label: '正面竞争', hint: '赢了坐稳首发，输了让位', outcomes: [
        { prob: 0.55, text: '你用训练和比赛表现赢得了教练的信任。', effects: { overallDelta: 1, permanent: true, roleShift: 1 } },
        { prob: 0.45, text: '他太想证明自己，你被挤了下去。', effects: { roleShift: -2 } },
      ]},
      { id: 'b', label: '去别处寻找机会', hint: '申请转会', outcomes: [
        { prob: 0.7, text: '你换了一支需要你的战队。', effects: { transfer: true } },
        { prob: 0.3, text: '转会告吹，局面更尴尬。', effects: { roleShift: -1 } },
      ]},
    ],
  },
  // ---------- 伤病 ----------
  injury_minor: {
    key: 'injury_minor', type: 'career_event', minAge: 18, maxAge: 36, weight: 3,
    title: '队医的报告',
    text: '手腕的老伤拖了两年。休赛期队医摊开一份手术方案，你拿去问了另一位医生，两个人给的答案正好相反。',
    options: [
      { id: 'a', label: '手术根治', hint: '根治了能力永久提升，恢复期长', outcomes: [
        { prob: 0.75, text: '手术成功，伤彻底好了，操作也更稳了。', effects: { overallDelta: 1, permanent: true, injury: null, tempDelta: -1 } },
        { prob: 0.25, text: '术后感染，恢复比预期慢。', effects: { injury: '术后感染', tempDelta: -2 } },
      ]},
      { id: 'b', label: '保守治疗', hint: '不耽误赛季，伤可能反复', outcomes: [
        { prob: 0.7, text: '保守治疗撑过了整个赛季。', effects: {} },
        { prob: 0.3, text: '赛季中段还是倒下了。', effects: { injury: '旧伤复发', tempDelta: -2 } },
      ]},
    ],
  },
  injury_serious: {
    key: 'injury_serious', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '最不该受伤的时候',
    text: '新赛季开幕只剩三个月，你在训练中手腕剧痛。队医摇了摇头。',
    options: [
      { id: 'a', label: '安心养伤', hint: '彻底养好，缺席大半个赛季', outcomes: [
        { prob: 0.7, text: '伤养好了，只是复出后需要时间找回手感。', effects: { injury: '重伤恢复', tempDelta: -2 } },
        { prob: 0.3, text: '恢复期出现反复，整个赛季都跟不上。', effects: { injury: '恢复反复', tempDelta: -3 } },
      ]},
      { id: 'b', label: '强行提前复出', hint: '咬牙赶上，可能加重伤势', outcomes: [
        { prob: 0.4, text: '你奇迹般地赶上了开幕战，伤势无碍。', effects: { overallDelta: 1, permanent: true, roleShift: 1 } },
        { prob: 0.6, text: '伤势加重，操作永久受损。', effects: { overallDelta: -3, permanent: true, injury: '伤势加重' } },
      ]},
    ],
  },
  injury_big_tournament: {
    key: 'injury_big_tournament', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '大赛前的噩耗',
    text: '赛区代表队的征召来了。俱乐部队医发现，你身上的老伤复发了。打封闭上，还是养。',
    options: [
      { id: 'a', label: '打封闭上', hint: '带队赢球声望大涨，加重伤势有风险', outcomes: [
        { prob: 0.5, text: '你带伤打满大赛，回来成了英雄。', effects: { nationalMult: 1.5, injury: '伤势加重', roleShift: 1 } },
        { prob: 0.5, text: '大赛没打明白，伤反而重了。', effects: { nationalMult: 0.5, injury: '伤势加重', tempDelta: -2 } },
      ]},
      { id: 'b', label: '缺席大赛养伤', hint: '身体要紧，赛区代表队可能不满', outcomes: [
        { prob: 0.8, text: '养好了身体，下个周期再来。', effects: { injury: null, nationalMult: 0.7 } },
        { prob: 0.2, text: '舆论开始骂你怕了。', effects: { nationalMult: 0.7, tempDelta: -1 } },
      ]},
    ],
  },
  // ---------- 赛区代表队（国家队） ----------
  national_callup: {
    key: 'national_callup', type: 'career_event', minAge: 19, maxAge: 32, weight: 2,
    title: '亚运会征召',
    text: '亚运会集训名单里有你的名字。教练想让你打一个新的位置。',
    options: [
      { id: 'a', label: '接受征召，打新位置', hint: '大赛数据更好看，俱乐部体力吃紧', outcomes: [
        { prob: 0.7, text: '你在亚运会打出了身价。', effects: { nationalMult: 1.2, tempDelta: -1 } },
        { prob: 0.3, text: '新位置水土不服，两头都没打好。', effects: { nationalMult: 0.8, tempDelta: -2 } },
      ]},
      { id: 'b', label: '婉拒，专注俱乐部', hint: '俱乐部全勤，赛区代表队印象分下降', outcomes: [
        { prob: 1, text: '你选择先顾俱乐部。', effects: { nationalMult: 0.6, roleShift: 1 } },
      ]},
    ],
  },
  national_retire: {
    key: 'national_retire', type: 'career_event', minAge: 30, maxAge: 40, weight: 1,
    title: '退出赛区代表队',
    text: '年龄摆在那里，你开始考虑从赛区代表队退役。教练说，只要你愿意，随时回来。',
    options: [
      { id: 'a', label: '宣布退出代表队', hint: '此后不再被征召，专注俱乐部', outcomes: [
        { prob: 1, text: '你宣布退出代表队，从此专注俱乐部。', effects: { nationalTeamRetired: true, roleShift: 1 } },
      ]},
      { id: 'b', label: '只要需要我就打', hint: '继续为国效力', outcomes: [
        { prob: 1, text: '你选择继续为国征战。', effects: {} },
      ]},
    ],
  },
  // ---------- 转会/合同 ----------
  transfer_rumor: {
    key: 'transfer_rumor', type: 'career_event', minAge: 19, maxAge: 33, weight: 2,
    title: '转会传闻',
    text: '转会传闻被翻来覆去炒了一个冬天。你一句话没说过，弹幕已经认定你身在曹营心在汉。',
    options: [
      { id: 'a', label: '公开表态留队', hint: '训练室安心，报价降温', outcomes: [
        { prob: 0.8, text: '你公开表态，全队都松了一口气。', effects: { roleShift: 1 } },
        { prob: 0.2, text: '粉丝觉得你在演戏。', effects: { tempDelta: -1 } },
      ]},
      { id: 'b', label: '不回应', hint: '专注比赛', outcomes: [
        { prob: 1, text: '你用表现回应一切。', effects: {} },
      ]},
      { id: 'c', label: '让经纪人推动转会', hint: '可能去更好的战队', outcomes: [
        { prob: 0.6, text: '转会达成，你去了新战队。', effects: { transfer: true } },
        { prob: 0.4, text: '谈判破裂，两边都不痛快。', effects: { roleShift: -1 } },
      ]},
    ],
  },
  dream_offer: {
    key: 'dream_offer', type: 'career_event', minAge: 20, maxAge: 32, weight: 1,
    title: '儿时主队来敲门了',
    text: '小时候贴在墙上的那张海报，那支战队的经理打来了电话。',
    options: [
      { id: 'a', label: '加盟儿时主队', hint: '圆梦，可能降薪', outcomes: [
        { prob: 1, text: '你穿上了那件梦寐以求的队服。', effects: { transfer: true, dreamTeam: true } },
      ]},
      { id: 'b', label: '留队', hint: '继续现在的一切', outcomes: [
        { prob: 1, text: '你选择留下，梦留在心里。', effects: {} },
      ]},
    ],
  },
  rival_offer: {
    key: 'rival_offer', type: 'career_event', minAge: 20, maxAge: 33, weight: 1,
    title: '宿敌战队来挖你',
    text: '宿敌战队开价了。粉丝会恨你，但那边的阵容真的更有机会夺冠。',
    options: [
      { id: 'a', label: '接受', hint: '去宿敌，背负骂名拿冠军', outcomes: [
        { prob: 1, text: '你成了粉丝口中的叛徒，也成了夺冠热门。', effects: { transfer: true, roleShift: 1, money: 2000 } },
      ]},
      { id: 'b', label: '拒绝', hint: '留下，粉丝爱你', outcomes: [
        { prob: 1, text: '你拒绝了宿敌，主场粉丝为你起立。', effects: { roleShift: 1 } },
      ]},
    ],
  },
  blockbuster: {
    key: 'blockbuster', type: 'career_event', minAge: 22, maxAge: 34, weight: 1,
    title: '天价合同',
    text: '经纪人带着一份你没见过的报价来了。数字大得离谱，代价是你得跟一堆大牌抢位置。',
    options: [
      { id: 'a', label: '签', hint: '收入暴涨，去强队抢位置', outcomes: [
        { prob: 0.7, text: '你签下了天价合同，也扛住了压力。', effects: { transfer: true, money: 15000, salaryMult: 2 } },
        { prob: 0.3, text: '合同签了，位置没了。', effects: { transfer: true, money: 15000, salaryMult: 2, roleShift: -1 } },
      ]},
      { id: 'b', label: '留在现在的队', hint: '继续做核心', outcomes: [
        { prob: 1, text: '你选择留下来，继续当这座城市的招牌。', effects: { roleShift: 1 } },
      ]},
    ],
  },
  home_league_offer: {
    key: 'home_league_offer', type: 'career_event', minAge: 26, maxAge: 35, weight: 1,
    title: '回家乡赛区',
    text: '家人想让你回去。家乡赛区的战队开出了核心待遇，机场会有人举着你的 ID。',
    options: [
      { id: 'a', label: '回母赛区', hint: '当核心，赛区曝光度下降', outcomes: [
        { prob: 1, text: '你回家了，机场真的有人举着你的 ID。', effects: { transfer: true, roleShift: 2, money: 3000 } },
      ]},
      { id: 'b', label: '留在外面', hint: '继续闯荡', outcomes: [
        { prob: 1, text: '你选择继续在外面证明自己。', effects: {} },
      ]},
    ],
  },
  contract_non_renewal: {
    key: 'contract_non_renewal', type: 'career_event', minAge: 30, maxAge: 40, weight: 1,
    title: '合同到期',
    text: '俱乐部决定不再续约。下一步去哪儿，或者就此结束。',
    options: [
      { id: 'a', label: '找下家', hint: '还有战队愿意要你', outcomes: [
        { prob: 0.7, text: '你找到了新东家，继续打。', effects: { transfer: true } },
        { prob: 0.3, text: '没有战队报价，只能退役。', effects: { forceRetire: true } },
      ]},
      { id: 'b', label: '不再找下家，就此结束', hint: '直接退役', outcomes: [
        { prob: 1, text: '你把鼠标收进包里，生涯到此为止。', effects: { forceRetire: true } },
      ]},
    ],
  },
  no_offers: {
    key: 'no_offers', type: 'career_event', minAge: 32, maxAge: 45, weight: 2,
    title: '无人问津',
    text: '转会窗口开了又关，电话一次都没响。经纪人把话说得很直：一份报价都没有。',
    options: [
      { id: 'a', label: '再等等', hint: '可能等到，也可能没有', outcomes: [
        { prob: 0.4, text: '窗口关上前的最后一天，电话响了。', effects: { transfer: true } },
        { prob: 0.6, text: '窗口关上了，就到这里了。', effects: { forceRetire: true } },
      ]},
      { id: 'b', label: '就此退役', hint: '结束职业生涯', outcomes: [
        { prob: 1, text: '你决定把退役消息发出去。', effects: { forceRetire: true } },
      ]},
    ],
  },
  // ---------- 场外/媒体 ----------
  social_media: {
    key: 'social_media', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '被流量盯上了',
    text: '不知道从哪来的节奏，总有自媒体靠黑你换流量。你告诉自己别看，晚上还是一条条翻。',
    options: [
      { id: 'a', label: '卸载社交媒体', hint: '心态稳了，能力微涨', outcomes: [
        { prob: 0.8, text: '眼不见心不烦，你专注比赛。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.2, text: '忍不住又装回来了。', effects: {} },
      ]},
      { id: 'b', label: '开播回应', hint: '热度高，可能说错话', outcomes: [
        { prob: 0.6, text: '你在直播间说了四十分钟，路转粉一片。', effects: { tempDelta: 1, money: 500 } },
        { prob: 0.4, text: '话说多了，又添了新节奏。', effects: { tempDelta: -1 } },
      ]},
      { id: 'c', label: '照单全收', hint: '不影响，也不反抗', outcomes: [
        { prob: 1, text: '你选择无视。', effects: {} },
      ]},
    ],
  },
  agent_issue: {
    key: 'agent_issue', type: 'career_event', minAge: 20, maxAge: 35, weight: 1,
    title: '经纪公司出问题',
    text: '经纪公司出了问题，你和俱乐部的合同被卷进一场纠纷，短期内没法专心训练。',
    options: [
      { id: 'a', label: '换经纪人', hint: '短痛，长期规范', outcomes: [
        { prob: 0.8, text: '新经纪人很快摆平了合同。', effects: {} },
        { prob: 0.2, text: '新经纪人也不省心。', effects: { tempDelta: -1 } },
      ]},
      { id: 'b', label: '自己谈', hint: '省佣金，费心神', outcomes: [
        { prob: 0.6, text: '你自己谈下了合同，省下一笔佣金。', effects: { money: 800 } },
        { prob: 0.4, text: '谈判占了你太多精力。', effects: { tempDelta: -2 } },
      ]},
    ],
  },
  supplement: {
    key: 'supplement', type: 'career_event', minAge: 18, maxAge: 33, weight: 1,
    title: '来路不明的「脚本」',
    text: '有人递给你一个 U 盘，说里面是市面上最先进的「辅助程序」，能让你操作直接起飞。也说了：别被检测到。',
    options: [
      { id: 'a', label: '用', hint: '操作暴涨，可能东窗事发', outcomes: [
        { prob: 0.5, text: '赛季初你状态爆棚，没人怀疑。', effects: { overallDelta: 3, permanent: true, tempDelta: 2 } },
        { prob: 0.5, text: '检测系统盯上了你，长期禁赛，状态大幅下滑。', effects: { suspended: 2, overallDelta: -4, permanent: true, legacy: '禁赛公告一出，全网都在刷「又一个4396」。' } },
      ]},
      { id: 'b', label: '丢掉', hint: '干干净净', outcomes: [
        { prob: 1, text: '你把 U 盘丢进了垃圾桶。', effects: {} },
      ]},
    ],
  },
  tattoo: {
    key: 'tattoo', type: 'career_event', minAge: 18, maxAge: 36, weight: 1,
    title: '纹身',
    text: '你想在手臂上纹一幅召唤师峡谷地图。队医皱了皱眉：恢复期会耽误训练。',
    options: [
      { id: 'a', label: '纹', hint: '帅，浪费两周', outcomes: [
        { prob: 1, text: '纹完了，真的很帅，弹幕都在舔屏。', effects: { tempDelta: -1 } },
      ]},
      { id: 'b', label: '算了', hint: '保持专注', outcomes: [
        { prob: 1, text: '你决定先把冠军纹到心里。', effects: {} },
      ]},
    ],
  },
  family: {
    key: 'family', type: 'career_event', minAge: 20, maxAge: 33, weight: 1,
    title: '家里的事',
    text: '父母年纪大了，家里希望你回母赛区发展，离得近一点。',
    options: [
      { id: 'a', label: '回母赛区', hint: '家人开心，曝光度下降', outcomes: [
        { prob: 1, text: '你回了家，成了主场的骄傲。', effects: { transfer: true, roleShift: 1 } },
      ]},
      { id: 'b', label: '留在外面', hint: '继续闯荡，家人失望', outcomes: [
        { prob: 1, text: '你选择了梦想，家人选择了支持。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  education: {
    key: 'education', type: 'career_event', minAge: 16, maxAge: 24, weight: 1,
    title: '学业',
    text: '当年为了打职业休了学。现在有机会一边训练一边把学历补上。',
    options: [
      { id: 'a', label: '把学业读完', hint: '分掉训练时间，出场减少', outcomes: [
        { prob: 0.7, text: '你拿到了学历，也保住了首发。', effects: { roleShift: -1, money: 0 } },
        { prob: 0.3, text: '两头忙，都耽误了。', effects: { tempDelta: -2 } },
      ]},
      { id: 'b', label: '专心打职业', hint: '全力投入峡谷', outcomes: [
        { prob: 0.85, text: '你把所有时间都给了峡谷。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.15, text: '少了退路，压力反而大了。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  trade_deadline: {
    key: 'trade_deadline', type: 'career_event', minAge: 19, maxAge: 35, weight: 2,
    title: '转会期截止日',
    text: '转会截止日当天，俱乐部上下都在等消息。你的 ID 出现在几份流言里，经理约你聊了聊。',
    options: [
      { id: 'stay', label: '公开表态留队', hint: '稳定军心，位置更稳', outcomes: [
        { prob: 0.85, text: '你表了态，训练室稳了，粉丝也安心了。', effects: { roleShift: 1 } },
        { prob: 0.15, text: '管理层觉得你话里有话。', effects: { tempDelta: -1 } },
      ]},
      { id: 'push', label: '让经纪人推动转会', hint: '可能去更强的队', outcomes: [
        { prob: 0.55, text: '转会达成，你换了东家。', effects: { transfer: true } },
        { prob: 0.45, text: '没谈成，气氛变得微妙。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  allstar_game: {
    key: 'allstar_game', type: 'career_event', minAge: 20, maxAge: 35, weight: 2,
    title: '全明星周末',
    text: '全明星周末，你入选了正赛。场边坐着你的偶像，对面站着你的宿敌。',
    options: [
      { id: 'win', label: '全力争MVP', hint: '数据好看，可能捧起全明星MVP', outcomes: [
        { prob: 0.5, text: '你打出全场最高数据，捧起全明星MVP。', effects: { award: 'allstar_mvp', tempDelta: 1 } },
        { prob: 0.5, text: '手感一般，成了全明星的配角。', effects: {} },
      ]},
      { id: 'show', label: '表演为主', hint: '秀一把，不较真', outcomes: [
        { prob: 0.8, text: '你的骚操作上了热搜，粉丝都记住了。', effects: { money: 300, legacy: '这波操作被做成了全明星集锦。' } },
        { prob: 0.2, text: '玩脱了，被做成了表情包。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  dunk_contest: {
    key: 'dunk_contest', type: 'career_event', minAge: 19, maxAge: 33, weight: 1,
    title: 'Solo 王挑战赛',
    text: '全明星邀请你参加 Solo 王挑战赛。你小时候的梦想，就是单杀那个大魔王。',
    options: [
      { id: 'dare', label: '上绝活英雄', hint: '成了封神，砸了尴尬', outcomes: [
        { prob: 0.45, text: '你连续单杀三位职业选手，解说直接破音。', effects: { award: 'solo_king', tempDelta: 1, money: 200, legacy: '你的 Solo 集锦全网播放破千万。' } },
        { prob: 0.55, text: '你被对面拉扯麻了，全场安静了一秒。', effects: { tempDelta: -1 } },
      ]},
      { id: 'safe', label: '求稳，用招牌', hint: '稳进决赛，难夺冠', outcomes: [
        { prob: 0.75, text: '你进了决赛，输给了那个年轻人。', effects: {} },
        { prob: 0.25, text: '老将出手，居然拿了冠军。', effects: { award: 'solo_king' } },
      ]},
    ],
  },
  three_point_contest: {
    key: 'three_point_contest', type: 'career_event', minAge: 19, maxAge: 34, weight: 1,
    title: '无限火力表演赛',
    text: '全明星无限火力表演赛的邀请函放在你柜子里。整活，还是认真打，赌一把。',
    options: [
      { id: 'flow', label: '按自己的节奏秀', hint: '稳定发挥', outcomes: [
        { prob: 0.55, text: '你输出拉满，捧起表演赛冠军。', effects: { award: 'allstar_mvp' } },
        { prob: 0.45, text: '差一点，惜败。', effects: {} },
      ]},
      { id: 'gamble', label: '全场整活', hint: '赢就赢大的，输就成梗', outcomes: [
        { prob: 0.3, text: '你的搞笑操作和爆炸输出双丰收，全场沸腾。', effects: { award: 'allstar_mvp', tempDelta: 1, money: 200, legacy: '你成了全明星「节目效果之王」。' } },
        { prob: 0.7, text: '整活整过头，第一局就被抬走。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  playoff_hero: {
    key: 'playoff_hero', type: 'career_event', minAge: 19, maxAge: 35, weight: 2,
    title: '季后赛生死战',
    text: '季后赛首轮，你们被逼到悬崖边上。教练把最后一手 BP 的战术板画给了你。',
    options: [
      { id: 'carry', label: '把战队扛肩上', hint: '进了是英雄，输了背锅', outcomes: [
        { prob: 0.5, text: '你打满 BO5 砍下高光数据，系列赛起死回生。', effects: { tempDelta: 2, roleShift: 1, legacy: '解说喊出：这一局，你一个人就是一支军队！' } },
        { prob: 0.5, text: '你太想赢了，操作变形，战队出局。', effects: { tempDelta: -2 } },
      ]},
      { id: 'team', label: '相信队友', hint: '打出团队配合', outcomes: [
        { prob: 0.6, text: '你的联动盘活了全队，抢回一场。', effects: { tempDelta: 1 } },
        { prob: 0.4, text: '队友没接住，遗憾出局。', effects: {} },
      ]},
    ],
  },
  locker_room: {
    key: 'locker_room', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '训练室风波',
    text: '连败之后，训练室里吵起来了。两个主力互相指责，你站在门口。',
    options: [
      { id: 'mediate', label: '站出来调解', hint: '队内声望大涨', outcomes: [
        { prob: 0.7, text: '你几句话把气氛压了下来，全队都服你。', effects: { roleShift: 1 } },
        { prob: 0.3, text: '你劝不动，还把自己卷了进去。', effects: { tempDelta: -1 } },
      ]},
      { id: 'silent', label: '沉默，管好自己', hint: '不掺和', outcomes: [
        { prob: 1, text: '你没说话，专注下一场。', effects: {} },
      ]},
    ],
  },
  fan_signing: {
    key: 'fan_signing', type: 'career_event', minAge: 18, maxAge: 36, weight: 1,
    title: '粉丝见面会',
    text: '俱乐部安排了一场粉丝见面会。队伍排了三条街，有个孩子举着你的 ID 灯牌。',
    options: [
      { id: 'sign', label: '签到最后一个人', hint: '费体力，好感拉满', outcomes: [
        { prob: 0.85, text: '你签到最后一个人，那个孩子哭了。', effects: { money: 150 } },
        { prob: 0.15, text: '手签抽筋了，训练受了影响。', effects: { tempDelta: -1 } },
      ]},
      { id: 'short', label: '快速走完流程', hint: '省体力', outcomes: [
        { prob: 1, text: '你签完就回了，保存体力。', effects: {} },
      ]},
    ],
  },
  summer_league: {
    key: 'summer_league', type: 'career_event', minAge: 18, maxAge: 24, weight: 1,
    title: '青训选秀大会',
    text: '选秀大会开打，一堆年轻人想在你头上证明自己。',
    options: [
      { id: 'play', label: '上场教育他们', hint: '涨信心，费体力', outcomes: [
        { prob: 0.7, text: '你打爆了对面的新秀，经理点头。', effects: { overallDelta: 1, permanent: true, tempDelta: 1 } },
        { prob: 0.3, text: '被年轻人秀了一脸，有点丢脸。', effects: { tempDelta: -1 } },
      ]},
      { id: 'rest', label: '休息，为新赛季备战', hint: '保留体力', outcomes: [
        { prob: 1, text: '你选择在休赛期打磨自己的技术。', effects: {} },
      ]},
    ],
  },
  national_friendly: {
    key: 'national_friendly', type: 'career_event', minAge: 19, maxAge: 33, weight: 1,
    title: '亚运会集训',
    text: '赛区代表队安排了一轮集训，对手是世界排名靠前的强队。',
    options: [
      { id: 'full', label: '全力以赴', hint: '磨合阵容，为大赛铺路', outcomes: [
        { prob: 0.65, text: '你打出了身价，教练把你写进首发。', effects: { nationalMult: 1.3 } },
        { prob: 0.35, text: '拼得太凶，伤了手腕。', effects: { injury: '手腕扭伤', tempDelta: -1 } },
      ]},
      { id: 'save', label: '留力', hint: '避免受伤', outcomes: [
        { prob: 1, text: '你收着打，教练有点不满。', effects: { nationalMult: 0.85 } },
      ]},
    ],
  },
  veteran_mentor: {
    key: 'veteran_mentor', type: 'career_event', minAge: 28, maxAge: 38, weight: 1,
    title: '老将带新人',
    text: '队里来了个 17 岁的新人，教练让你带他。他看你的眼神，像你当年看偶像。',
    options: [
      { id: 'mentor', label: '认真带他', hint: '他成长，你也稳', outcomes: [
        { prob: 0.8, text: '他把你当大哥，你的训练室地位更稳了。', effects: { roleShift: 1 } },
        { prob: 0.2, text: '他进步太快，开始抢你的时间。', effects: { roleShift: -1 } },
      ]},
      { id: 'own', label: '先管好自己', hint: '专注自己的状态', outcomes: [
        { prob: 0.85, text: '你保住了状态，新人只能自己摸索。', effects: { overallDelta: 1, permanent: true } },
        { prob: 0.15, text: '训练室有人觉得你自私。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  // ---------- 现实选手 & 名场面 ----------
  meme_ranked_queue: {
    key: 'meme_ranked_queue', type: 'career_event', minAge: 16, maxAge: 34, weight: 2,
    title: '排位撞车大主播',
    text: '深夜排位，你撞车了正在直播的传奇选手 {legend}。直播间弹幕瞬间刷屏，全在看你。',
    options: [
      { id: 'try', label: '认真打，carry 他', hint: '赢了涨粉，输了被开会', outcomes: [
        { prob: 0.55, text: '你带着 {legend} 赢下排位，弹幕刷满了「666」。', effects: { overallDelta: 1, permanent: true, money: 300, legacy: `你在排位里和 {legend} 双排，赢了。` } },
        { prob: 0.45, text: '你坑了 {legend}，直播间粉丝把你挂了一晚上。', effects: { tempDelta: -1 } },
      ]},
      { id: 'show', label: '整活', hint: '节目效果拉满', outcomes: [
        { prob: 0.6, text: '你的骚操作让 {legend} 直播笑到破防，粉丝暴涨。', effects: { money: 800, tempDelta: 1, legacy: `你在 {legend} 的直播间贡献了整晚的节目效果。` } },
        { prob: 0.4, text: '整活整成了送分童子，被举报了。', effects: { tempDelta: -1 } },
      ]},
      { id: 'dodge', label: '秒退保分', hint: '不掉分，粉丝失望', outcomes: [
        { prob: 1, text: '你秒退了，直播间一片嘘声。', effects: {} },
      ]},
    ],
  },
  meme_yasuo: {
    key: 'meme_yasuo', type: 'career_event', minAge: 16, maxAge: 35, weight: 1,
    title: '快乐风男队友',
    text: '训练赛里队友锁了亚索，开局 0-5 还发「稳住，我们能赢」。弹幕全在刷快乐。',
    options: [
      { id: 'carry', label: '自己打，别管他', hint: '靠个人能力兜底', outcomes: [
        { prob: 0.6, text: '你一个人带飞全队，亚索最后躺赢了。', effects: { overallDelta: 1, permanent: true, tempDelta: 1 } },
        { prob: 0.4, text: '亚索送得太快，神仙也救不了。', effects: { tempDelta: -1 } },
      ]},
      { id: 'mute', label: '屏蔽，稳住心态', hint: '心态不崩', outcomes: [
        { prob: 0.9, text: '你屏蔽了所有人，专注自己的操作。', effects: { tempDelta: 1 } },
        { prob: 0.1, text: '还是没忍住，公屏互动起来了。', effects: { tempDelta: -2 } },
      ]},
    ],
  },
  meme_flash_wall: {
    key: 'meme_flash_wall', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '闪现撞墙',
    text: '关键局你一波操作想秀翻全场，结果闪现撞墙，送出了大节奏。全网都在做你的集锦。',
    options: [
      { id: 'reply', label: '赛后自嘲回应', hint: '热度拉满，圈粉', outcomes: [
        { prob: 0.7, text: '你在采访里自嘲：这波我给自己打 4396。全网路转粉。', effects: { tempDelta: 1, money: 400, legacy: '你的自嘲成了新的名场面，弹幕都在刷「大心脏」。' } },
        { prob: 0.3, text: '越解释越黑，节奏更大了。', effects: { tempDelta: -2 } },
      ]},
      { id: 'silent', label: '不回应，用表现说话', hint: '专注下一场', outcomes: [
        { prob: 0.8, text: '下一场你打出完美表现，节奏自己散了。', effects: { roleShift: 1 } },
        { prob: 0.2, text: '节奏还是追着你跑。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_reverse_q: {
    key: 'meme_reverse_q', type: 'career_event', minAge: 18, maxAge: 34, weight: 1,
    title: '反向技能',
    text: '决胜局你站了出来，准备终结比赛。技能出手的一瞬间，方向丢反了。全场沉默了。',
    options: [
      { id: 'accept', label: '认了，下一波打回来', hint: '心态稳住', outcomes: [
        { prob: 0.65, text: '五分钟后你一波完美开团洗白自己，弹幕刷「真男人」。', effects: { tempDelta: 2, legacy: '反向技能之后，你用一波团战完成救赎。' } },
        { prob: 0.35, text: '这局回不来了，你成了表情包。', effects: { tempDelta: -1 } },
      ]},
      { id: 'carry', label: '更激进，强行找机会', hint: '高风险高回报', outcomes: [
        { prob: 0.4, text: '你疯狂找机会，硬是把比赛翻了回来。', effects: { overallDelta: 1, permanent: true, roleShift: 1, legacy: '那一箭射向了虚空，但你用行动赢回了尊重。' } },
        { prob: 0.6, text: '越急越送，比赛彻底没了。', effects: { tempDelta: -2, roleShift: -1 } },
      ]},
    ],
  },
  meme_4396: {
    key: 'meme_4396', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '输出没打出来',
    text: '赛后统计出来：你的输出数字低得离谱，成了全网玩梗的素材。评论区一片「4396」。',
    options: [
      { id: 'grind', label: '加练到凌晨', hint: '练成知耻后勇', outcomes: [
        { prob: 0.7, text: '你加练到凌晨四点，下一场输出直接拉满。', effects: { overallDelta: 2, permanent: true, roleShift: 1, legacy: '你用一场完美表现，让「4396」变成了励志梗。' } },
        { prob: 0.3, text: '加练过猛，手腕又不行了。', effects: { injury: '手腕劳损', tempDelta: -1 } },
      ]},
      { id: 'laugh', label: '一笑而过', hint: '心态好，不较真', outcomes: [
        { prob: 0.8, text: '你在直播里笑着说：这数字还挺吉利。粉丝笑翻。', effects: { tempDelta: 1, money: 300 } },
        { prob: 0.2, text: '笑是笑了，训练时还是有点难受。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_lantern: {
    key: 'meme_lantern', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '灯笼没捡起来',
    text: '生死团战，辅助的灯笼就丢在你脚边，你点慢了，被对面集火秒掉。全网都在做这个慢放。',
    options: [
      { id: 'blame', label: '甩锅给辅助', hint: '一时爽，风评变差', outcomes: [
        { prob: 0.5, text: '你说是辅助丢得太远，弹幕直接开团。', effects: { tempDelta: -1, roleShift: -1 } },
        { prob: 0.5, text: '粉丝帮你骂了一晚上，你也没好意思再提。', effects: { tempDelta: -1 } },
      ]},
      { id: 'own', label: '认了，下次注意', hint: '风评好转', outcomes: [
        { prob: 1, text: '你公开承认是自己的失误，评论区全是「真男人」。', effects: { roleShift: 1, legacy: '一个灯笼，让你学会了自省。' } },
      ]},
    ],
  },
  meme_river_god: {
    key: 'meme_river_god', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '河道一打四',
    text: '河道团战，队友全倒。你一个人面对对面四个满血，所有人都以为结束了。',
    options: [
      { id: 'go', label: '回头，一个打四个', hint: '成了封神，死了成梗', outcomes: [
        { prob: 0.35, text: '你反打收割三杀，最后一个追着对面跑。弹幕刷满了「天神下凡」。', effects: { overallDelta: 1, permanent: true, roleShift: 1, legacy: '河道一打四，你的名字被刻进名场面。' } },
        { prob: 0.65, text: '你回头送了，但气势让全场起立。', effects: { tempDelta: -1, legacy: '虽败犹荣，粉丝记住了你的背影。' } },
      ]},
      { id: 'retreat', label: '撤退保 KDA', hint: '稳，但不燃', outcomes: [
        { prob: 1, text: '你走了，保住了数据。弹幕：怂。', effects: {} },
      ]},
    ],
  },
  meme_steal_dragon: {
    key: 'meme_steal_dragon', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '大龙坑前的豪赌',
    text: '对方五个人在打大龙，血量一点点往下掉。你的技能差一秒才好。',
    options: [
      { id: 'steal', label: '闪现进场抢', hint: '抢到封神，没抢到背锅', outcomes: [
        { prob: 0.45, text: '你闪现进场，技能穿墙抢下大龙，对面心态直接爆炸。', effects: { tempDelta: 2, roleShift: 1, legacy: '抢下大龙的那一刻，解说喊出了你的 ID。' } },
        { prob: 0.55, text: '你进场慢了半秒，大龙被收，自己也送了。', effects: { tempDelta: -2 } },
      ]},
      { id: 'ward', label: '插个眼看情况', hint: '求稳', outcomes: [
        { prob: 0.8, text: '你插眼看到对面打完了，选择收线止损。', effects: {} },
        { prob: 0.2, text: '眼位没算好，白送了视野。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_50hp: {
    key: 'meme_50hp', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '基地只剩五十血',
    text: '对方大军压境，自家基地只剩 50 血。所有人都在喊：守住了！',
    options: [
      { id: 'defend', label: '守家，拖住', hint: '守住了就是名场面', outcomes: [
        { prob: 0.5, text: '你守住了水晶，一波反打直接翻盘。全场起立，弹幕刷「教科书级翻盘」。', effects: { tempDelta: 2, roleShift: 1, legacy: '基地五十血翻盘，你的名字写进了教科书。' } },
        { prob: 0.5, text: '水晶还是碎了，但你守了整整四十秒。', effects: { tempDelta: -1, legacy: '虽败，但那四十秒让人记住了你。' } },
      ]},
      { id: 'give', label: '放弃，准备下一局', hint: '保存体力', outcomes: [
        { prob: 1, text: '你点了投降，弹幕骂了一晚上。', effects: { roleShift: -1 } },
      ]},
    ],
  },
  meme_legend_duel: {
    key: 'meme_legend_duel', type: 'career_event', minAge: 18, maxAge: 34, weight: 2,
    title: '对位传奇选手',
    text: '世界赛你撞上了那位传奇选手 {legend}。全场都在喊他的名字，摄像头给了你三秒特写。',
    options: [
      { id: 'duel', label: '正面硬刚，单杀他', hint: '成了封神，砸了成背景板', outcomes: [
        { prob: 0.4, text: '你对线单杀 {legend}，解说破音，弹幕刷「新王登基」。', effects: { overallDelta: 2, permanent: true, roleShift: 2, legacy: `你单杀了 {legend}。` } },
        { prob: 0.6, text: '你被 {legend} 教育了，成了名场面背景板。', effects: { tempDelta: -2 } },
      ]},
      { id: 'stable', label: '稳住发育，等团战', hint: '不冒险，团队致胜', outcomes: [
        { prob: 0.65, text: '你没给他单杀机会，团战里赢了比赛。', effects: { tempDelta: 1, legacy: `你和 {legend} 的对局，你赢了比赛。` } },
        { prob: 0.35, text: '稳是稳了，但队友没稳住。', effects: {} },
      ]},
      { id: 'respect', label: '赛后要签名', hint: '追星成功', outcomes: [
        { prob: 1, text: '赛后你找 {legend} 要了签名。他说：下次场上见。', effects: { roleShift: 1, legacy: `你和 {legend} 交换了队服。` } },
      ]},
    ],
  },
  meme_reverse_sweep: {
    key: 'meme_reverse_sweep', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '让二追三',
    text: 'BO5 连输两局，休息室里一片死寂。教练看着你：下一局，你拿什么？',
    options: [
      { id: 'rally', label: '站出来鼓舞全队', hint: '士气大涨，可能逆转', outcomes: [
        { prob: 0.5, text: '你把队友骂醒，第三局起连扳三局，让二追三！', effects: { tempDelta: 2, roleShift: 1, legacy: '让二追三，你们成了季后赛的传说。' } },
        { prob: 0.5, text: '鸡汤没用，第三局还是输了，提前回家。', effects: { tempDelta: -1 } },
      ]},
      { id: 'silent', label: '不说话，用操作说话', hint: '专注自己', outcomes: [
        { prob: 0.55, text: '你第三局直接超神，带着全队连扳三局。', effects: { tempDelta: 2, legacy: '让二追三，你一个人扛着全队走了回来。' } },
        { prob: 0.45, text: '沉默没有传染给队友，系列赛结束。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_ward: {
    key: 'meme_ward', type: 'career_event', minAge: 18, maxAge: 34, weight: 1,
    title: '草丛蹲人',
    text: '你在草丛里蹲了四十秒，蹲到一个路过的传奇选手 {legend}。他完全没察觉。',
    options: [
      { id: 'ambush', label: '一套带走', hint: '成了集锦，跑了白蹲', outcomes: [
        { prob: 0.65, text: '你一套技能秒了 {legend}，他愣在原地打出了问号。', effects: { tempDelta: 2, legacy: `你在草丛里蹲了 {legend} 四十秒，一击必杀。` } },
        { prob: 0.35, text: '技能交早了，{legend} 反手把你秒了。', effects: { tempDelta: -1 } },
      ]},
      { id: 'back', label: '草丛回家', hint: '省时间', outcomes: [
        { prob: 1, text: '你选择了 B 键回家，白蹲。', effects: {} },
      ]},
    ],
  },
  meme_take_disciple: {
    key: 'meme_take_disciple', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '收徒风波',
    text: '你打爆了对面的明星选手 {legend}，赛后采访有人起哄：表演个魔法，收个徒弟呗。',
    options: [
      { id: 'accept', label: '当场整活：不收徒', hint: '节目效果拉满，全网玩梗', outcomes: [
        { prob: 0.7, text: '你对着镜头说「不收徒」，{legend} 的粉丝和你家粉丝一起笑疯。', effects: { tempDelta: 1, money: 500, legacy: '「表演个魔法，不收徒」成了你的专属梗。' } },
        { prob: 0.3, text: '梗玩脱了，{legend} 粉丝觉得你在羞辱他。', effects: { tempDelta: -1 } },
      ]},
      { id: 'teach', label: '认真教学', hint: '以德服人', outcomes: [
        { prob: 0.8, text: '你赛后真的给 {legend} 讲了两小时细节，双方粉丝和解。', effects: { roleShift: 1, legacy: `你收了 {legend} 这个「徒弟」，不打不相识。` } },
        { prob: 0.2, text: '教学视频被剪成「装 X」合集。', effects: { tempDelta: -1 } },
      ]},
      { id: 'skip', label: '不回应，离场', hint: '低调', outcomes: [
        { prob: 1, text: '你没接梗，直接走人，热搜还是没放过你。', effects: {} },
      ]},
    ],
  },
  meme_comfort: {
    key: 'meme_comfort', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '舒服了',
    text: '赛后队内语音被放出来，你一句「我让队友很舒服」，全网都舒服了。',
    options: [
      { id: 'ride', label: '顺水推舟玩梗', hint: '热度拉满', outcomes: [
        { prob: 0.75, text: '你下场采访接着玩：我也挺舒服的。弹幕直接破防。', effects: { tempDelta: 1, money: 400, legacy: '「我让队友很舒服」成了你的队内名言。' } },
        { prob: 0.25, text: '玩梗太多，被剪辑成「车神」合集。', effects: { tempDelta: -1 } },
      ]},
      { id: 'explain', label: '解释：我说的是战术', hint: '越描越黑', outcomes: [
        { prob: 0.5, text: '你解释了三分钟，评论区笑得更欢了。', effects: { money: 200 } },
        { prob: 0.5, text: '解释失败，粉丝开始刷屏「懂的都懂」。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_zero22: {
    key: 'meme_zero22', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '0-22 之夜',
    text: '你打出一场 0-22 的比赛，粉丝举着应援牌站在基地门口，写满了你的 ID。',
    options: [
      { id: 'grind', label: '通宵加练', hint: '触底反弹', outcomes: [
        { prob: 0.65, text: '你练到天亮，下一场直接超神，应援牌变成了真香现场。', effects: { overallDelta: 2, permanent: true, roleShift: 1, legacy: '0-22 之后，你用一场完美表现完成救赎。' } },
        { prob: 0.35, text: '越想证明自己，越急，下一场又崩了。', effects: { tempDelta: -2 } },
      ]},
      { id: 'report', label: '举报对面演员', hint: '整活回应', outcomes: [
        { prob: 0.5, text: '你晒出举报截图，弹幕狂刷「输不起」。', effects: { tempDelta: -1, money: 300 } },
        { prob: 0.5, text: '官方查无此事，你成了新的梗。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_seventeen: {
    key: 'meme_seventeen', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '十七强',
    text: '世界赛瑞士轮你们 0-3 出局，网友给你封了个「十七强」，比十六强还多一强。',
    options: [
      { id: 'laugh', label: '自嘲回应', hint: '心态好，圈粉', outcomes: [
        { prob: 0.7, text: '你在采访里说：十七强也是强。全网路转粉。', effects: { tempDelta: 1, money: 300, legacy: '「十七强也是强」成了你的名场面。' } },
        { prob: 0.3, text: '自嘲没接住，评论区更凶了。', effects: { tempDelta: -1 } },
      ]},
      { id: 'grind', label: '闷头苦练一个休赛期', hint: '用成绩说话', outcomes: [
        { prob: 0.6, text: '下赛季你直接带队夺冠，十七强的梗变成了励志故事。', effects: { overallDelta: 2, permanent: true, roleShift: 2 } },
        { prob: 0.4, text: '练是练了，成绩还是上不去。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_ninefold: {
    key: 'meme_ninefold', type: 'career_event', minAge: 18, maxAge: 35, weight: 1,
    title: '九折水瓶',
    text: '赛后采访你说对手「就这水平」，结果被做成「九折水瓶」的梗，全网都在回旋镖你。',
    options: [
      { id: 'prove', label: '用实力兑现', hint: '打脸成功封神', outcomes: [
        { prob: 0.5, text: '下一场你正面打爆对面，回旋镖全弹回黑粉脸上。', effects: { overallDelta: 1, permanent: true, roleShift: 1, legacy: '「就这水平」——你亲手把梗变成了事实。' } },
        { prob: 0.5, text: '你被打爆了，回旋镖正中眉心。', effects: { tempDelta: -2 } },
      ]},
      { id: 'mute', label: '装死，专注比赛', hint: '等风头过去', outcomes: [
        { prob: 0.8, text: '你不再回应，用连胜让梗自己过期。', effects: { roleShift: 1 } },
        { prob: 0.2, text: '你越想低调，弹幕刷得越凶。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
  meme_turntable: {
    key: 'meme_turntable', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '陀螺成精',
    text: '你被对面单杀后原地转圈的名场面被做成了鬼畜视频，全网都在刷「陀螺」。',
    options: [
      { id: 'spin', label: '顺着玩：下把赢了我再转一圈', hint: '整活回应，热度爆炸', outcomes: [
        { prob: 0.6, text: '你真的赢下下一场，赛后原地转了一圈，弹幕彻底疯了。', effects: { tempDelta: 2, money: 500, legacy: '赢下比赛后你原地转圈，全网都在喊「陀螺成精」。' } },
        { prob: 0.4, text: '下一场又输了，转圈的鬼畜素材 +1。', effects: { tempDelta: -1 } },
      ]},
      { id: 'slay', label: '用单杀回应', hint: '用实力说话', outcomes: [
        { prob: 0.65, text: '下一场你对线单杀对面两次，弹幕从「陀螺」变成「陀螺战神」。', effects: { overallDelta: 1, permanent: true, roleShift: 1, legacy: '「陀螺战神」——你用操作把黑称打成了美称。' } },
        { prob: 0.35, text: '越想证明自己越急，又被单杀了。', effects: { tempDelta: -2 } },
      ]},
    ],
  },
  meme_baobi: {
    key: 'meme_baobi', type: 'career_event', minAge: 18, maxAge: 35, weight: 2,
    title: '暴毙现场',
    text: '决胜团你闪现进场想收割，结果当场「暴毙」，对面反打一波翻盘。弹幕炸了。',
    options: [
      { id: 'bold', label: '下次还敢', hint: '莽夫人设，节目效果', outcomes: [
        { prob: 0.5, text: '下一场你同样闪现进场，这次收割成功，弹幕从「暴毙」变成「勇」。', effects: { tempDelta: 2, roleShift: 1, legacy: '「下次还敢」——你用一波同样的操作证明了自己。' } },
        { prob: 0.5, text: '同样的位置又暴毙一次，你被做成了连续剧。', effects: { tempDelta: -1 } },
      ]},
      { id: 'stable', label: '收敛，先保命', hint: '稳了，但少了点味道', outcomes: [
        { prob: 0.8, text: '你学会先活下来再输出，队伍连胜。', effects: { roleShift: 1 } },
        { prob: 0.2, text: '稳过头了，成了「地缚灵」的新素材。', effects: { tempDelta: -1 } },
      ]},
    ],
  },
};

// 决胜事件（特殊屏）
export const SHOWDOWNS = {
  last_shot: {
    key: 'last_shot', type: 'showdown', title: '最后一波团战',
    text: '远古龙魂刷新，双方在中路河道对峙。你们落后 2000 经济，这一波团，定生死。',
    options: [
      { id: 'three', label: '绕后开团', hint: '开到 C 位直接封神，没开到就没了', successText: '你绕后开到对面双 C，一波团灭，水晶爆炸！', failText: '绕后被发现，你被集火秒掉，队伍崩盘。' },
      { id: 'drive', label: '正面输出', hint: '更稳，但要看队友', successText: '你在团战里打出成吨伤害，对面溃败！', failText: '正面被分割，输出没打出来，团灭。' },
      { id: 'pass', label: '保后排，等对面失误', hint: '相信队友，稳中求胜', successText: '你护住后排，对面先手失败，反打成功！', failText: '等得太久，对面拿到龙魂，局势彻底没了。' },
    ],
  },
  free_throw: {
    key: 'free_throw', type: 'showdown', title: '远古巨龙争夺',
    text: '远古巨龙只剩最后一丝血，对方打野已经交掉惩戒。你的惩戒差 0.5 秒转好。',
    options: [
      { id: 'calm', label: '卡准时间抢龙', hint: '按平时的节奏来', successText: '你卡着时间抢下远古龙，全队带着龙魂推平基地！', failText: '差了一点点，龙被对面惩戒收掉。' },
      { id: 'quick', label: '提前交技能', hint: '不给对面反应机会', successText: '你提前交技能抢到龙，干净利落！', failText: '技能交早了，龙被收，你人也交代了。' },
    ],
  },
  adc_showdown: {
    key: 'adc_showdown', type: 'showdown', title: '团战输出位',
    text: '远古龙魂团，你是全队唯一的持续输出。对面刺客已经在绕后了，你必须活下来。',
    options: [
      { id: 'position', label: '卡住安全位置输出', hint: '稳住输出，赢下团战', successText: '你站住了输出位，团战收割三杀，一波带走！', failText: '位置被绕后抓到，你先倒了，团战溃败。' },
      { id: 'kite', label: '拉扯风筝', hint: '边打边退，磨死对面', successText: '你拉扯到底，对面追不上你，被活活耗死！', failText: '拉扯失误，被闪现强开，比赛没了。' },
    ],
  },
  mid_showdown: {
    key: 'mid_showdown', type: 'showdown', title: '中路对决',
    text: '决胜局，你和对面中单在河道遭遇。两边打野都在往这里赶，这一波决定系列赛。',
    options: [
      { id: 'duel', label: '单杀对面中单', hint: '赢了封神，输了背锅', successText: '你一套技能单杀对面中单，顺势拿龙，比赛结束！', failText: '技能空了，被反杀，节奏全丢。' },
      { id: 'roam', label: '清线后游走包下', hint: '带动全场', successText: '你清完线游走包下，三包二打出大节奏！', failText: '游走路线被眼位看见，白跑一趟还丢线。' },
    ],
  },
  top_showdown: {
    key: 'top_showdown', type: 'showdown', title: '上单单带',
    text: '决胜局，你们正面僵持。你带着兵线已经摸到对面二塔，对面只有一个人回来守。',
    options: [
      { id: 'split', label: '继续带线偷家', hint: '牵制对面，逼他们回防', successText: '你一路带穿，逼得对面回防，正面顺势拿龙，一波结束！', failText: '带线太深被抓，正面四打五崩盘。' },
      { id: 'tp', label: 'TP 绕后开团', hint: '正面打团，你从后面进场', successText: '你 TP 绕后秒掉对面 C 位，正面团战大胜！', failText: 'TP 位置被发现，落地被集火，团灭。' },
    ],
  },
  sup_showdown: {
    key: 'sup_showdown', type: 'showdown', title: '辅助决胜手',
    text: '远古龙魂团前，你们视野落后。你是全队唯一的开团和保排核心。',
    options: [
      { id: 'ward', label: '抢视野布控', hint: '把地图点亮，等对面犯错', successText: '你排掉对面眼位，视野压制，对面草丛蹲人反被开，一波带走！', failText: '排眼被蹲，你先倒了，队伍失去开团手。' },
      { id: 'engage', label: '先手开团', hint: '把团开起来，赌一波', successText: '你精准开到对面 C 位，队友跟上收割，拿下比赛！', failText: '开团开空，技能全交，被反打团灭。' },
    ],
  },
  game7: {
    key: 'game7', type: 'showdown', title: 'BO5 决胜局',
    text: 'BO5 打到第五局，对面先拿两条龙。教练问你：最后这局，拿什么英雄。',
    options: [
      { id: 'iso', label: '拿绝活英雄', hint: '把队伍扛在自己肩上', successText: '你的绝活英雄统治全场，晋级下一轮！', failText: '绝活被对面研究透了，全程被压。' },
      { id: 'screen', label: '相信阵容体系', hint: '相信团队战术', successText: '体系打成了，你助攻队友拿下关键团！', failText: '体系被识破，节奏全无。' },
    ],
  },
  qualifier_showdown: {
    key: 'qualifier_showdown', type: 'showdown', title: '冒泡赛生死战',
    text: '世界赛名额只剩最后一个，冒泡赛最后一局，你们被逼到悬崖边上。最后 20 秒，你拿到大龙。',
    options: [
      { id: 'aggressive', label: '放手一搏，一波', hint: '高风险高回报', successText: '你带队一波推平基地，世界赛门票到手！', failText: '一波没推下来，被反打，出局。' },
      { id: 'steady', label: '稳扎稳打，拿龙魂', hint: '打成功率', successText: '你冷静地拿下龙魂，慢慢磨死了对面，出线！', failText: '节奏太慢，被对面找到机会翻盘。' },
    ],
  },
  world_cup_showdown: {
    key: 'world_cup_showdown', type: 'showdown', title: '全球总决赛决胜局',
    text: '全球总决赛决赛，BO5 打到第五局，你们落后 3000 经济。这是你生涯最重要的一局。',
    options: [
      { id: 'hero', label: '自己来', hint: '英雄或罪人', successText: '你打出了生涯最伟大的表现，捧起召唤师奖杯！', failText: '关键团操作失误，你的世界赛结束了。' },
      { id: 'team', label: '相信团队', hint: '打出战术配合', successText: '你送出致命控制，队友收割，冠军到手！', failText: '战术被识破，时间耗尽。' },
    ],
  },
};

// 告别风格
export const FAREWELL_STYLES = [
  { id: 'ceremony', label: '办退役仪式，跟粉丝好好告别', hint: '全场为你起立' },
  { id: 'quiet', label: '不办，安静地离开', hint: '低调挂靴' },
  { id: 'social', label: '开一场直播宣布退役', hint: '全网刷屏' },
];

export const GOODBYE_STYLES = [
  { id: 'press', label: '开个发布会，把话说完', hint: '体面收场' },
  { id: 'quiet', label: '不解释，潇洒地离开', hint: '深藏功与名' },
  { id: 'note', label: '发一条消息就够了', hint: '简单告别' },
];

export const WALKAWAY_STYLES = [
  { id: 'press', label: '开个发布会，把话说完', hint: '体面收场' },
  { id: 'quiet', label: '不要仪式，不要致辞。打完这一季就走', hint: '默默离开' },
];
