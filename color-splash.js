function ColorSplash($gameDiv) {

	var $playground = $('#playground', $gameDiv);
	var cells;
	var currentColors;

	var COLORS = [ 'red', 'blue', 'green', 'yellow', 'purple', 'orange' ];

	function initializePlayground(size) {
		cells = new Array(size);

		var $row = $(document.createElement('tr'));
		var $cell = $(document.createElement('td'));
		$cell.addClass('cell')

		for (i = 0; i < size; i++) {
			cells[i] = new Array(size);

			var $rowClone = $row.clone();
			cells[i] = new Array(size);

			for (j = 0; j < size; j++) {

				var $cellClone = $cell.clone();

				cells[i][j] = $cellClone;

				$rowClone.append($cellClone);
			}

			$playground.append($rowClone);
		}
	}

	function initializeColors() {
		currentColors = getRandomColors(cells.length);

		var startColorIndex = getRandomInt(0, currentColors.length);
		var startColor = currentColors[startColorIndex];
		addColor(cells[0][0], startColor);

		var remainingColors = currentColors.slice();
		remainingColors.splice(startColorIndex, 1);
		addColorsToNonStartCells(remainingColors);
	}

	function addColor($element, color) {
		$element.attr('data-color', color);
	}

	function getRandomColors(amount) {
		var result = COLORS.slice();
		while (result.length > amount) {
			var index = getRandomInt(0, result.length);
			result.splice(index, 1);
		}

		return result;
	}

	// Returns a random integer between min (included) and max (excluded)
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function addColorsToNonStartCells(colors) {
		for (i = 0; i < cells.length; i++) {

			for (j = 0; j < cells.length; j++) {
				if (i == 0 && j == 0) {
					continue;
				}

				var index = getRandomInt(0, colors.length);
				addColor(cells[i][j], colors[index]);
			}

		}
	}

	/*
	 * PUBLIC API
	 */
	this.initialize = function(size) {
		initializePlayground(size);

		initializeColors();
	};
}