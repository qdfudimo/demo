export default {
    template: `<template>
    <div class="wrap">
      <button @click="handelClick">点我</button>
    </div>
  </template>`,
    css: `
  .wrap {
    margin-top: 10px;
    border: 2px solid #42b983;
  }
  `,
    js: `function generate() {
        return {
            name: "custmCode",
            props: {
                areaName: String
            },
            mounted() {
                console.log("mounted初始化");
            },
            methods:{
                handelClick() {
                    window.alert("点我了啊！")
                }
            },
            watch:{

            }
        }
    }`
}