/**
 * ADITYA KUMAR - PORTFOLIO INTERACTIVE CONTROLLER
 * Author: Aditya Kumar
 * Description: Modular, high-performance JS controller for Theme Switcher,
 * Navbar, ScrollSpy, Project Filters, Modals, Form Validation, & Animations.
 */

// ==========================================================================
// 1. CONFIGURATION (Easy to customize links & variables)
// ==========================================================================
const CONFIG = {
    developerName: "Aditya Kumar",
    email: "adityakumar.dev@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    resumePath: "assets/Aditya_Kumar_Resume.pdf"
};

// Project Details Data Payload for Modals
const PROJECT_DETAILS = {
    weather: {
        title: "Weather Application",
        category: "Web / JavaScript",
        techStack: ["HTML5", "CSS3", "JavaScript (ES6)", "OpenWeather API Concepts"],
        image: "assets/images/weather-app.jpg",
        description: "A sleek, responsive web application built to display real-time weather information and forecast metrics through a modern glassmorphic interface.",
        features: [
            "Real-time location weather metrics & humidity data",
            "Responsive layout adapted for desktop & mobile devices",
            "Clean visual dashboard with weekly forecast visualization",
            "Error handling for invalid queries and API timeouts"
        ],
        github: "https://github.com",
        demo: "#"
    },
    portfolio: {
        title: "Personal Portfolio Website",
        category: "Web / JavaScript",
        techStack: ["HTML5", "CSS3", "JavaScript", "Responsive Design System"],
        image: "assets/images/portfolio-site.jpg",
        description: "A premium, recruiter-focused personal developer portfolio showcasing technical skills, academic background, featured projects, and professional background.",
        features: [
            "Dark & Light mode toggle with localStorage persistence",
            "Working project filter system for Web, JavaScript, and C++ projects",
            "Interactive modal dialogs for deep-dive project breakdowns",
            "Accessible contact form with real-time validation feedback",
            "Sleek hero section with animated syntax-highlighted IDE window"
        ],
        github: "https://github.com",
        demo: "#home"
    },
    amazon: {
        title: "Amazon Clone",
        category: "Web Development",
        techStack: ["HTML5", "CSS3", "JavaScript"],
        image: "assets/images/amazon-clone.jpg",
        description: "A responsive e-commerce web platform frontend inspired by Amazon, featuring product listing grids, shopping cart interfaces, and modern layout structure.",
        features: [
            "E-commerce layout structure featuring navigation header and banner sliders",
            "Product grid showcasing items, pricing, and ratings",
            "Responsive cart summary panel and checkout interface mock",
            "Pure HTML, CSS, and JS implementation without heavy frameworks"
        ],
        github: "https://github.com",
        demo: "#"
    },
    bank: {
        title: "Bank Management System",
        category: "C++ System Application",
        techStack: ["C++", "Object-Oriented Programming (OOP)", "File Handling"],
        image: "assets/images/bank-system.jpg",
        description: "A console-based banking management software engineered in C++ that models essential banking operations and account administration.",
        features: [
            "New account creation and customer profile registration",
            "Account balance inquiry, deposit, and withdrawal processing",
            "Encrypted file I/O operations for persistent account storage",
            "Robust input validation to prevent invalid transactions"
        ],
        github: "https://github.com",
        demo: null
    },
    hostel: {
        title: "Hostel Management System",
        category: "C++ System Application",
        techStack: ["C++", "Data Structures", "CLI File Management"],
        image: "assets/images/hostel-system.jpg",
        description: "A terminal-based administrative software built in C++ to automate hostel room allocations, resident student records, and fee status tracking.",
        features: [
            "Student registration and room allocation management",
            "Search and filter records by student ID or room number",
            "File handling for data persistence across application sessions",
            "Clean terminal menu navigation with interactive prompts"
        ],
        github: "https://github.com",
        demo: null
    }
};

// ==========================================================================
// 2. DOM CONTENT LOADED INITIALIZER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavbar();
    initScrollSpy();
    initProjectFilter();
    initModals();
    initFormValidation();
    initBackToTop();
    initHeroCodeTyper();
    updateConfigLinks();
});

