// Fonction pour récupérer les données JSON
async function fetchRecipes() {
    try {
      const response = await fetch('data/recipes.json');
      const recipes = await response.json();
      return recipes;
    } catch (error) {
      console.error('Erreur lors du chargement du fichier JSON:', error);
    }
  }

// Fonction pour initialiser les menus déroulants
async function initDropdowns() {
  const recipes = await fetchRecipes();

  const ingredients = new Set();
  const appareils = new Set();
  const ustensiles = new Set();

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => ingredients.add(ingredient.ingredient));
    appareils.add(recipe.appliance);
    recipe.ustensils.forEach((ustensil) => ustensiles.add(ustensil));
  });

  // Fonction pour gérer les tags sélectionnés
  function handleTagSelected(selectedTags) {
    console.log("Gérer les tags sélectionnés ici:", selectedTags);
    // Mettez à jour les éléments de la liste déroulante en fonction des recettes possibles
  }

  // // Fonction pour filtrer la liste de tags
  function createSearchInputs() {
    const searchInputsContainers = document.querySelectorAll('.dropdown-search');

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

function filterItems(searchTerm, searchInputContainer) {
    const tagId = searchInputContainer.dataset.tagId;
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

createSearchInputs();

  const ingredientsDropdown = new TagFactory('tag-ingredients', Array.from(ingredients), handleTagSelected);
  const appareilsDropdown = new TagFactory('tag-appareils', Array.from(appareils), handleTagSelected);
  const ustensilesDropdown = new TagFactory('tag-ustensiles', Array.from(ustensiles), handleTagSelected);

  ingredientsDropdown.createItems();
  appareilsDropdown.createItems();
  ustensilesDropdown.createItems();
  
}

initDropdowns();
