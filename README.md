[![Build Status](https://travis-ci.org/houndstooth/web-render.svg?branch=master)](https://travis-ci.org/houndstooth/web-render)
[![devDependency Status](https://david-dm.org/houndstooth/web-render/dev-status.svg)](https://david-dm.org/houndstooth/web-render?type=dev)
[![codecov.io](https://codecov.io/github/houndstooth/web-render/coverage.svg?branch=master)](https://codecov.io/github/houndstooth/web-render?branch=master)

# Houndstooth web-render

Check it out at [http://houndstooth.douglasblumeyer.com](http://houndstooth.douglasblumeyer.com).

## settings hierarchy

In short:
- [houndstooth](#houndstooth)
    - [pattern](#pattern)
        - [setting](#setting)

### houndstooth

- example instances
	- `DEFAULT_MAIN_HOUNDSTOOTH`
	- `effects`
	- `overrides`
	- `appState.settings.mainHoundstooth`
- contents — all [patterns](#pattern)
	- `basePattern`
	- `animationsPattern`
	- `layersPattern`

A houndstooth consists of a small set of [patterns](#pattern) which, by virtue of being required to conform to the same structure, are able to interact by mapping onto each other.

An "effect", such as the cmyktooth effect, is just a type of houndstooth intended to be composed, along with defaults and overrides, into a main houndstooth.

When you compose a houndstooth, you do so by composing each effect's animations patterns into a finished animations pattern, each effect's layers patterns into a finished layers pattern, and each effect's base patterns into a finished base pattern.

### pattern

- example instances
    - `patternState`
	- `appState.settings.mainHoundstooth.basePattern`
	- `appState.settings.mainHoundstooth.animationsPattern`
	- `appState.settings.mainHoundstooth.layersPattern`
- contents — all [settings](#setting)
	- `colorSettings`
	- `gridSettings`
	- etc.

The `mainHoundstooth`'s `basePattern`, `animationsPattern`, and `layersPattern` are drawn on to decide on the `patternState` for any given animation and layer frame (including the initial, static render).

### setting

- example instances
	- `colorSettings`
	- `gridSettings`
	- `viewSettings`
	- `tileSettings`
	- `stripeSettings`
	- `animationSettings`
	- `layerSettings`
- contents — all [settings](#setting)
	- Yes, it's settings all the way down from here. One does eventually arrive at leaves such as `tileSize` or `zoomOnCanvasCenter`.

The key difference between a [pattern](#pattern) and a setting:

- settings are focused; they each configure one specific aspect of a pattern, such as its colors, view, or grid. Yes, a specific aspect such as this may have various facets, e.g. the view has `rotationAboutCanvasCenter` and `zoom`, but these are still aspectually related.
- patterns are heterogenous; they are collections of such focused settings.

For clarity and brevity, avoid referring to instances of patterns and settings by using the words "pattern" or "setting" as modifiers on other generic nouns, e.g. "a settings object", or a "pattern structure". The words "pattern" and "setting" alone, used as nouns, should suffice to refer to instances of patterns and settings. This naming scheme may seem a bit odd in the case of settings, given that the word is plural, but I think in the end we will find that considering e.g. `colorSettings` to be a "setting" itself will cause less headaches than any alternative nomenclature.

Note that both an `animationsPattern` pattern and an `animationSettings` setting exist. This is not a mistake. The animations pattern consists of functions that map onto a base pattern to cause their shared parent [houndstooth](#houndstooth) to animate. The animations settings configure that animation, e.g. whether the canvas refreshes between frames. Conceivably, an animations pattern could even animate the animation settings.

Both `layersPattern` and `layerSettings` exist as well, for the same reason.

Instances of `houndstooth` and `pattern` are considered to be settings too.

## app

The `app` module, in contrast to the `pattern` module, has nothing to do with the "fun", "mathy", "designy' part of houndstooth. It's how the app works. In other words, anything you find in the app module should work the same way for any pattern.

submodules:
- `controls`: the user interface; handlers for toggling effects and controlling animation
- `dom`: bindings to HTML methods, references to elements on the page
- `execute`: shepherds a pattern through, from composition to rendering, managing layers and frames
- `render`: self-explanatory
- `settings`: tooling for parsing patterns

Just as the pattern setting submodules map onto the `patternState`, the app submodules map onto an `appState`.

## execution and component hierarchy

This section straddles both the `app` and `pattern` modules. It uses elements from both.

In short:
- [animation](#animation)
	- [layer](#layer)
		- [grid](#grid)
			- [tile](#tile)
				- [shape](#shape)

### animation

When `state.controls.animating` is false, essentially only a single animation frame is drawn.

Typically:
- the canvas is cleared in-between each animation frame

Potentially:
- a pattern can disable clearing to make some weird effects

There are a few secret features that are not enabled for users of the website yet:

- When `state.controls.exportFrames` is set to `true`, the app will save a .png for each frame, which can then be assembled into a video using a tool such as ImageJ.
- When `state.execute.performanceLogging` is set to `true`, you can see in the console how long each grid takes.
- When `state.controls.endFrame` is set to anything besides 0, animation can reach an end and stop. 

### layer

Whether [animating](#animation) or not, you may find that your houndstooth is best described not as a single [grid](#grid) of [tiles](#tile), but as many layers of such grids.

Of course, when layering, your grids should each have at least some (semi-)transparent areas in order to allow lower layers to show through.

One is always technically layering, even if one is essentially only drawing a single layer.

When both animating and layering, the described set of layers are drawn once for each animation frame. Of course, if your pattern is complex and your frame rate is fast, you may experience lag if you call for many layers.

Differences between layers and animations:
- Animation frames typically occur in very quick succession (maximal frame rate for maximal persistence of vision effect). Layers, however, are considered to occur instantaneously/simultaneously. They are non-temporal; just a breaking down of a single image in a single moment in time into multiple layers.
- Animation frame neighbors are often very similar looking. If they weren't, the animation wouldn't be smooth, or wouldn't be considered to be animation at all.  Neighboring layers, however, may look completely different from one another, or may look quite similar. It all depends on the intended effect.

### grid

A `grid` represents a tiling of the plane. It creates many `address`es and calls the [tile](#tile) function on each one.

Typically:
- a grid would receive something like "two-dimensional, sixteen by sixteen tiles", meaning it would generate 256 (16^2) addresses: \[ \[ 0, 0 \], \[ 0, 1 \] ... \[ 15, 15 \] \]

`address` has no units. It does not necessarily have a direct correlation with pixels on the canvas. It is abstract. It is a coordinate system for identifying tiles relative to each other, which of course can be (and is typically) used to position them next to each other on the canvas, but can be purposed otherwise.

An address coordinate [0, 0] is referred to as the "home address" while a pixel coordinate [0, 0] is referred to as the "origin".

### tile

A tile represents a repeating portion of a pattern. A tile converts a `address` into `tileOrigin`, `tileSize`, and `shapeColorIndices`.

Typically:
- `tileOrigin` defaults to multiplying each dimension of the `address` by the `tileSize`.
- `tileSize` also (naturally) defaults to the `tileSize`.

Potentially:
- (e.g. in the "houndsmorphosis" effect) each tile has its own size, and its origin is a complex function of address, some of which even result in no tile.
- A tile can receive a custom shapes function

Both `tileOrigin` and `tileSize` are expressed in units called "units". Units will be the same as pixels unless one changes the zoom from the default of 1 in the `viewSettings`.

A tile:
- can be pretty complex, but it understood to be the topmost repeating element
- can break down into multiple shapes, yes, but all of these shapes should have the same origin and size, so that they come together into a tile; otherwise, why are you grouping them into something you consider a tile?
- also gathers an `outlineFunction` (or many of them) which it will pass on

### shape

A shape converts a `tileOrigin`, `tileSize`, and `outlineFunction` into an `outline`, and converts `shapeColorIndices` into a `color`.
A shape has only a single color and outline.

This outline then gets rotated, scrolled, and sized per any view settings until it represents what we're actually going to see on the screen.

Then shape chooses a color out of the set of colors given it from the tile using the colorIndex (typically it just cycles through, but more complex orderings are possible).

The final step of shape is to pass on the outline and color to the `solid` render method.

# Contributing

See [CONTRIBUTING.md](https://github.com/houndstooth/web-render/blob/master/CONTRIBUTING.md).
