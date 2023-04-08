import { Feature } from "@/features/Feature";
import { TypewriterModeSettings } from "@/TypewriterModeSettings";
import { PluginSettingTab, Setting } from "obsidian";

export default class MaxCharsPerLine extends Feature {
  protected setting: keyof TypewriterModeSettings = "maxCharsPerLine";

  registerSetting(settingTab: PluginSettingTab): void {
    new Setting(settingTab.containerEl)
      .setName("Maximum Number of Characters Per Line")
      .setDesc("The maximum number of characters per line")
      .setClass("typewriter-mode-setting")
      .addText((text) =>
        text
          .setValue(this.plugin.settings.maxCharsPerLine.toString())
          .onChange((newValue) => {
            this.changeMaxCharsPerLine(parseInt(newValue));
          })
      )
      .setDisabled(!this.plugin.settings.maxCharsPerLineEnabled);
  }

  override load() {
    this.plugin.setCSSVariable(
      "--max-chars-per-line",
      `${this.plugin.settings.maxCharsPerLine}ch`
    );
  }

  private changeMaxCharsPerLine(newValue: number) {
    this.plugin.settings.maxCharsPerLine = newValue;
    this.plugin.setCSSVariable("--max-chars-per-line", `${newValue}ch`);
    this.plugin.saveSettings().then();
  }
}
