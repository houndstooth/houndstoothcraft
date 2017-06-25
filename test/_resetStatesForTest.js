export default ({ state, iterations, animations }) => {
    Object.keys(state).forEach(key => delete state[key])
    Object.keys(iterations).forEach(key => delete iterations[key])
    Object.keys(animations).forEach(key => delete animations[key])
}
