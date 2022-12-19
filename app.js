class Producto {
    constructor(id, tipo, nombre, precio, plataforma, img,) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.plataforma = plataforma;
        this.img = img;
        this.cantidad = 1;
    }
}


const marioBros = new Producto(1, "fisico", "marioBros", 15000, "switch", "img/mario-odyssey.JPG");
const halo = new Producto(2, "fisico", "halo", 14000, "xbox",'img/halo.jpg' );
const fifa2023 = new Producto(3, "digital", "fifa 2023", 10300, "steam",'img/fifa-2023.jpg');
const pokemonScarlet = new Producto(4, "fisico", "Pokemon Scarlet", 15000, "switch",'img/Pokemon-Escarlata.png');
const callOfDutymw2 = new Producto(5, "digital", "Call of Duty MW 2", 10500, "PS5",'img/cod-mw2.jpg');
const stray = new Producto(6, "digital", "Stary", 10000, "steam",'img/stray.jpg');
const gowRagnarok = new Producto(7, "fisico", "GoW Ragnarok", 15000, "PS5",'img/Gow-Ragnarok.jpg');
const eldenRing = new Producto(8, "fisico", "Elden Ring", 15000, "PS5",'img/elden-ring.jpg');

const productos = [marioBros, halo, fifa2023, pokemonScarlet, callOfDutymw2, stray, gowRagnarok, eldenRing];

let carrito =[];

if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}
const contenedorProductos = document.getElementById("contenedorProductos");

const mostrarProductos = () =>{
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
                            </div>
                        </div>`
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id)
        })
    
    })
}

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito){
        productoEnCarrito.cantidad++;
    } else{
        const producto = productos.find(productos => productos.id === id);
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
}

mostrarProductos ();


const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})

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
            eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find ( producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1)
    mostrarCarrito();

    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    })
    total.innerHTML = `$${totalCompra}`;
}