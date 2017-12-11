import { NullarySideEffector } from '../../../src/indexForTest'

const noop: NullarySideEffector =
	(): void => undefined

export default noop
