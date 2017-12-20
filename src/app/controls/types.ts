// tslint:disable:no-any

import { Frame, Layer, NamedEffect } from '../../types'
import { ObjectOf } from '../../utilities'
import { FullSettingPath } from '../settings'

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
	overriding: boolean,
}

type OverrideNode = OverrideParentNode | OverrideLeafNode

interface UpdateOverride extends FullSettingPath {
	inputValue: any
}

export {
	OverrideNode,
	ControlsState,
	OverrideParentNode,
	OverrideLeafNode,
	UpdateOverride,
}
