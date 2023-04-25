// Fonction pour basculer l'affichage des éléments d'un menu déroulant
function toggleDropdown(tagId) {
  const ul = document.getElementById(tagId);
  ul.classList.toggle('show_items');
}

// Fonction pour ajouter des gestionnaires d'événements aux boutons de menu déroulant
function addDropdownEventListeners() {
  const dropdownButtons = document.getElementsByClassName('dropdown-btn');
  
  for (let button of dropdownButtons) {
      button.addEventListener('click', (event) => {
          console.log("click ingredient")
          const tagId = `tag-${event.currentTarget.dataset.name}`;
          toggleDropdown(tagId);
      });
  }
}

  // // Fonction pour filtrer la liste de tags
  function createSearchInputs() {
    const searchInputsContainers = document.querySelectorAll('.dropdown-btn');

    searchInputsContainers.forEach((searchInputContainer) => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search tags...';
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            filterItems(searchTerm, searchInputContainer);
        });
        searchInputContainer.appendChild(searchInput);
    });
}

function createSearchInputs() {
  const searchInputsContainers = document.querySelectorAll('.dropdown-btn');

  searchInputsContainers.forEach((searchInputContainer) => {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search tags...';
    searchInput.addEventListener('input', (event) => {
      const searchTerm = event.target.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const category = searchInputContainer.dataset.category;
      filterItems(searchTerm, category);
    });
    searchInputContainer.appendChild(searchInput);
  });
}

function filterItems(searchTerm, category) {
  const listItems = document.querySelectorAll(`#${category} li`);

  listItems.forEach(item => {
    const normalizedItemText = item.textContent.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    if (normalizedItemText.includes(searchTerm)) {
      item.style.display = 'list-item';
    } else {
      item.style.display = 'none';
    }
  });
}


createSearchInputs();
// Ajout des gestionnaires d'événements aux boutons de menu déroulant
addDropdownEventListeners();