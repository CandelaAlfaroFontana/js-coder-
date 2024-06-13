document.addEventListener('DOMContentLoaded', function() {
    // Arrays que contienen las opciones para los elementos select
    const tiposRiesgo = ['vehiculo', 'motovehiculo', 'camion', 'flota-vehiculos', 'flota-motos', 'flota-camiones'];
    const zonasRiesgo = [
        'buenos-aires', 'catamarca', 'chaco', 'chubut', 'cordoba', 'corrientes', 'entre-rios', 'formosa',
        'jujuy', 'la-pampa', 'la-rioja', 'mendoza', 'misiones', 'neuquen', 'rio-negro', 'salta',
        'san-juan', 'san-luis', 'santa-cruz', 'santa-fe', 'santiago-del-estero', 'tierra-del-fuego', 'tucuman'
    ];
    const coberturas = ['todo-riesgo', 'terceros-completos', 'responsabilidad-civil'];

    // Función para generar opciones para un elemento select a partir de un array
    function generateOptions(arr) {
        return arr.map(item => `<option value="${item}">${item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ')}</option>`).join('');
    }

    // Llenar los elementos select con opciones generadas a partir de arrays
    document.getElementById('tipo-riesgo').innerHTML = generateOptions(tiposRiesgo);
    document.getElementById('zona-riesgo').innerHTML = generateOptions(zonasRiesgo);
    document.getElementById('cobertura').innerHTML = generateOptions(coberturas);

    document.getElementById('cotizar-btn').addEventListener('click', function() {
        const tipoRiesgo = document.getElementById('tipo-riesgo').value;
        const zonaRiesgo = document.getElementById('zona-riesgo').value;
        const antiguedad = document.getElementById('antiguedad').value;
        const cobertura = document.getElementById('cobertura').value;
        const sumaAsegurada = parseFloat(document.getElementById('suma-asegurada').value);
        const medioPago = document.getElementById('medio-pago').value;

        // Validación básica de los datos ingresados
        if (isNaN(sumaAsegurada) || sumaAsegurada < 3000000 || sumaAsegurada > 45000000) {
            alert('Por favor, ingrese una suma asegurada válida entre 3,000,000 y 45,000,000.');
            return;
        }

        // Costo base para el cálculo del seguro
        const baseCost = 25000;

        // Valores de multiplicadores almacenados en objetos para fácil búsqueda
        const tipoRiesgoMultipliers = {
            'vehiculo': 1.2,
            'motovehiculo': 1.1,
            'camion': 1.5,
            'flota-vehiculos': 2.0,
            'flota-motos': 1.8,
            'flota-camiones': 2.5
        };

        const coberturaMultipliers = {
            'todo-riesgo': 1.5,
            'terceros-completos': 1.2,
            'responsabilidad-civil': 1.0
        };

        const zonaMultipliers = {
            'buenos-aires': 1.2,
            'catamarca': 1.0,
            'chaco': 1.0,
            'chubut': 1.1,
            'cordoba': 1.2,
            'corrientes': 1.0,
            'entre-rios': 1.1,
            'formosa': 1.0,
            'jujuy': 1.1,
            'la-pampa': 1.1,
            'la-rioja': 1.1,
            'mendoza': 1.2,
            'misiones': 1.1,
            'neuquen': 1.1,
            'rio-negro': 1.1,
            'salta': 1.1,
            'san-juan': 1.1,
            'san-luis': 1.1,
            'santa-cruz': 1.2,
            'santa-fe': 1.2,
            'santiago-del-estero': 1.1,
            'tierra-del-fuego': 1.2,
            'tucuman': 1.1
        };

        // Búsqueda de multiplicadores según los valores seleccionados
        const costMultiplier = tipoRiesgoMultipliers[tipoRiesgo] || 1;
        const coberturaMultiplier = coberturaMultipliers[cobertura] || 1;
        const zonaMultiplier = zonaMultipliers[zonaRiesgo] || 1;

        // Calcular el costo del seguro
        const cotizacion = baseCost * costMultiplier * zonaMultiplier * coberturaMultiplier * (sumaAsegurada / 10000000);

        alert(`El costo estimado del seguro es: $${cotizacion.toFixed(2)}`);
    });
});