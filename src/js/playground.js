function CSPlayground($playground, COLORS) {

	var cells;
	var currentColors;
	var winCallback = $.noop();

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

				$cellClone.text('(' + i + ',' + j + ')');
				$cellClone.attr('data-index-x', i);
				$cellClone.attr('data-index-y', j);

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

	function changeColor(previousColor, nextColor, $element, processedElements, level) {

		if ($.inArray($element, processedElements) != -1) {
			return;
		}

		processedElements.push($element);

		var currentColor = $element.attr('data-color');
		if (currentColor != previousColor) {
			return;
		}

		$element.attr('data-color', nextColor);

		var neighbours = getNeighbours($element, level);
		for (var i = 0; i < neighbours.length; i++) {
			changeColor(previousColor, nextColor, neighbours[i], processedElements, level + 1);
		}
	}

	function getNeighbours($cell, level) {
		var neighbours = [];

		var x = parseInt($cell.attr('data-index-x'));
		var y = parseInt($cell.attr('data-index-y'));

		var max = cells.length;
		addNeighbourIfExists(neighbours, x - 1, y, max); // top
		addNeighbourIfExists(neighbours, x, y + 1, max); // right
		addNeighbourIfExists(neighbours, x + 1, y, max); // bottom
		addNeighbourIfExists(neighbours, x, y - 1, max); // left

		return neighbours;
	}

	function addNeighbourIfExists(neighbours, x, y, max) {
		if (x >= 0 && x < max && y >= 0 && y < max) {
			neighbours.push(cells[x][y]);
		}
	}

	function haveAllCellsSameColor() {
		var color = null;

		for (i = 0; i < cells.length; i++) {
            for (j = 0; j < cells.length; j++) {
				var currentColor = cells[i][j].attr('data-color');
				if(color == null) {
					color = currentColor;
				}

				if(color != currentColor) {
					return false;
				}
            }
        }

        return true;
    }
	
	/*
	 * PUBLIC API
	 */
	this.initialize = function(size, callback) {
		winCallback = callback;
		initializePlayground(size);
		initializeColors(size);
	};

	this.pickColor = function(color) {
		var previousColor = cells[0][0].attr('data-color');
		var processedCells = [];
		changeColor(previousColor, color, cells[0][0], processedCells, 0);

		if(haveAllCellsSameColor() == true) {
			winCallback();
		}
	};
}