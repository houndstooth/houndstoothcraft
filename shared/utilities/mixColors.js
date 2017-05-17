import iterator from '../../shared/utilities/iterator'

export default (xColor, yColor) => {
	let result = "#"
	iterator(3, {oneIndexed: true}).forEach(i => result += xColor[ i ] === yColor[ i ] ? xColor[ i ] : "8")
	return result
}