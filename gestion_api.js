//Validar producto
function validarProducto(producto) {
    if (!producto.nombre || typeof producto.precio !== "number") {
        console.error("Datos del producto no validos.");
        return false;
    }
    return true;
}

//Lectura de datos (GET),muestra los productos disponibles
function obtenerProductos() {
    fetch(`http://localhost:3000/Productos`)
        .then(response => response.json())
        //Muestra datos en consola
        .then(data => console.log("Productos disponibles: ", data))
        //Manejo de errores
        .catch(error => console.error("Error al obtener productos: ", error));
}

//Creación de nuevos datos (POST), añade productos
async function crearProducto(producto) {
    if (!validarProducto(producto))
        return;

    await fetch(`http://localhost:3000/Productos`,
    {
        method: `POST`, 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(producto)
    })
    .then(res => res.json())
    //Muestra datos en consola
    .then(data => {console.log("Producto agregado: ", data)})
    //Manejo de errores
    .catch(error => console.error("Error al agregar producto: ", error));
}

//Actialización de datos (PUT), actualiza 1 producto disponible
function actualizarProducto(id, productoActualizado){
    if (!validarProducto(productoActualizado)) return

    fetch(`http://localhost:3000/Productos/${id}`, {
        method : 'PUT',
        headers : {'Content-Type' : 'application/json'}, 
        body : JSON.stringify(productoActualizado)
    })
    .then(res => res.json())
    //Muestra datos en consola
    .then(data => console.log("Producto actualizado: ", data))
    //Manejo de errores
    .catch(error => console.error("Error al actualizar producto: ", error));
}

//Eliminación de datos (DELETE),Eliminar 1 producto disponible
function eliminarProducto(id) {
    fetch(`http://localhost:3000/Productos/${id}`, { method: 'DELETE' }) 
        .then(res => res.json())
        //Muestra datos en consola
        .then(data=> console.log("Producto eliminado: ", data))
        //Manejo de errores
        .catch(error => console.error("Error al eliminar producto: ", error));
}

document.addEventListener("DOMContentLoaded", () => {

    /* /// POST  /// */
    const addForm = document.getElementById('formulario_añadir');

    addForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const addInput = document.getElementById('añadir_input');
        const addPrice = document.getElementById('añadir_precio');

        const obj = {
            nombre: addInput.value,
            precio: addPrice.value * 1
        }

        crearProducto(obj);
    })

    /* /// DELETE  /// */
    const deleteForm = document.getElementById('formulario_borrar');

    deleteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const deleteId = document.getElementById('eliminar_producto');

        eliminarProducto(deleteId.value);
    })

    /* /// PUT /// */
    const updateForm = document.getElementById('formulario_actualizar');

    updateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const addUpdate = document.getElementById('actualizar_producto');
        const addName = document.getElementById('actualizar_nombre');
        const addPrice = document.getElementById('actualizar_precio');

        const obj = {
            nombre : addName.value,
            precio : addPrice.value * 1
        }

        actualizarProducto(addUpdate.value,obj);
    })
})


