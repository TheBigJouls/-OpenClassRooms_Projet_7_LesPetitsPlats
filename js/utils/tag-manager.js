class TagManager {
  constructor() {
    this.selectedTags = [];
    this.tagContainer = document.getElementById('tag-result');
    //this.updaterecipes
  }

  addTag(tag) {
    // Vérifier si le tag n'est pas déjà dans selectedTags avant de l'ajouter
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);

      const tagElement = document.createElement('span');
      tagElement.className = 'selected-tag';
      tagElement.textContent = tag;

      const removeButton = document.createElement('img');
      removeButton.className = 'remove-tag';
      removeButton.src = 'images/X.png';
      removeButton.style.cursor = 'pointer';

      removeButton.addEventListener('click', () => {
        this.removeTag(tag);
      });

      tagElement.appendChild(removeButton);
      this.tagContainer.appendChild(tagElement);
    }

    this.updateSelectableTags();
  }

  removeTag(tag) {
    // Trouver l'index du tag dans selectedTags et le supprimer s'il est présent
    const tagIndex = this.selectedTags.indexOf(tag);
    if (tagIndex !== -1) {
      this.selectedTags.splice(tagIndex, 1);
    }

    const tagElements = this.tagContainer.getElementsByTagName('span');
    for (let i = 0; i < tagElements.length; i++) {
      const tagElement = tagElements[i];
      if (tagElement.textContent.includes(tag)) {
        this.tagContainer.removeChild(tagElement);
      }
    }

    this.updateSelectableTags();
  }


  updateSelectableTags(recipes) {
      const filteredRecipes = filterRecipesBySelectedTags(recipes, Array.from(this.selectedTags));
      const ingredients = getAllIngredients(filteredRecipes);
      const appliances = getAllappliances(filteredRecipes);
      const ustensils = getAllustensils(filteredRecipes);
  }

  
  updateAvailableTags(recipes) {
      // Filtrer les recettes en fonction des tags sélectionnés
      const filteredRecipes = recipes.filter(recipe => {
        return this.selectedTags.every(tag => {
          return normalizeString(recipe.name).includes(tag) ||
            recipe.ingredients.some(ing => normalizeString(ing.ingredient).includes(tag)) ||
            normalizeString(recipe.appliance).includes(tag) ||
            recipe.ustensils.some(ut => normalizeString(ut).includes(tag));
        });
      });
      return filteredRecipes;
  }
}