// Global variables
let isLoggedIn = false;
let currentUsername = '';
let currentPassword = '';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadCompanyInfo();
    loadServices();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Admin modal
    const adminLink = document.getElementById('admin-link');
    const adminModal = document.getElementById('admin-modal');
    const closeBtn = document.querySelector('.close');

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        adminModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        adminModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === adminModal) {
            adminModal.style.display = 'none';
        }
    });

    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;
            switchTab(tabName);
        });
    });

    // Login form
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', handleLogin);

    // Company form
    const companyForm = document.getElementById('company-form');
    companyForm.addEventListener('submit', handleCompanyUpdate);

    // Add service button
    const addServiceBtn = document.getElementById('add-service-btn');
    addServiceBtn.addEventListener('click', handleAddService);
}

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');

    // If switching to edit tab, load data if logged in
    if (tabName === 'edit' && isLoggedIn) {
        loadEditForm();
    }
}

// Load company info from API
async function loadCompanyInfo() {
    try {
        const response = await fetch('/api/company-info');
        const data = await response.json();

        document.getElementById('welcome-title').textContent = data.welcome_title || 'Willkommen bei Blitz&Blank';
        document.getElementById('welcome-tagline').textContent = data.welcome_tagline || 'Ihrem zuverlässigen Partner für Qualität und Service';
        document.getElementById('welcome-text').textContent = data.welcome_text || 'Wir kümmern uns um gründliche Reinigung, Entsorgung und Pflege.';
        
        document.getElementById('owner-name').textContent = data.owner_name || 'Ihsan Alattar';
        document.getElementById('location').textContent = data.location || 'Büdingen';
        document.getElementById('email-link').textContent = data.email || 'ihsanalattar373@gmail.com';
        document.getElementById('email-link').href = `mailto:${data.email || 'ihsanalattar373@gmail.com'}`;

        // Update phone list
        const phoneList = document.getElementById('phone-list');
        phoneList.innerHTML = '';
        if (data.phone1) phoneList.innerHTML += `<li><a href="tel:${data.phone1.replace(/\s/g, '')}">${data.phone1}</a></li>`;
        if (data.phone2) phoneList.innerHTML += `<li><a href="tel:${data.phone2.replace(/\s/g, '')}">${data.phone2}</a></li>`;
        if (data.phone3) phoneList.innerHTML += `<li><a href="tel:${data.phone3.replace(/\s/g, '')}">${data.phone3}</a></li>`;

        // Store for edit form
        window.companyData = data;
    } catch (error) {
        console.error('Error loading company info:', error);
    }
}

// Load services from API
async function loadServices() {
    try {
        const response = await fetch('/api/services');
        const services = await response.json();

        const servicesGrid = document.getElementById('services-grid');
        servicesGrid.innerHTML = '';

        services.forEach(service => {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.innerHTML = `
                <div class="service-icon">${service.icon}</div>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
            `;
            servicesGrid.appendChild(card);
        });

        // Store for edit form
        window.servicesData = services;
    } catch (error) {
        console.error('Error loading services:', error);
    }
}

// Handle login
async function handleLogin(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('login-message');

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            isLoggedIn = true;
            currentUsername = username;
            currentPassword = password;

            messageDiv.innerHTML = '<div class="message success">Erfolgreich angemeldet!</div>';
            messageDiv.style.display = 'block';

            // Show edit content
            document.getElementById('edit-content').style.display = 'block';
            document.getElementById('not-logged-in').style.display = 'none';

            // Load edit form
            loadEditForm();

            // Clear form
            document.getElementById('login-form').reset();

            // Switch to edit tab after a short delay
            setTimeout(() => {
                document.querySelector('[data-tab="edit"]').click();
            }, 500);
        } else {
            messageDiv.innerHTML = '<div class="message error">Ungültige Anmeldedaten!</div>';
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        messageDiv.innerHTML = '<div class="message error">Fehler beim Anmelden!</div>';
        messageDiv.style.display = 'block';
        console.error('Login error:', error);
    }
}

// Load edit form with current data
function loadEditForm() {
    const data = window.companyData || {};

    document.getElementById('edit-owner').value = data.owner_name || '';
    document.getElementById('edit-location').value = data.location || '';
    document.getElementById('edit-email').value = data.email || '';
    document.getElementById('edit-phone1').value = data.phone1 || '';
    document.getElementById('edit-phone2').value = data.phone2 || '';
    document.getElementById('edit-phone3').value = data.phone3 || '';
    document.getElementById('edit-welcome-title').value = data.welcome_title || '';
    document.getElementById('edit-welcome-tagline').value = data.welcome_tagline || '';
    document.getElementById('edit-welcome-text').value = data.welcome_text || '';

    // Load services edit list
    loadServicesEditList();
}

