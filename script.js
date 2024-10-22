const apiUrl = './db.json';

// Función auxiliar para crear un elemento con texto
function createElementWithText(tag, text, className) {
    const element = document.createElement(tag);
    element.textContent = text;
    if (className) {
        element.classList.add(className); // Añade una clase si es proporcionada
    }
    return element;
}

// Función para crear e insertar las tarjetas de productos dinámicamente
function createProductCard(product) {
    const productList = document.getElementById('product-list');

    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // Añade la clase para el estilo

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title; // Texto alternativo de la imagen
    productCard.appendChild(productImage);

    const titleElement = createElementWithText('p', product.title, 'product-title');
    productCard.appendChild(titleElement);

    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container'); // Clase para la estilización

    const priceElement = createElementWithText('p', `$${product.price.toFixed(2)}`, 'product-price');
    priceContainer.appendChild(priceElement); // Añade el precio al contenedor

    const trashIcon = document.createElement('img');
    trashIcon.src = 'assets/trash.png'; // Ruta al ícono de la papelera
    trashIcon.alt = 'Eliminar producto'; // Texto alternativo para accesibilidad
    trashIcon.classList.add('trash-icon'); // Clase para la estilización (opcional)
    priceContainer.appendChild(trashIcon);

    trashIcon.addEventListener('click', () => {
        const confirmRemoval = confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmRemoval) {
            productList.removeChild(productCard); // Elimina la tarjeta si el usuario confirma
        }
    });

    productCard.appendChild(priceContainer);
    return productCard;
}

// Función para hacer la solicitud a la API y obtener los datos de los productos
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl); // Realiza la solicitud GET
        const products = await response.json(); // Convierte la respuesta a JSON

        const productList = document.getElementById('product-list');

        // Bucle para repetir las tarjetas 4 veces
        for (let i = 0; i < 4; i++) {
            products.products.forEach(product => {
                const productCard = createProductCard(product);
                productList.appendChild(productCard);
            });
        }
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

fetchProducts();
// Función para limpiar el formulario
function clearForm(form) {
    form.reset(); // Limpia todos los campos del formulario
}

// Función para mostrar el mensaje de éxito
function showSuccessMessage() {
    const messageContainer = document.getElementById('success-message');
    messageContainer.textContent = '¡Producto agregado con éxito!';
    messageContainer.style.display = 'block'; // Muestra el mensaje

    // Elimina el mensaje después de 3 segundos
    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}

// Función para añadir la tarjeta del producto (simula la creación de la tarjeta)
function addProductCard(product) {
    const productList = document.getElementById('product-list');

    // Crea la tarjeta del producto
    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // Añade la clase para el estilo

    // Imagen del producto
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productCard.appendChild(productImage);

    // Título del producto
    const titleElement = createElementWithText('p', product.title, 'product-title');
    productCard.appendChild(titleElement);

    // Precio del producto e ícono de la papelera
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('price-container'); // Clase para la estilización

    const priceElement = createElementWithText('p', `$${product.price.toFixed(2)}`, 'product-price');
    priceContainer.appendChild(priceElement); // Añade el precio al contenedor

    // Ícono de la papelera
    const trashIcon = document.createElement('img');
    trashIcon.src = 'assets/trash.png'; // Ruta al ícono de la papelera
    trashIcon.alt = 'Eliminar producto'; // Texto alternativo para accesibilidad
    trashIcon.classList.add('trash-icon'); // Clase para la estilización (opcional)

    priceContainer.appendChild(trashIcon); // Añade el ícono de la papelera al precio

    // Evento para eliminar la tarjeta
    trashIcon.addEventListener('click', () => {
        const confirmRemoval = confirm('¿Estás seguro de que deseas eliminar este producto?');
        if (confirmRemoval) {
            productList.removeChild(productCard); // Elimina la tarjeta si el usuario confirma
        }
    });

    // Añade el priceContainer a la tarjeta del producto
    productCard.appendChild(priceContainer);

    // Añade la tarjeta a la lista de productos
    const firstProductCard = productList.firstChild;
    if (firstProductCard) {
        productList.insertBefore(productCard, firstProductCard); // Añade antes de la primera tarjeta existente
    } else {
        productList.appendChild(productCard); // O añade al final si no hay tarjetas
    }
}

// Evento al hacer clic en el botón "Guardar"
document.getElementById('btn-save').addEventListener('click', (event) => {
    event.preventDefault();

    const form = document.querySelector('.add-product-form');

    // Captura los datos del formulario
    const product = {
        image: form['product-image'].value,
        title: form['product-name'].value,
        price: parseFloat(form['product-price'].value),
    };

    // Añade la tarjeta del producto a la lista
    addProductCard(product);

    // Muestra el mensaje de éxito
    showSuccessMessage();

    // Limpia el formulario
    clearForm(form);
});

// Evento al hacer clic en el botón "Limpiar"
document.getElementById('btn-clear').addEventListener('click', (event) => {
    event.preventDefault();

    // Limpia el formulario
    const form = document.querySelector('.add-product-form');
    clearForm(form);
});
