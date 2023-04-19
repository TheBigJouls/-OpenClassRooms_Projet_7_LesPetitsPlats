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

    // Créer une instance de la classe RecipeFactory qui affiche les cartes de recettes avec la méthode createRecipeCardDOM
    recipes.forEach(recipeData => {
        const recipeCards = new RecipeFactory();
        recipeCards.createRecipeCardDOM(recipeData);
    });

    
    // Récupérer ce qu'écrit l'utilisateur dans la barre de recherche avec l'ID: searchInput
    const searchInput = document.getElementById('search-input');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value;
        const filteredRecipes = filterRecipesBySearchTerm(recipes, searchTerm);
        
        // Récupérer la fonction qui supprime les anciennes recettes et affiche les nouvelles cartes
        const container = document.getElementById('recipes-container');
        container.innerHTML = ''; // Supprimer les anciennes cartes de recettes

        // Créer une instance de la classe RecipeFactory qui affiche les nouvelles cartes de recettes avec la méthode createRecipeCardDOM
        filteredRecipes.forEach(recipeData => {
            const recipeCards = new RecipeFactory();
            recipeCards.createRecipeCardDOM(recipeData);
        });

        console.log(filteredRecipes);
    });
});


// Fonction qui permet d'ignorer la casse et l'accent sur les mots
function normalizeString(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Fonction pour filtrer la liste de recettes en fonction de plusieurs termes de recherche, incluant les ingrédients, appliances et ustensiles
function filterRecipesBySearchTerm(recipes, searchTerm) {
    const normalizedSearchTerms = normalizeString(searchTerm).split(/\s+/);

    return recipes.filter(recipe => {
        return normalizedSearchTerms.some(term => {
            return normalizeString(recipe.name).includes(term) ||
                normalizeString(recipe.description).includes(term) ||
                recipe.ingredients.some(ing => normalizeString(ing.ingredient).includes(term)) ||
                normalizeString(recipe.appliance).includes(term) ||
                recipe.ustensils.some(ut => normalizeString(ut).includes(term));
        });
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
