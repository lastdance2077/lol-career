// 浏览器冒烟测试：用系统 Chrome + playwright-core 跑完整流程并截图
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'file:///C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core/index.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const PORT = 8766;
const OUT = path.join(ROOT, 'test', 'shots');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  const file = path.join(ROOT, urlPath);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

fs.mkdirSync(OUT, { recursive: true });

const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

async function main() {
  await new Promise(r => server.listen(PORT, r));
  const browser = await chromium.launch({
    executablePath: fs.existsSync(chromePath) ? chromePath : edgePath,
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });

  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.home-title');
  await page.screenshot({ path: path.join(OUT, '1-home.png') });
  console.log('home ok:', await page.textContent('.home-title'));

  // 建档
  await page.click('text=开始生涯');
  await page.waitForSelector('.name-input');
  await page.fill('.name-input', '峡谷测试员');
  await page.click('text=中单');
  await page.click('.team-select >> nth=0');
  await page.selectOption('.team-select >> nth=0', { index: 2 });
  await page.click('text=开始生涯');
  await page.waitForSelector('.banner, .option, .event-card');
  await page.screenshot({ path: path.join(OUT, '2-career-start.png') });
  console.log('career start ok');

  // 推进生涯：决策选第一个选项，横幅点继续
  let clicks = 0;
  let decisions = 0;
  let sawSummary = false;
  while (clicks < 2500) {
    const isSummary = await page.locator('.sum-hero').count();
    if (isSummary) { sawSummary = true; break; }
    const option = page.locator('.option').first();
    if (await option.count()) {
      await option.click();
      decisions++;
    } else {
      await page.click('.banner, .receipt, .empty');
      clicks++;
    }
    await page.waitForTimeout(20);
  }
  if (!sawSummary) throw new Error('未走到结算页');
  await page.screenshot({ path: path.join(OUT, '3-summary.png') });
  console.log('summary ok, decisions =', decisions);

  // 分享图
  await page.click('text=分享战绩卡');
  await page.waitForSelector('.share-preview', { timeout: 8000 });
  await page.screenshot({ path: path.join(OUT, '4-share.png') });
  console.log('share ok');

  // 档案 & 图鉴
  await page.click('.modal .btn-ghost');
  await page.click('text=返回历史档案');
  await page.waitForSelector('.archive-item');
  await page.screenshot({ path: path.join(OUT, '5-archive.png') });
  await page.click('text=← 返回');
  await page.click('text=称号图鉴');
  await page.waitForSelector('.gallery-grid');
  await page.screenshot({ path: path.join(OUT, '6-gallery.png') });
  console.log('archive & gallery ok');

  if (errors.length) {
    console.log('页面错误：');
    errors.slice(0, 10).forEach(e => console.log(' -', e));
    throw new Error('存在页面错误');
  }
  await browser.close();
  server.close();
  console.log('smoke passed');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
