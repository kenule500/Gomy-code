import { generateId } from '../utils/id-generator.js';
import { required } from '../utils/validator.js';

const LoanStatus = Object.freeze({
  ACTIVE: 'active',
  RETURNED: 'returned',
  OVERDUE: 'overdue',
  LOST: 'lost',
});

class Loan {
  #id;
  #bookId;
  #userId;
  #borrowDate;
  #dueDate;
  #returnDate;
  #status;
  #finePerDay;

  constructor({ bookId, userId, borrowDate, dueDate, finePerDay = 0.5 }) {
    this.#id = generateId('LN');
    required(bookId, 'Book ID');
    required(userId, 'User ID');
    required(dueDate, 'Due date');

    this.#bookId = bookId;
    this.#userId = userId;
    this.#borrowDate = borrowDate || new Date();
    this.#dueDate = dueDate;
    this.#returnDate = null;
    this.#status = LoanStatus.ACTIVE;
    this.#finePerDay = finePerDay;
  }

  get id() {
    return this.#id;
  }
  get bookId() {
    return this.#bookId;
  }
  get userId() {
    return this.#userId;
  }
  get borrowDate() {
    return this.#borrowDate;
  }
  get dueDate() {
    return this.#dueDate;
  }
  get returnDate() {
    return this.#returnDate;
  }
  get status() {
    return this.#status;
  }
  get finePerDay() {
    return this.#finePerDay;
  }

  get isOverdue() {
    if (this.#status === LoanStatus.RETURNED) return false;
    return new Date() > new Date(this.#dueDate);
  }

  get daysOverdue() {
    return this.isOverdue
      ? Math.max(1, Math.ceil((new Date() - new Date(this.#dueDate)) / (1000 * 60 * 60 * 24)))
      : 0;
  }

  calculateFine() {
    if (!this.isOverdue) return 0;
    return parseFloat((this.daysOverdue * this.#finePerDay).toFixed(2));
  }

  returnBook(returnDate) {
    this.#returnDate = returnDate || new Date();
    this.#status = LoanStatus.RETURNED;
  }

  markLost() {
    this.#status = LoanStatus.LOST;
  }

  markOverdue() {
    if (this.#status === LoanStatus.ACTIVE && this.isOverdue) {
      this.#status = LoanStatus.OVERDUE;
    }
  }

  toJSON() {
    return {
      id: this.#id,
      bookId: this.#bookId,
      userId: this.#userId,
      borrowDate: this.#borrowDate,
      dueDate: this.#dueDate,
      returnDate: this.#returnDate,
      status: this.#status,
      finePerDay: this.#finePerDay,
      isOverdue: this.isOverdue,
      daysOverdue: this.daysOverdue,
      calculatedFine: this.calculateFine(),
    };
  }
}

export { Loan, LoanStatus };