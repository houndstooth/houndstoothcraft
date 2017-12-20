import { OverrideLeafNode, OverrideNode, OverrideParentNode } from './types'

const isParentOfAnyOverridingChildren: (_: OverrideParentNode) => boolean =
	(overrideParent: OverrideParentNode): boolean =>
		Object.values(overrideParent.children).some((overrideNode: OverrideNode): boolean => {
			if ((overrideNode as OverrideParentNode).children) {
				return isParentOfAnyOverridingChildren(overrideNode as OverrideParentNode)
			}
			else {
				return (overrideNode as OverrideLeafNode).overriding
			}
		})

export default isParentOfAnyOverridingChildren
