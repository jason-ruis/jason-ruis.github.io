/**
 * Three Forms Resources - Main Application Script
 * Handles CSV parsing, filtering, search, and dynamic rendering
 */

// Global state
let allResources = [];
let filteredResources = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    setupEventListeners();
});

/**
 * Load and parse the CSV data
 */
async function loadCSVData() {
    try {
        const response = await fetch('three-forms-resources.csv');
        const csvText = await response.text();
        allResources = parseCSV(csvText);
        filteredResources = [...allResources];
        renderResources(filteredResources);
        updateResultCount(filteredResources.length);
        document.getElementById('totalResources').textContent = allResources.length;
    } catch (error) {
        console.error('Error loading CSV:', error);
        document.getElementById('resourceGrid').innerHTML =
            '<div class="loading">Error loading resources. Please refresh the page.</div>';
    }
}

/**
 * Parse CSV text into array of objects
 */
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const resources = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        if (values.length === headers.length) {
            const resource = {};
            headers.forEach((header, index) => {
                resource[header] = values[index] ? values[index].trim() : '';
            });
            resources.push(resource);
        }
    }

    return resources;
}

/**
 * Parse a single CSV line (handles quoted fields with commas)
 */
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);
    return result;
}

/**
 * Render resources to the grid
 */
function renderResources(resources) {
    const grid = document.getElementById('resourceGrid');

    if (resources.length === 0) {
        grid.innerHTML = '<div class="loading">No resources found matching your criteria.</div>';
        return;
    }

    grid.innerHTML = resources.map(resource => createResourceCard(resource)).join('');
}

/**
 * Create HTML for a resource card
 */
function createResourceCard(resource) {
    const title = escapeHtml(resource.title);
    const authors = escapeHtml(resource.authors);
    const form = escapeHtml(resource.form);
    const resourceType = escapeHtml(resource.resource_type);
    const summary = escapeHtml(resource.summary);
    const tags = resource.tags ? resource.tags.split('|').slice(0, 5) : [];
    const recommendedFor = resource.recommended_for || '';
    const publisher = resource.source_citation_site || resource.purchase_store || '';

    // Determine which URL to use
    const primaryUrl = resource.url || resource.canonical_url || '#';
    const purchaseUrl = resource.purchase_url || '';
    const hasAmazonAffiliate = resource.amazon_affiliate_ready === 'TRUE' && resource.asin;

    // Format resource type for display
    const typeDisplay = formatResourceType(resourceType);

    return `
        <article class="resource-card">
            <div class="card-header">
                <span class="card-confession">${form}</span>
                <h3 class="card-title">${title}</h3>
                ${authors ? `<p class="card-author">by ${authors}</p>` : ''}
            </div>

            <div class="card-meta">
                <div class="meta-item">
                    <span class="meta-label">Type</span>
                    <span class="meta-value">${typeDisplay}</span>
                </div>
                ${publisher ? `
                    <div class="meta-item">
                        <span class="meta-label">Publisher</span>
                        <span class="meta-value">${escapeHtml(publisher)}</span>
                    </div>
                ` : ''}
                ${recommendedFor ? `
                    <div class="meta-item">
                        <span class="meta-label">For</span>
                        <span class="meta-value">${formatRecommendedFor(recommendedFor)}</span>
                    </div>
                ` : ''}
            </div>

            <p class="card-description">${summary}</p>

            ${tags.length > 0 ? `
                <div class="card-tags">
                    ${tags.map(tag => `<span class="tag">#${escapeHtml(tag.trim())}</span>`).join('')}
                </div>
            ` : ''}

            <div class="card-footer">
                ${primaryUrl !== '#' ? `
                    <a href="${primaryUrl}" target="_blank" rel="noopener" class="card-button">View Resource</a>
                ` : ''}
                ${purchaseUrl ? `
                    <a href="${purchaseUrl}" target="_blank" rel="noopener" class="card-button primary">
                        ${hasAmazonAffiliate ? 'Buy on Amazon ↗' : 'Purchase ↗'}
                    </a>
                ` : ''}
            </div>
        </article>
    `;
}

/**
 * Format resource type for display
 */
function formatResourceType(type) {
    const typeMap = {
        'book': 'Book',
        'study_guide': 'Study Guide',
        'commentary': 'Commentary',
        'sermon_series': 'Sermon Series',
        'curriculum': 'Curriculum',
        'article': 'Article',
        'primary_text': 'Primary Text',
        'devotional': 'Devotional'
    };
    return typeMap[type] || type;
}

/**
 * Format recommended audience
 */
function formatRecommendedFor(text) {
    return text.split(';').map(item => {
        const formatted = item.trim().charAt(0).toUpperCase() + item.trim().slice(1);
        return formatted;
    }).join(', ');
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Filter checkboxes
    const confessionCheckboxes = document.querySelectorAll('input[name="confession"]');
    const typeCheckboxes = document.querySelectorAll('input[name="type"]');

    confessionCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleConfessionFilter);
    });

    typeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleTypeFilter);
    });

    // Reset button
    document.getElementById('resetFilters').addEventListener('click', resetFilters);

    // Navigation links
    setupNavigationLinks();
}

