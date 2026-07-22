/* ==========================================
   Umair Khalid - Interactive CV Logic
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Management (Light / Dark mode)
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    setTheme(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // 2. Mobile Menu Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuBtn.textContent = navLinks.classList.contains('mobile-open') ? '✕' : '☰';
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-open');
                mobileMenuBtn.textContent = '☰';
            });
        });
    }

    // 3. Project Filter Tabs Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 4. Modal Popup Logic for Project Details
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalTech = document.getElementById('modalTech');
    const modalBody = document.getElementById('modalBody');

    // Detailed Modal Information Dictionary with Natural, Concrete Engineering Phrasing
    const projectDetailsData = {
        'found-pakistan': {
            title: "FoundPakistan — Lost & Found Web Platform",
            tech: "Next.js · Node.js · PostgreSQL · MongoDB · REST APIs",
            description: "A lost-and-found web application built to connect missing item filings with retrieved item reports across Pakistan.",
            features: [
                "<b>Similarity Ranking Algorithm:</b> Built a matching engine that scores potential case matches (0–100%) based on item attributes and location parameters.",
                "<b>Contact Approval Workflow:</b> Implemented a contact-request feature that hides personal details publicly until both parties explicitly approve communication.",
                "<b>Administrative Verification:</b> Developed admin verification queues for reviewing potential matches and dispatched automated transactional emails."
            ]
        },
        'blazor-ebook': {
            title: "Blazor E-Book Shelf — Digital Library Platform",
            tech: "Blazor Server · .NET 9 · EF Core · SQL Server · LINQ",
            description: "A digital book reading and subscription management web application built with Blazor Server (.NET 9).",
            features: [
                "<b>LINQ & Query Optimization:</b> Optimized EF Core queries using projections and indexing to eliminate N+1 queries and reduce data retrieval overhead.",
                "<b>Interactive Reader Component:</b> Created custom Blazor components for chapter rendering, user bookmarks, and reading history.",
                "<b>Role-Based Authorization:</b> Implemented Role-Based Access Control (RBAC) across Readers, Authors, and Administrators."
            ]
        },
        'razor-portfolio': {
            title: "Portfolio CMS — Admin Back-Office System",
            tech: "ASP.NET Core Razor Pages · .NET 8 · EF Core · SQL Server",
            description: "A dynamic portfolio website featuring a secure administrative back-office system.",
            features: [
                "<b>Admin Dashboard:</b> Built a password-protected administrative back-office using ASP.NET Core Razor Pages for real-time project and contact management.",
                "<b>Relational Database Architecture:</b> Structured SQL Server schema managed via Entity Framework Core migrations with anti-forgery form validation."
            ]
        },
        'mvc-blog': {
            title: "ASP.NET Core Blog — Publishing Platform & Web API",
            tech: "ASP.NET Core MVC · .NET 8 · Web API · EF Core · ViewModels",
            description: "A blogging web application emphasizing Clean Architecture, decoupled ViewModels, and RESTful API endpoints.",
            features: [
                "<b>Clean Architecture:</b> Applied Clean Architecture and repository patterns to separate business logic from data access layers.",
                "<b>REST API Integration:</b> Exposed Web API endpoints for article listing, category filtering, and user authentication."
            ]
        },
        'nha-tolling': {
            title: "NHA E-Tolling System (In Progress)",
            tech: "C# · .NET Core · SQL Server · Transaction Backend",
            description: "An automated electronic toll collection backend currently under development for highway transit logging and fee calculation.",
            features: [
                "<b>Transaction Logging:</b> Developing backend transaction logic designed to handle high-volume vehicle transit logs.",
                "<b>Reconciliation & Analytics:</b> Designing database schemas for daily toll gate reconciliation, shift reporting, and revenue auditing."
            ]
        },
        'notes-pro': {
            title: "NotesPro — Cross-Platform MAUI App",
            tech: ".NET 10 MAUI · C# · SQLite Local Storage · MVVM Pattern",
            description: "A cross-platform desktop and mobile note-taking software application built on .NET MAUI framework.",
            features: [
                "<b>Cross-Platform Codebase:</b> Built a note-taking application targeting Windows and Android from a single C# codebase.",
                "<b>Offline Local Persistence:</b> Embedded SQLite database synchronization, keyword search indexing, and MVVM data binding patterns."
            ]
        },
        'vuln-scanner': {
            title: "IS Vulnerability Audit Scanner",
            tech: "C++ · Socket Programming · Security Audit Protocols",
            description: "A cybersecurity utility built to perform automated network port audits and flag configuration flaws.",
            features: [
                "<b>Port Scanner:</b> Multi-threaded C++ TCP/UDP socket scanner identifying active network services and open service banners.",
                "<b>Rule Verification:</b> Automated checks against known vulnerability signatures and server configurations."
            ]
        },
        'cxx-raylib': {
            title: "Queue-Based Game Engine",
            tech: "C++ · Raylib Graphics Engine · Custom FIFO Queues",
            description: "2D game rendering engine demonstrating data structure fundamentals and real-time game loop state management.",
            features: [
                "<b>FIFO Queue Data Structures:</b> Utilized custom queue structures for spatial movement calculations, maintaining a smooth 60 FPS rendering loop.",
                "<b>Event Loop:</b> Low-latency frame-rate management and collision detection via Raylib library."
            ]
        }
    };

    // Attach Event Listeners to Detail Buttons
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const projectId = btn.getAttribute('data-project-id');
            const data = projectDetailsData[projectId];
            if (data) {
                modalTitle.textContent = data.title;
                modalTech.textContent = data.tech;
                
                let htmlContent = `<p>${data.description}</p>`;
                htmlContent += `<div class="modal-section-heading">Key Architectural Highlights:</div>`;
                htmlContent += `<ul>`;
                data.features.forEach(feat => {
                    htmlContent += `<li>${feat}</li>`;
                });
                htmlContent += `</ul>`;
                
                modalBody.innerHTML = htmlContent;
                modalOverlay.classList.add('active');
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // 5. Print / Export to PDF
    const printCvBtn = document.getElementById('printCvBtn');
    if (printCvBtn) {
        printCvBtn.addEventListener('click', () => {
            window.print();
        });
    }
});
