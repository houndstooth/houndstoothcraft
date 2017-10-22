import { Address, AssignmentMode, Supertile, TileColorIndices, Weave } from '../../../../components'

interface ColorAssignmentSettings {
	assignmentMode: AssignmentMode,
	flipGrain: boolean,
	offsetAddress: (_: { gridAddress: Address }) => Address,
	supertile: Supertile,
	switcheroo: boolean,
	transformTileColorIndices: (_: {  gridAddress: Address, tileColorIndices: TileColorIndices }) => TileColorIndices,
	weave: Weave,
}

export { ColorAssignmentSettings }
