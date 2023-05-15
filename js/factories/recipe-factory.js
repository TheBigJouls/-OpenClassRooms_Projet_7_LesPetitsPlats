class RecipeFactory {
    constructor(filterManager, tagManager) {
      this.filterManager = filterManager;
      this.tagManager = tagManager;
      
    }

    createRecipeCardDOM(recipeData) {
        const recipeContainer = document.getElementById('recipes-container');

        const recipeCards = document.createElement('div');
        recipeCards.classList.add('recipe-cards');

        const recipeImg = document.createElement('div');
        recipeImg.classList.add('recipe-img');
        recipeCards.appendChild(recipeImg);

        const recipeTextContainer = document.createElement('div');
        recipeTextContainer.classList.add('recipe-text-container');
        recipeCards.appendChild(recipeTextContainer);

        const recipeContainerOne = document.createElement('div');
        recipeContainerOne.classList.add('recipe-container-one');
        recipeTextContainer.appendChild(recipeContainerOne);

        const recipeContainerTwo = document.createElement('div');
        recipeContainerTwo.classList.add('recipe-container-two');
        recipeTextContainer.appendChild(recipeContainerTwo);

        const nameText = document.createElement('h2');
        nameText.classList.add('recipe-name');
        nameText.textContent = recipeData.name;
        recipeContainerOne.appendChild(nameText);

        const timeContainer = document.createElement('p');
        timeContainer.classList.add('recipe-time');

        const iconText = document.createElement('i');
        iconText.classList.add('fa', 'fa-clock-o');
        iconText.setAttribute('aria-hidden', 'true');

        const timeText = document.createElement('span');
        timeText.classList.add('recipe-time-text');
        timeText.textContent = ` ${recipeData.time} min`;

        timeContainer.appendChild(iconText);
        timeContainer.appendChild(timeText);
        recipeContainerOne.appendChild(timeContainer);

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('recipe-ingredients');

        recipeData.ingredients.forEach(ingredient => {
        const ingredientElement = document.createElement('li');

        const ingredientName = document.createElement('span');
        ingredientName.classList.add('ingredient-title'); //
        ingredientName.textContent = ingredient.ingredient;

        const ingredientDetails = document.createTextNode(`: ${ingredient.quantity || ''} ${ingredient.unit || ''}`);

        ingredientElement.appendChild(ingredientName);
        ingredientElement.appendChild(ingredientDetails);
        ingredientsList.appendChild(ingredientElement);
            });
        
        recipeContainerTwo.appendChild(ingredientsList);

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('recipe-description');
        descriptionElement.textContent = recipeData.description;
        recipeContainerTwo.appendChild(descriptionElement);

        recipeContainer.appendChild(recipeCards);
    }

    getTypeTags(tags, tagType, tagManager) {
        const ulTagType = document.getElementById(tagType);
        ulTagType.innerHTML = ''; // Supprimer les anciens éléments
        tags.forEach(tag => {
            const li = document.createElement('li');
            li.textContent = tag;
            li.addEventListener('click', () => {
                if (tagManager.selectedTags.includes(tag)) {
                    tagManager.removeTag(tag);
                } else {
                    tagManager.addTag(tag);
                }
            });
            ulTagType.appendChild(li);
        });
    }

 
}