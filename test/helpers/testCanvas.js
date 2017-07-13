let testMarkerCanvas = document.querySelector('.testMarkerCanvas')

if (!testMarkerCanvas) {
	const place = document.createElement('div')
	place.classList.add('place')
	place.style.height = '800px'
	document.body.insertBefore( place, document.body.firstChild );

	testMarkerCanvas = document.createElement('canvas')
	testMarkerCanvas.classList.add('testMarkerCanvas')
	place.appendChild(testMarkerCanvas)
}

export default testMarkerCanvas
