document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde un JSON local
    fetch('./data/datos.json')
        .then(response => response.json())
        .then(data => {
            const { tiposSeguro, zonasSeguro, tiposCobertura } = data;
            document.getElementById('tipo-seguro').innerHTML = generarOpciones(tiposSeguro);
            document.getElementById('zona-seguro').innerHTML = generarOpciones(zonasSeguro);
            document.getElementById('tipo-cobertura').innerHTML = generarOpciones(tiposCobertura);
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
            Swal.fire('Error', 'No se pudieron cargar los datos', 'error');
        });

    function generarOpciones(matriz) {
        return matriz.map(item => <option value="${item}">${item.charAt(0).toUpperCase() + item.slice(1).replace(/-/g, ' ')}</option>).join('');
    }

    document.getElementById('boton-cotizar').addEventListener('click', function() {
        const tipoSeguro = document.getElementById('tipo-seguro').value;
        const zonaSeguro = document.getElementById('zona-seguro').value;
        const antiguedad = document.getElementById('edad-seguro').value;
        const tipoCobertura = document.getElementById('tipo-cobertura').value;
        const sumaAsegurada = parseFloat(document.getElementById('monto-asegurado').value);
        const medioPago = document.getElementById('forma-pago').value;

        if (isNaN(sumaAsegurada) || sumaAsegurada < 3000000 || sumaAsegurada > 45000000) {
            Swal.fire('Error', 'Por favor, ingrese una suma asegurada válida entre 3.000.000 y 45.000.000.', 'error');
            return;
        }

        const costoBase = 25000;
        const multiplicadoresTipoSeguro = {
            'vehiculo': 1.2,
            'motovehiculo': 1.1,
            'camion': 1.5,
            'flota-vehiculos': 2.0,
            'flota-motos': 1.8,
            'flota-camiones': 2.5
        };
        const multiplicadoresCobertura = {
            'todo-riesgo': 1.5,
            'terceros-completos': 1.2,
            'responsabilidad-civil': 1.0
        };
        const multiplicadoresZona = {
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
            'tucumán': 1.1
        };

        const multiplicadorTipoSeguro = multiplicadoresTipoSeguro[tipoSeguro] || 1;
        const multiplicadorCobertura = multiplicadoresCobertura[tipoCobertura] || 1;
        const multiplicadorZona = multiplicadoresZona[zonaSeguro] || 1;

        const cotizacion = costoBase * multiplicadorTipoSeguro * multiplicadorZona * multiplicadorCobertura * (sumaAsegurada / 10000000);
        const datosCotizacion = {
            tipoSeguro,
            zonaSeguro,
            antiguedad,
            tipoCobertura,
            sumaAsegurada,
            medioPago,
            cotizacion: cotizacion.toFixed(2)
        };

        guardarCotizacion(datosCotizacion);
        mostrarCotizaciones();
        Swal.fire('Cotización realizada', 'La cotización ha sido realizada con éxito.', 'success');
    });

    function guardarCotizacion(datos) {
        let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
        cotizaciones.push(datos);
        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
    }

    function mostrarCotizaciones() {
        let cotizaciones = JSON.parse(localStorage.getItem('cotizaciones')) || [];
        let contenedorHistorial = document.getElementById('historial-cotizaciones');
        contenedorHistorial.innerHTML = '';
        cotizaciones.forEach(cotizacion => {
            let elementoCotizacion = document.createElement('div');
            elementoCotizacion.classList.add('cotizacion');
            let detalleCotizacion = `
                <p><strong>Tipo de Seguro:</strong> ${cotizacion.tipoSeguro}</p>
                <p><strong>Zona del Seguro:</strong> ${cotizacion.zonaSeguro}</p>
                <p><strong>Antigüedad:</strong> ${cotizacion.antiguedad} años</p>
                <p><strong>Cobertura:</strong> ${cotizacion.tipoCobertura}</p>
                <p><strong>Suma Asegurada:</strong> $${cotizacion.sumaAsegurada.toLocaleString('es-AR')}</p>
                <p><strong>Medio de Pago:</strong> ${cotizacion.medioPago}</p>
                <p><strong>Cotización:</strong> $${cotizacion.cotizacion}</p>
            `;
            elementoCotizacion.innerHTML = detalleCotizacion;
            contenedorHistorial.appendChild(elementoCotizacion);
        });
    }

    mostrarCotizaciones();
});