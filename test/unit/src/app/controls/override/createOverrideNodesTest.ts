import { appState, createOverrideNodes, OverrideParentNode } from '../../../../../../src/indexForTest'

describe('create override controls', () => {
	it('initializes the controls for every pattern setting to closed and not yet overriding', () => {
		const subject: () => void = createOverrideNodes.default
		subject()

		const overrideNodes: OverrideParentNode = appState.controls.overrideNodes

		const basePattern: OverrideParentNode = overrideNodes.children.basePattern as OverrideParentNode
		expect(basePattern.children.animationSettings).toEqual({
			children: {
				refreshCanvas: { overriding: false },
			},
			open: false,
		})
		const layersPattern: OverrideParentNode = overrideNodes.children.layersPattern as OverrideParentNode
		expect(layersPattern.children.animationSettings).toEqual({
			children: {
				refreshCanvas: { overriding: false },
			},
			open: false,
		})
		const animationsPattern: OverrideParentNode = overrideNodes.children.animationsPattern as OverrideParentNode
		expect(animationsPattern.children.animationSettings).toEqual({
			children: {
				refreshCanvas: { overriding: false },
			},
			open: false,
		})
	})
})
