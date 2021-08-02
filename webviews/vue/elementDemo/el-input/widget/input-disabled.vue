
<template>
<el-input
  placeholder="请输入内容"
  v-model="input"
  :disabled="true">
</el-input>
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
