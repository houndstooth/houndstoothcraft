import { InputElement, PageElement } from '../../../src/app/page/types'
import Spy = jasmine.Spy
import { NullarySideEffector } from '../../../src/utilities/types'

interface BuildMockElementParams {
	readonly attributeObject?: { [ index: string ]: string },
	readonly children?: PageElement[],
	readonly classList?: string[],
	readonly clickSpy?: Spy,
	readonly parentNodeInsertBeforeSpy?: Spy,
	readonly parentNodeRemoveChildSpy?: Spy,
}

interface ExampleSettings extends ExampleSettingsStructure {
	settingOne: number,
	settingTwo: string,
	[_: string]: number | string,
}

interface ExampleSettingsStructure {
	settingOne: {},
	settingTwo: {},
}

interface TestObject {
	aaa?: string,
	bbb?: string,
}

type SimulateClick = (checkbox: InputElement, clickHandler: NullarySideEffector) => void

export {
	BuildMockElementParams,
	ExampleSettings,
	ExampleSettingsStructure,
	SimulateClick,
	TestObject,
}
