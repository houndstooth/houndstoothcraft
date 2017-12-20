import { to, updateOverrideLeafNode, updateOverrideNodes } from '../../../../../../src/indexForTest'

describe('update override nodes', () => {
	// tslint:disable-next-line:max-line-length
	it('calls update override leaf node on every leaf, to make sure that their overriding status is up-to-date before the dom override controls are built', () => {
		const subject: () => void = updateOverrideNodes.default

		spyOn(updateOverrideLeafNode, 'default')

		subject()

		expect(updateOverrideLeafNode.default).toHaveBeenCalledWith(jasmine.objectContaining({
			patternName: to.SettingStep('animationsPattern'),
			settingName: to.SettingStep('tileResolution'),
			settingPath: to.SettingPath([ 'gridSettings' ]),
		}))
		expect(updateOverrideLeafNode.default).toHaveBeenCalledWith(jasmine.objectContaining({
			patternName: to.SettingStep('layersPattern'),
			settingName: to.SettingStep('supertile'),
			settingPath: to.SettingPath([ 'colorSettings', 'colorAssignmentSettings' ]),
		}))
		expect(updateOverrideLeafNode.default).toHaveBeenCalledWith(jasmine.objectContaining({
			patternName: to.SettingStep('basePattern'),
			settingName: to.SettingStep('zoom'),
			settingPath: to.SettingPath([ 'viewSettings' ]),
		}))
	})
})
