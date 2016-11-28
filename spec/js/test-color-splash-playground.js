describe('CSPlayground', function() {

	var $playgroundElement;
	var playground;

	beforeEach(function() {
		$playgroundElement = $(document.createElement('table'));
	});

	describe('.initialize(3)', function() {

		// given
		var colors = [ 'red', 'blue', 'green' ];
		var size = 3;

		beforeEach(function() {
			playground = new CSPlayground($playgroundElement, colors);

			// when
			playground.initialize(size);
		});

		it('should create ' + (size * size) + ' cells', function() {
			// then
			var expectedCells = (size * size);
			var cells = $('td', $playgroundElement);

			expect(cells.length).toEqual(expectedCells);
		});

		it('should add a color to each cell', function() {
			// then
			var cells = $('td', $playgroundElement);
			$.each(cells, function(index, element) {
				var cell = $(element);
				var color = cell.attr('data-color');

				expect(color).not.toBe(null);
			});
		});

		it('should add the color of start-cell (0,2) to no other cell', function() {
			var startCell = getCellByPosition($playgroundElement, 0, 2);
			var startCellColor = startCell.attr('data-color');

			expect(startCellColor).not.toBe(null);

			// then
			var cells = $('td', $playgroundElement);
			$.each(cells, function(index, element) {
				var cell = $(element);
				var xIndex = cell.attr('data-index-x');
				var yIndex = cell.attr('data-index-y');

				if (xIndex == '0' && yIndex == '2') {
					return true; // continue;
				}

				var color = cell.attr('data-color');
				expect(color).not.toBe(null);
				expect(color).not.toEqual(startCellColor);

			});
		});

		it('cells (0,1) and (1,2) should have different color', function() {
			// then
			var cell01 = getCellByPosition($playgroundElement, 0, 1);
			var color01 = cell01.attr('data-color');

			var cell12 = getCellByPosition($playgroundElement, 1, 2);
			var color12 = cell12.attr('data-color');

			expect(color01).not.toEqual(color12);
		});
	});

	describe('.pickColor(color)', function() {

		// given
		var colors = [ 'red', 'blue', 'green', 'yellow' ];
		var size = 4;

		beforeEach(function() {
			playground = new CSPlayground($playgroundElement, colors);
			playground.initialize(size);
		});

		describe('when neighbours of start cell have different color than start cell and picked one', function() {

			var pickedColor = 'green';
			var otherCellsColor = 'blue';

			beforeEach(function() {
				// given
				changeColorOfAllCells($playgroundElement, otherCellsColor);
				changeColorOfCellByPosition($playgroundElement, 'red', 0, 3);

				// when
				playground.pickColor(pickedColor);
			});

			it('should only change color of start cell', function() {
				// then
				var startCell = getCellByPosition($playgroundElement, 0, 3);
				var startCellColor = startCell.attr('data-color');

				expect(startCellColor).toEqual(pickedColor);
			});

			it('should not change colors of other cells', function() {
				// then
				var cells = $('td', $playgroundElement);
				$.each(cells, function(index, element) {
					var cell = $(element);

					var xIndex = cell.attr('data-index-x');
					var yIndex = cell.attr('data-index-y');

					if (xIndex == '0' && yIndex == '3') {
						return true; // continue;
					}

					var color = cell.attr('data-color');

					expect(color).not.toEqual(pickedColor);
					expect(color).toEqual(otherCellsColor);
				});
			});
		});

		describe('when (0,3), (0,2), (0,1), (1,1), (2,1), (1,0) are blue and picked color is green', function() {

			var pickedColor = 'green';
			var otherCellsColor = 'blue';

			beforeEach(function() {
				// given
				changeColorOfAllCells($playgroundElement, otherCellsColor);
				changeColorOfCellByPosition($playgroundElement, 'red', 0, 3);

				// when
				playground.pickColor(pickedColor);
			});

			it('color of (0,3), (0,2), (0,1), (1,1), (2,1), (1,0) should change to ' + pickedColor, function() {
				// then
				assertColorOfCell($playgroundElement, pickedColor, 0, 3);
				assertColorOfCell($playgroundElement, pickedColor, 0, 2);
				assertColorOfCell($playgroundElement, pickedColor, 0, 1);
				assertColorOfCell($playgroundElement, pickedColor, 1, 1);
				assertColorOfCell($playgroundElement, pickedColor, 2, 1);
				assertColorOfCell($playgroundElement, pickedColor, 1, 0);
			});

			it('should not change colors of other cells', function() {
				// then
				assertColorOfCell($playgroundElement, otherCellsColor, 0, 0);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 0);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 0);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 1);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 2);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 3);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 3);
				assertColorOfCell($playgroundElement, otherCellsColor, 1, 3);
				assertColorOfCell($playgroundElement, otherCellsColor, 1, 2);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 2);
			});

		});

	});

});

describe('CPtranslateCoordinatesToArray(cells, x, y)', function() {

	it('should return [0][0] on (0,3)', function() {
		fail('not yet implemented');
	});

	it('should return [0][3] on (3,3)', function() {
		fail('not yet implemented');
	});

	it('should return [3][0] on (0,0)', function() {
		fail('not yet implemented');
	});

	it('should return [3][3] on (3,0)', function() {
		fail('not yet implemented');
	});
	
	it('should return [1][1] on (1,2)', function() {
		fail('not yet implemented');
	});
	
	it('should return [2][2] on (2,1)', function() {
		fail('not yet implemented');
	});

});

function getCellByPosition($playgroundElement, x, y) {
	var expectedCell = null;

	var cells = $('td', $playgroundElement);
	$.each(cells, function(index, element) {
		var cell = $(element);
		var xIndex = cell.attr('data-index-x');
		var yIndex = cell.attr('data-index-y');

		if (xIndex == x && yIndex == y) {
			expectedCell = cell;
			return false; // break the loop
		}
	});

	return expectedCell;
}

function changeColorOfAllCells($playgroundElement, color) {
	var cells = $('td', $playgroundElement);
	$.each(cells, function(index, element) {
		var cell = $(element);
		cell.attr('data-color', color);
	});
}

function changeColorOfCellByPosition($playgroundElement, color, x, y) {
	var cell = getCellByPosition($playgroundElement, x, y);
}

function assertColorOfCell($playgroundElement, expectedColor, x, y) {
	var cell = getCellByPosition($playgroundElement, x, y)
	var color = cell.attr('data-color');

	expect(color).toEqual(expectedColor);
}