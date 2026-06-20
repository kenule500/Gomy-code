import { info } from '../utils/logger.js';

class NotificationService {
  #eventEmitter;

  constructor(eventEmitter) {
    this.#eventEmitter = eventEmitter;
  }

  init() {
    this.#eventEmitter.on('book:borrowed', this.#onBookBorrowed.bind(this));
    this.#eventEmitter.on('book:returned', this.#onBookReturned.bind(this));
    this.#eventEmitter.on('book:overdue', this.#onBookOverdue.bind(this));
    this.#eventEmitter.on('new:book', this.#onNewBook.bind(this));
    this.#eventEmitter.on('fine:added', this.#onFineAdded.bind(this));
  }

  #onBookBorrowed({ user, book, dueDate }) {
    info(`NotificationService: "${user.name}" borrowed "${book.title}". Due: ${dueDate.toISOString().slice(0, 10)}`);
    user.notify(`You borrowed "${book.title}". Due date: ${dueDate.toISOString().slice(0, 10)}`);
  }

  #onBookReturned({ user, book, daysLate, fine }) {
    const extra = daysLate > 0 ? ` (${daysLate} days late, fine: $${fine.toFixed(2)})` : '';
    user.notify(`You returned "${book.title}".${extra}`);
  }

  #onBookOverdue({ user, book, daysOverdue, fine }) {
    user.notify(`OVERDUE: "${book.title}" is ${daysOverdue} day(s) late. Fine: $${fine.toFixed(2)}`);
  }

  #onNewBook({ book }) {
    info(`NotificationService: New book added — "${book.title}" by ${book.author}`);
  }

  #onFineAdded({ user, amount, reason }) {
    user.notify(`Fine of $${amount.toFixed(2)} added: ${reason}`);
  }
}

export { NotificationService };