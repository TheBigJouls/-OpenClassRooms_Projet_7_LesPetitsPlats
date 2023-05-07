// Fonction pour charger les recettes à partir du fichier JSON
async function fetchRecipes() {
  try {
    const response = await fetch('data/recipes.json');
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error('Erreur lors du chargement du fichier JSON:', error);
  }
}

// Récupérer la liste de 50 recettes et appliquer les fonctions
fetchRecipes().then(recipes => {
  console.log(recipes);

 
  // Créer une instance de la classe RecipeFactory qui affiche les cartes de recettes avec la méthode createRecipeCardDOM
  recipes.forEach(recipeData => {
    const recipeCards = new RecipeFactory();
    recipeCards.createRecipeCardDOM(recipeData);
  });

   // Créer une nouvelle instance de SearchInputManager
   const searchInputManager = new SearchInputManager(recipes);

   // Créer une nouvelle instance de FilterManager avec l'instance de SearchInputManager
   //const filterManager = new FilterManager(searchInputManager);

});


// Fonction qui permet d'ignorer la casse et l'accent sur les mots
function normalizeString(str) {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Fonction pour filtrer la liste de recettes en fonction de plusieurs termes de recherche, incluant les ingrédients, appliances et ustensils
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

// Fonction pour filtrer les recettes en fonction des tags sélectionnés
function filterRecipesBySelectedTags(recipes, selectedTags) {
  return recipes.filter(recipe => {
    return selectedTags.every(tag => {
      return normalizeString(recipe.name).includes(tag) ||
        normalizeString(recipe.description).includes(tag) ||
        recipe.ingredients.some(ing => normalizeString(ing.ingredient).includes(tag)) ||
        normalizeString(recipe.appliance).includes(tag) ||
        recipe.ustensils.some(ut => normalizeString(ut).includes(tag));
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

// Fonction pour récupérer la liste de tous les appliances d'une liste de recettes
function getAllappliances(recipes) {
  const appliancesSet = new Set();
  recipes.forEach(recipe => {
    appliancesSet.add(normalizeString(recipe.appliance));
  });
  return Array.from(appliancesSet);
}

// Fonction pour récupérer la liste de tous les ustensils d'une liste de recettes
function getAllustensils(recipes) {
  const ustensilsSet = new Set();
  recipes.forEach(recipe => {
    recipe.ustensils.forEach(utensil => {
      ustensilsSet.add(normalizeString(utensil));
    });
  });
  return Array.from(ustensilsSet);
}

// Fonction pour initialiser les menus déroulants
async function initDropdowns() {
const recipes = await fetchRecipes();
// Création de Set uniques
const ingredients = new Set();
const appliances = new Set();
const ustensils = new Set();
// Ajout des tags correspondants dans chaque Set
recipes.forEach((recipe) => {
  recipe.ingredients.forEach((ingredient) => ingredients.add(ingredient.ingredient));
  appliances.add(recipe.appliance);
  recipe.ustensils.forEach((ustensil) => ustensils.add(ustensil));
});

const tagManager = new TagManager();
const dropdownManager = new DropdownManager();
dropdownManager.createSearchInputs();
dropdownManager.addDropdownEventListeners();

const ingredientsDropdown = new RecipeFactory();
ingredientsDropdown.getCategoryTags(Array.from(ingredients), 'tag-ingredients', tagManager)
const appliancesDropdown = new RecipeFactory();
appliancesDropdown.getCategoryTags(Array.from(appliances), 'tag-appliances', tagManager)
const ustensilsDropdown = new RecipeFactory();
ustensilsDropdown.getCategoryTags(Array.from(ustensils), 'tag-ustensils', tagManager)

function updateSelectableTags() {
  const filteredRecipes = tagManager.updateAvailableTags(recipes);
  const ingredients = getAllIngredients(filteredRecipes);
  const appliances = getAllappliances(filteredRecipes);
  const ustensils = getAllustensils(filteredRecipes);

  // Mettre à jour les tags sélectionnables pour les ingrédients, appliances et ustensils
  ingredientsDropdown.updateCategoryTags(ingredients, 'tag-ingredients', tagManager);
  appliancesDropdown.updateCategoryTags(appliances, 'tag-appliances', tagManager);
  ustensilsDropdown.updateCategoryTags(ustensils, 'tag-ustensils', tagManager);
}

// Associer la méthode updateSelectableTags à l'instance de TagManager
tagManager.updateSelectableTags = updateSelectableTags;

// Appeler updateSelectableTags une fois pour initialiser les menus déroulants
updateSelectableTags();
}

initDropdowns();