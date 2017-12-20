// tslint:disable:no-reaching-imports
import { DEFAULT_CONTROLS_STATE } from './controls/defaults'
import { DEFAULT_DOM_STATE } from './dom/defaults'
import { DEFAULT_EXECUTE_STATE } from './execute/defaults'
import { DEFAULT_RENDER_STATE } from './render/defaults'
import { DEFAULT_SETTINGS_STATE } from './setting/defaults'
import { AppState } from './types'

const DEFAULT_APP_STATE: AppState = {
	controls: DEFAULT_CONTROLS_STATE,
	dom: DEFAULT_DOM_STATE,
	execute: DEFAULT_EXECUTE_STATE,
	render: DEFAULT_RENDER_STATE,
	settings: DEFAULT_SETTINGS_STATE,
}

export {
	DEFAULT_APP_STATE,
}
