export default ({ tileColors, tileOrigin, tileSize, colorsIndex, outline, renderTexture }) => {
	setClip({ outline })
    renderTexture()
    resetClip()
}

const setClip = () => {}
const resetClip = () => {}
