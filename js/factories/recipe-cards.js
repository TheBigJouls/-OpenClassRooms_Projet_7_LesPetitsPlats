class RecipeFactory {
    constructor(recipeData) {
        this.recipeData = recipeData;
        this.id = recipeData.id;
        this.name = recipeData.name;
        this.servings = recipeData.servings;
        this.ingredients = recipeData.ingredients;
        this.ingredient = recipeData.ingredient;
        this.quantity = recipeData.quantity;
        this.unit = recipeData.unit;
        this.time = recipeData.time;
        this.description = recipeData.description;
        this.appliance = recipeData.appliance;
        this.ustensils = recipeData.ustensils;
    }

    createRecipeCardDOM() {
        const recipeContainer = document.getElementById('recipes-container');

        const recipeCards = document.createElement('div');
        recipeCards.classList.add('recipe-cards');

        const recipeImg = document.createElement('div');
        recipeImg.classList.add('recipe-img');
        recipeCards.appendChild(recipeImg);

        const recipeText = document.createElement('div');
        recipeText.classList.add('recipe-text');
        recipeCards.appendChild(recipeText);

        const nameText = document.createElement('h2');
        nameText.classList.add('recipe-name');
        nameText.textContent = this.name;
        recipeText.appendChild(nameText);

        const timeContainer = document.createElement('p');
        timeContainer.classList.add('recipe-time');

        const iconText = document.createElement('i');
        iconText.classList.add('fa', 'fa-clock-o');
        iconText.setAttribute('aria-hidden', 'true');

        const timeText = document.createElement('span');
        timeText.classList.add('recipe-time-text');
        timeText.textContent = ` ${this.time} minutes`;

        timeContainer.appendChild(iconText);
        timeContainer.appendChild(timeText);
        recipeText.appendChild(timeContainer);

        const ingredientsList = document.createElement('ul');
        ingredientsList.classList.add('recipe-ingredients');
        this.ingredients.forEach(ingredient => {
            const ingredientElement = document.createElement('li');
            ingredientElement.textContent = `${ingredient.ingredient}: ${ingredient.quantity || ''} ${ingredient.unit || ''}`;
            ingredientsList.appendChild(ingredientElement);
        });
        recipeText.appendChild(ingredientsList);

        const descriptionElement = document.createElement('p');
        descriptionElement.classList.add('recipe-description');
        descriptionElement.textContent = this.description;
        recipeText.appendChild(descriptionElement);

        const applianceElement = document.createElement('p');
        applianceElement.classList.add('recipe-appliance');
        applianceElement.textContent = `Appareil: ${this.appliance}`;
        recipeText.appendChild(applianceElement);

        const ustensilsList = document.createElement('ul');
        ustensilsList.classList.add('recipe-ustensils');
        this.ustensils.forEach(ustensil => {
            const ustensilElement = document.createElement('li');
            ustensilElement.textContent = ustensil;
            ustensilsList.appendChild(ustensilElement);
        });
        recipeText.appendChild(ustensilsList);

        recipeContainer.appendChild(recipeCards);
        console.log("coucouc")
    }
}
