class NikeHeader extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const template = document.getElementById('nike-header')
		const clone = template.content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}
}

customElements.define('nike-header', NikeHeader)

class NikeFooter extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		const template = document.getElementById('nike-footer')
		const clone = template.content.cloneNode(true)
		this.shadowRoot.appendChild(clone)
	}
}

customElements.define('nike-footer', NikeFooter)
