// tslint:disable:no-object-literal-type-assertion

import { RenderState } from './types'

const DEFAULT_CONTEXTS: CanvasRenderingContext2D[] = []
const DEFAULT_MIXED_DOWN_CONTEXT: CanvasRenderingContext2D = {} as CanvasRenderingContext2D

const DEFAULT_RENDER_STATE: RenderState = {
	contexts: DEFAULT_CONTEXTS,
	mixedDownContext: DEFAULT_MIXED_DOWN_CONTEXT,
}

export {
	DEFAULT_RENDER_STATE,
}
