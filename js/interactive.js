// Interactive Features for Enhanced User Experience

// Global variables for reviews system
let currentReviewSet = 0;
let reviewsData = [];

// Fallback reviews data for when JSON fetch fails (CORS/file:// issues) - Complete dataset
const fallbackReviews = [
    // Workshop Reviews (9 total)
    {
        "name": "Swati Shinde",
        "title": "Deputy Manager",
        "company": "Saregama India Ltd",
        "rating": 4.9,
        "photo": "swati_shinde.jpg",
        "review": "This bootcamp changed the way I looked at test automation. Vignesh didn't just teach Playwright – he taught us how to think in frameworks. From learning locator strategies to integrating with Jenkins and Docker, every session had real-world examples. Page Object Model, JSON/CSV data-driven testing, even Allure reporting – all explained so well!",
        "type": "workshop",
        "subtype": "playwright"
    },
    {
        "name": "Javier",
        "title": "QA Analyst",
        "company": "NDP Studi",
        "rating": 5.0,
        "photo": "javier.jpeg",
        "review": "Before this workshop, I had only heard of playwright. After it, I have started using playwright for my automation testing and it has been a great experience. The workshop was very informative and I have learned a lot from it.",
        "type": "workshop",
        "subtype": "playwright"
    },
    {
        "name": "Lohith",
        "title": "QA Engineer",
        "company": "Bosch",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "I always struggled with test stability before joining the Playwright bootcamp. Vignesh's session on locators and annotations gave me solid confidence. Learning Docker and Cucumber in the same flow was a huge win. Now, I've even started contributing to our team's Playwright framework!",
        "type": "workshop",
        "subtype": "playwright"
    },
    {
        "name": "Evgeniya Turtschin",
        "title": "QA Consultant",
        "company": "ITX",
        "rating": 5.0,
        "photo": "evgeniya_turtschin.jpeg",
        "review": "I joined the Playwright bootcamp with zero knowledge and walked out confidently writing tests using POM, hooks, and even Docker integration. Vignesh's pace and examples were super beginner-friendly. I especially loved the group activities and doubt-solving sessions.",
        "type": "workshop",
        "subtype": "playwright"
    },
    {
        "name": "Kalpuri Preetham",
        "title": "SDET 1",
        "company": "Entain India",
        "rating": 4.8,
        "photo": "kalpuri_preetham.jpeg",
        "review": "What I liked most about the Playwright bootcamp was the clear separation of test logic and structure. The use of POM, hooks, test parameterization, and even Cucumber felt industry-grade. It wasn't just a training—it felt like a real project.",
        "type": "workshop",
        "subtype": "playwright"
    },
    {
        "name": "Kapil Bhansal",
        "title": "Senior Test Engineer",
        "company": "Dell",
        "rating": 5.0,
        "photo": "kapil_bhansal.jpg",
        "review": "One of the most hands-on AI workshops I've attended. I especially loved how we were shown real QA use cases – test case generation, web automation with ChatGPT, and even custom GPTs! The session on applying Gen AI for job search was the cherry on top.",
        "type": "workshop",
        "subtype": "gen-ai"
    },
    {
        "name": "Titir Mishra",
        "title": "QA Engineer",
        "company": "IRIS Software Group",
        "rating": 4.9,
        "photo": "titir_misra.jpeg",
        "review": "The Gen AI workshop was an eye-opener. I had no clue AI could write my test cases, analyze logs, and even generate full test plans. Vignesh's use of Cursor AI and prompt tweaking was brilliant. I'm now using Gen AI daily in my QA workflow.",
        "type": "workshop",
        "subtype": "gen-ai"
    },
    {
        "name": "Anukriti Ojha",
        "title": "Senior Quality Engineer",
        "company": "Walmart Global Tech India",
        "rating": 4.9,
        "photo": "anukriti_ojha.jpeg",
        "review": "The Gen AI bootcamp gave me a completely new perspective on testing. I'm now using GPTs to write test plans, do code reviews, and generate test data on the fly. The hands-on tasks and curated prompts Vignesh shared were absolute gems!",
        "type": "workshop",
        "subtype": "gen-ai"
    },
    
    // Mentoring Reviews (7 total)
    {
        "name": "Swapnil",
        "title": "Senior QA Analyst",
        "company": "Capgemini",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "I was stuck in manual QA for years. Vignesh's mentorship gave me not just a roadmap but the confidence to switch to automation. His guidance on frameworks, AI tools in QA, and resume strategy was gold. The mock interview we did helped me land my first automation role!",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Shilpa Shravge",
        "title": "QA Lead",
        "company": "Absa Group",
        "rating": 4.9,
        "photo": "shilpa_shravge.jpeg",
        "review": "Vignesh's mentorship is unlike any other. He helped me migrate our legacy framework to a clean, maintainable architecture. What stood out was how he explained thread-safety and framework decisions clearly. Also loved the regular mock interviews – boosted my confidence immensely!",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Neha Tyagi",
        "title": "Quality Assurance Engineer",
        "company": "Customer Alliance",
        "rating": 4.7,
        "photo": "neha_tyagi.jpeg",
        "review": "During 1:1 mentoring, Vignesh helped me transform my basic TestNG skills into a solid framework. His suggestions around reporting, retries, and cross-browser testing saved me hours of debugging. I can't thank him enough!",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Sriram Balaji",
        "title": "Senior QA Developer",
        "company": "Retresco",
        "rating": 5.0,
        "photo": "sriram_balaji.jpeg",
        "review": "Through Vignesh's 1-on-1 coaching, I upgraded my entire QA strategy to include GenAI tools. We restructured our automation framework with better CI/CD, implemented Docker, and added AI-powered reporting workflows. That insight is hard to find elsewhere.",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Penzar Merchant",
        "title": "QA Test Analyst",
        "company": "Zurich Covermore",
        "rating": 5.0,
        "photo": "penzar_merchant.jpeg",
        "review": "Attended Vignesh's Playwright workshop last year. It was a great learning experience and I was able to apply the learnings in my work. From then on in constant touch with Vignesh for my queries and guidance. He is a great mentor and a great teacher.",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Akshaya Narayanan",
        "title": "QA Engineer",
        "company": "Check 24",
        "rating": 5.0,
        "photo": "akshaya_narayanan.jpeg",
        "review": "Couple of years back reached out to Vignesh via LinkedIn and asked him to guide me for an interview preparation. He was very helpful and guided me through the process. Through which I have cleared my interview and got selected. Years passed and I have been in touch with Vignesh for my queries and guidance.",
        "type": "mentoring",
        "subtype": ""
    },
    {
        "name": "Anurima Chandra",
        "title": "QA Consultant",
        "company": "JLL Technologies",
        "rating": 5.0,
        "photo": "anurima_chandra.jpeg",
        "review": "Vignesh is a great trainer and mentor. He taught me various automation technologies such as selenium, cypress etc. Due to which I could able to shine in my current organization and able to automate on my own.",
        "type": "mentoring",
        "subtype": ""
    },
    
    // Online Course Reviews (14 total)
    {
        "name": "Yosra Miladi",
        "title": "Software QA Team Lead",
        "company": "Insta Deep",
        "rating": 5.0,
        "photo": "generic_female.jpg",
        "review": "I've taken many online courses, but this one stood out. The Playwright course wasn't just theory – it was hands-on with Docker, Allure, Jenkins, API testing, and Cucumber! The way POM and advanced UI element handling was explained made automation fun and practical.",
        "type": "online-course",
        "subtype": "playwright"
    },
    {
        "name": "Yash Swami",
        "title": "QA Automation Specialist",
        "company": "Persistent Systems",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "The Playwright online course was extremely well-structured. I could follow along even with a busy schedule. The CI/CD with Jenkins, the Allure report, and JSON/CSV test data parts helped me upskill fast. Highly recommend for anyone looking to implement a full-stack testing framework.",
        "type": "online-course",
        "subtype": "playwright"
    },
    {
        "name": "Surajit Paul",
        "title": "Automation Tester",
        "company": "IBM",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "Brilliant course. From JSON/CSV-driven testing to Allure reports and Docker config, every topic was explained in-depth. I especially liked how debugging tips and project structuring were included – it felt like working on a real automation project.",
        "type": "online-course",
        "subtype": "playwright"
    },
    {
        "name": "Prashant Appanna Savalagi",
        "title": "QA Engineer",
        "company": "TechJini",
        "rating": 4.7,
        "photo": "generic_male.jpg",
        "review": "Loved the balance of theory and real-time use cases in this Playwright course. I appreciated the way Docker, Allure, and CI/CD were added gradually. Helped me build a complete understanding and apply it in my company's setup.",
        "type": "online-course",
        "subtype": "playwright"
    },
    {
        "name": "Ninad",
        "title": "SDET",
        "company": "Infosys",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "Loved how this course covered everything from Cypress basics to Docker and Jenkins integration. The best part for me was learning to mock API calls and use Cypress dashboard effectively. I've implemented fixtures, custom commands, and the POM approach from this course in my daily work.",
        "type": "online-course",
        "subtype": "cypress"
    },
    {
        "name": "Vaishali Chaudhari",
        "title": "Automation Test Engineer",
        "company": "Zensar",
        "rating": 5.0,
        "photo": "generic_female.jpg",
        "review": "This Cypress course really covers it all – from basic UI handling to mocking APIs and integrating with Docker. The examples were clear and applicable. The module on writing custom commands and using plugins was especially helpful for our project setup.",
        "type": "online-course",
        "subtype": "cypress"
    },
    {
        "name": "Olamide John",
        "title": "QA Engineer",
        "company": "Andela",
        "rating": 5.0,
        "photo": "generic_male.jpg",
        "review": "The Cypress online course was practical, fast-paced, and comprehensive. Loved the parts where we tested XHR requests and used fixtures with custom commands. Now I can test modern UIs with confidence – and better structure!",
        "type": "online-course",
        "subtype": "cypress"
    },
    {
        "name": "Kesavan Selvaraj",
        "title": "Software Tester",
        "company": "Harman International",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "Fantastic Cypress course. The focus on page objects, mocking APIs, and dashboard integration helped me modernize our test suite. Also, I finally understood how to use plugins the right way thanks to this course!",
        "type": "online-course",
        "subtype": "cypress"
    },
    {
        "name": "Divya",
        "title": "Performance Test Engineer",
        "company": "TCS",
        "rating": 4.8,
        "photo": "generic_female.jpg",
        "review": "Vignesh made Gatling approachable, even for someone new to Scala. The explanation of feeders, injections, CLI setup, and Gatling Enterprise was so clear. I now feel confident setting up performance tests with real-world scenarios. The Grafana integration module was a bonus!",
        "type": "online-course",
        "subtype": "gatling"
    },
    {
        "name": "Jyoti Shankar Sahoo",
        "title": "Performance QA",
        "company": "Virtusa",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "Clear, to the point, and packed with value. The Gatling course helped me understand feeders, scenario injection, and advanced simulation setups. I'm now able to run our API load tests independently with Grafana dashboards set up, thanks to this course.",
        "type": "online-course",
        "subtype": "gatling"
    },
    {
        "name": "Amit Malbari",
        "title": "Performance Engineer",
        "company": "LTI Mindtree",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "This Gatling course breaks everything down – Scala basics, feeders, CLI usage, and even CICD flows. The Grafana integration and Gatling Enterprise module were very helpful. I now use Gatling for both regression and spike testing.",
        "type": "online-course",
        "subtype": "gatling"
    },
    {
        "name": "Simplice Tchoupkoua",
        "title": "QA Performance Analyst",
        "company": "Orange Cameroon",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "I took this Gatling course to upskill for an enterprise project and it delivered beyond expectations. The explanation around simulation steps, feeders, command-line runs, and CICD flow was easy to follow. Truly scalable learning.",
        "type": "online-course",
        "subtype": "gatling"
    },
    {
        "name": "Jaywant Chavan",
        "title": "QA Automation Engineer",
        "company": "Wipro",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "From Extent Reports to Docker execution, this course is a complete Selenium framework builder's guide. I learned how to design POMs, implement retry logic, handle cross-browser testing, and even integrate with Selenium Grid. The real-world structure made it super practical!",
        "type": "online-course",
        "subtype": "selenium"
    },
    {
        "name": "Pranab Ghatak",
        "title": "QA Engineer",
        "company": "DXC Technology",
        "rating": 4.8,
        "photo": "generic_male.jpg",
        "review": "I appreciated how deep the Selenium course went into framework design – not just writing tests. Factory classes, thread-safety, exception handling, Docker execution – everything was taught like it was part of a real project. Loved the focus on best practices.",
        "type": "online-course",
        "subtype": "selenium"
    },
    {
        "name": "Sreejith",
        "title": "QA Automation Lead",
        "company": "UST Global",
        "rating": 4.9,
        "photo": "generic_male.jpg",
        "review": "If you're building a Selenium framework from scratch, this is the course to take. I was blown away by the POM chaining, retry logic, and even Docker execution with Selenium Grid. Super practical and clean code examples.",
        "type": "online-course",
        "subtype": "selenium"
    },
    {
        "name": "Ismail Savcan",
        "title": "QA Automation Specialist",
        "company": "Turkcell",
        "rating": 5.0,
        "photo": "generic_male.jpg",
        "review": "The Selenium framework course is all meat, no fluff. I learned how to structure tests using base pages, handle enums properly, and implement retry logic with Method Interceptor. It's the cleanest Selenium setup I've seen in any course.",
        "type": "online-course",
        "subtype": "selenium"
    }
];

