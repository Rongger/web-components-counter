class Counter extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>

      <button id="subtract-btn">-</button>
      <span id="count"></span>
      <button id="add-btn">+</button>
    `;
    const content = template.content.cloneNode(true);
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(content);

    this.$count = shadowRoot.querySelector("#count");

    // data in
    this.$count.innerText = this.getAttribute("count");

    // data out
    shadowRoot.getElementById("add-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("onchange", {
          detail: parseInt(this.getAttribute("count")) + 1,
        })
      );
    });
    shadowRoot.getElementById("subtract-btn").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("onchange", {
          detail: parseInt(this.getAttribute("count")) - 1,
        })
      );
    });
  }

  static get observedAttributes() {
    return ["count"];
  }

  attributeChangedCallback() {
    this.$count.innerText = this.getAttribute("count");
  }
}

window.customElements.define("wc-counter", Counter);
