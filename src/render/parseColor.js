const parseColor = ({ r, g, b, a }) => `rgba(${  [ r, g, b, a ].join(',')  })`

export default parseColor
