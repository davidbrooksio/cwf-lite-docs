export class MyCustomComponent extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = `
            <style>
                /* Your custom styles for this component */
                :host {
                    display: block;
                    /* Additional styles for the component's host element */
                }

                h1 {
                    /* Custom styles for headings */
                }

                /* Add more scoped styles as needed */
            </style>
            <div class="my-framework">
                <!-- Content styled by your CSS framework -->
                <h1>Hello World</h1>
                <p>This is styled by your framework.</p>
            </div>
        `;
  }
}

customElements.define("my-custom-component", MyCustomComponent);
