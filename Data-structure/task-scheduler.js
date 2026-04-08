/**
 * Task Scheduler Class
 */
class TaskScheduler {
  constructor() {
    this.tasks = [];
  }

  // Add a task: O(1) time
  addTask(name, start, end, priority) {
    this.tasks.push({ name, start, end, priority });
  }

  // 1. Sort tasks by start time: O(N log N) time
  sortTasks() {
    // Array.prototype.sort uses Timsort (hybrid of Merge Sort/Insertion Sort)
    this.tasks.sort((a, b) => a.start - b.start);
    return this.tasks;
  }

  // 2. Group tasks by priority using a Hash Map: O(N) time
  groupByPriority() {
    const priorityMap = {};
    
    for (const task of this.tasks) {
      if (!priorityMap[task.priority]) {
        priorityMap[task.priority] = [];
      }
      priorityMap[task.priority].push(task);
    }
    return priorityMap;
  }

  // 3. Detect Overlapping Tasks: O(N log N) due to sorting, O(N) for scan
  detectOverlaps() {
    // Step 1: Ensure tasks are sorted by start time first
    this.sortTasks();
    
    const overlaps = [];
    
    // Step 2: Compare each task to the one immediately following it
    for (let i = 0; i < this.tasks.length - 1; i++) {
      let current = this.tasks[i];
      let next = this.tasks[i + 1];
      
      // If the next task starts before the current one ends, they overlap
      if (next.start < current.end) {
        overlaps.push({
          taskA: current.name,
          taskB: next.name,
          interval: `Overlap between ${current.end} and ${next.start}`
        });
      }
    }
    return overlaps;
  }

  // 4. (Optional) Estimate Memory Usage
  estimateMemory() {
    const taskCount = this.tasks.length;
    // Assuming approx 100 bytes per task object (metadata + strings)
    const estimatedBytes = taskCount * 100; 
    return `Estimated Memory: ${(estimatedBytes / 1024).toFixed(2)} KB for ${taskCount} tasks.`;
  }
}