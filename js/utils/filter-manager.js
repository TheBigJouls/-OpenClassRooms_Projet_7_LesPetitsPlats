class FilterManager {
  constructor(recipes) {
    this.recipes = recipes;
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
          normalizeString(recipe.name).includes(tag) ||
          recipe.ingredients.some(ing =>
            normalizeString(ing.ingredient).includes(tag)
          ) ||
          normalizeString(recipe.appliance).includes(tag) ||
          recipe.ustensils.some(ut => normalizeString(ut).includes(tag))
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
}