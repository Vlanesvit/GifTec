/* ====================================
Открыть/закрыть доп.меню (в моб.версии)
==================================== */
function openFilter() {
	const filterShow = document.getElementById('filter-show');
	const filterClose = document.getElementById('filter-close');

	if (filterShow) {
		// Открываем меню
		filterShow.addEventListener("click", function (e) {
			e.preventDefault();
			// bodyLock();
			document.documentElement.classList.add('filter-open');
		});
	}

	if (filterClose) {
		// Открываем меню
		filterClose.addEventListener("click", function (e) {
			e.preventDefault();
			// bodyUnlock();
			document.documentElement.classList.remove('filter-open');
		});
	}
}
openFilter();

function initCatalogFilters() {
	document.querySelectorAll('.checkbox__showmore').forEach(showMoreButton => {
		const filterItem = showMoreButton.closest('.rs-catalog__spollers_item');
		const filterList = filterItem?.querySelector('.checkbox__list');

		if (filterList) {
			const filterItems = [...filterList.children];
			const hiddenItems = filterItems.slice(7); // Элементы, которые нужно скрывать

			// Если скрываемых элементов нет, убираем кнопку
			if (hiddenItems.length === 0) {
				showMoreButton.style.display = 'none';
				return;
			}

			// Изначально скрываем лишние элементы
			hiddenItems.forEach(item => item.classList.add('hidden'));

			// Обработчик клика по кнопке
			function toggleShowMore() {
				const isExpanded = showMoreButton.classList.toggle('_showmore-active');
				hiddenItems.forEach(item => item.classList.toggle('hidden', !isExpanded));

				// (Опционально) Меняем текст кнопки для UX
				showMoreButton.textContent = isExpanded ? 'Скрыть' : 'Показать еще';
			}

			showMoreButton.addEventListener('click', toggleShowMore);
		} else {
			// Если списка нет, скрываем кнопку для предотвращения пустых кликов
			showMoreButton.style.display = 'none';
		}
	});
}

initCatalogFilters();


