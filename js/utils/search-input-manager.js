class SearchInputManager {
    constructor(recipes) {
      this.recipes = recipes;
      this.searchInput = document.getElementById('search-input');
      this.container = document.getElementById('recipes-container');
  
      this.searchInput.addEventListener('input', () => {
        this.updateSearchResults();
      });
    }
  
    updateSearchResults() {
      const searchTerm = this.searchInput.value;
      const filteredRecipes = filterRecipesBySearchTerm(this.recipes, searchTerm);
  
      this.container.innerHTML = ''; 
  
      // Create a new instance of the RecipeFactory class to display the new recipe cards with the createRecipeCardDOM method
      filteredRecipes.forEach(recipeData => {
        const recipeCards = new RecipeFactory();
        recipeCards.createRecipeCardDOM(recipeData);
      });
  
      console.log(filteredRecipes);
    }
  }