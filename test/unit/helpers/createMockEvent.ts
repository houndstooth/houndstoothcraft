import { MockEvent } from './types'
import Spy = jasmine.Spy

const createMockEvent: (_?: { stopPropagation?: Spy, target?: HTMLElement }) => MockEvent =
	({ stopPropagation, target }: { stopPropagation?: Spy, target?: HTMLElement } = {}): MockEvent =>
		({
			AT_TARGET: undefined,
			BUBBLING_PHASE: undefined,
			CAPTURING_PHASE: undefined,
			bubbles: undefined,
			cancelBubble: undefined,
			cancelable: undefined,
			currentTarget: undefined,
			deepPath: undefined,
			defaultPrevented: undefined,
			eventPhase: undefined,
			initEvent: undefined,
			isTrusted: undefined,
			preventDefault: undefined,
			returnValue: undefined,
			scoped: undefined,
			srcElement: undefined,
			stopImmediatePropagation: undefined,
			stopPropagation,
			target,
			timeStamp: undefined,
			type: undefined,
		})

export default createMockEvent
