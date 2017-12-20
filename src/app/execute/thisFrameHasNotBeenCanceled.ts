import { appState } from '../appState'

const thisFrameHasNotBeenCanceled: (frameId: number) => boolean =
	(frameId: number): boolean =>
		frameId === appState.execute.frameId

export default thisFrameHasNotBeenCanceled
