import { AssignmentMode, OffsetAddress, Supertile, TransformShapeColorIndices, Weave } from '../../../../components'

interface ColorAssignmentSettings {
	assignmentMode: AssignmentMode,
	flipGrain: boolean,
	offsetAddress?: OffsetAddress,
	supertile: Supertile,
	switcheroo: boolean,
	transformShapeColorIndices?: TransformShapeColorIndices,
	weave: Weave,
}

export { ColorAssignmentSettings }
