// tslint:disable:variable-name

import { Frame } from '../animation'
import { Address, ShapeColorIndex, StripePosition, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Coordinate, Radian } from '../space'
import { Outline } from '../space/types/Outline'
import { SettingsPath } from '../store'
import { Pixel } from '../render'

// First order, singular

const Dimension: (dimension: Dimension) => number = dimension => dimension as any
const Frame: (frame: Frame) => number = frame => frame as any
const Layer: (layer: Layer) => number = layer => layer as any
const Radian: (radian: Radian) => number = radian => radian as any
const ShapeColorIndex: (shapeColorIndex: ShapeColorIndex) => number = shapeColorIndex => shapeColorIndex as any
const StripePosition: (stripePosition: StripePosition) => number = stripePosition => stripePosition as any
const Unit: (units: Unit) => number = units => units as any
// singular Address not yet needed
const SettingsStep: (settingsStep: SettingsPath) => string = settingsStep => settingsStep as any

// First order, plurals

// Dimensions not yet needed
// Frames not yet needed
// Layers not yet needed
// Radians not yet needed
// ShapeColorIndices not yet needed
// StripePositions not yet needed
// Units not yet needed
const Address: (address: Address[]) => number[] = address => address as any
const SettingsPath: (settingPath: SettingsPath) => string[] = settingsPath => settingsPath as any

// Second order, singular

// Supertile not yet needed
const Coordinate: (coordinate: Coordinate) => number[] = coordinate => coordinate as any
// Color not yet needed
const Pixel: (pixel: Pixel) => number[] = pixel => pixel as any

// Third order, singular

const Outline: (outline: Outline) => number[][] = outline => outline as any
// ColorSet not yet needed
// Path not yet needed

export {
	Address,
	Coordinate,
	Dimension,
	Frame,
	Layer,
	Outline,
	Pixel,
	Radian,
	SettingsPath,
	SettingsStep,
	ShapeColorIndex,
	StripePosition,
	Unit,
}
