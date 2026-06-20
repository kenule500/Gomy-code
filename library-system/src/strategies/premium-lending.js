import { LendingStrategy } from './lending-strategy.js';

class PremiumLending extends LendingStrategy {
  constructor() {
    super({
      loanDurationDays: 30,
      finePerDay: 0.25,
      allowReserve: true,
    });
  }
}

export { PremiumLending };