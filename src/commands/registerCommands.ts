import { ExtensionContext } from "vscode";
import demoCommand from "./demoCommands";
import progressSample from "./progressSample";
import vueSample from "./vueSample";

export default function registerCommands (context: ExtensionContext) {
    vueSample(context);
    progressSample(context);
    demoCommand(context);
}
