const resetClip: { ({}: { context: any }): void } = ({ context }) => context.restore()

export default resetClip
