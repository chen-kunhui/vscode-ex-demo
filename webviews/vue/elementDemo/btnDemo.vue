
<template>
<div>
  <el-input placeholder="请输入内容" v-model="input1">
    <template #prepend>Http://</template>
  </el-input>
</div>
<div style="margin-top: 15px">
  <el-input placeholder="请输入内容" v-model="input2">
    <template #append>.com</template>
  </el-input>
</div>
<div style="margin-top: 15px">
  <el-input
    placeholder="请输入内容"
    v-model="input3"
    class="input-with-select"
  >
    <template #prepend>
      <el-select v-model="select" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
    </template>
    <template #append>
      <el-button icon="el-icon-search"></el-button>
    </template>
  </el-input>
</div>
</template>

<script>
  import { defineComponent, ref } from 'vue'

export default defineComponent ({
  setup() {
    return {
      input1: ref(''),
      input2: ref(''),
      input3: ref(''),
      select: ref('')
    }
  }
})
</script>

<style>

</style>
