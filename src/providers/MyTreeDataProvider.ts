import { Command, Event, EventEmitter, TreeDataProvider, TreeItem, TreeItemCollapsibleState } from "vscode";

export class MyTreeDataProvider implements TreeDataProvider<MyTreeItem> {

	private _onDidChangeTreeData: EventEmitter<MyTreeItem | undefined | void> = new EventEmitter<MyTreeItem | undefined | void>();
	readonly onDidChangeTreeData: Event<MyTreeItem | undefined | void> = this._onDidChangeTreeData.event;

	constructor() {
	}

	getTreeItem(element: MyTreeItem): MyTreeItem {
		return element;
	}

	getChildren(element?: MyTreeItem): Thenable<MyTreeItem[]> {
		if (element?.children) {
			return Promise.resolve(element?.children);
		}
		return Promise.resolve(menus);
	}
}

class MyTreeItem extends TreeItem {
	public children: MyTreeItem[];

	constructor(label: string, option?: {children?: MyTreeItem[], collapsibleState?: TreeItemCollapsibleState, command?: Command}){
		option ||= {};
		option.collapsibleState ||= TreeItemCollapsibleState.None;
		option.children ||= [];
		
		if (option.children.length > 0 && ![TreeItemCollapsibleState.Collapsed, TreeItemCollapsibleState.Expanded].includes(option.collapsibleState)) {
			option.collapsibleState = TreeItemCollapsibleState.Expanded;
		}
		
		super(label, option.collapsibleState);

		this.children = option.children;
		if (option.command) {
			this.command = option.command;
		}
	}
}

const menus: MyTreeItem[] = [
	new MyTreeItem(
		'Demo',
		{children: [
			new MyTreeItem('vue-demo', {command: {title: 'vue demo', command: 'vs-extension-demo.vue-demo'}}),
			new MyTreeItem('progress sample', {command: {title: 'progress sample', command: 'vs-extension-demo.progress-sample'}})
		]}
	),
]
