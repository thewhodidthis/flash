var flash = (function() {
  "use strict"

  // When `ready` clear text contents. When `flash` is set, wait
  // for `timeout` before turning `ready` again.
  class Flash extends HTMLElement {
    constructor() {
      super()

      const template = document.createRange().createContextualFragment(`
      <style>
        :host {
          display: block;
        }
        :host([hidden]) {
          display: none;
        }
      </style>
      <slot></slot>
    `)

      this.attachShadow({ mode: "open" })
      this.shadowRoot.appendChild(template)
    }
    static get observedAttributes() {
      return ["flash", "ready"]
    }
    get flash() {
      return this.getAttribute("flash")
    }
    set flash(v) {
      this.setAttribute("flash", v)
    }
    get ready() {
      return this.getAttribute("ready")
    }
    set ready(v) {
      this.setAttribute("ready", v)
    }
    get timeout() {
      const v = this.hasAttribute("timeout") ? this.getAttribute("timeout") : 1500

      return parseInt(v, 10)
    }
    set timeout(v) {
      if (Number.isNaN(v)) {
        return
      }

      this.setAttribute("timeout", v)
    }
    attributeChangedCallback(name, _, next) {
      switch (name) {
        case "ready": {
          if (next !== "null") {
            const ready = new Event("ready")

            this.replaceChildren()
            this.dispatchEvent(ready)
          }

          break
        }
        case "flash": {
          const timer = setTimeout(() => {
            clearTimeout(timer)

            this.setAttribute("ready", "")
          }, this.timeout)

          this.replaceChildren(next)
          this.removeAttribute("ready")

          break
        }
      }
    }
  }

  return Flash
})()
