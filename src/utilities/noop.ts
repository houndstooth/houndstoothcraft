import { NullarySideEffector } from './types'

const noop: NullarySideEffector =
	(): void => undefined

export default noop
