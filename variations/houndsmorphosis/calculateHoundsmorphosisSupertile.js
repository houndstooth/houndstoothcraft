// there must be some way to "rotate" a supertile, or something, so we can still just use one for morphosis.
// a pattern exists here.

export default ({ address }) => {
    let supertile
    if (address[0] >= 0 && address[1] >= 0) {
        supertile = [
            [ [ 0, 0 ], [ 0, 1 ] ], 
            [ [ 1, 1 ], [ 1, 0 ] ]
        ]
    } else if (address[0] >= 0 && address[1] < 0) {
        supertile = [
            [ [ 1, 1 ], [ 1, 0 ] ], 
            [ [ 0, 0 ], [ 0, 1 ] ]
        ]
    } else if (address[0] < 0 && address[1] >= 0) {
        supertile = [ 
            [ [ 1, 0 ], [ 1, 1 ] ],
            [ [ 0, 1 ], [ 0, 0 ] ]
        ]
    } else if (address[0] < 0 && address[1] < 0) {
        supertile = [ 
            [ [ 0, 1 ], [ 0, 0 ] ],
            [ [ 1, 0 ], [ 1, 1 ] ]
        ]
    }
    return supertile
}
