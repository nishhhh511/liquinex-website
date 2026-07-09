// Liquinex Premium Core App Logic (Multi-page and Page-Aware Refactoring)
// Canvas Bubbles, Scroll Flow Timeline, Solutions Selector, Case-Study Dashboard, Technical Blueprint Tabs, Lightbox, Drawer Bug Fixes, Partners Grid

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initCustomCursor();
    initCanvasParticles();
    initMagneticButtons();
    initJourneyFlow();
    initSolutionsHub();
    initScrollReveal();
    initCaseStudyDashboard();
    initPartnersGrid();
    initInteractiveCards();
    initMobileNav();
    initModalDrawer();
    initShopBrochure();
});

/* 1. Scroll Progress Bar */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* 2. Custom lagging cursor */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const dot = document.querySelector('.custom-cursor-dot');
    if (!cursor || !dot) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        // Lagging effect
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        dotX += (mouseX - dotX) * 0.35;
        dotY += (mouseY - dotY) * 0.35;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Scale on link hovers
    const links = document.querySelectorAll('a, button, .circular-node, .project-index-item, .cs-gallery-thumbnail, .partner-card');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.width = '42px';
            cursor.style.height = '42px';
            cursor.style.borderColor = 'var(--color-accent)';
            cursor.style.backgroundColor = 'rgba(0, 184, 217, 0.05)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.width = '24px';
            cursor.style.height = '24px';
            cursor.style.borderColor = 'var(--color-primary)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

/* 3. Canvas Bubbles Particle system with cursor repulsion */
function initCanvasParticles() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    window.addEventListener('resize', () => {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
    });
    
    const particles = [];
    const maxParticles = 65;
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = height + Math.random() * 100;
            this.radius = Math.random() * 6 + 2;
            this.speedX = Math.random() * 0.6 - 0.3;
            this.speedY = -(Math.random() * 0.8 + 0.3);
            this.alpha = Math.random() * 0.4 + 0.1;
        }
        update(mouseX, mouseY) {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Cursor repulsion
            if (mouseX !== undefined && mouseY !== undefined) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    this.x += (dx / dist) * force * 5;
                    this.y += (dy / dist) * force * 5;
                }
            }
            
            // Reset particle when it floats past screen top
            if (this.y < -20) {
                this.y = height + 20;
                this.x = Math.random() * width;
                this.speedY = -(Math.random() * 0.8 + 0.3);
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 184, 217, ${this.alpha})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < maxParticles; i++) {
        particles.push(new Particle());
    }
    
    let cursorMouseX, cursorMouseY;
    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        cursorMouseX = e.clientX - rect.left;
        cursorMouseY = e.clientY - rect.top;
    });
    
    function loop() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update(cursorMouseX, cursorMouseY);
            p.draw();
        });
        requestAnimationFrame(loop);
    }
    loop();
}

/* 4. Magnetic Interactive Offset on Hover Buttons */
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.btn-wrapper');
    if (magneticBtns.length === 0) return;
    
    magneticBtns.forEach(wrapper => {
        const btn = wrapper.querySelector('.btn');
        if (!btn) return;
        
        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const relX = e.clientX - rect.left - rect.width / 2;
            const relY = e.clientY - rect.top - rect.height / 2;
            
            btn.style.transform = `translate(${relX * 0.35}px, ${relY * 0.35}px)`;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0px, 0px)';
        });
    });
}

/* 5. Scroll-driven vertical journey line filling progress */
function initJourneyFlow() {
    const journeyContainer = document.querySelector('.journey-container');
    const flowProgress = document.querySelector('.journey-flow-progress');
    if (!journeyContainer || !flowProgress) return;
    
    window.addEventListener('scroll', () => {
        const rect = journeyContainer.getBoundingClientRect();
        const winH = window.innerHeight;
        
        // Compute scroll percentage relative to container top/bottom viewport presence
        const startOffset = winH * 0.65;
        const totalHeight = rect.height;
        const scrolledDistance = startOffset - rect.top;
        
        let percentage = (scrolledDistance / totalHeight) * 100;
        percentage = Math.max(0, Math.min(100, percentage));
        
        flowProgress.style.height = percentage + '%';
    });
}

