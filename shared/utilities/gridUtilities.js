import state from '../state/state'
import wrappedIndex from './wrappedIndex'

const calculateEntry = ({ origin, grid }) => {
    const { set, assignment } = grid
    const { offset, mode, supertile, weave } = assignment

    const x = origin[ 0 ] + offset[ 0 ]
    const y = origin[ 1 ] + offset[ 1 ]

    if (mode === 'WEAVE') {
        const { rows, columns } = weave
        const columnsIndex = wrappedIndex({ array: columns, index: x})
        const rowsIndex = wrappedIndex({ array: rows, index: y})
        return [ set[ columnsIndex ], set[ rowsIndex ] ]
    } else if (mode === 'SUPERTILE') {
        const supertileColumn = wrappedIndex({ array: supertile, index: x})
        const supertileEntry = wrappedIndex({ array: supertileColumn, index: y})
        return supertileEntry.map(index => set[ index ])
    }
}

export default {
    calculateEntry
}