import Spy = jasmine.Spy

interface MockElement {
	classList: {
		add: { (className: string): void },
	},
	appendChild: { (child: HTMLElement): void },
	innerHTML: string,
	style: object,
	setAttribute: { (attribute: string, value: string): void }
	parentNode: {
		insertBefore: Spy,
		removeChild: Spy,
	},
	click: Spy,
	href?: string,
	download?: string,
	nextSibling?: Element,
}

export {
	MockElement,
}
