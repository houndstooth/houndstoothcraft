import { document } from '../utilities/windowWrapper'

const getFont = () => {
	const link = document.createElement('link')
	document.body.appendChild(link)
	link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Gilda+Display')
	link.setAttribute('rel', 'stylesheet')
}

export { getFont }
