const processLabel = (label) => {
    const labelTextElement = label.childNodes[0]?.childNodes[0];
    if (!labelTextElement?.innerText?.includes('::')) return;

    const [labelCategory, labelValue] = labelTextElement.innerText.split('::');
    labelTextElement.innerText = labelCategory;

    const valueElement = document.createElement('span');
    labelTextElement.classList.forEach(cl => valueElement.classList.add(cl));
    valueElement.classList.add('gl-label-text-scoped')
    valueElement.classList.remove('gl-label-text')
    valueElement.classList.remove('gl-label-text-dark')
    valueElement.innerText = labelValue;

    const backgroundColor = labelTextElement.style.backgroundColor;
    if (backgroundColor)
        labelTextElement.parentElement.parentElement.style.setProperty('--label-inset-border', `inset 0 0 0 2px ${backgroundColor}`);

    labelTextElement.parentElement.parentElement.classList.add('gl-label-scoped')
    labelTextElement.parentElement.appendChild(valueElement);
}

document.querySelectorAll('span.gl-label').forEach(processLabel);

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType !== Node.ELEMENT_NODE) return;

            if (node.matches('span.gl-label')) {
                processLabel(node);
            }
            node?.querySelectorAll('span.gl-label').forEach(processLabel);
        });
    });
});

observer.observe(document.body, { childList: true, subtree: true });
