
<template>
<el-input v-model="input" placeholder="请输入内容"></el-input>
</template>

<script>
  import { defineComponent, ref } from 'vue'

export default defineComponent ({
  setup() {
    return {
      input: ref('')
    }
  }
})
</script>

<style>

</style>
