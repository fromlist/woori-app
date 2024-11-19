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

    // micromodal
    MicroModal.init({

        onShow: function (modalPopup, element) {
            const trigger = element;
            const triggerRect = trigger.getBoundingClientRect();
            const triggerPositionTop = triggerRect.top;
            const triggerPositionRight = triggerRect.right;
            const triggerPositionBottom = triggerRect.bottom;
            const triggerPositionLeft = triggerRect.left;
            const windowWidth = $(window).outerWidth();
            const windowHeight = $(window).outerHeight();
            if (modalPopup.classList.contains('micromodal-slide-dropdown')) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                const modalPopupBodyWidth = modalPopupBody.clientWidth;
                const modalPopupBodyHeight = modalPopupBody.clientHeight;

                const padding = 10

                // default (position right)
                if (triggerPositionRight > windowWidth / 2) {
                    modalPopupBody.style.left = triggerPositionRight - modalPopupBodyWidth + 'px';

                }
                // reverse (position left)
                else if (windowWidth / 2 > triggerPositionRight) {
                    modalPopupBody.style.left = triggerPositionLeft + 'px';
                }

                // default (position bottom)
                if (windowHeight / 2 > triggerPositionTop) {
                    modalPopupBody.style.top = triggerPositionBottom + padding + 'px';

                    //overflow bottom
                    if (windowHeight < triggerPositionBottom + padding + modalPopupBodyHeight) {
                        modalPopupBody.style.overflow = 'auto'
                        modalPopupBody.style.maxHeight = windowHeight - triggerPositionBottom - padding + 'px'
                    }
                }
                // reverse (position top)
                else if (windowHeight / 2 < triggerPositionTop) {
                    modalPopupBody.style.bottom = windowHeight - triggerPositionTop + padding + 'px';

                    //overflow top
                    if (windowHeight < windowHeight - triggerPositionTop + padding + modalPopupBodyHeight) {
                        modalPopupBody.style.overflow = 'auto'
                        modalPopupBody.style.maxHeight = windowHeight - (windowHeight - triggerPositionTop + padding) + 'px'
                    }
                }
            }
        }, // [1]
        onClose: function (modalPopup, element,) {
            const trigger = element;
            if (modalPopup.classList.contains('micromodal-slide-dropdown')) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                setTimeout(function () {
                    modalPopupBody.removeAttribute('style');
                }, 300)
            }

        }, // [2]
        // openTrigger: 'data-custom-open', // [3]
        // closeTrigger: 'data-custom-close', // [4]
        // openClass: 'is-open', // [5]
        disableScroll: true, // [6]
        disableFocus: true, // [7]
        awaitOpenAnimation: true, // [8]
        awaitCloseAnimation: true, // [9]
        // debugMode: true // [10]
    });
});