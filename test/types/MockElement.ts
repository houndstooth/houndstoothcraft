type MockElement = {
	appendChild,
	innerHTML?,
	style: {
		width?,
		height?,
		display?,
	},
	href?,
	download?,
	nextSibling?,
	parentNode?,
	click?,
}

export default MockElement
