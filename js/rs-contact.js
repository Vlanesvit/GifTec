
ymaps.ready(init);
function init() {
	if (document.querySelector('.map')) {
		const mapElement = document.querySelector('.map');

		const map = new ymaps.Map(mapElement, {
			center: branchData[0].location,
			zoom: 15,
			controls: [],
		});

		const pinsCollection = new ymaps.GeoObjectCollection({}, {
			preset: 'islands#blueDotIcon',
			draggable: false,
		});

		// Добавляем маркеры
		branchData.forEach((branch, index) => {
			const placemark = new ymaps.Placemark(branch.location, {
				balloonContentHeader: branch.address,
				hintContent: branch.address,
			});
			pinsCollection.add(placemark);
			branch.placemark = placemark;
		});

		map.geoObjects.add(pinsCollection);

		map.events.add('balloonopen', () => map.hint.close());
		map.events.add('click', (e) => e.get('target').balloon.close());

		const addressElements = document.querySelectorAll('.map-link');
		addressElements.forEach((addressEl) => {
			addressEl.addEventListener('click', (e) => {
				e.preventDefault();
				const index = parseInt(addressEl.dataset.index, 10);

				if (!isNaN(index) && branchData[index]) {
					const { location, placemark } = branchData[index];

					// Скролл к блоку карты
					mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

					// После скролла — центрируем карту с задержкой
					setTimeout(() => {
						const offsetX = -100;  // Сдвиг по горизонтали
						const offsetY = -50;   // Сдвиг по вертикали

						const globalPixels = map.options.get('projection').toGlobalPixels(location, map.getZoom());
						const newCenter = map.options.get('projection').fromGlobalPixels(
							[globalPixels[0] - offsetX, globalPixels[1] - offsetY],
							map.getZoom()
						);

						map.panTo(newCenter, { flying: true, duration: 500 }).then(() => {
							placemark.balloon.open();
						});
					}, 500); // Подбирай тайминг, чтобы скролл завершился перед центровкой
				} else {
					console.error(`Маркер с индексом ${index} не найден в branchData.`);
				}
			});
		});
	}
}