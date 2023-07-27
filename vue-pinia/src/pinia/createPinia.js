import {
    reactive
} from 'vue';
import {
    patch
} from "./api";
export default function createPinia() {
    const setupStore = reactive({})
    const createStore = (name, store) => {
        if (!setupStore[name]) {
            setupStore[name] = reactive(store)
            console.log(setupStore[name].todos);
            setupStore[name].$patch = patch
        }
        return setupStore[name]
    }
    const install = (app) => {
        app.provide("createStore", createStore)
    }
    return {
        install
    }
}