/**
 * Contact Management System
 * This script implements a Doubly Linked List and a Hash Table (Map)
 * to manage contacts for Speakeet or BRCA projects.
 */

class ContactNode {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
    this.prev = null;
    this.next = null;
  }
}

class ContactManager {
  constructor() {
    this.head = null;
    this.tail = null;
    this.hashTable = new Map(); // Using JS Map as a Hash Table
  }

  // 1. Add Contact
  addContact(name, phone) {
    const newNode = new ContactNode(name, phone);

    // Store in Hash Table for O(1) lookup
    this.hashTable.set(name.toLowerCase(), newNode);

    // Store in Doubly Linked List for ordering
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    console.log(`Contact Added: ${name}`);
  }

  // 2. Search by Keyword (Substring Match)
  searchByKeyword(keyword) {
    console.log(`\nSearching for keyword: "${keyword}"`);
    let current = this.head;
    let found = false;
    const kw = keyword.toLowerCase();

    while (current) {
      if (current.name.toLowerCase().includes(kw)) {
        console.log(`Match found: ${current.name} - ${current.phone}`);
        found = true;
      }
      current = current.next;
    }
    if (!found) console.log("No matches found.");
  }

  // 3. Search by Exact Name (Hash Table Lookup)
  searchByName(name) {
    console.log(`\nPerforming exact lookup for: "${name}"`);
    const contact = this.hashTable.get(name.toLowerCase());
    if (contact) {
      console.log(`Result: ${contact.name} - ${contact.phone}`);
    } else {
      console.log("Contact not found in Hash Table.");
    }
  }

  // 4. Display All (Forward and Backward)
  displayAll(reverse = false) {
    console.log(`\n--- Displaying Contacts (${reverse ? "Backward" : "Forward"}) ---`);
    let current = reverse ? this.tail : this.head;
    
    if (!current) {
      console.log("List is empty.");
      return;
    }

    while (current) {
      console.log(`${current.name}: ${current.phone}`);
      current = reverse ? current.prev : current.next;
    }
  }
}

// --- Task Execution ---
const manager = new ContactManager();

// Adding sample contacts
manager.addContact("Alice", "123-456-7890");
manager.addContact("Bob", "987-654-3210");
manager.addContact("Alphonso", "555-0199");

// Searching
manager.searchByKeyword("Al"); // Should find Alice and Alphonso
manager.searchByName("Bob");    // Instant lookup

// Viewing orders
manager.displayAll(false); // Forward
manager.displayAll(true);  // Backward