// Load services for editing
function loadServicesEditList() {
    const services = window.servicesData || [];
    const editList = document.getElementById('services-edit-list');
    editList.innerHTML = '';

    services.forEach(service => {
        const item = document.createElement('div');
        item.className = 'service-edit-item';
        item.innerHTML = `
            <h4>${service.title}</h4>
            <div class="form-group">
                <label for="service-icon-${service.id}">Icon</label>
                <input type="text" id="service-icon-${service.id}" value="${service.icon}" maxlength="2">
            </div>
            <div class="form-group">
                <label for="service-title-${service.id}">Titel</label>
                <input type="text" id="service-title-${service.id}" value="${service.title}">
            </div>
            <div class="form-group">
                <label for="service-desc-${service.id}">Beschreibung</label>
                <textarea id="service-desc-${service.id}" rows="3">${service.description}</textarea>
            </div>
            <button type="button" class="delete-service-btn" onclick="deleteService(${service.id})">Löschen</button>
            <button type="button" class="submit-button" style="margin-top: 0.5rem;" onclick="updateService(${service.id})">Speichern</button>
        `;
        editList.appendChild(item);
    });
}

// Handle company info update
async function handleCompanyUpdate(e) {
    e.preventDefault();

    const formData = {
        username: currentUsername,
        password: currentPassword,
        owner_name: document.getElementById('edit-owner').value,
        location: document.getElementById('edit-location').value,
        email: document.getElementById('edit-email').value,
        phone1: document.getElementById('edit-phone1').value,
        phone2: document.getElementById('edit-phone2').value,
        phone3: document.getElementById('edit-phone3').value,
        welcome_title: document.getElementById('edit-welcome-title').value,
        welcome_tagline: document.getElementById('edit-welcome-tagline').value,
        welcome_text: document.getElementById('edit-welcome-text').value
    };

    try {
        const response = await fetch('/api/company-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        const messageDiv = document.getElementById('company-message');

        if (response.ok) {
            messageDiv.innerHTML = '<div class="message success">Erfolgreich gespeichert!</div>';
            messageDiv.style.display = 'block';

            // Reload company info on the page
            loadCompanyInfo();

            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 3000);
        } else {
            messageDiv.innerHTML = '<div class="message error">Fehler beim Speichern!</div>';
            messageDiv.style.display = 'block';
        }
    } catch (error) {
        console.error('Update error:', error);
        document.getElementById('company-message').innerHTML = '<div class="message error">Fehler beim Speichern!</div>';
    }
}

// Update service
async function updateService(serviceId) {
    const icon = document.getElementById(`service-icon-${serviceId}`).value;
    const title = document.getElementById(`service-title-${serviceId}`).value;
    const description = document.getElementById(`service-desc-${serviceId}`).value;

    try {
        const response = await fetch(`/api/services/${serviceId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: currentUsername,
                password: currentPassword,
                icon,
                title,
                description
            })
        });

        if (response.ok) {
            alert('Leistung aktualisiert!');
            loadServices();
            loadServicesEditList();
        } else {
            alert('Fehler beim Aktualisieren!');
        }
    } catch (error) {
        console.error('Update error:', error);
        alert('Fehler beim Aktualisieren!');
    }
}

// Delete service
async function deleteService(serviceId) {
    if (!confirm('Möchten Sie diese Leistung wirklich löschen?')) {
        return;
    }

    try {
        const response = await fetch(`/api/services/${serviceId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: currentUsername,
                password: currentPassword
            })
        });

        if (response.ok) {
            alert('Leistung gelöscht!');
            loadServices();
            loadServicesEditList();
        } else {
            alert('Fehler beim Löschen!');
        }
    } catch (error) {
        console.error('Delete error:', error);
        alert('Fehler beim Löschen!');
    }
}

// Handle add service
function handleAddService() {
    const icon = prompt('Icon (Emoji):', '⭐');
    if (!icon) return;

    const title = prompt('Titel:', '');
    if (!title) return;

    const description = prompt('Beschreibung:', '');
    if (!description) return;

    addService(icon, title, description);
}

// Add new service
async function addService(icon, title, description) {
    try {
        const response = await fetch('/api/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: currentUsername,
                password: currentPassword,
                icon,
                title,
                description
            })
        });

        if (response.ok) {
            alert('Leistung hinzugefügt!');
            loadServices();
            loadServicesEditList();
        } else {
            alert('Fehler beim Hinzufügen!');
        }
    } catch (error) {
        console.error('Add error:', error);
        alert('Fehler beim Hinzufügen!');
    }
}

