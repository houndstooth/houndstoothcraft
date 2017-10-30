// tslint:disable:variable-name member-ordering no-any

import { Frame } from '../animation'
import {
	Address,
	AddressElement,
	ColorSet,
	Grid,
	ShapeColorIndex,
	StripePosition,
	Supertile,
	Unit,
} from '../components'
import { Layer, SettingsFunctionObject } from '../execute'
import { Dimensions, Px } from '../page'
import { Color, Path, Pixel } from '../render'
import { Coordinate, Outline, Radian } from '../space'
import { SettingsPath, SettingsStep } from '../store'

// First order, singular

const Px: (px: number) => Px = px => px as any
const Frame: (frame: number) => Frame = frame => frame as any
const Layer: (layer: number) => Layer = layer => layer as any
const Radian: (radian: number) => Radian = radian => radian as any
const ShapeColorIndex: (shapeColorIndex: number) => ShapeColorIndex = shapeColorIndex => shapeColorIndex as any
const StripePosition: (stripePosition: number) => StripePosition = stripePosition => stripePosition as any
const Unit: (unit: number) => Unit = unit => unit as any
const AddressElement: (addressElement: number) => AddressElement = addressElement => addressElement as any
const SettingsStep: (settingsStep: string) => SettingsStep = settingsStep => settingsStep as any

// First order, plurals

// Frames not yet needed
const Layers: (layers: Array<number | Layer>) => Layer[] = layers => layers as Layer[]
// Radians might be confusing because it's also natural to say "in radians"; I would call an array of them a Rotation
const ShapeColorIndices: (shapeColorIndices: Array<number | ShapeColorIndex>) => ShapeColorIndex[] =
	shapeColorIndices =>
		shapeColorIndices.map(shapeColorIndex => shapeColorIndex as any) as ShapeColorIndex[]
const StripePositions: (stripePositions: Array<StripePosition | number>) => StripePosition[] = stripePositions =>
	stripePositions.map(stripePosition => stripePosition as any) as StripePosition[]
// Units might be confusing because it's also natural to say "in units"; see Coordinate for a type that is Unit[]
const Address: (address: Array<number | AddressElement>) => Address = address => address as any
const SettingsPath: (settingsPath: SettingsStep[] | Array<string | SettingsStep>) =>
	SettingsPath = settingsPath => settingsPath as any

// Second order, singular

const Supertile: (supertile: Grid<Array<number | ShapeColorIndex>>) => Supertile = supertile =>
	supertile as Supertile
const Coordinate: (coordinate: Array<number | Unit>) => Coordinate = coordinate =>
	coordinate.map(unit => unit as any) as Coordinate
const Pixel: (pixel: Array<number | Px>) => Pixel = pixel =>
	pixel.map(px => px as any) as Pixel
const Dimensions: (dimensions: Array<number | Px>) => Dimensions = dimensions =>
	dimensions.map(px => px as any) as Dimensions

// Second order, plural
const SettingsFunctionObjects: (settingsFunctionObjects: Array<{
	settingName: string, settingsFunction: <T>(p: T) => T, settingsPath: string[],
}>) => SettingsFunctionObject = settingsFunctionObjects =>
	settingsFunctionObjects.map(({ settingName, settingsFunction, settingsPath }) => ({
		settingName: SettingsStep(settingName),
		settingsFunction,
		settingsPath: SettingsPath(settingsPath),
	})) as any

// Third order, singular

const Outline: (outline: Array<Array<number | Unit> | Coordinate>) => Outline = outline => outline.map(Coordinate)
const ColorSet: (colorSet: Color[]) => ColorSet = colorSet => colorSet as ColorSet
const Path: (path: Array<Array<number | Px> | Pixel>) => Path = path => path.map(Pixel) as Path

export {
	Address,
	AddressElement,
	ColorSet,
	Coordinate,
	Px,
	Dimensions,
	Frame,
	Layer,
	Layers,
	Outline,
	Path,
	Pixel,
	Radian,
	SettingsFunctionObjects,
	SettingsPath,
	SettingsStep,
	ShapeColorIndex,
	ShapeColorIndices,
	StripePosition,
	StripePositions,
	Supertile,
	Unit,
}
