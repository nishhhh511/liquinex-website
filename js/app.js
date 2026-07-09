// Liquinex Premium Core App Logic
// Canvas Bubbles, Scroll Flow Timeline, Solutions Selector, Case-Study Dashboard, Technical Blueprint Tabs, Lightbox, Drawer Bug Fixes

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initCustomCursor();
    initCanvasParticles();
    initMagneticButtons();
    initJourneyFlow();
    initSolutionsHub();
    initScrollReveal();
    initCaseStudyDashboard();
    initMobileNav();
    initModalDrawer();
    initShopBrochure();
});

/* 1. Scroll Progress Bar */
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

/* 2. Custom Magnetic Cursor (Lagging Outer Ring) */
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

    const hoverables = document.querySelectorAll('a, button, .circular-node, .project-index-item, .cs-gallery-thumbnail, .btn, .cs-tab-btn');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '42px';
            cursor.style.height = '42px';
            cursor.style.borderColor = 'var(--color-accent)';
            cursor.style.backgroundColor = 'rgba(0, 229, 255, 0.08)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.borderColor = 'var(--color-accent)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/* 3. HTML5 Canvas Water Particle Collision Loop */
function initCanvasParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
    });

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

    class Bubble {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.radius = Math.random() * 6 + 2;
            this.baseSpeed = Math.random() * 1.2 + 0.4;
            this.speedY = this.baseSpeed;
            this.speedX = Math.random() * 0.4 - 0.2;
            this.opacity = Math.random() * 0.25 + 0.08;
            this.wobble = Math.random() * Math.PI;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        }

        update() {
            this.y -= this.speedY;
            this.wobble += this.wobbleSpeed;
            this.x += Math.sin(this.wobble) * 0.25 + this.speedX;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x += (dx / distance) * force * 3.5;
                    this.y += (dy / distance) * force * 3.5;
                }
            }

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
        }
    }

    const bubbleArray = [];
    for (let i = 0; i < 40; i++) {
        bubbleArray.push(new Bubble());
    }

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

