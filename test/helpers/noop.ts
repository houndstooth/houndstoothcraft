import { NullarySideEffector } from '../../src/utilities/types'

const noop: NullarySideEffector =
	(): void => undefined

export { noop }
