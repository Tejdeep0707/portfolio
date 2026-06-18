import emailjs from '@emailjs/browser';

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

// --- 3D Immersive Background Scene (Three.js) ---
function init3DBackground() {
  const canvas = document.getElementById('bg-3d');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  
  // Camera setup
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, -10, 75); // positioned slightly back and down

  // Renderer setup
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Undulating 3D Grid Wave configuration
  const cols = 16;
  const rows = 16;
  const vertexCount = cols * rows;
  const positions = new Float32Array(vertexCount * 3);
  const indices = [];

  const gridWidth = 150;
  const gridHeight = 150;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      // Spread X and Y centered around 0
      positions[i * 3] = (c / (cols - 1) - 0.5) * gridWidth;
      positions[i * 3 + 1] = (r / (rows - 1) - 0.5) * gridHeight;
      positions[i * 3 + 2] = 0;
    }
  }

  // Pre-calculate grid lines
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      // Horizontal segment
      if (c < cols - 1) {
        indices.push(idx, idx + 1);
      }
      // Vertical segment
      if (r < rows - 1) {
        indices.push(idx, idx + cols);
      }
    }
  }

  const pointGeometry = new THREE.BufferGeometry();
  pointGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', pointGeometry.getAttribute('position'));
  lineGeometry.setIndex(indices);

  // Muted Taupe nodes
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x8C8270,
    size: 2.2,
    transparent: true,
    opacity: 0.65,
    sizeAttenuation: true
  });
  const pointSystem = new THREE.Points(pointGeometry, particleMaterial);
  scene.add(pointSystem);

  // Light Taupe lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xD6CEBC,
    transparent: true,
    opacity: 0.25
  });
  const lineSystem = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lineSystem);

  // Initial tilt for architectural/terrain perspective
  pointSystem.rotation.x = -Math.PI / 4;
  lineSystem.rotation.x = -Math.PI / 4;
  pointSystem.rotation.z = Math.PI / 16;
  lineSystem.rotation.z = Math.PI / 16;

  // Interaction variables
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  
  let targetScrollY = 0;
  let currentScrollY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) - 0.5;
    const mouseY = (e.clientY / window.innerHeight) - 0.5;
    targetRotationY = mouseX * 0.15;
    targetRotationX = mouseY * 0.15;
  });

  window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY * 0.05;
  });

  // Track window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  let time = 0;
  const animate = () => {
    requestAnimationFrame(animate);

    time += 0.006; // smooth wave speed

    const pos = pointGeometry.attributes.position.array;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const x = pos[i * 3];
        const y = pos[i * 3 + 1];

        // Wave formula: diagonal undulating landscape ripples
        const dist = Math.sqrt(x * x + y * y);
        const wave1 = Math.sin(x * 0.03 + time) * Math.cos(y * 0.03 + time);
        const wave2 = Math.sin(dist * 0.02 - time * 1.2) * 0.4;

        pos[i * 3 + 2] = (wave1 + wave2) * 9.0;
      }
    }
    pointGeometry.attributes.position.needsUpdate = true;

    // Smooth lerps
    currentRotationX += (targetRotationX - currentRotationX) * 0.04;
    currentRotationY += (targetRotationY - currentRotationY) * 0.04;
    currentScrollY += (targetScrollY - currentScrollY) * 0.04;

    pointSystem.rotation.x = -Math.PI / 4 + currentRotationX;
    pointSystem.rotation.y = currentRotationY;
    lineSystem.rotation.x = -Math.PI / 4 + currentRotationX;
    lineSystem.rotation.y = currentRotationY;

    // Parallax height shift based on scrolling
    pointSystem.position.y = -5 + currentScrollY * 0.05;
    lineSystem.position.y = -5 + currentScrollY * 0.05;

    // Continuous slow orbit rotation
    pointSystem.rotation.z = Math.PI / 16 + time * 0.03;
    lineSystem.rotation.z = Math.PI / 16 + time * 0.03;

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

      // Subtle 3D tilt rotation: X-axis rotation depends on Y-mouse position, Y-axis on X-mouse
      state.targetY = ((x / width) - 0.5) * 15; 
      state.targetX = -((y / height) - 0.5) * 15; 
      state.targetScale = 1.025;
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

      heroState.targetX = mouseX * 25;
      heroState.targetY = mouseY * 25;
      heroState.targetRotY = mouseX * 12;
      heroState.targetRotX = -mouseY * 12;
    });

    hero.addEventListener('mouseleave', () => {
      heroState.targetX = 0;
      heroState.targetY = 0;
      heroState.targetRotX = 0;
      heroState.targetRotY = 0;
    });
  }

  // Central animation frame loop for all hover interactions
  const updateInteractions = () => {
    requestAnimationFrame(updateInteractions);

    // Update tilt cards
    cardStates.forEach(state => {
      state.currentX += (state.targetX - state.currentX) * 0.08;
      state.currentY += (state.targetY - state.currentY) * 0.08;
      state.currentScale += (state.targetScale - state.currentScale) * 0.08;

      state.card.style.transform = `perspective(1000px) rotateX(${state.currentX.toFixed(2)}deg) rotateY(${state.currentY.toFixed(2)}deg) scale3d(${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)}, ${state.currentScale.toFixed(3)})`;
    });

    // Update hero parallax
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
