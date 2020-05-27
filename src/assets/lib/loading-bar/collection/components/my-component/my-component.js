import { Component, h } from '@stencil/core';
export class MyComponent {
    render() {
        return (h("div", null,
            h("div", { class: "sk-folding-cube" },
                h("div", { class: "sk-cube1 sk-cube" }),
                h("div", { class: "sk-cube2 sk-cube" }),
                h("div", { class: "sk-cube4 sk-cube" }),
                h("div", { class: "sk-cube3 sk-cube" }))));
    }
    static get is() { return "loading-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["my-component.css"]
    }; }
    static get styleUrls() { return {
        "$": ["my-component.css"]
    }; }
}
