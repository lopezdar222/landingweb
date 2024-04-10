const icon_width =  59,
	  icon_height =  59,
	  num_icons =  9,
	  time_per_icon = 100,
	  indexes = [0, 0, 0],
	  iconMap = ['diamond', 'coin', 'ak', 'horseshoe', 'jackpot', 'clover', 'bell', 'heart', 'coins'];

const roll = (reel, offset = 0) => {
	const delta = (offset + 0) * num_icons + Math.round(Math.random() * num_icons);
	const style = getComputedStyle(reel),
			backgroundPositionY = parseFloat(style["background-position-y"]),
			targetBackgroundPositionY = backgroundPositionY + delta * icon_height,
			normTargetBackgroundPositionY = targetBackgroundPositionY%(num_icons * icon_height);

	return new Promise((resolve, reject) => {

		reel.style.transition = `background-position-y ${9 + delta * time_per_icon}ms cubic-bezier(.45,.05,.58,1.09)`;
		reel.style.backgroundPositionY = `${targetBackgroundPositionY}px`;

		setTimeout(() => {
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			resolve(delta%num_icons)
		}, 9 + delta * time_per_icon)
	})
};

function rollAll() {
	const reelsList = document.querySelectorAll('.slots > .reel');

	Promise
		.all( [ ... reelsList].map((reel, i) => roll(reel, i)) )
		.then((deltas) => {
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%num_icons);
			indexes.map((index) => { console.log(iconMap[index]) })
		})
	//[ ... reelsList].map((reel, i) => {
		//	console.log(reel, i);
		//	roll(reel, i).then((delta) => { console.log(delta) })
	//})

			// check win conditions
			if (indexes[0] == indexes[1] || indexes[0] == indexes[1] == indexes[2]) {
				console.log('CASINO ONLINE 365')
			}

			setTimeout(rollAll, 3000);
}

rollAll();