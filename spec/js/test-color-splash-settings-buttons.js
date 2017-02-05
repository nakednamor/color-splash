describe('CSSettingsButtons($element, csPlayground, initializeSize', function () {

    var $settingsButtonsElement;
    var settingsButtons;
    var initialSize = 6;
    var playgroundMock;

    beforeEach(function() {
        $settingsButtonsElement = $(document.createElement('div'));
        createButtons($settingsButtonsElement);

        playgroundMock = {
            initialize : $.noop,
            pickColor : $.noop,
            reset : $.noop
        };
        spyOn(playgroundMock, 'initialize');
        spyOn(playgroundMock, 'reset');
        spyOn(playgroundMock, 'pickColor');

        settingsButtons = new CSSettingsButtons($settingsButtonsElement, playgroundMock, initialSize);
    });

    describe('when reset-button is clicked', function () {
        // given

        // when
        beforeEach(function() {
            $('.reset-button', $settingsButtonsElement).trigger('click');
        });

        it('should invoke csPlayground.reset(initializeSize)', function () {
            // then
            expect(playgroundMock.reset).toHaveBeenCalledTimes(1);
            expect(playgroundMock.reset).toHaveBeenCalledWith(initialSize);
            expect(playgroundMock.initialize).not.toHaveBeenCalled();
            expect(playgroundMock.pickColor).not.toHaveBeenCalled();
        });
    });
});


function createButtons($parent) {
    var $resetButton = $('<button>Reset</button>').addClass('reset-button');
    $resetButton.appendTo($parent);
}