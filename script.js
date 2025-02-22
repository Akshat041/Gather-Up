"use strict";

const Title = document.querySelector("#title");
const Description = document.querySelector("#description");
const Locat = document.querySelector("#location");
const Interested = document.querySelector("#isInterested");

const addBook = document.querySelector(".add-book");
const modal = document.querySelector("#modal");
const dialogForm = document.querySelector("#bookForm");

const closeModal = document.querySelector(".close");
const confirm = document.querySelector(".confirm");

const myLibrary = [];

// Book prototype
function Book(title, descriptio, location, isread) {
  this.title = title;
  this.descriptio = descriptio;
  this.location = location;
  this.isread = isread;
}

// creates original object and store that object in myLibrary array.
function addBookToLibrary(title, descriptio, location, read) {
  // original object
  const book = new Book(title, descriptio, location, read);
  myLibrary.push(book);
}

function displayBook(library) {
  const booksContainer = document.querySelector(".cards");
  booksContainer.innerHTML = "";

  library.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", index);

    const title = document.createElement("h1");
    title.classList.add("title");

    const descriptio = document.createElement("p");
    descriptio.classList.add("descriptio");

    const cardBottom = document.createElement("div");
    cardBottom.classList.add("card-bottom");

    const location = document.createElement("p");
    location.classList.add("location");

    const bottomBtns = document.createElement("div");
    bottomBtns.classList.add("bottom-btns");

    const readBtn = document.createElement("button");
    readBtn.classList.add("read");
    readBtn.textContent = `${book.isread == "true" ? "Interested" : "Not Interested"}`;

    readBtn.addEventListener("click", () => {
      if (readBtn.textContent == "Interested") {
        readBtn.textContent = "Not Interested";
      } else {
        readBtn.textContent = "Interested";
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = `Delete`;

    deleteBtn.addEventListener("click", () => {
      const cardIndex = card.dataset.index;

      myLibrary.splice(cardIndex, 1);
      displayBook(myLibrary);
    });

    title.textContent = book.title;
    descriptio.textContent = book.descriptio;
    location.textContent = `${book.location} location`;

    bottomBtns.appendChild(readBtn);
    bottomBtns.appendChild(deleteBtn);
    cardBottom.appendChild(location);
    cardBottom.appendChild(bottomBtns);
    card.appendChild(title);
    card.appendChild(descriptio);
    card.appendChild(cardBottom);
    booksContainer.appendChild(card);
  });
}

addBookToLibrary("Atomic Habits", "James Clear", 306, false);
addBookToLibrary(
  "The 7 Habits of Highly Effective People",
  "Stephen R. Covey",
  250,
  false
);
addBookToLibrary("Rich Dad, Poor Dad", "Robert T. Kiyosaki", 345, false);

function handleNewBookFormSubmit(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const descriptio = document.querySelector("#descriptio").value;
  const location = document.querySelector("#location").value;
  const read = document.querySelector("#read").value;

  addBookToLibrary(title, descriptio, location, read);
  displayBook(myLibrary);

  clearInputs();
}

function clearInputs() {
  Title.value = "";
  Description.value = "";
  Locat.value = "";
  Interested.value = false;
}

addBook.addEventListener("click", () => {
  // event.preventDefault();
  modal.showModal();
});

confirm.addEventListener("click", () => {
  addBookToLibrary(Title.value, Description.value, Locat.value, Interested.value);
  displayBook(myLibrary);
  clearInputs();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

displayBook(myLibrary);
