// ===============================
// 1. ABSTRACT USER CLASS (using JavaScript's abstract pattern)
// ===============================
class User {
  constructor(id, name, email) {
    if (this.constructor === User) {
      throw new Error("Abstract class 'User' cannot be instantiated directly.");
    }
    this.id = id;
    this.name = name;
    this.email = email;
    this.borrowedBooks = [];      // list of book IDs currently borrowed
    this.notifications = [];      // for Observer pattern
  }

  // Abstract method (to be overridden)
  getMaxBorrowLimit() {
    throw new Error("Abstract method 'getMaxBorrowLimit()' must be implemented.");
  }

  borrowBook(bookId) {
    if (this.borrowedBooks.length >= this.getMaxBorrowLimit()) {
      console.log(`❌ ${this.name} cannot borrow more than ${this.getMaxBorrowLimit()} books.`);
      return false;
    }
    this.borrowedBooks.push(bookId);
    console.log(`✅ ${this.name} borrowed book ${bookId}.`);
    return true;
  }

  returnBook(bookId) {
    const index = this.borrowedBooks.indexOf(bookId);
    if (index !== -1) {
      this.borrowedBooks.splice(index, 1);
      console.log(`📚 ${this.name} returned book ${bookId}.`);
      return true;
    }
    console.log(`⚠️ ${this.name} does not have book ${bookId} borrowed.`);
    return false;
  }

  getBorrowedBooks() {
    return [...this.borrowedBooks];
  }

  // Observer pattern: receive notification
  notify(message) {
    this.notifications.push(message);
    console.log(`📧 Notification sent to ${this.name} (${this.email}): ${message}`);
  }
}

// ===============================
// 2. CONCRETE USER CLASSES
// ===============================
class Student extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  getMaxBorrowLimit() {
    return 3;   // Students can borrow max 3 books
  }
}

class Teacher extends User {
  constructor(id, name, email) {
    super(id, name, email);
  }

  getMaxBorrowLimit() {
    return 10;  // Teachers can borrow up to 10 books
  }
}

// ===============================
// 3. BOOK CLASS
// ===============================
class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isAvailable = true;
  }
}

// ===============================
// 4. BORROW TRANSACTION CLASS
// ===============================
class BorrowTransaction {
  constructor(id, bookId, userId, borrowDate, dueDate) {
    this.id = id;
    this.bookId = bookId;
    this.userId = userId;
    this.borrowDate = borrowDate;
    this.dueDate = dueDate;
    this.returnDate = null;
  }

  isOverdue(currentDate = new Date()) {
    return this.returnDate === null && currentDate > this.dueDate;
  }

  markReturned(returnDate = new Date()) {
    this.returnDate = returnDate;
  }
}

