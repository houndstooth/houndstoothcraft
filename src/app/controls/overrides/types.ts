import { ObjectOf } from '../../../utilities'
import { FullSettingPath } from '../../settings'

interface OverrideParentNode {
	children: ObjectOf<OverrideNode>
	open: boolean,
}

interface OverrideLeafNode {
	overriding: boolean,
}

type OverrideNode = OverrideParentNode | OverrideLeafNode

interface UpdateOverride extends FullSettingPath {
	// tslint:disable-next-line:no-any
	inputValue: any
}

export {
	OverrideNode,
	OverrideParentNode,
	OverrideLeafNode,
	UpdateOverride,
}
