// tslint:disable:no-any no-unsafe-any

import { globalWrapper } from '../../../utilities'

const saveBlobThroughAnchor: (_: { blob: Blob, name: string }) => void =
	({ blob, name }: { blob: Blob, name: string }): void => {
		const url: string = globalWrapper.window.URL.createObjectURL(blob)

		const a: HTMLAnchorElement = globalWrapper.document.createElement('a')

		a.style.display = 'none'
		a.href = url
		a.download = name

		a.click()
		globalWrapper.window.URL.revokeObjectURL(url)
	}

export default saveBlobThroughAnchor