// Update dynamic config links across the page
function updateConfigLinks() {
    const emailEls = [
        document.getElementById("heroEmailLink"),
        document.getElementById("contactEmailDisplay"),
        document.getElementById("footerEmail")
    ];
    emailEls.forEach(el => {
        if (el) {
            if (el.tagName === 'A') el.href = `mailto:${CONFIG.email}`;
            if (el.innerText && el.innerText.includes('@')) el.innerText = CONFIG.email;
        }
    });

    const githubEls = [
        document.getElementById("heroGithubLink"),
        document.getElementById("contactGithubDisplay"),
        document.getElementById("footerGithub")
    ];
    githubEls.forEach(el => {
        if (el) {
            if (el.tagName === 'A') el.href = CONFIG.githubUrl;
        }
    });

    const linkedinEls = [
        document.getElementById("heroLinkedinLink"),
        document.getElementById("contactLinkedinDisplay"),
        document.getElementById("footerLinkedin")
    ];
    linkedinEls.forEach(el => {
        if (el) {
            if (el.tagName === 'A') el.href = CONFIG.linkedinUrl;
        }
    });
}

// ==========================================================================
// 3. THEME MANAGEMENT (DARK / LIGHT MODE)
// ==========================================================================
function initTheme() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    const savedTheme = localStorage.getItem("portfolio_theme");
    
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio_theme", newTheme);
            showToast(`Switched to ${newTheme} mode`);
        });
    }
}

// ==========================================================================
// 4. NAVBAR, MOBILE MENU & SCROLL PROGRESS
// ==========================================================================
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const mobileToggleBtn = document.getElementById("mobileToggleBtn");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const progressBar = document.getElementById("progressBar");

    // Scroll listener for sticky navbar & progress bar
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (scrollTop > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Mobile Hamburger Toggle
    if (mobileToggleBtn && navMenu) {
        mobileToggleBtn.addEventListener("click", () => {
            const isOpen = navMenu.classList.contains("open");
            if (isOpen) {
                navMenu.classList.remove("open");
                mobileToggleBtn.classList.remove("open");
                mobileToggleBtn.setAttribute("aria-expanded", "false");
            } else {
                navMenu.classList.add("open");
                mobileToggleBtn.classList.add("open");
                mobileToggleBtn.setAttribute("aria-expanded", "true");
            }
        });

        // Close mobile menu when nav link clicked
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                mobileToggleBtn.classList.remove("open");
                mobileToggleBtn.setAttribute("aria-expanded", "false");
            });
        });
    }
}

// ==========================================================================
// 5. SCROLLSPY ACTIVE NAV HIGHLIGHT
// ==========================================================================
function initScrollSpy() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 6. PROJECT FILTER LOGIC
// ==========================================================================
function initProjectFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // Update active button state
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            projectCards.forEach(card => {
                const categories = card.getAttribute("data-category");
                
                if (filterValue === "all" || (categories && categories.includes(filterValue))) {
                    card.classList.remove("hidden");
                    card.style.animation = "fadeInUp 0.4s ease forwards";
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

// ==========================================================================
// 7. MODALS (PROJECT DETAILS & RESUME VIEWER)
// ==========================================================================
function initModals() {
    const projectModal = document.getElementById("projectModal");
    const closeProjectModal = document.getElementById("closeProjectModal");
    const modalContent = document.getElementById("modalContent");
    const viewDetailsBtns = document.querySelectorAll(".view-details-btn");

    const resumeModal = document.getElementById("resumeModal");
    const viewResumeBtn = document.getElementById("viewResumeBtn");
    const closeResumeModal = document.getElementById("closeResumeModal");

    // Open Project Detail Modal
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const projectKey = btn.getAttribute("data-project");
            const data = PROJECT_DETAILS[projectKey];

            if (data && modalContent) {
                modalContent.innerHTML = `
                    <div class="modal-project-header">
                        <span class="project-category-tag" style="margin-bottom:8px; display:inline-block;">${data.category}</span>
                        <h2 style="font-size:1.75rem; font-weight:800; margin-bottom:12px;">${data.title}</h2>
                    </div>
                    <div style="margin-bottom:20px; border-radius:12px; overflow:hidden; aspect-ratio:16/9;">
                        <img src="${data.image}" alt="${data.title}" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <p style="font-size:1rem; color:var(--text-secondary); margin-bottom:20px; line-height:1.6;">${data.description}</p>
                    
                    <h4 style="font-size:1rem; font-weight:700; margin-bottom:10px; color:var(--accent-primary);">Key Features:</h4>
                    <ul style="margin-bottom:24px; padding-left:20px; color:var(--text-muted); font-size:0.925rem;">
                        ${data.features.map(f => `<li style="margin-bottom:6px;">${f}</li>`).join("")}
                    </ul>

                    <h4 style="font-size:1rem; font-weight:700; margin-bottom:10px; color:var(--accent-primary);">Technologies Used:</h4>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:28px;">
                        ${data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join("")}
                    </div>

                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <a href="${data.github}" target="_blank" class="btn btn-primary" style="padding:8px 18px; font-size:0.875rem;">View Source Code</a>
                        ${data.demo ? `<a href="${data.demo}" class="btn btn-secondary" style="padding:8px 18px; font-size:0.875rem;">Live Preview</a>` : ''}
                    </div>
                `;

                projectModal.classList.add("active");
                projectModal.setAttribute("aria-hidden", "false");
            }
        });
    });

    if (closeProjectModal) {
        closeProjectModal.addEventListener("click", () => {
            projectModal.classList.remove("active");
            projectModal.setAttribute("aria-hidden", "true");
        });
    }

    // Open Resume Modal
    if (viewResumeBtn && resumeModal) {
        viewResumeBtn.addEventListener("click", () => {
            resumeModal.classList.add("active");
            resumeModal.setAttribute("aria-hidden", "false");
        });
    }

    if (closeResumeModal && resumeModal) {
        closeResumeModal.addEventListener("click", () => {
            resumeModal.classList.remove("active");
            resumeModal.setAttribute("aria-hidden", "true");
        });
    }

    // Close on outside click
    window.addEventListener("click", (e) => {
        if (e.target === projectModal) {
            projectModal.classList.remove("active");
            projectModal.setAttribute("aria-hidden", "true");
        }
        if (e.target === resumeModal) {
            resumeModal.classList.remove("active");
            resumeModal.setAttribute("aria-hidden", "true");
        }
    });

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (projectModal) projectModal.classList.remove("active");
            if (resumeModal) resumeModal.classList.remove("active");
        }
    });
}

