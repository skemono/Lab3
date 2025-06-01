// Replace all display feedback texts with Spanish equivalents

class CharacterManager {
    constructor() {
        this.baseURL = 'http://localhost:3000';
        this.arcs = [];
        this.characters = [];
        this.editingCharacterId = null;
        this.init();
    }

    async init() {
        await this.loadArcs();
        await this.loadCharacters();
        this.setupEventListeners();
    }

    async loadArcs() {
        try {
            // Since we don't have an arcs endpoint, we'll use the predefined arcs
            this.arcs = [
                { id: 1, name: 'East Blue', sea: 'EAST_BLUE' },
                { id: 2, name: 'Alabasta', sea: 'GRAND_LINE' },
                { id: 3, name: 'Water 7', sea: 'GRAND_LINE' },
                { id: 4, name: 'Enies Lobby', sea: 'GRAND_LINE' },
                { id: 5, name: 'Thriller Bark', sea: 'GRAND_LINE' },
                { id: 6, name: 'Sabaody Archipelago', sea: 'GRAND_LINE' },
                { id: 7, name: 'Impel Down', sea: 'GRAND_LINE' },
                { id: 8, name: 'Marineford', sea: 'GRAND_LINE' },
                { id: 9, name: 'Fishman Island', sea: 'NEW_WORLD' },
                { id: 10, name: 'Punk Hazard', sea: 'NEW_WORLD' }
            ];
            this.renderArcCheckboxes();
        } catch (error) {
            this.showToast('No se pudieron cargar los arcos', 'error');
        }
    }

    async loadCharacters() {
        try {
            this.showLoading(true);
            const response = await fetch(`${this.baseURL}/characters`);
            if (!response.ok) throw new Error('Failed to fetch characters');
            this.characters = await response.json();
            this.renderCharacters();
        } catch (error) {
            this.showToast('No se pudieron cargar los personajes', 'error');
            console.error('Error loading characters:', error);
        } finally {
            this.showLoading(false);
        }
    }

    renderArcCheckboxes() {
        const container = document.getElementById('arcCheckboxes');
        container.innerHTML = '';
        
        this.arcs.forEach(arc => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            checkboxItem.innerHTML = `
                <input type="checkbox" id="arc${arc.id}" value="${arc.id}">
                <label for="arc${arc.id}">${arc.name} (${this.formatSea(arc.sea)})</label>
            `;
            container.appendChild(checkboxItem);
        });
    }

    renderCharacters() {
        const container = document.getElementById('charactersList');
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const affiliationFilter = document.getElementById('affiliationFilter').value;
        
        let filteredCharacters = this.characters.filter(char => {
            const matchesSearch = char.name.toLowerCase().includes(searchTerm);
            const matchesAffiliation = !affiliationFilter || char.affiliation === affiliationFilter;
            return matchesSearch && matchesAffiliation;
        });

        if (filteredCharacters.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No se encontraron personajes</h3>
                    <p>Intenta ajustar tu búsqueda o filtros</p>
                </div>
            `;
            return;
        }

        container.innerHTML = filteredCharacters.map(char => `
            <div class="character-card">
                <h3>${char.name}</h3>
                <span class="affiliation-badge affiliation-${char.affiliation.toLowerCase()}">
                    ${this.formatAffiliation(char.affiliation)}
                </span>
                <div class="arcs-list">
                    <h4>Arcos de la historia:</h4>
                    <div class="arc-tags">
                        ${char.appearances.map(app => `
                            <span class="arc-tag">${app.arc.name}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="character-actions">
                    <button class="btn btn-edit" onclick="characterManager.editCharacter(${char.id})">
                        Editar
                    </button>
                    <button class="btn btn-danger" onclick="characterManager.deleteCharacter(${char.id})">
                        Eliminar
                    </button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('characterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        // Search and filter
        document.getElementById('searchInput').addEventListener('input', () => {
            this.renderCharacters();
        });

        document.getElementById('affiliationFilter').addEventListener('change', () => {
            this.renderCharacters();
        });

        // Cancel edit
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    async submitForm() {
        const formData = new FormData(document.getElementById('characterForm'));
        const data = {
            name: formData.get('name'),
            affiliation: formData.get('affiliation'),
            arcIds: Array.from(document.querySelectorAll('#arcCheckboxes input:checked'))
                        .map(input => parseInt(input.value))
        };

        try {
            this.showLoading(true);
            const url = this.editingCharacterId 
                ? `${this.baseURL}/characters/${this.editingCharacterId}`
                : `${this.baseURL}/characters`;
            const method = this.editingCharacterId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Failed to save character');

            this.showToast(
                this.editingCharacterId ? '¡Personaje actualizado correctamente!' : '¡Personaje agregado correctamente!',
                'success'
            );
            
            this.resetForm();
            await this.loadCharacters();
        } catch (error) {
            this.showToast('No se pudo guardar el personaje', 'error');
            console.error('Error saving character:', error);
        } finally {
            this.showLoading(false);
        }
    }

    editCharacter(id) {
        const character = this.characters.find(c => c.id === id);
        if (!character) return;

        this.editingCharacterId = id;
        
        // Fill form with character data
        document.getElementById('name').value = character.name;
        document.getElementById('affiliation').value = character.affiliation;
        
        // Clear all checkboxes first
        document.querySelectorAll('#arcCheckboxes input').forEach(input => {
            input.checked = false;
        });
        
        // Check the arcs this character appears in
        character.appearances.forEach(app => {
            const checkbox = document.getElementById(`arc${app.arcId}`);
            if (checkbox) checkbox.checked = true;
        });

        // Show cancel button and change submit button text
        document.getElementById('cancelEdit').style.display = 'inline-block';
        document.querySelector('#characterForm button[type="submit"]').textContent = 'Actualizar personaje';
        
        // Scroll to form
        document.querySelector('.form-section').scrollIntoView({ behavior: 'smooth' });
    }

    async deleteCharacter(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar este personaje?')) return;

        try {
            this.showLoading(true);
            const response = await fetch(`${this.baseURL}/characters/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) throw new Error('Failed to delete character');

            this.showToast('¡Personaje eliminado correctamente!', 'success');
            await this.loadCharacters();
        } catch (error) {
            this.showToast('No se pudo eliminar el personaje', 'error');
            console.error('Error deleting character:', error);
        } finally {
            this.showLoading(false);
        }
    }

    cancelEdit() {
        this.editingCharacterId = null;
        this.resetForm();
    }

    resetForm() {
        document.getElementById('characterForm').reset();
        document.querySelectorAll('#arcCheckboxes input').forEach(input => {
            input.checked = false;
        });
        document.getElementById('cancelEdit').style.display = 'none';
        document.querySelector('#characterForm button[type="submit"]').textContent = 'Agregar personaje';
        this.editingCharacterId = null;
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'flex' : 'none';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type}`;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    formatAffiliation(affiliation) {
        const affiliations = {
            'PIRATE': 'Pirata',
            'MARINE': 'Marina',
            'REVOLUTIONARY': 'Revolucionario',
            'CIVILIAN': 'Civil'
        };
        return affiliations[affiliation] || affiliation;
    }

    formatSea(sea) {
        const seas = {
            'EAST_BLUE': 'East Blue',
            'GRAND_LINE': 'Grand Line',
            'NEW_WORLD': 'Nuevo Mundo'
        };
        return seas[sea] || sea;
    }
}

// Initialize the application
const characterManager = new CharacterManager();