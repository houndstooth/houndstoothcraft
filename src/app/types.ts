import { ControlsState } from './controls'
import { DomState } from './dom'
import { ExecuteState } from './execute'
import { RenderState } from './render'
import { SettingsState } from './setting'

interface AppState {
	controls: ControlsState,
	dom: DomState,
	execute: ExecuteState,
	render: RenderState,
	settings: SettingsState,
}

export {
	AppState,
}
