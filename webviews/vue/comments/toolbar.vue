<style lang="scss" scoped>
  .nx-comment-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left-tools {
        display: flex;
      }

      span {
        display: flex;
        cursor: pointer;
        padding: 10px 10px;

        &:hover {
          color: #1989fa;
        }

        svg  {
          width: 20px;
          height: 20px;
        }
      }
  }
</style>
<template>
  <div class="nx-comment-toolbar">
    <div class="left-tools" v-show="!isPreview">
      <span title="添加标题" @click="addMdSyntax('add_title', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M3.75 2a.75.75 0 01.75.75V7h7V2.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V8.5h-7v4.75a.75.75 0 01-1.5 0V2.75A.75.75 0 013.75 2z"></path>
        </svg>
      </span>
      <span title="加粗" @click="addMdSyntax('blod_text', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5.5a3.5 3.5 0 001.852-6.47A3.5 3.5 0 008.5 2H4zm4.5 5a1.5 1.5 0 100-3H5v3h3.5zM5 9v3h4.5a1.5 1.5 0 000-3H5z"></path>
        </svg>
      </span>
      <span title="引用" @click="addMdSyntax('add_quote', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M1.75 2.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H1.75zm4 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM2.5 7.75a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6z"></path>
        </svg>
      </span>
      <span title="行内代码块" @click="addMdSyntax('insert_code', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path>
        </svg>
      </span>
      <span title="添加链接" @click="addMdSyntax('add_link', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path>
        </svg>
      </span>
      <span title="列表" @click="addMdSyntax('add_list', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
            <path fill-rule="evenodd" d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z"></path>
        </svg>
      </span>
      <span title="代办事项" @click="addMdSyntax('add_todo_list', $event)">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
			<path fill-rule="evenodd" d="M2.5 2.75a.25.25 0 01.25-.25h10.5a.25.25 0 01.25.25v10.5a.25.25 0 01-.25.25H2.75a.25.25 0 01-.25-.25V2.75zM2.75 1A1.75 1.75 0 001 2.75v10.5c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0015 13.25V2.75A1.75 1.75 0 0013.25 1H2.75zm9.03 5.28a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path>
		</svg>
      </span>
    </div>
	<div class="left-tools" v-show="isPreview">
	</div>
    <div>
      <span @click="togglePreviewMd(true)" v-show="!isPreview">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
			<path fill-rule="evenodd" clip-rule="evenodd" d="M3 1h11l1 1v5.3a3.21 3.21 0 0 0-1-.3V2H9v10.88L7.88 14H3l-1-1V2l1-1zm0 12h5V2H3v11zm10.379-4.998a2.53 2.53 0 0 0-1.19.348h-.03a2.51 2.51 0 0 0-.799 3.53L9 14.23l.71.71 2.35-2.36c.325.22.7.358 1.09.4a2.47 2.47 0 0 0 1.14-.13 2.51 2.51 0 0 0 1-.63 2.46 2.46 0 0 0 .58-1 2.63 2.63 0 0 0 .07-1.15 2.53 2.53 0 0 0-1.35-1.81 2.53 2.53 0 0 0-1.211-.258zm.24 3.992a1.5 1.5 0 0 1-.979-.244 1.55 1.55 0 0 1-.56-.68 1.49 1.49 0 0 1-.08-.86 1.49 1.49 0 0 1 1.18-1.18 1.49 1.49 0 0 1 .86.08c.276.117.512.311.68.56a1.5 1.5 0 0 1-1.1 2.324z"/>
		</svg>
        &nbsp;预览
      </span>
	  <span @click="togglePreviewMd(false)" v-show="isPreview">
        <svg aria-hidden="true" viewBox="0 0 16 16" version="1.1" height="16" width="16" fill="currentColor">
			<path fill-rule="evenodd" d="M6.78 1.97a.75.75 0 010 1.06L3.81 6h6.44A4.75 4.75 0 0115 10.75v2.5a.75.75 0 01-1.5 0v-2.5a3.25 3.25 0 00-3.25-3.25H3.81l2.97 2.97a.75.75 0 11-1.06 1.06L1.47 7.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"></path>
		</svg>
        &nbsp;返回编辑
      </span>
    </div>
  </div>
</template>
<script>
export default {
	emits: ['togglePreviewMd', 'addMdSyntax'],
	data() {
		return {
			isPreview: false
		}
	},
	methods: {
		addMdSyntax(action, event) {
			event.preventDefault();
			this.$emit('addMdSyntax', action);
		},
		togglePreviewMd(val) {
			this.isPreview = val;
			this.$emit('togglePreviewMd', this.isPreview);
		}
	}
}
</script>