/**
 * Handle confession filter changes
 */
function handleConfessionFilter(e) {
    const allCheckbox = document.getElementById('confessionAll');
    const otherCheckboxes = document.querySelectorAll('input[name="confession"]:not(#confessionAll)');

    if (e.target.id === 'confessionAll') {
        if (e.target.checked) {
            otherCheckboxes.forEach(cb => cb.checked = false);
        }
    } else {
        if (e.target.checked) {
            allCheckbox.checked = false;
        }
        const anyChecked = Array.from(otherCheckboxes).some(cb => cb.checked);
        if (!anyChecked) {
            allCheckbox.checked = true;
        }
    }

    applyFilters();
}

/**
 * Handle type filter changes
 */
function handleTypeFilter(e) {
    const allCheckbox = document.getElementById('typeAll');
    const otherCheckboxes = document.querySelectorAll('input[name="type"]:not(#typeAll)');

    if (e.target.id === 'typeAll') {
        if (e.target.checked) {
            otherCheckboxes.forEach(cb => cb.checked = false);
        }
    } else {
        if (e.target.checked) {
            allCheckbox.checked = false;
        }
        const anyChecked = Array.from(otherCheckboxes).some(cb => cb.checked);
        if (!anyChecked) {
            allCheckbox.checked = true;
        }
    }

    applyFilters();
}

/**
 * Apply all active filters
 */
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    // Get selected confessions
    const selectedConfessions = [];
    const confessionCheckboxes = document.querySelectorAll('input[name="confession"]:checked');
    confessionCheckboxes.forEach(cb => {
        if (cb.value !== 'all') {
            selectedConfessions.push(cb.value);
        }
    });

    // Get selected types
    const selectedTypes = [];
    const typeCheckboxes = document.querySelectorAll('input[name="type"]:checked');
    typeCheckboxes.forEach(cb => {
        if (cb.value !== 'all') {
            selectedTypes.push(cb.value);
        }
    });

    // Filter resources
    filteredResources = allResources.filter(resource => {
        // Search filter
        if (searchTerm) {
            const searchableText = `
                ${resource.title}
                ${resource.authors}
                ${resource.summary}
                ${resource.tags}
            `.toLowerCase();
            if (!searchableText.includes(searchTerm)) {
                return false;
            }
        }

        // Confession filter
        if (selectedConfessions.length > 0) {
            if (!selectedConfessions.includes(resource.form)) {
                return false;
            }
        }

        // Type filter
        if (selectedTypes.length > 0) {
            if (!selectedTypes.includes(resource.resource_type)) {
                return false;
            }
        }

        return true;
    });

    renderResources(filteredResources);
    updateResultCount(filteredResources.length);
}

/**
 * Perform search
 */
function performSearch() {
    applyFilters();
}

/**
 * Reset all filters
 */
function resetFilters() {
    // Reset search
    document.getElementById('searchInput').value = '';

    // Reset checkboxes
    document.getElementById('confessionAll').checked = true;
    document.getElementById('typeAll').checked = true;
    document.querySelectorAll('input[name="confession"]:not(#confessionAll)').forEach(cb => {
        cb.checked = false;
    });
    document.querySelectorAll('input[name="type"]:not(#typeAll)').forEach(cb => {
        cb.checked = false;
    });

    // Reset results
    filteredResources = [...allResources];
    renderResources(filteredResources);
    updateResultCount(filteredResources.length);
}

/**
 * Update the result count display
 */
function updateResultCount(count) {
    document.getElementById('resultCount').textContent = count;
}

/**
 * Setup navigation links to filter by confession
 */
function setupNavigationLinks() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#heidelberg') {
                e.preventDefault();
                filterByConfession('Heidelberg');
                updateActiveNav(link);
            } else if (href === '#belgic') {
                e.preventDefault();
                filterByConfession('Belgic');
                updateActiveNav(link);
            } else if (href === '#canons') {
                e.preventDefault();
                filterByConfession('Canons');
                updateActiveNav(link);
            } else if (href === '#home') {
                e.preventDefault();
                resetFilters();
                updateActiveNav(link);
            }
        });
    });
}

/**
 * Filter resources by specific confession
 */
function filterByConfession(confession) {
    // Reset all filters first
    document.getElementById('confessionAll').checked = false;
    document.querySelectorAll('input[name="confession"]').forEach(cb => {
        if (cb.value === confession) {
            cb.checked = true;
        } else if (cb.id !== 'confessionAll') {
            cb.checked = false;
        }
    });
    applyFilters();
}

/**
 * Update active navigation link
 */
function updateActiveNav(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}
