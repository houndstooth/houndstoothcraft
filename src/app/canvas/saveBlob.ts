// tslint:disable:no-any no-unsafe-any

import { documentWrapper, windowWrapper } from '../../utilities'
import { DataBlob } from './types'

const saveBlob: (_: { blob: DataBlob, name: string }) => void =
	({ blob, name }: { blob: DataBlob, name: string }): void => {
		const url: any = windowWrapper.URL.createObjectURL(blob)

		const a: any = documentWrapper.createElement('a')
		documentWrapper.body.appendChild(a)
		a.style = { display: 'none' }
		a.href = url
		a.download = name

		a.click()
		windowWrapper.URL.revokeObjectURL(url)
	}

export { saveBlob as main }
