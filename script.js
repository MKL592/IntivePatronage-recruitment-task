/**
 * @author Artur Panasiuk <artur-panasiuk592@wp.pl>
 */

/**
 * Takes an object/array and returns number of elements.
 * @param {object} input Object/array input.
 * @returns {number}
 */
function countAllObjectItems(input){
    let amountOfObjectElements = 0;
    for(amount in input) {
        amountOfObjectElements++;
    }
    return amountOfObjectElements;
}
/**
 * Counts all given keys by given value and returns number.
 * @param {object} input Input Object/array.
 * @param {string} key Checks this key for specific value.
 * @param {string} value Value that you want to search.
 * @returns {number}
 */
function countObjectValues(input, key, value){
    let filterObject = input.filter(ob => ob[key] === value);
    return countAllObjectItems(filterObject);
}
/**
 * Changes content of given HTML tag by given value.
 * @param {string} tag HTML tag.
 * @param {string} value Content that you want sTagId element to be.
 */
function changeTextById(tag, value){
    document.getElementById(tag).innerHTML = value;
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
 * @param {string} isSeen Passed value to check moviesData.seen
 * @param {number} loopIteration Passed iteration number from function
 * @returns {object} Returns ready to append button object
 */
function createButton(isSeen, loopIteration){
    let newButton = document.createElement("button");
    if(isSeen == "T"){
        newButton.innerHTML = "✔";
    }else if(isSeen == "F"){
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
    })(loopIteration)

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


