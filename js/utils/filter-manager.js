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

    const filteredRecipes = [];
    
    for (const recipe of this.recipes) {
      const recipeName = FilterManager.normalizeString(recipe.name);
      const recipeIngredients = [];
      
      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(FilterManager.normalizeString(ingredient.ingredient));
      }
      
      const recipeAppliance = FilterManager.normalizeString(recipe.appliance);
      const recipeUstensils = [];
      
      for (const ustensil of recipe.ustensils) {
        recipeUstensils.push(FilterManager.normalizeString(ustensil));
      }

      const recipeResults = recipeName.includes(normalizedSearchTerm) ||
                              recipeIngredients.some(ingredient => ingredient.includes(normalizedSearchTerm)) ||
                              recipeAppliance.includes(normalizedSearchTerm) ||
                              recipeUstensils.some(ustensil => ustensil.includes(normalizedSearchTerm));

      if (recipeResults) {
        filteredRecipes.push(recipe);
      }
    }

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
  getAllIngredients(recipes) {
    const ingredients = new Set();

    for (const recipe of recipes) {
      for (const ingredient of recipe.ingredients) {
        ingredients.add(FilterManager.normalizeString(ingredient.ingredient));
      }
    }

    return Array.from(ingredients);
  }

  getAllAppliances(recipes) {
    const appliances = new Set();

    for (const recipe of recipes) {
      appliances.add(FilterManager.normalizeString(recipe.appliance));
    }

    return Array.from(appliances);
  }

  getAllUstensils(recipes) {
    const ustensils = new Set();

    for (const recipe of recipes) {
      for (const ustensil of recipe.ustensils) {
        ustensils.add(FilterManager.normalizeString(ustensil));
      }
    }

    return Array.from(ustensils);
  }

  updateSearchResults() {
    const searchTerm = this.searchInput.value;
    const selectedTags = this.tagManager.selectedTags;
    const filteredRecipesBySearchTerm = this.filterBySearchTerm(searchTerm);
    const filteredRecipes = this.filterBySelectedTags(selectedTags).filter(r => filteredRecipesBySearchTerm.includes(r));

    this.container.innerHTML = '';

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
