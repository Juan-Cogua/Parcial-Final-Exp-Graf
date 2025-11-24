let ventas = [];
const IVA_RATE = 0.19;

var formulario = document.getElementById('formVenta');
var tablaBody = document.querySelector('#tablaVentas tbody');
var inputCantidad = document.getElementById('cant');
var inputValorUnidad = document.getElementById('valorUnidad');
var inputValorTotalLinea = document.getElementById('valorTotalLinea');
var subtotalDisplay = document.getElementById('subtotalVentas');
var ivaDisplay = document.getElementById('ivaVentas');
var totalDisplay = document.getElementById('totalVentas');


function calcularTotalLinea() {
    const cantidad = parseFloat(inputCantidad.value) || 0;
    const valorUnidad = parseFloat(inputValorUnidad.value) || 0;
    const cantValid = Math.max(0, cantidad); 
    const valorTotal = cantValid * valorUnidad;
    inputValorTotalLinea.value = valorTotal.toFixed(0);
}
inputCantidad.addEventListener('input', calcularTotalLinea);
inputValorUnidad.addEventListener('input', calcularTotalLinea);
formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 
    agregarVenta();
});

function agregarVenta() {
    var cantidad = inputCantidad.value;
    var detalle = document.getElementById('detalle').value;
    var valorUnidad = inputValorUnidad.value;
    let cant = parseInt(cantidad);
    let vUnitario = parseFloat(valorUnidad);
    if (cant <= 0 || isNaN(cant) || detalle.trim() === '' || vUnitario <= 0 || isNaN(vUnitario)) {
        alert('Por favor ingrese valores validos (cantidad y valor unidad deben ser numeros mayores a 0).');
        return;
    }
    let valorTotal = cant * vUnitario;
    let nuevaVenta = {
        id: Date.now(), 
        cantidad: cant,
        detalle: detalle,
        valorUnidad: vUnitario,
        valorTotal: valorTotal
    };
    ventas.push(nuevaVenta);
    mostrarVentasEnTabla();
    calcularTotales();
    formulario.reset();
    inputValorTotalLinea.value = "0"; 
}

function eliminarVenta(id) {
    ventas = ventas.filter(venta => venta.id !== id);
    mostrarVentasEnTabla();
    calcularTotales();
}

function mostrarVentasEnTabla() {
    tablaBody.innerHTML = ''; 
    ventas.forEach(venta => {
        let filaTabla = tablaBody.insertRow();
        const valorUnidadSimple = venta.valorUnidad.toFixed(0);
        const valorTotalSimple = venta.valorTotal.toFixed(0);
        const valores = [
            venta.cantidad, 
            venta.detalle, 
            '$' + valorUnidadSimple, 
            '$' + valorTotalSimple
        ];

        valores.forEach(valor => {
            let celdaDatos = document.createElement('td');
            celdaDatos.textContent = valor;
            filaTabla.appendChild(celdaDatos);
        });
        let celdaBoton = document.createElement('td');
        let botonBorrar = document.createElement('button');
        botonBorrar.textContent = 'Eliminar';
        botonBorrar.classList.add('btn-eliminar');
        botonBorrar.onclick = function() {
            eliminarVenta(venta.id);
        };
        celdaBoton.appendChild(botonBorrar);
        filaTabla.appendChild(celdaBoton);
    });
}

function calcularTotales() {
    const subtotal = ventas.reduce((acc, venta) => acc + venta.valorTotal, 0);
    const iva = subtotal * IVA_RATE;
    const totalPagar = subtotal + iva;
    subtotalDisplay.textContent = '$' + subtotal.toFixed(0);
    ivaDisplay.textContent = '$' + iva.toFixed(0);
    totalDisplay.textContent = '$' + totalPagar.toFixed(0);
}
calcularTotales();