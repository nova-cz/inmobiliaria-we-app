// Lógica para la página de detalle (detalle.html)

document.addEventListener('DOMContentLoaded', function() {
    const propertyId = getUrlParameter('id');
    if (propertyId) {
        showPropertyDetail(parseInt(propertyId));
    } else {
        showErrorMessage('No se encontró la propiedad solicitada.');
        window.location.href = 'index.html';
    }
});

// Mostrar detalle de la propiedad
function showPropertyDetail(id) {
    const property = getPropertyById(id);
    
    if (!property) {
        showErrorMessage('Propiedad no encontrada.');
        window.location.href = 'index.html';
        return;
    }
    
    const isFav = isFavorite(property.id);
    const inComp = inComparator(property.id);
    
    document.title = `${property.name} - InmoView`;
    
    document.getElementById('propertyDetail').innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <div id="propertyCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        ${property.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img src="${img}" class="d-block w-100" alt="Imagen ${index + 1}">
                            </div>
                        `).join('')}
                    </div>
                    ${property.images.length > 1 ? `
                        <button class="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon"></span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon"></span>
                        </button>
                    ` : ''}
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="price-tag mb-3">$${property.price.toLocaleString()}</div>
                        <h3>${property.name}</h3>
                        <p class="text-muted mb-3">
                            <i class="fas fa-map-marker-alt me-2"></i>${property.location}
                        </p>
                        
                        <div class="property-features mb-4">
                            ${property.bedrooms > 0 ? `<div class="feature-item"><i class="fas fa-bed"></i> ${property.bedrooms} recámaras</div>` : ''}
                            ${property.bathrooms > 0 ? `<div class="feature-item"><i class="fas fa-bath"></i> ${property.bathrooms} baños</div>` : ''}
                            <div class="feature-item"><i class="fas fa-ruler-combined"></i> ${property.area} m²</div>
                            ${property.parking > 0 ? `<div class="feature-item"><i class="fas fa-car"></i> ${property.parking} estacionamientos</div>` : ''}
                            <div class="feature-item"><i class="fas fa-calendar"></i> Año ${property.year}</div>
                        </div>
                        
                        <div class="d-grid gap-2">
                            <button class="btn ${isFav ? 'btn-danger' : 'btn-outline-danger'}" 
                                    onclick="handleDetailFavorite(${property.id})">
                                <i class="fas fa-heart me-2"></i>${isFav ? 'Remover de Favoritos' : 'Agregar a Favoritos'}
                            </button>
                            <button class="btn ${inComp ? 'btn-primary' : 'btn-outline-primary'}" 
                                    onclick="handleDetailComparator(${property.id})">
                                <i class="fas fa-balance-scale me-2"></i>${inComp ? 'Remover del Comparador' : 'Agregar al Comparador'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <h4>Descripción</h4>
                        <p>${property.description}</p>
                        
                        <h5 class="mt-4">Características Adicionales</h5>
                        <div class="row">
                            ${property.features.map(feature => `
                                <div class="col-md-3 mb-2">
                                    <span class="badge bg-light text-dark p-2">
                                        <i class="fas fa-check-circle text-success me-1"></i>${feature}
                                    </span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Manejar favorito desde detalle
function handleDetailFavorite(propertyId) {
    toggleFavorite(propertyId);
    showPropertyDetail(propertyId);
}

// Manejar comparador desde detalle
function handleDetailComparator(propertyId) {
    const comparator = toggleComparator(propertyId);
    
    // Verificar si se pudo agregar (no llegó al límite)
    if (comparator.length < 4 || inComparator(propertyId)) {
        showPropertyDetail(propertyId);
    } else {
        // Si no se pudo agregar, volver a renderizar sin cambios
        showPropertyDetail(propertyId);
    }
}