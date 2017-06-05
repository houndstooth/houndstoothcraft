const CANVAS_SIZE = 1000

export default {
	state: {
        gridSize: 71,
        canvasSize: CANVAS_SIZE,
		houndsmorphosisMode: true,
        colorConfig: {
            assignment: {
                mode: 'SUPERTILE'
            }
        },
        offsetOrigin: [ CANVAS_SIZE / 2, CANVAS_SIZE / 2 ],
        negativeGridToo: true,
        scaleFromGridCenter: false
	}
}