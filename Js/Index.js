let USUARIO = prompt("Ingrese su mail registrado");
let CONTRASENA = prompt("Ingrese su contrasena");

let Antiguedad;
let AntiguedadMinima;
let anoValido = false;


while (!anoValido) {
    Antiguedad = parseInt(prompt("Ingresa el año de tu vehiculo"));
    console.log(Antiguedad);

    AntiguedadMinima = parseInt(Antiguedad);


    if (isNaN(AntiguedadMinima) || Antiguedad<1980 || Antiguedad>2024  ) {
        alert("Por favor, ingresa un año válido para tu vehículo (4 cifras y menor o igual al año actual).");
    } else {
        anoValido = true; 
    }
}


if (AntiguedadMinima >= 2003) {
    console.log("Antigüedad de vehículo autorizada para cotizar");
} else if (AntiguedadMinima < 2003) {
    console.log("Disculpe, vehículo fuera de pauta para asegurar, comuníquese con atención al cliente");
}