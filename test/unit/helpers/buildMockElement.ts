import { PageElement } from '../../../src/app/page'
import { MockElement } from '../../helpers/types'
import { BuildMockElementParams } from './types'

const buildMockElement: (_?: BuildMockElementParams) => MockElement =
	(params?: BuildMockElementParams): MockElement => {
		const {
			attributeObject = {},
			children = [],
			classList = [],
			clickSpy,
			parentNodeInsertBeforeSpy,
			parentNodeRemoveChildSpy,
		}: BuildMockElementParams = params || {}

		return {
			appendChild: (child: PageElement): number => children.push(child),
			classList: {
				add: (className: string): number => classList.push(className),
			},
			click: clickSpy,
			innerHTML: '',
			parentNode: {
				insertBefore: parentNodeInsertBeforeSpy,
				removeChild: parentNodeRemoveChildSpy,
			},
			setAttribute: (attribute: string, value: string): string => attributeObject[ attribute ] = value,
			style: {},
		}
	}

export { buildMockElement }
