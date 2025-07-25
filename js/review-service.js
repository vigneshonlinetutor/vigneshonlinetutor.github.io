/**
 * Centralized Review Service
 * Handles all review loading, filtering, caching, and fallback logic
 * Used by all pages for consistency and reliability
 */

class ReviewService {
    constructor() {
        this.reviewsData = [];
        this.cache = new Map();
        this.isLoaded = false;
        this.fallbackData = this.getFallbackData();
    }

    /**
     * Determine the correct path to reviews.json based on current page location
     * @returns {string} Path to reviews.json
     */
    getReviewsJsonPath() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        console.log(`🔍 DEBUG: currentPath = "${currentPath}"`);
        console.log(`🔍 DEBUG: currentPage = "${currentPage}"`);
        
        // Determine path based on current page location
        if (currentPath.includes('/portfolio/training/')) {
            // From training pages: portfolio/training/xxx.html
            console.log(`🔍 DEBUG: Detected training page, using path: ../../portfolio/reviews.json`);
            return '../../portfolio/reviews.json';
        } else if (currentPath.includes('/portfolio/') && currentPage === 'reviews.html') {
            // From portfolio/reviews.html  
            console.log(`🔍 DEBUG: Detected reviews page, using path: reviews.json`);
            return 'reviews.json';
        } else {
            // From root (index.html) or default
            console.log(`🔍 DEBUG: Detected root page, using path: portfolio/reviews.json`);
            return 'portfolio/reviews.json';
        }
    }

    /**
     * Determine the correct path to review photos based on current page location
     * @param {string} photoName - The photo filename
     * @returns {string} Path to photo
     */
    getPhotoPath(photoName) {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Determine path based on current page location
        if (currentPath.includes('/portfolio/training/')) {
            // From training pages: portfolio/training/xxx.html
            return `../../portfolio/img/reviews/${photoName}`;
        } else if (currentPath.includes('/portfolio/') && currentPage === 'reviews.html') {
            // From portfolio/reviews.html  
            return `img/reviews/${photoName}`;
        } else {
            // From root (index.html) or default
            return `portfolio/img/reviews/${photoName}`;
        }
    }

    /**
     * Load reviews data with fallback support
     * @returns {Promise<boolean>} Success status
     */
    async loadReviews() {
        if (this.isLoaded) {
            console.log('✅ Reviews already loaded, using cached data');
            return true;
        }

        try {
            // Try to load from JSON first - determine correct path based on current page
            const reviewsPath = this.getReviewsJsonPath();
            console.log(`🔍 Attempting to fetch reviews from: ${reviewsPath}`);
            const response = await fetch(reviewsPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const data = await response.json();
            this.reviewsData = data.reviews || [];
            this.isLoaded = true;
            
            console.log(`✅ Loaded ${this.reviewsData.length} reviews from JSON`);
            return true;
        } catch (error) {
            console.log('⚠️ Primary path failed, trying alternative paths:', error.message);
            
            // Try alternative paths in case primary detection failed
            const alternativePaths = [
                'reviews.json',
                '../reviews.json', 
                '../../portfolio/reviews.json',
                '../../../portfolio/reviews.json',
                'portfolio/reviews.json'
            ];
            
            for (const altPath of alternativePaths) {
                try {
                    console.log(`🔄 Trying alternative path: ${altPath}`);
                    const altResponse = await fetch(altPath);
                    if (altResponse.ok) {
                        const altData = await altResponse.json();
                        this.reviewsData = altData.reviews || [];
                        this.isLoaded = true;
                        console.log(`✅ SUCCESS! Loaded ${this.reviewsData.length} reviews from alternative path: ${altPath}`);
                        return true;
                    }
                } catch (altError) {
                    console.log(`❌ Alternative path failed: ${altPath} - ${altError.message}`);
                }
            }
            
            // If all paths fail, use fallback
            console.log('⚠️ All paths failed, using fallback data');
            this.reviewsData = this.fallbackData;
            this.isLoaded = true;
            
            console.log(`✅ Using ${this.reviewsData.length} fallback reviews`);
            return false;
        }
    }

    /**
     * Get filtered reviews with caching
     * @param {string|null} type - Review type filter
     * @param {string|null} subtype - Review subtype filter
     * @param {Object} options - Additional options
     * @returns {Array} Filtered reviews
     */
    async getReviews(type = null, subtype = null, options = {}) {
        // Ensure data is loaded
        if (!this.isLoaded) {
            await this.loadReviews();
        }

        // Create cache key
        const cacheKey = `${type || 'all'}-${subtype || 'all'}-${JSON.stringify(options)}`;
        
        // Check cache first
        if (this.cache.has(cacheKey)) {
            console.log(`📋 Using cached results for: ${cacheKey}`);
            return this.cache.get(cacheKey);
        }

        // Filter reviews
        let filtered = [...this.reviewsData]; // Clone array

        if (type) {
            filtered = filtered.filter(review => review.type === type);
        }

        if (subtype) {
            filtered = filtered.filter(review => review.subtype === subtype);
        }

        // Apply sorting
        const { sortBy = 'rating', sortOrder = 'desc' } = options;
        filtered.sort((a, b) => {
            // First sort by subtype if available
            if (a.subtype && b.subtype && a.subtype !== b.subtype) {
                return a.subtype.localeCompare(b.subtype);
            }
            
            // Then sort by specified field
            if (sortBy === 'rating') {
                return sortOrder === 'desc' ? b.rating - a.rating : a.rating - b.rating;
            } else if (sortBy === 'name') {
                return sortOrder === 'desc' 
                    ? b.name.localeCompare(a.name)
                    : a.name.localeCompare(b.name);
            }
            
            return 0;
        });

        // Apply limit if specified
        if (options.limit) {
            filtered = filtered.slice(0, options.limit);
        }

        // Cache results
        this.cache.set(cacheKey, filtered);
        
        console.log(`✅ Filtered ${filtered.length} reviews for: ${cacheKey}`);
        return filtered;
    }

    /**
     * Get review statistics
     * @returns {Object} Statistics about reviews
     */
    async getStats() {
        if (!this.isLoaded) {
            await this.loadReviews();
        }

        const stats = {
            total: this.reviewsData.length,
            byType: {},
            bySubtype: {},
            averageRating: 0
        };

        let totalRating = 0;

        this.reviewsData.forEach(review => {
            // Count by type
            stats.byType[review.type] = (stats.byType[review.type] || 0) + 1;
            
            // Count by subtype
            if (review.subtype) {
                stats.bySubtype[review.subtype] = (stats.bySubtype[review.subtype] || 0) + 1;
            }
            
            // Sum ratings
            totalRating += review.rating;
        });

        stats.averageRating = totalRating / this.reviewsData.length;

        return stats;
    }

    /**
     * Render reviews using consistent HTML template
     * @param {Array} reviews - Reviews to render
     * @param {string} containerId - Target container ID
     * @param {Object} options - Rendering options
     */
    renderReviews(reviews, containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`❌ Container ${containerId} not found!`);
            return;
        }

        const {
            layout = 'grid',
            showHeader = true,
            showBadges = true,
            showPagination = false,
            itemsPerPage = 6
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

        const reviewsHtml = reviews.map(review => this.generateReviewHTML(review, options)).join('');
        
        if (layout === 'grid') {
            container.innerHTML = `<div class="row">${reviewsHtml}</div>`;
        } else if (layout === 'carousel') {
            container.innerHTML = this.generateCarouselHTML(reviews, options);
        }

        console.log(`✅ Rendered ${reviews.length} reviews in ${containerId}`);
    }

    /**
     * Generate HTML for a single review
     * @param {Object} review - Review data
     * @param {Object} options - Rendering options
     * @returns {string} HTML string
     */
    generateReviewHTML(review, options = {}) {
        const { showBadges = true, colClass = 'col-lg-4 col-md-6' } = options;
        
        const photoPath = this.getPhotoPath(review.photo);
        const photoHtml = review.photo && review.photo.startsWith('generic_') ? 
            `<div class="avatar-placeholder rounded-circle shadow-sm d-flex align-items-center justify-content-center" 
                  style="width: 60px; height: 60px; background-color: #6366F1; color: white; font-weight: bold; font-size: 20px;">
                 ${review.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase()}
             </div>` :
            `<img src="${photoPath}" 
                  class="rounded-circle shadow-sm" 
                  alt="${review.name}"
                  style="width: 60px; height: 60px; object-fit: cover;">`;

        const starsHtml = this.generateStars(review.rating);
        
        const badgesHtml = showBadges ? `
            <div class="mt-auto">
                <span class="badge badge-primary mr-1">${review.type.charAt(0).toUpperCase() + review.type.slice(1).replace('-', ' ')}</span>
                ${review.subtype ? `<span class="badge badge-success">${review.subtype.charAt(0).toUpperCase() + review.subtype.slice(1)}</span>` : ''}
            </div>
        ` : '';

        return `
            <div class="${colClass} mb-4">
                <div class="review-card h-100 p-4 border rounded shadow-sm">
                    <div class="d-flex align-items-center mb-3">
                        <div class="mr-3">${photoHtml}</div>
                        <div>
                            <h6 class="mb-0 font-weight-bold">${review.name}</h6>
                            <small class="text-primary font-weight-500">${review.title || ''}</small>
                            <div class="text-muted small">${review.company || ''}</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        ${starsHtml}
                        <span class="ml-2 text-muted small">(${review.rating}★)</span>
                    </div>
                    <p class="text-muted mb-3">"${review.review}"</p>
                    ${badgesHtml}
                </div>
            </div>
        `;
    }

    /**
     * Generate carousel HTML for testimonials
     * @param {Array} reviews - Reviews to display
     * @param {Object} options - Carousel options
     * @returns {string} HTML string
     */
    generateCarouselHTML(reviews, options = {}) {
        const { itemsPerSet = 3 } = options;
        // Implementation for carousel layout (similar to current index.html)
        // This would include the carousel structure with navigation
        return `<div class="testimonials-carousel"><!-- Carousel implementation --></div>`;
    }

    /**
     * Generate star rating HTML
     * @param {number} rating - Rating value
     * @returns {string} HTML string
     */
    generateStars(rating) {
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

    /**
     * Clear cache (useful for refreshing data)
     */
    clearCache() {
        this.cache.clear();
        console.log('✅ Review cache cleared');
    }

    /**
     * Fallback review data for reliability
     * @returns {Array} Fallback reviews
     */
    getFallbackData() {
        return [
            // Workshop Reviews (3) - Mix of Playwright and Gen-AI
            {
                "name": "Anukriti Ojha",
                "review": "The 4-week Playwright with TypeScript bootcamp led by Vignesh was an incredible learning experience. He covered a comprehensive range of topics, making it easy to grasp the essentials of this powerful UI automation tool. Playwright has redefined the UI automation experience for the testing community, and I highly recommend this session to anyone looking to start their UI automation journey or deepen their understanding of the tool",
                "type": "workshop",
                "subtype": "playwright",
                "title": "Senior Quality Engineer",
                "company": "Walmart Global Tech India",
                "rating": 4.9,
                "photo": "anukriti_ojha.jpeg"
            },
            {
                "name": "Anukriti Ojha",
                "review": "This AI workshop on Test Automation was insightful and incredibly relevant to the future of QA. It showcased practical ways to integrate AI into testing workflows—from generating test cases to intelligent code analysis , etc. A must-attend for anyone looking to stay ahead in the evolving world of software testing and understanding our place in the new world of AI :)",
                "type": "workshop",
                "subtype": "gen-ai",
                "title": "Senior Quality Engineer",
                "company": "Walmart Global Tech India",
                "rating": 4.9,
                "photo": "anukriti_ojha.jpeg"
            },
            {
                "name": "Deepesh Agarwal",
                "review": "The Playwright workshop with TypeScript was incredibly valuable. It provided hands-on experience with automating browser tests, and using TypeScript for better code quality. The practical exercises and real-world examples helped me feel confident in applying Playwright to streamline web application testing. Vignesh, the instructor, was fantastic—he explained complex concepts clearly, provided insightful tips, and was always available to help with the questions. Highly recommend this workshop for anyone looking to improve their test automation skills!",
                "type": "workshop",
                "subtype": "playwright",
                "title": "",
                "company": "",
                "rating": 5.0,
                "photo": "generic_male.jpg"
            },
            // Online Course Reviews (4) - One from each technology
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
                "name": "Divya",
                "title": "Performance Test Engineer",
                "company": "TCS",
                "rating": 4.8,
                "photo": "generic_female.jpg",
                "review": "Vignesh made Gatling approachable, even for someone new to Scala. The explanation of feeders, injections, CLI setup, and Gatling Enterprise was so clear. I now feel confident setting up performance tests with real-world scenarios. The Grafana integration module was a bonus!",
                "type": "online-course",
                "subtype": "gatling"
            },
            // Mentoring Reviews (3)
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
            }
        ];
    }
}

// Create global instance
window.reviewService = new ReviewService();

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewService;
} 