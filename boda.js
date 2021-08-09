window.onload = iniciar;

var open1 = false;
var open2 = false;
var open3 = false;
var open4 = false;

var lista = ['principal'];
var listaMenus = [];
var total = 1;

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

    crearEvento(document.getElementById("pasar1"),"click",cambiotarjeta);
    crearEvento(document.getElementById("pasar2"),"click",cambiotarjeta);
    crearEvento(document.getElementById("pasar3"),"click",cambiotarjeta);

    crearEvento(document.getElementById("pre2"),"click",pretarjeta);
    crearEvento(document.getElementById("pre3"),"click",pretarjeta);
    crearEvento(document.getElementById("pre4"),"click",pretarjeta);

    crearEvento(document.getElementById("copytxt"),"click",copyTxt);

    var listafaq = document.getElementsByClassName("maspregunta");
    for (let i = 0; i < listafaq.length; i++) {
        crearEvento(listafaq[i],"click",mostrarpregunta);
    }

    var listafaq2 = document.getElementsByClassName("menospregunta");
    for (let i = 0; i < listafaq2.length; i++) {
        crearEvento(listafaq2[i],"click",ocultarpregunta);
    }

    crearCuentaAtras();

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

function cambiotarjeta() {

    var num =  parseInt(this.id.slice(-1));
    var next = num + 1;

    if (num == 1){
        var nombre0 = document.getElementById("nombre0").value;
        var cuantos = document.getElementById("cuantos").value;

        if (nombre0 == '' || nombre0 == null){ error(num, 'nombre'); }
        else if (cuantos < 1 || cuantos > 10 || cuantos == null){ error(num, 'cuantos'); }
        else {
            lista[0] = nombre0;
            total = cuantos;
            crearPaso2();
            pasar(num, next);
        }
    }
    else if (num == 2){
        var fallo = false;
        lista.splice(1);
        for (let i = 1; i < total; i++) {
            j = i + 1;
            var nombre = document.getElementById('nombre' + j).value;
            if (nombre == null || nombre == ''){ i = 42; fallo = true;}
            else {lista.push(nombre);}
        }
        if (fallo) {
            lista.splice(1);
            error(num, '');
        }
        else {
            pasar(num, next);
            crearPaso3();
        }
    }
    else if (num == 3){
        crearMensaje();
        pasar(num, next);
    }

}

function error(num, error){

    if (num == 1) {
        if (error == 'nombre') {
            document.getElementById("error"+num).innerHTML = 'Se te ha olvidado añadir tu nombre.';
        }
        else if (error == 'cuantos') {
            document.getElementById("error"+num).innerHTML = 'El Nº de asistentes tiene que ser mínimo 1 y máximo 10.';
        }
    }
    else if (num = 2) {
        document.getElementById("error"+num).innerHTML = 'Se te ha olvidado añadir algún nombre.';
    }
}

function pasar(num, next){
    document.getElementById("paso" + num).classList.add("cerrado");
    document.getElementById("paso" + next).classList.remove("cerrado");
}

function crearPaso2(){
    document.getElementById('nombre1').value = lista[0];
    
    for (let i = 1; i < total; i++) {
        var j = i + 1;
        var nombreLista = '';
        if (lista.length > i) {
            nombreLista = lista[i];
        }

        var invitado = document.createElement("div");
        invitado.classList.add('invitado');
        var input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("name", "nombre" + j);
        input.setAttribute("id", "nombre" + j);
        input.value = nombreLista;
        var select = document.createElement("select");
        select.setAttribute("name", "menu" + j);
        select.setAttribute("id", "menu" + j);
        select.setAttribute("class", "menuSeleccionado");
        var option1 = document.createElement("option");
        option1.setAttribute("value", "de adultos");
        option1.innerHTML ='Adultos';
        var option2 = document.createElement("option");
        option2.setAttribute("value", "infantil");
        option2.innerHTML = 'Infantil';

        select.appendChild(option1);
        select.appendChild(option2);
        invitado.appendChild(input);
        invitado.appendChild(select);
        
        document.getElementById('añadirInvitados').appendChild(invitado);
    }
}

function crearPaso3(){
    for (let i = 0; i < total; i++) {
        
        var invitadoDiv = document.createElement("div");
        invitadoDiv.classList.add('inviIntol');
        var invitado = document.createElement("input");
        invitado.setAttribute("type", "checkbox");
        invitado.setAttribute("id", 'inv' + lista[i]);
        invitado.setAttribute("name", lista[i]);
        invitado.setAttribute("value", lista[i]);
        var label = document.createElement("label");
        label.setAttribute("for", lista[i]);
        label.innerHTML = lista[i];

        invitadoDiv.appendChild(invitado);
        invitadoDiv.appendChild(label);
        document.getElementById("invIntol").appendChild(invitadoDiv);

        crearEvento(document.getElementById('inv' + lista[i]),"click", box);

    }
}

function box(){
    var quien = this.value;
    var seleccion = this.checked;

    if (seleccion) {
        var textarea = document.createElement("textarea");
        textarea.setAttribute("id", 'txt' + quien);
        textarea.setAttribute("name", 'int' + quien);
        textarea.setAttribute("class", "intoal");
        textarea.setAttribute("cols", 50);
        textarea.setAttribute("rows", 3);
        textarea.setAttribute("placeholder", "Ej: Alergia a las gambas, celiaquía e intolerancia a la lactosa.");

        document.getElementById('inv'+quien).parentElement.appendChild(textarea);
    }
    else {
        var myobj = document.getElementById('txt'+quien);
        myobj.remove();
    }
}

