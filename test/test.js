const {CLOSE_ATTR, CLOSE_SELECTOR} = window.DetailsDialogElement

describe('details-dialog-element', function() {
  describe('element creation', function() {
    it('creates from document.createElement', function() {
      const el = document.createElement('details-dialog')
      assert.equal('DETAILS-DIALOG', el.nodeName)
    })

    it('creates from constructor', function() {
      const el = new window.DetailsDialogElement()
      assert.equal('DETAILS-DIALOG', el.nodeName)
    })
  })

  describe('after tree insertion', function() {
    beforeEach(function() {
      const container = document.createElement('div')
      container.innerHTML = `
        <details>
          <summary>Click</summary>
          <details-dialog>
            <p>Hello</p>
            <button ${CLOSE_ATTR}>Goodbye</button>
          </details-dialog>
        </details>
      `
      document.body.append(container)
    })

    afterEach(function() {
      document.body.innerHTML = ''
    })

    it('toggles open', function() {
      const details = document.querySelector('details')
      const dialog = details.querySelector('details-dialog')
      assert(!details.open)
      dialog.toggle(true)
      assert(details.open)
      dialog.toggle(false)
      assert(!details.open)
    })

    it('closes with close button', function() {
      const details = document.querySelector('details')
      const dialog = details.querySelector('details-dialog')
      const close = dialog.querySelector(CLOSE_SELECTOR)
      assert(!details.open)
      dialog.toggle(true)
      assert(details.open)
      close.click()
      assert(!details.open)
    })
  })
})
