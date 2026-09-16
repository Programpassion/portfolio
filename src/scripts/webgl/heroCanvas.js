import * as THREE from 'three';

export function initHeroCanvas() {
  const container = document.getElementById('hero-canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x06070b, 0.035);

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 18;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Group to rotate together
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Cybernetic Torus Knot
  const knotGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 128, 32, 2, 3);
  
  // Wireframe core
  const knotWireMat = new THREE.MeshBasicMaterial({
    color: 0x00f5d4,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotWireMat);
  mainGroup.add(knotMesh);

  // Inner glowing points
  const pointsMat = new THREE.PointsMaterial({
    color: 0xa855f7,
    size: 0.08,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const knotPoints = new THREE.Points(knotGeo, pointsMat);
  mainGroup.add(knotPoints);

  // 2. Surrounding Particle Constellation
  const particleCount = 1800;
  const posArray = new Float32Array(particleCount * 3);
  const originalPos = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    // Spherical distribution
    const radius = 12 + Math.random() * 25;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    posArray[i] = x;
    posArray[i + 1] = y;
    posArray[i + 2] = z;

    originalPos[i] = x;
    originalPos[i + 1] = y;
    originalPos[i + 2] = z;

    velocities[i] = 0;
    velocities[i + 1] = 0;
    velocities[i + 2] = 0;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  // Particle color variety: cyan, sky, purple
  const colors = new Float32Array(particleCount * 3);
  const colorPalette = [
    new THREE.Color(0x00f5d4), // Cyan
    new THREE.Color(0x38bdf8), // Sky
    new THREE.Color(0xa855f7), // Purple
    new THREE.Color(0xffffff)  // White
  ];

  for (let i = 0; i < particleCount; i++) {
    const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    vertexColors: true,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // 3. Cyber Ring Grid
  const ringGeo = new THREE.RingGeometry(8, 8.05, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.3
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  mainGroup.add(ringMesh);

  // Mouse Parallax & Interaction
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.0012;
    mouseY = (event.clientY - windowHalfY) * 0.0012;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Shockwave dispersion on click
  let shockwave = 0;
  function onClick(e) {
    // Only disperse if clicking hero or background
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input')) return;
    shockwave = 1.0;
  }
  window.addEventListener('click', onClick);

  // Handle Resize
  function onResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener('resize', onResize);

  // Intersection Observer to save GPU when offscreen
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(container);

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // Smooth camera / group rotation via lerp
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = elapsedTime * 0.25 + targetX * 1.5;
    mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + targetY * 1.2;
    mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.4;

    particleSystem.rotation.y = -elapsedTime * 0.04;
    particleSystem.rotation.x = elapsedTime * 0.02;

    // Handle shockwave & particle spring physics
    if (shockwave > 0.001) {
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        // Disperse outwards
        positions[i] += (Math.random() - 0.5) * shockwave * 0.8;
        positions[i + 1] += (Math.random() - 0.5) * shockwave * 0.8;
        positions[i + 2] += (Math.random() - 0.5) * shockwave * 0.8;
      }
      particleGeo.attributes.position.needsUpdate = true;
      shockwave *= 0.92;
    } else {
      // Gently return particles towards original positions
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += (originalPos[i] - positions[i]) * 0.04;
        positions[i + 1] += (originalPos[i + 1] - positions[i + 1]) * 0.04;
        positions[i + 2] += (originalPos[i + 2] - positions[i + 2]) * 0.04;
      }
      particleGeo.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  }

  animate();
}
