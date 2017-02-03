describe('CSPlayground', function() {

	var $playgroundElement;
	var playground;

	beforeEach(function() {
		$playgroundElement = $(document.createElement('table'));
	});

	describe('.initialize(3, undefined)', function() {

		// given
		var colors = [ 'red', 'blue', 'green' ];
		var size = 3;

		beforeEach(function() {
			playground = new CSPlayground($playgroundElement, colors);

			// when
			playground.initialize(size, undefined);
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

		it('should add the color of start-cell (0,0) to no other cell', function() {
			var startCell = getCellByPosition($playgroundElement, 0, 0);
			var startCellColor = startCell.attr('data-color');

			expect(startCellColor).not.toBe(null);

			// then
			var cells = $('td', $playgroundElement);
			$.each(cells, function(index, element) {
				var cell = $(element);
				var xIndex = cell.attr('data-index-x');
				var yIndex = cell.attr('data-index-y');

				if (xIndex == '0' && yIndex == '0') {
					return true; // continue;
				}

				var color = cell.attr('data-color');
				expect(color).not.toBe(null);
				expect(color).not.toEqual(startCellColor);

			});
		});

		it('cells (0,1) and (1,0) should have different color', function() {
			// then
			var cell01 = getCellByPosition($playgroundElement, 0, 1);
			var color01 = cell01.attr('data-color');

			var cell10 = getCellByPosition($playgroundElement, 1, 0);
			var color10 = cell10.attr('data-color');

			expect(color01).not.toEqual(color10);
		});
	});

	describe('.pickColor(color)', function() {

		// given
		var colors = [ 'red', 'blue', 'green', 'yellow' ];
		var size = 4;
		var winCallbackCalls = 0;
		var winCallback = function () {
			winCallbackCalls++;
        }

		beforeEach(function() {
            winCallbackCalled = 0;

			playground = new CSPlayground($playgroundElement, colors);
			playground.initialize(size, winCallback);
		});

		describe('when neighbours of start cell have different color than start cell and picked one', function() {

			var pickedColor = 'green';
			var otherCellsColor = 'blue';

			beforeEach(function() {
				// given
				changeColorOfAllCells($playgroundElement, otherCellsColor);
				changeColorOfCellByPosition($playgroundElement, 'red', 0, 0);

				// when
				playground.pickColor(pickedColor);
			});

			it('should only change color of start cell', function() {
				// then
				var startCell = getCellByPosition($playgroundElement, 0, 0);
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

					if (xIndex == '0' && yIndex == '0') {
						return true; // continue;
					}

					var color = cell.attr('data-color');

					expect(color).not.toEqual(pickedColor);
					expect(color).toEqual(otherCellsColor);
				});
			});
		});

		describe('when (0,0), (1,0), (2,0), (1,1), (1,2), (0,2), (1,3) are blue and picked color is green', function() {

			var pickedColor = 'green';
			var otherCellsColor = 'red';

			beforeEach(function() {
				// given
				changeColorOfAllCells($playgroundElement, otherCellsColor);

				changeColorOfCellByPosition($playgroundElement, 'blue', 0, 0);
				changeColorOfCellByPosition($playgroundElement, 'blue', 1, 0);
				changeColorOfCellByPosition($playgroundElement, 'blue', 2, 0);
				changeColorOfCellByPosition($playgroundElement, 'blue', 1, 1);
				changeColorOfCellByPosition($playgroundElement, 'blue', 1, 2);
				changeColorOfCellByPosition($playgroundElement, 'blue', 0, 2);
				changeColorOfCellByPosition($playgroundElement, 'blue', 1, 3);

				// when
				playground.pickColor(pickedColor);
			});

			it('color of (0,0), (1,0), (2,0), (1,1), (1,2), (0,2), (1,3) should change to ' + pickedColor, function() {
				// then
				assertColorOfCell($playgroundElement, pickedColor, 0, 0);
				assertColorOfCell($playgroundElement, pickedColor, 1, 0);
				assertColorOfCell($playgroundElement, pickedColor, 2, 0);
				assertColorOfCell($playgroundElement, pickedColor, 1, 1);
				assertColorOfCell($playgroundElement, pickedColor, 1, 2);
				assertColorOfCell($playgroundElement, pickedColor, 0, 2);
				assertColorOfCell($playgroundElement, pickedColor, 1, 3);
			});

			it('should not change colors of other cells', function() {
				// then
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 0);
				assertColorOfCell($playgroundElement, otherCellsColor, 0, 1);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 1);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 1);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 2);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 2);
				assertColorOfCell($playgroundElement, otherCellsColor, 0, 3);
				assertColorOfCell($playgroundElement, otherCellsColor, 2, 3);
				assertColorOfCell($playgroundElement, otherCellsColor, 3, 3);
			});

		});

        describe('when all cells have the same color', function(){

            beforeEach(function() {
				// given
                changeColorOfAllCells($playgroundElement, 'green');
                changeColorOfCellByPosition($playgroundElement, 'blue', 3, 3);

                // when
                playground.pickColor('blue');
            });

            it('should call the win-callback', function () {
                // then
				expect(winCallbackCalls).toEqual(1);
            });
        });

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
	cell.attr('data-color', color);
}

function assertColorOfCell($playgroundElement, expectedColor, x, y) {
	var cell = getCellByPosition($playgroundElement, x, y)
	var color = cell.attr('data-color');

	if (expectedColor != color) {
		console.log('color of cell failing: (' + x + ',' + y + ')');
	}

	expect(color).toEqual(expectedColor);
}