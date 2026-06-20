import { Loan } from '../models/loan.js';

class LoanFactory {
  static create({ bookId, userId, dueDate, finePerDay }) {
    return new Loan({
      bookId,
      userId,
      borrowDate: new Date(),
      dueDate,
      finePerDay,
    });
  }
}

export { LoanFactory };