<style lang="scss" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
}
</style>
<template>
    <ckhWrap title="基本用法" link="https://element-plus.gitee.io/#/zh-CN/component/card#ji-chu-yong-fa">
        <baseDemo />
    </ckhWrap>
    <ckhWrap title="禁用状态" link="https://element-plus.gitee.io/#/zh-CN/component/input#jin-yong-zhuang-tai">
        <inputDisabledDemo />
    </ckhWrap>
    <ckhWrap title="可清空" link="https://element-plus.gitee.io/#/zh-CN/component/input#ke-qing-kong">
        <inputDemo3 />
    </ckhWrap>
</template>
<script>

import ckhWrap from "../wrap";
import baseDemo from "./widget/base";
import inputDisabledDemo from "./widget/input-disabled";
import inputDemo3 from "./widget/input-clearable";

export default {
    components: {
        ckhWrap,
        baseDemo,
        inputDisabledDemo,
        inputDemo3
    }
}
</script>