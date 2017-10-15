import { NullarySideEffector } from '../../src/utilities/types'

const noop: NullarySideEffector = (() => undefined) as NullarySideEffector

export default noop
