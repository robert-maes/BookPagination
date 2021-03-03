"use strict";

// mock book data
const books = [
  {
    bookId: 0,
    title: "In Search of Lost Time",
    author: "Marcel Proust",
  },
  {
    bookId: 1,
    title: "Ulysses",
    author: "James Joyce",
  },
  {
    bookId: 2,
    title: "Don Quixote",
    author: "Miguel de Cervantes",
  },
  {
    bookId: 3,
    title: "One Hundred Years of Solitude",
    author: "Gabriel Garcia Marquez",
  },
  {
    bookId: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
  },
  {
    bookId: 5,
    title: "Moby Dick",
    author: "Herman Melville",
  },
  {
    bookId: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
  },
  {
    bookId: 7,
    title: "Hamlet",
    author: "William Shakespeare",
  },
  {
    bookId: 8,
    title: "The Odyssey",
    author: "Homer",
  },
  {
    bookId: 9,
    title: "Madame Bovary",
    author: "Gustave Flaubert",
  },
  {
    bookId: 10,
    title: "The Divine Comedy",
    author: "Dante Alighieri",
  },
  {
    bookId: 11,
    title: "Lolita",
    author: "Vladimir Nabokov",
  },
  {
    bookId: 12,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoyevsky",
  },
  {
    bookId: 13,
    title: "Crime and Punishment",
    author: "Fyodor Dostoyevsky",
  },
  {
    bookId: 14,
    title: "Wuthering Heights",
    author: "Emily Bronte",
  },
  {
    bookId: 15,
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
  },
  {
    bookId: 16,
    title: "Pride and Prejudice",
    author: "Jane Austen",
  },
  {
    bookId: 17,
    title: "The Adventures of Huckleberry Finn",
    author: "Mark Twain",
  },
  {
    bookId: 18,
    title: "Anna Karenina",
    author: "Leo Tolstoy",
  },
  {
    bookId: 19,
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
  },
];

// the current page we are on
let page = 0;
// the total number of pages
const totalPages = Math.ceil(books.length / 6);

// called when the user changes to a new page
const changePage = (newPage) => {
  // ensure the new page is valid
  if (newPage >= 0 && newPage < totalPages) {
    // set the current page to the new page
    page = newPage;
    // construct the book list DOM
    createBookList();
    // construct the pagination DOM
    createPaginationList();
  }
};

// create the HTML for a book
const createBookNode = (parentElement, author, title) => {
  // create the following html
  // li.list-group-item
  //   h5.mb-1
  //     Book Title
  //   p.mb-1
  //     Book Author
  // then append it to the #bookList ul
  const parentListNode = document.createElement("li");
  parentListNode.className = "list-group-item";
  const childTitleNode = document.createElement("h5");
  childTitleNode.className = "mb-1";
  childTitleNode.innerHTML = title;
  const childAuthorNode = document.createElement("p");
  childAuthorNode.className = "mb-1";
  childAuthorNode.innerHTML = author;
  parentListNode.appendChild(childTitleNode);
  parentListNode.appendChild(childAuthorNode);
  parentElement.appendChild(parentListNode);
};

const createBookList = () => {
  // grab a reference to the #bookList ul element
  const bookListNode = document.getElementById("bookList");
  // flush it out
  bookListNode.innerHTML = "";
  // loop through the books within the current page
  for (let i = page * 6; i < page * 6 + 6; i++) {
    // prevent going out of bounds on the last page
    if (i < books.length) {
      // grab the current book
      const book = books[i];
      // create an element for the current book and append it to the parent container
      createBookNode(bookListNode, book.author, book.title);
    }
  }
};

// create the HTML for a clickable part of the pagination controls
// parentElement = the HTML parent element to append this to
// enabled = blue if true, greyed out if false
// active = blue background & white text if true, white background and blue text if false
// displayText = the text to show for the link
// toPage = the page number to change to when this element is clicked
const createPaginationNode = (
  parentElement,
  enabled,
  active,
  displayText,
  toPage
) => {
  // construct the following HTML
  // li.page-item
  //   a.page-link
  //     Page Number
  const parentListNode = document.createElement("li");
  if (enabled) {
    if (active) {
      parentListNode.className = "page-item active";
    } else {
      parentListNode.className = "page-item";
    }
  } else {
    parentListNode.className = "page-item disabled";
  }
  const childLinkNode = document.createElement("a");
  childLinkNode.className = "page-link";
  childLinkNode.href = "#";
  childLinkNode.innerHTML = displayText;
  // add an event listener to change pages when clicked
  childLinkNode.addEventListener("click", () => changePage(toPage));
  parentListNode.appendChild(childLinkNode);
  // append this control element to the #paginationList ul
  parentElement.appendChild(parentListNode);
};

// construct the pagination controls for navigating the list
const createPaginationList = () => {
  // grab a reference to the parent container
  const paginationListNode = document.getElementById("paginationList");
  // flush it out
  paginationListNode.innerHTML = "";
  // if the prev page is valid, it should be enabled
  const prevEnabled = page - 1 >= 0;
  // construct the prev (<<) button
  createPaginationNode(
    paginationListNode,
    prevEnabled,
    false,
    "&laquo",
    page - 1
  );
  // add a page button for each page
  for (let i = 0; i < totalPages; i++) {
    // if this button matches the current page, make it active
    const isActive = i === page;
    // construct a page button
    createPaginationNode(paginationListNode, true, isActive, i + 1, i);
  }
  // if the next page is valid, it should be enabled
  const nextEnabled = page + 1 < totalPages;
  // construct the next (>>) button
  createPaginationNode(
    paginationListNode,
    nextEnabled,
    false,
    "&raquo",
    page + 1
  );
};

// initialize at page 0 (1 for the user)
changePage(0);
