// Fonction pour charger les recettes à partir du fichier JSON
async function loadRecipes() {
    try {
      const response = await fetch('data/recipes.json');
      const recipes = await response.json();
      return recipes;
    } catch (error) {
      console.error('Erreur lors du chargement du fichier JSON:', error);
    }
  }

// Récupérer la liste de 50 recettes et appliquer les fonctions
loadRecipes().then(recipes => {
    console.log(recipes);

    // Récupérer ce qu'écrit l'utilisateur dans la barre de recherche avec l'ID: searchInput
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const filteredRecipes = filterRecipesBySearchTerm(recipes, searchTerm);
        console.log(filteredRecipes);
    });
});


// Fonction qui permet d'ignorer la casse et l'accent sur les mots
function normalizeString(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Fonction pour filtrer la liste de recettes en fonction d'un terme de recherche
function filterRecipesBySearchTerm(recipes, searchTerm) {
    const normalizedSearchTerm = normalizeString(searchTerm);
    return recipes.filter(recipe => {
        return normalizeString(recipe.name).includes(normalizedSearchTerm) ||
            normalizeString(recipe.description).includes(normalizedSearchTerm);
    });
}

// Fonction pour filtrer la liste de recettes en fonction d'un ingrédient
function filterRecipesByIngredient(recipes, ingredient) {
    const normalizedIngredient = normalizeString(ingredient);
    return recipes.filter(recipe => {
        return recipe.ingredients.some(ing => normalizeString(ing.ingredient) === normalizedIngredient);
    });
}

// Fonction pour récupérer la liste de tous les ingrédients d'une liste de recettes (une seule itération d'un ingrédient)
function getAllIngredients(recipes) {
    const ingredientsSet = new Set();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsSet.add(normalizeString(ingredient.ingredient));
        });
    });
    return Array.from(ingredientsSet);
}
