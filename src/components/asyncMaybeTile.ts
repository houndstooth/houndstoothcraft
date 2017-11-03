import { state } from '../state'
import { document, windowWrapper } from '../utilities/windowWrapper'
import { maybeTile } from './maybeTile'
import { Address, GridAddressFunction } from './types'

const ONE_HUNDRED_PERCENT: number = 100

const asyncMaybeTile: GridAddressFunction =
	({ gridAddress }: { gridAddress: Address }): void => {
		// tslint:disable-next-line:no-unsafe-any
		windowWrapper.setTimeout(
			() => {
				maybeTile({ gridAddress })

				const percentage: number = Math.ceil(state.tilesCompleted * ONE_HUNDRED_PERCENT / (state.tileCount))

				// tslint:disable-next-line:no-unsafe-any
				const progressBar: HTMLElement | undefined = document.querySelector('.progress-bar') as HTMLElement
				if (progressBar) {
					progressBar.style.height = `${ONE_HUNDRED_PERCENT - percentage}%`
				}
			},
			0,
		)
	}

export { asyncMaybeTile }
