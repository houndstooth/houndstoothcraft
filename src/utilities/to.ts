// tslint:disable:variable-name member-ordering

import { Frame } from '../animation'
import { Address, ColorSet, ShapeColorIndex, StripePosition, Supertile, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Color } from '../render'
import { ColorRange } from '../render/types/ColorRange'
import { Coordinate, Outline, Radian } from '../space'
import { SettingsPath } from '../store'

// First order, singular

const Dimension: (dimension: number) => Dimension = dimension => dimension as any
const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const ShapeColorIndex: (shapeColorIndex: number) => ShapeColorIndex = shapeColorIndex => shapeColorIndex as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any
const Unit: (unit: number) => Unit = unit => unit as any

// First order, plural aliases

const Dimensions: (dimensions: Array<number | Dimension>) => Dimension[] = dimensions => dimensions as Dimension[]
// Frames not yet needed
const Layers: (layers: Array<number | Layer>) => Layer[] = layers => layers as Layer[]
// Radians might be confusing because it's also natural to say "in radians"; I would call an array of them a Rotation
const ShapeColorIndices: (shapeColorIndices: Array<number | ShapeColorIndex>) => ShapeColorIndex[] =
	shapeColorIndices =>
		shapeColorIndices.map(shapeColorIndex => shapeColorIndex as any) as ShapeColorIndex[]
const StripePositions: (stripePositions: Array<StripePosition | number>) => StripePosition[] = stripePositions =>
	stripePositions.map(stripePosition => stripePosition as any) as StripePosition[]
// Units might be confusing because it's also natural to say "in units"; see Coordinate for a type that is Unit[]

// First order, hybrid singular and plural (only different than above because plural words make sense for them)

const Address: {
	(address: number): Address
	(address: Array<number | Address>): Address[],
} = address => address
const SettingsPath: {
	(settingsPath: string): SettingsPath
	(settingsPath: Array<string | SettingsPath>): SettingsPath[],
} = settingsPath => settingsPath

// Second order, singular

// Dimension -> Pixel
const Supertile: (supertile: Array<Array<Array<number | ShapeColorIndex>>>) => Supertile = supertile =>
	supertile as Supertile
const Coordinate: (coordinate: Array<number | Unit>) => Coordinate = coordinate =>
	coordinate.map(dimension => dimension as any) as Coordinate
const Color: (color: { r?: ColorRange, g?: ColorRange, b?: ColorRange, a }) => Color = color => color as Color

// Third order, singular

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline = outline => outline.map(Coordinate)
const ColorSet: (colorSet: Color[]) => ColorSet = colorSet => colorSet as ColorSet

export {
	Address,
	Color,
	ColorSet,
	Coordinate,
	Dimension,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	Radian,
	SettingsPath,
	ShapeColorIndex,
	ShapeColorIndices,
	StripePosition,
	StripePositions,
	Supertile,
	Unit,
}
