// tslint:disable:no-any

import { Frame, Layer, NamedEffect } from '../../types'
import { ObjectOf } from '../../utilities'

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	endLayer: Layer,
	exportFrames: boolean,
	overrideNodes: OverrideParentNode,
	selectedEffects: NamedEffect[],
}

interface OverrideParentNode {
	children: ObjectOf<OverrideNode>
	open: boolean,
}

interface OverrideLeafNode {
	overriding: false,
}

type OverrideNode = OverrideParentNode | OverrideLeafNode

export {
	OverrideNode,
	ControlsState,
	OverrideParentNode,
	OverrideLeafNode,
}
