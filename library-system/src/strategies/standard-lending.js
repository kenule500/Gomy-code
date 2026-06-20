import { LendingStrategy } from './lending-strategy.js';

class StandardLending extends LendingStrategy {
  constructor() {
    super({
      loanDurationDays: 14,
      finePerDay: 0.5,
      allowReserve: true,
    });
  }
}

export { StandardLending };