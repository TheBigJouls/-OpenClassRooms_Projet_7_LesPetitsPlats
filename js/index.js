// Charger les recettes à partir du fichier JSON
async function fetchRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error('Erreur lors du chargement du fichier JSON:', error);
  }
}

// Créer des instances des classes
async function createInstances(recipes) {
  const filterManager = new FilterManager(recipes);
  const searchInput = document.getElementById('search-input');
  const searchInputManager = new SearchInputManager(filterManager);
  const tagManager = new TagManager(filterManager, searchInput);
  const dropdownManager = new DropdownManager(tagManager);
  return {filterManager, searchInputManager, tagManager, dropdownManager};
}

// Ajouter des événements pour les boutons de menu déroulant et créer les entrées de recherche
function setupDropdown(dropdownManager) {
  dropdownManager.addDropdownEventListeners();
  dropdownManager.createSearchInputs();
}

// Générer et afficher les cartes de recettes initiales 
function generateRecipeCards(recipes, filterManager, tagManager) {
  const recipeFactory = new RecipeFactory(filterManager, tagManager);
  recipes.forEach(recipeData => {
    recipeFactory.createRecipeCardDOM(recipeData);
  });
}

// Obtenir et afficher tous les tags pour les ingrédients, les appareils et les ustensiles
function displayAllTags(recipes, filterManager, tagManager, recipeFactory) {
  const ingredients = filterManager.getAllIngredients(recipes);
  const appliances = filterManager.getAllAppliances(recipes);
  const ustensils = filterManager.getAllUstensils(recipes);
  recipeFactory.getTypeTags(ingredients, 'tag-ingredients', tagManager, 'ingredient');
  recipeFactory.getTypeTags(appliances, 'tag-appliances', tagManager, 'appliance');
  recipeFactory.getTypeTags(ustensils, 'tag-ustensils', tagManager, 'ustensil');
}

// Mettre à jour les résultats de recherche lorsque les tags sont ajoutés ou supprimés
function updateSearchResults(tagManager, searchInputManager, filterManager, recipeFactory) {
  tagManager.tagContainer.addEventListener('.selected-tag', () => {
    searchInputManager.updateSearchResults();
  });

  tagManager.tagContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('selected-tag')) {
      filterManager.updateSearchResults();
      const filteredRecipes = filterManager.filterBySelectedTags(Array.from(tagManager.selectedTags));
      const updatedIngredients = filterManager.getAllIngredients(filteredRecipes);
      const updatedAppliances = filterManager.getAllAppliances(filteredRecipes);
      const updatedUstensils = filterManager.getAllUstensils(filteredRecipes);
  
      recipeFactory.getTypeTags(updatedIngredients, 'tag-ingredients', tagManager);
      recipeFactory.getTypeTags(updatedAppliances, 'tag-appliances', tagManager);
      recipeFactory.getTypeTags(updatedUstensils, 'tag-ustensils', tagManager);
    }
  });
}

// Fonction d'initialisation de l'application
async function initApp() {
  const recipes = await fetchRecipes();
  const {filterManager, searchInputManager, tagManager, dropdownManager} = await createInstances(recipes);
  
  setupDropdown(dropdownManager);

  const recipeFactory = new RecipeFactory(filterManager, tagManager);
  
  generateRecipeCards(recipes, filterManager, tagManager);

  displayAllTags(recipes, filterManager, tagManager, recipeFactory);

  updateSearchResults(tagManager, searchInputManager, filterManager, recipeFactory);
}

// Appeler la fonction initApp pour initialiser l'application
initApp();