// tslint:disable:no-unsafe-any no-any no-reaching-imports max-file-line-count

import { codeUtilities, from, globalWrapper, to } from '../../utilities'
import { appState } from '../appState'
import { executeSelectedEffects } from '../execute'
import { clearMixedDownContext } from '../render'
import { DEFAULT_BASE_PATTERN, SettingsPath } from '../settings'
import deeperPath from '../settings/deeperPath'
import getPatternSettingOrCreatePath from '../settings/getPatternSettingOrCreatePath'
import shouldRecurse from '../settings/shouldRecurse'

interface CreateOverrides {
	depth?: number,
	pattern?: any,
	settingsPath?: SettingsPath
}

const createHoundstoothControls: () => void =
	(): void => {
		createOverrideHeading({ settingName: 'basePattern' })
		createOverridesForPattern({ settingsPath: to.SettingsPath([ 'basePattern' ]) })
		createOverrideHeading({ settingName: 'animationsPattern' })
		createOverridesForPattern({ settingsPath: to.SettingsPath([ 'animationsPattern' ]) })
		createOverrideHeading({ settingName: 'layersPattern' })
		createOverridesForPattern({ settingsPath: to.SettingsPath([ 'layersPattern' ]) })
	}

const createOverridesForPattern: (_?: CreateOverrides) => void =
	({ depth = 1, pattern = DEFAULT_BASE_PATTERN, settingsPath = to.SettingsPath([]) }: CreateOverrides = {}): void => {
		const deeperDepth: number = depth + 1
		Object.entries(pattern).forEach(([ settingName, settingValueToDetermineRecursion ]: [ string, any ]) => {
			const deeperSettingsPath: SettingsPath = deeperPath({
				settingName: to.SettingsStep(settingName),
				settingsPath,
			})
			if (shouldRecurse(settingValueToDetermineRecursion)) {
				createOverrideHeading({ settingName, depth: deeperDepth })
				createOverridesForPattern({
					depth: deeperDepth,
					pattern: pattern[ settingName ],
					settingsPath: deeperSettingsPath,
				})
			}
			else {
				let actualSettingValue: any = getPatternSettingOrCreatePath({
					pattern: appState.settings.mainHoundstooth,
					settingsPath: deeperSettingsPath,
				})
				if (codeUtilities.isEmpty(actualSettingValue)) {
					actualSettingValue = undefined
				}
				createOverrideNode({ settingName, depth: deeperDepth, settingValue: actualSettingValue, settingsPath })
			}
		})
	}

interface CreateOverrideNode {
	depth: number,
	settingName: string,
	settingsPath: SettingsPath
	settingValue: any,
}

const createOverrideNode: (_: CreateOverrideNode) => void =
	({ depth, settingName, settingsPath, settingValue }: CreateOverrideNode): void => {
		const overrideNode: HTMLElement = createOverrideHeading({ depth, settingName })

		const overrideInput: HTMLInputElement = globalWrapper.document.createElement('input')
		overrideInput.value = JSON.stringify(settingValue)
		overrideInput.id = from.SettingsPath(settingsPath).concat(settingName).join('-')
		overrideInput.onchange = overrideInputChangeHandler
		overrideNode.appendChild(overrideInput)
	}

const createOverrideHeading: (_: { depth?: number, settingName: string }) => HTMLElement =
	({ depth = 0, settingName }: { depth?: number, settingName: string }): HTMLElement => {
		const overrideName: HTMLElement = globalWrapper.document.createElement('div')
		overrideName.innerHTML = `${Array(depth).join('    ')}${settingName}`

		appState.dom.houndstoothControls.appendChild(overrideName)

		return overrideName
	}

const overrideInputChangeHandler: (_: Event) => void =
	(event: Event): void => {
		const input: HTMLInputElement = event.target as HTMLInputElement
		const value: string = input.value

		const fullSettingsPath: string[] = input.id.split('-')
		const settingName: string = fullSettingsPath.splice(-1)[ 0 ]

		const settingParent: any = getPatternSettingOrCreatePath({
			pattern: appState.settings.overrides,
			settingsPath: to.SettingsPath(fullSettingsPath),
		})
		settingParent[ settingName ] = JSON.parse(value)

		clearMixedDownContext.default()
		executeSelectedEffects.default()
	}

export default createHoundstoothControls
