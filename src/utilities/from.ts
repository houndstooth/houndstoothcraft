// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, ShapeColorIndex, StripePosition, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Coordinate, Radian } from '../space'
import { Outline } from '../space/types/Outline'
import { SettingsPath } from '../store'

// First order, singular

const Dimension: (dimension: Dimension) => number = dimension => dimension as any
const Frame: (frame: Frame) => number = frame => frame as any
const Layer: (layer: Layer) => number = layer => layer as any
const Radian: (radian: Radian) => number = radian => radian as any
const ShapeColorIndex: (shapeColorIndex: ShapeColorIndex) => number = shapeColorIndex => shapeColorIndex as any
const StripePosition: (stripePosition: StripePosition) => number = stripePosition => stripePosition as any
const Unit: (units: Unit) => number = units => units as any

// First order, hybrid singular and plural (only different than above because plural words make sense for them)

const SettingsPath: {
	(settingsPath: SettingsPath): string
	(settingPath: SettingsPath): string[],
} = settingsPath => settingsPath
const Address: {
	(address: Address): number
	(address: Address[]): number[],
} = address => address

// Second order, singular

const Coordinate: (coordinate: Coordinate) => number[] = coordinate => coordinate as any

// Third order, singular

const Outline: (outline: Outline) => number[][] = outline => outline as any

export {
	Address,
	Coordinate,
	Dimension,
	Frame,
	Layer,
	Outline,
	Radian,
	SettingsPath,
	ShapeColorIndex,
	StripePosition,
	Unit,
}
