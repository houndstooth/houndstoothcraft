// tslint:disable:no-any no-unsafe-any

import { DataBlob } from '../page'
import { document, window } from '../utilities/windowWrapper'

const saveBlob: (_: { blob: DataBlob, name: string }) => void =
	({ blob, name }: { blob: DataBlob, name: string }): void => {
		const url: any = window.URL.createObjectURL(blob)

		const a: any = document.createElement('a')
		document.body.appendChild(a)
		a.style = { display: 'none' }
		a.href = url
		a.download = name

		a.click()
		window.URL.revokeObjectURL(url)
	}

export { saveBlob }
