class TagManager {
  constructor() {
      this.selectedTags = new Set();
      this.tagContainer = document.getElementById('tag-result');
  }

  addTag(tag) {
      this.selectedTags.add(tag);

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

  removeTag(tag) {
     
      }
  }
