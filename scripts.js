async function cargarProductos() {
  try {
    const respuesta = await fetch("Catalogo.json");
    const productos = await respuesta.json();

    const catalogo = document.getElementById("catalogo");
    catalogo.innerHTML = "";

    productos.forEach(p => {
  const card = document.createElement("div");
  card.classList.add("producto");

  card.innerHTML = `
    <a href="paginaProducto/producto.html?id=${p.id}">
      <img src="${p.imagenes[0]}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p>${p.descripcionCorta}</p>
      <span class="precio">$${p.precio}</span>
    </a>
  `;

  catalogo.appendChild(card);
});

  } catch (error) {
    console.error("Error cargando productos:", error);
  }
}






function buscarTexto() {
  let texto = document.getElementById("buscar").value.toLowerCase();
  let contenido = document.body.innerText.toLowerCase();

  if (texto && contenido.includes(texto)) {
    alert(`Se encontró "${texto}" en la página.`);
  } else {
    alert(`No se encontró "${texto}" en la página.`);
  }
}
const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;

function showSlide(i) {
  if (i >= images.length) index = 0;
  if (i < 0) index = images.length - 1;
  slide.style.transform = `translateX(${-index * 100}%)`;
}

nextBtn.addEventListener('click', () => {
  index++;
  showSlide(index);
});

prevBtn.addEventListener('click', () => {
  index--;
  showSlide(index);
});

// Carrusel automático cada 4 segundos
setInterval(() => {
  index++;
  showSlide(index);
}, 4000)
cargarProductos();