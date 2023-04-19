class TagFactory {
    constructor(tagId, items) {
        this.tagId = tagId;
        this.items = items;

        this.createItems();
        this.createSearchInput();
    }

    createItems() {
        const ul = document.getElementById(this.tagId);

        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                console.log('Item sélectionné:', item);
            });
            ul.appendChild(li);
        });
    }

    createSearchInput() {
        const searchInputContainer = document.querySelector(`.dropdown-search`);
        
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search tags...';
        searchInput.addEventListener('input', () => {
            this.filterItems(this.tagId, searchInput.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''));
        });
        searchInputContainer.appendChild(searchInput);
    }

    filterItems(tagId, searchTerm) {
        const listItems = document.querySelectorAll(`#${tagId} li`);

        listItems.forEach(item => {
            const normalizedItemText = item.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            if (normalizedItemText.includes(searchTerm)) {
                item.style.display = 'list-item';
            } else {
                item.style.display = 'none';
            }
        });
    }
}