/* 4. Magnetic Button Physics */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-wrapper');
    magneticBtns.forEach(btnWrapper => {
        const btn = btnWrapper.querySelector('.btn');
        if (!btn) return;

        btnWrapper.addEventListener('mousemove', (e) => {
            const rect = btnWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        btnWrapper.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* 5. Scroll storytelling journey flow progress line */
function initJourneyFlow() {
    const journeySection = document.getElementById('about');
    const flowProgress = document.querySelector('.journey-flow-progress');
    if (!journeySection || !flowProgress) return;

    window.addEventListener('scroll', () => {
        const rect = journeySection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrolledIntoSection = window.innerHeight - rect.top;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            let percentage = (scrolledIntoSection / (sectionHeight + window.innerHeight)) * 100;
            percentage = Math.max(0, Math.min(100, percentage));
            flowProgress.style.height = percentage + '%';
        }
    });
}

/* 6. Solutions Selector Nodes */
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
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const id = node.dataset.id;
            const data = solutionsData[id];
            if (!data) return;

            specCard.style.opacity = 0;
            specCard.style.transform = 'translateY(12px)';
            
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

/* 7. Scroll-Reveal Observer */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const counterElements = document.querySelectorAll('.stat-number, .hero-stat-number, .impact-metric-card h4');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

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
    const target = parseInt(text.replace(/[^0-9]/g, ''));
    if (isNaN(target)) return;

    const suffix = text.replace(/[0-9]/g, '');
    let count = 0;
    const duration = 1500;
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

/* 8. Redesigned Case-Study Dashboard Data (Slide Screenshots removed, photographs mapped) */
const caseStudiesData = [
    {
        id: 'perak-river',
        title: 'River Water Treatment System for Lembaga Air Perak',
        client: 'Lembaga Air Perak (Perak Water Board)',
        country: 'Malaysia',
        industry: 'Municipal Potable Water Supply',
        technology: 'Ultrafiltration (UF) Membrane Filtration',
        capacity: '30 m³/hr (200,000 Liters/Day)',
        year: '2016',
        techTag: 'UF',
        slidePage: 12,
        challenge: 'Rural communities around Kampung Perlop lacked a stable clean water source. Sourcing water from the Sungei Siput River presented seasonal mud slides, high organic loading, and severe turbidity spikes exceeding 160 NTU, rendering traditional sand filters obsolete and causing high maintenance failures.',
        solution: 'Liquinex designed and deployed a compact, modular ultrafiltration (UF) system utilizing robust hollow-fiber membranes. The system utilizes physical filtration barriers that completely capture suspended solids and pathogens without chemical additions.',
        implementation: 'Constructed as a pre-fabricated, skid-mounted layout to enable rapid field installation. The plant integrates automated backwash cycles using raw water flushes to keep the membranes clear, minimizing downtime and human monitoring.',
        results: 'Delivers 200,000 liters of safe drinking water per day. Laboratory results verify turbidity is reduced to under 1.12 NTU (far below the target of 5 NTU), ensuring compliant, chemical-free drinking water for local consumers.',
        image: 'assets/images/page_12_img_3.jpeg', // Clean photograph
        slide: 'assets/slides/slide_12.png',       // Technical diagram slide
        gallery: [
            'assets/images/page_12_img_3.jpeg',
            'assets/images/page_12_img_5.jpeg',
            'assets/images/page_42_img_1.jpeg',
            'assets/images/page_42_img_3.jpeg'
        ]
    },
    {
        id: 'singapore-zoo-aquaculture',
        title: 'Aquaculture Recirculating RAS System for River Safari',
        client: 'Singapore Zoo (Wildlife Reserves Singapore)',
        country: 'Singapore',
        industry: 'Zoo & Leisure Aquaculture Support',
        technology: 'Compact Recirculating Aquaculture System (RAS) Membrane Loop',
        capacity: '1 m³/hr',
        year: '2018',
        techTag: 'RAS',
        slidePage: 22,
        challenge: 'Maintaining water hygiene in major aquariums and fish tanks requires constant removal of fish excrement, bacteria, and algae blooms. Bulky sand filters require large footprints, frequent sand replacements, high manpower, and waste massive amounts of backwash water.',
        solution: 'Developed a high-performance Recirculating Aquaculture System using compact hollow-fiber membranes. The system replaces sand tanks, operating a physical barrier loop that filters out microalgae, bacteria, and particulates.',
        implementation: 'Installed inline directly on the River Safari tank circulation loops. The system includes compact automatic reverse flushes that clean the filter in seconds using minimal water.',
        results: 'Maintains optimal tank water clarity with a significantly reduced footprint. Water loss during backwashing was slashed, and manual maintenance cycles were cut down, ensuring a clean, organic environment for aquatic animals.',
        image: 'assets/images/page_22_img_2.jpeg',
        slide: 'assets/slides/slide_22.png',
        gallery: [
            'assets/images/page_22_img_2.jpeg',
            'assets/images/page_22_img_6.jpeg',
            'assets/images/page_21_img_6.jpeg'
        ]
    },
    {
        id: 'rec-cooling-uf',
        title: 'Ceramic Membrane UF System for REC Solar Cooling Towers',
        client: 'REC Solar Group',
        country: 'Singapore',
        industry: 'Solar Cell Manufacturing',
        technology: 'Silicon Carbide (SiC) Ceramic Ultrafiltration',
        capacity: '20 m³/hr',
        year: '2019',
        techTag: 'SiC',
        slidePage: 14,
        challenge: 'Industrial cooling towers generate silica-heavy blowdown wastewater. Reclaiming this water requires filtration that resists highly abrasive particles and chemical cleaners, which quickly wear down or rupture traditional polymer membranes.',
        solution: 'Installed a premium silicon carbide (SiC) ceramic membrane ultrafiltration system. Silicon carbide offers extreme physical hardness, oleophobic oil resistance, and handles high chemical backwash cycles.',
        implementation: 'Integrated with REC Solar\'s cooling loop system. Features automated high-pressure backwashing and air scouring to clear deposits, running continuously with minimal fouling.',
        results: 'Maintains stable flux rates, reducing overall cooling tower water consumption by recycling blowdown, and reducing membrane replacement expenses (OPEX) by over 50%.',
        image: 'assets/images/page_14_img_2.jpeg',
        slide: 'assets/slides/slide_14.png',
        gallery: [
            'assets/images/page_14_img_2.jpeg',
            'assets/images/page_14_img_4.jpeg',
            'assets/images/page_14_img_1.jpeg'
        ]
    },
    {
        id: 'rec-blowdown-dboo',
        title: 'REC Cooling Tower Blowdown DBOO Project',
        client: 'REC Solar Group',
        country: 'Singapore',
        industry: 'Renewable Solar Tech Utilities',
        technology: 'Design-Build-Own-Operate (DBOO) / Water-as-a-Service',
        capacity: 'Up to 40 m³/hr (24/7)',
        year: '2020',
        techTag: 'DBOO',
        slidePage: 16,
        challenge: 'Industrial manufacturers require immediate wastewater recycling to meet municipal conservation targets, but capital expenditure (CAPEX) allocations for custom treatment plants are often delayed.',
        solution: 'Liquinex deployed a containerized water treatment plant under a Design-Build-Own-Operate model. The system integrates advanced ultrafiltration skids within mobile shipping containers.',
        implementation: 'Operated under a 5+5 year Water-as-a-Service utility agreement. Liquinex handles full installation, automated operations, and periodic cleaning (O&M), billing the client purely for recycled volume.',
        results: 'Supplies up to 40 m³/hr of recycled water 24/7 at a highly competitive rate of $1.35/m³, yielding direct OPEX savings from day one without client capital investment.',
        image: 'assets/images/page_16_img_2.jpeg',
        slide: 'assets/slides/slide_16.png',
        gallery: [
            'assets/images/page_16_img_2.jpeg'
        ]
    },
    {
        id: 'alcon-wastewater',
        title: 'Alcon Industrial Wastewater Treatment System',
        client: 'Alcon Manufacturing',
        country: 'Singapore',
        industry: 'Medical Device Manufacturing',
        technology: 'Compact Industrial Effluent Treatment System',
        capacity: '35 m³/day',
        year: '2021',
        techTag: 'Effluent',
        slidePage: 17,
        challenge: 'Chemical effluents and wash water from medical lens manufacturing must undergo treatment before sewer discharge. The facility lacked the space required for large settling tanks.',
        solution: 'Engineered a highly compact skid-mounted wastewater treatment plant. The design features integrated chemical dosing, automatic pH neutralization, and physical membrane separators.',
        implementation: 'Installed within the Alcon facility floor. The plant runs in a fully automated sequence, auto-adjusting acid/alkali dosing based on real-time pH sensor feedback.',
        results: 'Processes 35 m³/day of manufacturing wastewater safely, consistently ensuring compliance with national environmental standards within a space-saving layout.',
        image: 'assets/images/page_17_img_3.jpeg',
        slide: 'assets/slides/slide_17.png',
        gallery: [
            'assets/images/page_17_img_3.jpeg',
            'assets/images/page_17_img_2.jpeg'
        ]
    },
    {
        id: 'humanitarian-suitcase',
        title: 'Humanitarian Suitcase-Sized Ultrafiltration System',
        client: 'Red Cross, International NGOs, & Rural Councils',
        country: 'Global Deployments (Laos, Indonesia, India, Myanmar, Manila)',
        industry: 'Disaster Relief & Off-Grid Humanitarian Aid',
        technology: 'Solar-Powered Mobile Ceramic Ultrafiltration',
        capacity: '500 Liters/Hour',
        year: '2018',
        techTag: 'Aid',
        slidePage: 29,
        challenge: 'Natural disasters like floods and earthquakes contaminate local wells, cut power grids, and isolate villages. Transporting heavy water purification skids into remote zones is logistically impossible.',
        solution: 'Invented an award-winning portable water filtration system integrated inside a rugged suitcase. Utilizing advanced ceramic membranes and Deep UVC LED sterilization, it filters pathogens physically.',
        implementation: 'Housed in a durable case weighing under 30kg. Operates on 24V DC batteries, easily linked to portable solar panels, and requires zero chemical consumables.',
        results: 'Successfully deployed by the Red Cross in Laos during the 2018 flood disaster, Sulawesi (Indonesia) post-earthquake, and Kerala (India) floods, delivering 500 liters/hour of clean water.',
        image: 'assets/images/page_29_img_3.jpeg',
        slide: 'assets/slides/slide_29.png',
        gallery: [
            'assets/images/page_29_img_3.jpeg',
            'assets/images/page_32_img_3.jpeg',
            'assets/images/page_33_img_2.jpeg',
            'assets/images/page_34_img_4.jpeg',
            'assets/images/page_35_img_1.jpeg'
        ]
    }
];

function initCaseStudyDashboard() {
    const listContainer = document.querySelector('.project-index-list');
    const viewerContainer = document.querySelector('.case-study-viewer');
    
    if (!listContainer || !viewerContainer) return;

    // Render Left sidebar list navigator
    listContainer.innerHTML = '';
    caseStudiesData.forEach((cs, index) => {
        const item = document.createElement('li');
        item.className = `project-index-item ${index === 0 ? 'active' : ''}`;
        item.dataset.id = cs.id;
        item.innerHTML = `
            <div class="project-nav-thumb">
                <img src="${cs.image}" alt="${cs.title}">
            </div>
            <div class="project-nav-info">
                <span class="project-index-title">${cs.client.split(' (')[0]}</span>
                <div class="project-index-badges">
                    <span class="nav-badge nav-badge-year">${cs.year}</span>
                    <span class="nav-badge nav-badge-tech">${cs.techTag}</span>
                </div>
            </div>
        `;
        item.addEventListener('click', () => {
            document.querySelectorAll('.project-index-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadCaseStudy(cs);
        });
        listContainer.appendChild(item);
    });

    // Load initial case study
    loadCaseStudy(caseStudiesData[0]);
}

function loadCaseStudy(cs) {
    const viewer = document.querySelector('.case-study-viewer');
    if (!viewer) return;

    viewer.style.opacity = 0;
    viewer.style.transform = 'translateY(15px)';

    setTimeout(() => {
        // Render detailed case study layout
        viewer.innerHTML = `
            <div class="cs-layout-card">
                <!-- Tab Controls -->
                <div class="cs-tab-controls">
                    <button class="cs-tab-btn active" id="tab-btn-photo">Case Study Photo</button>
                    <button class="cs-tab-btn" id="tab-btn-blueprint">Technical Blueprint</button>
                </div>

                <!-- Case Study Photo Panel -->
                <div id="cs-photo-panel" class="cs-photo-frame">
                    <img id="cs-photo-img" src="${cs.image}" alt="${cs.title}" style="cursor: zoom-in;">
                </div>

                <!-- Technical Blueprint Panel (Initially hidden) -->
                <div id="cs-blueprint-panel" class="blueprint-frame" style="display: none;">
                    <img id="cs-blueprint-img" src="${cs.slide}" alt="${cs.title} technical drawing" style="cursor: zoom-in;">
                </div>
                
                <!-- Gallery thumbnails of clean JPEGs -->
                <div class="cs-gallery-grid" id="cs-gallery">
                    <!-- Thumbnails will be injected here -->
                </div>

                <div class="cs-narrative-row">
                    <div class="cs-text-cols">
                        <div class="cs-block">
                            <h4>Challenge</h4>
                            <p>${cs.challenge}</p>
                        </div>
                        <div class="cs-block">
                            <h4>Engineering Solution</h4>
                            <p>${cs.solution}</p>
                        </div>
                        <div class="cs-block">
                            <h4>Implementation</h4>
                            <p>${cs.implementation}</p>
                        </div>
                        <div class="cs-block">
                            <h4>Results</h4>
                            <p>${cs.results}</p>
                        </div>
                    </div>
                    
                    <div class="cs-specs-panel">
                        <h4>Key Specifications</h4>
                        <div class="cs-spec-row">
                            <label>Client</label>
                            <span>${cs.client}</span>
                        </div>
                        <div class="cs-spec-row">
                            <label>Country / Region</label>
                            <span>${cs.country}</span>
                        </div>
                        <div class="cs-spec-row">
                            <label>Industry</label>
                            <span>${cs.industry}</span>
                        </div>
                        <div class="cs-spec-row">
                            <label>Technology Used</label>
                            <span>${cs.technology}</span>
                        </div>
                        <div class="cs-spec-row">
                            <label>Design Capacity</label>
                            <span>${cs.capacity}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Tab Switching Logic
        const tabPhoto = viewer.querySelector('#tab-btn-photo');
        const tabBlueprint = viewer.querySelector('#tab-btn-blueprint');
        const panelPhoto = viewer.querySelector('#cs-photo-panel');
        const panelBlueprint = viewer.querySelector('#cs-blueprint-panel');

        tabPhoto.addEventListener('click', () => {
            tabPhoto.classList.add('active');
            tabBlueprint.classList.remove('active');
            panelPhoto.style.display = 'block';
            panelBlueprint.style.display = 'none';
        });

        tabBlueprint.addEventListener('click', () => {
            tabBlueprint.classList.add('active');
            tabPhoto.classList.remove('active');
            panelBlueprint.style.display = 'flex';
            panelPhoto.style.display = 'none';
        });

        // Click zoom visual lightbox triggers
        const activePhoto = viewer.querySelector('#cs-photo-img');
        const activeBlueprint = viewer.querySelector('#cs-blueprint-img');
        if (activePhoto) activePhoto.addEventListener('click', () => openLightbox(activePhoto.src));
        if (activeBlueprint) activeBlueprint.addEventListener('click', () => openLightbox(activeBlueprint.src));

        // Render secondary technical slides/images thumbnails (strictly using clean JPEGs)
        const galleryContainer = viewer.querySelector('#cs-gallery');
        if (galleryContainer && cs.gallery && cs.gallery.length > 0) {
            cs.gallery.forEach((imgUrl, idx) => {
                const thumb = document.createElement('div');
                thumb.className = `cs-gallery-thumbnail ${idx === 0 ? 'active' : ''}`;
                thumb.innerHTML = `<img src="${imgUrl}" alt="Case Study Photo">`;
                
                thumb.addEventListener('click', () => {
                    galleryContainer.querySelectorAll('.cs-gallery-thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                    
                    // Update active photo panel image
                    activePhoto.src = imgUrl;
                    tabPhoto.click();
                });
                galleryContainer.appendChild(thumb);
            });
        }

        viewer.style.opacity = 1;
        viewer.style.transform = 'translateY(0)';
    }, 400);
}

/* 9. Lightbox Overlay (Zoom functionality) */
function openLightbox(imgSrc) {
    let lightbox = document.querySelector('.lightbox-overlay');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
            <button class="lightbox-close">&times;</button>
            <img class="lightbox-img" src="" alt="Fullscreen image">
        `;
        document.body.appendChild(lightbox);
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.classList.remove('active');
        });
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) lightbox.classList.remove('active');
        });
    }

    lightbox.querySelector('.lightbox-img').src = imgSrc;
    lightbox.classList.add('active');
}

/* 10. Modal Drawer Controller (Fixing the Locking Page Bug) */
function initModalDrawer() {
    const modal = document.querySelector('.modal-overlay');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close-btn');

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.pointerEvents = 'auto';
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    window.closeDrawerModal = closeModal;
}

/* 11. Mobile Navigation Menu Toggle */
function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');

    if (!navToggle || !navMenu) return;

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navToggle.textContent = '✕';
            header.style.background = 'rgba(1, 5, 13, 0.98)';
        } else {
            navToggle.textContent = '☰';
            if (window.scrollY <= 50) {
                header.style.background = 'transparent';
            }
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.textContent = '☰';
        });
    });

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

/* 12. Shop Brochure PDF Download trigger */
function initShopBrochure() {
    const brochureBtn = document.getElementById('shop-download-brochure');
    if (!brochureBtn) return;
    
    brochureBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = 'assets/presentation.pdf';
        link.download = 'Liquinex_Corporate_Brochure.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}