// ===============================
// 5. FACTORY PATTERN (UserFactory)
// ===============================
class UserFactory {
  static createUser(type, id, name, email) {
    switch (type.toLowerCase()) {
      case 'student':
        return new Student(id, name, email);
      case 'teacher':
        return new Teacher(id, name, email);
      default:
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

// ===============================
// 6. OBSERVER PATTERN (NotificationService)
// ===============================
class NotificationService {
  constructor() {
    this.observers = []; // list of users to notify
  }

  subscribe(user) {
    this.observers.push(user);
    console.log(`🔔 ${user.name} subscribed to notifications.`);
  }

  unsubscribe(user) {
    const index = this.observers.findIndex(obs => obs.id === user.id);
    if (index !== -1) this.observers.splice(index, 1);
  }

  notifyAll(message) {
    this.observers.forEach(observer => observer.notify(message));
  }
}

// ===============================
// 7. SINGLETON PATTERN (LibrarySystem)
// ===============================
class LibrarySystem {
  static instance = null;

  constructor() {
    if (LibrarySystem.instance) {
      return LibrarySystem.instance;
    }
    this.books = new Map();       // bookId -> Book object
    this.users = new Map();       // userId -> User object
    this.transactions = [];       // list of BorrowTransaction
    this.transactionCounter = 1;
    this.notificationService = new NotificationService();
    LibrarySystem.instance = this;
  }

  static getInstance() {
    if (!LibrarySystem.instance) {
      LibrarySystem.instance = new LibrarySystem();
    }
    return LibrarySystem.instance;
  }

  // Add a book
  addBook(book) {
    this.books.set(book.id, book);
    console.log(`📖 Book "${book.title}" added to library.`);
  }

  // Add a user
  addUser(user) {
    this.users.set(user.id, user);
    console.log(`👤 User "${user.name}" (${user.constructor.name}) added.`);
    // Automatically subscribe user to overdue notifications
    this.notificationService.subscribe(user);
  }

  // Borrow a book
  borrowBook(userId, bookId) {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user) {
      console.log(`❌ User ${userId} not found.`);
      return false;
    }
    if (!book) {
      console.log(`❌ Book ${bookId} not found.`);
      return false;
    }
    if (!book.isAvailable) {
      console.log(`❌ Book "${book.title}" is already borrowed.`);
      return false;
    }

    // Check user's borrowing limit
    if (user.borrowedBooks.length >= user.getMaxBorrowLimit()) {
      console.log(`❌ ${user.name} has reached borrow limit (${user.getMaxBorrowLimit()}).`);
      return false;
    }

    // Proceed with borrowing
    const borrowDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(borrowDate.getDate() + 14); // 14 days loan period

    const transaction = new BorrowTransaction(
      this.transactionCounter++,
      bookId,
      userId,
      borrowDate,
      dueDate
    );
    this.transactions.push(transaction);

    book.isAvailable = false;
    user.borrowBook(bookId);

    console.log(`✅ ${user.name} borrowed "${book.title}". Due: ${dueDate.toDateString()}`);
    return true;
  }

  // Return a book
  returnBook(userId, bookId) {
    const user = this.users.get(userId);
    const book = this.books.get(bookId);

    if (!user || !book) {
      console.log(`❌ User or book not found.`);
      return false;
    }

    // Find active transaction
    const transaction = this.transactions.find(
      t => t.bookId === bookId && t.userId === userId && t.returnDate === null
    );
    if (!transaction) {
      console.log(`❌ No active borrowing record for book "${book.title}" by ${user.name}.`);
      return false;
    }

    transaction.markReturned();
    book.isAvailable = true;
    user.returnBook(bookId);

    // Check if overdue
    if (transaction.isOverdue()) {
      const overdueDays = Math.floor((new Date() - transaction.dueDate) / (1000 * 60 * 60 * 24));
      const message = `Book "${book.title}" is ${overdueDays} days overdue. Please return it.`;
      // Notify only this user via Observer
      user.notify(message);
    }

    console.log(`✅ ${user.name} returned "${book.title}".`);
    return true;
  }

  // View borrowed books of a user
  viewBorrowedBooks(userId) {
    const user = this.users.get(userId);
    if (!user) {
      console.log(`❌ User ${userId} not found.`);
      return;
    }
    const borrowedIds = user.getBorrowedBooks();
    if (borrowedIds.length === 0) {
      console.log(`📭 ${user.name} has no borrowed books.`);
      return;
    }
    console.log(`📚 Books borrowed by ${user.name}:`);
    borrowedIds.forEach(bookId => {
      const book = this.books.get(bookId);
      if (book) console.log(`   - ${book.title} by ${book.author}`);
    });
  }

  // Simulate overdue check and notify all subscribed users
  checkOverdueBooks() {
    const overdueTransactions = this.transactions.filter(t => t.isOverdue());
    if (overdueTransactions.length === 0) {
      console.log("✅ No overdue books.");
      return;
    }
    overdueTransactions.forEach(transaction => {
      const user = this.users.get(transaction.userId);
      const book = this.books.get(transaction.bookId);
      if (user && book) {
        const overdueDays = Math.floor((new Date() - transaction.dueDate) / (1000 * 60 * 60 * 24));
        const message = `REMINDER: "${book.title}" is ${overdueDays} day(s) overdue. Please return.`;
        user.notify(message);
      }
    });
  }
}

// ===============================
// 8. DEMONSTRATION / TESTING
// ===============================
function runDemo() {
  const library = LibrarySystem.getInstance();

  // Create users using Factory Pattern
  const student1 = UserFactory.createUser("student", "S101", "Alice Johnson", "alice@example.com");
  const teacher1 = UserFactory.createUser("teacher", "T201", "Dr. Smith", "smith@uni.edu");

  // Add users to system
  library.addUser(student1);
  library.addUser(teacher1);

  // Create books
  const book1 = new Book("B001", "JavaScript: The Good Parts", "Douglas Crockford");
  const book2 = new Book("B002", "Clean Code", "Robert C. Martin");
  const book3 = new Book("B003", "Design Patterns", "Erich Gamma");

  // Add books
  library.addBook(book1);
  library.addBook(book2);
  library.addBook(book3);

  // Borrow books
  library.borrowBook("S101", "B001");  // Alice borrows JS book
  library.borrowBook("S101", "B002");  // Alice borrows Clean Code
  library.borrowBook("T201", "B003");  // Dr. Smith borrows Design Patterns

  // Try to exceed limit (Student max 3, she has 2 so far)
  library.borrowBook("S101", "B003");  // This should succeed (3rd book)
  library.borrowBook("S101", "B001");  // Already borrowed - fails

  // View borrowed books
  library.viewBorrowedBooks("S101");
  library.viewBorrowedBooks("T201");

  // Simulate returning a book
  library.returnBook("S101", "B001");

  // Check for overdue (simulate by manually changing date? We'll just call)
  library.checkOverdueBooks();

  // Return another
  library.returnBook("S101", "B002");

  // Show that notifications were stored
  console.log("\n📬 Notifications received:");
  student1.notifications.forEach((msg, i) => console.log(`   ${i+1}. ${msg}`));
}

// Run the demo
runDemo();