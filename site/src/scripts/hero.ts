/* ===========================================================================
   明戸杯2026 ─ ホーム ヒーロー WebGL 演出
   ・麻雀牌がゆっくり舞う／金の粒子／紅葉（もみじ・銀杏）
   ・prefers-reduced-motion / WebGL非対応 の場合は静止表示にフォールバック
   =========================================================================== */
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const TILE_FACES = ['東', '南', '西', '北', '中', '發', '白', '一萬', '九萬', '五筒', '三索', '發'];

/** 麻雀牌の表面テクスチャを Canvas で生成 */
function makeTileTexture(face: string): THREE.CanvasTexture {
  const w = 256;
  const h = 340;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const g = cv.getContext('2d')!;

  // 牌面（生成り）
  const grad = g.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#fdfaf1');
  grad.addColorStop(1, '#e9e2d0');
  g.fillStyle = grad;
  g.fillRect(0, 0, w, h);

  // 「白」は日本麻雀の白牌＝完全な無地（内枠も描かない）
  if (face === '白') return finishTexture(cv);

  // 内枠（角丸ボックスのUVは端が丸みに回り込むため内側に余白をとる）
  g.strokeStyle = 'rgba(120,110,95,.35)';
  g.lineWidth = 4;
  g.strokeRect(30, 28, w - 60, h - 56);

  g.textAlign = 'center';
  g.textBaseline = 'middle';

  if (face === '五筒') {
    // 筒子（5筒）
    const dots: [number, number, string][] = [
      [-1, -1, '#1b6fb5'], [1, -1, '#0e7c6e'],
      [0, 0, '#c8103c'],
      [-1, 1, '#0e7c6e'], [1, 1, '#1b6fb5'],
    ];
    for (const [dx, dy, col] of dots) {
      const cx = w / 2 + dx * 56;
      const cy = h / 2 + dy * 74;
      g.beginPath();
      g.arc(cx, cy, 27, 0, Math.PI * 2);
      g.fillStyle = col;
      g.fill();
      g.beginPath();
      g.arc(cx, cy, 13, 0, Math.PI * 2);
      g.fillStyle = '#fdfaf1';
      g.fill();
    }
  } else if (face === '三索') {
    // 索子（3索）
    const bars: [number, number][] = [[0, -86], [-48, 55], [48, 55]];
    for (const [dx, dy] of bars) {
      const cx = w / 2 + dx;
      const cy = h / 2 + dy;
      g.fillStyle = '#0e7c6e';
      g.fillRect(cx - 10, cy - 47, 20, 94);
      g.fillStyle = '#c8103c';
      g.beginPath();
      g.arc(cx, cy, 13, 0, Math.PI * 2);
      g.fill();
    }
  } else if (face.length === 2) {
    // 数牌（萬子）
    g.fillStyle = '#c8103c';
    g.font = '700 106px "Shippori Mincho B1", serif';
    g.fillText(face[0]!, w / 2, h * 0.34);
    g.fillStyle = '#2b2b2b';
    g.font = '700 106px "Shippori Mincho B1", serif';
    g.fillText(face[1]!, w / 2, h * 0.67);
  } else {
    // 字牌
    g.fillStyle = face === '中' ? '#c8103c' : face === '發' ? '#0e7c6e' : '#2b2b2b';
    g.font = '700 152px "Shippori Mincho B1", serif';
    g.fillText(face, w / 2, h / 2 + 8);
  }

  return finishTexture(cv);
}

/** Canvas から Three のテクスチャを作る共通処理 */
function finishTexture(cv: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** 紅葉（もみじ／銀杏）テクスチャ。秋らしい紅〜橙〜金のグラデーションで描く */
function makeLeafTexture(kind: 'momiji' | 'icho', color: string, edge: string): THREE.CanvasTexture {
  const s = 160;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const g = cv.getContext('2d')!;
  g.translate(s / 2, s / 2);

  const grad = g.createLinearGradient(0, -s / 2, 0, s / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(1, edge);

  if (kind === 'momiji') {
    // もみじ：5枚の切れ込みのある葉
    g.fillStyle = grad;
    g.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.62;
      const len = i === 2 ? 62 : i === 1 || i === 3 ? 56 : 44;
      const wide = 0.2;
      g.moveTo(0, 8);
      g.lineTo(Math.cos(a - wide) * len * 0.62, Math.sin(a - wide) * len * 0.62);
      g.lineTo(Math.cos(a) * len, Math.sin(a) * len);
      g.lineTo(Math.cos(a + wide) * len * 0.62, Math.sin(a + wide) * len * 0.62);
      g.closePath();
    }
    g.fill();
    // 葉柄
    g.strokeStyle = edge;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(0, 8);
    g.lineTo(0, 46);
    g.stroke();
    // 葉脈
    g.strokeStyle = 'rgba(255,255,255,.32)';
    g.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.62;
      const len = i === 2 ? 54 : i === 1 || i === 3 ? 48 : 38;
      g.beginPath();
      g.moveTo(0, 6);
      g.lineTo(Math.cos(a) * len, Math.sin(a) * len);
      g.stroke();
    }
  } else {
    // 銀杏：扇形の葉
    g.fillStyle = grad;
    g.beginPath();
    g.moveTo(0, 34);
    g.arc(0, 34, 56, -Math.PI * 0.86, -Math.PI * 0.14);
    g.closePath();
    g.fill();
    // 中央の切れ込み
    g.globalCompositeOperation = 'destination-out';
    g.beginPath();
    g.moveTo(0, 34);
    g.lineTo(-7, -14);
    g.lineTo(7, -14);
    g.closePath();
    g.fill();
    g.globalCompositeOperation = 'source-over';
    g.strokeStyle = edge;
    g.lineWidth = 4;
    g.beginPath();
    g.moveTo(0, 34);
    g.lineTo(0, 62);
    g.stroke();
  }

  return finishTexture(cv);
}

