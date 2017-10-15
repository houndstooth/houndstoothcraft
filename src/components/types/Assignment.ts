import Supertile from './Supertile'
import Weave from './Weave'
import Address from './Address'
import TileColorIndices from './TileColorIndices'

type Assignment = {
	assignmentMode?: string;
	weave?: Weave;
	supertile?: Supertile;
	switcheroo?: boolean;
	flipGrain?: boolean;
	offsetAddress?: { ({}: { gridAddress: Address }): Address };
	transformTileColorIndices?: {
		({}: { tileColorIndices: TileColorIndices, gridAddress: Address }): TileColorIndices;
	};
}

export default Assignment
