const templates = {
  main() {
    return `
    <style>
      *, ::before, ::after {
        box-sizing: border-box;
        font-size: 100%;
      }

      @layer cwf-modules {
        .button {
          align-items: var(--button-align-items, center);
          background-color: var(--button-background-color, white);
          border-color: var(--button-border-color, LightGrey);
          border-radius: var(--button-border-radius, 4px);
          border-style: var(--button-border-style, solid);
          border-width: var(--button-border-width, 1px);
          box-shadow: var(--button-box-shadow, none);
          color: var(--button-color, DimGrey);
          cursor: var(--button-cursor, pointer);
          display: var(--button-display, inline-flex);
          font-family: var(--button-font-family, system-ui);
          font-weight: var(--button-font-weight, 400);
          gap: var(--button-gap, 1ch);
          justify-content: var(--button-justify-content, center);
          line-height: var(--button-line-height, 1.15);
          outline: var(--button-outline, 0);
          padding: var(--button-padding-y, 1ch) var(--button-padding-x, 2ch);
          text-align: var(--button-text-align, center);
          text-decoration: var(--button-text-decoration, none);
          user-select: var(--button-user-select, none);
          vertical-align: var(--button-vertical-align, middle);
          white-space: var(--button-white-space, nowrap);

          &:hover {
            background-color: var(--button-hover-background-color, WhiteSmoke);
            border-color: var(--button-hover-border-color, grey);
            color: var(--button-hover-color, grey);
            text-decoration: var(--button-hover-text-decoration, none);
          }

          &:focus-visible,
          &:focus {
            background-color: var(--button-focus-background-color, WhiteSmoke);
            border-color: var(--button-focus-border-color, grey);
            box-shadow: var(
              --button-focus-box-shadow,
              0 0 0 0.25em rgb(0 0 0 / 0.125)
            );
            color: var(--button-focus-color, grey);
            text-decoration: var(--button-focus-text-decoration, none);
          }

          &:active {
            background-color: var(--button-active-background-color, WhiteSmoke);
            border-color: var(--button-active-border-color, grey);
            box-shadow: var(
              --button-active-box-shadow,
              0 0 0 0.25em rgb(0 0 0 / 0.25)
            );
            color: var(--button-active-color, grey);
            text-decoration: var(--button-active-text-decoration, none);
          }
        }
      }
    </style>
    <button type="button" class="button">Click me</button>
    `;
  },
};

export class CwfButton extends HTMLElement {
  /**
   * The class constructor object
   */
  constructor() {
    // Always call super first in constructor
    super();

    this.attachShadow({ mode: "open" });
    // Create a document fragment and populate it with the template
    const fragment = document
      .createRange()
      .createContextualFragment(templates.main());

    // Append the document fragment to the shadow root
    this.shadowRoot.appendChild(fragment);
  }
}

// Define the new web component
if ("customElements" in window) {
  customElements.define("cwf-button", CwfButton);
}
