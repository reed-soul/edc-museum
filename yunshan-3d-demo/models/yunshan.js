// ============================================================
// EDC 数字博物馆 · 模型配置（F2 把玩参数配置化）
// 每款 EDC 一个配置文件，字段即"这款玩具有什么参数"。
// 新增一款：复制本文件改 meta/model/play/audio/camera 即可，
// 无需修改 index.html 的代码逻辑。
// ============================================================

export const yunshanConfig = {
  meta: {
    id: 'kovo-yunshan',
    name: '开物KOVO 云闪',
    category: '复合推牌',
    version: '0.3.0'
  },

  // ---- 模型几何与材质 ----
  model: {
    // 产品整体抬升高度（展台上）
    productY: 0.65,

    // 扁胶囊壳体（LatheGeometry：胶囊轮廓旋转 + 截面压扁）
    shell: {
      halfLength: 2.6,        // 胶囊直线段半长
      radius: 0.95,           // 胶囊半径（宽/高由半径决定）
      outlineSegments: 14,
      segments: 48,
      squash: 0.5,            // 截面压扁系数（Z 方向）
      color: 0xe0501c,
      roughness: 0.30,
      metalness: 0.02,
      opacity: 0.55,          // 半透明 PEI
      transmission: 0.35,
      clearcoat: 0.8,
      clearcoatRoughness: 0.2,
      bumpScale: 0.65,        // 涟漪纹理强度
      ripple: { rings: 20, start: 20, gap: 25, lineWidthBase: 4, grains: 260 }
    },

    // 贯穿轨道杆
    rod: {
      length: 6.6, radius: 0.1, y: 0.1,
      color: 0xe0a83c, roughness: 0.25, metalness: 0.9
    },

    // 金属饰条 + 刻字
    strip: {
      length: 6.5, width: 0.34, depth: 0.16, y: 0.68, z: 0.5,
      color: 0x8f959c, roughness: 0.22, metalness: 0.95,
      text: 'KOVO · 云闪',
      textPlate: { width: 6.2, height: 0.62, z: 0.605 }
    },

    // 内滑块（套在轨道杆上）
    slider: {
      radius: 0.4, length: 0.68, y: 0.1,
      color: 0xff7a3c, roughness: 0.3, metalness: 0.2,
      cap: { radius: 0.2, height: 0.08, yOffset: 0.5, color: 0xd9a441, roughness: 0.3, metalness: 0.85 }
    },

    // 端部磁吸点
    ends: {
      radius: 0.22, x: 3.35, y: 0.05,
      color: 0xc9cdd4, roughness: 0.22, metalness: 0.95
    }
  },

  // ---- 把玩手感参数（F2 核心：手感 = 数据） ----
  play: {
    slideMin: -2.8,           // 滑块行程下限
    slideMax: 2.8,            // 滑块行程上限
    snapPos: [-2.6, -1.5, -0.5, 0.5, 1.5, 2.6],  // 磁吸档位
    snapMagnet: 0.35,         // 磁吸牵引系数（0=无，1=强吸）
    snapDist: 0.55,           // 进入吸附区间的判定距离
    endThreshold: 0.25,       // 接近端部即触发的阈值
    rumbleMs: 500,            // 端部震感时长（毫秒）
    shakeFreq: 90,            // 端部颤动频率
    shakeAmp: 0.06            // 端部颤动幅度
  },

  // ---- 程序化音效参数（F4 声音采样库上线前的合成方案） ----
  audio: {
    ding: { high: 2500, low: 1750, vol: 0.14, dur: 0.09, type: 'triangle', echoVol: 0.05, echoDur: 0.05 },
    snap: { freq: 1100, vol: 0.06, dur: 0.03, type: 'triangle' },
    boom: { freq: 120, vol: 0.28, dur: 0.22, noiseDur: 0.12, noiseVol: 0.22, lowpass: 900 }
  },

  // ---- 相机与观察参数 ----
  camera: {
    position: [7.5, 4.8, 9.5],
    target: [0, 0.65, 0],
    minDistance: 5,
    maxDistance: 28,
    maxPolarAngle: 0.62
  }
};
