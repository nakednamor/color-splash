function CSSettingsButtons($element, csPlayground, initialSize) {

    var size = initialSize;

    var $resetButton = $('.reset-button', $element);
    $resetButton.off('click').on('click', function () {
        csPlayground.reset(size);
    });

}