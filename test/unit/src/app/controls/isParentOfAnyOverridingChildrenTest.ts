import {
	appState,
	createOverrideNodes,
	isParentOfAnyOverridingChildren,
	OverrideLeafNode,
	OverrideParentNode,
} from '../../../../../src/indexForTest'

describe('is parent of any overriding children', () => {
	it('returns true if any of the override parent node\'s children (or grandchildren) is overriding', () => {
		const subject: (_: OverrideParentNode) => boolean = isParentOfAnyOverridingChildren.default

		createOverrideNodes.default()

		const basePattern: OverrideParentNode = appState.controls.overrideNodes.children.basePattern as OverrideParentNode
		const stripeSettings: OverrideParentNode = basePattern.children.stripeSettings as OverrideParentNode
		// tslint:disable-next-line:max-line-length
		const stripePositionSettings: OverrideParentNode = stripeSettings.children.stripePositionSettings as OverrideParentNode
		const stripeCount: OverrideLeafNode = stripePositionSettings.children.stripeCount as OverrideLeafNode

		expect(subject(basePattern)).toBe(false)
		expect(subject(stripeSettings)).toBe(false)
		expect(subject(stripePositionSettings)).toBe(false)

		stripeCount.overriding = true

		expect(subject(basePattern)).toBe(true)
		expect(subject(stripeSettings)).toBe(true)
		expect(subject(stripePositionSettings)).toBe(true)
	})
})
