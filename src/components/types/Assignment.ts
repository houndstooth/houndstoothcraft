import Address from './Address'
import AssignmentMode from './AssignmentMode'
import Supertile from './Supertile'
import TileColorIndices from './TileColorIndices'
import Weave from './Weave'

interface Assignment {
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
