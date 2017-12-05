// tslint:disable:no-any no-unsafe-any

import { DataBlob } from '../canvas'
import { documentWrapper, windowWrapper } from './windowWrapper'

const saveBlob: (_: { blob: DataBlob, name: string }) => void =
	({ blob, name }: { blob: DataBlob, name: string }): void => {
		const url: string = windowWrapper.URL.createObjectURL(blob)

		const a: HTMLAnchorElement = documentWrapper.createElement('a') as HTMLAnchorElement
		documentWrapper.body.appendChild(a)
		a.style.display = 'none'
		a.href = url
		a.download = name

		a.click()
		windowWrapper.URL.revokeObjectURL(url)
	}

export default saveBlob
