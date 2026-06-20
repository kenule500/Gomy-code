import { generateId } from '../utils/id-generator.js';
import { required, email as validateEmail } from '../utils/validator.js';

const UserRole = Object.freeze({
  STUDENT: 'student',
  STAFF: 'staff',
  PREMIUM: 'premium',
});

const MAX_BORROW_LIMITS = {
  [UserRole.STUDENT]: 3,
  [UserRole.STAFF]: 7,
  [UserRole.PREMIUM]: 10,
};

class User {
  #id;
  #name;
  #email;
  #role;
  #borrowedBooks;
  #notifications;
  #fine;

  constructor({ name, email, role = UserRole.STUDENT }) {
    this.#id = generateId('USR');
    required(name, 'Name');
    validateEmail(email);

    this.#name = name;
    this.#email = email;
    this.#role = role;
    this.#borrowedBooks = [];
    this.#notifications = [];
    this.#fine = 0;
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get email() {
    return this.#email;
  }
  get role() {
    return this.#role;
  }
  get borrowedBooks() {
    return [...this.#borrowedBooks];
  }
  get notifications() {
    return [...this.#notifications];
  }
  get fine() {
    return this.#fine;
  }

  getMaxBorrowLimit() {
    return MAX_BORROW_LIMITS[this.#role] ?? 3;
  }

  canBorrow() {
    return this.#borrowedBooks.length < this.getMaxBorrowLimit() && this.#fine === 0;
  }

  addBorrowedBook(loanId) {
    this.#borrowedBooks.push(loanId);
  }

  removeBorrowedBook(loanId) {
    const idx = this.#borrowedBooks.indexOf(loanId);
    if (idx !== -1) this.#borrowedBooks.splice(idx, 1);
  }

  addFine(amount) {
    this.#fine += amount;
    console.log(`\u26a0\ufe0f Fine of $${amount.toFixed(2)} added to ${this.#name}. Total: $${this.#fine.toFixed(2)}`);
  }

  clearFine() {
    this.#fine = 0;
  }

  notify(message) {
    this.#notifications.push({ message, timestamp: new Date().toISOString() });
    console.log(`\u{1f4e7} Notification to ${this.#name} (${this.#email}): ${message}`);
  }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      role: this.#role,
      borrowedBooks: this.#borrowedBooks,
      fine: this.#fine,
    };
  }
}

export { User, UserRole, MAX_BORROW_LIMITS };