// Load reviews from JSON file
async function loadReviewsData() {
    try {
        const response = await fetch('portfolio/reviews.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        reviewsData = data.reviews || [];
        console.log(`✅ Loaded ${reviewsData.length} reviews from JSON`);
        return true;
    } catch (error) {
        console.log('⚠️ Unable to load reviews.json, using fallback data:', error.message);
        reviewsData = fallbackReviews;
        console.log(`✅ Using ${reviewsData.length} fallback reviews`);
        return false;
    }
}

// Filter reviews by type and optionally by subtype
function filterReviews(type = null, subtype = null) {
    if (!reviewsData.length) return [];
    
    let filtered = reviewsData;
    
    if (type) {
        filtered = filtered.filter(review => review.type === type);
    }
    
    if (subtype) {
        filtered = filtered.filter(review => review.subtype === subtype);
    }
    
    // Sort by subtype first, then by rating (highest first)
    return filtered.sort((a, b) => {
        if (a.subtype && b.subtype && a.subtype !== b.subtype) {
            return a.subtype.localeCompare(b.subtype);
        }
        return b.rating - a.rating;
    });
}

// Render reviews with custom layout options
function renderReviews(reviews, containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`❌ Container ${containerId} not found!`);
        return;
    }
    
    const {
        layout = 'grid', // 'grid' or 'carousel'
        itemsPerRow = 3,
        showPagination = true,
        showHeader = true
    } = options;
    
    if (reviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h4 class="text-muted">No reviews available for this category yet.</h4>
                <p class="text-muted">Check back soon for student testimonials!</p>
            </div>
        `;
        return;
    }
    
    if (layout === 'grid') {
        renderGridLayout(reviews, container, itemsPerRow, showHeader);
    } else {
        renderCarouselLayout(reviews, container, showPagination);
    }
}

// Render grid layout for training pages
function renderGridLayout(reviews, container, itemsPerRow, showHeader) {
    const headerHtml = showHeader ? `
        <div class="row mb-4">
            <div class="col-12">
                <h3>Student Reviews (${reviews.length})</h3>
                <p class="text-muted">Real feedback from students who have transformed their careers</p>
            </div>
        </div>
    ` : '';
    
    const reviewsHtml = reviews.map(review => `
        <div class="col-lg-${12/itemsPerRow} col-md-6 mb-4">
            <div class="review-card h-100 p-4 border rounded shadow-sm">
                <div class="d-flex align-items-center mb-3">
                    <div class="mr-3">
                        ${getAvatarHTML(review.name, review.photo)}
                    </div>
                    <div>
                        <h6 class="mb-0 font-weight-bold">${review.name}</h6>
                        <small class="text-primary font-weight-500">${review.title}</small>
                        <div class="text-muted small">${review.company}</div>
                    </div>
                </div>
                <div class="mb-3">
                    ${generateStars(review.rating)}
                    <span class="ml-2 text-muted small">(${review.rating}★)</span>
                </div>
                <p class="text-muted mb-3">"${review.review}"</p>
                <div class="mt-auto">
                    <span class="badge badge-primary mr-1">${review.type.charAt(0).toUpperCase() + review.type.slice(1).replace('-', ' ')}</span>
                    ${review.subtype ? `<span class="badge badge-success">${review.subtype.charAt(0).toUpperCase() + review.subtype.slice(1)}</span>` : ''}
                </div>
            </div>
        </div>
    `).join('');
    
    container.innerHTML = `
        ${headerHtml}
        <div class="row">
            ${reviewsHtml}
        </div>
    `;
}

// Render carousel layout (existing function, but updated)
function renderCarouselLayout(reviews, container, showPagination) {
    // This is the existing showTestimonialSet logic but adapted
    const reviewsPerSet = 3;
    let currentSet = 0;
    
    function showReviewSet(setIndex) {
        const startIndex = setIndex * reviewsPerSet;
        const endIndex = Math.min(startIndex + reviewsPerSet, reviews.length);
        const currentReviews = reviews.slice(startIndex, endIndex);
        
        const reviewsHtml = `
            <div class="row">
                ${currentReviews.map(review => `
                    <div class="col-lg-4 col-md-6 mb-4">
                        <div class="testimonial-card h-100">
                            <div class="d-flex align-items-center mb-3">
                                <div class="mr-3">
                                    ${getAvatarHTML(review.name, review.photo)}
                                </div>
                                <div>
                                    <h6 class="mb-0 font-weight-bold">${review.name}</h6>
                                    <small class="text-primary font-weight-500">${review.title}</small>
                                    <div class="text-muted small">${review.company}</div>
                                </div>
                            </div>
                            <div class="mb-3">
                                ${generateStars(review.rating)}
                                <span class="ml-2 text-muted small">(${review.rating} Rating)</span>
                            </div>
                            <p class="text-muted">"${review.review}"</p>
                            <div class="mt-3">
                                <span class="badge badge-primary mr-1">${review.type.charAt(0).toUpperCase() + review.type.slice(1).replace('-', ' ')}</span>
                                ${review.subtype ? `<span class="badge badge-success">${review.subtype.charAt(0).toUpperCase() + review.subtype.slice(1)}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            ${showPagination ? `
                <div class="d-flex justify-content-between align-items-center mt-4">
                    <button class="btn btn-outline-primary" onclick="showReviewSet(${setIndex - 1})" ${setIndex === 0 ? 'disabled' : ''}>
                        <i class="fas fa-chevron-left mr-2"></i>Previous
                    </button>
                    
                    <div class="review-indicators">
                        ${Array.from({length: Math.ceil(reviews.length / reviewsPerSet)}, (_, i) => `
                            <button class="btn btn-sm ${i === setIndex ? 'btn-primary' : 'btn-outline-primary'} mx-1" 
                                    onclick="showReviewSet(${i})">${i + 1}</button>
                        `).join('')}
                    </div>
                    
                    <button class="btn btn-outline-primary" onclick="showReviewSet(${setIndex + 1})" 
                            ${endIndex >= reviews.length ? 'disabled' : ''}>
                        Next<i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            ` : ''}
        `;
        
        container.innerHTML = reviewsHtml;
        currentSet = setIndex;
    }
    
    // Make showReviewSet available globally for this container
    window[`showReviewSet_${container.id}`] = showReviewSet;
    showReviewSet(0);
}

// Main function to load and display testimonials
async function loadTestimonials() {
    console.log('🔍 loadTestimonials called');
    
    try {
        // Load reviews data (will use fallback if JSON fails)
        await loadReviewsData();
        
        // Update containers
        const containers = document.querySelectorAll('#testimonials-container');
        console.log(`✅ Found ${containers.length} testimonials containers, updating all`);
        
        if (containers.length > 0) {
            console.log('📋 Calling showTestimonialSet with reviewsData:', reviewsData.length, 'reviews');
            window.showTestimonialSet(0); // Start with first set of testimonials
        } else {
            console.error('❌ No testimonials containers found on page');
        }
    } catch (error) {
        console.error('❌ Error in loadTestimonials:', error);
        
        // Show error message in containers if they exist
        const containers = document.querySelectorAll('#testimonials-container');
        containers.forEach(container => {
            container.innerHTML = `
                <div class="text-center py-5">
                    <h4 class="text-muted">Unable to load testimonials</h4>
                    <p class="text-muted">Please refresh the page or try again later.</p>
                </div>
            `;
        });
    }
}

// Helper function to generate star ratings
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star text-warning"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    // Add empty stars to make 5 total
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star text-warning"></i>';
    }
    
    return starsHTML;
}

// Helper function to get correct image path based on current page location
function getImagePath(photo) {
    // Check if we're in a subfolder (portfolio) or at root
    const isInPortfolioFolder = window.location.pathname.includes('/portfolio/');
    const basePath = isInPortfolioFolder ? 'img/reviews/' : 'portfolio/img/reviews/';
    return `${basePath}${photo}`;
}

// Helper function to get avatar HTML (real photo or generic placeholder)
function getAvatarHTML(name, photo) {
    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57',
        '#FF9FF3', '#54A0FF', '#5F27CD', '#00D2D3', '#FF9F43'
    ];
    const colorIndex = name.length % colors.length;
    const bgColor = colors[colorIndex];
    
    if (photo && photo.startsWith('generic_')) {
        // Create CSS-based avatar with initials for generic photos
        return `<div class="avatar-placeholder rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
                     style="width: 50px; height: 50px; background-color: ${bgColor}; color: white; font-weight: bold; font-size: 18px;">
                    ${initials}
                </div>`;
    } else {
        // Use real photo with correct path
        return `<img src="${getImagePath(photo)}" 
                     class="rounded-circle shadow-sm" 
                     alt="${name}"
                     style="width: 50px; height: 50px; object-fit: cover;">`;
    }
}

// Functions for reviews.html page tab loading
function loadReviewsByType(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    console.log(`Loading ${type} reviews into ${containerId}`);
    
    // Filter reviews by type
    const filteredReviews = reviewsData.filter(review => review.type === type);
    
    if (filteredReviews.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <h4 class="text-muted">No ${type} reviews available</h4>
                <p class="text-muted">Check back soon for more reviews.</p>
            </div>
        `;
        return;
    }
    
    const reviewsHtml = `
        <div class="row">
            ${filteredReviews.map(review => `
                <div class="col-lg-4 col-md-6 mb-4">
                    <div class="testimonial-card h-100">
                        <div class="d-flex align-items-center mb-3">
                            <div class="mr-3">
                                ${getAvatarHTML(review.name, review.photo)}
                            </div>
                            <div>
                                <h6 class="mb-0 font-weight-bold">${review.name || 'Anonymous'}</h6>
                                <small class="text-primary font-weight-500">${review.title || 'Student'}</small>
                                <div class="text-muted small">${review.company || ''}</div>
                            </div>
                        </div>
                        <div class="mb-3">
                            ${generateStars(review.rating)}
                            <span class="ml-2 text-muted small">(${review.rating} Rating)</span>
                        </div>
                        <p class="text-muted">"${(review.review || '').replace(/"/g, '&quot;')}"</p>
                        <div class="mt-3">
                            <span class="badge badge-primary mr-1">${review.type.charAt(0).toUpperCase() + review.type.slice(1).replace('-', ' ')}</span>
                            ${review.subtype ? `<span class="badge badge-success">${review.subtype.charAt(0).toUpperCase() + review.subtype.slice(1)}</span>` : ''}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    container.innerHTML = reviewsHtml;
    console.log(`✅ Loaded ${filteredReviews.length} ${type} reviews`);
}

