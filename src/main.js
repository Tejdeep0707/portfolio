import emailjs from '@emailjs/browser';

// Global error logger for debugging
window.addEventListener('error', function(e) {
  console.log("⚠️ UNCAUGHT ERROR DETECTED:", e.message, "in", e.filename, "at line", e.lineno);
});

// Initialize EmailJS
emailjs.init("TLR5if82dog7Sd7XS");


// --- Navbar Scroll Effect ---
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.style.display === 'flex';
  mobileMenu.style.display = isOpen ? 'none' : 'flex';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.style.display = 'none';
  });
});

// --- Hero Code Editor Tab Switching ---
const codeContent = document.getElementById('code-content');
const tabButtons = document.querySelectorAll('.tab-btn');

const codeTemplates = {
  status: `<span class="keyword">const</span> <span class="variable">developer</span> = {
  <span class="property">name</span>: <span class="string">"Tejdeep"</span>,
  <span class="property">role</span>: <span class="string">"Full Stack Dev"</span>,
  <span class="property">focus</span>: <span class="string">"AI & Business"</span>,
  <span class="property">status</span>: <span class="string">"Ready for Hire"</span>
};`,
  skills: `{
  <span class="property">"frontend"</span>: [<span class="string">"React"</span>, <span class="string">"Next.js"</span>, <span class="string">"Tailwind"</span>],
  <span class="property">"backend"</span>: [<span class="string">"Node.js"</span>, <span class="string">"Express"</span>, <span class="string">"Supabase"</span>],
  <span class="property">"ai_focus"</span>: [<span class="string">"OpenAI"</span>, <span class="string">"AI Agents"</span>, <span class="string">"n8n"</span>]
}`,
  experience: `<span class="keyword">echo</span> <span class="string">"Booting Tejdeep OS v1.0..."</span>
<span class="keyword">echo</span> <span class="string">"Current: Banking Exam Preparation Platform"</span>
<span class="keyword">echo</span> <span class="string">"Status: 65% Completed"</span>
<span class="keyword">echo</span> <span class="string">"Success: 100% Client Satisfaction"</span>`
};

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class
    tabButtons.forEach(b => b.classList.remove('active'));
    // Add active class
    btn.classList.add('active');
    
    // Switch code content with a quick transition
    const tabKey = btn.getAttribute('data-tab');
    if (codeContent && codeTemplates[tabKey]) {
      codeContent.style.opacity = 0;
      setTimeout(() => {
        codeContent.innerHTML = codeTemplates[tabKey];
        codeContent.style.opacity = 1;
      }, 150);
    }
  });
});

// Add CSS transition for code content opacity
if (codeContent) {
  codeContent.style.transition = 'opacity 0.15s ease-in-out';
}



