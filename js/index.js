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

async function initApp() {
  const recipes = await fetchRecipes();

  // Créer des instances des classes
  const filterManager = new FilterManager(recipes);
  const searchInput = document.getElementById('search-input');
  const searchInputManager = new SearchInputManager(filterManager);
  const tagManager = new TagManager(filterManager, searchInput);
  const dropdownManager = new DropdownManager(tagManager);
  // Ajouter des événements pour les boutons de menu déroulant
  dropdownManager.addDropdownEventListeners();
  dropdownManager.createSearchInputs();
  
  const recipeFactory = new RecipeFactory(filterManager, tagManager);

  // Générer et afficher les cartes de recettes initiales
  recipes.forEach(recipeData => {
    recipeFactory.createRecipeCardDOM(recipeData);
  });


  // Obtenir et afficher tous les tags pour les ingrédients, les appareils et les ustensiles
  const ingredients = filterManager.getAllIngredients(recipes);
  const appliances = filterManager.getAllAppliances(recipes);
  const ustensils = filterManager.getAllUstensils(recipes);
  recipeFactory.getTypeTags(ingredients, 'tag-ingredients', tagManager, 'ingredient');
  recipeFactory.getTypeTags(appliances, 'tag-appliances', tagManager, 'appliance');
  recipeFactory.getTypeTags(ustensils, 'tag-ustensils', tagManager, 'ustensil');

 // Mettre à jour les résultats de recherche lorsque les tags sont ajoutées ou supprimées
    tagManager.tagContainer.addEventListener('.selected-tag', () => {
    searchInputManager.updateSearchResults();
  });

  tagManager.tagContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('selected-tag')) {
      searchInputManager.updateSearchResults();
      const filteredRecipes = filterManager.filterRecipesBySelectedTags(Array.from(tagManager.selectedTags));
      const updatedIngredients = filterManager.getAllIngredients(filteredRecipes);
      const updatedAppliances = filterManager.getAllAppliances(filteredRecipes);
      const updatedUstensils = filterManager.getAllUstensils(filteredRecipes);
  
      recipeFactory.getTypeTags(updatedIngredients, 'tag-ingredients', tagManager);
      recipeFactory.getTypeTags(updatedAppliances, 'tag-appliances', tagManager);
      recipeFactory.getTypeTags(updatedUstensils, 'tag-ustensils', tagManager);
    }
  });

}

// Appeler la fonction initApp pour initialiser l'application
initApp();