/**
 * Greedy Algorithm: O(N log N)
 * Sorts by end time to maximize remaining time for future tasks.
 */
function greedyTaskSelection(tasks) {
    if (tasks.length === 0) return [];

    // 1. Sort tasks by end time
    const sortedTasks = [...tasks].sort((a, b) => a.end - b.end);

    const selectedTasks = [];
    let lastEndTime = -1;

    for (const task of sortedTasks) {
        // 2. Select task if it starts after or at the last end time
        if (task.start >= lastEndTime) {
            selectedTasks.push(task);
            lastEndTime = task.end;
        }
    }

    return selectedTasks;
}




/**
 * Brute Force Algorithm: O(2^N)
 * Explores every possible subset of tasks.
 */
function bruteForceTaskSelection(tasks) {
    function findMax(index, lastEndTime) {
        if (index === tasks.length) return [];

        // Option 1: Skip the current task
        let resSkip = findMax(index + 1, lastEndTime);

        // Option 2: Include the current task (if it doesn't overlap)
        let resInclude = [];
        if (tasks[index].start >= lastEndTime) {
            resInclude = [tasks[index], ...findMax(index + 1, tasks[index].end)];
        }

        return resInclude.length > resSkip.length ? resInclude : resSkip;
    }

    return findMax(0, -1);
}