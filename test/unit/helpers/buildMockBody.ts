import { MockElement } from '../../helpers'

const buildMockBody: (_?: { children?: HTMLElement[] }) => MockElement =
	({ children = [] }: { children?: HTMLElement[] } = {}): MockElement => ({
		appendChild: (child: HTMLElement): number => children.push(child),
		style: {},
	})

export default buildMockBody
