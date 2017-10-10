import { window, document } from '../utilities/windowWrapper'

const saveBlob = ({ blob, name }: { blob: any, name: string }): void => {
	const url = window.URL.createObjectURL(blob)

	const a = document.createElement('a')
	document.body.appendChild(a)
	a.style = 'display: none'
	a.href = url
	a.download = name

	a.click()
	window.URL.revokeObjectURL(url)
}

export default saveBlob
