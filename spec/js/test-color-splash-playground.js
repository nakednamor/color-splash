describe('CSPlayground', function() {

	var $playgroundElement;
	var playground;

	beforeEach(function() {
		$playgroundElement = $(document.createElement('table'));
	});

	describe('.initialize(4)', function() {

		// given
		var colors = [ 'red', 'blue', 'green' ];
		var size = 4;

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

		it('should add the color of start-cell (0,3) to no other cell', function() {
			var startCell = getCellByPosition($playgroundElement, 0, 3);
			var startCellColor = startCell.attr('data-color');

			expect(startCellColor).not.toBe(null);

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
				expect(color).not.toBe(startCellColor);

			});
		});

		it('cells (0,2) and (1,3) should have different color', function() {
			fail('not yet implemented');
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