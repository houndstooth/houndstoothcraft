const resetClip: { ({}: { context: CanvasRenderingContext2D }): void } = ({ context }) => context.restore()

export default resetClip
