// Selectors
const flashcards = document.getElementById("flashcard");
const question_input = document.getElementById("question_input");
const answer_input = document.getElementById("answer_input");

flashcards.addEventListener("click", editCard);
flashcards.addEventListener("click", deleteCard);
document.addEventListener("DOMContentLoaded", updateDOM);

// Function to show the question box
function showQuestionBox() {
  const question_box = document.getElementById("question_box");
  question_box.classList.remove("d-none");
  question_box.classList.add("d-block");
}

// Function to hide the question box
function hideQuestionBox() {
  const question_box = document.getElementById("question_box");
  question_box.classList.add("d-none");
  question_box.classList.remove("d-block");
}

// Function to save the card and show it in the DOM
function saveCard() {
  const card = document.createElement("div");
  card.classList.add("card", "my-3");
  card.style.width = "18rem";

  const card_body = document.createElement("div");
  card_body.classList.add("card-body");

  const card_title_question = document.createElement("h5");
  card_title_question.classList.add("card-title");
  card_title_question.innerHTML = question_input.value;
  card_body.appendChild(card_title_question);

  const card_text_answer = document.createElement("p");

  const show_hide_ans = document.createElement("a");
  show_hide_ans.classList.add("my-2");
  show_hide_ans.innerHTML = "Show/Hide Answer";
  show_hide_ans.onclick = function () {
    return card_text_answer.classList.toggle("d-none");
  };
  card_body.appendChild(show_hide_ans);

  card_text_answer.classList.add("card-text", "d-none");
  card_text_answer.innerHTML = answer_input.value;
  card_body.appendChild(card_text_answer);

  const br = document.createElement("br");
  card_body.appendChild(br);

  const edit_btn = document.createElement("a");
  edit_btn.classList.add("btn", "btn-info", "mt-2");
  edit_btn.innerHTML = "Edit";
  card_body.appendChild(edit_btn);

  const delete_btn = document.createElement("a");
  delete_btn.classList.add("btn", "btn-danger", "mt-2", "mx-2");
  delete_btn.innerHTML = "Delete";
  card_body.appendChild(delete_btn);

  saveCardLocal(question_input.value, answer_input.value);

  card.appendChild(card_body);
  flashcards.appendChild(card);

  question_input.value = "";
  answer_input.value = "";
}

// Function to deleta a card
function deleteCard(e) {
  const card = e.target;
  if (card.classList[1] === "btn-danger") {
    const p_card = card.parentNode.parentNode;
    p_card.remove();
    deleteCardLocal(p_card);
  }
}

// Function to save card in local storage
function saveCardLocal(question, answer) {
  let cards;
  if (localStorage.getItem("cards") == null) {
    cards = [];
  } else {
    cards = JSON.parse(localStorage.getItem("cards"));
  }
  let pushObj = { question, answer };
  cards.push(pushObj);
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Function to update the DOM
function updateDOM() {
  let cards;
  if (localStorage.getItem("cards") == null) {
    cards = [];
  } else {
    cards = JSON.parse(localStorage.getItem("cards"));
  }
  cards.forEach((card) => {
    const cardElem = document.createElement("div");
    cardElem.classList.add("card", "my-3");
    cardElem.style.width = "18rem";

    const card_body = document.createElement("div");
    card_body.classList.add("card-body");

    const card_title_question = document.createElement("h5");
    card_title_question.classList.add("card-title");
    card_title_question.innerHTML = card.question;
    card_body.appendChild(card_title_question);

    const card_text_answer = document.createElement("p");

    const show_hide_ans = document.createElement("a");
    show_hide_ans.classList.add("my-2", "bold");
    show_hide_ans.innerHTML = "Show/Hide Answer";
    show_hide_ans.onclick = function () {
      return card_text_answer.classList.toggle("d-none");
    };
    card_body.appendChild(show_hide_ans);

    card_text_answer.classList.add("card-text", "d-none");
    card_text_answer.innerHTML = card.answer;
    card_body.appendChild(card_text_answer);

    const br = document.createElement("br");
    card_body.appendChild(br);

    const edit_btn = document.createElement("a");
    edit_btn.classList.add("btn", "btn-info", "mt-2");
    edit_btn.innerHTML = "Edit";
    card_body.appendChild(edit_btn);

    const delete_btn = document.createElement("a");
    delete_btn.classList.add("btn", "btn-danger", "mt-2", "mx-2");
    delete_btn.innerHTML = "Delete";
    card_body.appendChild(delete_btn);

    cardElem.appendChild(card_body);
    flashcards.appendChild(cardElem);
  });
}

// Function to delete cards from local storage
function deleteCardLocal(card) {
  let cards;
  if (localStorage.getItem("cards") == null) {
    cards = [];
  } else {
    cards = JSON.parse(localStorage.getItem("cards"));
  }
  const cardIndex = card.children[0].innerHTML;
  cards.splice(cards.indexOf(cardIndex), 1);
  localStorage.setItem("cards", JSON.stringify(cards));
}

// Function to edit the card
function editCard(e) {
  const element = e.target;
  if (element.classList[1] === "btn-info") {
    const h5 = element.parentNode.children[0];
    const p = element.parentNode.children[2];
    showQuestionBox();
    question_input.value = h5.innerHTML;
    answer_input.value = p.innerHTML;
    element.parentNode.parentNode.classList.add("d-none");

    let cards;
    if (localStorage.getItem("cards") == null) {
      cards = [];
    } else {
      cards = JSON.parse(localStorage.getItem("cards"));
    }
    let len = cards.length - 1;
    cards.splice(len, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
  }
}
