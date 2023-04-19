// Fonction pour basculer l'affichage des éléments d'un menu déroulant
function toggleDropdown(tagId) {
  const ul = document.getElementById(tagId);
  ul.classList.toggle('show_items');
}

function addDropdownEventListeners() {
  const dropdownButtons = document.getElementsByClassName('dropdown-btn');

  for (let button of dropdownButtons) {
    // Création de l'élément input
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Rechercher...';
    input.className = 'search_input';

    // Insertion de l'élément input dans le bouton
    button.appendChild(input);

    const tagId = `tag-${button.dataset.name}`;

    button.addEventListener('click', (event) => {
      console.log("click ingredient");

      // Bascule l'affichage de l'élément input
      input.classList.toggle('show_input');

      // Vérifie si l'élément input est affiché
      if (input.classList.contains('show_input')) {
        const tagFactory = new TagFactory(tagId, items, input); // Créez une instance de TagFactory ici
      }

      toggleDropdown(tagId);
    });
  }
}

// Ajout des gestionnaires d'événements aux boutons de menu déroulant
addDropdownEventListeners();
