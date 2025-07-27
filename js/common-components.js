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
     * Load all common components
     */
    async loadAllComponents() {
        // Load head meta first if placeholder exists
        const headMetaPlaceholder = document.getElementById('common-head-meta');
        if (headMetaPlaceholder) {
            await this.insertHeadMeta();
            // Remove the placeholder as content is now in head
            headMetaPlaceholder.remove();
        }

        // Load other components
        const components = [
            { name: 'navigation', target: 'common-navigation' },
            { name: 'footer', target: 'common-footer' },
            { name: 'scripts', target: 'common-scripts' }
        ];

        for (const component of components) {
            await this.insertComponent(component.name, component.target);
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