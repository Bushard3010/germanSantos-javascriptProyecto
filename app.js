let carrito =[];
const productos =[];

localStorage.getItem("carrito");
carrito = JSON.parse(localStorage.getItem("carrito"));

const contenedorProductos = document.getElementById("contenedorProductos");

const obtenerProductos = () =>{
    fetch('/json/productos.json')
    .then((response) =>response.json())
    .then((data) => {
        productos.push(...data);
        mostrarProductos(productos);
        

    });
}

const mostrarProductos = (productos) =>{
    productos.forEach( producto =>{
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6","col-sm-12");
        card.innerHTML = `<div class = "card">
                            <img src = "${producto.img}">
                            <div class = "card-body">
                                <h5>Nombre: ${producto.nombre}</h5>
                                <p>Tipo: ${producto.tipo}</p>
                                <p>Plataforma: ${producto.plataforma}</p>
                                <p>Precio: $${producto.precio}</p> 
                                <button class = "btn colorBoton" id = "boton${producto.id}"> Agregar al carrito </button>                                
                        </div>`
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            Toastify({
                text: "Agregado al carrito",                
                duration: 3000, 
                gravity: "bottom",
                position: "right"               
                }).showToast();
            agregarAlCarrito(producto.id);
            mostrarCarrito();
        })
    
    })
}

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
        localStorage.setItem("carrito", JSON.stringify(carrito));
    } else{
        const producto = productos.find(productos => productos.id === id);
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

obtenerProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})

const eliminarDelCarrito = (id) => {
    const producto = carrito.find ( producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1)
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3","col-md-6","col-sm-12");
        card.innerHTML = `<div class = "card">
                            <img src = "${producto.img}">
                            <div class = "card-body">
                                <h5>Nombre: ${producto.nombre}</h5>
                                <p>Tipo: ${producto.tipo}</p>
                                <p>Plataforma: ${producto.plataforma}</p>
                                <p>Precio: $${producto.precio}</p> 
                                <p>Cantidad: ${producto.cantidad}</p>
                                <button class = "btn colorBoton" id = "eliminar${producto.id}"> Eliminar producto </button>                                
                            </div>
                        </div>` 
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () =>{
            Swal.fire({
                title: '¿seguro?',
                text: "Estás por eliminar un producto del carrito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'si, estoy seguro!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'El producto fué descontado.',
                    'success'
                  )
                  eliminarDelCarrito(producto.id);
                }
              }) 
        })
    })
    calcularTotal();
}

const eliminarTodoElCarrito = () => {
    carrito =[];
    mostrarCarrito();
    localStorage.clear();
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    Swal.fire({
        title: 'Vaciar el carrito?',
        text: "Perderás los productos seleccionados!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Carrito vaciado!',
            'vuelve a seleccionar los productos que necesites.',
            'success'
          )
          eliminarTodoElCarrito();
        }
      }) 
})

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `${totalCompra}`;
}
calcularTotal();