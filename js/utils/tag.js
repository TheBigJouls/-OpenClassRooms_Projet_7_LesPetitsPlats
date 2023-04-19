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

// Charger les recettes depuis le fichier JSON
loadRecipes().then(recipes => {
      // Créer une instance de DropdownFactory avec les données des recettes
    // Créer une instance de la classe RecipeFactory qui affiche les cartes de recettes avec la méthode createRecipeCardDOM
    
        const dropdownCategory = new DropdownFactory(recipes);
        dropdownCategory.createIngredientTags(ingredients);
    
    // Gérer les événements de clic sur les boutons
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', event => {
            const target = event.target;
            const category = target.dataset.category;
            const item = target.textContent;

            // Filtrer les recettes et les afficher
            const filteredRecipes = filterRecipesByItem(recipes, category, item);
            displayRecipes(filteredRecipes);

            // Mettre à jour les boutons disponibles
            updateAvailableButtons(filteredRecipes);

            // Ajouter l'élément sélectionné au-dessus du menu dropdown
            addItemToSelectedList(category, item);

            // Supprimer le bouton sélectionné
            target.remove();
        });
    });
});


// Fonction pour créer des boutons pour chaque élément d'une catégorie
function createButtons(category, items) {
    const container = document.getElementById(`tag-${category}`);
    items.forEach(item => {
        const button = document.createElement('button');
        button.classList.add('dropdown-btn');
        button.dataset.category = category;
        button.textContent = item;
        container.appendChild(button);
    });
}

// Fonction pour filtrer les recettes en fonction de l'élément sélectionné
function filterRecipesByItem(recipes, category, item) {
    const normalizedItem = normalizeString(item);
    return recipes.filter(recipe => {
        switch (category) {
            case 'ingredients':
                return recipe.ingredients.some(ing => normalizeString(ing.ingredient) === normalizedItem);
            case 'appareils':
                return normalizeString(recipe.appliance) === normalizedItem;
            case 'ustensiles':
                return recipe.ustensils.some(ut => normalizeString(ut) === normalizedItem);
            default:
                return false;
        }
    });
}

// Fonction pour afficher les recettes filtrées
function displayRecipes(recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = ''; // Supprimer les anciennes cartes de recettes

    // Créer une instance de la classe RecipeFactory qui affiche les nouvelles cartes de recettes avec la méthode createRecipeCardDOM
    recipes.forEach(recipeData => {
        const recipeCards = new RecipeFactory(recipeData);
        recipeCards.createRecipeCardDOM();
    });
}

// Fonction pour mettre à jour les boutons disponibles en fonction des recettes filtrées
function updateAvailableButtons(recipes) {
    const uniqueIngredients = getAllIngredients(recipes);
    const uniqueAppliances = [...new Set(recipes.map(recipe => recipe.appliance))];
    const uniqueUstensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils))];

    updateButtons('ingredients', uniqueIngredients);
    updateButtons('appareils', uniqueAppliances);
    updateButtons('ustensiles', uniqueUstensils);

}

// Fonction pour mettre à jour les boutons d'une catégorie spécifique
function updateButtons(category, items) {
    const container = document.getElementById(`tag-${category}`);
    container.innerHTML = ''; // Supprimer les anciens boutons
    createButtons(category, items); // Créer de nouveaux boutons
}

// Fonction pour ajouter l'élément sélectionné au-dessus du menu dropdown
function addItemToSelectedList(category, item) {
    const container = document.getElementById(`selected-${category}`);
    const button = document.createElement('button');
    button.classList.add('selected-btn');
    button.dataset.category = category;
    button.textContent = item;
    container.appendChild(button);

    // Ajouter un gestionnaire d'événements pour supprimer le bouton sélectionné lorsqu'il est cliqué
    button.addEventListener('click', event => {
    const target = event.target;
    const category = target.dataset.category;
    const item = target.textContent;

    // Supprimer le bouton sélectionné
    target.remove();

    // Ajouter le bouton à la liste des boutons disponibles
    const availableContainer = document.getElementById(`tag-${category}`);
    const availableButton = document.createElement('button');
    availableButton.classList.add('dropdown-btn');
    availableButton.dataset.category = category;
    availableButton.textContent = item;
    availableContainer.appendChild(availableButton);

    // Réinitialiser la liste des recettes en fonction des boutons sélectionnés
    const selectedButtons = document.querySelectorAll('.selected-btn');
    const selectedItems = Array.from(selectedButtons).map(btn => ({ category: btn.dataset.category, item: btn.textContent }));
    const filteredRecipes = filterRecipesBySelectedItems(recipes, selectedItems);
    displayRecipes(filteredRecipes);
    updateAvailableButtons(filteredRecipes);
});
}

// Fonction pour filtrer les recettes en fonction des éléments sélectionnés
function filterRecipesBySelectedItems(recipes, selectedItems) {
let filteredRecipes = recipes.slice();
selectedItems.forEach(({ category, item }) => {
    filteredRecipes = filterRecipesByItem(filteredRecipes, category, item);
});

return filteredRecipes;
}