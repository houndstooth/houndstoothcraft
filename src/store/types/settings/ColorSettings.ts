import { Color } from '../../../render'
import { ColorAssignment } from './color'

interface ColorSettings {
	colorAssignment: Partial<ColorAssignment>,
	backgroundColor: Color,
	colorSet: Color[],
	opacity: number,
}

export { ColorSettings }
