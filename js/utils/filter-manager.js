class FilterManager {
  constructor(recipes) {
    this.recipes = recipes;
    this.container = document.getElementById('recipes-container');
    this.searchInput = document.getElementById('search-input');

    const filterManagerInstance = this;
    this.tagManager = new TagManager(filterManagerInstance, this.searchInput);
  }

  // Mthode qui permet d'ignorer la casse et l'accent sur les mots
  static normalizeString(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  // Méthode qui filtre les recettes en fonction d'un terme de recherche donné
  filterBySearchTerm(searchTerm) {
    const normalizedSearchTerm = FilterManager.normalizeString(searchTerm);

    const filteredRecipes = this.recipes.filter(recipe => {
      const recipeName = FilterManager.normalizeString(recipe.name);
      const recipeIngredients = recipe.ingredients.map(ingredient =>
        FilterManager.normalizeString(ingredient.ingredient)
      );
      const recipeAppliance = FilterManager.normalizeString(recipe.appliance);
      const recipeUstensils = recipe.ustensils.map(ustensil =>
        FilterManager.normalizeString(ustensil)
      );

      return (
        recipeName.includes(normalizedSearchTerm) ||
        recipeIngredients.some(ingredient =>
          ingredient.includes(normalizedSearchTerm)
        ) ||
        recipeAppliance.includes(normalizedSearchTerm) ||
        recipeUstensils.some(ustensil =>
          ustensil.includes(normalizedSearchTerm)
        )
      );
    });

    return filteredRecipes;
  }


  filterBySelectedTags(selectedTags) {
    const filteredRecipes = this.recipes.filter(recipe => {
      return selectedTags.every(tag => {
        return (
          FilterManager.normalizeString(recipe.name).includes(tag) ||
          recipe.ingredients.some(ing =>
            FilterManager.normalizeString(ing.ingredient).includes(tag)
          ) ||
          FilterManager.normalizeString(recipe.appliance).includes(tag) ||
          recipe.ustensils.some(ut => FilterManager.normalizeString(ut).includes(tag))
        );
      });
    });
    return filteredRecipes;
  }
  // Cette fonction retourne tous les ingrédients uniques des recettes données
  getAllIngredients(recipes) {
    const ingredients = new Set();

    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        ingredients.add(FilterManager.normalizeString(ingredient.ingredient));
      });
    });

    return Array.from(ingredients);
  }

  // Cette fonction retourne tous les appareils uniques des recettes données
  getAllAppliances(recipes) {
    const appliances = new Set();

    recipes.forEach(recipe => {
      appliances.add(FilterManager.normalizeString(recipe.appliance));
    });

    return Array.from(appliances);
  }

  // Cette fonction retourne tous les ustensiles uniques des recettes données
  getAllUstensils(recipes) {
    const ustensils = new Set();

    recipes.forEach(recipe => {
      recipe.ustensils.forEach(ustensil => {
        ustensils.add(FilterManager.normalizeString(ustensil));
      });
    });

    return Array.from(ustensils);
  }

  updateSearchResults() {
    const searchTerm = this.searchInput.value;
    const selectedTags = this.tagManager.selectedTags;
    const filteredRecipesBySearchTerm = this.filterBySearchTerm(searchTerm);
    const filteredRecipes = this.filterBySelectedTags(selectedTags).filter(r => filteredRecipesBySearchTerm.includes(r));

    this.container.innerHTML = '';

   // S'il n'y aucune recette correspondante, cela renvoie un message
   if (filteredRecipes.length === 0) {
    const messageElement = document.createElement('p');
    messageElement.className = 'no-recipes-message';
    messageElement.textContent = 'Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.';
    this.container.appendChild(messageElement);
    return; // Stop further execution
  }

    // Create a new instance of the RecipeFactory class to display the new recipe cards with the createRecipeCardDOM method
    const recipeCards = new RecipeFactory();
    filteredRecipes.forEach(recipeData => {
      recipeCards.createRecipeCardDOM(recipeData);
    });

    console.log(filteredRecipes);

    // Update selectable tags after filtering recipes
    this.tagManager.updateSelectableTags(filteredRecipes);
  }
}
