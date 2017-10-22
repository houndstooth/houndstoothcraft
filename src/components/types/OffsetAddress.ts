import { Address } from './Address'

type OffsetAddress = (_: { gridAddress: Address[] }) => Address[]

export { OffsetAddress }
