// tslint:disable:no-any no-unsafe-any

import { globalWrapper } from '../../../utilities'

const saveBlobThroughAnchor: (_: { blob: Blob, name: string }) => void =
	({ blob, name }: { blob: Blob, name: string }): void => {
		// @ts-ignore
		const url: string = globalWrapper.window.URL.createObjectURL(blob)

		const a: HTMLAnchorElement = globalWrapper.document.createElement('a')

		a.style.display = 'none'
		a.href = url
		a.download = name

		a.click()
		// @ts-ignore
		globalWrapper.window.URL.revokeObjectURL(url)
	}

export default saveBlobThroughAnchor
