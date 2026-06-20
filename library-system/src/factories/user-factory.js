import { User, UserRole } from '../models/user.js';

class UserFactory {
  static create(data) {
    return new User(data);
  }

  static createStudent({ name, email }) {
    return new User({ name, email, role: UserRole.STUDENT });
  }

  static createStaff({ name, email }) {
    return new User({ name, email, role: UserRole.STAFF });
  }

  static createPremium({ name, email }) {
    return new User({ name, email, role: UserRole.PREMIUM });
  }
}

export { UserFactory };