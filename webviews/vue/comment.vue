<style lang="scss" scoped>
    .nx-new-comment-container {
        border: 1px solid var(--vscode-editorWidget-border);
        background-color: var(--vscode-editorWidget-background);
        color: var(--vscode-editorWidget-foreground);
        border-radius: 4px;
        padding: 5px 5px;
        margin: 10px 0px;

        .comment-textarea {
            font-family: var(--vscode-editor-font-family);
            font-size: var(--vscode-editor-font-size);
            font-weight: var(--vscode-editor-font-weight);
            margin: 10px 0px;

            display: block;
            resize: none;
            padding: 5px 15px;
            line-height: 1.5;
            box-sizing: border-box;
            width: 100%;
            border-radius: 4px;
            transition: border-color .2s cubic-bezier(.645,.045,.355,1);

            background-color: var(--vscode-editor-background);
            border: 1px solid var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);

            &::placeholder {
                color: var(--vscode-editor-placeholderForeground);
            }

            &:focus {
                border: 1px solid var(--vscode-focusBorder);
                outline: none;
                outline-offset: none;

            }
        }
        .comment-footer {
            display: flex;
            justify-content: flex-end;

            button {
                display: inline-block;
                line-height: 1;
                min-height: 36px;
                white-space: nowrap;
                cursor: pointer;
                border: 1px solid #dcdfe6;
                text-align: center;
                box-sizing: border-box;
                outline: none;
                margin: 0 5px 0 5px;
                transition: .1s;
                font-weight: 500;
                padding: 10px 20px;
                font-size: 14px;
                border-radius: 4px;
            }

            .submit {
                color: #fff;
                background-color: #409eff;
                border-color: #409eff;
            }
        }
    }
</style>
<template>
    <div class="nx-new-comment-container">
        <div class="comment-header">
            <toolbar />
        </div>
        <textarea rows="10" class="comment-textarea"></textarea>
        <div class="comment-footer">
            <button class="cancel" type="button"><span>取消</span></button>
            <button class="submit" type="button"><span>提交</span></button>
        </div>
    </div>
</template>
<script>
    import toolbar from "./comments/toolbar"
    export default {
        components: {
            toolbar
        }
    }
</script>
