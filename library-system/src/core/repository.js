class Repository {
  #store = new Map();
  #idField;

  constructor(idField = 'id') {
    this.#idField = idField;
  }

  save(entity) {
    const id = entity[this.#idField];
    if (!id) {
      throw new Error(`Repository: Entity must have a "${this.#idField}" field.`);
    }
    this.#store.set(id, entity);
    return entity;
  }

  findById(id) {
    return this.#store.get(id) ?? null;
  }

  findAll(predicate) {
    const all = Array.from(this.#store.values());
    if (typeof predicate === 'function') return all.filter(predicate);
    return all;
  }

  update(id, updates) {
    if (!this.#store.has(id)) return null;
    this.#store.set(id, updates);
    return updates;
  }

  delete(id) {
    return this.#store.delete(id);
  }

  count(predicate) {
    if (typeof predicate === 'function') return this.findAll(predicate).length;
    return this.#store.size;
  }

  exists(id) {
    return this.#store.has(id);
  }

  clear() {
    this.#store.clear();
  }
}

export { Repository };