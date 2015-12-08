var socket = io.connect('http://localhost:8080');
var btn = document.getElementById("btn");
var btnhide = document.getElementsByClassName("close")[0];
var btn2 = document.getElementById("btn2");
document.getElementById("chatwindow").style.display = "none";
btn.style.display = "none";

function hideChat(){
	document.getElementById("chatwindow").style.display = "none";
}

function showChat(){
	document.getElementById("chatwindow").style.display = "inline-block";
}

function insereMessage(pseudo, message) {
    document.getElementById("zone_chat").innerHTML += '<p><strong>' + pseudo + '</strong> ' + message + '</p>';
}

function changePage(){
    btn2.style.display = "none";
    btn.style.display = "inline-block";
    document.getElementById("hide").style.display = "none";
    document.getElementById("pseudo").style.display = "none";
    document.getElementById("chatwindow").style.display = "inline-block";

    // Connexion à socket.io
    // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
    var pseudo = document.getElementById("pseudo").value;
    socket.emit('nouveau_client', pseudo);
    document.title = pseudo + ' - ' + document.title;
    // Quand on reçoit un message, on l'insère dans la page
    socket.on('message', function(data) {
        insereMessage(data.pseudo, data.message)
    })
    // Quand un nouveau client se connecte, on affiche l'information

    socket.on('nouveau_client', function(pseudo) {
        document.getElementById("zone_chat").innerHTML +='<p><em>' + pseudo + ' a rejoint le Chat !</em></p>';
    })
    // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
    document.getElementById("formulaire_chat").onsubmit = function () {
        var truc = document.getElementById("message");
        var message = truc.value;
        socket.emit('message', message); // Transmet le message aux autres
        insereMessage(pseudo, message); // Affiche le message aussi sur notre page
        truc.value ='';
        truc.focus(); // Vide la zone de Chat et remet le focus dessus
        return false; // Permet de bloquer l'envoi "classique" du formulaire
    };
    // Ajoute un message dans la page
}

btn.onclick = showChat;
btn2.onclick = changePage;
btnhide.onclick = hideChat;

