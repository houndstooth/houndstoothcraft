import { NullarySideEffector } from './types'

const noop: NullarySideEffector =
	(): void => undefined

export { noop as main }
