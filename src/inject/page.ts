import keepSearch from "./keep-search";
import scopedLables from "./scoped-labels";

chrome.storage.local.get(["domains", "settings"], (results) => {
  const baseUrl = window.location.origin.replace(/https?:\/\//g, "");

  if (
    results?.domains?.find((e: { domain: string }) =>
      e.domain.includes(baseUrl)
    )
  ) {
    if (results?.settings?.scopedLabels) {
      scopedLables();
    }

    if (results?.settings?.keepSearch) {
      keepSearch();
    }
  }
});
