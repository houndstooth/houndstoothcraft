// tslint:disable:variable-name no-any

import { Dimensions, Pixel, Px, SettingPath, SettingStep } from '../app'
import {
	Address,
	AddressElement,
	Coordinate,
	Outline,
	Radian,
	ShapeColorIndex,
	StripePosition,
	Unit,
} from '../pattern'
import { Frame, Layer } from '../types'

// First order, singular

const Px: (_: Px) => number =
	(px: Px): number => px as any
const Frame: (_: Frame) => number =
	(frame: Frame): number => frame as any
const Layer: (_: Layer) => number =
	(layer: Layer): number => layer as any
const Radian: (_: Radian) => number =
	(radian: Radian): number => radian as any
const ShapeColorIndex: (_: ShapeColorIndex) => number =
	(shapeColorIndex: ShapeColorIndex): number => shapeColorIndex as any
const StripePosition: (_: StripePosition) => number =
	(stripePosition: StripePosition): number => stripePosition as any
const Unit: (_: Unit) => number =
	(units: Unit): number => units as any
const AddressElement: (_: AddressElement) => number =
	(addressElement: AddressElement): number => addressElement as any
const SettingStep: (_: SettingStep) => string =
	/* istanbul ignore next */
	(settingStep: SettingStep): string => settingStep

// First order, plurals

// Frames not yet needed
// Layers not yet needed
// Radians not yet needed
// ShapeColorIndices not yet needed
// StripePositions not yet needed
// Units not yet needed
const Address: (_: Array<AddressElement | number> | Address) => number[] =
	(address: Array<AddressElement | number> | Address): number[] => address as any
const SettingPath: (_: Array<SettingStep | string> | SettingPath) => string[] =
	/* istanbul ignore next */
	(settingPath: Array<SettingStep | string> | SettingPath): string[] => settingPath as SettingPath

// Second order, singular

// Supertile not yet needed
const Coordinate: (_: Array<Unit | number> | Coordinate) => number[] =
	(coordinate: Array<Unit | number> | Coordinate): number[] => coordinate as any
// Color not yet needed
const Pixel: (_: Array<Px | number> | Pixel) => number[] =
	(pixel: Array<Px | number> | Pixel): number[] => pixel as any
const Dimensions: (_: Array<Px | number> | Dimensions) => number[] =
	(dimensions: Array<Px | number> | Dimensions): number[] => dimensions as any

// Third order, singular

const Outline: (_: Array<Coordinate | Array<Unit | number>> | Outline) => number[][] =
	(outline: Array<Coordinate | Array<Unit | number>> | Outline): number[][] => outline as any
// ColorSet not yet needed
// Path not yet needed

export {
	AddressElement,
	Address,
	Coordinate,
	Dimensions,
	Px,
	Frame,
	Layer,
	Outline,
	Pixel,
	Radian,
	SettingPath,
	SettingStep,
	ShapeColorIndex,
	StripePosition,
	Unit,
}
