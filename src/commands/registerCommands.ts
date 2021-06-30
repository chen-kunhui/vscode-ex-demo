import { ExtensionContext } from "vscode";
import progressSample from "./progressSample";
import vueSample from "./vueSample";

export default function registerCommands (context: ExtensionContext) {
    vueSample(context);
    progressSample(context);
}
