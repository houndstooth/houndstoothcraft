import { CanvasState } from './canvas'
import { ControlsState } from './controls'
import { DomState } from './dom'
import { ExecuteState } from './execute'
import { SettingsState } from './settings'

interface AppState {
	canvas: CanvasState,
	controls: ControlsState,
	dom: DomState,
	execute: ExecuteState,
	settings: SettingsState,
}

export {
	AppState,
}
