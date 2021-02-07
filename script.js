function countAllObjectItems(oInput){
    let amountOfObjectElements = 0;
    let amount = 0;
    for(amount in oInput) {
        amountOfObjectElements++;
    }
    return amountOfObjectElements;
}

function countObjectValues(oInput, sKey, sValue){
    let filterObject = oInput.filter(ob => ob[sKey] === sValue);
    return countAllObjectItems(filterObject);
}

function addNewTextById(sTagId, sValue){
    let newTextNode = sValue;
    document.getElementById(sTagId).innerHTML = newTextNode;
}

function createMovieButton(seen, nArray){
    let NewButton = document.createElement("button");

    if(seen == "T"){
        NewButton.innerHTML = "✔";
    }else if(seen == "F"){
        NewButton.innerHTML = "✖";
    }else{
        NewButton.innerHTML = "{ERROR}";
    }

    NewButton.onclick = function(){
        if(NewButton.innerHTML == "✔"){
            NewButton.innerHTML = "✖";
            moviesData[nArray].seen = "F";
            refreshCounters();
        }else if(NewButton.innerHTML == "✖"){
            NewButton.innerHTML = "✔";
            moviesData[nArray].seen = "T";
            refreshCounters();
        }else{
            console.log("changeDataInfo: innerHTML ERROR");
        }
    }

    return NewButton;
}

function showMovieData(){
    let amount = 0;
    for(amount in moviesData){
        let title = document.createTextNode(moviesData[amount].title);
        let year = document.createTextNode(moviesData[amount].year);
        let genre = document.createTextNode(moviesData[amount].genre);
        let summary = document.createTextNode(moviesData[amount].summary);
        let brTag = document.createElement("br");

        let seen = moviesData[amount].seen;
        let button = createMovieButton(seen, amount);

        let newText = document.createElement("li");

        newText.appendChild(button);
        newText.appendChild(brTag.cloneNode(true));
        newText.appendChild(title);
        newText.appendChild(brTag.cloneNode(true));
        newText.appendChild(year);
        newText.appendChild(brTag.cloneNode(true));
        newText.appendChild(genre);
        newText.appendChild(brTag.cloneNode(true));
        newText.appendChild(summary);

        document.getElementById("moviesList").appendChild(newText);
    }
}

function refreshCounters(){
    addNewTextById(
        "moviesCounterAll", countAllObjectItems(moviesData));
    addNewTextById(
        "moviesCounterSeen", countObjectValues(moviesData, "seen", "T"));
}

function onWebsiteStart(){
    refreshCounters();
    showMovieData();
}


