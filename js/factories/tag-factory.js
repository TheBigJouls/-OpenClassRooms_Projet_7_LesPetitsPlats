class TagFactory {
    constructor(tagId, items) {
        this.tagId = tagId;
        this.items = items;
    }

    createItems() {
        const ul = document.getElementById(this.tagId);

        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => {
                console.log('Item sélectionné:', item);
            });
            ul.appendChild(li);
        });
    }
}
