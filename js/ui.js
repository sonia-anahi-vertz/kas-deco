/*
        ================================================
        MOSTRAR PRODUCTOS
        ================================================
        */

function renderizarProductos() {
  const contenedor = document.getElementById("productos");

  document.getElementById("cantidadProductos").textContent = productos.length;

  contenedor.innerHTML = productos
    .map(
      (producto) => `
                <article
                    class="overflow-hidden bg-white border producto-card border-slate-200 rounded-2xl shadow-sm"
                >

                    <div class="flex gap-4 p-4">

                        <div class="relative flex-shrink-0">

                            <img
                                src="${producto.img}"
                                alt="${producto.nombre}"
                                class="object-cover w-28 h-28 rounded-xl bg-slate-200"
                                onerror="this.src='https://placehold.co/200x200?text=Sin+imagen'"
                            >

                            <span
                                class="absolute px-2 py-1 text-xs font-semibold text-white bg-[#B98F73]  rounded-full -top-2 -left-2"
                                
                            >
                                Disponible
                            </span>

                        </div>

                        <div class="flex flex-col flex-grow">

                            <span
                              class="mb-1 text-xs font-semibold tracking-wide uppercase text-[#A47559]"
                            >
                                ${producto.categoria}
                            </span>

                            <h3 class="mb-1 text-lg font-bold">
                                ${producto.nombre}
                            </h3>

                            <p class="mb-4 text-xl font-bold text-slate-900">
                                ${formatoMoneda.format(producto.precio)}
                            </p>

                            <button
                                onclick="agregarAlCarrito(${producto.id})"
                                class="w-full px-4 py-2 mt-auto font-semibold text-white transition bg-[#B98F73] rounded-xl hover:bg-[#A97E64] active:scale-95"
                            >
                                + Agregar
                            </button>

                        </div>

                    </div>

                </article>
            `,
    )
    .join("");
}

/*
        ================================================
        ACTUALIZAR EL CARRITO EN PANTALLA
        ================================================
        */

function actualizarCarrito() {
  const detalleCarrito = document.getElementById("detalleCarrito");

  const botonVaciar = document.getElementById("botonVaciar");

  const productosCarrito = obtenerProductosCarrito();

  const cantidadTotal = productosCarrito.reduce(
    (total, producto) => total + producto.cantidad,
    0,
  );

  const precioTotal = productosCarrito.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  document.getElementById("cantidadCarrito").textContent = cantidadTotal;

  document.getElementById("totalCarrito").textContent =
    formatoMoneda.format(precioTotal);

  botonVaciar.disabled = productosCarrito.length === 0;

  /*
            Cuando el carrito está vacío.
            */

  if (productosCarrito.length === 0) {
    detalleCarrito.innerHTML = `
                    <p class="py-3 text-sm text-center text-slate-400">
                        Tu carrito está vacío. 
                    </p>
                `;

    return;
  }

  /*
            Cuando el carrito tiene productos.
            */

  detalleCarrito.innerHTML = productosCarrito
    .map(
      (producto) => `

                    <div
                        class="flex items-center justify-between gap-3 p-2 rounded-xl bg-slate-100"
                    >

                        <div class="flex items-center min-w-0 gap-3">

                            <img
                                src="${producto.img}"
                                alt="${producto.nombre}"
                                class="object-cover w-12 h-12 rounded-lg bg-slate-200"
                                onerror="this.src='https://placehold.co/100x100?text=Sin+imagen'"
                            >

                            <div class="min-w-0">

                                <p class="text-sm font-semibold truncate">
                                    ${producto.nombre}
                                </p>

                                <p class="text-xs text-slate-500">
                                    ${formatoMoneda.format(producto.precio)}
                                    cada uno
                                </p>

                            </div>

                        </div>

                        <div class="flex items-center gap-2">

                            <!-- Restar una unidad -->
                            <button
                                onclick="restarDelCarrito(${producto.id})"
                                class="flex items-center justify-center w-8 h-8 font-bold text-red-600 bg-white border border-red-200 rounded-full hover:bg-red-50 active:scale-95"
                                aria-label="Restar una unidad"
                            >
                                −
                            </button>

                            <!-- Cantidad -->
                            <span class="w-6 font-bold text-center">
                                ${producto.cantidad}
                            </span>

                            <!-- Sumar una unidad -->
                            <button
                                onclick="agregarAlCarrito(${producto.id})"
                                class="flex items-center justify-center w-8 h-8 font-bold text-white rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95"
                                aria-label="Agregar una unidad"
                            >
                                +
                            </button>

                        </div>

                    </div>

                `,
    )
    .join("");
}

/*
        ================================================
        MOSTRAR NOTIFICACIÓN
        ================================================
        */

function mostrarNotificacion(mensaje) {
  const notificacion = document.getElementById("notificacion");

  notificacion.textContent = mensaje;

  notificacion.classList.remove("opacity-0", "translate-y-3");

  notificacion.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    notificacion.classList.remove("opacity-100", "translate-y-0");

    notificacion.classList.add("opacity-0", "translate-y-3");
  }, 1600);
}
