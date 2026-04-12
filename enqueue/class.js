// 1. The Queue Class
class Queue {
    constructor() {
        this.items = [];
    }

    // Add a job to the back of the line
    enqueue(element) {
        this.items.push(element);
    }

    // Remove the job from the front of the line
    dequeue() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items.shift();
    }

    // Look at the next job without removing it
    peek() {
        if (this.isEmpty()) return "Queue is empty";
        return this.items[0];
    }

    // Check if there are any jobs left
    isEmpty() {
        return this.items.length === 0;
    }

    // Get all current jobs
    display() {
        return this.items;
    }
}

// 2. The PrinterQueue Class

class PrinterQueue {
    constructor() {
        this.queue = new Queue();
    }

    // Add a specific print job
    addJob(documentName, pages) {
        const job = { name: documentName, pages: pages };
        console.log(`Adding to queue: ${documentName} (${pages} pages)`);
        this.queue.enqueue(job);
    }

    // Process the next job in line
    processJob() {
        if (this.queue.isEmpty()) {
            console.log("No jobs to process.");
            return;
        }
        const currentJob = this.queue.dequeue();
        console.log(`Printing: ${currentJob.name}... Done.`);
    }

    // Show what is currently waiting
    printCurrentQueue() {
        if (this.queue.isEmpty()) {
            console.log("The printer queue is currently empty.");
        } else {
            console.log("--- Current Printer Queue ---");
            this.queue.display().forEach((job, index) => {
                console.log(`${index + 1}. ${job.name} - ${job.pages} pages`);
            });
            console.log("-----------------------------");
        }
    }
}

// 3. Testing the Simulation
const myOfficePrinter = new PrinterQueue();

// Adding jobs
myOfficePrinter.addJob("Quarterly_Report.pdf", 15);
myOfficePrinter.addJob("Meeting_Notes.docx", 2);
myOfficePrinter.addJob("Employee_Contract.pdf", 5);

// View the queue
myOfficePrinter.printCurrentQueue();

// Process the first job (Quarterly Report)
myOfficePrinter.processJob();

// Check the queue again to see it moved up
myOfficePrinter.printCurrentQueue();

// Process the remaining jobs
myOfficePrinter.processJob();
myOfficePrinter.processJob();

// Try to process when empty
myOfficePrinter.processJob();