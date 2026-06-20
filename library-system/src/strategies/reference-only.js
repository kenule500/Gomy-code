import { LendingStrategy } from './lending-strategy.js';

class ReferenceOnly extends LendingStrategy {
  constructor() {
    super({
      loanDurationDays: 0,
      finePerDay: 0,
      allowReserve: false,
    });
  }

  getDueDate() {
    return null;
  }
}

export { ReferenceOnly };