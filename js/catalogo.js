// Lógica para la página del catálogo (index.html)

let filteredProperties = [...properties];

// Inicializar página del catálogo
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterProperties);
    document.getElementById('minPrice').addEventListener('input', filterProperties);
    document.getElementById('maxPrice').addEventListener('input', filterProperties);
    document.getElementById('propertyType').addEventListener('change', filterProperties);
    document.getElementById('bedrooms').addEventListener('change', filterProperties);
}

// Renderizar propiedades en el grid
function renderProperties() {
    const grid = document.getElementById('propertiesGrid');
    grid.innerHTML = '';
    
    if (filteredProperties.length === 0) {
        grid.innerHTML = `
            <div class="col-12">
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <h3>No se encontraron propiedades</h3>
                    <p>Intenta ajustar tus filtros de búsqueda</p>
                    <button class="btn btn-primary" onclick="clearFilters()">Limpiar Filtros</button>
                </div>
            </div>
        `;
        return;
    }
    
    filteredProperties.forEach(property => {
        const isFav = isFavorite(property.id);
        const inComp = inComparator(property.id);
        
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4 mb-4 fade-in';
        card.innerHTML = `
            <div class="card property-card h-100">
                <div class="position-relative">
                    <img src="${property.image}" class="card-img-top property-image" alt="${property.name}">
                    <button class="favorite-btn position-absolute top-0 end-0 m-2 ${isFav ? 'active' : ''}" 
                            onclick="handleFavoriteClick(${property.id})">
                        <i class="fas fa-heart"></i>
                    </button>
                    ${property.year >= 2020 ? '<span class="badge badge-custom position-absolute top-0 start-0 m-2">Nuevo</span>' : ''}
                </div>
                <div class="card-body">
                    <div class="price-tag">$${property.price.toLocaleString()}</div>
                    <h5 class="card-title">${property.name}</h5>
                    <p class="text-muted mb-2">
                        <i class="fas fa-map-marker-alt me-1"></i>${property.location}
                    </p>
                    
                    <div class="property-features">
                        ${generateFeatures(property)}
                    </div>
                </div>
                <div class="card-footer bg-transparent">
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="detalle.html?id=${property.id}" class="btn btn-outline-primary">
                            <i class="fas fa-eye me-1"></i>Ver Detalles
                        </a>
                        <div class="form-check">
                            <input class="form-check-input compare-checkbox" type="checkbox" 
                                   id="compare${property.id}" ${inComp ? 'checked' : ''}
                                   onchange="handleComparatorChange(${property.id})">
                            <label class="form-check-label" for="compare${property.id}">Comparar</label>
                        </div>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Manejar clic en favorito
function handleFavoriteClick(propertyId) {
    toggleFavorite(propertyId);
    renderProperties();
}

// Manejar cambio en comparador
function handleComparatorChange(propertyId) {
    const comparator = toggleComparator(propertyId);
    
    // Si llegó al límite, desmarcar el checkbox
    if (comparator.length >= 4 && !inComparator(propertyId)) {
        const checkbox = document.getElementById(`compare${propertyId}`);
        checkbox.checked = false;
    }
}

// Filtrar propiedades
function filterProperties() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    const type = document.getElementById('propertyType').value;
    const bedrooms = document.getElementById('bedrooms').value;
    
    filteredProperties = properties.filter(property => {
        // Filtro de búsqueda por texto
        const matchesSearch = property.name.toLowerCase().includes(search) || 
                            property.location.toLowerCase().includes(search);
        
        // Filtro de precio
        const matchesPrice = property.price >= minPrice && property.price <= maxPrice;
        
        // Filtro de tipo
        const matchesType = !type || property.type === type;
        
        // Filtro de recámaras
        const matchesBedrooms = !bedrooms || 
                              (bedrooms === '4' ? property.bedrooms >= 4 : property.bedrooms == bedrooms);
        
        return matchesSearch && matchesPrice && matchesType && matchesBedrooms;
    });
    
    renderProperties();
}

// Limpiar todos los filtros
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('propertyType').value = '';
    document.getElementById('bedrooms').value = '';
    
    filteredProperties = [...properties];
    renderProperties();
}