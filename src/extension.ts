// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "better-find-and-replace" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('better-find-and-replace.findAndReplace', async function execute() {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const selection = editor.selection;
			const selectedText = editor.document.getText(selection);
			if (!selectedText) {
				vscode.window.showInformationMessage('No text selected');
				return;
			}

			const find = await vscode.window.showInputBox({ placeHolder: 'Enter find text please' }) || '';
			if (!find) {
				vscode.window.showInformationMessage('No Info Provided');
				return;
			}

			const replace = await vscode.window.showInputBox({ placeHolder: 'Enter replace text' }) || '';
			if (!find) {
				vscode.window.showInformationMessage('No Info Provided');
				return;
			}

			const regex = new RegExp(find, 'g');
			const target = selectedText.replace(regex, replace);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, target);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
