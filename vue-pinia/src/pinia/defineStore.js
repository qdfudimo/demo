import {
    toRef,
    reactive,
    computed,
    inject
} from 'vue';
const defineStore = (name, {
    state,
    getters,
    actions
}) => {
    const store = {}
    if (state && typeof (state) == "function") {
        const _state = state()
        store.$state = reactive(_state)
        for (const key in _state) {
            store[key] = toRef(store.$state, key)
        }
    }
    if (getters && Object.keys(getters).length) {
        for (const key in getters) {
            store[key] = computed(getters[key].bind(store.$state, store.$state))
            store.$state[key] = store[key]
        }
    }
    if (actions && Object.keys(actions).length) {
        for (const action in actions) {
            store[action] = actions[action]
        }
    }
    return ()=>{
        const createStore = inject("createStore")
        return createStore(name,reactive(store))
    }
}
export default defineStore