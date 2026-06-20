import { EventEmitter } from './core/event-emitter.js';
import { Repository } from './core/repository.js';
import { LibraryService } from './services/library-service.js';
import { NotificationService } from './observers/notification-service.js';
import { InventoryTracker } from './observers/inventory-tracker.js';
import { LoanHistoryLogger } from './observers/loan-history-logger.js';
import { BookFactory } from './factories/book-factory.js';
import { UserFactory } from './factories/user-factory.js';
import { BookCategory } from './models/book.js';
import { UserRole } from './models/user.js';
import { setLogLevel, LogLevel } from './utils/logger.js';

setLogLevel(LogLevel.INFO);

function main() {
  console.log('\n========================================');
  console.log('  LIBRARY MANAGEMENT SYSTEM — DEMO');
  console.log('========================================\n');

  const eventEmitter = new EventEmitter();
  const bookRepo = new Repository('id');
  const userRepo = new Repository('id');
  const loanRepo = new Repository('id');

  const notificationService = new NotificationService(eventEmitter);
  const inventoryTracker = new InventoryTracker(eventEmitter);
  const loanHistoryLogger = new LoanHistoryLogger(eventEmitter);

  notificationService.init();
  inventoryTracker.init();
  loanHistoryLogger.init();

  const library = new LibraryService({
    bookRepo,
    userRepo,
    loanRepo,
    eventEmitter,
  });

  // ── REGISTER USERS ──
  console.log('── Registering Users ──\n');

  const alice = library.registerUser(
    { name: 'Alice Johnson', email: 'alice@example.com' },
    UserFactory
  );
  const bob = library.registerUser(
    { name: 'Bob Smith', email: 'bob@example.com' },
    UserFactory
  );
  const drLee = library.registerUser(
    { name: 'Dr. Lee Carter', email: 'lee.carter@edu.org', role: UserRole.STAFF },
    UserFactory
  );
  const vipEve = library.registerUser(
    { name: 'Eve Premium', email: 'eve@premium.com', role: UserRole.PREMIUM },
    UserFactory
  );

  console.log(`\n  Roles & Borrow Limits:`);
  console.log(`    Alice  (${alice.role})  — max ${alice.getMaxBorrowLimit()} books`);
  console.log(`    Bob    (${bob.role})    — max ${bob.getMaxBorrowLimit()} books`);
  console.log(`    Dr.Lee (${drLee.role})   — max ${drLee.getMaxBorrowLimit()} books`);
  console.log(`    Eve    (${vipEve.role}) — max ${vipEve.getMaxBorrowLimit()} books`);

  // ── ADD BOOKS ──
  console.log('\n── Adding Books to Catalog ──\n');

  const books = [
    library.addBook(
      { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: BookCategory.TECHNOLOGY, publishYear: 2008, copies: 3 },
      BookFactory
    ),
    library.addBook(
      { title: 'Design Patterns', author: 'Gang of Four', isbn: '9780201633610', category: BookCategory.TECHNOLOGY, publishYear: 1994, copies: 2 },
      BookFactory
    ),
    library.addBook(
      { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', category: BookCategory.SCIENCE, publishYear: 1988, copies: 2 },
      BookFactory
    ),
    library.addBook(
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', category: BookCategory.FICTION, publishYear: 1925, copies: 4 },
      BookFactory
    ),
    library.addBook(
      { title: 'Encyclopedia Britannica', author: 'Various', isbn: '9781593392925', category: BookCategory.REFERENCE, publishYear: 2010, copies: 1 },
      BookFactory
    ),
    library.addBook(
      { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', category: BookCategory.NON_FICTION, publishYear: 2011, copies: 3 },
      BookFactory
    ),
  ];

  console.log(`\n  ${books.length} books in catalog.`);

  // ── BORROW BOOKS ──
  console.log('\n── Borrowing Books ──\n');

  library.borrowBook(alice.id, books[0].id);
  library.borrowBook(alice.id, books[2].id);
  library.borrowBook(alice.id, books[3].id);

  library.borrowBook(bob.id, books[0].id);
  library.borrowBook(bob.id, books[1].id);
  library.borrowBook(bob.id, books[5].id);

  library.borrowBook(drLee.id, books[1].id);
  library.borrowBook(drLee.id, books[2].id);
  library.borrowBook(drLee.id, books[3].id);

  library.borrowBook(vipEve.id, books[0].id);
  library.borrowBook(vipEve.id, books[1].id);
  library.borrowBook(vipEve.id, books[5].id);

  // ── REFERENCE BOOK: borrow attempt should fail ──
  console.log('\n── Attempting to Borrow Reference Book ──\n');
  library.borrowBook(alice.id, books[4].id);

  // ── BORROW LIMIT: Alice at max ──
  console.log('\n── Attempting to Exceed Borrow Limit ──\n');
  library.borrowBook(alice.id, books[5].id);

  // ── RETURN BOOKS ──
  console.log('\n── Returning Books ──\n');

  const aliceLoans = library.getUserLoans(alice.id);
  library.returnBook(alice.id, aliceLoans[0].id);
  library.returnBook(alice.id, aliceLoans[1].id);

  // ── CHECK AVAILABLE ──
  console.log('\n── Available Books ──\n');
  const available = library.getAvailableBooks();
  available.forEach((b) => console.log(`  "${b.title}" — ${b.availableCopies}/${b.copies} copies`));

  // ── LOAN HISTORY ──
  console.log('\n── Loan History ──\n');
  const history = loanHistoryLogger.getHistory();
  history.forEach((entry) => {
    console.log(`  [${entry.type.toUpperCase()}] ${entry.userName} — "${entry.bookTitle}" at ${entry.timestamp.slice(0, 19)}`);
  });

  // ── ALICE'S NOTIFICATIONS ──
  console.log(`\n── Alice's Notifications (${alice.notifications.length}) ──\n`);
  alice.notifications.forEach((n, i) => {
    console.log(`  ${i + 1}. ${n.message}`);
  });

  console.log('\n========================================');
  console.log('  DEMO COMPLETE');
  console.log('========================================\n');
}

main();