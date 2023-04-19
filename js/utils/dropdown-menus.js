// Fonction pour basculer l'affichage des éléments d'un menu déroulant
function toggleDropdown(tagId) {
  const ul = document.getElementById(tagId);
  ul.classList.toggle('show_items');
}

// Fonction pour ajouter des gestionnaires d'événements aux boutons de menu déroulant
function addDropdownEventListeners() {
  const dropdownButtons = document.getElementsByClassName('dropdown-btn');
  
  for (let button of dropdownButtons) {
      button.addEventListener('click', (event) => {
          console.log("click ingredient")
          const tagId = `tag-${event.currentTarget.dataset.name}`;
          toggleDropdown(tagId);
      });
  }
}

// Ajout des gestionnaires d'événements aux boutons de menu déroulant
addDropdownEventListeners();