// Lógica para la página de favoritos (favoritos.html)

document.addEventListener('DOMContentLoaded', function() {
    renderFavorites();
});

// Renderizar lista de favoritos
function renderFavorites() {
    const content = document.getElementById('favoritesContent');
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart"></i>
                <h3>No tienes favoritos aún</h3>
                <p>Explora nuestro catálogo y marca las propiedades que más te gusten.</p>
                <a href="index.html" class="btn btn-primary">Ver Catálogo</a>
            </div>
        `;
        return;
    }
    
    content.innerHTML = `
        <div class="mb-3">
            <h4>Tienes ${favorites.length} propiedad${favorites.length !== 1 ? 'es' : ''} en favoritos</h4>
        </div>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>Imagen</th>
                        <th>Propiedad</th>
                        <th>Ubicación</th>
                        <th>Precio</th>
                        <th>Tipo</th>
                        <th>Área</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${favorites.map(property => `
                        <tr class="fade-in">
                            <td>
                                <img src="${property.image}" alt="${property.name}" 
                                     style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px;">
                            </td>
                            <td>
                                <strong>${property.name}</strong>
                                ${property.year >= 2020 ? '<span class="badge badge-custom ms-2">Nuevo</span>' : ''}
                            </td>
                            <td>${property.location}</td>
                            <td>
                                <span class="text-success fw-bold">$${property.price.toLocaleString()}</span>
                            </td>
                            <td>
                                <span class="badge bg-secondary">${property.type}</span>
                            </td>
                            <td>${property.area} m²</td>
                            <td>
                                <div class="btn-group" role="group">
                                    <a href="detalle.html?id=${property.id}" class="btn btn-sm btn-outline-primary" title="Ver detalles">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <button class="btn btn-sm ${inComparator(property.id) ? 'btn-primary' : 'btn-outline-primary'}" 
                                            onclick="handleFavoriteComparator(${property.id})" title="Agregar al comparador">
                                        <i class="fas fa-balance-scale"></i>
                                    </button>
                                    <button class="btn btn-sm btn-outline-danger" 
                                            onclick="removeFavorite(${property.id})" title="Remover de favoritos">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            <div class="row">
                <div class="col-md-6">
                    <button class="btn btn-outline-secondary" onclick="clearAllFavorites()">
                        <i class="fas fa-trash-alt me-2"></i>Limpiar Todo
                    </button>
                </div>
                <div class="col-md-6 text-end">
                    <a href="index.html" class="btn btn-primary">
                        <i class="fas fa-plus me-2"></i>Agregar Más Propiedades
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Remover una propiedad de favoritos
function removeFavorite(propertyId) {
    if (confirm('¿Estás seguro de que quieres remover esta propiedad de favoritos?')) {
        toggleFavorite(propertyId);
        renderFavorites();
        showSuccessMessage('Propiedad removida de favoritos.');
    }
}

// Manejar comparador desde favoritos
function handleFavoriteComparator(propertyId) {
    toggleComparator(propertyId);
    renderFavorites();
}

// Limpiar todos los favoritos
function clearAllFavorites() {
    const favorites = getFavorites();
    
    if (favorites.length === 0) {
        showErrorMessage('No tienes propiedades en favoritos.');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres remover todas las ${favorites.length} propiedades de favoritos?`)) {
        saveFavorites([]);
        updateCounters();
        renderFavorites();
        showSuccessMessage('Todos los favoritos han sido removidos.');
    }
}