/* 6. Solutions circular hub cycle selectors with content mapping */
function initSolutionsHub() {
    const hub = document.querySelector('.solutions-editorial');
    if (!hub) return;
    
    const nodes = document.querySelectorAll('.circular-node');
    const cardTitle = document.getElementById('solution-card-title');
    const cardText = document.getElementById('solution-card-text');
    const cardCap = document.getElementById('solution-card-cap');
    const cardMem = document.getElementById('solution-card-mem');
    const cardFlow = document.getElementById('solution-card-flow');
    const cardEnquiry = document.getElementById('solution-card-enquiry');
    
    const data = {
        1: {
            title: 'Ceramic Ultrafiltration (UF)',
            text: 'Advanced silicon carbide membrane filters removing suspended solids, bacteria, and turbidity with a zero backwash wastewater recycling loop.',
            cap: '10 - 2,500 m³/day modules',
            mem: 'Silicon Carbide (SiC) Ceramic',
            flow: 'High Flux, Dry Run Capable',
            enquiry: 'Request Quotation for Ceramic UF System'
        },
        2: {
            title: 'RO Desalination',
            text: 'High-rejection reverse osmosis membrane units utilizing energy recovery systems for modular seawater and brackish groundwater purification.',
            cap: '5 - 1,000 m³/day modules',
            mem: 'Thin-Film Composite (TFC) RO',
            flow: 'Optimized Energy Recovery',
            enquiry: 'Request Quotation for RO Desalination'
        },
        3: {
            title: 'WaterWall & WaterPack',
            text: 'Bespoke containerized water purification plants inside shipping containers. Built for rapid military, municipal, and industrial plant deployments.',
            cap: '50 - 5,000 m³/day units',
            mem: 'Integrated SiC UF + RO Stages',
            flow: 'Plug-and-Play Containerized',
            enquiry: 'Request Quotation for Containerized WaterWall'
        },
        4: {
            title: 'Portable Suitcase Systems',
            text: 'Compact emergency disaster response filtration suitcases powered by internal batteries or solar panels. Ideal for remote communities and NGOs.',
            cap: '500 - 1,200 Litres/hour',
            mem: 'Ultrafiltration + Activated Carbon',
            flow: 'Hand-Carrying Portable Suitcase',
            enquiry: 'Request Quotation for Emergency Suitcase'
        }
    };
    
    nodes.forEach(node => {
        node.addEventListener('click', () => {
            nodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');
            
            const index = node.dataset.node;
            const target = data[index];
            
            // Apply a smooth fade out/in effect
            const card = document.querySelector('.circular-spec-card');
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            
            setTimeout(() => {
                cardTitle.textContent = target.title;
                cardText.textContent = target.text;
                cardCap.textContent = target.cap;
                cardMem.textContent = target.mem;
                cardFlow.textContent = target.flow;
                cardEnquiry.textContent = target.enquiry;
                cardEnquiry.href = `enquiry.html?subject=${encodeURIComponent(target.enquiry)}`;
                
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300);
        });
    });
}

/* 7. Scroll reveal trigger */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-on-scroll');
    if (reveals.length === 0) return;
    
    function reveal() {
        reveals.forEach(el => {
            const windowH = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 130;
            
            if (elementTop < windowH - revealPoint) {
                el.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Initial run
}

/* 8. Portfolio Case-Study Dashboard Manager */
function initCaseStudyDashboard() {
    const dashboard = document.querySelector('.projects-dashboard');
    if (!dashboard) return;
    
    const indexItems = document.querySelectorAll('.project-index-item');
    const photoFrame = document.querySelector('.cs-photo-frame img');
    const blueprintFrame = document.querySelector('.cs-blueprint-frame img');
    const galleryGrid = document.querySelector('.cs-gallery-grid');
    const tabBtns = document.querySelectorAll('.cs-tab-btn');
    const specCap = document.getElementById('cs-spec-capacity');
    const specMem = document.getElementById('cs-spec-membrane');
    const specFlow = document.getElementById('cs-spec-flow');
    const specYear = document.getElementById('cs-spec-year');
    const csTextChallenge = document.getElementById('cs-text-challenge');
    const csTextSolution = document.getElementById('cs-text-solution');
    const csTextResults = document.getElementById('cs-text-results');
    const csQuoteBtn = document.getElementById('cs-quote-btn');
    
    // Project specifications and photos database mapping
    const projectsDb = {
        1: {
            title: 'Perak Raw River Water Potable Station',
            capacity: '1,500 m³/day',
            membrane: 'Silicon Carbide (SiC) Ceramic UF',
            flow: 'Gravity-fed filtration loop',
            year: '2021',
            challenge: 'High-turbidity raw river water supply with spikes exceeding 1,000 NTU during rainstorms, blocking standard polymeric membranes.',
            solution: 'Installed modular vertical SiC ceramic ultrafiltration skids that operate with constant flux and high tolerance to abrasive sand grains.',
            results: 'Delivered clean potable water below 0.1 NTU reliably to remote villages in Siput, with zero polymeric fiber breakage.',
            photos: [
                'assets/projects/perak_1.jpg',
                'assets/projects/perak_2.jpg',
                'assets/projects/perak_3.jpg'
            ],
            blueprint: 'assets/slides/slide_36.png'
        },
        2: {
            title: 'Zoo aquaculture RAS recycle loop',
            capacity: '200 m³/day',
            membrane: 'Abrasive-Resistant Ceramic UF',
            flow: 'High-rate aquaculture loop',
            year: '2019',
            challenge: 'High organic loading and fish slime block standard sand filters and polymeric membranes, leading to biofouling.',
            solution: 'Implemented high-flux ceramic membranes with automated air-scour backwash cycles to purge organic load instantly.',
            results: 'Maintained crystal clear water quality inside animal habitats with a 98% water recovery rate, protecting sensitive wildlife.',
            photos: [
                'assets/projects/zoo_1.jpg',
                'assets/projects/zoo_2.jpg'
            ],
            blueprint: 'assets/slides/slide_37.png'
        },
        3: {
            title: 'REC Solar cooling tower blowdown recycle',
            capacity: '1,000 m³/day',
            membrane: 'SiC Ceramic UF + RO Desal',
            flow: 'Industrial DBOO recycling plant',
            year: '2020',
            challenge: 'Cooling tower blowdown water containing scale inhibitors and high silica content causes severe membrane scaling.',
            solution: 'A combination of silica precipitation chemical dosing followed by robust SiC ceramic filtration modules protecting the RO stage.',
            results: 'Achieved a stable clean recycle stream saving thousands of cubic meters of industrial tap water costs daily.',
            photos: [
                'assets/projects/solar_1.jpg',
                'assets/projects/solar_2.jpg'
            ],
            blueprint: 'assets/slides/slide_38.png'
        }
    };
    
    function loadProject(id) {
        const p = projectsDb[id];
        
        // Update specs
        specCap.textContent = p.capacity;
        specMem.textContent = p.membrane;
        specFlow.textContent = p.flow;
        specYear.textContent = p.year;
        
        // Update text
        csTextChallenge.textContent = p.challenge;
        csTextSolution.textContent = p.solution;
        csTextResults.textContent = p.results;
        csQuoteBtn.href = `enquiry.html?subject=${encodeURIComponent('Request Quote: ' + p.title)}`;
        
        // Update main photo and blueprint
        photoFrame.src = p.photos[0];
        blueprintFrame.src = p.blueprint;
        
        // Render gallery thumbnails
        galleryGrid.innerHTML = '';
        p.photos.forEach((src, idx) => {
            const thumb = document.createElement('div');
            thumb.className = `cs-gallery-thumbnail ${idx === 0 ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${src}" alt="Project View ${idx + 1}">`;
            thumb.addEventListener('click', () => {
                document.querySelectorAll('.cs-gallery-thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                photoFrame.src = src;
                
                // Clicking thumbnail automatically triggers the Photo tab active
                document.querySelector('[data-tab="photo"]').click();
            });
            galleryGrid.appendChild(thumb);
        });
        
        // Add blueprint slide to gallery as the last option
        const bpThumb = document.createElement('div');
        bpThumb.className = 'cs-gallery-thumbnail blueprint-thumb';
        bpThumb.innerHTML = `<img src="${p.blueprint}" alt="Technical Blueprint">`;
        bpThumb.addEventListener('click', () => {
            document.querySelectorAll('.cs-gallery-thumbnail').forEach(t => t.classList.remove('active'));
            bpThumb.classList.add('active');
            document.querySelector('[data-tab="blueprint"]').click();
        });
        galleryGrid.appendChild(bpThumb);
    }
    
    // Bind list clicks
    indexItems.forEach(item => {
        item.addEventListener('click', () => {
            indexItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadProject(item.dataset.project);
        });
    });
    
    // Bind tab controls
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const tab = btn.dataset.tab;
            if (tab === 'photo') {
                document.getElementById('cs-photo-panel').style.display = 'block';
                document.getElementById('cs-blueprint-panel').style.display = 'none';
            } else {
                document.getElementById('cs-photo-panel').style.display = 'none';
                document.getElementById('cs-blueprint-panel').style.display = 'block';
            }
        });
    });
    
    // Bind click image to open Lightbox
    const viewables = [photoFrame, blueprintFrame];
    const lightbox = document.getElementById('lightbox-overlay');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    if (lightbox && lightboxImg && lightboxClose) {
        viewables.forEach(frame => {
            frame.addEventListener('click', () => {
                lightboxImg.src = frame.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            });
        });
        
        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
    
    // Initial Load first project
    loadProject(1);
}

/* 9. Redesigned Interactive Partners Grid Controller */
const partnersData = [
    { name: 'Civil Aviation Authority of Singapore (CAAS)', logo: 'assets/logos/caas.png', category: 'municipal', relation: 'Changi Airport Pool Filtration' },
    { name: 'REC Solar', logo: 'assets/logos/rec.png', category: 'industrial', relation: 'Tuas DBOO Recycle Plant' },
    { name: 'GWT (GrahamTek)', logo: 'assets/logos/gwt.png', category: 'marine', relation: '16" RO Membrane Partner' },
    { name: 'Western Digital', logo: 'assets/logos/wd.png', category: 'industrial', relation: 'Electronics Clean Room Water' },
    { name: 'Alcon', logo: 'assets/logos/alcon.png', category: 'industrial', relation: 'Lens Effluent Treatment Skid' },
    { name: 'Royal HaskoningDHV', logo: 'assets/logos/haskoning.png', category: 'municipal', relation: 'Engineering Design Consultant' },
    { name: 'Rio Tinto', logo: 'assets/logos/riotinto.png', category: 'resources', relation: 'Mining Site Potable UF System' },
    { name: 'Lembaga Air Perak', logo: 'assets/logos/perak.png', category: 'municipal', relation: 'Siput River Potable Station' },
    { name: 'AMOS', logo: 'assets/logos/amos.png', category: 'marine', relation: 'Offshore Vessel Filtration' },
    { name: 'Hitachi', logo: 'assets/logos/hitachi.png', category: 'industrial', relation: 'High-Tech Coolant Recycling' },
    { name: 'NSL OilChem', logo: 'assets/logos/nsl.png', category: 'marine', relation: 'Bilge Water separation skid' },
    { name: 'Abbott', logo: 'assets/logos/abbott.png', category: 'industrial', relation: 'Pharma-Grade UF Filtration' },
    { name: 'Yong Mei', logo: 'assets/logos/yongmei.png', category: 'industrial', relation: 'Process Water Pre-Treatment' },
    { name: 'Janatha', logo: 'assets/logos/janatha.png', category: 'resources', relation: 'Fishmeal Condensate Recovery' },
    { name: 'JB Shipping', logo: 'assets/logos/jb.png', category: 'marine', relation: 'Scrubber Wastewater Treatment' },
    { name: 'Singapore Zoo', logo: 'assets/logos/zoo.png', category: 'municipal', relation: 'River Safari RAS Loop' }
];

function initPartnersGrid() {
    const trackLeft = document.getElementById('marquee-track-left');
    const trackRight = document.getElementById('marquee-track-right');
    if (!trackLeft || !trackRight) return;
    
    // Distribute logos across the two rows (even indices to Row 1, odd to Row 2)
    const row1Logos = partnersData.filter((_, idx) => idx % 2 === 0);
    const row2Logos = partnersData.filter((_, idx) => idx % 2 !== 0);
    
    // Render tracks (duplicate multiple times to ensure seamless scrolling loops)
    renderMarqueeTrack(trackLeft, [...row1Logos, ...row1Logos, ...row1Logos, ...row1Logos]);
    renderMarqueeTrack(trackRight, [...row2Logos, ...row2Logos, ...row2Logos, ...row2Logos]);
    
    // Add interactive filters (dims non-matching logos, highlights matching ones)
    const btns = document.querySelectorAll('.partners-filter-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const allCards = document.querySelectorAll('.partner-logo-card');
            
            allCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all') {
                    card.classList.remove('dimmed', 'highlighted');
                } else if (category === filter) {
                    card.classList.remove('dimmed');
                    card.classList.add('highlighted');
                } else {
                    card.classList.remove('highlighted');
                    card.classList.add('dimmed');
                }
            });
        });
    });
}

