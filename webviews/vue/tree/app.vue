<style lang="scss" scoped>
</style>
<template>
<div>
    <treeNode
        :id="root.id"
        :name="root.name"
        :leftNodes="root.leftNodes"
        :rightNodes="root.rightNodes"
    />
</div>
</template>
<script>
import {jsPlumb} from 'jsplumb';
import treeNode from './node';
export default {
    provide: {
        jsPlumb: jsPlumb.getInstance()
    },
    mounted() {
        window.onresize = function() {
            console.log(333);
        }
    },
    data() {
        return {
            root: {
                id: 'root',
                name: 'ROOT',
                leftNodes: [
                    {
                        id: 'node-left-1',
                        name: 'node-left-1',
                        leftNodes: [{id: 'node-left-1-1', name: 'node-left-1-1'}, {id: 'node-left-1-2', name: 'node-left-1-2'}]
                    },
                    {id: 'node-left-2', name: 'node-left-2'},
                    {id: 'node-left-3', name: 'node-left-3'}
                ],
                rightNodes: [
                    {
                        id: 'node-right-1',
                        name: 'node-right-1',
                        rightNodes: [{id: 'node-right-1-1', name: 'node-right-1-1'}, {id: 'node-right-1-2', name: 'node-right-1-2'}]
                    },
                    {id: 'node-right-2', name: 'node-right-2'},
                    {id: 'node-right-3', name: 'node-right-3'}
                ]
            }
        }
    },
    components: {
        treeNode
    }
  }
</script>