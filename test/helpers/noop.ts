import { NullarySideEffector } from '../../src/utilities/types/NullarySideEffector'

const noop: NullarySideEffector =
	(): void => undefined

export { noop }
