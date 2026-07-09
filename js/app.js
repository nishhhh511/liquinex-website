// Liquinex App Logic
// Dynamic Projects Database, Filters, Modal, and Navigation

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSlideshow();
    initProjects();
    initEnquiryForm();
});

/* Navigation Scrolling Effect & Active Item Tracking */
function initNavigation() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Add scrolled class to header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking on scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === currentSectionId) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Mobile Hamburger Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i') || navToggle;
            if (navMenu.classList.contains('active')) {
                icon.textContent = '✕';
            } else {
                icon.textContent = '☰';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.textContent = '☰';
            });
        });
    }

    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/* Hero Slideshow Animation */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);
}

/* Projects & Track Record Database */
const projectsData = [
    {
        id: 'perak-river',
        title: 'River Water Treatment System for Lembaga Air Perak',
        client: 'Lembaga Air Perak (Perak Water Board)',
        location: 'Kampung Perlop, Perak, Malaysia',
        technology: 'Ultrafiltration (UF) Membrane Filtration',
        capacity: '30 m³/hr (200,000 Liters/Day)',
        category: 'municipal',
        description: 'A custom-engineered river water treatment system designed to supply clean, potable water directly to the rural consumers in Kampung Perlop and surrounding areas. Sourced from the Sungei Siput River, this plant operates at a capacity of 30 m³/hr. It successfully reduces heavy river turbidity and bacterial contaminants using advanced ultrafiltration, ensuring a stable, safe water supply that meets public health and regulatory criteria.',
        image: 'assets/slides/slide_12.png',
        slidePage: 12
    },
    {
        id: 'caas-pool',
        title: 'Chlorine-Free Swimming Pool Filtration System',
        client: 'Civil Aviation Authority Singapore (CAAS)',
        location: 'Pilot Training Pool, Singapore',
        technology: 'Chemical-Free Membrane Water Purification',
        capacity: '100 m³/hr',
        category: 'municipal',
        description: 'A high-flow water treatment system installed at the Civil Aviation Authority Singapore pilot training pool. Operating at 100 m³/hr, this system eliminates the need for chemical chlorine dosing, utilizing physical membrane filtration to keep the pool sterile and clear. It requires only 1/3 of the physical footprint of common pool filtration setups, greatly minimizing maintenance overhead and chemical handling risks.',
        image: 'assets/slides/slide_13.png',
        slidePage: 13
    },
    {
        id: 'rec-cooling-uf',
        title: 'Ceramic Membrane UF System for Cooling Towers',
        client: 'REC Solar',
        location: 'Singapore',
        technology: 'Silicon Carbide (SiC) Ceramic Ultrafiltration',
        capacity: '20 m³/hr',
        category: 'industrial',
        description: 'An advanced ceramic membrane ultrafiltration system deployed to treat cooling tower blowdown. Designed for heavy industrial loads, this 20 m³/hr system utilizes silicon carbide ceramic membranes which provide exceptional flux rates, extreme thermal and chemical resilience, and a longer lifespan compared to polymer alternatives.',
        image: 'assets/slides/slide_14.png',
        slidePage: 14
    },
    {
        id: 'chem-drum-recycle',
        title: 'Combined UF & RO Industrial Water Recycling',
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
        id: 'rec-blowdown-dboo',
        title: 'REC Cooling Tower Blowdown DBOO Project',
        client: 'REC Solar',
        location: 'Singapore',
        technology: 'Design-Build-Own-Operate (DBOO) / Water-as-a-Service',
        capacity: 'Up to 40 m³/hr (24/7)',
        category: 'industrial',
        description: 'A full-scale commercial Design-Build-Own-Operate project delivering processed, recycled water to REC Solar as a utility service. Operating 24/7 with a capacity of up to 40 m³/hr under a 5+5 year contract, this containerized, highly automated system recycles cooling tower blowdown water directly, offering immediate operational savings at a competitive rate of $1.35/m³ without client capital expenditure.',
        image: 'assets/slides/slide_16.png',
        slidePage: 16
    },
    {
        id: 'alcon-wastewater',
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
        id: 'pipe-cleaning-offshore',
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
        id: 'oil-water-separation',
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
        id: 'rice-water-recycling',
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
        id: 'algae-harvester',
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
        id: 'singapore-zoo-aquaculture',
        title: 'Aquaculture Water Treatment for River Safari',
        client: 'Singapore Zoo (Wildlife Reserves Singapore)',
        location: 'River Safari, Singapore',
        technology: 'Compact Recirculating Aquaculture System (RAS)',
        capacity: '1 m³/hr',
        category: 'municipal',
        description: 'A specialized water purification system installed at the Singapore Zoo\'s River Safari. Unlike conventional, bulky sand filters that require substantial space, backwash water volumes, and frequent manual replacement, this compact membrane-based system removes fish excrement, bacteria, and algae at 1 m³/hr, keeping aquariums clean while saving water and labor.',
        image: 'assets/slides/slide_22.png',
        slidePage: 22
    },
    {
        id: 'oman-fishmeal',
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
        id: 'mining-tailings-recovery',
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
        id: 'aerospace-solvent',
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
        id: 'rio-tinto-drinking',
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
        id: 'waterwall-system',
        title: 'WaterWall Building Water Management & Recycling',
        client: 'Commercial & Residential Buildings',
        location: 'Singapore',
        technology: 'Ultrafiltration & Deep UVC Disinfection',
        capacity: 'Custom Scalable',
        category: 'specialized',
        description: 'The WaterWall is a wall-mounted greywater recycling system designed for modern buildings. It captures and treats greywater, washbasin runoff, and air-con condensate using ultrafiltration and physical Deep UVC sterilization. The treated water is recycled for toilet flushing and garden irrigation, monitored in real-time via integrated IoT sensors.',
        image: 'assets/slides/slide_27.png',
        slidePage: 27
    },
    {
        id: 'humanitarian-suitcase',
        title: 'Suitcase-Sized Portable Ultrafiltration System',
        client: 'Red Cross, International NGOs & Emergency Relief Units',
        location: 'Global Deployments (Laos, Indonesia, India, Myanmar, Philippines)',
        technology: 'Solar-Powered Mobile Ceramic Ultrafiltration',
        capacity: '500 Liters/Hour',
        category: 'humanitarian',
        description: 'An award-winning, ultra-portable water purification system housed in a rugged suitcase. Weighing under 30kg and fully solar-compatible, it filters mud, suspended solids, bacteria, and virus pathogens using advanced ceramic membranes and Deep UVC without chemical additions. Widely deployed during major disaster relief operations by the Red Cross and NGOs.',
        image: 'assets/slides/slide_29.png',
        slidePage: 29
    },
    {
        id: 'grahamtek-ro',
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

function initProjects() {
    const grid = document.querySelector('.projects-grid');
    const filterContainer = document.querySelector('.filter-container');
    const modal = document.querySelector('.modal-overlay');
    
    if (!grid || !filterContainer || !modal) return;

    // Render Cards
    function renderCards(filteredData) {
        grid.innerHTML = '';
        if (filteredData.length === 0) {
            grid.innerHTML = '<div class="no-projects" style="grid-column: 1/-1; text-align: center; padding: 3rem;">No projects found in this category.</div>';
            return;
        }

        filteredData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card glass-card';
            card.dataset.id = project.id;
            
            // Format category name for badge
            const badgeText = project.category.charAt(0).toUpperCase() + project.category.slice(1);

            card.innerHTML = `
                <div class="project-img-wrapper">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <span class="project-badge">${badgeText}</span>
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <div class="project-meta-list">
                        <div class="project-meta-item">
                            <span>Client:</span>
                            <span>${project.client.split(' (')[0]}</span>
                        </div>
                        <div class="project-meta-item">
                            <span>Capacity:</span>
                            <span>${project.capacity.split(' (')[0]}</span>
                        </div>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openProjectModal(project));
            grid.appendChild(card);
        });
    }

    // Initial render of all projects
    renderCards(projectsData);

    // Filter Logic
    filterContainer.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        // Update active class
        filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const category = e.target.dataset.filter;
        
        if (category === 'all') {
            renderCards(projectsData);
        } else {
            const filtered = projectsData.filter(p => p.category === category);
            renderCards(filtered);
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

    // ESC Key to close modal
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
    
    // Set text elements
    modalTitle.textContent = project.title;
    modalBadge.textContent = project.category.toUpperCase();
    modalDesc.textContent = project.description;
    
    // Set slide/hero image
    modalImg.src = project.image;
    modalImg.alt = project.title;

    // Set specifications table
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

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (!modal) return;
    
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scroll
}

/* Enquiry Form Submission Handling */
function initEnquiryForm() {
    const form = document.getElementById('enquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform simple validation check
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }

        // Show a loading/submitting state on the button
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Enquiry...';

        // Mock API dispatch
        setTimeout(() => {
            submitBtn.innerHTML = 'Enquiry Sent Successfully ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)'; // Success Green

            // Success feedback popup
            alert(`Thank you, ${name}! Your water technology enquiry has been received. Our engineering team will contact you shortly.`);

            // Reset form elements
            form.reset();
            
            // Re-enable button after cooldown
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = ''; // Revert to stylesheet default
            }, 3000);
        }, 1500);
    });
}
