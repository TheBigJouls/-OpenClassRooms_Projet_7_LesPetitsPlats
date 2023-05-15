class SearchInputManager {
  constructor(filterManager) {
    this.filterManager = filterManager;
    this.searchInput = document.getElementById('search-input');
    this.container = document.getElementById('recipes-container');

    this.searchInput.addEventListener('input', () => {
      this.filterManager.updateSearchResults();
    });
  }
}
