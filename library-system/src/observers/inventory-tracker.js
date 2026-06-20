import { info, warn } from '../utils/logger.js';

class InventoryTracker {
  #eventEmitter;

  constructor(eventEmitter) {
    this.#eventEmitter = eventEmitter;
  }

  init() {
    this.#eventEmitter.on('book:borrowed', this.#onBorrowed.bind(this));
    this.#eventEmitter.on('book:returned', this.#onReturned.bind(this));
    this.#eventEmitter.on('new:book', this.#onNewBook.bind(this));
    this.#eventEmitter.on('book:low-stock', this.#onLowStock.bind(this));
  }

  #onBorrowed({ book }) {
    info(`InventoryTracker: "${book.title}" — ${book.availableCopies}/${book.copies} copies available.`);
    if (book.availableCopies <= 1 && book.copies > 1) {
      warn(`InventoryTracker: Low stock alert for "${book.title}"!`);
      this.#eventEmitter.emit('book:low-stock', { book });
    }
  }

  #onReturned({ book }) {
    info(`InventoryTracker: "${book.title}" returned — ${book.availableCopies}/${book.copies} available.`);
  }

  #onNewBook({ book }) {
    info(`InventoryTracker: "${book.title}" added to inventory (${book.copies} copies).`);
  }

  #onLowStock({ book }) {
    warn(`InventoryTracker: "${book.title}" has only ${book.availableCopies} copy left.`);
  }
}

export { InventoryTracker };