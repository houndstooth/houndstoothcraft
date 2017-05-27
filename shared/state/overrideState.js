export default {
	shared: {
		gridSize: 8,
		tileSize: 100,
		stripeCount: {
			ginghamChevronContinuum: {
				on: true,
				manualConfig: {
					continuumStartsAtStripeCount: 1, 

					//ok, so when i put this to 4, i need to subtract 2 stripes
					//when i put this to 9, i need to subtract 5 stripes
					//when i put it to 16, i need to subtract 9 stripes
					//when i put it to 25, i need to subtract 14 stripes
					//...so these are triangular numbers, minus 1

					stripeCountIncreasePerDiagonal: 1
					//we also know now that it may not start out increasing by that number of stripes
					//instead it just quickly approaches that rate

					//okay, so we know this only gives results matched to edges of diagonals when perfect square
					//and that's okay
					//but it's still screwing with the start
					//when you set this to 4,  and start is 1, it starts on 3  instead, which is 3 +  4  * 0
					//when you set this to 9,  and start is 1, it starts on 6  instead, which is 6 +  9  * 0
					//when you set this to 16, and start is 1, it starts on 10 instead, which is 10 + 16 * 0
					//so these are triangular numbers
					//when you set this to 4,  and start is 2, it starts on 7  instead, which is 3 +  4  * 1
					//when you set this to 9,  and start is 2, it starts on 15 instead, which is 6 +  9  * 1
					//when you set this to 16, and start is 2, it starts on 26 instead, which is 10 + 16 * 1
					//not sure the pattern here
					//when you set this to 4,  and start is 3, it starts on 11 instead, which is 3 +  4  * 2
					//when you set this to 9,  and start is 3, it starts on 24 instead, which is 6 +  9  * 2
					//when you set this to 16, and start is 3, it starts on 42 instead, which is 10 + 16 * 2

					//so, whatever you set increasePerDiagonal to, 
					//you have to correct the startsAt 
					//by 

					// - (stripeCountIncreasePerDiagonal * 2) 
					// - triangularNumber(Math.sqrt(stripeCountIncreasePerDiagonal))
					// + continuumStartsAtStripeCount


					// 0-> 0, 1 -> 1, 2 -> 3, 
					// 1, 3, 6, 10, 15, 21, 28



					//ok, lets try like this
					//i'll record the offset that FIXES the problem
					//for given combinations
					// increase 1  start 1 : offset -= 0
					// increase 4  start 1 : offset -= 2
					// increase 9  start 1 : offset -= 2
					// increase 16 start 1 : offset -= 2
					// wow so it appears to only have to do with the start?
					// increase 1  start 2 : offset -= 0        0
					// increase 4  start 2 : offset -= 3        18
					// increase 9  start 2 : offset -= ~3.333   20
					// increase 16 start 2 : offset -= 3.5      21
					// 
					// increase 1  start 3 : offset -= 0        0
					// increase 4  start 3 : offset -= 4        16
					// increase 9  start 3 : offset -= 5        20
					// increase 16 start 3 : offset -= ~5.25    21
					//
					// increase 1  start 4 : offset -= 0        0
					// increase 4  start 4 : offset -= ~5.667	17
					// increase 9  start 4 : offset -= ~6.667	20
					// increase 16 start 4 : offset -= 7		21
					//
					// increase 1  start 5 : offset -= 0        0
					// increase 4  start 5 : offset -= 7
					// increase 9  start 5 : offset -= ~8.5 but this is really rough
					// increase 16 start 5 : offset -= ~8.8

					//let's look at it the other way
					// 0,0,0,0,0,0,
					// 2, 3,     4,    5.666, 7 ...   +1,     +1,     +1.666, +1.333 -> what if these were all supposed to be 1.333, 4/3, 16/12
					// 2, 3.333, 5,    6.666, 8.5 ... +1.333, +1.666, +1.666, +1.833 -> and these all 1.666, 5/3, 20/12
					// 2, 3.5,   5.25, 7,     8.8 ... +1.5,   +1.75,  +1.75,  +1.8   -> and these all 1.75, 7/4, 21/12

					// offset -= (thinningRate - 1) * 
				}
			}
		}
	}
}
