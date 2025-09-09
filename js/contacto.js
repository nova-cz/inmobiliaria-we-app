// Lógica para la página de contacto (contacto.html)

document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
});

// Configurar formulario de contacto
function setupContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
        
        // Agregar validación en tiempo real
        const nameField = document.getElementById('contactName');
        const emailField = document.getElementById('contactEmail');
        const messageField = document.getElementById('contactMessage');
        
        nameField.addEventListener('blur', validateName);
        emailField.addEventListener('blur', validateEmailField);
        messageField.addEventListener('blur', validateMessage);
    }
}

// Manejar envío del formulario
function handleContactSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    
    // Limpiar estilos de error previos
    clearValidationErrors();
    
    let isValid = true;
    
    // Validación de nombre
    if (!name || name.length < 2) {
        showFieldError('contactName', 'El nombre es obligatorio y debe tener al menos 2 caracteres.');
        isValid = false;
    }
    
    // Validación de email
    if (!email) {
        showFieldError('contactEmail', 'El email es obligatorio.');
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError('contactEmail', 'Por favor, ingresa un email válido.');
        isValid = false;
    }
    
    // Validación de mensaje
    if (!message || message.length < 10) {
        showFieldError('contactMessage', 'El mensaje es obligatorio y debe tener al menos 10 caracteres.');
        isValid = false;
    }
    
    // Validación opcional de teléfono
    if (phone && !validatePhone(phone)) {
        showFieldError('contactPhone', 'Por favor, ingresa un teléfono válido (opcional).');
        isValid = false;
    }
    
    if (!isValid) {
        showErrorMessage('Por favor, corrige los errores en el formulario.');
        return;
    }
    
    // Simular envío del formulario
    submitContactForm({ name, email, phone, message });
}

// Enviar formulario (simulado)
function submitContactForm(formData) {
    // Mostrar indicador de carga
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
    
    // Simular envío con delay
    setTimeout(() => {
        // Restaurar botón
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Mostrar mensaje de éxito
        showSuccessMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
        
        // Limpiar formulario
        document.getElementById('contactForm').reset();
        clearValidationErrors();
        
        // Opcional: Guardar en localStorage para seguimiento
        saveContactSubmission(formData);
        
    }, 2000);
}

// Validaciones individuales
function validateName() {
    const nameField = document.getElementById('contactName');
    const name = nameField.value.trim();
    
    if (!name || name.length < 2) {
        showFieldError('contactName', 'El nombre debe tener al menos 2 caracteres.');
        return false;
    }
    
    clearFieldError('contactName');
    return true;
}

function validateEmailField() {
    const emailField = document.getElementById('contactEmail');
    const email = emailField.value.trim();
    
    if (!email) {
        showFieldError('contactEmail', 'El email es obligatorio.');
        return false;
    }
    
    if (!validateEmail(email)) {
        showFieldError('contactEmail', 'Por favor, ingresa un email válido.');
        return false;
    }
    
    clearFieldError('contactEmail');
    return true;
}

function validateMessage() {
    const messageField = document.getElementById('contactMessage');
    const message = messageField.value.trim();
    
    if (!message || message.length < 10) {
        showFieldError('contactMessage', 'El mensaje debe tener al menos 10 caracteres.');
        return false;
    }
    
    clearFieldError('contactMessage');
    return true;
}

function validatePhone(phone) {
    // Patrón básico para teléfonos mexicanos
    const phonePattern = /^(\+52\s?)?(\d{2,3}[\s-]?)?\d{7,8}$/;
    return phonePattern.test(phone.replace(/\s/g, ''));
}

// Mostrar error en campo específico
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.classList.add('is-invalid');
    
    // Remover mensaje de error previo
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Agregar nuevo mensaje de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Limpiar error de campo específico
function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Limpiar todos los errores de validación
function clearValidationErrors() {
    const fields = ['contactName', 'contactEmail', 'contactPhone', 'contactMessage'];
    fields.forEach(fieldId => clearFieldError(fieldId));
}

// Guardar envío de contacto (opcional, para seguimiento)
function saveContactSubmission(formData) {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    submissions.push({
        ...formData,
        timestamp: new Date().toISOString(),
        id: Date.now()
    });
    
    // Mantener solo los últimos 10 envíos
    if (submissions.length > 10) {
        submissions.splice(0, submissions.length - 10);
    }
    
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
}