$(document).ready(function () {
    let toastPositionDef = 'toast-bottom-center';
    $('html').each(function () {
        if ($('main').find('.bottom-btn').length) {
            toastPositionDef = 'toast-bottom-center has-bottom-btn'
        }
    })
    toastr.options = {
        'closeButton': false,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': toastPositionDef,
        'preventDuplicates': false,
        'showDuration': '500',
        'hideDuration': '500',
        'timeOut': '1500',
        'extendedTimeOut': '500',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut',
    }
});