document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addButton = document.getElementById('addButton');
    const itemList = document.getElementById('itemList');

    // Завантаження збережених елементів з localStorage
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Функція для відображення елементів списку
    function renderItems() {
        itemList.innerHTML = '';
        items.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            li.addEventListener('click', () => removeItem(index));
            itemList.appendChild(li);
        });
    }

    // Функція для додавання нового елемента
    function addItem() {
        const newItem = itemInput.value.trim();
        if (newItem !== '') {
            items.push(newItem);
            itemInput.value = '';
            saveItems();
            renderItems();
        }
    }

    // Функція для видалення елемента
    function removeItem(index) {
        items.splice(index, 1);
        saveItems();
        renderItems();
    }

    // Функція для збереження елементів у localStorage
    function saveItems() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    // Функція для сортування списку за алфавітом
    function sortItems() {
        items.sort((a, b) => a.localeCompare(b));
        saveItems();
        renderItems();
    }

    // Додавання елемента при натисканні кнопки
    addButton.addEventListener('click', addItem);

    // Сортування списку при подвійному кліку на список
    itemList.addEventListener('dblclick', sortItems);

    // Початкове відображення елементів
    renderItems();
});