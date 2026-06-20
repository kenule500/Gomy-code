import { debug } from '../utils/logger.js';

class EventEmitter {
  #listeners = new Map();

  on(event, callback) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, new Set());
    }
    this.#listeners.get(event).add(callback);
    debug(`EventEmitter: Listener added for "${event}".`);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    const cbs = this.#listeners.get(event);
    if (cbs) {
      cbs.delete(callback);
      if (cbs.size === 0) this.#listeners.delete(event);
    }
  }

  emit(event, payload) {
    const cbs = this.#listeners.get(event);
    if (!cbs || cbs.size === 0) return;
    debug(`EventEmitter: Emitting "${event}".`);
    for (const cb of cbs) {
      try {
        cb(payload);
      } catch (err) {
        console.error(`EventEmitter: Error in "${event}" handler:`, err);
      }
    }
  }

  once(event, callback) {
    const wrapper = (payload) => {
      this.off(event, wrapper);
      callback(payload);
    };
    this.on(event, wrapper);
  }

  listenerCount(event) {
    return this.#listeners.get(event)?.size ?? 0;
  }

  removeAllListeners(event) {
    if (event) {
      this.#listeners.delete(event);
    } else {
      this.#listeners.clear();
    }
  }
}

export { EventEmitter };