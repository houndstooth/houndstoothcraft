import {
	appState,
	createOverrideNodes,
	FullSettingPath,
	OverrideLeafNode,
	OverrideParentNode,
	SettingPath,
	SettingStep,
	to,
	updateOverrideLeafNode,
} from '../../../../../../src/indexForTest'

describe('update override leaf node test', () => {
	let subject: (_: FullSettingPath) => void
	let fullSettingPath: FullSettingPath
	let overrideLeafNode: OverrideLeafNode
	beforeEach(() => {
		const settingName: SettingStep = to.SettingStep('zoom')
		const settingPath: SettingPath = to.SettingPath([ 'viewSettings' ])
		const patternName: SettingStep = to.SettingStep('basePattern')
		fullSettingPath = { patternName, settingName, settingPath }
		subject = updateOverrideLeafNode.default

		createOverrideNodes.default()

		const basePattern: OverrideParentNode = appState.controls.overrideNodes.children.basePattern as OverrideParentNode
		const viewSettings: OverrideParentNode = basePattern.children.viewSettings as OverrideParentNode
		overrideLeafNode = viewSettings.children.zoom as OverrideLeafNode
	})

	describe('when there is no value in the overrides for the setting', () => {
		it('sets overriding to false', () => {
			subject(fullSettingPath)

			expect(overrideLeafNode.overriding).toBe(false)
		})
	})

	describe('when there is a value in the overrides for the setting', () => {
		describe('when there is no value in the combined effects for the setting', () => {
			it('sets overriding to false when the overrides value matches the default value', () => {
				appState.settings.overrides.basePattern = { viewSettings: { zoom: 1 } }

				subject(fullSettingPath)

				expect(overrideLeafNode.overriding).toBe(false)
			})

			it('sets overriding to true when the overrides value does not match the default value', () => {
				appState.settings.overrides.basePattern = { viewSettings: { zoom: 3 } }

				subject(fullSettingPath)

				expect(overrideLeafNode.overriding).toBe(true)
			})
		})

		describe('when there is a value in the combined effects for the setting', () => {
			it('sets overriding to false when they match', () => {
				appState.settings.overrides.basePattern = { viewSettings: { zoom: 3 } }
				appState.settings.combinedEffects.basePattern = { viewSettings: { zoom: 3 } }

				subject(fullSettingPath)

				expect(overrideLeafNode.overriding).toBe(false)
			})

			it('sets overriding to true when they do not match', () => {
				appState.settings.overrides.basePattern = { viewSettings: { zoom: 3 } }
				appState.settings.combinedEffects.basePattern = { viewSettings: { zoom: 2 } }

				subject(fullSettingPath)

				expect(overrideLeafNode.overriding).toBe(true)
			})
		})
	})
})
