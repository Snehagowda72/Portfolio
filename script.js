// Enhanced interactions: menu toggle, preview PDF, animate on scroll, contact demo
document.addEventListener('DOMContentLoaded', () => {
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // close menu when link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // pdf preview handlers
  const fileInput = document.getElementById('fileInput');
  const pdfPreview = document.getElementById('pdfPreview');
  const pdfFrame = document.getElementById('pdfFrame');
  const closePreview = document.getElementById('closePreview');
  const downloadPreview = document.getElementById('downloadPreview');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (!f) return;
      if (f.type !== 'application/pdf') {
        alert('Please upload a PDF.');
        return;
      }
      const url = URL.createObjectURL(f);
      pdfFrame.src = url;
      downloadPreview.href = url;
      downloadPreview.setAttribute('download', f.name);
      pdfPreview.classList.remove('hidden');
      pdfPreview.scrollIntoView({behavior:'smooth'});
    });
  }

  if (closePreview) {
    closePreview.addEventListener('click', () => {
      pdfPreview.classList.add('hidden');
      try { URL.revokeObjectURL(pdfFrame.src); } catch(e){}
    });
  }

  // observer animation on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e=>{
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, {threshold: 0.15});

  document.querySelectorAll('.project-anim, .section-anim').forEach(el => io.observe(el));

  // animate skill bars after section visible
  const skillsSection = document.querySelector('#skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(en=>{
        if (en.isIntersecting) {
          document.querySelectorAll('.skill').forEach(s=>{
            s.classList.add('animate');
          });
          skillsObserver.disconnect();
        }
      });
    }, {threshold:0.25});
    skillsObserver.observe(skillsSection);
  }

  // portrait transform on hover
  const portrait = document.querySelector('.portrait');
  if (portrait) {
    portrait.addEventListener('mouseenter', ()=> portrait.style.transform = 'translateY(-8px) rotate(-1deg)');
    portrait.addEventListener('mouseleave', ()=> portrait.style.transform = 'none');
  }

  // demo contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      alert('Thanks — this demo only simulates sending. Connect your backend or email service to submit real messages.');
      contactForm.reset();
    });
  }

  // smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
});

const projectDetails = {
  paws: {
    title: "Paws & Hearts – HTML, CSS",
    desc: "Developed a pet adoption website with a focus on intuitive design and accessibility. Applied responsive web design techniques for mobile compatibility."
  },
  food: {
    title: "Food Waste Management System – Java, MySQL",
    desc: "Developed a Java-based system for tracking, reducing, and managing food waste efficiently. Implemented user authentication, data tracking, and real-time database updates."
  },
  bsf: {
    title: "BSF – Bikers Safety First – Figma, UI/UX Design",
    desc: "Created interactive UI/UX wireframes and prototypes to enhance road safety awareness for bikers. Focused on usability testing and visual hierarchy to optimize user navigation."
  }
};

function showDetails(project) {
  document.getElementById("modalTitle").innerText = projectDetails[project].title;
  document.getElementById("modalDesc").innerText = projectDetails[project].desc;
  document.getElementById("projectModal").style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Close modal if clicked outside
window.onclick = function(event) {
  const modal = document.getElementById("projectModal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
