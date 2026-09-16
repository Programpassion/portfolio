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

  // Main interactive group
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Dynamic color references
  let primaryColor = 0x00f5d4;
  let secondaryColor = 0xa855f7;

  // 1. Torus Knot Mesh
  const knotGeo = new THREE.TorusKnotGeometry(4.5, 1.2, 128, 32, 2, 3);
  const knotWireMat = new THREE.MeshBasicMaterial({
    color: primaryColor,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const knotMesh = new THREE.Mesh(knotGeo, knotWireMat);

  const knotPointsMat = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.08,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const knotPoints = new THREE.Points(knotGeo, knotPointsMat);

  // 2. Neural Sphere Mesh
  const sphereGeo = new THREE.IcosahedronGeometry(5.2, 4);
  const sphereWireMat = new THREE.MeshBasicMaterial({
    color: primaryColor,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const sphereMesh = new THREE.Mesh(sphereGeo, sphereWireMat);

  const spherePointsMat = new THREE.PointsMaterial({
    color: secondaryColor,
    size: 0.1,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });
  const spherePoints = new THREE.Points(sphereGeo, spherePointsMat);

  // 3. Quantum Wave Plane Mesh
  const waveGeo = new THREE.PlaneGeometry(16, 16, 32, 32);
  const wavePointsMat = new THREE.PointsMaterial({
    color: primaryColor,
    size: 0.12,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  });
  const wavePoints = new THREE.Points(waveGeo, wavePointsMat);
  wavePoints.rotation.x = -Math.PI / 2.5;

  // Container for switchable active shape
  const shapeGroup = new THREE.Group();
  shapeGroup.add(knotMesh);
  shapeGroup.add(knotPoints);
  mainGroup.add(shapeGroup);

  let currentShapeMode = 'knot'; // 'knot', 'sphere', 'wave'
  let speedMultiplier = 1.0;
  let isWireframeActive = true;

  // Function to switch active geometry
  window.switchHeroShape = function(mode) {
    currentShapeMode = mode;
    // Clear shape group
    while (shapeGroup.children.length > 0) {
      shapeGroup.remove(shapeGroup.children[0]);
    }

    if (mode === 'knot') {
      shapeGroup.add(knotMesh);
      shapeGroup.add(knotPoints);
      shapeGroup.rotation.set(0, 0, 0);
    } else if (mode === 'sphere') {
      shapeGroup.add(sphereMesh);
      shapeGroup.add(spherePoints);
      shapeGroup.rotation.set(0, 0, 0);
    } else if (mode === 'wave') {
      shapeGroup.add(wavePoints);
      shapeGroup.rotation.set(0, 0, 0);
    }
  };

  window.toggleHeroWireframe = function() {
    isWireframeActive = !isWireframeActive;
    knotWireMat.visible = isWireframeActive;
    sphereWireMat.visible = isWireframeActive;
    return isWireframeActive;
  };

  window.toggleHeroSpeed = function() {
    speedMultiplier = speedMultiplier === 1.0 ? 2.2 : 1.0;
    return speedMultiplier;
  };

  // Listen for dynamic theme shifts
  window.addEventListener('themeChanged', (e) => {
    if (e.detail) {
      primaryColor = e.detail.hex || 0x00f5d4;
      knotWireMat.color.setHex(primaryColor);
      sphereWireMat.color.setHex(primaryColor);
      wavePointsMat.color.setHex(primaryColor);
      ringMesh.material.color.setHex(primaryColor);
    }
  });

  // 4. Surrounding Particle Constellation
  const particleCount = 1800;
  const posArray = new Float32Array(particleCount * 3);
  const originalPos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    const radius = 12 + Math.random() * 26;
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
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const colors = new Float32Array(particleCount * 3);
  const colorPalette = [
    new THREE.Color(0x00f5d4),
    new THREE.Color(0x38bdf8),
    new THREE.Color(0xa855f7),
    new THREE.Color(0xffffff)
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

  // 5. Cyber Ring Grid
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

  // Mouse Parallax
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
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('input') || e.target.closest('.glass-panel')) return;
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

  // Intersection Observer
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

    const elapsedTime = clock.getElapsedTime() * speedMultiplier;

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = elapsedTime * 0.25 + targetX * 1.5;
    mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.2 + targetY * 1.2;
    mainGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.4;

    // Wave vertex displacement if in wave mode
    if (currentShapeMode === 'wave') {
      const pos = waveGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.5 + elapsedTime * 2) * Math.cos(v * 0.5 + elapsedTime * 1.5) * 1.2;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;
    }

    particleSystem.rotation.y = -elapsedTime * 0.04;
    particleSystem.rotation.x = elapsedTime * 0.02;

    // Shockwave physics
    if (shockwave > 0.001) {
      const positions = particleGeo.attributes.position.array;
      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] += (Math.random() - 0.5) * shockwave * 0.8;
        positions[i + 1] += (Math.random() - 0.5) * shockwave * 0.8;
        positions[i + 2] += (Math.random() - 0.5) * shockwave * 0.8;
      }
      particleGeo.attributes.position.needsUpdate = true;
      shockwave *= 0.92;
    } else {
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
