const ciEnvironmentHighlight = () => {
  const processEnvironmentTd = (tdElement: HTMLElement): void => {
    const environmentElement = tdElement.childNodes[0]
      ?.childNodes[0] as HTMLElement | null;
    const environmentNameContainer = environmentElement
      ?.childNodes[0] as HTMLElement | null;

    if (!environmentElement || !environmentNameContainer) return;

    environmentElement.style.alignItems = "center";
    environmentNameContainer.style.alignItems = "center";
    environmentNameContainer.style.display = "flex";
    environmentNameContainer.style.padding = ".2rem .5rem";
    environmentNameContainer.style.borderRadius = "1rem";
    environmentNameContainer.style.backgroundColor =
      "var(--gl-background-color-default)";

    if (environmentNameContainer.innerText.startsWith("dev")) {
      environmentNameContainer.style.boxShadow =
        "inset 0 0 0 2px var(--gl-status-success-text-color)";
      environmentNameContainer.style.color =
        "var(--gl-status-success-text-color)";
      environmentNameContainer.style.backgroundColor =
        "var(--gl-status-success-background-color)";
    } else if (environmentNameContainer.innerText.startsWith("stag")) {
      environmentNameContainer.style.boxShadow =
        "inset 0 0 0 2px var(--gl-status-warning-text-color)";
      environmentNameContainer.style.color =
        "var(--gl-status-warning-text-color)";
      environmentNameContainer.style.backgroundColor =
        "var(--gl-status-warning-background-color)";
    } else if (environmentNameContainer.innerText.startsWith("prod")) {
      environmentNameContainer.style.boxShadow =
        "inset 0 0 0 2px var(--gl-status-danger-text-color)";
      environmentNameContainer.style.color =
        "var(--gl-status-danger-text-color)";
      environmentNameContainer.style.backgroundColor =
        "var(--gl-status-danger-background-color)";
    } else if (environmentNameContainer.innerText.startsWith("All")) {
      environmentNameContainer.style.boxShadow =
        "inset 0 0 0 2px var(--gl-status-neutral-text-color)";
      environmentNameContainer.style.color =
        "var(--gl-status-neutral-text-color)";
      environmentNameContainer.style.backgroundColor =
        "var(--gl-status-neutral-background-color)";
    } else {
      environmentNameContainer.style.boxShadow =
        "inset 0 0 0 2px var(--gl-status-info-text-color)";
      environmentNameContainer.style.color = "var(--gl-status-info-text-color)";
      environmentNameContainer.style.backgroundColor =
        "var(--gl-status-info-background-color)";
    }
  };

  document.querySelectorAll('td[data-label="Environments"]').forEach((el) => {
    processEnvironmentTd(el as HTMLElement);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const processNode = (node: Node): void => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches('td[data-label="Environments"]'))
        processEnvironmentTd(node);
      node
        .querySelectorAll('td[data-label="Environments"]')
        .forEach((el) => processEnvironmentTd(el as HTMLElement));
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(processNode);
      });
    });

    const target = document.body || document.documentElement;
    observer.observe(target, { childList: true, subtree: true });
  });
};

export default ciEnvironmentHighlight;
