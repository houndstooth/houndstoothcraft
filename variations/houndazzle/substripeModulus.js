export default ({ substripeIndex, nonDazzle, dazzle }) => {
	return substripeIndex % 2 === 0 ? nonDazzle : dazzle
}