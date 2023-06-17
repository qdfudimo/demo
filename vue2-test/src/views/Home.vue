<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" >
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
  computed: {
    commonData(){
      return  '';
    }
  },
  mounted() {
    console.log('app-vue-hash Home.vue mounted')
  },
  methods: {
    changeParentState(){
    }
  },
}
</script>