function pretarjeta() {
    var num =  parseInt(this.id.slice(-1));
    var prev = num - 1;

    if (num == 2) {
        lista.splice(1);
        for (let i = 1; i < total; i++) {
            j = i + 1;
            var nombre = document.getElementById('nombre' + j).value;
            lista.push(nombre);
        }

        document.getElementById('añadirInvitados').innerHTML = '';

        document.getElementById("paso" + num).classList.add("cerrado");
        document.getElementById("paso" + prev).classList.remove("cerrado");
    }
    else if (num == 3){
        document.getElementById('invIntol').innerHTML = '';

        document.getElementById("paso" + num).classList.add("cerrado");
        document.getElementById("paso" + prev).classList.remove("cerrado");
    }
    else if (num == 4){
        document.getElementById('saludo').innerHTML = 'Hola, os escribo para confirmaros ';
        document.getElementById('menus').innerHTML = '';
        document.getElementById('ints').innerHTML = '';

        document.getElementById("paso" + num).classList.add("cerrado");
        document.getElementById("paso" + prev).classList.remove("cerrado");
    }
}

function crearMensaje() {
    var saludo = document.getElementById('saludo');
    var menus = document.getElementById('menus');
    var ints = document.getElementById('ints');

    var menuses = document.getElementById('invitados').getElementsByClassName('menuSeleccionado');
    for (let i = 0; i < menuses.length; i++) {
        listaMenus[i] = menuses[i].value;
    }

    infantiles = '';
    
    var cuantos = 0;
    for (let i = 0; i < listaMenus.length; i++) {
        if (listaMenus[i].toLowerCase() == 'infantil') {
            infantiles += lista[i] + ', ';
            cuantos++;
        }
    }
    if (cuantos == 1){
        infantiles = infantiles.substring(0, infantiles.length - 2)
    }
    else if (cuantos > 1){
        infantiles = infantiles.substring(0, infantiles.length - 2)
        var lastComma = infantiles.lastIndexOf(',');
        infantiles = infantiles.substring(0, lastComma) + ' y' + infantiles.substring(lastComma + 1);

    }

    if (total == 1) {
        saludo.innerHTML += "mi asistencia a la boda.";
        if (infantiles == ''){menus.innerHTML += "Mi menú será de adultos.";}
        else {menus.innerHTML += "Mi menú será infantil.";}
        
    }
    else {
        var todos = lista.toString().replaceAll(",", ", ");
        var lastComma = todos.lastIndexOf(',');
        todos = todos.substring(0, lastComma) + ' y' + todos.substring(lastComma + 1);
        
        saludo.innerHTML += "nuestra asistencia a la boda, en total seremos " + total + " (" + todos + ").";

        if (infantiles != '') {
            if (cuantos == 1) { menus.innerHTML += infantiles + ' tendrá menú infantil'; }
            else { menus.innerHTML += infantiles + ' tendrán menú infantil'; }
            menus.innerHTML += ', el resto menú de adultos.'
        }
    }

    var intos = document.getElementsByClassName('intoal');
    
    for (let i = 0; i < intos.length; i++) {
        if (intos[i].value.trim().length > 0) {
            var texto = document.createElement("p");
            if (total == 1) {
                texto.innerHTML = "Mis intolerancias o alergias: " + intos[i].value;
            }
            else {
                texto.innerHTML = "Intolerancias o alergias de " + intos[i].id.slice(3) + ": " + intos[i].value;
            }
            ints.appendChild(texto);
        }
    }

}


const copyTxt = mensaje => {
    var mensaje = '';

    mensaje += document.getElementById("saludo").innerHTML;
    mensaje += "\n\n" + document.getElementById("menus").innerHTML;

    var intsL = document.getElementById("ints").getElementsByTagName('p');
    for (let i = 0; i < intsL.length; i++) {
        mensaje += "\n\n" + intsL[i].innerHTML;
    }

    mensaje += "\n\n" + document.getElementById("adios").innerHTML;


    const el = document.createElement('textarea');
    el.value = mensaje;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};


function mostrarpregunta() {
    console.log(this.parentElement.parentElement.getElementsByClassName("respuesta")[0]);
    this.classList.add("cerrado");
    this.parentElement.getElementsByClassName("menospregunta")[0].classList.remove("cerrado");
    this.parentElement.parentElement.getElementsByClassName("respuesta")[0].classList.remove("cerrado");

}


function ocultarpregunta() {
    console.log(this.parentElement.parentElement.getElementsByClassName("respuesta")[0]);
    this.classList.add("cerrado");
    this.parentElement.getElementsByClassName("maspregunta")[0].classList.remove("cerrado");
    this.parentElement.parentElement.getElementsByClassName("respuesta")[0].classList.add("cerrado");

}


function crearCuentaAtras() {
    // Set the date we're counting down to
    var countDownDate = new Date("Jun 18, 2022 13:30:00").getTime();

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
            
        // Find the distance between now and the count down date
        var distance = countDownDate - now;
            
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
        // Output the result in an element with id="demo"
        document.getElementById("dias").innerHTML = days;
        document.getElementById("horas").innerHTML = hours;
        document.getElementById("minutos").innerHTML = minutes;
        document.getElementById("segundos").innerHTML = seconds;
            
        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("cuentaatras").classList.add("cerrado");
            document.getElementById("gracias").classList.remove("cerrado");
            document.getElementById("gracias").innerHTML = "¡Gracias por haber estado con nosotros!";
        }
    }, 1000);
}