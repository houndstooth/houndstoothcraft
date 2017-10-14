import { NullarySideEffector } from '../../src/utilities/types'

const noop: NullarySideEffector = (() => null) as NullarySideEffector

export default noop
