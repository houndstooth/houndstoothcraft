// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, ShapeColorIndex, StripePosition, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Coordinate, Radian } from '../space'
import { SettingsPath, SettingsStep } from '../store'

const Frame: (frame: Frame) => number = frame => frame as any
const Layer: (layer: Layer) => number = layer => layer as any
const Radian: (radian: Radian) => number = radian => radian as any
const Unit: (units: Unit) => number = units => units as any
const Dimension: (dimension: Dimension) => number = dimension => dimension as any
const StripePosition: (stripePosition: StripePosition) => number = stripePosition => stripePosition as any
const ShapeColorIndex: (shapeColorIndex: ShapeColorIndex) => number = shapeColorIndex => shapeColorIndex as any
const SettingsStep: (settingStep: SettingsStep) => string = settingsStep => settingsStep as any

const Coordinate: (coordinate: Coordinate) => number[] = coordinate => coordinate as any
const Address: {
	(address: Address): number
	(address: Address[]): number[],
} = address => address
const SettingsPath: (settingPath: SettingsPath) => string[] = settingsPath => settingsPath as any

export {
	Address,
	Coordinate,
	Dimension,
	Frame,
	Layer,
	Radian,
	StripePosition,
	Unit,
	SettingsStep,
	SettingsPath,
	ShapeColorIndex,
}