// --- Toast System ---
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'info', duration = 4000) {
  if (!toastContainer) return null;
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconContent = '';
  if (type === 'success') {
    iconContent = '✓';
  } else if (type === 'error') {
    iconContent = '✕';
  } else if (type === 'info') {
    iconContent = '<div class="spinner"></div>';
  }
  
  toast.innerHTML = `
    <div class="toast-icon">${iconContent}</div>
    <div class="toast-message">${message}</div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Trigger reflow and show
  toast.offsetHeight; 
  toast.classList.add('show');
  
  const dismiss = () => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  };
  
  if (duration > 0) {
    setTimeout(dismiss, duration);
  }
  
  return {
    element: toast,
    dismiss,
    update: (newMessage, newType, newDuration = 4000) => {
      toast.className = `toast ${newType} show`;
      const iconEl = toast.querySelector('.toast-icon');
      const msgEl = toast.querySelector('.toast-message');
      
      let newIcon = '';
      if (newType === 'success') newIcon = '✓';
      else if (newType === 'error') newIcon = '✕';
      else if (newType === 'info') newIcon = '<div class="spinner"></div>';
      
      if (iconEl) iconEl.innerHTML = newIcon;
      if (msgEl) msgEl.textContent = newMessage;
      
      if (newDuration > 0) {
        setTimeout(dismiss, newDuration);
      }
    }
  };
}

// --- EmailJS Contact Form Submission ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const submitBtn = contactForm.querySelector('button');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const nameVal = document.getElementById('contact-name').value.trim();
      const emailVal = document.getElementById('contact-email').value.trim();
      const projectVal = document.getElementById('contact-project').value;
      const messageVal = document.getElementById('contact-message').value.trim();
      
      // Basic input validation since browser validation is bypassed by div container
      if (!nameVal || !emailVal || !projectVal || !messageVal) {
        showToast('Please fill out all fields.', 'error');
        return;
      }
      
      // Simple email format check
      if (!emailVal.includes('@') || !emailVal.includes('.')) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      
      const originalBtnText = submitBtn.textContent;
      
      // Disable form submission controls
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      
      // Show sending toast
      const activeToast = showToast('Sending your message to Tejdeep...', 'info', 0);
      
      const templateParams = {
        from_name: nameVal,
        name: nameVal,
        from_email: emailVal,
        email: emailVal,
        project_type: projectVal,
        projectType: projectVal,
        message: messageVal
      };
      
      emailjs.send('service_juy2wfo', 'template_0ukkg5q', templateParams)
        .then((response) => {
          console.log('EmailJS Success:', response.status, response.text);
          if (activeToast) {
            activeToast.update('Message sent successfully! 🚀', 'success', 5000);
          }
          // Clear inputs manually
          document.getElementById('contact-name').value = '';
          document.getElementById('contact-email').value = '';
          document.getElementById('contact-project').value = '';
          document.getElementById('contact-message').value = '';
        })
        .catch((err) => {
          console.error('EmailJS Error:', err);
          if (activeToast) {
            activeToast.update('Failed to send email. Please try again.', 'error', 6000);
          }
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }
}

// --- Intersection Observer for Animations ---
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

// Reset and prepare progress bars for scroll animation
const progressElements = document.querySelectorAll('.progress');
progressElements.forEach(prog => {
  const targetWidth = prog.style.width || '100%';
  prog.setAttribute('data-target-width', targetWidth);
  prog.style.width = '0%';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // If the visible item is a progress bar container or has progress bars inside
      const progresses = entry.target.querySelectorAll('.progress');
      progresses.forEach(prog => {
        const targetWidth = prog.getAttribute('data-target-width');
        if (targetWidth) {
          prog.style.width = targetWidth;
        }
      });
      
      observer.unobserve(entry.target); // Trigger only once
    }
  });
}, observerOptions);

// Select elements to animate
const animElements = document.querySelectorAll('.service-card, .timeline-item, .project-card, .tech-category, .feature-item, .section-header');
animElements.forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Create and insert CSS animations
const styleEl = document.createElement('style');
styleEl.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(25px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(styleEl);

// --- 3D Immersive Background Scene (Three.js & Cyber Neural Core) ---
let antiGravityEnabled = true;
let wobbleAmountSetting = 0.2;
let rotationSpeedSetting = 0.3;
let currentSkin = 'cyber';

function init3DBackground() {
  const canvas = document.getElementById('bg-3d');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const clock = new THREE.Clock();

  // Camera setup
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 30);

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Lighting Layer ---
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
  dirLight.position.set(12, 24, 18);
  scene.add(dirLight);

  // Orbital glowing point light to create dynamic reflections
  const orbitalLight = new THREE.PointLight(0x8b5cf6, 3.5, 50);
  orbitalLight.position.set(0, 0, 10);
  scene.add(orbitalLight);

  // --- Procedural Neural Core (Brain) Geometry ---
  function createNeuralCoreGeometry() {
    const geom = new THREE.SphereGeometry(1.6, 52, 52);
    const posAttr = geom.attributes.position;
    const vertices = posAttr.array;

    // Modulate sphere vertices to create brain hemispheres and folds
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i+1];
      const z = vertices[i+2];

      const vec = new THREE.Vector3(x, y, z).normalize();

      // Brain folds: Sine-cosine heightmap
      const foldFactor = 0.16;
      const wave1 = Math.sin(vec.x * 7.5) * Math.cos(vec.y * 7.5) * Math.sin(vec.z * 7.5);
      const wave2 = Math.cos(vec.x * 14.0) * Math.sin(vec.y * 14.0) * Math.cos(vec.z * 14.0) * 0.35;
      const r = 1.0 + foldFactor * (wave1 + wave2);

      // Shape modulating: scale axes (longer, wider, flatter dome)
      let newX = vec.x * r * 1.22;
      let newY = vec.y * r * 1.05;
      let newZ = vec.z * r * 1.40;

      // Longitudinal fissure gap division (left/right hemispheres)
      const hemisphereGap = 0.06;
      if (newX > 0.0) {
        newX += hemisphereGap;
      } else {
        newX -= hemisphereGap;
      }

      // Flatten bottom dome slightly
      if (newY < 0.0) {
        newY *= 0.85;
      }

      vertices[i] = newX;
      vertices[i+1] = newY;
      vertices[i+2] = newZ;
    }

    geom.computeVertexNormals();
    return geom;
  }

  // Generate Geometry
  const neuralGeometry = createNeuralCoreGeometry();

  // Define Materials for HUD skins
  const cyberMaterial = new THREE.MeshStandardMaterial({
    color: 0x05041a,
    roughness: 0.12,
    metalness: 0.90,
    flatShading: true
  });

  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd700,
    roughness: 0.08,
    metalness: 0.96
  });

  const hologramMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;
      uniform float uGlitch;

      float hash(float n) { return fract(sin(n) * 43758.5453123); }

      void main() {
        vUv = uv;
        vPosition = position;
        vec3 pos = position;

        // Neural quantum glitch displacement
        if (uGlitch > 0.1 && sin(uTime * 20.0) > 0.80) {
          float offset = hash(floor(pos.y * 14.0) + uTime);
          if (offset > 0.60) {
            pos.x += sin(uTime * 35.0 + pos.y * 6.0) * 0.15 * uGlitch;
          }
        }
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform float uTime;

      void main() {
        // Hologram scanlines
        float scanline = sin(vPosition.y * 30.0 - uTime * 14.0) * 0.5 + 0.5;
        // Edge glow
        float edgeGlow = 1.0 - abs(vUv.y - 0.5) * 2.0;

        vec3 color = vec3(0.0, 0.85, 1.0); // Neon cyan hologram
        float alpha = (scanline * 0.40 + 0.35) * edgeGlow;

        gl_FragColor = vec4(color, alpha);
      }
    `,
    uniforms: {
      uTime: { value: 0 },
      uGlitch: { value: 0.0 }
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  });

  // Main Neural Core Group
  const neuralGroup = new THREE.Group();
  const neuralMesh = new THREE.Mesh(neuralGeometry, cyberMaterial);
  neuralGroup.add(neuralMesh);
  scene.add(neuralGroup);

  // Synaptic Glowing Wireframe Overlay (specifically for Cyber skin)
  const synapticOverlayGeom = new THREE.WireframeGeometry(neuralGeometry);
  const synapticOverlayMat = new THREE.LineBasicMaterial({
    color: 0xc084fc,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });
  const synapticOverlay = new THREE.LineSegments(synapticOverlayGeom, synapticOverlayMat);
  synapticOverlay.scale.set(1.015, 1.015, 1.015);
  neuralGroup.add(synapticOverlay);

  // Set Core Initial Transform states
  neuralGroup.position.set(10, 0, 10);
  neuralGroup.rotation.set(0.2, -0.4, 0.15);
  neuralGroup.scale.set(2.0, 2.0, 2.0); // spheroidal shapes require less scale multiplier than elongated cylinders

  // --- Background Starfield ---
  const starCount = 380;
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPositions[i * 3] = (Math.random() - 0.5) * 320;
    starPositions[i * 3 + 1] = (Math.random() - 0.5) * 320;
    starPositions[i * 3 + 2] = (Math.random() - 0.5) * 320;
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.4,
    transparent: true,
    opacity: 0.75,
    sizeAttenuation: false
  });
  const starSystem = new THREE.Points(starGeometry, starMaterial);
  scene.add(starSystem);

  // --- Particle Trail System (Mouse-tracking) ---
  const trailCount = 50;
  const trailGeometry = new THREE.BufferGeometry();
  const trailPositions = new Float32Array(trailCount * 3);
  const trailSpeeds = [];

  for (let i = 0; i < trailCount; i++) {
    trailPositions[i * 3] = 0;
    trailPositions[i * 3 + 1] = 0;
    trailPositions[i * 3 + 2] = 0;
    trailSpeeds.push(new THREE.Vector3(
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15,
      (Math.random() - 0.5) * 0.15
    ));
  }
  trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));

  const trailMaterial = new THREE.PointsMaterial({
    color: 0x60a5fa, // cyan/blue trail
    size: 4.5,
    transparent: true,
    opacity: 0.65,
    blending: THREE.AdditiveBlending
  });
  const trailSystem = new THREE.Points(trailGeometry, trailMaterial);
  scene.add(trailSystem);

  // --- Synaptic Node Click Explosion (Physics Particles) ---
  const explosionGroup = new THREE.Group();
  scene.add(explosionGroup);
  const explosionParticles = [];
  const particleGeometry = new THREE.SphereGeometry(0.08, 8, 8);
  const baseExplosionMaterial = new THREE.MeshBasicMaterial({
    color: 0x22d3ee, // glowing cyan nodes
    transparent: true,
    opacity: 1.0,
    blending: THREE.AdditiveBlending
  });

  function triggerExplosion(pos) {
    // Clear old active particles
    while (explosionGroup.children.length > 0) {
      explosionGroup.remove(explosionGroup.children[0]);
    }
    explosionParticles.length = 0;

    for (let i = 0; i < 40; i++) {
      const mesh = new THREE.Mesh(particleGeometry, baseExplosionMaterial.clone());
      mesh.position.copy(pos);

      // Radial velocities
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15 + (antiGravityEnabled ? 3.5 : -2.5),
        (Math.random() - 0.5) * 15
      );

      // Random color variations (cyan-violet-pink ranges)
      const colorVal = Math.random();
      if (colorVal > 0.6) {
        mesh.material.color.setHex(0xc084fc); // violet
      } else if (colorVal > 0.3) {
        mesh.material.color.setHex(0xf472b6); // pink
      } else {
        mesh.material.color.setHex(0x22d3ee); // cyan
      }

      explosionGroup.add(mesh);
      explosionParticles.push({
        mesh,
        velocity,
        age: 0,
        life: 0.6 + Math.random() * 0.8
      });
    }
  }

  // --- Scroll Interpolation Path Configuration ---
  const scrollStates = [
    {
      // Section 1: Hero
      neuralPos: new THREE.Vector3(10, 0, 10),
      neuralRot: new THREE.Vector3(0.2, -0.4, 0.15),
      neuralScale: new THREE.Vector3(2.0, 2.0, 2.0),
      cameraPos: new THREE.Vector3(0, 0, 30)
    },
    {
      // Section 2: Services
      neuralPos: new THREE.Vector3(-12, 0, 6),
      neuralRot: new THREE.Vector3(0.4, 0.8, -0.1),
      neuralScale: new THREE.Vector3(1.7, 1.7, 1.7),
      cameraPos: new THREE.Vector3(0, 0, 30)
    },
    {
      // Section 3: Timeline
      neuralPos: new THREE.Vector3(0, 5, 2),
      neuralRot: new THREE.Vector3(1.1, 0.15, 1.2),
      neuralScale: new THREE.Vector3(1.5, 1.5, 1.5),
      cameraPos: new THREE.Vector3(0, 4, 25)
    },
    {
      // Section 4: Projects
      neuralPos: new THREE.Vector3(11, -3, 8),
      neuralRot: new THREE.Vector3(-0.2, -1.0, 0.4),
      neuralScale: new THREE.Vector3(1.8, 1.8, 1.8),
      cameraPos: new THREE.Vector3(0, 0, 30)
    },
    {
      // Section 5: Contact
      neuralPos: new THREE.Vector3(7, -6, 12),
      neuralRot: new THREE.Vector3(0.15, 0.5, -0.3),
      neuralScale: new THREE.Vector3(1.9, 1.9, 1.9),
      cameraPos: new THREE.Vector3(0, -5, 30)
    }
  ];

  let scrollFraction = 0;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0) {
      scrollFraction = scrollTop / docHeight;
    }
  });

  function updateScrollInterpolation() {
    const index = scrollFraction * (scrollStates.length - 1);
    const startIndex = Math.floor(index);
    const endIndex = Math.min(Math.ceil(index), scrollStates.length - 1);
    const factor = index - startIndex;

    const startState = scrollStates[startIndex];
    const endState = scrollStates[endIndex];

    // Lerp positions
    neuralGroup.position.lerpVectors(startState.neuralPos, endState.neuralPos, factor);

    // Lerp rotations
    neuralGroup.rotation.x = THREE.MathUtils.lerp(startState.neuralRot.x, endState.neuralRot.x, factor);
    neuralGroup.rotation.y = THREE.MathUtils.lerp(startState.neuralRot.y, endState.neuralRot.y, factor);
    neuralGroup.rotation.z = THREE.MathUtils.lerp(startState.neuralRot.z, endState.neuralRot.z, factor);

    // Lerp scale
    neuralGroup.scale.lerpVectors(startState.neuralScale, endState.neuralScale, factor);

    // Lerp camera
    camera.position.lerpVectors(startState.cameraPos, endState.cameraPos, factor);
  }

  // --- Interaction Hooks ---
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let currentRotationX = 0, currentRotationY = 0;

  // HTML Glow elements drift
  const glow1 = document.querySelector('.ambient-glow-1');
  const glow2 = document.querySelector('.ambient-glow-2');
  const glow3 = document.querySelector('.ambient-glow-3');

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) - 0.5;
    mouseY = (e.clientY / window.innerHeight) - 0.5;

    targetRotationY = mouseX * 0.35;
    targetRotationX = mouseY * 0.35;

    // Nebula Drift
    if (glow1) glow1.style.transform = `translate3d(${mouseX * 80}px, ${mouseY * 80}px, 0)`;
    if (glow2) glow2.style.transform = `translate3d(${-mouseX * 80}px, ${-mouseY * 80}px, 0)`;
    if (glow3) glow3.style.transform = `translate3d(${mouseY * 65}px, ${-mouseX * 65}px, 0)`;

    // Update particle trail point
    const trailArr = trailGeometry.attributes.position.array;
    trailArr[0] = mouseX * 35;
    trailArr[1] = -mouseY * 35;
    trailArr[2] = 0;
    trailGeometry.attributes.position.needsUpdate = true;
  });

  // Raycasting for Clicks
  const raycaster = new THREE.Raycaster();
  const normalizedMouse = new THREE.Vector2();
  let wobbleIntensity = 0;
  let clickSpinBoost = 0;

  window.addEventListener('click', (e) => {
    normalizedMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    normalizedMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(normalizedMouse, camera);
    const intersects = raycaster.intersectObjects(neuralGroup.children, true);

    if (intersects.length > 0) {
      const worldPos = new THREE.Vector3();
      neuralMesh.getWorldPosition(worldPos);
      triggerExplosion(worldPos);

      wobbleIntensity = 1.5;
      clickSpinBoost = 6.0;

      showToast("Synaptic burst triggered! 🧠💥", "success", 2500);
    }
  });

  // Handle Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // --- HUD Controls Connection ---
  const skinButtons = document.querySelectorAll('.hud-btn');
  skinButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      skinButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const skin = btn.getAttribute('data-skin');
      currentSkin = skin;

      // Overlay is visible primarily on cyber skin
      synapticOverlay.visible = (skin === 'cyber');

      switch (skin) {
        case 'cyber':
          neuralMesh.material = cyberMaterial;
          break;
        case 'wireframe':
          neuralMesh.material = wireframeMaterial;
          break;
        case 'gold':
          neuralMesh.material = goldMaterial;
          break;
        case 'hologram':
          neuralMesh.material = hologramMaterial;
          break;
      }
    });
  });

  const spinSlider = document.getElementById('hud-spin');
  const wobbleSlider = document.getElementById('hud-wobble');
  const gravityToggle = document.getElementById('hud-gravity');

  if (spinSlider) spinSlider.addEventListener('input', (e) => rotationSpeedSetting = e.target.value / 100);
  if (wobbleSlider) wobbleSlider.addEventListener('input', (e) => wobbleAmountSetting = e.target.value / 100);
  if (gravityToggle) gravityToggle.addEventListener('change', (e) => antiGravityEnabled = e.target.checked);

  // HUD Toggle Collapse
  const hudToggle = document.getElementById('hud-toggle');
  const hudHeader = document.getElementById('hud-header');
  const hud = document.getElementById('cyber-hud');

  if (hudHeader && hud && hudToggle) {
    hudHeader.addEventListener('click', (e) => {
      hud.classList.toggle('collapsed');
      hudToggle.textContent = hud.classList.contains('collapsed') ? '□' : '—';
    });
  }

  // --- Real-time Diagnostic Counters ---
  let lastFpsTime = performance.now();
  let fpsFrames = 0;
  function updateDiagnosticFPS() {
    const t = performance.now();
    fpsFrames++;
    if (t > lastFpsTime + 1000) {
      const fpsVal = Math.round((fpsFrames * 1000) / (t - lastFpsTime));
      const fpsEl = document.getElementById('hud-fps');
      if (fpsEl) fpsEl.textContent = `${fpsVal} FPS`;
      fpsFrames = 0;
      lastFpsTime = t;
    }
  }

  // --- Main Animation Frame loop ---
  const animate = () => {
    requestAnimationFrame(animate);

    const dt = clock.getDelta();
    const time = clock.getElapsedTime();

    updateScrollInterpolation();
    updateDiagnosticFPS();

    // Shader uniforms updates
    if (currentSkin === 'hologram') {
      hologramMaterial.uniforms.uTime.value = time;
      hologramMaterial.uniforms.uGlitch.value = wobbleIntensity + (Math.random() * 0.08);
    }

    // Smooth lerps for mouse rotations
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    // Apply rotation settings
    neuralMesh.rotation.y += (rotationSpeedSetting * 0.7 + clickSpinBoost) * dt;
    neuralMesh.rotation.z += (rotationSpeedSetting * 0.25) * dt;
    if (clickSpinBoost > 0) {
      clickSpinBoost = Math.max(0, clickSpinBoost - dt * 3.0);
    }

    // Apply wobble physics
    const currentWobble = wobbleAmountSetting + wobbleIntensity;
    neuralMesh.position.y = Math.sin(time * 2.5) * currentWobble * 0.6;
    neuralMesh.position.x = Math.cos(time * 1.3) * currentWobble * 0.4;
    if (wobbleIntensity > 0) {
      wobbleIntensity = Math.max(0, wobbleIntensity - dt * 1.6);
    }

    // Mouse drift parallax rotation
    neuralMesh.rotation.x = currentRotationX * 0.8;
    neuralMesh.rotation.y += currentRotationY * 0.8;

    // Sync wireframe synaptic overlay with mesh
    if (currentSkin === 'cyber') {
      synapticOverlayMat.opacity = 0.25 + Math.sin(time * 3.5) * 0.15; // pulsating synaptic lines
      synapticOverlay.rotation.copy(neuralMesh.rotation);
      synapticOverlay.position.copy(neuralMesh.position);
    }

    // Orbit orbital lighting
    orbitalLight.position.x = Math.sin(time * 1.2) * 14;
    orbitalLight.position.z = Math.cos(time * 1.2) * 14 + 5;

    // Ambient Starfield Parallax
    starSystem.rotation.y = time * 0.006 + currentRotationY * 0.20;
    starSystem.rotation.x = time * 0.004 + currentRotationX * 0.20;

    // Update Particle Mouse-Trail positions (lerp to follow index 0)
    const trailArr = trailGeometry.attributes.position.array;
    for (let i = trailCount - 1; i > 0; i--) {
      trailArr[i * 3] += (trailArr[(i - 1) * 3] - trailArr[i * 3]) * 0.18 + trailSpeeds[i].x;
      trailArr[i * 3 + 1] += (trailArr[(i - 1) * 3 + 1] - trailArr[i * 3 + 1]) * 0.18 + trailSpeeds[i].y;
      trailArr[i * 3 + 2] += (trailArr[(i - 1) * 3 + 2] - trailArr[i * 3 + 2]) * 0.18 + trailSpeeds[i].z;
    }
    trailGeometry.attributes.position.needsUpdate = true;

    // Update Synaptic Explosion Particles
    for (let i = explosionParticles.length - 1; i >= 0; i--) {
      const p = explosionParticles[i];
      p.age += dt;

      if (p.age >= p.life) {
        explosionGroup.remove(p.mesh);
        explosionParticles.splice(i, 1);
      } else {
        p.mesh.position.addScaledVector(p.velocity, dt);

        if (antiGravityEnabled) {
          p.velocity.y += 2.0 * dt;
        } else {
          p.velocity.y -= 9.8 * dt;
        }
        p.velocity.multiplyScalar(0.97); // air friction

        p.mesh.material.opacity = 1.0 - (p.age / p.life);
        p.mesh.material.transparent = true;
      }
    }

    renderer.render(scene, camera);
  };

  animate();
}

