import { warn } from '../utils/logger.js';

class DIContainer {
  #registry = new Map();
  #instances = new Map();
  #factories = new Map();

  register(token, dependencies, factory) {
    if (this.#registry.has(token)) {
      warn(`DI: Overwriting registration for "${token}".`);
    }
    this.#registry.set(token, { dependencies, factory });
    this.#instances.delete(token);
  }

  registerSingleton(token, dependencies, factory) {
    this.#factories.set(token, false);
    this.register(token, dependencies, factory);
  }

  registerTransient(token, dependencies, factory) {
    this.#factories.set(token, true);
    this.register(token, dependencies, factory);
  }

  resolve(token) {
    if (this.#instances.has(token) && !this.#factories.get(token)) {
      return this.#instances.get(token);
    }

    const entry = this.#registry.get(token);
    if (!entry) {
      throw new Error(`DI: No registration found for "${token}".`);
    }

    const deps = entry.dependencies.map((dep) => this.resolve(dep));
    const instance = entry.factory(...deps);

    if (!this.#factories.get(token)) {
      this.#instances.set(token, instance);
    }

    return instance;
  }

  resolveAll() {
    const result = new Map();
    for (const token of this.#registry.keys()) {
      result.set(token, this.resolve(token));
    }
    return result;
  }

  has(token) {
    return this.#registry.has(token);
  }

  list() {
    return Array.from(this.#registry.keys());
  }
}

const container = new DIContainer();

export { DIContainer, container };