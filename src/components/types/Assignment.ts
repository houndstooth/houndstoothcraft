import Supertile from './Supertile'
import Weave from './Weave'
import Address from './Address'
import TileColorIndices from './TileColorIndices'
import AssignmentMode from './AssignmentMode'

type Assignment = {
	assignmentMode?: AssignmentMode;
	flipGrain?: boolean;
	offsetAddress?: { ({}: { gridAddress: Address }): Address };
	supertile?: Supertile;
	switcheroo?: boolean;
	transformTileColorIndices?: {
		({}: {  gridAddress: Address, tileColorIndices: TileColorIndices }): TileColorIndices;
	};
	weave?: Weave;
}

export default Assignment
