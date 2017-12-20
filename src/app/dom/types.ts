// tslint:disable:no-any

import { ObjectOf } from '../../utilities'
import { FullSettingPath, SettingPath } from '../settings'

interface AppendOverrideParams {
	options: OverrideOptions,
	override: HTMLElement,
	settingPath: SettingPath
}

interface CreateOverrideParams extends FullSettingPath {
	options: OverrideOptions
}

interface CreateOverrideTextParams extends FullSettingPath {
	maybeMark: (_: FullSettingPath) => string,
}

enum _DimensionsBrand {}
type Dimensions = _DimensionsBrand & Px[]

interface DomState {
	canvasContainer: HTMLElement,
	descriptionsContainer: HTMLElement,
	effectToggles: ObjectOf<HTMLInputElement>,
	effectTogglesContainer: HTMLElement,
	frameInput: HTMLInputElement,
	layersProgressBar: HTMLElement,
	mixedDownCanvas: HTMLCanvasElement,
	overridesContainer: HTMLElement,
	pauseButton: HTMLButtonElement,
	playButton: HTMLButtonElement,
	progressBar: HTMLElement,
	progressMessage: HTMLElement,
	rewindButton: HTMLButtonElement,
	snapshotButton: HTMLButtonElement,
}

interface OverrideOptions {
	grandparents: HTMLElement[],
	parent: HTMLElement,
}

interface Px extends Number {
	_PxBrand: any,
}

export {
	AppendOverrideParams,
	CreateOverrideParams,
	CreateOverrideTextParams,
	Dimensions,
	DomState,
	OverrideOptions,
	Px,
}
