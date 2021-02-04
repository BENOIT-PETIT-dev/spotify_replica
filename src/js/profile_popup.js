const profileWidget = document.querySelector('.profile-widget');
const profilePopup = document.querySelector('.profile-menu');


$(profileWidget).click(function(menu) {
    open(menu, '.profile-menu', 'visible');
});

$(document).click(function(menu) {
    close(menu, '.profile-menu', 'visible', '.profile-menu');
});



function open(event, modifyEl, className) {
    $(modifyEl).toggleClass(className);
    event.stopPropagation();
}

function close(event, modifyEl, className, targetEl) {
    $target = $(targetEl).find('*').addBack('*');
    if (!$(event.target).is($target) === true) {
        $(modifyEl).removeClass(className);
    }
};