<template>
<div class="group" :class="[isRoot ? 'group-root' : 'group-sub', isReverse ? 'group-left' : 'group-right']">
    <div v-if="hasLeftNodes">
        <treeNode
            v-for="(item, index) in lNodes"
            :key="index"
            :id="item.id"
            :name="item.name"
            :parentId="id"
            isReverse
            :leftNodes="item.leftNodes"
            :rightNodes="item.rightNodes"
        />
    </div>
    <div>
        <span :id="id" class="node" :class="[isRoot ? 'node-root' : 'node-sub', isReverse ? 'node-left' : 'node-right']">
            <span v-if="isRoot || isReverse" class="operation-icon codicon" :class="[ hasLeftNodes ? 'codicon-collapse-all' : 'codicon-expand-all']" @click="expandOrcollapse(false, hasLeftNodes)"></span>
            <span class="tag">{{name}}</span>
            <span v-if="isRoot || !isReverse" class="operation-icon codicon" :class="[ hasRightNodes ? 'codicon-collapse-all' : 'codicon-expand-all']" @click="expandOrcollapse(true, hasRightNodes)"></span>
        </span>
    </div>
    <div v-if="hasRightNodes">
        <treeNode
            v-for="(item, index) in rNodes"
            :key="index"
            :id="item.id"
            :parentId="id"
            :name="item.name"
            :leftNodes="item.leftNodes"
            :rightNodes="item.rightNodes"
        />
    </div>
</div>
</template>

<script>
export default {
    name: 'treeNode',
    emits: ['reset'],
    inject: ['jsPlumb'],
    props: {
        parentId: String,
        id: String,
        name: String,
        isReverse: {
            type: Boolean,
            default: false
        },
        leftNodes: {
            type: Array,
            default: []
        },
        rightNodes: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            isRoot: false,
            lNodes: [],
            rNodes: []
        }
    },
    computed: {
        hasLeftNodes() {
            return this.lNodes && this.lNodes.length > 0;
        },
        hasRightNodes() {
            return this.rNodes && this.rNodes.length > 0;
        }
    },
    mounted() {
        this.isRoot = !!!this.parentId;
        let source = this.isReverse ? this.id : this.parentId;
        let target = this.isReverse ? this.parentId : this.id;
        this.lNodes = this.lNodes.concat(this.leftNodes);
        this.rNodes = this.rNodes.concat(this.rightNodes);
        if (this.isRoot) {
            return;
        }
        this.$nextTick(function() {
            this.jsPlumb.ready(() => {
                this.jsPlumb.repaintEverything();
                this.jsPlumb.connect({
                    // 对应上述基本概念
                    source: source,
                    target: target,
                    anchor: ['Left', 'Right'],
                    connector: ['Straight'],
                    ConnectionsDetachable: false,
                    endpoint: 'Blank',
                    overlays: [ ['Arrow', { width: 5, length: 5, location: 1 }] ], // overlay
                    // 添加样式
                    paintStyle: { stroke: '#909399', strokeWidth: 1 }, // connector
                });
            })
        });
    },
    methods: {
        expandOrcollapse(isRight = true, isCollapse = false) {
            let node = this;
            console.log(node);
            if (isCollapse) {
                return;
            }
            if (isRight) {
                this.rNodes = this.rNodes.concat([{id: this.guid(), name: 'NODE'}, {id: this.guid(), name: 'NODE'}]);
            } else {
                this.lNodes = this.lNodes.concat([{id: this.guid(), name: 'NODE'}, {id: this.guid(), name: 'NODE'}]);
            }
            // this.$sendRequest("/get/nodes", {node: ndoe}).then(rs => {

            // })
        },
        guid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.group {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 20px;

    &.group-root {
        min-height: 100vh;
    }
    &.group-sub.group-left {
        justify-content: flex-end;
    }
    &.group-sub.group-right {
        justify-content: flex-start;
    }

    .node {
        .operation-icon {
            cursor: pointer;
        }
        .tag {
            border-width: 1px;
            border-style: solid;
            display: inline-block;
            height: 32px;
            padding: 0 10px;
            line-height: 30px;
            font-size: 14px;
            border-radius: 4px;
            box-sizing: border-box;
            white-space: nowrap;
            cursor: pointer;
        }
    }
    .node-root {
        .operation-icon:hover {
           color: #f56c6c;
        }
        .tag {
            border-color:  #f56c6c;
            background-color: #f56c6c;
            font-weight: bold;

            &:hover {
                background-color: transparent;
            }
        }
    }
    .node-sub.node-left {
        .operation-icon:hover {
           color: #409eff;
        }
        .tag {
            border-color: #409eff;
        }
    }
    .node-sub.node-right {
        .operation-icon:hover {
           color: #e6a23c;
        }
        .tag {
            border-color: #e6a23c;
        }
    }
}


</style>