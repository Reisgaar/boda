window.onload = iniciar;

var open1 = false;
var open2 = false;
var open3 = false;
var open4 = false;

function iniciar(){
    window.onscroll = function() {myFunction()};

    var menu = document.getElementById("menu");
    var sticky = menu.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            menu.classList.add("sticky")
        } else {
            menu.classList.remove("sticky");
        }
    }

    crearEvento(document.getElementById("desc1"),"click",desplegar);
    crearEvento(document.getElementById("desc2"),"click",desplegar);
    crearEvento(document.getElementById("desc3"),"click",desplegar);
    crearEvento(document.getElementById("desc4"),"click",desplegar);

}


function crearEvento(elemento,  tipoEvento,  funcion) {
	// Intenta asignar el evento con el método del W3C
    if (elemento.addEventListener) {
        elemento.addEventListener(tipoEvento,  funcion,  false);
    }
	// Si no, intenta utilizar el método de IE
    else if (elemento.attachEvent) {
        elemento.attachEvent("on"  +  tipoEvento,  funcion);
    }
	// Si no, asigna el evento en línea
    else {
        elemento["on"  +  tipoEvento]  =  funcion;
    }
}

function desplegar() {
    console.log(this.id.slice(-1));

    var num = this.id.slice(-1);

    if (num == 1) {
        if (open1) { abrir(1); open1 = false; }
        else { cerrar(1); open1 = true; }
    }
    else if (num == 2) {
        if (open2) { abrir(2); open2 = false; }
        else { cerrar(2); open2 = true; }
    }
    else if (num == 3) {
        if (open3) { abrir(3); open3 = false; }
        else { cerrar(3); open3 = true; }
    }
    else if (num == 4) {
        if (open4) { abrir(4); open4 = false; }
        else { cerrar(4); open4 = true; }
    }
}

function abrir(num) {
    document.getElementById("ev" + num).classList.add("cerrado");
    document.getElementById("up" + num).classList.add("cerrado");
    document.getElementById("down" + num).classList.remove("cerrado");
}

function cerrar(num) {
    document.getElementById("ev" + num).classList.remove("cerrado");
    document.getElementById("up" + num).classList.remove("cerrado");
    document.getElementById("down" + num).classList.add("cerrado");
}