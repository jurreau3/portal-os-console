import * as THREE from 'three';

export interface PortalSceneOptions {
  title?: string;
  baseColor?: string;
  glowColor?: string;
}

export interface PortalSceneHandle {
  animate: () => void;
  dispose: () => void;
}

export function createPortalScene(container: HTMLElement, options: PortalSceneOptions = {}): PortalSceneHandle {
  const title = options.title ?? 'BE-MAX';
  const baseColor = options.baseColor ?? '#6ee7ff';
  const glowColor = options.glowColor ?? '#2ae8ff';

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x050d14, 8, 22);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(container.clientWidth || 600, container.clientHeight || 500);
  container.appendChild(renderer.domElement);
  const camera = new THREE.PerspectiveCamera(36, (container.clientWidth || 600) / (container.clientHeight || 500), 0.1, 100);
  camera.position.set(0, 0.4, 9.5);
  const group = new THREE.Group();
  scene.add(group);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: baseColor, emissive: glowColor, emissiveIntensity: 1.4, metalness: 0.8, roughness: 0.32 });
  const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.08, 32, 180), torusMaterial);
  ringA.rotation.x = Math.PI / 2.3;
  group.add(ringA);
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.06, 20, 160), torusMaterial.clone());
  ringB.rotation.x = Math.PI / 1.7;
  ringB.rotation.y = Math.PI / 4;
  group.add(ringB);
  const beamMaterial = new THREE.MeshPhysicalMaterial({ color: glowColor, emissive: glowColor, emissiveIntensity: 1.8, transparent: true, opacity: 0.7, side: THREE.DoubleSide });
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.6, 6.5, 48, 1, true), beamMaterial);
  beam.rotation.x = Math.PI / 2;
  beam.position.y = 0.2;
  group.add(beam);
  const pulse = new THREE.Mesh(new THREE.SphereGeometry(1.8, 32, 32), new THREE.MeshBasicMaterial({ color: baseColor, transparent: true, opacity: 0.18, wireframe: true }));
  group.add(pulse);
  const textureCanvas = document.createElement('canvas');
  const ctx = textureCanvas.getContext('2d');
  if (ctx) {
    textureCanvas.width = 512;
    textureCanvas.height = 128;
    ctx.font = '700 64px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#7aeaff';
    ctx.shadowColor = '#7aeaff';
    ctx.shadowBlur = 18;
    ctx.fillText(title, textureCanvas.width / 2, textureCanvas.height / 2);
  }
  const spriteTexture = new THREE.CanvasTexture(textureCanvas);
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: spriteTexture, transparent: true, opacity: 0.9, depthWrite: false }));
  sprite.position.set(0, 0.8, 0.6);
  sprite.scale.set(4.6, 1.1, 1);
  group.add(sprite);
  scene.add(new THREE.AmbientLight(0x9adfff, 1));
  const point = new THREE.PointLight(glowColor, 2.2, 30, 2);
  point.position.set(0, 2, 8);
  scene.add(point);
  let frameId = 0;
  let phase = 0;
  const animate = () => {
    phase += 0.016;
    ringA.rotation.z += 0.006;
    ringB.rotation.y += 0.009;
    group.rotation.y += 0.004;
    group.rotation.x = Math.sin(phase * 0.85) * 0.26;
    pulse.scale.setScalar(1 + Math.sin(phase * 2.4) * 0.12 + 0.12);
    beam.scale.y = 1 + Math.sin(phase * 3.2) * 0.18;
    beam.material.opacity = 0.5 + Math.sin(phase * 3.2) * 0.15;
    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(animate);
  };
  animate();
  const resize = () => {
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  return { animate, dispose() { resizeObserver.disconnect(); cancelAnimationFrame(frameId); renderer.dispose(); container.removeChild(renderer.domElement); beam.geometry.dispose(); ringA.geometry.dispose(); ringB.geometry.dispose(); pulse.geometry.dispose(); spriteTexture.dispose(); } };
}
