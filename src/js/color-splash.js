function ColorSplash($gameDiv) {

	var COLORS = [ 'red', 'blue', 'green', 'yellow', 'purple', 'orange' ];

	var $playgroundElement = $('#playground', $gameDiv);
	var playground = new CSPlayground($playgroundElement, COLORS);

	// TODO bind to buttons easy, medium, hard and initialize the playground
	// with the given size
	playground.initialize(4);

	bindColorButtons();

	function bindColorButtons() {

		var $buttons = $('#color-buttons .color-button', $gameDiv);
		$buttons.off('click').on('click', function(e) {
			e.preventDefault();

			var pickedColor = $(this).attr('data-color');
			playground.pickColor(pickedColor);

		});
	}

}

function CSPlayground($playground, COLORS) {

	var cells;
	var currentColors;

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

				var xIndex = j;
				var yIndex = (size - 1) - i;
				$cellClone.text('(' + j + ',' + yIndex + ')');
				$cellClone.attr('data-index-x', xIndex);
				$cellClone.attr('data-index-y', yIndex);

				cells[i][j] = $cellClone;

				$rowClone.append($cellClone);
			}

			$playground.append($rowClone);
		}
	}

	function initializeColors(size) {
		currentColors = getRandomColors(size);

		var startColorIndex = getRandomInt(0, currentColors.length);
		var startColor = currentColors[startColorIndex];
		cells[0][0].attr('data-color', startColor);

		var remainingColors = currentColors.slice();
		remainingColors.splice(startColorIndex, 1);

		addColorsToStartCellNeighbours(remainingColors.slice());

		addColorsToNonStartCells(remainingColors);
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

	/*
	 * the two neighbours of the start cell should have different colors
	 */
	function addColorsToStartCellNeighbours(colorsWithoutStartColor) {

		var colorIndexNeighbour1 = getRandomInt(0, colorsWithoutStartColor.length);
		var colorNeighbour1 = colorsWithoutStartColor[colorIndexNeighbour1];
		cells[0][1].attr('data-color', colorNeighbour1);

		colorsWithoutStartColor.splice(colorIndexNeighbour1, 1);

		var colorIndexNeighbour2 = getRandomInt(0, colorsWithoutStartColor.length);
		var colorNeighbour2 = colorsWithoutStartColor[colorIndexNeighbour2];
		cells[1][0].attr('data-color', colorNeighbour2);
		var x = 2;
	}

	function addColorsToNonStartCells(colors) {
		for (i = 0; i < cells.length; i++) {

			for (j = 0; j < cells.length; j++) {

				if (i == 0 && j == 0) {
					// skip start cell
					continue;
				}

				if ((i == 1 && j == 0) || (i == 0 && j == 1)) {
					// skip neighbours of start cell
					continue;
				}

				var index = getRandomInt(0, colors.length);
				cells[i][j].attr('data-color', colors[index]);
			}

		}
	}

	function changeColor(color) {

	}

	/*
	 * PUBLIC API
	 */
	this.initialize = function(size) {
		initializePlayground(size);
		initializeColors(size);
	};

	this.pickColor = function(color) {
	};
}

function CPtranslateCoordinatesToArray() {

}