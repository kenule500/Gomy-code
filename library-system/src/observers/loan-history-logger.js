import { debug } from '../utils/logger.js';

class LoanHistoryLogger {
  #eventEmitter;
  #history = [];

  constructor(eventEmitter) {
    this.#eventEmitter = eventEmitter;
  }

  init() {
    this.#eventEmitter.on('book:borrowed', this.#logBorrow.bind(this));
    this.#eventEmitter.on('book:returned', this.#logReturn.bind(this));
    this.#eventEmitter.on('book:overdue', this.#logOverdue.bind(this));
  }

  #logBorrow({ user, book, loan }) {
    const entry = {
      type: 'borrow',
      userId: user.id,
      userName: user.name,
      bookId: book.id,
      bookTitle: book.title,
      loanId: loan.id,
      dueDate: loan.dueDate,
      timestamp: new Date().toISOString(),
    };
    this.#history.push(entry);
    debug(`LoanHistoryLogger: ${user.name} borrowed "${book.title}" (${loan.id})`);
  }

  #logReturn({ user, book, loan, daysLate, fine }) {
    const entry = {
      type: 'return',
      userId: user.id,
      userName: user.name,
      bookId: book.id,
      bookTitle: book.title,
      loanId: loan.id,
      daysLate,
      fine,
      timestamp: new Date().toISOString(),
    };
    this.#history.push(entry);
    debug(`LoanHistoryLogger: ${user.name} returned "${book.title}"`);
  }

  #logOverdue({ user, book, loan }) {
    const entry = {
      type: 'overdue',
      userId: user.id,
      userName: user.name,
      bookId: book.id,
      bookTitle: book.title,
      loanId: loan.id,
      daysOverdue: loan.daysOverdue,
      fine: loan.calculateFine(),
      timestamp: new Date().toISOString(),
    };
    this.#history.push(entry);
    debug(`LoanHistoryLogger: Overdue "${book.title}" — ${user.name}`);
  }

  getHistory() {
    return [...this.#history];
  }

  getHistoryForUser(userId) {
    return this.#history.filter((e) => e.userId === userId);
  }

  getHistoryForBook(bookId) {
    return this.#history.filter((e) => e.bookId === bookId);
  }
}

export { LoanHistoryLogger };