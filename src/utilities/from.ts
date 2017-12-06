// tslint:disable:variable-name no-any

import { Dimensions, Pixel, Px, SettingsPath, SettingsStep } from '../app'
import {
	Address,
	AddressElement,
	Coordinate,
	Frame,
	Layer,
	Outline,
	Radian,
	ShapeColorIndex,
	StripePosition,
	Unit,
} from '../pattern'

// First order, singular

const Px: (px: Px) => number =
	(px: Px): number => px as any
const Frame: (frame: Frame) => number =
	(frame: Frame): number => frame as any
const Layer: (layer: Layer) => number =
	(layer: Layer): number => layer as any
const Radian: (radian: Radian) => number =
	(radian: Radian): number => radian as any
const ShapeColorIndex: (shapeColorIndex: ShapeColorIndex) => number =
	(shapeColorIndex: ShapeColorIndex): number => shapeColorIndex as any
const StripePosition: (stripePosition: StripePosition) => number =
	(stripePosition: StripePosition): number => stripePosition as any
const Unit: (units: Unit) => number =
	(units: Unit): number => units as any
const AddressElement: (addressElement: AddressElement) => number =
	(addressElement: AddressElement): number => addressElement as any
const SettingsStep: (settingsStep: SettingsStep) => string =
	/* istanbul ignore next */
	(settingsStep: SettingsStep): string => settingsStep

// First order, plurals

// Frames not yet needed
// Layers not yet needed
// Radians not yet needed
// ShapeColorIndices not yet needed
// StripePositions not yet needed
// Units not yet needed
const Address: (address: Array<AddressElement | number> | Address) => number[] =
	(address: Array<AddressElement | number> | Address): number[] => address as any
const SettingsPath: (settingPath: Array<SettingsStep | string> | SettingsPath) => string[] =
	/* istanbul ignore next */
	(settingsPath: Array<SettingsStep | string> | SettingsPath): string[] => settingsPath as SettingsPath

// Second order, singular

// Supertile not yet needed
const Coordinate: (coordinate: Array<Unit | number> | Coordinate) => number[] =
	(coordinate: Array<Unit | number> | Coordinate): number[] => coordinate as any
// Color not yet needed
const Pixel: (pixel: Array<Px | number> | Pixel) => number[] =
	(pixel: Array<Px | number> | Pixel): number[] => pixel as any
const Dimensions: (dimensions: Array<Px | number> | Dimensions) => number[] =
	(dimensions: Array<Px | number> | Dimensions): number[] => dimensions as any

// Third order, singular

const Outline: (outline: Array<Coordinate | Array<Unit | number>> | Outline) => number[][] =
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
	SettingsPath,
	SettingsStep,
	ShapeColorIndex,
	StripePosition,
	Unit,
}
