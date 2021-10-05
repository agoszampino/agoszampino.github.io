/* ----------------------------------------- */
/* ----------VARIABLES GLOBALES ----------- */
/* --------------------------------------- */

let listaProductos = [{
        nombre: 'Pan',
        cantidad: 2,
        precio: 12.34
    },
    {
        nombre: 'Leche',
        cantidad: 3,
        precio: 45.64
    },
    {
        nombre: 'Carne',
        cantidad: 4,
        precio: 200.23
    },
    {
        nombre: 'Fideos',
        cantidad: 5,
        precio: 20.34
    }
];

let crearLista = true;
let ul;


/* ----------------------------------------- */
/* ----------FUNCIONES GLOBALES ----------- */
/* --------------------------------------- */

function borrarProd(index) {
    listaProductos.splice(index, 1);    
    renderLista();
}

function cambiarCantidad(index, el) {
    let cantidad = Number(el.value);
    listaProductos[index].cantidad = cantidad;
}

function cambiarPrecio(index, el) {
    let precio = Number(el.value);
    listaProductos[index].precio = precio;
}

function renderLista() {

    if(crearLista) {
        ul = document.createElement('ul');
        ul.classList.add('demo-list-icon', 'mdl-list', 'w-100');
        //console.log(ul);
    }

    
    ul.innerHTML = '';

    
    listaProductos.forEach((prod, index) => {
        ul.innerHTML += `
            <li class="mdl-list__item">
                <!-- icono del producto -->                
                <span class="mdl-list__item-primary-content w-10">
                    <i class="material-icons mdl-list__item-icon">shopping_cart</i>
                </span>
                        
                <!-- nombre del producto -->
                <span class="mdl-list__item-primary-content w-30">
                    ${prod.nombre}
                </span>

                <!-- entrada de cantidad -->
                <span class="mdl-list__item-primary-contentw-20 ml-item w-20">
                    <div class="mdl-textfield mdl-js-textfield">                    
                        <input onchange="cambiarCantidad(${index}, this)" class="mdl-textfield__input" type="text" id="cantidad-${index}" value=${prod.cantidad}>
                        <label class="mdl-textfield__label" for="cantidad-${index}">Cantidad</label>
                    </div>
                </span>

                <!-- entrada de precio -->
                <span class="mdl-list__item-primary-contentw-20 ml-item w-20">
                    <div class="mdl-textfield mdl-js-textfield">                    
                        <input onchange="cambiarPrecio(${index}, this)"class="mdl-textfield__input" type="text" id="precio-${index}" value=${prod.precio}>
                        <label class="mdl-textfield__label" for="precio-${index}">Precio</label>
                    </div>
                </span>

                <!--  boton de borrar el producto -->
                <span class="mdl-list__item-primary-contentw-20 ml-item w-20">
                    <button onclick="borrarProd(${index})"
                    class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
                        <i class="material-icons">remove_shopping_cart</span></i>
                    </button>
                </span>
            </li>
        </ul>
        `

    });

    if (crearLista) {
        document.getElementById('lista').appendChild(ul)
        crearLista = false;
    } else {
        componentHandler.upgradeElements(ul);
    }
    
}


function configurarLista(){

    // Ingreso de producto
    document.getElementById('btn-entrada-producto').addEventListener('click', () => {
        let input = document.getElementById('ingreso-producto');
        let producto = input.value;

        if(producto){
            listaProductos.unshift( {nombre: producto, cantidad: 1, precio: 0} );
            renderLista();
            input.value = null;
        }
    })

    // Borrado de todos los productos 
    document.getElementById('btn-borrar-productos').addEventListener('click', () => {

        if(confirm('confrima borrar todo')) {
            listaProductos = [];
            renderLista();
        }

    })
}

function registrarServiceWorker() {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            this.navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('EL SW SE REGISTRO CORRECTAMENTE', reg)
            })
            .catch( err => {
                console.warn('EL SW NO SE REGISTRO CORRECTAMENTE', err)
            })
        })
    } else {
        console.error('EL SW NO ESTA DISPO EN NAVIGATOR')
    }
}


function start() {
    registrarServiceWorker();
    renderLista();
    configurarLista();
}

start()