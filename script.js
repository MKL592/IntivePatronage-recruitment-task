/**
 * Takes an object/array and returns number of elements.
 * @author Artur Panasiuk <artur-panasiuk592@wp.pl>
 * @param {object} oInput Object/array input.
 * @returns {number}
 */
function countAllObjectItems(oInput){
    let amountOfObjectElements = 0;
    for(amount in oInput) {
        amountOfObjectElements++;
    }
    return amountOfObjectElements;
}
/**
 * Counts all given keys by given value and returns number.
 * @param {object} oInput Input Object/array.
 * @param {string} sKey Checks this key for specific value.
 * @param {string} sValue Value that you want to search.
 * @returns {number}
 */
function countObjectValues(oInput, sKey, sValue){
    let filterObject = oInput.filter(ob => ob[sKey] === sValue);
    return countAllObjectItems(filterObject);
}
/**
 * Changes content of given HTML tag by given value.
 * @param {string} sTagId HTML tag.
 * @param {string} sValue Content that you want sTagId element to be.
 */
function changeTextById(sTagId, sValue){
    let newTextNode = sValue;
    document.getElementById(sTagId).innerHTML = newTextNode;
}
/**
 * Refreshes all values on frontend, that have been changed by other operations.
 */
function refreshCounters(){
    changeTextById(
        "moviesCounterAll", countAllObjectItems(moviesData));
    changeTextById(
        "moviesCounterSeen", countObjectValues(moviesData, "seen", "T"));
}
/**
 * Creates buttons for showMovieData functions
 * @param {string} sIsSeen Passed value to check moviesData.seen
 * @param {number} nLoopIteration Passed iteration number from function
 * @returns {object} Returns ready to append button object
 */
function createButton(sIsSeen, nLoopIteration){
    let newButton = document.createElement("button");
    if(sIsSeen == "T"){
        newButton.innerHTML = "✔";
    }else if(sIsSeen == "F"){
        newButton.innerHTML = "✖";
    }else{
        newButton.innerHTML = "{ERROR}";
    }
    (function(index){
        newButton.addEventListener("click", function(){
        if(newButton.innerHTML == "✔"){
            console.log(index);
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
    })(nLoopIteration)

    return newButton;
}
/**
 * For every object in moviesData array, creates li tag consisting of button, title, year, genre and summary. Li tags are connected to html class="moviesList".
 */
function showMovieData(){
    const brTag = document.createElement("br");
    let amount = 0;
    for(amount in moviesData){
        let newText = document.createElement("li");
        let seen = moviesData[amount].seen;

        let dataInfo = {
            "currentButton": createButton(seen, amount),
            "currentTitle": document.createTextNode(moviesData[amount].title),
            "currentYear": document.createTextNode(moviesData[amount].year),
            "currentGenre": document.createTextNode(moviesData[amount].genre),
            "currentSummary": document.createTextNode(moviesData[amount].summary)
        }

        for(iteration in dataInfo){
            newText.appendChild(brTag.cloneNode(true));
            newText.appendChild(dataInfo[iteration]);
        }

       document.getElementById("moviesList").appendChild(newText);
    }
}
/**
 * Called in HTML by body onload function. Runs only once.
 */
function onWebsiteStart(){
    refreshCounters();
    showMovieData();
}


