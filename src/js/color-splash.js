function ColorSplash($gameDiv) {

	var COLORS = [ 'red', 'blue', 'green', 'yellow', 'purple', 'orange' ];

	var $playgroundElement = $('#playground', $gameDiv);
	var playground = new CSPlayground($playgroundElement, COLORS);

	// TODO bind to buttons easy, medium, hard and initialize the playground
	// with the given size
	playground.initialize(4, function () {
		setTimeout(function(){
            alert('You Win !!!');
		}, 200);

    });

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