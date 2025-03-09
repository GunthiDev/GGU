const keepSearch = () => {
  chrome.storage.local.get(["queries"], (results) => {
    const queries = results.queries;

    let oldHref = document.location.href;
    if (!/\/-\/boards/g.test(oldHref)) return;
    let [base, query] = oldHref.split(/\?/g);

    if (queries[base] !== query) {
      document.location.href = `${base}?${queries[base]}`;
    }

    window.onload = () => {
      let bodyList = document.querySelector("body");
      if (!bodyList) return;

      let observer = new MutationObserver(() => {
        if (oldHref != document.location.href) {
          oldHref = document.location.href;
          [base, query] = oldHref.split(/\?/g);
          queries[base] = query;
          chrome.storage.local.set({ queries });
        }
      });

      let config = {
        childList: true,
        subtree: true,
      };

      observer.observe(bodyList, config);
    };
  });
};

export default keepSearch;
