// Liquinex Premium Agency-Grade Core JavaScript
// Canvas Water Particles, Magnetic Buttons, Before/After Slider, Solutions Cycle, Scroll Reveal, Modal Drawer

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initCustomCursor();
    initCanvasParticles();
    initMagneticButtons();
    initSolutionsHub();
    initBeforeAfterSlider();
    initScrollReveal();
    initPortfolioGrid();
    initMobileNav();
});

/* 1. Scroll Progress Bar Indicator */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* 2. Custom Magnetic Cursor (Desktop Only) */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    if (!cursor || !dot) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    // Add lag to the outer cursor ring for a premium organic feel
    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on links and buttons
    const hoverables = document.querySelectorAll('a, button, .circular-node, .portfolio-card, .btn');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.borderColor = 'var(--color-accent)';
            cursor.style.backgroundColor = 'rgba(0, 229, 255, 0.05)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.borderColor = 'var(--color-accent)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/* 3. HTML5 Canvas Water Particle Engine (Hero Section) */
function initCanvasParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    // Track dimensions on window resize
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    });

    // Mouse coordinates inside hero
    let mouse = { x: null, y: null, radius: 120 };
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        heroSection.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });
    }

    // Particle class
    class Bubble {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.radius = Math.random() * 8 + 3;
            this.baseSpeed = Math.random() * 1.5 + 0.5;
            this.speedY = this.baseSpeed;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.wobble = Math.random() * Math.PI;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.y -= this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.3 + this.speedX;

            // Mouse repulsion physics
            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    // Push particles away from cursor
                    this.x += (dx / distance) * force * 4;
                    this.y += (dy / distance) * force * 4;
                }
            }

            // Loop reset when bubbles float off top screen
            if (this.y < -20 || this.x < -20 || this.x > width + 20) {
                this.y = height + Math.random() * 100;
                this.x = Math.random() * width;
                this.speedY = this.baseSpeed;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
            ctx.fill();
            
            // Subtle water drop reflection highlights
            ctx.beginPath();
            ctx.arc(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.15, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 1.5})`;
            ctx.fill();
        }
    }

    // Initialize 45 bubble particles
    const bubbleArray = [];
    for (let i = 0; i < 45; i++) {
        bubbleArray.push(new Bubble());
    }

    // Drawing animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);
        bubbleArray.forEach(bubble => {
            bubble.update();
            bubble.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/* 4. Magnetic Buttons Hover Physics */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-wrapper');
    magneticBtns.forEach(btnWrapper => {
        const btn = btnWrapper.querySelector('.btn');
        if (!btn) return;

        btnWrapper.addEventListener('mousemove', (e) => {
            const rect = btnWrapper.getBoundingClientRect();
            // Mouse distance from button center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Translate the button wrapper towards cursor by 35%
            btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });

        btnWrapper.addEventListener('mouseleave', () => {
            // Smoothly reset
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* 5. Circular Solutions Hub Specifications Selector */
const solutionsData = {
    'ceramic-uf': {
        title: 'Silicon Carbide Ceramic Ultrafiltration (UF)',
        description: 'Engineered for extreme performance and aggressive chemical loads. Utilizing flat-sheet silicon carbide membranes, this system delivers exceptional recovery rates, is highly oleophobic for oil-water separation, and cuts membrane operating expenses (OPEX) by over 50% through minimal fouling and thermal backwash resistance.',
        specs: ['Over 50% OPEX savings', 'Oleophobic Oil-Water separation', 'Fully automated chemical-free backwash', 'Flat sheet high solid loading']
    },
    'desalination': {
        title: 'Reverse Osmosis & Desalination (RO)',
        description: 'Advanced membrane engineering for industrial wastewater recycling, greywater polishing, and seawater desalination. Designed to achieve zero-liquid-discharge (ZLD) boundaries, recycling contaminated chemical wash water and high-salinity discharge loops at low specific energy footprints.',
        specs: ['ZLD compliance ready', '99.5% Salt rejection rate', 'Energy recovery turbine compatibility', 'Automated antiscalant dosing control']
    },
    'waterwall': {
        title: 'WaterWall Building Water Management',
        description: 'A wall-mounted, IoT-enabled building greywater recycling system. WaterWall recovers waste streams from washing basins, air-con condensates, and rainwater, processing it through combined ultrafiltration and Deep UVC LED systems for reuse in toilet flushing and local landscape irrigation.',
        specs: ['Integrated IoT cloud tracking', 'Wall-mounted compact layout', 'Pathogen reduction > 99.999%', 'Treated greywater recycle ready']
    },
    'humanitarian': {
        title: 'Humanitarian & Disaster Relief Suitcase',
        description: 'Our award-winning, suitcase-sized portable ultrafiltration system. Weighing under 30kg and completely solar-powered, it delivers up to 500 liters/hour of safe drinking water from any freshwater source. Extensively deployed in flood and earthquake relief zones by the Red Cross.',
        specs: ['Ultra-portable < 30kg packaging', 'Fully solar-compatible battery system', 'Chemical-free physical purification', 'Proven Red Cross field track record']
    }
};

function initSolutionsHub() {
    const nodes = document.querySelectorAll('.circular-node');
    const specCard = document.querySelector('.circular-spec-card');
    
    if (nodes.length === 0 || !specCard) return;

    const titleEl = specCard.querySelector('h3');
    const descEl = specCard.querySelector('p');
    const specsList = specCard.querySelector('.shop-specs-list');

    nodes.forEach(node => {
        node.addEventListener('click', () => {
            // Update active states
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const id = node.dataset.id;
            const data = solutionsData[id];
            if (!data) return;

            // Animate spec card content transition
            specCard.style.opacity = 0;
            specCard.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                titleEl.textContent = data.title;
                descEl.textContent = data.description;
                
                specsList.innerHTML = '';
                data.specs.forEach(spec => {
                    const li = document.createElement('li');
                    li.textContent = spec;
                    specsList.appendChild(li);
                });
                
                specCard.style.opacity = 1;
                specCard.style.transform = 'translateY(0)';
            }, 300);
        });
    });
}

/* 6. Drag-to-Reveal Before/After Slider (Aquaculture Case Study) */
function initBeforeAfterSlider() {
    const slider = document.querySelector('.before-after-slider');
    if (!slider) return;

    const afterImage = slider.querySelector('.after-image');
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;

    function moveSlider(clientX) {
        const rect = slider.getBoundingClientRect();
        // Calculate slider position between 0% and 100%
        let position = ((clientX - rect.left) / rect.width) * 100;
        
        // Clamp boundaries
        if (position < 0) position = 0;
        if (position > 100) position = 100;
        
        afterImage.style.width = position + '%';
        handle.style.left = position + '%';
    }

    // Touch and mouse click listeners
    handle.addEventListener('mousedown', () => isDragging = true);
    window.addEventListener('mouseup', () => isDragging = false);
    
    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        moveSlider(e.clientX);
    });

    // Touch events for mobile responsiveness
    handle.addEventListener('touchstart', () => isDragging = true);
    window.addEventListener('touchend', () => isDragging = false);
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        moveSlider(e.touches[0].clientX);
    });

    // Support clicking on the slider to slide directly
    slider.addEventListener('click', (e) => {
        if (e.target !== handle) {
            moveSlider(e.clientX);
        }
    });
}

/* 7. Scroll-Triggered Reveal & Counter Animation Engine */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const counterElements = document.querySelectorAll('.stat-number, .hero-stat-number');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Viewport Intersection Observer
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Stats Counter Animation Observer
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counterElements.forEach(el => counterObserver.observe(el));
}

function animateCounter(counterEl) {
    const text = counterEl.textContent.trim();
    // Parse target number
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;

    const suffix = text.replace(/[0-9]/g, ''); // Keep '+', '%', '>'
    let count = 0;
    const duration = 1500; // 1.5 seconds
    const intervalTime = Math.min(Math.ceil(duration / target), 30);
    const step = Math.ceil(target / (duration / intervalTime));

    const interval = setInterval(() => {
        count += step;
        if (count >= target) {
            counterEl.textContent = target + suffix;
            clearInterval(interval);
        } else {
            counterEl.textContent = count + suffix;
        }
    }, intervalTime);
}

/* 8. Portfolio Masonry Grid (Remaining Projects Database) */
const portfolioData = [
    {
        title: 'REC Cooling Tower Blowdown DBOO Project',
        client: 'REC Solar',
        location: 'Singapore',
        technology: 'Design-Build-Own-Operate (DBOO) / Water-as-a-Service',
        capacity: 'Up to 40 m³/hr (24/7)',
        category: 'industrial',
        description: 'A commercial Design-Build-Own-Operate project delivering processed, recycled water to REC Solar as a utility service. Operating 24/7 with a capacity of up to 40 m³/hr under a 5+5 year contract, this containerized, highly automated system recycles cooling tower blowdown water directly, offering immediate operational savings at a competitive rate of $1.35/m³ without client capital expenditure.',
        image: 'assets/slides/slide_16.png',
        slidePage: 16
    },
    {
        title: 'Alcon Wastewater Treatment System',
        client: 'Alcon',
        location: 'Singapore',
        technology: 'Compact Industrial Wastewater Treatment',
        capacity: '35 m³/day',
        category: 'industrial',
        description: 'A compact, automated wastewater treatment system engineered to handle industrial effluent from Alcon\'s Singapore manufacturing operations. The system processes 35 m³/day of chemical and manufacturing wastewater, utilizing pH adjustment, physical filtration, and automated controls to comply fully with Singapore\'s strict industrial discharge standards within a minimal facility footprint.',
        image: 'assets/slides/slide_17.png',
        slidePage: 17
    },
    {
        title: 'Chemical Wash Combined UF & RO Water Recycling',
        client: 'Industrial Chemical Drum Supplier',
        location: 'Singapore',
        technology: 'Combined Ultra-Filtration (UF) & Reverse Osmosis (RO)',
        capacity: '1 m³/hr',
        category: 'industrial',
        description: 'A specialized water recycling solution designed to handle heavily contaminated wash water from chemical drum cleaning operations. By combining robust ultrafiltration with fine reverse osmosis membranes, this system removes chemical residues and organic compounds, permitting the factory to reuse wash water in a closed loop, lowering municipal water costs and wastewater discharge volumes.',
        image: 'assets/slides/slide_15.png',
        slidePage: 15
    },
    {
        title: 'Containerized Wastewater System for Offshore Pipe Cleaning',
        client: 'Offshore & Marine Engineering Services',
        location: 'Singapore / Offshore',
        technology: 'Mobile Containerized Ultrafiltration',
        capacity: '1 m³/hr',
        category: 'industrial',
        description: 'A containerized, rugged wastewater treatment system designed to process and minimize wastewater generated during offshore plant pipe-cleaning operations. Because this highly saline and chemically active wash water cannot be directly discharged into the ocean, this system filters the slurry on-site, reducing the volume of waste requiring onshore transport and disposal by 90% and yielding massive logistic savings.',
        image: 'assets/slides/slide_18.png',
        slidePage: 18
    },
    {
        title: 'Industrial Oil-Water Separation System',
        client: 'Marine & Offshore Operators, Mining & F&B Industries',
        location: 'Asia-Pacific Region',
        technology: 'Graphene & Ceramic Membrane Coalescence',
        capacity: '5 m³/hr',
        category: 'industrial',
        description: 'A high-efficiency separation system designed to process wastewater contaminated with free and emulsified oils. While normal gravimetric separators fail to recover emulsified oil from the water column, this system uses advanced oleophobic membrane properties to achieve clean water extraction at a rate of 5 m³/hr, providing reliable discharge compliance for marine cleaning and food processing industries.',
        image: 'assets/slides/slide_19.png',
        slidePage: 19
    },
    {
        title: 'Starchy Wastewater Rice Water Recycling System',
        client: 'Rice Noodle Manufacturing Factory',
        location: 'Southeast Asia',
        technology: 'Starchy Wastewater Recovery & Recycling',
        capacity: '10 m³/hr',
        category: 'industrial',
        description: 'An innovative water recycling system developed to treat the starchy, pale-white wastewater produced during intensive rice washing in a noodle factory. The system efficiently recovers clean, reusable water at a rate of 10 m³/hr, reducing the plant\'s freshwater demand and sewer discharge fees while maintaining strict hygiene and sanitation standards.',
        image: 'assets/slides/slide_20.png',
        slidePage: 20
    },
    {
        title: 'Compact Microalgae Harvester & Water Clarifier',
        client: 'Bioenergy Developers & Aquaculture Farms',
        location: 'Southeast Asia',
        technology: 'Anti-Fouling Microalgae Biomass Extraction',
        capacity: '2 m³/hr',
        category: 'specialized',
        description: 'A specialized harvesting and filtration system designed to extract microalgae biomass from water. Operating at 2 m³/hr, the system employs custom anti-clogging mechanisms to prevent filter fouling by the sticky algal cake. It is used to collect algae for biofuels and nutritional extracts, as well as for clearing environmental algae blooms in lakes and canals.',
        image: 'assets/slides/slide_21.png',
        slidePage: 21
    },
    {
        title: 'Ultrafiltration System at Oman Fishmeal Plant',
        client: 'Fishmeal Manufacturing Facility',
        location: 'Oman',
        technology: 'Corrosion-Resistant Industrial Ultrafiltration',
        capacity: '10 m³/hr',
        category: 'industrial',
        description: 'An industrial-grade water treatment system deployed at a fishmeal processing plant in Oman. Designed to operate in a highly corrosive marine environment, this 10 m³/hr system filters heavy organic wastewater and suspended solids, preparing the effluent for safe coastal discharge or secondary industrial reuse.',
        image: 'assets/slides/slide_23.png',
        slidePage: 23
    },
    {
        title: 'Compact Wastewater Recovery for Mining Tailings',
        client: 'Coal Handling & Ore Extraction Mines',
        location: 'Southeast Asia',
        technology: 'Compact Scalable Mining Water Recovery',
        capacity: '3 m³/hr',
        category: 'specialized',
        description: 'A rugged, space-saving system engineered to recover clean, reusable water from mine tailings and coal washing operations. The system processes slurry water containing fine coal or sand particles that heavily pollute surrounding ecosystems, recovering clean water at 3 m³/hr to lower operational water costs and environmental impact.',
        image: 'assets/slides/slide_24.png',
        slidePage: 24
    },
    {
        title: 'Ceramic Membrane Solvent Recovery System',
        client: 'Aerospace Engineering Facility',
        location: 'Singapore',
        technology: 'Hot-Process Fluid Ceramic Ultrafiltration',
        capacity: '3 m³/hr',
        category: 'industrial',
        description: 'An advanced ceramic membrane filtration system engineered to clean and recover industrial solvents and hot process fluids. By operating at high temperatures and resisting harsh chemical breakdown, this system cleans contaminated solvent streams at 3 m³/hr, enabling long-term solvent reuse and reducing chemical procurement and disposal expenses.',
        image: 'assets/slides/slide_25.png',
        slidePage: 25
    },
    {
        title: 'Potable Drinking Water System for Rio Tinto',
        client: 'Rio Tinto Mining Operations',
        location: 'Remote Mining Site',
        technology: 'Automated Remote Potable Water Purification',
        capacity: '10 m³/hr',
        category: 'municipal',
        description: 'A fully automated, heavy-duty water treatment system deployed at a remote Rio Tinto mining site. Operating at a capacity of 10 m³/hr, this containerized system filters and disinfects raw surface water, supplying clean, safe drinking water for mining personnel in compliance with international drinking water standards.',
        image: 'assets/slides/slide_26.png',
        slidePage: 26
    },
    {
        title: 'Collaboration with GrahamTek Nuwater on 16" RO System',
        client: 'GrahamTek Nuwater Joint Collaboration',
        location: 'Southeast Asia',
        technology: '16-Inch Reverse Osmosis (RO) Integration',
        capacity: 'High-Volume Municipal / Industrial Scale',
        category: 'specialized',
        description: 'A collaborative engineering project focusing on the design and system-integration of large-scale 16-inch Reverse Osmosis (RO) systems. This joint effort demonstrates Liquinex\'s capability to scale and integrate major municipal and industrial desalination infrastructure in partnership with global water technology leaders.',
        image: 'assets/slides/slide_45.png',
        slidePage: 45
    }
];

function initPortfolioGrid() {
    const grid = document.querySelector('.portfolio-grid');
    const filterContainer = document.querySelector('.filter-container');
    const modal = document.querySelector('.modal-overlay');
    
    if (!grid || !filterContainer || !modal) return;

    function renderGrid(filteredData) {
        grid.innerHTML = '';
        if (filteredData.length === 0) {
            grid.innerHTML = '<div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 3rem;">No projects found in this category.</div>';
            return;
        }

        filteredData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" loading="lazy">
                <div class="portfolio-card-overlay">
                    <span>${project.category.toUpperCase()}</span>
                    <h4>${project.title}</h4>
                </div>
            `;
            card.addEventListener('click', () => openProjectModal(project));
            grid.appendChild(card);
        });
    }

    renderGrid(portfolioData);

    // Filter Logic
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.dataset.filter;
        
        if (category === 'all') {
            renderGrid(portfolioData);
        } else {
            const filtered = portfolioData.filter(p => p.category === category);
            renderGrid(filtered);
        }
    });

    // Close Modal Event Listeners
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openProjectModal(project) {
    const modal = document.querySelector('.modal-overlay');
    if (!modal) return;

    const modalImg = modal.querySelector('.modal-hero-img');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBadge = modal.querySelector('.modal-badge');
    const modalDesc = modal.querySelector('.modal-description');
    
    modalTitle.textContent = project.title;
    modalBadge.textContent = project.category.toUpperCase();
    modalDesc.textContent = project.description;
    
    modalImg.src = project.image;
    modalImg.alt = project.title;

    const specsList = modal.querySelector('.modal-specs-list');
    specsList.innerHTML = `
        <li class="modal-spec-item">
            <strong>Client Name</strong>
            <span>${project.client}</span>
        </li>
        <li class="modal-spec-item">
            <strong>Location</strong>
            <span>${project.location}</span>
        </li>
        <li class="modal-spec-item">
            <strong>Technology Utilized</strong>
            <span>${project.technology}</span>
        </li>
        <li class="modal-spec-item">
            <strong>Treatment Capacity</strong>
            <span>${project.capacity}</span>
        </li>
        <li class="modal-spec-item">
            <strong>Slide Page Reference</strong>
            <span>Slide ${project.slidePage}</span>
        </li>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/* 9. Mobile Navigation Menu */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navToggle.textContent = '✕';
            header.style.background = 'rgba(2, 8, 19, 0.98)';
        } else {
            navToggle.textContent = '☰';
            if (window.scrollY <= 50) {
                header.style.background = 'transparent';
            }
        }
    });

    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.textContent = '☰';
        });
    });

    // Sticky header background transition
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.background = '';
        } else {
            header.classList.remove('scrolled');
            if (!navMenu.classList.contains('active')) {
                header.style.background = 'transparent';
            }
        }
    });
}
