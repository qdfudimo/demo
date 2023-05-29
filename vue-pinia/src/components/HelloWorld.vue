<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="handelClick">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <input v-model="inputValue" @input="handelInput" />
  <ul>
    <template v-if="state.todos.length">
      <li v-for="item in state.todos" :key="item.id">{{ item.text }}</li>
    </template>
  </ul>
</template>
<script setup>
import { ref } from 'vue'
import { useTodoList } from "../store"
defineProps({
  msg: String,
})
const state = useTodoList()
const count = ref(0)
const inputValue = ref("")
const handelInput = () => {
  state.todos.push({
    text: inputValue.value,
    id: state.nextId++,
    isFinished: false
  })
}
const handelClick = () => {
  state.addTodo("在哪啊")
}
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
