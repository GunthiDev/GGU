import { useEffect, useState } from "react";
import Title from "../Title/Title";
import "./Settings.scss";

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<{
    scopedLabels: boolean;
    keepSearch: boolean;
    ciEnvironmentHighlight: boolean;
  }>({ scopedLabels: false, keepSearch: false, ciEnvironmentHighlight: false });

  useEffect(() => {
    chrome.storage.local.get("settings", (result) => {
      setSettings(result.settings ? result.settings : []);
    });
  }, []);

  const updateScopedIssues: () => void = () => {
    setSettings({
      ...settings,
      scopedLabels: !settings.scopedLabels,
    });
  };

  const updateKeepSearch: () => void = () => {
    setSettings({
      ...settings,
      keepSearch: !settings.keepSearch,
    });
  };

  const updateCIEnvironmentHighlights: () => void = () => {
    setSettings({
      ...settings,
      ciEnvironmentHighlight: !settings.ciEnvironmentHighlight,
    });
  };

  const saveSettings: () => void = () => {
    chrome.storage.local.set({ settings }, () => {
      chrome.tabs.reload();
    });
  };

  return (
    <div className="container settings-wrapper">
      <Title title="Settings" />
      <div className="settings-container">
        <div className="setting">
          <span>Scoped labels</span>
          <label className="switch">
            <input
              onChange={() => updateScopedIssues()}
              type="checkbox"
              checked={settings.scopedLabels}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="setting">
          <span>Keep issue board search bar</span>
          <label className="switch">
            <input
              onClick={() => updateKeepSearch()}
              type="checkbox"
              checked={settings.keepSearch}
            />
            <span className="slider round" />
          </label>
        </div>
        <div className="setting">
          <span>Highlight CI environments</span>
          <label className="switch">
            <input
              onClick={() => updateCIEnvironmentHighlights()}
              type="checkbox"
              checked={settings.ciEnvironmentHighlight}
            />
            <span className="slider round" />
          </label>
        </div>
        <button onClick={() => saveSettings()}>SAVE & RELOAD</button>
      </div>
    </div>
  );
};

export default Settings;
