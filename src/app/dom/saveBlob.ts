// tslint:disable:no-any no-unsafe-any

import { globalWrapper } from '../../utilities'
import { DataBlob } from '../canvas'

const saveBlob: (_: { blob: DataBlob, name: string }) => void =
	({ blob, name }: { blob: DataBlob, name: string }): void => {
		const url: string = globalWrapper.window.URL.createObjectURL(blob)

		const a: HTMLAnchorElement = globalWrapper.document.createElement('a')
		globalWrapper.document.body.appendChild(a)
		a.style.display = 'none'
		a.href = url
		a.download = name

		a.click()
		globalWrapper.window.URL.revokeObjectURL(url)
	}

export default saveBlob
