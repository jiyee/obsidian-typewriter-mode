import { ViewPlugin, ViewUpdate } from "@codemirror/view";
import CodeMirrorPluginClass from "@/cm-plugin/CodeMirrorPluginClass";
import getTypewriterOffset from "@/cm-plugin/getTypewriterOffset";

export default ViewPlugin.fromClass(
  class extends CodeMirrorPluginClass {
    private topPadding: string = null;

    override update(update: ViewUpdate) {
      const offset = getTypewriterOffset(update.view);
      this.topPadding = offset + "px";
      if (this.topPadding != this.view.contentDOM.style.paddingTop) {
        this.view.contentDOM.style.paddingTop = this.topPadding;
        this.view.contentDOM.style.paddingBottom =
          update.view.dom.clientHeight - offset + "px";
      }
    }
  }
);
