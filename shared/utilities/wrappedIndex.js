export default ({ array, index = 0 }) => array[ Math.abs(index) % array.length ]
