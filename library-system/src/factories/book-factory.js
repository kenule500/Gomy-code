import { Book, BookCategory } from '../models/book.js';
import { warn } from '../utils/logger.js';

class BookFactory {
  static create(data) {
    this.#validateRequired(data);
    const book = new Book(data);
    if (data.preReserved) {
      book.borrowCopy();
    }
    return book;
  }

  static createFiction({ title, author, isbn, publishYear, copies }) {
    return this.create({
      title,
      author,
      isbn,
      category: BookCategory.FICTION,
      publishYear,
      copies,
    });
  }

  static createScience({ title, author, isbn, publishYear, copies }) {
    return this.create({
      title,
      author,
      isbn,
      category: BookCategory.SCIENCE,
      publishYear,
      copies,
    });
  }

  static createTechnology({ title, author, isbn, publishYear, copies }) {
    return this.create({
      title,
      author,
      isbn,
      category: BookCategory.TECHNOLOGY,
      publishYear,
      copies,
    });
  }

  static createReference({ title, author, isbn, publishYear, copies }) {
    return this.create({
      title,
      author,
      isbn,
      category: BookCategory.REFERENCE,
      publishYear,
      copies,
    });
  }

  static #validateRequired(data) {
    const required = ['title', 'author', 'isbn', 'category', 'publishYear'];
    for (const field of required) {
      if (!data[field]) {
        warn(`BookFactory: Missing required field "${field}".`);
      }
    }
  }
}

export { BookFactory };