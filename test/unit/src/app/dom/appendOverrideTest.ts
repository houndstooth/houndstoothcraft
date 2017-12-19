import {
	appendOverride,
	AppendOverrideParams,
	OverrideOptions,
	SettingPath,
	to,
} from '../../../../../src/indexForTest'
import { buildMockElement } from '../../../helpers'

describe('append override', () => {
	let greatGreatGrandparent: HTMLElement
	let greatGrandparent: HTMLElement
	let grandparent: HTMLElement
	let parent: HTMLElement
	let override: HTMLElement

	let options: OverrideOptions

	let greatGrandparentsChildren: HTMLElement[]
	let grandparentsChildren: HTMLElement[]
	let parentsChildren: HTMLElement[]

	let subject: (_: AppendOverrideParams) => void
	beforeEach(() => {
		greatGrandparentsChildren = []
		grandparentsChildren = []
		parentsChildren = []

		greatGreatGrandparent = buildMockElement() as HTMLElement
		greatGrandparent = buildMockElement({ children: greatGrandparentsChildren }) as HTMLElement
		grandparent = buildMockElement({ children: grandparentsChildren }) as HTMLElement
		parent = buildMockElement({ children: parentsChildren }) as HTMLElement
		override = buildMockElement() as HTMLElement

		subject = appendOverride.default
		options = {
			grandparents: [ greatGreatGrandparent, greatGrandparent, grandparent ],
			parent,
		}
	})

	describe('when the node is more than a step shallower than the current pointer to where to append', () => {
		beforeEach(() => {
			const settingPath: SettingPath = to.SettingPath([
				'another great grandparent',
			])
			subject({ options, override, settingPath })
		})

		it('pops grandparents off the stack', () => {
			expect(options.grandparents.length).toBe(2)
			expect(options.grandparents[ 0 ]).toBe(greatGreatGrandparent)
			expect(options.grandparents[ 1 ]).toBe(greatGrandparent)
		})

		it('looks at the top of the grandparent stack to know where to append the passed node', () => {
			expect(greatGrandparentsChildren[0]).toBe(override)
		})

		it('points the parent to the passed node', () => {
			expect(options.parent).toBe(override)
		})
	})

	describe('when the node is a step shallower than the current pointer to where to append', () => {
		beforeEach(() => {
			const settingPath: SettingPath = to.SettingPath([
				'not another great grandparent',
				'rather another grandparent',
			])
			subject({ options, override, settingPath })
		})

		it('leaves the grandparents stack intact', () => {
			expect(options.grandparents.length).toBe(3)
			expect(options.grandparents[ 0 ]).toBe(greatGreatGrandparent)
			expect(options.grandparents[ 1 ]).toBe(greatGrandparent)
			expect(options.grandparents[ 2 ]).toBe(grandparent)
		})

		it('looks at the top of the grandparent stack to know where to append the passed node', () => {
			expect(grandparentsChildren[0]).toBe(override)
		})

		it('points the parent to the passed node', () => {
			expect(options.parent).toBe(override)
		})
	})

	describe('when the node is at the same depth as the current pointer to where to append', () => {
		beforeEach(() => {
			const settingPath: SettingPath = to.SettingPath([
				'not another great grandparent',
				'nor another grandparent',
				'rather another parent',
			])
			subject({ options, override, settingPath })
		})

		it('pushes the old parent onto the stack of grandparents', () => {
			expect(options.grandparents.length).toBe(4)
			expect(options.grandparents[ 0 ]).toBe(greatGreatGrandparent)
			expect(options.grandparents[ 1 ]).toBe(greatGrandparent)
			expect(options.grandparents[ 2 ]).toBe(grandparent)
			expect(options.grandparents[ 3 ]).toBe(parent)
		})

		it('uses the existing parent to know where to append the passed node', () => {
			expect(parentsChildren[0]).toBe(override)
		})

		it('points the parent to the passed node', () => {
			expect(options.parent).toBe(override)
		})
	})

	describe('when the node is deeper than the current pointer to where to append', () => {
		it('errors', () => {
			const settingPath: SettingPath = to.SettingPath([
				'not another great grandparent',
				'nor another grandparent',
				'nor even another parent',
				'rather a new child',
			])

			const thrower: () => void = (): void => {
				subject({ options, override, settingPath })
			}
			expect(thrower).toThrow(new Error('how did you skip a parent?'))
		})
	})
})
