function countAllObjectItems(oInput){
    let amountOfObjectElements = 0;
    for(amount in oInput) {
        amountOfObjectElements++;
    }
    return amountOfObjectElements;
}

function countObjectValues(oInput, sKey, sValue){
    let filterObject = oInput.filter(ob => ob[sKey] === sValue);
    return countAllObjectItems(filterObject);
}

function changeTextById(sTagId, sValue){
    let newTextNode = sValue;
    document.getElementById(sTagId).innerHTML = newTextNode;
}

function refreshCounters(){
    changeTextById(
        "moviesCounterAll", countAllObjectItems(moviesData));
    changeTextById(
        "moviesCounterSeen", countObjectValues(moviesData, "seen", "T"));
}

function showMovieData(){
    const brTag = document.createElement("br");
    let amount = 0;
    for(amount in moviesData){
        let newText = document.createElement("li");
        let newButton = document.createElement("button");
        let seen = moviesData[amount].seen;

        let dataInfo = {
            "currentTitle": document.createTextNode(moviesData[amount].title),
            "currentYear": document.createTextNode(moviesData[amount].year),
            "currentGenre": document.createTextNode(moviesData[amount].genre),
            "currentSummary": document.createTextNode(moviesData[amount].summary)
        }

        if(seen == "T"){
            newButton.innerHTML = "✔";
        }else if(seen == "F"){
            newButton.innerHTML = "✖";
        }else{
            newButton.innerHTML = "{ERROR}";
        }

        (function(index){
           newButton.addEventListener("click", function(){
            if(newButton.innerHTML == "✔"){
                newButton.innerHTML = "✖";
                moviesData[index].seen = "F";
                refreshCounters();
            }else if(newButton.innerHTML == "✖"){
                newButton.innerHTML = "✔";
                moviesData[index].seen = "T";
                refreshCounters();
            }else{
                console.log("ERROR");
            }
           })
        })(amount)

        newText.appendChild(newButton);

        for(iteration in dataInfo){
            newText.appendChild(brTag.cloneNode(true));
            newText.appendChild(dataInfo[iteration]);
        }

       document.getElementById("moviesList").appendChild(newText);
    }
}

function onWebsiteStart(){
    refreshCounters();
    showMovieData();
}


