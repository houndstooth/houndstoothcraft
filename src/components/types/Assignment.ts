import Supertile from './Supertile'
import Weave from './Weave'
import Address from './Address'

type Assignment = {
	assignmentMode?: string,
	weave?: Weave,
	supertile?: Supertile,
	switcheroo?: boolean,
	flipGrain?: boolean,
	offsetAddress?: { ({}: { gridAddress: Address }): Address },
}

export default Assignment
