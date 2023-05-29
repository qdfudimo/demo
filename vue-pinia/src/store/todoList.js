import {
    defineStore
} from "../pinia";
const useTodoList = defineStore("todo", {
    state: () => ({
        /** @type {{ text: string, id: number, isFinished: boolean }[]} */
        todos: [],
        nextId: 0,
    }),
    getters: {
        finishedTodos(state) {
            // 自动完成! ✨
            return state.todos.filter((todo) => todo.isFinished)
        },
    },
    actions: {
        // 任何数量的参数，返回一个 Promise 或者不返回
        addTodo(text) {
            // 你可以直接改变状态
            this.todos.push({
                text,
                id: this.nextId++,
                isFinished: false
            })
        },
    }
})
export default useTodoList