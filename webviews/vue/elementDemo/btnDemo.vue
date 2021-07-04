
<template>
<el-input
  type="textarea"
  :rows="5"
  placeholder="请输入内容"
  v-model="textarea">
</el-input>
<div>
</div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

export default defineComponent ({
  setup() {
    return {
      textarea: ref('')
    }
  }
})
</script>

<style>

</style>
