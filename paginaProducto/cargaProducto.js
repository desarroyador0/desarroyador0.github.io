// Obtener el ID del producto de la URL
const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

// Cargar el catálogo desde el JSON
fetch("../Catalogo.json")
  .then(res => res.json())
  .then(productos => {
    const producto = productos.find(p => p.id === id);
    mostrarProducto(producto, productos);
  })
  .catch(err => {
    console.error("Error cargando catálogo:", err);
    document.querySelector(".producto-detalle").innerHTML = `
      <p style="font-size:1.2rem; color:#333;">Error al cargar el catálogo</p>
      <a href="../index.html" style="color:#f5a623; text-decoration:underline;">Volver a la tienda</a>
    `;
  });

function mostrarProducto(producto, productos) {
  const productoDetalle = document.querySelector(".producto-detalle");

  if (!producto) {
    productoDetalle.innerHTML = `
      <p style="font-size:1.2rem; color:#333;">Producto no encontrado</p>
      <a href="../index.html" style="color:#f5a623; text-decoration:underline;">Volver a la tienda</a>
    `;
    return;
  }

  // ======== Información principal ========
  document.getElementById("nombreProducto").textContent = producto.nombre;
  document.getElementById("precioProducto").textContent = producto.precio;
  document.getElementById("descripcionProducto").innerHTML = producto.descripcionLarga;

  // ======== Detalles del producto ========
  document.getElementById("materialProducto").textContent = producto.material || "-";
  document.getElementById("colorProducto").textContent = producto.color || "-";
  document.getElementById("tamanoProducto").textContent = producto.tamano || "-";
  document.getElementById("mantenimientoProducto").textContent = producto.mantenimiento || "-";

  // ======== Stock ========
  const stockInfo = document.createElement("p");
  stockInfo.className = "stock-info";
  stockInfo.textContent = producto.stock > 0 ? `Disponible: ${producto.stock}` : "Producto agotado";
  if(producto.stock === 0) stockInfo.classList.add("agotado");
  document.querySelector(".info-producto").appendChild(stockInfo);

  // Botón de comprar
  const btnComprar = document.querySelector(".btn-comprar");
  if (producto.stock === 0) {
    btnComprar.disabled = true;
    btnComprar.textContent = "Agotado";
    btnComprar.classList.add("agotado");
  }

  // ======== Carrusel ========
  let indexImagen = 0;
  const imagenCarrusel = document.getElementById("imagenCarrusel");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  function mostrarImagen(i) {
    if (i < 0) indexImagen = producto.imagenes.length - 1;
    else if (i >= producto.imagenes.length) indexImagen = 0;
    else indexImagen = i;

    imagenCarrusel.style.opacity = 0;
    setTimeout(() => {
      imagenCarrusel.src = producto.imagenes[indexImagen];
      imagenCarrusel.style.opacity = 1;
    }, 200);

    // Resaltar miniatura activa
    document.querySelectorAll(".miniatura").forEach((m, idx) => {
      m.classList.toggle("active", idx === indexImagen);
    });
  }

  mostrarImagen(0);

  prevBtn.addEventListener("click", () => {
    indexImagen--;
    mostrarImagen(indexImagen);
  });

  nextBtn.addEventListener("click", () => {
    indexImagen++;
    mostrarImagen(indexImagen);
  });

  setInterval(() => {
    indexImagen++;
    mostrarImagen(indexImagen);
  }, 6000);

  // Miniaturas
  const miniaturasContainer = document.createElement("div");
  miniaturasContainer.className = "miniaturas";
  producto.imagenes.forEach((imgSrc, idx) => {
    const miniDiv = document.createElement("div");
    miniDiv.className = "miniatura";

    const miniImg = document.createElement("img");
    miniImg.src = imgSrc;

    miniDiv.appendChild(miniImg);
    miniDiv.addEventListener("click", () => mostrarImagen(idx));

    miniaturasContainer.appendChild(miniDiv);
  });
  document.querySelector(".carrusel").appendChild(miniaturasContainer);

  // ======== Productos relacionados ========
  const relacionadosContainer = document.querySelector(".grid-productos");
  relacionadosContainer.innerHTML = "";
  productos.filter(p => p.id !== producto.id).forEach(p => {
    const prodDiv = document.createElement("div");
    prodDiv.className = "producto-rel";

    const img = document.createElement("img");
    img.src = p.imagenes[0];
    img.alt = p.nombre;

    const nombre = document.createElement("h4");
    nombre.textContent = p.nombre;

    const precio = document.createElement("p");
    precio.textContent = p.precio;

    prodDiv.append(img, nombre, precio);
    prodDiv.addEventListener("click", () => {
      window.location.href = `producto.html?id=${p.id}`;
    });

    relacionadosContainer.appendChild(prodDiv);
  });

  // ======== FAQ interactivo ========
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      item.classList.toggle("active");
      faqItems.forEach(otherItem => {
        if (otherItem !== item) otherItem.classList.remove("active");
      });
    });
  });
}
