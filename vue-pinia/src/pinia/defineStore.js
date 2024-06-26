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
            console.log(store[key]);
        }
    }
    if (getters && Object.keys(getters).length) {
        for (const key in getters) {
            store[key] = computed(getters[key].bind(store.$state, store.$state))
            console.log(store[key],88888);
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

// const arr = {a:1};

// const proxy = new Proxy(arr, {
//     get(target, key) {
//         console.log('get');
//         return target[key];
//     },
//     set(target, key, value) {
//         console.log('set');
//         // set 会触发依赖
//         effect();
        
//         target[key] = value;
//         return true;
//     }
// });

// // 假设这个是一个 effect
// function effect() {
//     proxy.a = 2
// }
// effect();
