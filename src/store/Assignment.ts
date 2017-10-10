import Supertile from './Supertile'

type Assignment = {
	assignmentMode?: string,
	weave?: { rows: number[], columns: number[] },
	supertile?: Supertile,
	switcheroo?: boolean,
}

export default Assignment
