import { NullarySideEffector } from '../../../src'

const noop: NullarySideEffector =
	(): void => undefined

export default noop
