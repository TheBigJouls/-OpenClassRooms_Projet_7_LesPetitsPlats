class DropdownManager {
  constructor() {
  }

  toggleDropdown(tagType, dropdownButton) {
    const ul = document.getElementById(tagType);
    ul.classList.toggle('show_tags');

    const dropdownTitle = dropdownButton.querySelector('.dropdown-btn-title');
    const searchInputContainer = dropdownButton.querySelector('.dropdown-btn-search');

    if (ul.classList.contains('show_tags')) {
      dropdownTitle.style.display = 'none';
      searchInputContainer.style.display = 'block';

      const firstSearchInput = searchInputContainer.querySelector('input');
      if (firstSearchInput) {
        firstSearchInput.focus();
      }
    } else {
      dropdownTitle.style.display = 'block';
      searchInputContainer.style.display = 'none';
    }
  }

  addDropdownEventListeners() {
    const dropdownButtons = document.getElementsByClassName('dropdown-btn');

    for (let button of dropdownButtons) {
      button.addEventListener('click', (event) => {
        const tagType = `tag-${event.currentTarget.dataset.name}`;
        this.toggleDropdown(tagType, event.currentTarget);
      });
    }
  }

  createSearchInputs() {
    const searchInputsContainers = document.querySelectorAll('.dropdown-btn-search');

    searchInputsContainers.forEach((searchInputContainer) => {
      const tagType = `tag-${searchInputContainer.dataset.name}`;
      searchInputContainer.dataset.tagType = tagType;
      const searchInput = document.createElement('input');
      searchInput.type = 'text';
      searchInput.placeholder = 'Rechercher un tag...';
      searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const tagType = searchInputContainer.dataset.tagType;
        this.filterTags(searchTerm, tagType);
      });
      searchInputContainer.appendChild(searchInput);

      searchInputContainer.style.display = 'none';
    });
  }

  filterTags(searchTerm, tagType) {
    const listTags = document.querySelectorAll(`#${tagType} li`);

    listTags.forEach(tag => {
      const normalizedItemText = tag.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (normalizedItemText.includes(searchTerm)) {
        tag.style.display = '';
      } else {
        tag.style.display = 'none';
      }
    });
  }
}
