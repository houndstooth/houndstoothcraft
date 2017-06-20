import 'jasmine'
import '../../vendor/canteen.min'
import setup from '../../application/setup'
import execute from '../../application/execute'
import ctx from '../../render/ctx'
import state from '../../state/state'

describe("Standard Houndstooth", () => {
    beforeEach(() => {
        setup({
            effects: [],
            debugging: false
        })

        state.gridConfig.gridSize = 2
        state.viewConfig.canvasSize = 100

        execute({
            iterating: false,
            animating: false,
            exportFrames: false,
            performanceLogging: false
        })
    })

    // I think we'll end up not using the call stack as much
    // Reason being: once you're doing that, shouldn't you just be unit testing
    //   the coordinate and color functions?
    // It seems like a more productively different approach
    // i.e. a more appropriately integration-y approach
    // to test the final pixel output, yeah?
    it("proves the concept of testing with call stack to canvas", () => {
        const stack = ctx.stack()
        console.log('canvas calls:', stack)

        expect(true).toBe(true)
    })

    it("has four stripes in a striped square", () => {
        //should this be more like just draw a line?
        //or should i rely more on stripe coordinates unit test?
        //maybe you should just go diagonally across perp to the stripes, just check 4 spots
        //or maybe check some set using like the same subdivision as you do for othertooth
        expect(pixel(sectorCenter({x: 0, y: 0, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 1, y: 0, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 0, y: 1, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})

        expect(pixel(sectorCenter({x: 3, y: 0, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 2, y: 0, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 2, y: 1, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 1, y: 1, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 1, y: 2, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 0, y: 2, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 0, y: 3, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})

        expect(pixel(sectorCenter({x: 1, y: 4, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 2, y: 4, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 2, y: 3, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 3, y: 3, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 3, y: 2, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 4, y: 2, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})
        expect(pixel(sectorCenter({x: 4, y: 1, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 0})

        expect(pixel(sectorCenter({x: 3, y: 4, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 4, y: 3, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
        expect(pixel(sectorCenter({x: 4, y: 4, n: 5}))).toEqual({r: 0, g: 0, b: 0, a: 1})
    })

    it("repeats a 2x2 pattern of a solid black, solid white, and two b&w striped tiles", () => {
        
    })
})

const tileOrigin = (x, y) => {
    return 
}

const pixel = ([x, y]) => {
    const pixelData = ctx.getImageData(x, y, 1, 1).data
    return {
        r: pixelData[0], 
        g: pixelData[1], 
        b: pixelData[2], 
        a: pixelData[3] / 255
    }
}

const sectorCenter = ({x, y, n}) => {
    const sectorSize = state.tileConfig.tileSize / n
    return [ (x + 0.5) * sectorSize, (y + 0.5) * sectorSize ]
}
