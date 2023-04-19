class TagFactory {
    constructor(tagId, items, input) {
    // Initialisation des propriétés de l'objet
    this.tagId = tagId;
    this.items = items;
    this.container = document.getElementById(tagId);
    this.input = input;

    // Création des éléments de la liste
    this.createItems();
  }
  
    createSearchInput() {
      // Création de l'élément input
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Rechercher...';
  
      // Ajout d'un écouteur d'événements pour mettre à jour les éléments lors de la saisie
      input.addEventListener('input', (event) => {
        const searchText = event.target.value;
        this.updateItems(searchText);
      });
  
      // Insertion de l'élément input avant le container
      this.container.parentElement.insertBefore(input, this.container);
    }
  
    createItems() {
        // Récupération de la liste non ordonnée (ul)
        const ul = document.getElementById(this.tagId);
  
        // Création des éléments de liste (li) pour chaque élément dans items
        this.items.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
  
        // Affichage de l'élément sélectionné dans la console lors d'un clic
        li.addEventListener('click', () => {
          console.log('Item sélectionné:', item);
        });
  
        // Ajout de l'élément li à la liste ul
        ul.appendChild(li);
      });

        // Ajout d'un écouteur d'événements pour mettre à jour les éléments lors de la saisie
        this.input.addEventListener('input', (event) => {
        const searchText = event.target.value;
        this.updateItems(searchText);
      });
  }
  
    updateItems(searchText) {
      // Récupération de la liste non ordonnée (ul)
      const ul = document.getElementById(this.tagId);
  
      // Parcours et mise à jour de l'affichage des éléments li en fonction du texte recherché
      Array.from(ul.children).forEach((li, index) => {
        if (this.items[index].toLowerCase().includes(searchText.toLowerCase())) {
          li.style.display = 'block';
        } else {
          li.style.display = 'none';
        }
      });
    }
  }
  