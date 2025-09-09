// Funciones utilitarias para el manejo de datos y localStorage

// Obtener favoritos del localStorage
function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Guardar favoritos en localStorage
function saveFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Obtener comparador del localStorage
function getComparator() {
    return JSON.parse(localStorage.getItem('comparator')) || [];
}

// Guardar comparador en localStorage
function saveComparator(comparator) {
    localStorage.setItem('comparator', JSON.stringify(comparator));
}

// Agregar/quitar favorito
function toggleFavorite(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    let favorites = getFavorites();
    const index = favorites.findIndex(f => f.id === propertyId);
    
    if (index === -1) {
        favorites.push(property);
    } else {
        favorites.splice(index, 1);
    }
    
    saveFavorites(favorites);
    updateCounters();
    return favorites;
}

// Agregar/quitar del comparador
function toggleComparator(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;
    
    let comparator = getComparator();
    const index = comparator.findIndex(c => c.id === propertyId);
    
    if (index === -1) {
        if (comparator.length >= 4) {
            alert('Solo puedes comparar hasta 4 propiedades a la vez.');
            return comparator;
        }
        comparator.push(property);
    } else {
        comparator.splice(index, 1);
    }
    
    saveComparator(comparator);
    updateCounters();
    return comparator;
}

// Actualizar contadores en la navbar
function updateCounters() {
    const favorites = getFavorites();
    const comparator = getComparator();
    
    const favoritesCountEl = document.getElementById('favoritesCount');
    const comparatorCountEl = document.getElementById('comparatorCount');
    
    if (favoritesCountEl) {
        favoritesCountEl.textContent = favorites.length;
    }
    
    if (comparatorCountEl) {
        comparatorCountEl.textContent = comparator.length;
    }
}

// Verificar si una propiedad está en favoritos
function isFavorite(propertyId) {
    const favorites = getFavorites();
    return favorites.some(f => f.id === propertyId);
}

// Verificar si una propiedad está en el comparador
function inComparator(propertyId) {
    const comparator = getComparator();
    return comparator.some(c => c.id === propertyId);
}

// Obtener propiedad por ID
function getPropertyById(id) {
    return properties.find(p => p.id === parseInt(id));
}

// Obtener parámetro de URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0
    }).format(price);
}

// Generar HTML de características de propiedad
function generateFeatures(property) {
    let features = '';
    
    if (property.bedrooms > 0) {
        features += `<div class="feature-item"><i class="fas fa-bed"></i> ${property.bedrooms} rec.</div>`;
    }
    
    if (property.bathrooms > 0) {
        features += `<div class="feature-item"><i class="fas fa-bath"></i> ${property.bathrooms} baños</div>`;
    }
    
    features += `<div class="feature-item"><i class="fas fa-ruler-combined"></i> ${property.area} m²</div>`;
    
    if (property.parking > 0) {
        features += `<div class="feature-item"><i class="fas fa-car"></i> ${property.parking}</div>`;
    }
    
    return features;
}

// Exportar comparación
function exportComparison() {
    const comparator = getComparator();
    
    if (comparator.length === 0) {
        alert('No hay propiedades para exportar.');
        return;
    }
    
    const exportFormat = confirm('¿Desea exportar como CSV? (Cancelar para TXT)');
    
    let content = '';
    let filename = '';
    
    if (exportFormat) {
        // Formato CSV
        filename = 'comparacion.csv';
        content = 'Característica,' + comparator.map(p => `"${p.name}"`).join(',') + '\n';
        content += 'Precio,' + comparator.map(p => p.price).join(',') + '\n';
        content += 'Ubicación,' + comparator.map(p => `"${p.location}"`).join(',') + '\n';
        content += 'Tipo,' + comparator.map(p => p.type).join(',') + '\n';
        content += 'Área (m²),' + comparator.map(p => p.area).join(',') + '\n';
        content += 'Recámaras,' + comparator.map(p => p.bedrooms || 'N/A').join(',') + '\n';
        content += 'Baños,' + comparator.map(p => p.bathrooms || 'N/A').join(',') + '\n';
        content += 'Estacionamiento,' + comparator.map(p => p.parking || 'N/A').join(',') + '\n';
        content += 'Año,' + comparator.map(p => p.year).join(',') + '\n';
    } else {
        // Formato TXT
        filename = 'comparacion.txt';
        content = '=== COMPARACIÓN DE PROPIEDADES ===\n\n';
        
        comparator.forEach((property, index) => {
            content += `PROPIEDAD ${index + 1}: ${property.name}\n`;
            content += `Precio: $${property.price.toLocaleString()}\n`;
            content += `Ubicación: ${property.location}\n`;
            content += `Tipo: ${property.type}\n`;
            content += `Área: ${property.area} m²\n`;
            content += `Recámaras: ${property.bedrooms > 0 ? property.bedrooms : 'N/A'}\n`;
            content += `Baños: ${property.bathrooms > 0 ? property.bathrooms : 'N/A'}\n`;
            content += `Estacionamiento: ${property.parking > 0 ? property.parking : 'N/A'}\n`;
            content += `Año: ${property.year}\n`;
            content += `\n${'='.repeat(50)}\n\n`;
        });
    }
    
    // Crear y descargar archivo
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Validar email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensaje de éxito
function showSuccessMessage(message) {
    alert(message);
}

// Mostrar mensaje de error
function showErrorMessage(message) {
    alert(message);
}

// Inicializar contadores al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCounters();
});