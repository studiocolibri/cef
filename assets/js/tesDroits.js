/*********************** Sticky nav **********************/ 

var observer = new IntersectionObserver(function(entries) {
  if(entries[0].intersectionRatio === 0 && window.scrollY > 300)
      document.body.classList.add("sticky-nav");
  else if(entries[0].intersectionRatio === 1)
    document.body.classList.remove("sticky-nav");
}, { threshold: [0,1] });

observer.observe(document.querySelector("#sticky-nav-marker"));

/*********************** Search questions *****************/ 

// definition of variables
const searchInput = document.getElementById('search-input');
const results = document.getElementById('results');
let defaultResults = results.cloneNode(true);
let resultsWrapper = document.getElementById('results-wrapper');
let searchTerm = '';
const questions = null;
let questionsFormatted = {};
const noAnswer = document.getElementById('no-answer');
const noAnswerClone = noAnswer.cloneNode(true);
const clearSearchBtn = document.getElementById('clear-search');

// fetch the questions in JSON and format the response
const fetchQuestions = function() {
  const request = new XMLHttpRequest();
  request.open('GET', 'index.json');
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    questionsFormatted = request.response.items;
  }
}
fetchQuestions();

// Create a question node with the corresponding reponse and append it the corresponding list by id
const createQuestionItem = (id, question, reponse) => {
  let results = document.getElementById('results');
  let li = document.createElement('li');
  let details = document.createElement('details');
  let summary = document.createElement('summary');
  let content = document.createElement('div');
  let questionEl = document.createElement('h3');
  let reponseEl = document.createElement('p');

  questionEl.innerText = question;
  let highlightedQuestion = highlightText(questionEl, searchTerm);
  questionEl.innerHTML = highlightedQuestion;
  questionEl.classList.add('probleme__question');

  reponseEl.innerHTML = reponse;
  let highlightedReponse = highlightText(reponseEl, searchTerm);
  reponseEl.innerHTML = highlightedReponse;
  reponseEl.classList.add('probleme__reponse');
  
  summary.appendChild(questionEl);
  details.appendChild(summary);

  content.appendChild(reponseEl);
  content.classList.add('probleme__content');

  details.appendChild(content);

  li.appendChild(details);

  // add question to the corresponding list by id
  // Loop the differents list wrappers
  for (let i=0; i < results.childNodes.length; i++) {
    // if the current list wrapper id is equal to the current question id
    if (results.childNodes[i].id == id) {
      // select the corresponding list by id
      let list = results.childNodes[i].querySelector('ul');
      // append a "no results" text block if the current list is empty of response
      let noResult = list.querySelector('#no-result');
      if (noResult) {
        list.removeChild(noResult);
      }
      // append the current question to the corresponding list
      list.appendChild(li);
    }
  }
}

// Add a span around every character that match the search term
const highlightText = (el, term) => {
  let regex = new RegExp(term, "i");
  return el.innerHTML.replace(regex, '<mark>$&</mark>');
}

// show the question/response that matches the search term and append it in the corresponding list by id
const showQuestions = function() {
  // clearHTML
  let results = document.getElementById('results');
  results.innerHTML = '';
  
  // creating the list wrappers by id
  for (let i=0; i < questionsFormatted.length; i++) {
    let div = document.createElement("div");
    div.id = questionsFormatted[i].id;
    div.classList.add('probleme');
    if (i == 0) {
      div.classList.add('first');
    }

    let ul = document.createElement("ul");
    ul.classList.add('list--no-style');
    ul.innerHTML = '<li id="no-result"><p>Aucun résultat</p></li>';

    let title = document.createElement('h2');
    title.innerText = questionsFormatted[i].title;

    div.appendChild(title);
    div.appendChild(ul);
    results.appendChild(div);
  }

  // Add the "no-answer div at the bottom
  results.appendChild(noAnswerClone);

  // Loop all items
  for (let i=0; i < questionsFormatted.length; i++) {
    // Loop questions inside each item
    for (let y=0; y < questionsFormatted[i].questions.length; y++) {
      let question = questionsFormatted[i].questions[y].question.toLowerCase();
      let reponse = questionsFormatted[i].questions[y].reponse.toLowerCase();
      // if search term is included inside the question or the answer
      if (
        question.includes( searchTerm.toLowerCase() ) ||
        reponse.includes( searchTerm.toLowerCase() )
       ) {
        // create a question/reponse item
        createQuestionItem( questionsFormatted[i].id, questionsFormatted[i].questions[y].question, questionsFormatted[i].questions[y].reponse );
      }
    }
  }
}

// Show the question/response that matches the search term
searchInput.addEventListener('input', (e) => {
	searchTerm = e.target.value;
  showQuestions();
});

// Effacer le filtre
clearSearchBtn.addEventListener('click', (e) => {
  searchInput.value = '';
  searchTerm = '';
  showQuestions();
});