export default ({ colors, origin }) => {
    const xMod = origin[ 0 ] % 4
    const yMod = origin[ 1 ] % 4
    if ( 
        (xMod === 1 && yMod === 1) ||
        (xMod === 3 && yMod === 3) ||
        (xMod === 2 && yMod === 0) ||
        (xMod === 0 && yMod === 2)
    ) {
        return colors.reverse()
    }

    return colors
}