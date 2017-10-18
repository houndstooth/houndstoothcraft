interface MockElement {
	appendChild,
	click?,
	download?,
	href?,
	innerHTML?,
	nextSibling?,
	parentNode?,
	style: {
		display?,
		height?,
		width?,
	},
}

export { MockElement }
