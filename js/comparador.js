// Lógica para la página del comparador (comparador.html)

document.addEventListener('DOMContentLoaded', function() {
    renderComparator();
});

// Renderizar tabla comparativa
function renderComparator() {
    const content = document.getElementById('comparatorContent');
    const comparator = getComparator();
    
    if (comparator.length === 0) {
        content.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-balance-scale"></i>
                <h3>No hay propiedades para comparar</h3>
                <p>Selecciona hasta 4 propiedades del catálogo para compararlas.</p>
                <a href="index.html" class="btn btn-primary">Ver Catálogo</a>
            </div>
        `;
        return;
    }
    
    content.innerHTML = `
        <div class="mb-3">
            <h4>Comparando ${comparator.length} propiedad${comparator.length !== 1 ? 'es' : ''}</h4>
            <p class="text-muted">Puedes agregar hasta ${4 - comparator.length} propiedades más</p>
        </div>
        
        <div class="table-responsive">
            <table class="table comparison-table">
                <thead>
                    <tr>
                        <th style="width: 150px;">Característica</th>
                        ${comparator.map(property => `
                            <th class="text-center">
                                <img src="${property.image}" alt="${property.name}" 
                                     style="width: 100px; height: 80px; object-fit: cover; border-radius: 8px;" 
                                     class="mb-2 d-block mx-auto">
                                <div class="fw-bold small">${property.name}</div>
                                <div class="mt-2">
                                    <a href="detalle.html?id=${property.id}" class="btn btn-sm btn-outline-light me-1" title="Ver detalles">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <button class="btn btn-sm btn-outline-light" 
                                            onclick="removeFromComparator(${property.id})" title="Remover">
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong><i class="fas fa-dollar-sign me-2"></i>Precio</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center text-success fw-bold">
                                $${property.price.toLocaleString()}
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-map-marker-alt me-2"></i>Ubicación</strong></td>
                        ${comparator.map(property => `<td class="text-center">${property.location}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-home me-2"></i>Tipo</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                <span class="badge bg-secondary">${property.type}</span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-ruler-combined me-2"></i>Área</strong></td>
                        ${comparator.map(property => `<td class="text-center">${property.area} m²</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-bed me-2"></i>Recámaras</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                ${property.bedrooms > 0 ? `<span class="badge bg-info">${property.bedrooms}</span>` : '<span class="text-muted">N/A</span>'}
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-bath me-2"></i>Baños</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                ${property.bathrooms > 0 ? `<span class="badge bg-info">${property.bathrooms}</span>` : '<span class="text-muted">N/A</span>'}
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-car me-2"></i>Estacionamiento</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                ${property.parking > 0 ? `<span class="badge bg-info">${property.parking}</span>` : '<span class="text-muted">N/A</span>'}
                            </td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td><strong><i class="fas fa-calendar me-2"></i>Año</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                <span class="badge ${property.year >= 2020 ? 'bg-success' : 'bg-secondary'}">${property.year}</span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr class="table-light">
                        <td><strong><i class="fas fa-heart me-2"></i>Favorito</strong></td>
                        ${comparator.map(property => `
                            <td class="text-center">
                                <button class="btn btn-sm ${isFavorite(property.id) ? 'btn-danger' : 'btn-outline-danger'}" 
                                        onclick="handleComparatorFavorite(${property.id})">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div class="mt-4">
            <div class="row">
                <div class="col-md-6">
                    <button class="btn btn-outline-secondary" onclick="clearComparator()">
                        <i class="fas fa-trash-alt me-2"></i>Limpiar Comparador
                    </button>
                </div>
                <div class="col-md-6 text-end">
                    <a href="index.html" class="btn btn-outline-primary me-2">
                        <i class="fas fa-plus me-2"></i>Agregar Más Propiedades
                    </a>
                    <button class="btn btn-export" onclick="exportComparison()">
                        <i class="fas fa-download me-2"></i>Exportar
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Remover propiedad del comparador
function removeFromComparator(propertyId) {
    if (confirm('¿Remover esta propiedad del comparador?')) {
        toggleComparator(propertyId);
        renderComparator();
        showSuccessMessage('Propiedad removida del comparador.');
    }
}

// Manejar favorito desde comparador
function handleComparatorFavorite(propertyId) {
    toggleFavorite(propertyId);
    renderComparator();
}

// Limpiar todo el comparador
function clearComparator() {
    const comparator = getComparator();
    
    if (comparator.length === 0) {
        showErrorMessage('No hay propiedades en el comparador.');
        return;
    }
    
    if (confirm(`¿Estás seguro de que quieres remover todas las ${comparator.length} propiedades del comparador?`)) {
        saveComparator([]);
        updateCounters();
        renderComparator();
        showSuccessMessage('Comparador limpiado.');
    }
}