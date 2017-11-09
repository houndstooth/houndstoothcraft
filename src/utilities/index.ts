import * as codeUtilities from './codeUtilities'
import * as mathUtilities from './mathUtilities'
import { noop } from './noop'
import {
	CouldBeSettingsFunctionObject,
	NullarySideEffector,
	NullaryVoidPromise,
} from './types'
import { consoleWrapper, documentWrapper, windowWrapper } from './windowWrapper'

export {
	mathUtilities,
	codeUtilities,
	CouldBeSettingsFunctionObject,
	NullarySideEffector,
	NullaryVoidPromise,
	noop,
	windowWrapper,
	documentWrapper,
	consoleWrapper,
}