// ==========================================================================
// 8. CONTACT FORM VALIDATION & SUBMISSION HANDLER
// ==========================================================================
function initFormValidation() {
    const contactForm = document.getElementById("contactForm");
    
    if (!contactForm) return;

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const subject = document.getElementById("subject");
    const message = document.getElementById("message");

    const fullNameError = document.getElementById("fullNameError");
    const emailError = document.getElementById("emailError");
    const subjectError = document.getElementById("subjectError");
    const messageError = document.getElementById("messageError");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        // Reset errors
        [fullName, email, subject, message].forEach(input => input.classList.remove("invalid"));
        [fullNameError, emailError, subjectError, messageError].forEach(err => err.classList.remove("visible"));

        // Validate Full Name
        if (!fullName.value.trim()) {
            fullName.classList.add("invalid");
            fullNameError.classList.add("visible");
            isValid = false;
        }

        // Validate Email
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            email.classList.add("invalid");
            emailError.classList.add("visible");
            isValid = false;
        }

        // Validate Subject
        if (!subject.value.trim()) {
            subject.classList.add("invalid");
            subjectError.classList.add("visible");
            isValid = false;
        }

        // Validate Message
        if (!message.value.trim() || message.value.trim().length < 10) {
            message.classList.add("invalid");
            messageError.classList.add("visible");
            isValid = false;
        }

        if (isValid) {
            const submitBtn = document.getElementById("submitFormBtn");
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = `<span>Sending...</span>`;
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast("Message sent successfully! Thank you for reaching out.");
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    });
}

// ==========================================================================
// 9. BACK TO TOP BUTTON
// ==========================================================================
function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTopBtn");

    if (!backToTopBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("visible");
        } else {
            backToTopBtn.classList.remove("visible");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================================================================
// 10. HERO SYNTAX-HIGHLIGHTED CODE WINDOW TYPER
// ==========================================================================
function initHeroCodeTyper() {
    const codeElement = document.getElementById("typedCode");
    if (!codeElement) return;

    // Code card visual is already syntax highlighted in HTML.
    // Add subtle visual heartbeat pulse to editor status
}

// ==========================================================================
// 11. TOAST NOTIFICATION HELPER
// ==========================================================================
function showToast(msg) {
    const toast = document.getElementById("toastNotification");
    const toastMessage = document.getElementById("toastMessage");

    if (toast && toastMessage) {
        toastMessage.innerText = msg;
        toast.classList.add("active");

        setTimeout(() => {
            toast.classList.remove("active");
        }, 3500);
    }
}
