/*
        El carrito guarda el id del producto y la cantidad.

        Ejemplo:
        {
            1: 2,
            2: 1
        }
        */

let carrito = {};

/*
        Formato de precios argentinos.
        Ejemplo: $ 15.000
        */

const formatoMoneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/*
        ================================================
        AGREGAR UNA UNIDAD
        ================================================
        */

function agregarAlCarrito(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);

  if (!producto) {
    return;
  }

  if (carrito[idProducto]) {
    carrito[idProducto]++;
  } else {
    carrito[idProducto] = 1;
  }

  actualizarCarrito();

  mostrarNotificacion(`${producto.nombre} agregado`);
}

/*
        ================================================
        RESTAR UNA UNIDAD
        ================================================
        */

function restarDelCarrito(idProducto) {
  if (!carrito[idProducto]) {
    return;
  }

  carrito[idProducto]--;

  /*
            Si la cantidad llega a cero,
            elimina el producto del carrito.
            */

  if (carrito[idProducto] <= 0) {
    delete carrito[idProducto];
  }

  actualizarCarrito();
}

/*
        ================================================
        VACIAR TODO EL CARRITO
        ================================================
        */

function vaciarCarrito() {
  const carritoVacio = Object.keys(carrito).length === 0;

  if (carritoVacio) {
    mostrarNotificacion("El carrito ya está vacío");

    return;
  }

  const confirmar = confirm(
    "¿Querés eliminar todos los productos del carrito?",
  );

  if (!confirmar) {
    return;
  }

  carrito = {};

  actualizarCarrito();

  mostrarNotificacion("Carrito vaciado");
}

/*
        ================================================
        OBTENER LOS PRODUCTOS DEL CARRITO
        ================================================
        */

function obtenerProductosCarrito() {
  return Object.entries(carrito)
    .map(([idProducto, cantidad]) => {
      const producto = productos.find(
        (producto) => producto.id === Number(idProducto),
      );

      if (!producto) {
        return null;
      }

      return {
        ...producto,
        cantidad,
      };
    })
    .filter((producto) => producto !== null);
}

/*
        ================================================
        ENVIAR PEDIDO POR WHATSAPP
        ================================================
        */

function enviarWhatsApp() {
  const productosCarrito = obtenerProductosCarrito();

  if (productosCarrito.length === 0) {
    mostrarNotificacion("Primero agregá un producto");

    return;
  }

  let mensaje =
    `¡Hola! Quiero realizar un pedido en ${CONFIG.nombre} 🛍️!\n\n` +
    "*Detalle del pedido*\n\n";

  productosCarrito.forEach((producto) => {
    const subtotal = producto.precio * producto.cantidad;

    const textoUnidad = producto.cantidad === 1 ? "unidad" : "unidades";

    mensaje +=
      `• ${producto.nombre}\n` +
      `  ${producto.cantidad} ${textoUnidad} — ${formatoMoneda.format(subtotal)}\n\n`;
  });

  const total = productosCarrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0,
  );

  mensaje +=
    `*Total del pedido: ${formatoMoneda.format(total)}*\n\n` +
    "Nombre:\n" +
    "Localidad:\n" +
    "¿Retiro o envío?";

  const numeroWhatsApp = CONFIG.telefono;

  const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

  window.open(enlaceWhatsApp, "_blank");
}

/*
        Ejecutar al abrir la página.
        */

renderizarProductos();
actualizarCarrito();
