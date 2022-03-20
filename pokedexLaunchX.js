// PRACTICA DE POKE API
console.log("****************** PRACTICA DE POKE API ********************");

const fetchPokemon = () => {
    const pokeName = document.getElementById("pokeName");
    let pokeInput = pokeName.value.toLowerCase();
    // para meter variables en un string con comillas invertidas, se usa la sintaxis de ${nombreVariable}
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if(res.status != 200){
            console.log("No se encontro al pokemon ingresado");
            pokeImage("nombre", "img/whoisit.jpeg", ['tipo'], ['stat: 0'], ['movimientos'], false);
        }else{
            return res.json();
        }
        //console.log("La respuesta fue: ");
        //console.log(res);
        
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;

        // sacar los tipos del pokemon en una lista
        console.log(data.types.length)
        let tipos = [];
        for(numTipos = 0; numTipos < data.types.length; numTipos++){
            //tipos.push(data.types[numTipos].type.name);
            let coma = numTipos == (data.types.length - 1) ? "" : " ";
            tipos.push(data.types[numTipos].type.name);
        }
        //console.log(tipos.join(', ') + "\n");

        // sacar las estadisticas del pokemon en una lista
        let estadisticas = [];
        for(numStats = 0; numStats < data.stats.length; numStats++){
            estadisticas.push(
                data.stats[numStats].stat.name + ": " + data.stats[numStats].base_stat
            );
        }
        GenerateTable(data.stats);
        //console.log(estadisticas + "\n");

        // sacar los movimientos del pokemon en una lista
        let movimientos = [];
        for(numMoves = 0; numMoves < data.moves.length; numMoves++){
            movimientos.push(
                data.moves[numMoves].move.name
            );
        }
        //tipos.join(', ')
        pokeImage(data.name, pokeImg, tipos, estadisticas, movimientos, true);
    });
}

//fetchPokemon();

const pokeImage = (nombre, url, tipos, estadisticas, movimientos, exito) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;

    //document.querySelector("h1").innerHTML = "H1";
    document.getElementById("nombrePokemon").innerHTML = nombre.toUpperCase();
    document.getElementById("tiposPokemon").innerHTML = tipos.join(', ');
    //document.getElementById("statsPokemon").innerHTML = estadisticas.join(', ');
    document.getElementById("movesArea").innerHTML = movimientos.join(', ');
    
    if( !url.toString().startsWith("http") ){
        pokeImg.width = 190;
        console.log(url);
    }
}
//pokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/443.png");
function GenerateTable(stats) {
    //Build an array containing Customer records.
    var customers = new Array();
    // sacar las estadisticas del pokemon en una lista
    let estadisticasTitles = [];
    for(numStats = 0; numStats < stats.length; numStats++){
        estadisticasTitles.push(
            stats[numStats].stat.name
        );
    }

    // sacar los valores de las estadisticas del pokemon en una lista
    let estadisticasValores = [];
    for(numVal = 0; numVal < stats.length; numVal++){
        estadisticasValores.push(
            stats[numVal].base_stat
        );
    }

    customers.push(estadisticasTitles);
    customers.push(estadisticasValores);
    /*
    customers.push([2, "Mudassar Khan", "India"]);
    customers.push([3, "Suzanne Mathews", "France"]);
    customers.push([4, "Robert Schidner", "Russia"]);
    */

    //Create a HTML Table element.
    var table = document.createElement("TABLE");
    table.border = "1";

    //Get the count of columns.
    var columnCount = customers[0].length;

    //Add the header row.
    var row = table.insertRow(-1);
    for (var i = 0; i < columnCount; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = customers[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < customers.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnCount; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = customers[i][j];
        }
    }

    var dvTable = document.getElementById("dvTable");
    dvTable.innerHTML = "";
    dvTable.appendChild(table);
}