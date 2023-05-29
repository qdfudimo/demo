export function patch(value) {
    const store = this;
    for (const key in value) {
        store[key] = value[key]
    }
}