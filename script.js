let tableauPays = []; // ------------------------------------------------- Mon tableau vide pour ranger les données que je récupère 
let monInput = document.getElementById("choisirPays");
let paysELT = document.getElementById("lesPays");
let form = document.getElementById("auto-suggest");
let infoss = document.getElementById("infosPays");

// ----------------------------------------------------------------------- Function pour activé le ajaxGet 
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


// ----------------------------------------------------------------------- Function pour aller chercher le contenue de l'API
ajaxGet("https://restcountries.eu/rest/v2/all", function (reponse) {
    let listPays = JSON.parse(reponse); // ------------------------------- Permet de parse l'API récupéré par Ajax 

    listPays.forEach(function (pays) { // -------------------------------- Boucle pour récupérer les noms des pays

        tableauPays.push({ // -------------------------------------------- Tableau qui contient les objets qu'on a selectionné 
            name: pays.name,
            capital: pays.capital,
            population: pays.population,
            monnaie: pays.currencies[0].name,
            region: pays.region,
            subregion: pays.subregion,
        });
    });


    let list = document.createElement("ul"); // -------------------------- Créer un élément <ul>
    list.className = "suggestions"; // ----------------------------------- Attribut la class suggestions a <ul>
    list.style.display = "none"; // -------------------------------------- Rend invisible l'UL
    form.appendChild(list); // ------------------------------------------- Dit que list est l'enfant de form



    monInput.onkeyup = function () { // ---------------------------------- Function onkeyup qui va s'activer quand on relache la touche du clavier 
        let txt = monInput.value; // ------------------------------------- Créer une variable pour récupérer la valeur écrite dans l'input
        if (!txt) { // --------------------------------------------------- S'il n'y a rien écrit dans l'input
            list.style.display = "none"; // ------------------------------ Alors la liste ne s'affiche pas
            return; // --------------------------------------------------- Met fin a l'execution de la function
        };



        let suggestions = 0; // ------------------------------------------ Créer une variable suggestion qui a pour valeur 0
        let frag = document.createDocumentFragment(); // ----------------- Créer une variable frag qui créer un document fragment


        tableauPays.forEach(function (pays) { // ------------------------- Boucle pour afficher les nom en auto-suggestion
            let maj = monInput.value.toUpperCase(); // ------------------- Créer une variable pour transformer en majuscule ce que l'on tappe dans l'input
            let majPays = pays.name.toUpperCase(); // -------------------- Créer une variable pour transformer en majuscule les noms des pays 


            if (majPays.indexOf(maj) === 0) { // ------------------------- Si la lettre tapper dans l'input correspond à la première lettre d'un pays


                let mesPays = document.createElement("li"); // ----------- Créer une variable qui créer un élément li
                frag.appendChild(mesPays); // ---------------------------- Dit que mesPays est l'enfant de frag
                mesPays.innerHTML = pays.name; // ------------------------ Récupère les noms de pays



                mesPays.onclick = function () { // ----------------------- Function qui se lance quand on clique sur le bouton de la sourie
                    monInput.focus(); // --------------------------------- permet de cibler un élément quand il a le focus
                    monInput.value = pays.name; // ----------------------- lorsqu'on rentre du texte dans l'input, il va chercher dans la liste de nom
                    list.style.display = "none";// ----------------------- Fait disparaitre la liste de suggestion

                    let paysSelect = document.createElement("p"); // ----- Créer une variable qui créer un élément <p>
                    let capitalSelect = document.createElement("p"); // -- Créer une variable qui créer un élément <p>
                    let populationSelect = document.createElement("p"); // Créer une variable qui créer un élément <p>

                    paysSelect.innerHTML = pays.name; // ----------------- Attribut le nom des pays à paysSelect
                    capitalSelect.innerHTML = pays.capital; // ----------- Attribut le nom des capitals à paysSelect
                    populationSelect.innerHTML = "La populatoin du pays est : " + pays.population;

                    infoss.appendChild(paysSelect);
                    infoss.appendChild(capitalSelect);
                    infoss.appendChild(populationSelect);
                };
            }
            suggestions++; 
        });



        // ----------------------------------------------------------------- Si le champ suggestion est vide, alors il n'affiche pas de suggestion
        if (suggestions) {
            list.innerHTML = "";
            list.appendChild(frag);
            list.style.display = "block";
        } else {
            list.style.display = "none";
        };
    };
})