import gatherOptions from '../../src/application/gatherOptions'

describe('gather options', () => {
    let address
    beforeEach(() => address = [ 3, 5 ])

    it('calls every options gathering function with the address, saving each result onto an object it returns', () => {
        settings.initial.gatherOptions = {
            optionOne: ({ address }) => ({ resultOne: [ address[ 0 ] + 1, address[ 1 ] + 1 ] }),
            optionTwo: ({ address }) => ({ resultTwo: [ address[ 0 ] - 1, address[ 1 ] - 1 ] }),
        }

        const options = gatherOptions({ address })

        const expectedOptions = {
            resultOne: [ 4, 6 ],
            resultTwo: [ 2, 4 ]
        }
        expect(options).toEqual(expectedOptions)
    })

    it('if there are no options gathering functions, options should be empty', () => {
        const options = gatherOptions({ address })

        expect(options).toEqual({})
    })
})
