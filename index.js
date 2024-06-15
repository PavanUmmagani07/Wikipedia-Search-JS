let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner')

//3.Creating and appending the results to the webpage that we got from the JSON DATA
function createAndAppendResults(result){

    //using object Destructuring we are getting the required title,url and description
    let{title,link,description}=result;


    //1.div container ---result-item;
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);

    //2.Anchor tilte---result-title;
    let resultTitleEl = document.createElement('a');
    resultTitleEl.classList.add('result-title');
    resultTitleEl.textContent=title;
    resultTitleEl.href= link;
    resultTitleEl.target = '_blank';
    resultItemEl.appendChild(resultTitleEl);


    //3.Title Break
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);


    //4.Anchor URL-- result-url;
    let resultUrlEl = document.createElement('a');
    resultUrlEl.classList.add('result-url');
    resultUrlEl.href = link;
    resultUrlEl.target="_blank";
    resultUrlEl.textContent= link;
    resultItemEl.appendChild(resultUrlEl);


    //5.line Break
    let lineBreakEl = document.createElement('br');
    resultItemEl.appendChild(lineBreakEl);


    //6.Praragraph Description-- line-description
    let lineDescriptionEl = document.createElement('p');
    lineDescriptionEl.textContent = description;
    resultItemEl.appendChild(lineDescriptionEl);


}


//2.Displaying the Results that we got from the HTTP Request in the form of JSON()
function displaySearchResults(search_results){
    spinnerEl.classList.toggle('d-none');
    for(let result of search_results)
    createAndAppendResults(result);
}



//1.Adding Event Listener to get the searched Text(ENtered Input Value);
function searchWikipedia(event){
    if(event.key==='Enter'){
        //4.Whenever the user clicks the ENTER the below line ensures that the previous Search Results should cleared off
        searchResultsEl.textContent="";

        //Adding Spinner 
        spinnerEl.classList.toggle('d-none');
        let searchInputValue = searchInputEl.value;
        let url = 'https://apis.ccbp.in/wiki-search?search='+searchInputValue;
        let options={
            method:"GET"
        }
        fetch(url, options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let{search_results} = jsonData;
            displaySearchResults(search_results);
        })
    }
}

searchInputEl.addEventListener('keydown', searchWikipedia);