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
