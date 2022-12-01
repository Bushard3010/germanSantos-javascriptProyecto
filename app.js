class Producto {
    constructor(id, tipo, nombre, precio, plataforma, img) {
        this.id = id;
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.plataforma = plataforma;
        this.img = img;
    }
}


const marioBros = new Producto(1, "fisico", "marioBros", 15000, "switch", 'https://worldfantasy.com.ar/wp-content/uploads/2020/09/super-mario-odyssey-nintendo-switch.jpg');
const halo = new Producto(2, "fisico", "halo", 14000, "xbox",'https://media.vandal.net/m/14507/201172115948_1.jpg' );
const fifa2023 = new Producto(3, "digital", "fifa 2023", 10300, "steam",'https://http2.mlstatic.com/D_NQ_NP_724182-MLA52322845126_112022-O.webp');
const pokemonScarlet = new Producto(4, "fisico", "Pokemon Scarlet", 15000, "switch",'https://www.tradeinn.com/f/13921/139218923/nintendo-juego-switch-pokemon-escarlata.jpg');
const callOfDutymw2 = new Producto(5, "digital", "Call of Duty MW 2", 10500, "PS5",'https://http2.mlstatic.com/D_NQ_NP_764881-MLA52528279563_112022-O.webp');

const productos = [marioBros, halo, fifa2023, pokemonScarlet, callOfDutymw2];

// 

let seguir =true;

while(seguir === true){
    let opcion = prompt('¿De que plataforma estas buscando juegos? 1-Steam 2-Switch 3-PS5 4-Xbox 5-Ver Todo 0-salir');

    switch (opcion){
        case '1':
            const mostrarSteam = productos.filter((arr) => arr.plataforma.includes('steam'));
            console.log(mostrarSteam);
        break;
        case '2':
            const mostrarSwitch = productos.filter((arr) => arr.plataforma.includes('switch'));
            console.log(mostrarSwitch);
        break;
        case '3':
            const mostrarPs5 = productos.filter((arr) => arr.plataforma.includes('PS5'));
            console.log(mostrarPs5);
        break;
        case '4':
            const mostrarXbox = productos.filter((arr) => arr.plataforma.includes('xbox'));
            console.log(mostrarXbox);
        break;
        case '5':
            console.log(productos);
        break;
        case '0':
            seguir = false;
        break;
        default:
            alert("Por favor, ingrese una opción válida");
    }
}
alert('GRACIAS POR VISITARNOS');




