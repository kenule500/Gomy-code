import { generateId } from '../utils/id-generator.js';
import { required, isString, isbn as validateIsbn, isPositiveNumber } from '../utils/validator.js';

const BookStatus = Object.freeze({
  AVAILABLE: 'available',
  BORROWED: 'borrowed',
  RESERVED: 'reserved',
  LOST: 'lost',
});

const BookCategory = Object.freeze({
  FICTION: 'fiction',
  NON_FICTION: 'non-fiction',
  SCIENCE: 'science',
  HISTORY: 'history',
  TECHNOLOGY: 'technology',
  REFERENCE: 'reference',
  CHILDREN: 'children',
});

class Book {
  #id;
  #isbn;
  #title;
  #author;
  #category;
  #publishYear;
  #status;
  #copies;
  #availableCopies;

  constructor({ isbn, title, author, category, publishYear, copies = 1 }) {
    this.#id = generateId('BK');
    required(title, 'Title');
    required(author, 'Author');
    validateIsbn(isbn);
    isString(category, 'Category');
    isPositiveNumber(publishYear, 'Publish year');
    isPositiveNumber(copies, 'Copies');

    this.#isbn = isbn;
    this.#title = title;
    this.#author = author;
    this.#category = category;
    this.#publishYear = publishYear;
    this.#copies = copies;
    this.#availableCopies = copies;
    this.#status = BookStatus.AVAILABLE;
  }

  get id() {
    return this.#id;
  }
  get isbn() {
    return this.#isbn;
  }
  get title() {
    return this.#title;
  }
  get author() {
    return this.#author;
  }
  get category() {
    return this.#category;
  }
  get publishYear() {
    return this.#publishYear;
  }
  get status() {
    return this.#status;
  }
  get copies() {
    return this.#copies;
  }
  get availableCopies() {
    return this.#availableCopies;
  }
  get isAvailable() {
    return this.#availableCopies > 0;
  }

  borrowCopy() {
    if (this.#availableCopies <= 0) {
      console.log(`\u274c "${this.#title}" has no copies available.`);
      return false;
    }
    this.#availableCopies -= 1;
    if (this.#availableCopies === 0) {
      this.#status = BookStatus.BORROWED;
    }
    return true;
  }

  returnCopy() {
    if (this.#availableCopies >= this.#copies) return false;
    this.#availableCopies += 1;
    if (this.#availableCopies > 0) {
      this.#status = BookStatus.AVAILABLE;
    }
    return true;
  }

  toJSON() {
    return {
      id: this.#id,
      isbn: this.#isbn,
      title: this.#title,
      author: this.#author,
      category: this.#category,
      publishYear: this.#publishYear,
      status: this.#status,
      copies: this.#copies,
      availableCopies: this.#availableCopies,
    };
  }
}

export { Book, BookStatus, BookCategory };