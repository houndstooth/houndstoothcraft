// tslint:disable:no-any

import { Px } from '../../app'
import { Radian } from '../stripe'
import { ViewSettings } from './viewSettings'

const DEFAULT_SCROLL: Px[] = [ 0, 0 ] as any
const DEFAULT_TILT: Radian = 0 as any
const DEFAULT_ZOOM: number = 1

const DEFAULT_VIEW_SETTINGS: ViewSettings = {
	scroll: DEFAULT_SCROLL,
	tilt: DEFAULT_TILT,
	zoom: DEFAULT_ZOOM,
}

export {
	DEFAULT_VIEW_SETTINGS,
}
