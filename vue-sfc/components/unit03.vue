<template>
    <div>
      <div class="fontSty">{{msg}}</div>{{a}}
      <el-button type='primary' size='mini' @click='handleClick'>按钮</el-button>
      <i class="el-icon-edit"></i>
      <unit04 :content='msg'></unit04>
    </div>
  </template>
  <script>
  
  import unit04 from './unit04.vue'
  import {toBeTest} from '../js/unit01.js'
  export default {
    components:{unit04},
    data(){
      return {
        msg:'我是unit03组件',
        a:'213'
      }
    },
    methods:{
      handleClick(){
        this.a = toBeTest()
        // console.log(a);
      }
    }
  }
  </script>
  <style scoped>
  
  </style>
  