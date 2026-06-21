import { useEffect, useRef } from "react";
import * as THREE from "three";

const particleVertexShader = `
  uniform float uTime;
  attribute float aSize;
  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 particlePosition = position;
    particlePosition.x += sin(uTime * 0.22 + position.z * 0.055) * 0.85;
    particlePosition.y += cos(uTime * 0.18 + position.x * 0.05) * 0.55;

    vec4 modelViewPosition = modelViewMatrix * vec4(particlePosition, 1.0);
    gl_PointSize = aSize * (90.0 / -modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;

  void main() {
    float distanceToCenter = length(gl_PointCoord - vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, distanceToCenter);
    gl_FragColor = vec4(vColor, alpha * 0.76);
  }
`;

function createParticleField() {
  const count = 1800;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const palette = [
    new THREE.Color("#ffb649"),
    new THREE.Color("#ff5f8f"),
    new THREE.Color("#2ec4b6"),
    new THREE.Color("#fff0ca"),
  ];

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const radius = 16 + Math.random() * 28;
    const angle = Math.random() * Math.PI * 2;
    const spiral = Math.random() * 11;
    const color = palette[index % palette.length];

    positions[stride] = Math.cos(angle + spiral * 0.18) * radius;
    positions[stride + 1] = (Math.random() - 0.5) * 22;
    positions[stride + 2] = Math.sin(angle) * radius - 16 - Math.random() * 26;

    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
    sizes[index] = 1.8 + Math.random() * 3.2;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

  return geometry;
}

export default function CosmicScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 120);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const clock = new THREE.Clock();
    const particleGeometry = createParticleField();
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    });
    const field = new THREE.Points(particleGeometry, particleMaterial);

    camera.position.set(0, 0.8, 14);
    field.rotation.x = -0.18;
    scene.add(field);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    let frameId = 0;

    const renderFrame = () => {
      const elapsed = clock.getElapsedTime();

      particleMaterial.uniforms.uTime.value = elapsed;
      field.rotation.y = elapsed * 0.035;
      field.rotation.z = Math.sin(elapsed * 0.12) * 0.035;
      camera.position.x = Math.sin(elapsed * 0.08) * 0.75;
      camera.position.y = 0.8 + Math.cos(elapsed * 0.1) * 0.32;
      camera.lookAt(0, 0, -10);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    renderFrame();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="three-scene" aria-hidden="true" />;
}
