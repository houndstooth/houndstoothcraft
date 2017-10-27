import { AddressElement } from './AddressElement'

enum _AddressBrand {}
type Address = _AddressBrand & AddressElement[]

export { Address }
