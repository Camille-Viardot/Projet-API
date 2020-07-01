function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}


let paysELT = document.getElementById("lesPays");
ajaxGet("https://restcountries.eu/rest/v2/all", function (reponse) {
 

    let listPays = JSON.parse(reponse);

    listPays.forEach(function (pays) {
        let paysName = document.createElement("button");
        paysName.textContent = pays.name;
        console.log(paysName)
        paysName.classList.add("btn", "btn-outline-secondary")
        paysELT.appendChild(paysName);

    });
});



//         let capitalELT = document.createElement("p");
//         capitalELT.textContent = pays.capital;
//         paysELT.appendChild(paysName);
//         paysELT.appendChild(capitalELT);
//     
// 