/**
 * Dynamic Logo Detection System
 * Automatically detects and uses logos from brand_logo folder
 * Supports PNG, JPG, JPEG, SVG, WebP formats
 * Future-proof: automatically picks up new logos without code changes
 */

class LogoDetector {
    constructor() {
        this.basePath = this.calculateBasePath();
        this.logoFolder = 'portfolio/img/brand_logo/';
        this.supportedFormats = ['png', 'jpg', 'jpeg', 'svg', 'webp'];
        this.priorityOrder = ['png', 'svg', 'webp', 'jpg', 'jpeg']; // PNG first for quality
        this.cache = new Map();
    }

    /**
     * Calculate base path relative to current page location
     */
    calculateBasePath() {
        const pathSegments = window.location.pathname.split('/').filter(segment => segment && segment !== 'index.html');
        
        // Remove filename if present
        if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.html')) {
            pathSegments.pop();
        }
        
        // Calculate relative path depth
        return pathSegments.length === 0 ? './' : '../'.repeat(pathSegments.length);
    }

    /**
     * Get brand logo with automatic detection and caching
     */
    async getBrandLogo() {
        const cacheKey = 'brand-logo';
        
        // Return cached result if available
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        try {
            // Try to detect available logos in priority order
            for (const format of this.priorityOrder) {
                const logoPath = `${this.basePath}${this.logoFolder}VISTA.${format}`;
                
                if (await this.checkImageExists(logoPath)) {
                    const logoData = {
                        src: logoPath,
                        alt: 'VISTA Brand Logo',
                        format: format.toUpperCase(),
                        detected: true
                    };
                    
                    // Cache the result
                    this.cache.set(cacheKey, logoData);
                    console.log(`✅ Brand logo detected: ${logoPath}`);
                    return logoData;
                }
            }
            
            // Fallback: Return existing profile picture
            const fallbackLogo = {
                src: `${this.basePath}portfolio/displayPicture/Viki-DP.jpg`,
                alt: 'Vignesh Srinivasa Raghavan',
                format: 'JPG',
                detected: false,
                fallback: true
            };
            
            console.log('⚠️ No brand logo found, using fallback profile picture');
            this.cache.set(cacheKey, fallbackLogo);
            return fallbackLogo;
            
        } catch (error) {
            console.error('❌ Logo detection error:', error);
            
            // Emergency fallback
            const emergencyLogo = {
                src: `${this.basePath}portfolio/displayPicture/Viki-DP.jpg`,
                alt: 'Vignesh Srinivasa Raghavan',
                format: 'JPG',
                detected: false,
                fallback: true,
                error: true
            };
            
            return emergencyLogo;
        }
    }

    /**
     * Check if image exists at given path
     */
    checkImageExists(imagePath) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = imagePath;
            
            // Timeout after 3 seconds
            setTimeout(() => resolve(false), 3000);
        });
    }

    /**
     * Generate logo HTML with optimization attributes
     */
    async generateLogoHTML(additionalClasses = '', additionalAttributes = '') {
        const logo = await this.getBrandLogo();
        
        // Optimization attributes for better performance
        const optimizationAttrs = [
            'loading="eager"', // Load immediately for brand logo
            'decoding="async"', // Non-blocking decoding
            'fetchpriority="high"' // High priority resource
        ].join(' ');
        
        return `<img src="${logo.src}" 
                     alt="${logo.alt}" 
                     class="navbar-logo ${additionalClasses}" 
                     ${optimizationAttrs}
                     ${additionalAttributes}
                     data-logo-format="${logo.format}"
                     data-logo-detected="${logo.detected}"
                     onerror="this.onerror=null; this.src='${this.basePath}portfolio/displayPicture/Viki-DP.jpg';">`;
    }

    /**
     * Apply logo to existing navigation elements
     */
    async applyToNavigation() {
        const logoElements = document.querySelectorAll('.navbar-logo, [data-logo-placeholder="true"]');
        
        if (logoElements.length === 0) {
            console.log('No logo elements found to update');
            return;
        }

        const logoHTML = await this.generateLogoHTML();
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = logoHTML;
        const newLogoElement = tempDiv.firstElementChild;

        logoElements.forEach((element, index) => {
            const clonedLogo = newLogoElement.cloneNode(true);
            
            // Preserve existing classes
            if (element.className) {
                clonedLogo.className += ` ${element.className}`;
            }
            
            // Replace the element
            element.parentNode.replaceChild(clonedLogo, element);
            console.log(`✅ Logo updated: element ${index + 1}`);
        });
    }

    /**
     * Initialize logo detection system
     */
    static async init() {
        const detector = new LogoDetector();
        
        // Apply to navigation immediately if elements exist
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => detector.applyToNavigation());
        } else {
            await detector.applyToNavigation();
        }
        
        return detector;
    }
}

// Global access for manual initialization
window.LogoDetector = LogoDetector;

// Auto-initialize when script loads
LogoDetector.init().then(detector => {
    console.log('🎯 Logo detection system initialized');
    window.logoDetector = detector;
}).catch(error => {
    console.error('❌ Logo detection initialization failed:', error);
});