/**
 * 舞い散る葉のバリエーション（紅→橙→金）。
 *
 * 「楓だけの方が秋らしい」というご意見を受けて、銀杏（icho）は停止しています。
 * 銀杏を戻したい場合は、末尾のコメントアウトを外してください
 * （描画側の makeLeafTexture は icho にも対応したままです）。
 * 銀杏が担っていた金〜山吹の色みは、楓側の 4・5 番目で補っています。
 */
const LEAF_VARIANTS: Array<['momiji' | 'icho', string, string]> = [
  ['momiji', '#e8434a', '#a3122a'],
  ['momiji', '#f07a2a', '#c2431a'],
  ['momiji', '#d4232f', '#7d0722'],
  ['momiji', '#f0a93a', '#c2701a'],
  ['momiji', '#e8c34a', '#c99a1c'],
  ['momiji', '#ff9a4d', '#d4512a'],
  // --- 銀杏（停止中。戻す場合はこの2行のコメントを外す）---
  // ['icho', '#f5c542', '#c98c1c'],
  // ['icho', '#ffd97a', '#d9a441'],
];

/** 丸いソフト粒子テクスチャ */
function makeSparkTexture(): THREE.CanvasTexture {
  const s = 64;
  const cv = document.createElement('canvas');
  cv.width = cv.height = s;
  const g = cv.getContext('2d')!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, 'rgba(255,246,214,1)');
  grad.addColorStop(0.35, 'rgba(242,216,155,.8)');
  grad.addColorStop(1, 'rgba(242,216,155,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

type Floater = {
  mesh: THREE.Object3D;
  spin: THREE.Vector3;
  rise: number;
  sway: number;
  phase: number;
  baseX: number;
};

export function initHero(canvas: HTMLCanvasElement): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    canvas.closest('.hero')?.classList.add('no-webgl');
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x8e0a28, 0.018);

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 200);
  camera.position.set(0, 0, 26);

  /* --- ライティング --- */
  scene.add(new THREE.AmbientLight(0xfff1e0, 2.2));
  const key = new THREE.DirectionalLight(0xfff4e2, 3.1);
  key.position.set(6, 10, 12);
  scene.add(key);
  const rim = new THREE.PointLight(0xffb0a0, 140, 90);
  rim.position.set(-14, -6, 10);
  scene.add(rim);
  const tealLight = new THREE.PointLight(0x6fe0cf, 90, 80);
  tealLight.position.set(16, 8, -6);
  scene.add(tealLight);

  const floaters: Floater[] = [];
  const disposables: { dispose(): void }[] = [];

  /* --- 麻雀牌 --- */
  // 角張らないよう全面を角丸に（BoxGeometry を継承しているので面ごとのマテリアル指定が使える）
  const tileGeo = new RoundedBoxGeometry(1.5, 2, 0.85, 5, 0.2);
  disposables.push(tileGeo);

  const sideMat = new THREE.MeshStandardMaterial({ color: 0xf3ecdb, roughness: 0.55, metalness: 0.05 });
  const backMat = new THREE.MeshStandardMaterial({ color: 0x0e7c6e, roughness: 0.4, metalness: 0.12 });
  disposables.push(sideMat, backMat);

  const faceTextures = TILE_FACES.map(makeTileTexture);
  faceTextures.forEach((t) => disposables.push(t));

  const TILE_COUNT = 22;
  for (let i = 0; i < TILE_COUNT; i++) {
    const tex = faceTextures[i % faceTextures.length]!;
    const faceMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5, metalness: 0.04 });
    disposables.push(faceMat);
    // Box の面順: +x, -x, +y, -y, +z, -z
    const mesh = new THREE.Mesh(tileGeo, [sideMat, sideMat, sideMat, sideMat, faceMat, backMat]);

    const r = 9.5 + Math.random() * 10;
    const a = Math.random() * Math.PI * 2;
    mesh.position.set(Math.cos(a) * r * 1.5, (Math.random() - 0.5) * 28, -4 - Math.random() * 18);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    const s = 0.7 + Math.random() * 0.72;
    mesh.scale.setScalar(s);
    scene.add(mesh);

    floaters.push({
      mesh,
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.16, (Math.random() - 0.5) * 0.2, (Math.random() - 0.5) * 0.1),
      rise: 0.5 + Math.random() * 0.7,
      sway: 0.6 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      baseX: mesh.position.x,
    });
  }

  /* --- 紅葉（もみじ・銀杏） --- */
  const leafGeo = new THREE.PlaneGeometry(1, 1);
  disposables.push(leafGeo);
  const leafMats = LEAF_VARIANTS.map(([kind, color, edge]) => {
    const tex = makeLeafTexture(kind, color, edge);
    const mat = new THREE.MeshBasicMaterial({
      map: tex, transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide,
    });
    disposables.push(tex, mat);
    return mat;
  });

  for (let i = 0; i < 30; i++) {
    const mesh = new THREE.Mesh(leafGeo, leafMats[i % leafMats.length]!);
    mesh.position.set((Math.random() - 0.5) * 46, (Math.random() - 0.5) * 32, -2 - Math.random() * 20);
    // ほぼ正面を向かせつつ、ゆるやかに傾ける（真横を向いて消えないように）
    mesh.rotation.set((Math.random() - 0.5) * 0.9, (Math.random() - 0.5) * 0.9, Math.random() * Math.PI * 2);
    mesh.scale.setScalar(1.1 + Math.random() * 1.5);
    scene.add(mesh);
    floaters.push({
      mesh,
      // 落ち葉らしく、ひらひらと軸回転しながら舞い降りる
      spin: new THREE.Vector3((Math.random() - 0.5) * 0.35, (Math.random() - 0.5) * 0.55, (Math.random() - 0.5) * 0.8),
      rise: -(0.45 + Math.random() * 0.7),
      sway: 1.6 + Math.random() * 2.2,
      phase: Math.random() * Math.PI * 2,
      baseX: mesh.position.x,
    });
  }

  /* --- 金の粒子 --- */
  const SPARKS = 420;
  const pos = new Float32Array(SPARKS * 3);
  const sizes = new Float32Array(SPARKS);
  for (let i = 0; i < SPARKS; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 56;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 38;
    pos[i * 3 + 2] = -Math.random() * 32;
    sizes[i] = 0.1 + Math.random() * 0.32;
  }
  const sparkGeo = new THREE.BufferGeometry();
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  sparkGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  const sparkTex = makeSparkTexture();
  const sparkMat = new THREE.PointsMaterial({
    size: 0.42,
    map: sparkTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    opacity: 0.85,
    color: 0xf2d89b,
  });
  disposables.push(sparkGeo, sparkTex, sparkMat);
  const sparks = new THREE.Points(sparkGeo, sparkMat);
  scene.add(sparks);

  /* --- リサイズ --- */
  const resize = () => {
    const el = canvas.parentElement ?? canvas;
    const w = el.clientWidth || window.innerWidth;
    const h = el.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // 縦長画面では画角を広げて牌が寄りすぎないように
    camera.fov = w / h < 0.85 ? 66 : 48;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas.parentElement ?? canvas);

  /* --- マウスパララックス --- */
  const target = { x: 0, y: 0 };
  const cur = { x: 0, y: 0 };
  const onPointer = (e: PointerEvent) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  /* --- ループ --- */
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = true;
  const onVis = () => {
    visible = !document.hidden;
    if (visible) clock.getDelta(); // たまったdeltaを捨てる
  };
  document.addEventListener('visibilitychange', onVis);

  const Y_LIMIT = 17;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    if (!visible) return;

    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    const speed = reduced ? 0.12 : 1;

    for (const f of floaters) {
      const m = f.mesh;
      m.rotation.x += f.spin.x * dt * speed;
      m.rotation.y += f.spin.y * dt * speed;
      m.rotation.z += f.spin.z * dt * speed;
      m.position.y += f.rise * dt * speed;
      m.position.x = f.baseX + Math.sin(t * 0.35 + f.phase) * f.sway;

      if (f.rise > 0 && m.position.y > Y_LIMIT) m.position.y = -Y_LIMIT;
      if (f.rise < 0 && m.position.y < -Y_LIMIT) m.position.y = Y_LIMIT;
    }

    sparks.rotation.y = t * 0.012 * speed;
    sparks.position.y = Math.sin(t * 0.16) * 0.8;

    cur.x += (target.x - cur.x) * 0.045;
    cur.y += (target.y - cur.y) * 0.045;
    camera.position.x = cur.x * 2.4;
    camera.position.y = -cur.y * 1.6;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  };
  tick();

  /* --- 後片付け --- */
  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    document.removeEventListener('visibilitychange', onVis);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
