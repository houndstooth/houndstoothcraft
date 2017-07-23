[![Build Status](https://travis-ci.org/houndstooth/web-render.svg?branch=master)](https://travis-ci.org/houndstooth/web-render)

# Houndstooth web-render

Check it out at [https://houndstooth.cfapps.io](https://houndstooth.cfapps.io).

## state hierarchy

In short:
- [store](#store)
	- [state](#state)
		- [houndstooth](#houndstooth)
			- [pattern](#pattern)
				- [setting](#setting)  

### store
- example instances
	- `store`
- contents — all [states](#state)
	- `currentState`

This object exists for no particular reason other than that one needs a wrapper such as this on which to store your variables when avoiding placing them on the global namespace and using ES6 modules.

### state
- example instances
	- `currentState`
	- `INITIAL_STATE`
- contents
	- `mainHoundstooth` — a [houndstooth](#houndstooth)
	- other stuff such as `lastSavedAnimationFrame`

### houndstooth
- example instances
	- `HOUNDSTOOTH_DEFAULTS`
	- `HOUNDSTOOTH_STRUCTURE`
	- `houndstoothEffects`
	- `houndstoothOverrides`
	- `mainHoundstooth`
- contents — all [patterns](#pattern)
	- `basePattern`
	- `animationsPattern`
	- `iterationsPattern`

A houndstooth consists of a small set of [patterns](#pattern) which, by virtue of being required to conform to the same structure, are able to interact by mapping onto each other.

The houndsteeth whose names begin with the word "houndstooth" are understood to be not ready-to-go, but rather layers to be composed into a desired finished houndstooth. Such finished houndsteeth are named to instead end with the word "houndstooth". Think of it this way: the former are *for/of houndstooth*, the latter *are houndstooth*, but both types conform to the same houndstooth structure.

That houndstooth structure, by the way, is captured in the constant `HOUNDSTOOTH_STRUCTURE`, and at this time looks like this: only base, animations, and iterations patterns. If you try to add any other sort, you should see the error message: 

```
attempted to compose a houndstooth with an unrecognized pattern
```

An "effect", such as the cmyktooth effect, is just a type of houndstooth intended to be composed, along with defaults and overrides, into a main houndstooth.

When you compose a houndstooth, you do so by composing each houndstooth layer's animations patterns into a finished animations pattern, each houndstooth layer's iterations patterns into a finished animations pattern, and each houndstooth layer's base patterns into a finished base pattern.

### pattern
- example instances
	- `basePattern`
	- `animationsPattern`
	- `iterationsPattern` 
	- `PATTERN_STRUCTURE`
- contents — all [settings](#setting) 
	- `colorSettings`
	- `gridSettings`
	- etc.

A pattern conforms to the `PATTERN_STRUCTURE`, a defined model of all the possible [settings](#setting) and how they nest in each other (all the way down to the leaves). If you try to add any other settings, you should see the error message: 

```
attempted to compose a pattern with an unrecognized setting
```

### setting
- example instances
	- `colorSettings`
	- `gridSettings`
	- `viewSettings`
	- `tileSettings`
	- `stripeSettings`
	- `animationSettings`
	- `iterationSettings`
- contents — all [settings](#setting)
	- Yes, it's settings all the way down from here. One does eventually arrive at leaves such as `tileSizeSetting` or `zoomOnCanvasCenter`.

The key difference between a [pattern](#pattern) and a setting:

- settings are focused; they each configure one specific aspect of a pattern, such as its colors, view, or grid. Yes, a specific aspect such as this may have various facets, e.g. the view has `canvasSize` and `zoom`, but these are still aspectually related. 
- patterns are heterogenous; they are collections of such focused settings.

For clarity and brevity, avoid referring to instances of patterns and settings by using the words "pattern" or "setting" as modifiers on other generic nouns, e.g. "a settings object", or a "pattern structure". The latter case in particular would undesirably overload the word "structure" to refer to both instances and a class (the all-important `PATTERN_STRUCTURE`). The words "pattern" and "setting" alone, used as nouns, should suffice to refer to instances of patterns and settings. This naming scheme may seem a bit odd in the case of settings, given that the word is plural, but I think in the end we will find that considering e.g. `colorSettings` to be a "setting" itself will cause less headaches than any alternative nomenclature.

Note that both an `animationsPattern` pattern and an `animationSettings` setting exist. This is not a mistake. The animations pattern consists of functions that map onto a base pattern, following the `PATTERN_STRUCTURE`, to cause their shared parent [houndstooth](#houndstooth) to animate. The animations settings configure that animation with settings including the frame rate. Conceivably, an animations pattern could even animate the animation settings, to e.g. cause the frame rate to slow over time. 

Both `iterationsPattern` and `iterationSettings` exist as well, for the same reason.

## component hierarchy

In short:
- [animation](#animation)
	- [iteration](#iteration)
		- [grid](#grid)
			- [tile](#tile)
				- [shape](#shape)

### animation

When `animating` is false, essentially only a single animation frame is drawn.

Typically the canvas is cleared in between each animation frame, but this can be disabled to make some weird effects.

When exporting frames is on, the next animation frame will not be rendered until the current one has finished saving.

### iteration

Each animation frame may require many semi-transparent layers to be rendered. Iterations are renders with adjustments just like animations, with key differences being:
- iterations happen instantaneously (at least they are supposed to!)
- neighboring iterations may look completely different from one another, while animation frame neighbors are often very similar

When `iterating` is false, essentially only a single iteration frame is drawn.

### grid

A grid is given some dimensions and proceeds to generate a bunch of abstract addresses. An address has no units. A typical grid would receive the dimension 2 and size 16, meaning it will generate 16x16 addresses with x, y.

Each address will make a tile.

### tile

A tile converts a `gridAddress` into `tileOrigin`, `tileSize`, and `tileColors`
- `tileOrigin` defaults to mapping the `gridAddress` to have each dimension multiplied by the `tileSizeSetting`
- `tileSize` also (naturally) defaults to the `tileSizeSetting`
- potentially (e.g. in the "houndsmorphosis" effect) this step gets complicated
- these are in "units"; units will be the same as pixels unless you have added any zoom
- tile can be pretty complex, but it understood to be the topmost repeating element
- a tile can break down into multiple shapes, yes, but all of these shapes should have the same origin and size, so that they fit together into a tile; otherwise, why are you grouping them into something you consider a tile?
- tile also gathers an `coordinatesFunction` (or many of them) which it will pass on

### shape

A shape converts a `tileOrigin`, `tileSize`, and `coordinatesFunction` into an `outline`. 
A shape has only a single color and outline.

This outline then gets rotated, scrolled, and sized per any view settings until it represents what we're actually going to see on the screen. 

Then shape chooses a color out of the set of colors given it from the tile using the colorIndex (typically it just cycles through, but more complex orderings are possible).

The final step of shape is to pass on the outline and color to a single render call.