// --- 3D Interactive Card Hover Tilt & Hero Parallax ---
function init3DInteractions() {
  const cards = document.querySelectorAll('.service-card, .timeline-item, .project-card');
  const cardStates = [];

  cards.forEach(card => {
    const state = {
      card: card,
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      targetScale: 1,
      currentScale: 1
    };
    cardStates.push(state);

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const width = rect.width;
      const height = rect.height;

      state.targetY = ((x / width) - 0.5) * 16; 
      state.targetX = -((y / height) - 0.5) * 16; 
      state.targetScale = 1.035;
    });

    card.addEventListener('mouseleave', () => {
      state.targetX = 0;
      state.targetY = 0;
      state.targetScale = 1;
    });
  });

  // 3D Parallax in Hero
  const hero = document.getElementById('hero');
  const heroContent = document.querySelector('.hero-content');
  const heroState = {
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    targetRotX: 0,
    targetRotY: 0,
    currentRotX: 0,
    currentRotY: 0
  };

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const mouseX = (e.clientX / window.innerWidth) - 0.5;
      const mouseY = (e.clientY / window.innerHeight) - 0.5;

      heroState.targetX = mouseX * 22;
      heroState.targetY = mouseY * 22;
      heroState.targetRotY = mouseX * 10;
      heroState.targetRotX = -mouseY * 10;
    });

    hero.addEventListener('mouseleave', () => {
      heroState.targetX = 0;
      heroState.targetY = 0;
      heroState.targetRotX = 0;
      heroState.targetRotY = 0;
    });
  }

  const updateInteractions = () => {
    requestAnimationFrame(updateInteractions);

    cardStates.forEach(state => {
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;
      state.currentScale += (state.targetScale - state.currentScale) * 0.08;

      state.card.style.transform = `perspective(1000px) rotateX(${state.currentX.toFixed(2)}deg) rotateY(${state.currentY.toFixed(2)}deg) scale3d(${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)})`;
    });

    if (hero && heroContent) {
      heroState.currentX += (heroState.targetX - heroState.currentX) * 0.08;
      heroState.currentY += (heroState.targetY - heroState.currentY) * 0.08;
      heroState.currentRotX += (heroState.targetRotX - heroState.currentRotX) * 0.08;
      heroState.currentRotY += (heroState.targetRotY - heroState.currentRotY) * 0.08;

      heroContent.style.transform = `perspective(1000px) translate3d(${heroState.currentX.toFixed(2)}px, ${heroState.currentY.toFixed(2)}px, 0) rotateX(${heroState.currentRotX.toFixed(2)}deg) rotateY(${heroState.currentRotY.toFixed(2)}deg)`;
    }
  };

  updateInteractions();
}

// Start interactive scenes
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init3DBackground();
    init3DInteractions();
  });
} else {
  init3DBackground();
  init3DInteractions();
}
