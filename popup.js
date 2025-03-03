let version = chrome.runtime.getManifest().version;
document.getElementById('version').innerText = `v${version}`