function renderMarqueeTrack(trackElement, logosList) {
    trackElement.innerHTML = '';
    logosList.forEach(partner => {
        const card = document.createElement('div');
        card.className = 'partner-logo-card';
        card.dataset.category = partner.category;
        card.innerHTML = `
            <img src="${partner.logo}" alt="${partner.name}">
            <div class="partner-tooltip">
                <span>${partner.relation}</span>
            </div>
        `;
        trackElement.appendChild(card);
    });
}

/* 10. Header scroll background and mobile navigation hamburger toggle */
function initMobileNav() {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu on nav item clicks
        document.querySelectorAll('.nav-item a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '☰';
            });
        });
    }
}

/* 11. Modal Detail Drawer logic and scroll release */
function initModalDrawer() {
    const overlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close-btn');
    if (!overlay || !modalClose) return;
    
    const openTriggers = document.querySelectorAll('[data-open-drawer]');
    const modalHeroImg = document.querySelector('.modal-hero-img');
    const modalTitle = document.querySelector('.modal-title');
    const modalSpecsGrid = document.querySelector('.specs-list-grid');
    
    const detailsDb = {
        'uvc-uf': {
            title: 'Liquinex UVC-UF Industrial Filtration System',
            img: 'assets/products/uvc_uf.png',
            specs: [
                'Flow Rate Capacity: 10 - 200 m³/day modular system',
                'Pre-filtration Stage: 100-micron automated self-cleaning screen',
                'Core Membrane stage: Silicon Carbide (SiC) Ceramic UF',
                'Disinfection System: High-dose Inline UVC chamber',
                'Zero Waste Recycle: Recovers 98% of backwash water'
            ]
        },
        'sic-ceramic': {
            title: 'Silicon Carbide (SiC) Ceramic Membrane Skids',
            img: 'assets/products/sic_membrane.png',
            specs: [
                'Filtration Pore Size: 0.1-micron microfiltration & 0.04-micron UF',
                'Maximum Operating Temperature: Up to 80°C',
                'Chemical Durability: pH 0 to 14 resistant',
                'Flux Rates: 3 to 5 times higher than polymeric fibers',
                'Backwash Method: Constant automated air-scour cleaning loop'
            ]
        }
    };
    
    function openDrawer(id) {
        const data = detailsDb[id];
        if (!data) return;
        
        modalTitle.textContent = data.title;
        modalHeroImg.src = data.img;
        
        modalSpecsGrid.innerHTML = '';
        data.specs.forEach(spec => {
            const li = document.createElement('li');
            li.textContent = spec;
            modalSpecsGrid.appendChild(li);
        });
        
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent main body scrolling
        
        // Track visual offset for close button
        modalClose.style.display = 'flex';
    }
    
    function closeDrawer() {
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        modalClose.style.display = 'none';
    }
    
    openTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openDrawer(trigger.dataset.product);
        });
    });
    
    modalClose.addEventListener('click', closeDrawer);
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeDrawer();
    });
    
    // Bind Escape key to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeDrawer();
            // Also close lightbox if active
            const lightbox = document.getElementById('lightbox-overlay');
            if (lightbox && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
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

/* 13. Interactive Story-Card Spotlight Hover Effect */
function initInteractiveCards() {
    const cards = document.querySelectorAll('.story-card');
    if (cards.length === 0) return;
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}

