"use strict";

const Title = document.querySelector("#title");
const Description = document.querySelector("#description");
const Locat = document.querySelector("#location");
const Interested = document.querySelector("#isInterested");

const addEvent = document.querySelector(".add-event");
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
function addBookToLibrary(title, descriptio, location, Interested = false) {
  // original object
  const book = new Book(title, descriptio, location, Interested);
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
    readBtn.textContent = `${
      book.isread == "true" ? "Interested" : "Not Interested"
    }`;

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
    location.textContent = `Venue: ${book.location}`;

    bottomBtns.appendChild(readBtn);
    bottomBtns.appendChild(deleteBtn);
    cardBottom.appendChild(bottomBtns);
    card.appendChild(title);
    card.appendChild(descriptio);
    card.appendChild(cardBottom);
    card.appendChild(location);
    booksContainer.appendChild(card);
  });
}

addBookToLibrary(
  "FOSS Hack United",
  "You all are informed that premier free and open source software (FOSS) Hackathon is happening on 22 to 23 Feb, 2025",
  "CSJMU (Kanpur)",
  false
);

addBookToLibrary(
  "TechKriti '25",
  "Dive into the future with Techkriti '25, Asia's largest technical and entrepreneurial festival, from 27th to 30th March, 2025",
  "IIT Kanpur",
  false
);

addBookToLibrary(
  "ENGENIOUS - (Cultural Tech Fest)",
  "Experience a vibrant fusion of tradition and innovation. Expect digital art, tech-enhanced performances. Join us on 24 to 29 March, 2025",
  "KIT (On-Campus)",
  false
);

function handleNewBookFormSubmit(event) {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const descriptio = document.querySelector("#descriptio").value;
  const location = document.querySelector("#location").value;
  const read = document.querySelector("#read").value;
  console.log(read);
  //   const read = false;

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

addEvent.addEventListener("click", () => {
  // event.preventDefault();
  modal.showModal();
});

confirm.addEventListener("click", () => {
  addBookToLibrary(
    Title.value,
    Description.value,
    Locat.value,
    Interested.value = false
  );
  displayBook(myLibrary);
  clearInputs();
});

closeModal.addEventListener("click", () => {
  modal.close();
});

displayBook(myLibrary);
