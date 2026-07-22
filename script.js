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

    // Detailed Modal Information Dictionary with Professional Engineering Phrasing
    const projectDetailsData = {
        'found-pakistan': {
            title: "FoundPakistan – AI-Assisted Lost & Found Portal",
            tech: "Next.js, Node.js / Express REST APIs, PostgreSQL / MongoDB, Automated Matching Engine",
            description: "An enterprise-grade, privacy-first web application designed to connect lost item reports with retrieved item filings across Pakistan using automated score matching algorithms.",
            features: [
                "<b>Automated Case Matching Engine:</b> Computes match probability scores (0–100%) between missing case entries and found case filings using item telemetry and location parameters.",
                "<b>Privacy Shield & Contact Request System:</b> Protects user identity by masking contact info publicly; implements a multi-step Contact Request workflow requiring explicit approval before sharing phone/email details.",
                "<b>Administrative Verification Queue:</b> Provides system administrators with a dedicated verification dashboard to confirm or dismiss auto-generated potential case matches.",
                "<b>Transactional Email Pipeline:</b> Dispatches automated email notifications upon contact request submission, approval, rejection, and admin match confirmations."
            ]
        },
        'blazor-ebook': {
            title: "Blazor E-Book Shelf Platform",
            tech: "Blazor Server, .NET 9, EF Core, SQL Server, LINQ, Bootstrap",
            description: "A high-performance digital library engine and subscription management portal built with modern Blazor Server (.NET 9).",
            features: [
                "<b>Interactive Reader Component:</b> Custom component architecture for real-time chapter rendering, user bookmarks, and reading history.",
                "<b>Admin & Subscription Back-Office:</b> Complete administrative control over book catalogs, subscription tier enforcement, user role assignments, and site dynamic banners.",
                "<b>Role-Based Access Control (RBAC):</b> Enforces strict authorization policies across Readers, Authors, and System Administrators.",
                "<b>Database & Query Optimization:</b> Leveraged Entity Framework Core 9 and LINQ projection queries for zero-latency data fetching."
            ]
        },
        'razor-portfolio': {
            title: "Razor Pages Portfolio & Content Management System",
            tech: "ASP.NET Core Razor Pages, .NET 8, EF Core, SQL Server, Custom CSS",
            description: "A production-grade dynamic portfolio solution featuring an integrated administrative back-office system.",
            features: [
                "<b>Dynamic Admin Dashboard:</b> Password-authenticated back-office enabling real-time CRUD operations over project showcases, skill matrices, and client inquiries.",
                "<b>Relational Database Architecture:</b> Structured SQL Server schema managed via Entity Framework Core Code-First migrations.",
                "<b>Security & Anti-Forgery:</b> Form token validation, XSS input sanitization, and strict request filtering."
            ]
        },
        'mvc-blog': {
            title: "ASP.NET Core MVC Blog Platform & RESTful APIs",
            tech: "ASP.NET Core MVC, .NET 8, EF Core, SQL Server, RESTful APIs, ViewModels",
            description: "Full-stack publishing engine emphasizing Clean Architecture principles, loose coupling, and RESTful service exposure.",
            features: [
                "<b>Clean Architecture Alignment:</b> Engineered using decoupled ViewModels, service abstractions, and repository pattern layers.",
                "<b>REST API Endpoints:</b> Exposed RESTful web endpoints for external feed indexing, article search, and automated content publishing.",
                "<b>User Authentication & Threaded Comments:</b> Secure user registration, cookie/session management, and multi-level article comments."
            ]
        },
        'nha-tolling': {
            title: "NHA E-Tolling Systems Solution (In Progress)",
            tech: "C#, .NET Core, SQL Server, High-Throughput Audit Engine",
            description: "An automated electronic toll collection management backend currently under active development, designed for high-concurrency highway transaction logging and vehicle fee computation.",
            features: [
                "<b>Transaction Audit Engine:</b> Real-time data logging for vehicle passages, classification algorithms, and toll fee calculation.",
                "<b>Reconciliation & Analytics:</b> Automated daily toll gate reconciliation, shift reporting, and administrative revenue verification."
            ]
        },
        'notes-pro': {
            title: "NotesPro Cross-Platform Application",
            tech: ".NET 10 MAUI, C#, SQLite Local Storage, MVVM Pattern",
            description: "Next-generation cross-platform desktop and mobile note-taking software application built on .NET MAUI framework.",
            features: [
                "<b>Single C# Codebase:</b> Deployed natively across Android and Windows Desktop using unified .NET MAUI UI declarations.",
                "<b>Local SQLite Persistence:</b> Embedded database synchronization, instant keyword indexing, and rich note categorizations."
            ]
        },
        'vuln-scanner': {
            title: "Information Security Vulnerability Scanner",
            tech: "C++, Socket Programming, Multi-threaded Auditing Protocols",
            description: "Collaborative cybersecurity diagnostic application built to perform automated network port audits and flag system vulnerability vectors.",
            features: [
                "<b>Port Scanning Engine:</b> Rapid multi-threaded TCP/UDP socket scanner identifying active network services and open pathways.",
                "<b>Security Rule Audit:</b> Automated verification against known vulnerability signatures and misconfigured server service banners."
            ]
        },
        'cxx-raylib': {
            title: "Data Structures Game Engine (Raylib C++)",
            tech: "C++, Raylib Graphics Engine, Custom Data Structures (Queues)",
            description: "2D game rendering engine demonstrating data structure fundamentals and real-time game loop state management.",
            features: [
                "<b>Algorithmic Queue Implementation:</b> Utilized custom FIFO queue data structures to compute snake segment movement and spatial collision matrices.",
                "<b>Graphics & Audio Integration:</b> High frame-rate 2D graphics rendering and low-latency input event loop via Raylib library."
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
