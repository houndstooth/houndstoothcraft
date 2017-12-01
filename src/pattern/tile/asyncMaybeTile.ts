import { state } from '../../state'
import { documentWrapper, windowWrapper } from '../../utilities'
import { ReferencedGridAddress } from '../grid'
import { thisPatternHasNotBeenCanceled } from '../layer'
import maybeTile from './maybeTile'

const ONE_HUNDRED_PERCENT: number = 100

const asyncMaybeTile: (_: ReferencedGridAddress) => void =
	({ gridAddress, thisPatternRef }: ReferencedGridAddress): void => {
		// tslint:disable-next-line:no-unsafe-any
		windowWrapper.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled.default(thisPatternRef)) {
					maybeTile({ gridAddress, thisPatternRef })

					const percentage: number = Math.ceil(state.tilesCompleted * ONE_HUNDRED_PERCENT / (state.tileCount))

					// tslint:disable-next-line:no-unsafe-any
					const progressBar: HTMLElement | undefined = documentWrapper.querySelector('#progress-bar') as HTMLElement
					if (progressBar) {
						progressBar.style.width = `${percentage}%`
					}

					// tslint:disable-next-line:no-unsafe-any max-line-length
					const progressMessage: HTMLElement | undefined = documentWrapper.querySelector('#progress-message') as HTMLElement
					if (progressMessage) {
						progressMessage.textContent = `Rendering frame ${state.currentFrame}: ${percentage}%`
					}
				}
			},
			0,
		)
	}

export default asyncMaybeTile
