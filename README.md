## about

Mini HTML custom element for flashing plain text messages such as loading placeholders.

## setup

Load via HTML script tag:

```html
<!-- Just an IIFE namespaced `flash` -->
<script src="https://thewhodidthis.github.io/flash/flash.js"></script>
```

Source from an import map:

```json
{
  "imports": {
    "@thewhodidthis/flash": "https://thewhodidthis.github.io/flash/main.js"
  }
}
```

Download from GitHub directly:

```sh
# Of type module
npm install thewhodidthis/flash
```

## usage

Flash the time on every second:

```html
<style>
  just-flash {
    font-family: monospace;
  }
</style>
<script type="module">
  import Flash from "https://thewhodidthis.github.io/flash/main.js"

  const flash = document.querySelector("just-flash")
  const flashTheTime = () => {
    flash.flash = new Date().toLocaleTimeString(undefined, { hour12: false })
  }

  customElements.define("just-flash", Flash)
  customElements.whenDefined("just-flash")
    .then(() => {
      flash.ready = true
    })
    .catch((e) => {
      console.log(e)
    })

  flash.addEventListener("ready", flashTheTime)
</script>
<just-flash timeout="1000">Loading&hellip;</just-flash>
```
