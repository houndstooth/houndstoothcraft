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

    it("proves the concept of testing with pixel data", () => {
        const something = ctx.getImageData(50,0,1,1)
        console.log(
            'pixel at [50, 0] - ',
            'r:', something.data[0], 
            'g:', something.data[1], 
            'b:', something.data[2], 
            'a:', something.data[3]
        )

        expect(true).toBe(true)
    })

    it("proves the concept of testing with call stack to canvas", () => {
        const stack = ctx.stack()
        console.log('canvas calls:', stack)

        expect(true).toBe(true)
    })
})
