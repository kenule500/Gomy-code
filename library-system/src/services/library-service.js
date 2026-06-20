import { StandardLending } from '../strategies/standard-lending.js';
import { PremiumLending } from '../strategies/premium-lending.js';
import { ReferenceOnly } from '../strategies/reference-only.js';
import { BookCategory } from '../models/book.js';
import { UserRole } from '../models/user.js';
import { LoanFactory } from '../factories/loan-factory.js';
import { info, warn } from '../utils/logger.js';

class LibraryService {
  #bookRepo;
  #userRepo;
  #loanRepo;
  #eventEmitter;
  #lendingStrategies;

  constructor({ bookRepo, userRepo, loanRepo, eventEmitter }) {
    this.#bookRepo = bookRepo;
    this.#userRepo = userRepo;
    this.#loanRepo = loanRepo;
    this.#eventEmitter = eventEmitter;

    this.#lendingStrategies = new Map();
    this.#lendingStrategies.set(BookCategory.REFERENCE, new ReferenceOnly());
    this.#lendingStrategies.set('premium', new PremiumLending());
    this.#lendingStrategies.set('default', new StandardLending());
  }

  setLendingStrategy(categoryOrKey, strategy) {
    this.#lendingStrategies.set(categoryOrKey, strategy);
  }

  #getStrategy(book, user) {
    if (user.role === UserRole.PREMIUM) {
      return this.#lendingStrategies.get('premium');
    }
    return this.#lendingStrategies.get(book.category) ?? this.#lendingStrategies.get('default');
  }

  addBook(bookData, factory) {
    const book = factory.create(bookData);
    this.#bookRepo.save(book);
    this.#eventEmitter.emit('new:book', { book });
    info(`LibraryService: Added "${book.title}" to catalog.`);
    return book;
  }

  registerUser(userData, factory) {
    const user = factory.create(userData);
    this.#userRepo.save(user);
    info(`LibraryService: Registered user "${user.name}" (${user.role}).`);
    return user;
  }

  borrowBook(userId, bookId) {
    const user = this.#userRepo.findById(userId);
    if (!user) {
      warn(`LibraryService: User "${userId}" not found.`);
      return null;
    }

    const book = this.#bookRepo.findById(bookId);
    if (!book) {
      warn(`LibraryService: Book "${bookId}" not found.`);
      return null;
    }

    const strategy = this.#getStrategy(book, user);

    if (strategy instanceof ReferenceOnly) {
      warn(`LibraryService: "${book.title}" is reference-only — cannot borrow.`);
      user.notify(`"${book.title}" is reference-only and cannot leave the library.`);
      return null;
    }

    if (!user.canBorrow()) {
      warn(`LibraryService: ${user.name} cannot borrow (limit reached or has fines).`);
      return null;
    }

    if (!book.isAvailable) {
      warn(`LibraryService: "${book.title}" has no copies available.`);
      return null;
    }

    const dueDate = strategy.getDueDate();
    const loan = LoanFactory.create({
      bookId: book.id,
      userId: user.id,
      dueDate,
      finePerDay: strategy.getFinePerDay(),
    });

    book.borrowCopy();
    user.addBorrowedBook(loan.id);

    this.#loanRepo.save(loan);
    this.#bookRepo.update(book.id, book);
    this.#userRepo.update(user.id, user);

    this.#eventEmitter.emit('book:borrowed', { user, book, loan, dueDate });
    console.log(`\u2705 ${user.name} borrowed "${book.title}". Due: ${dueDate.toISOString().slice(0, 10)}`);
    return loan;
  }

  returnBook(userId, loanId) {
    const user = this.#userRepo.findById(userId);
    if (!user) {
      warn(`LibraryService: User "${userId}" not found.`);
      return false;
    }

    const loan = this.#loanRepo.findById(loanId);
    if (!loan) {
      warn(`LibraryService: Loan "${loanId}" not found.`);
      return false;
    }

    const book = this.#bookRepo.findById(loan.bookId);
    if (!book) {
      warn(`LibraryService: Book "${loan.bookId}" not found.`);
      return false;
    }

    loan.markOverdue();
    const daysLate = loan.daysOverdue;
    const fine = loan.calculateFine();

    loan.returnBook();
    book.returnCopy();
    user.removeBorrowedBook(loan.id);

    if (fine > 0) {
      user.addFine(fine);
      this.#eventEmitter.emit('fine:added', { user, amount: fine, reason: `Late return of "${book.title}"` });
    }

    this.#loanRepo.update(loan.id, loan);
    this.#bookRepo.update(book.id, book);
    this.#userRepo.update(user.id, user);

    this.#eventEmitter.emit('book:returned', { user, book, loan, daysLate, fine });
    const lateMsg = daysLate > 0 ? ` (${daysLate} days late, fine: $${fine.toFixed(2)})` : '';
    console.log(`\u{1f4da} ${user.name} returned "${book.title}".${lateMsg}`);
    return true;
  }

  checkOverdueLoans() {
    const allLoans = this.#loanRepo.findAll((l) => l.status !== 'returned');
    for (const loan of allLoans) {
      if (loan.isOverdue && loan.status !== 'overdue') {
        const user = this.#userRepo.findById(loan.userId);
        const book = this.#bookRepo.findById(loan.bookId);
        loan.markOverdue();
        this.#loanRepo.update(loan.id, loan);
        if (user && book) {
          this.#eventEmitter.emit('book:overdue', { user, book, loan });
          console.log(`\u23f0 OVERDUE: "${book.title}" — ${user.name} (${loan.daysOverdue} days)`);
        }
      }
    }
  }

  getAvailableBooks() {
    return this.#bookRepo.findAll((b) => b.availableCopies > 0);
  }

  getCatalog() {
    return this.#bookRepo.findAll();
  }

  getUserLoans(userId) {
    return this.#loanRepo.findAll((l) => l.userId === userId);
  }

  getBook(id) {
    return this.#bookRepo.findById(id);
  }

  getUser(id) {
    return this.#userRepo.findById(id);
  }
}

export { LibraryService };