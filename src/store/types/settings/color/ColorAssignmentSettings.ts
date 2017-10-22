import { OffsetAddress, AssignmentMode, Supertile, TransformTileColorIndices, Weave } from '../../../../components'

interface ColorAssignmentSettings {
	assignmentMode: AssignmentMode,
	flipGrain: boolean,
	offsetAddress?: OffsetAddress,
	supertile: Supertile,
	switcheroo: boolean,
	transformTileColorIndices?: TransformTileColorIndices,
	weave: Weave,
}

export { ColorAssignmentSettings }
