const scopedLables = () => {
  const processLabel = (label: HTMLElement): void => {
    const labelTextElement = label.childNodes[0]
      ?.childNodes[0] as HTMLElement | null;
    if (!labelTextElement?.innerText?.includes("::")) return;

    const [labelCategory, labelValue] = labelTextElement.innerText.split("::");
    labelTextElement.innerText = labelCategory;

    const valueElement = document.createElement("span");
    labelTextElement.classList.forEach((cl) => valueElement.classList.add(cl));
    valueElement.classList.add("gl-label-text-scoped");
    valueElement.classList.remove("gl-label-text");
    valueElement.classList.remove("gl-label-text-dark");
    valueElement.innerText = labelValue;

    const backgroundColor = labelTextElement.style.backgroundColor;
    if (backgroundColor && labelTextElement?.parentElement?.parentElement) {
      labelTextElement.parentElement.parentElement.style.setProperty(
        "--label-inset-border",
        `inset 0 0 0 2px ${backgroundColor}`
      );
    }

    if (labelTextElement?.parentElement?.parentElement) {
      labelTextElement.parentElement.parentElement.classList.add(
        "gl-label-scoped"
      );
    }

    if (labelTextElement.parentElement) {
      labelTextElement.parentElement.appendChild(valueElement);
    }
  };

  document.querySelectorAll("span.gl-label").forEach((el) => {
    processLabel(el as HTMLElement);
  });

  document.addEventListener("DOMContentLoaded", () => {
    const processNode = (node: Node): void => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches("span.gl-label")) processLabel(node);
      node
        .querySelectorAll("span.gl-label")
        .forEach((el) => processLabel(el as HTMLElement));
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

export default scopedLables;
