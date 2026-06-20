class LendingStrategy {
  constructor(config = {}) {
    this.loanDurationDays = config.loanDurationDays ?? 14;
    this.finePerDay = config.finePerDay ?? 0.5;
    this.allowReserve = config.allowReserve ?? true;
  }

  getLoanDurationDays() {
    return this.loanDurationDays;
  }

  getFinePerDay() {
    return this.finePerDay;
  }

  canReserve() {
    return this.allowReserve;
  }

  getDueDate() {
    const due = new Date();
    due.setDate(due.getDate() + this.loanDurationDays);
    return due;
  }
}

export { LendingStrategy };