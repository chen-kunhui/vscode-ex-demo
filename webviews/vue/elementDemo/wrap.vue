<style lang="scss">
.wrap-card-demo {
    margin-top: 10px;
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 18px;
    }
}
</style>
<template>
    <el-card class="wrap-card-demo">
        <template #header>
            <div class="card-header">
                <span>{{title}}</span><a :href="link"><i class="el-icon-link"></i></a>
            </div>
        </template>
        <slot></slot>
    </el-card>
</template>
<script>
export default {
    props: {
        title: String,
        link: {
            type: String,
            default: "https://element-plus.gitee.io/"
        }
    }
}
</script>