// Initialize reviews page tabs
async function initializeReviewsPage() {
    console.log('🔍 Initializing reviews page');
    
    // Load reviews data first
    await loadReviewsData();
    
    // Use Bootstrap's built-in tab functionality instead of custom implementation
    const tabLinks = document.querySelectorAll('#reviews-tabs a[data-toggle="pill"]');
    
    // Load workshop reviews initially (default active tab)
    loadReviewsByType('workshop', 'workshop-reviews-container');
    
    // Use Bootstrap's shown.bs.tab event instead of click to avoid conflicts
    tabLinks.forEach(link => {
        $(link).on('shown.bs.tab', function(e) {
            const targetId = $(this).attr('href').substring(1);
            console.log(`🎯 Tab shown: ${targetId}`);
            
            // Load content for the selected tab (lazy loading)
            if (targetId === 'workshop-reviews') {
                loadReviewsByType('workshop', 'workshop-reviews-container');
            } else if (targetId === 'mentoring-reviews') {
                loadReviewsByType('mentoring', 'mentoring-reviews-container');
            } else if (targetId === 'online-course-reviews') {
                loadReviewsByType('online-course', 'online-course-reviews-container');
            }
            
            console.log(`✅ Content loaded for tab: ${targetId}`);
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    
    // Credential Animation Enhancement
    const credentialItems = document.querySelectorAll('.credential-item');
    credentialItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('animated');
        }, (index + 1) * 300 + 800); // Trigger shimmer after each item appears
    });

    // Enhanced Navigation on Scroll - Hide brand row when scrolling
    const navbarWrapper = document.querySelector('.navbar-wrapper');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbarWrapper.classList.add('scrolled');
        } else {
            navbarWrapper.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Enhanced Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Floating Contact Button - Removed (broken and redundant with footer contacts)
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll');
                
                // Special handling for progress bars
                if (entry.target.classList.contains('skill-item')) {
                    const progressBar = entry.target.querySelector('.progress-bar');
                    if (progressBar) {
                        setTimeout(() => {
                            entry.target.classList.add('animate');
                        }, 200);
                    }
                }
                
                // Special handling for stats counters
                if (entry.target.classList.contains('stats-item')) {
                    animateCounter(entry.target);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.wow, .skill-item, .stats-item').forEach(el => {
        observer.observe(el);
    });
    
    // Counter Animation for Stats
    function animateCounter(element) {
        const numberElement = element.querySelector('h2, h3');
        if (!numberElement) return;
        
        const text = numberElement.textContent;
        
        // Handle decimal numbers like 4.7+
        if (text.includes('.')) {
            const number = parseFloat(text.replace(/[^\d.]/g, ''));
            if (isNaN(number)) return;
            
            const suffix = text.replace(/[\d.]/g, '');
            const duration = 2000;
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                numberElement.textContent = current.toFixed(1) + suffix;
            }, duration / steps);
        } else {
            // Handle whole numbers like 7000+, 10+
            const number = parseInt(text.replace(/\D/g, ''));
            if (isNaN(number)) return;
            
            const suffix = text.replace(/[\d]/g, '');
            const duration = 2000;
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    current = number;
                    clearInterval(timer);
                }
                numberElement.textContent = Math.floor(current) + suffix;
            }, duration / steps);
        }
    }
    
    // Enhanced Form Interactions (for all forms)
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            // Add floating labels effect
            if (input.type !== 'checkbox' && input.type !== 'radio') {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
                
                // Check if already has value on page load
                if (input.value) {
                    input.parentElement.classList.add('focused');
                }
            }
        });
    });
    
    // Enhanced Button Interactions
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Enhanced Loading States
    function showLoading() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay show';
        loadingOverlay.innerHTML = `
            <div class="text-center">
                <div class="loader"></div>
                <p class="mt-3 text-muted">Loading...</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
        return loadingOverlay;
    }
    
    function hideLoading(overlay) {
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        }
    }
    
    // Page Transition Effects
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0.5';
    });
    
    // Lazy Loading for Images
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Enhanced Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close modals/overlays
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal, .loading-overlay').forEach(el => {
                el.classList.remove('show');
            });
        }
        
        // Tab key enhancement for accessibility
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse click
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Performance Optimizations
    let ticking = false;
    
    function updateOnScroll() {
        // Throttle scroll events
        if (!ticking) {
            requestAnimationFrame(function() {
                // Update any scroll-dependent animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll);
    
    // Error Handling for Failed Requests
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        // Could add user-friendly error notifications here
    });
    
    // Service Worker Registration (for future PWA features)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            // Uncomment when service worker is ready
            // navigator.serviceWorker.register('/sw.js');
        });
    }
    
    // Load testimonials after DOM is ready
    console.log('🚀 Checking for testimonials container...');
    setTimeout(() => {
        loadTestimonials();
    }, 100);

    // Initialize reviews page tabs on load (only if on reviews page)
    if (document.getElementById('reviews-tab-content')) {
        initializeReviewsPage();
    }
    
    console.log('Interactive features loaded successfully! 🚀');
});

// Global function to show testimonials (accessible from onclick)
window.showTestimonialSet = function(setIndex) {
    console.log(`🎯 showTestimonialSet called with setIndex: ${setIndex}`);
    
    const containers = document.querySelectorAll('#testimonials-container');
    
    if (containers.length === 0) {
        console.error('❌ Cannot show testimonials: no containers found!');
        return;
    }
    
    if (reviewsData.length === 0) {
        console.error('❌ No reviews data loaded!');
        return;
    }
    
    console.log(`📊 Total reviews available: ${reviewsData.length}`);
    
    const reviewsPerSet = 3;
    const startIndex = setIndex * reviewsPerSet;
    const endIndex = Math.min(startIndex + reviewsPerSet, reviewsData.length);
    const currentReviews = reviewsData.slice(startIndex, endIndex);
    
    console.log(`✅ Showing reviews ${startIndex + 1} to ${endIndex} of ${reviewsData.length} (All Reviews)`);
    console.log('📋 Current reviews being rendered:', currentReviews);
    
    // Validate each review has required fields
    currentReviews.forEach((review, index) => {
        if (!review.name || !review.review || !review.rating) {
            console.error(`❌ Review ${index} is missing required fields:`, review);
        }
    });
    
    let reviewsHtml;
    try {
        reviewsHtml = `
            <div class="row">
                ${currentReviews.map((review, index) => {
                    try {
                        return `
                            <div class="col-lg-4 col-md-6 mb-4">
                                <div class="testimonial-card h-100">
                                    <div class="d-flex align-items-center mb-3">
                                        <div class="mr-3">
                                            ${getAvatarHTML(review.name, review.photo)}
                                        </div>
                                        <div>
                                            <h6 class="mb-0 font-weight-bold">${review.name || 'Anonymous'}</h6>
                                            <small class="text-primary font-weight-500">${review.title || 'Student'}</small>
                                            <div class="text-muted small">${review.company || ''}</div>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        ${generateStars(review.rating)}
                                        <span class="ml-2 text-muted small">(${review.rating} Rating)</span>
                                    </div>
                                    <p class="text-muted">"${(review.review || '').replace(/"/g, '&quot;')}"</p>
                                    <div class="mt-3">
                                        <span class="badge badge-primary mr-1">${review.type.charAt(0).toUpperCase() + review.type.slice(1).replace('-', ' ')}</span>
                                        ${review.subtype ? `<span class="badge badge-success">${review.subtype.charAt(0).toUpperCase() + review.subtype.slice(1)}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
                    } catch (error) {
                        console.error(`❌ Error rendering review ${index}:`, error, review);
                        return '<div class="col-lg-4 col-md-6 mb-4"><div class="alert alert-warning">Error loading review</div></div>';
                    }
                }).join('')}
            </div>
            
            <div class="d-flex justify-content-between align-items-center mt-4">
                <button class="btn btn-outline-primary" id="prevTestimonials" ${setIndex === 0 ? 'disabled' : ''}>
                    <i class="fas fa-chevron-left mr-2"></i>Previous
                </button>
                
                <div class="testimonial-indicators">
                    ${Array.from({length: Math.ceil(reviewsData.length / reviewsPerSet)}, (_, i) => `
                        <button class="btn btn-sm ${i === setIndex ? 'btn-primary' : 'btn-outline-primary'} mx-1" 
                                onclick="showTestimonialSet(${i})">${i + 1}</button>
                    `).join('')}
                </div>
                
                <button class="btn btn-outline-primary" id="nextTestimonials" 
                        ${endIndex >= reviewsData.length ? 'disabled' : ''}>
                    Next<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        `;
    } catch (error) {
        console.error('❌ Error generating testimonials HTML:', error);
        reviewsHtml = `
            <div class="text-center py-5">
                <h4 class="text-muted">Error loading testimonials.</h4>
                <p class="text-muted">Please try again later.</p>
            </div>
        `;
    }
    
    // Update all containers with the same content
    containers.forEach(container => {
        container.innerHTML = reviewsHtml;
    });
    currentReviewSet = setIndex;
    
    // Add event listeners for navigation (only need to do this once)
    const prevBtn = document.getElementById('prevTestimonials');
    const nextBtn = document.getElementById('nextTestimonials');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentReviewSet > 0) {
                showTestimonialSet(currentReviewSet - 1);
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const maxSets = Math.ceil(reviewsData.length / reviewsPerSet);
            if (currentReviewSet < maxSets - 1) {
                showTestimonialSet(currentReviewSet + 1);
            }
        });
    }
    
    console.log('✅ Testimonials displayed with navigation');
};

// Helper function to generate badges
function generateBadges(badges) {
    const badgeColors = [
        'badge-primary', 'badge-success', 'badge-info', 
        'badge-warning', 'badge-danger', 'badge-secondary'
    ];
    
    return badges.map((badge, index) => {
        const colorClass = badgeColors[index % badgeColors.length];
        return `<span class="badge ${colorClass} mr-1 mb-1">${badge}</span>`;
    }).join('');
}

// CSS for ripple effect
const rippleCSS = `
.btn {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.keyboard-navigation *:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style); 