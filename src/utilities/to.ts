// tslint:disable:variable-name member-ordering

import { Frame } from '../animation'
import { Address, ColorSet, Grid, ShapeColorIndex, StripePosition, Supertile, Unit } from '../components'
import { Layer } from '../execute'
import { Dimension } from '../page'
import { Color, Pixel } from '../render'
import { ColorRange } from '../render/types/ColorRange'
import { Path } from '../render/types/Path'
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
// Address (singular) not yet needed
const SettingsStep: (settingsStep: string) => SettingsPath = settingsStep => settingsStep as any

// First order, plurals

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
const Address: (address: Array<number | Address>) => Address[] = address => address as any
const SettingsPath: (settingsPath: Array<string | SettingsPath>) => SettingsPath[] = settingsPath => settingsPath as any

// Second order, singular

const Supertile: (supertile: Grid<Array<number | ShapeColorIndex>>) => Supertile = supertile =>
	supertile as Supertile
const Coordinate: (coordinate: Array<number | Unit>) => Coordinate = coordinate =>
	coordinate.map(unit => unit as any) as Coordinate
const Color: (color: { r?: ColorRange, g?: ColorRange, b?: ColorRange, a: number }) => Color = color => color as Color
const Pixel: (pixel: Array<number | Dimension>) => Pixel = pixel =>
	pixel.map(dimension => dimension as any) as Pixel

// Third order, singular

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline = outline => outline.map(Coordinate)
const ColorSet: (colorSet: Color[]) => ColorSet = colorSet => colorSet as ColorSet
const Path: (path: Array<Array<number | Dimension> | Pixel>) => Path = path => path.map(Pixel)

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
	Path,
	Pixel,
	Radian,
	SettingsPath,
	SettingsStep,
	ShapeColorIndex,
	ShapeColorIndices,
	StripePosition,
	StripePositions,
	Supertile,
	Unit,
}
