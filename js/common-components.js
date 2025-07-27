/**
 * Common Components Loader
 * Handles loading shared components with dynamic path resolution
 */

class CommonComponents {
    constructor() {
        this.basePath = this.calculateBasePath();
        this.componentCache = {};
    }

    /**
     * Calculate the base path to root based on current page location
     */
    calculateBasePath() {
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/').filter(segment => segment && segment !== 'index.html');
        
        // Remove the filename if it exists
        if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1].includes('.html')) {
            pathSegments.pop();
        }
        
        // Count directory depth and create relative path
        const depth = pathSegments.length;
        return depth === 0 ? './' : '../'.repeat(depth);
    }

    /**
     * Load component HTML and resolve dynamic paths
     */
    async loadComponent(componentName) {
        if (this.componentCache[componentName]) {
            return this.componentCache[componentName];
        }

        try {
            const componentUrl = `${this.basePath}common/${componentName}.html`;
            const response = await fetch(componentUrl);
            
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentName}`);
            }
            
            let html = await response.text();
            
            // Replace DYNAMIC_PATH placeholders with actual base path
            html = html.replace(/DYNAMIC_PATH\//g, this.basePath);
            
            // Cache the resolved HTML
            this.componentCache[componentName] = html;
            return html;
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
            return '';
        }
    }

    /**
     * Insert component HTML into specified element
     */
    async insertComponent(componentName, targetElementId) {
        const element = document.getElementById(targetElementId);
        if (!element) {
            console.error(`Target element not found: ${targetElementId}`);
            return;
        }

        const html = await this.loadComponent(componentName);
        
        // Special handling for scripts component to load synchronously
        if (componentName === 'scripts') {
            await this.loadScriptsSequentially(html, element);
        } else {
            element.innerHTML = html;
        }
    }

    /**
     * Load scripts sequentially to ensure proper dependency order
     */
    async loadScriptsSequentially(html, container) {
        // Create a temporary container to parse scripts
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        const scripts = Array.from(tempDiv.querySelectorAll('script'));
        
        // Load each script sequentially
        for (const script of scripts) {
            await this.loadSingleScript(script.src);
        }
        
        // Mark container as loaded
        container.innerHTML = '<!-- Scripts loaded dynamically -->';
        console.log('✅ Scripts component loaded successfully');
    }

    /**
     * Load a single script and wait for it to complete
     */
    loadSingleScript(src) {
        return new Promise((resolve, reject) => {
            if (this.isScriptAlreadyLoaded(src)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    /**
     * Check if script is already loaded
     */
    isScriptAlreadyLoaded(src) {
        return Array.from(document.scripts).some(script => script.src === src);
    }

    /**
     * Insert head meta component into document head
     */
    async insertHeadMeta() {
        const html = await this.loadComponent('head-meta');
        if (html) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            
            // Extract and append each element to head
            Array.from(tempDiv.children).forEach(element => {
                document.head.appendChild(element);
            });
            
            console.log('✅ Head meta component loaded successfully');
        }
    }

    /**
     * Load all common components with performance optimizations
     */
    async loadAllComponents() {
        console.log('🚀 Starting optimized component loading...');
        
        // Load head meta first if placeholder exists (critical for styling)
        const headMetaPlaceholder = document.getElementById('common-head-meta');
        if (headMetaPlaceholder) {
            await this.insertHeadMeta();
            // Remove the placeholder as content is now in head
            headMetaPlaceholder.remove();
        }

        // Add loading indicators to prevent layout shift
        this.addLoadingIndicators();

        // Load navigation and footer in parallel for better performance
        const components = [
            { name: 'navigation', target: 'common-navigation' },
            { name: 'footer', target: 'common-footer' }
        ];

        // Load navigation and footer concurrently
        const componentPromises = components.map(async (component) => {
            try {
                await this.insertComponent(component.name, component.target);
                console.log(`✅ ${component.name} component loaded successfully`);
            } catch (error) {
                console.error(`❌ Failed to load ${component.name}:`, error);
                // Fallback: show error message but don't break the page
                this.showComponentError(component.target, component.name);
            }
        });

        // Wait for navigation and footer to load
        await Promise.all(componentPromises);

        // Load scripts last (least critical for initial render)
        try {
            await this.insertComponent('scripts', 'common-scripts');
            console.log('✅ Scripts component loaded successfully');
        } catch (error) {
            console.error('❌ Failed to load scripts:', error);
        }

        // Remove loading indicators
        this.removeLoadingIndicators();
        console.log('🎉 All components loaded successfully');
    }

    /**
     * Add loading indicators to prevent layout shift
     */
    addLoadingIndicators() {
        const indicators = [
            { id: 'common-navigation', text: 'Loading navigation...' },
            { id: 'common-footer', text: 'Loading footer...' }
        ];

        indicators.forEach(({ id, text }) => {
            const element = document.getElementById(id);
            if (element && !element.innerHTML.trim()) {
                element.innerHTML = `<div class="component-loading">${text}</div>`;
                element.style.minHeight = id === 'common-navigation' ? '120px' : '200px';
            }
        });
    }

    /**
     * Remove loading indicators
     */
    removeLoadingIndicators() {
        ['common-navigation', 'common-footer'].forEach(id => {
            const element = document.getElementById(id);
            if (element && element.querySelector('.component-loading')) {
                element.style.minHeight = '';
            }
        });
    }

    /**
     * Show error message for failed component
     */
    showComponentError(targetId, componentName) {
        const element = document.getElementById(targetId);
        if (element) {
            element.innerHTML = `
                <div style="padding: 20px; background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; border-radius: 4px; margin: 10px;">
                    <strong>Loading Error:</strong> Failed to load ${componentName} component. Please refresh the page.
                </div>
            `;
        }
    }

    /**
     * Initialize components when DOM is ready
     */
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadAllComponents());
        } else {
            this.loadAllComponents();
        }
    }
}

// Global instance
window.commonComponents = new CommonComponents();

// Auto-initialize if not manually controlled
if (typeof window.autoInitComponents === 'undefined' || window.autoInitComponents) {
    window.commonComponents.init();
} 