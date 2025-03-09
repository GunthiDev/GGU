/// <reference types="vite/client" />
const modules = import.meta.glob("./inject/*.ts", { eager: true });

export default modules;
