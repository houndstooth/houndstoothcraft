export default ({ origin, vector }) => {
	return [
		[
			origin[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + vector[ 0 ],
			origin[ 1 ]
		],
		[
			origin[ 0 ] + vector[ 0 ],
			origin[ 1 ] + vector[ 1 ]
		],
		[
			origin[ 0 ],
			origin[ 1 ] + vector[ 1 ]
		]
	]
}
