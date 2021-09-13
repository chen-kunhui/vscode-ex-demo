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
		'el-demo',
		{children: [
			new MyTreeItem('git-diff', {command: {title: '', command: 'vs-extension-demo.webview-demo', arguments: ['git-diff']}}),
			new MyTreeItem('el-input', {command: {title: '', command: 'vs-extension-demo.webview-demo', arguments: ['el-input']}}),
		]}
	),
	new MyTreeItem(
		'vs-demo',
		{children: [
			new MyTreeItem('进度条', {command: {title: '', command: 'vs-extension-demo.progress-sample'}})
		]}
	),
	new MyTreeItem(
		'custome-demo',
		{children: [
			new MyTreeItem('demo', {command: {title: '', command: 'vs-extension-demo.demo'}}),
			new MyTreeItem('Two Way Tree', {command: {title: '', command: 'vs-extension-demo.twoWayTree'}})
		]}
	)
]
