<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <at-input type="textarea" ref="atInput" :placeholder="placeholder" v-model="content" @on-tagEdit="tagEditChange"
      @change="contentChange">
      <div slot="popover">
        <div>标签内容：{{ tagName }} </div>
        <ul>
          <li v-for="item in filterList" :key="item.id" @click="listClick(item)" style="cursor:pointer">{{ item.name }}
          </li>
        </ul>
      </div>
    </at-input>
    <hr />
    <div>html：</div>
    <div v-html="content"></div>
    <hr />
    <div>文本</div>
    <div>{{ text }}</div>
    <hr />
    <el-button @click="getAllData">获取全部数据</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import atInput from './atInput.vue';
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    atInput
  },
  data() {
    return {
      placeholder: '键入‘@’添加联系人',
      content: '',
      text: '',
      tagName: '',
      userList: [
        { name: '黄吉平', id: 'huangjiping' },
        { name: '李国师', id: 'liguoshi' },
        { name: '寇永明', id: 'kouyongming' },
        { name: '潘浩玮', id: 'panhaowei' }
      ]
    }
  },
  computed: {
    filterList() {
      if (this.tagName) {
        return this.userList.filter((item) => {
          return item.name.indexOf(this.tagName) >= 0
        })
      } else {
        return this.userList
      }
    }
  },
  methods: {
    getAllData() {
      const result = this.$refs.atInput.getData()
      // console.log(result)
      this.$alert(JSON.stringify(result))
    },
    tagEditChange(val) {
      this.tagName = val
    },
    contentChange(val, str) {
      this.text = str
      this.$refs.form.currentModel.reply = str
    },
    listClick(data) {
      this.tagName = ''
      this.$refs.atInput.tagInsert({
        name: data.name, // 必须(标签显示名)
        data: data, // 必须(标签对应数据)
        id: data.id, // 非必须，若无则组件自动创建id 与 @标签一一对应
        color: 'red' // 非必须，标签颜色
      })
    },
    handleSubmit(model) {
      console.log(model)
    }
  }
}
</script>
