import { NullarySideEffector } from '../../src/utilities/types'

const noop: NullarySideEffector = (() => undefined) as any

export { noop }
