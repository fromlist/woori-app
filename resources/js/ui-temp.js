$(document).ready(function () {
    $('.left .header-btn').on('click', function () {
        window.location.href = '../'
        console.log(window.location.href)
    })

});

$(function () {
    microModalFunc.init();
});


// micromodal
const microModalFunc = {
    init: function () {
        // micromodal
        let modalTrigger = '';
        MicroModal.init({

            onShow: function (modalPopup, trigger, event) {
                modalTrigger = event.target;
                // console.log(modalTrigger)
                if (modalTrigger.tagName == "SPAN") {
                    modalTrigger = modalTrigger.closest('button');
                    // console.log(modalTrigger)
                }
                const triggerPositionTop = $(modalTrigger).offset().top;
                const triggerPositionLeft = $(modalTrigger).offset().left;
                const triggerPositionBottom = $(modalTrigger).offset().top + $(modalTrigger).outerHeight();
                const triggerPositionRight = $(modalTrigger).offset().left + $(modalTrigger).outerWidth()
                const triggerWidth = $(modalTrigger).outerWidth();
                const windowWidth = $(window).outerWidth();
                const windowHeight = $(window).outerHeight();


                let scrollPosition = $(window).scrollTop();
                let scrollLeftPosition = $(window).scrollLeft();

                modalPopup.querySelectorAll('.select-option ul').forEach(function (items) {
                    // if (items.childElementCount > 4) {
                    modalPopup.classList.remove('micromodal-slide-select')
                    modalPopup.classList.add('micromodal-slide-bottom');
                    // }
                })

                const dropDown = modalPopup.classList.contains('micromodal-slide-dropdown');
                const selectBox = modalPopup.classList.contains('micromodal-slide-select');

                if (dropDown || selectBox) {
                    const modalPopupBody = modalPopup.querySelector('.modal__container');
                    const modalPopupBodyWidth = modalPopupBody.clientWidth;
                    const modalPopupBodyHeight = modalPopupBody.clientHeight;

                    let padding = 10;

                    // default (position right)
                    if (triggerPositionRight > windowWidth / 2) {
                        if (selectBox) {
                            modalPopupBody.style.width = triggerWidth + 'px'
                            modalPopupBody.style.left = triggerPositionRight - triggerWidth + 'px';
                        } else {
                            modalPopupBody.style.left = triggerPositionRight - modalPopupBodyWidth + 'px';

                        }
                    }
                    // reverse (position left)
                    else if (windowWidth / 2 > triggerPositionRight) {
                        if (selectBox) {
                            modalPopupBody.style.width = triggerWidth + 'px'
                            modalPopupBody.style.left = triggerPositionRight - triggerWidth + 'px';
                        } else {
                            modalPopupBody.style.left = triggerPositionRight - modalPopupBodyWidth + 'px';
                        }
                    }

                    // default (position bottom)
                    // console.log('windowHeight / 2 ' + windowHeight / 2)

                    if (windowHeight / 2 > triggerPositionTop - scrollPosition) {
                        modalPopupBody.style.top = triggerPositionBottom + padding - scrollPosition + 'px';

                        // //overflow bottom
                        // if (windowHeight < triggerPositionBottom + padding + modalPopupBodyHeight) {
                        //     modalPopupBody.style.overflow = 'auto'
                        //     modalPopupBody.style.maxHeight = windowHeight - triggerPositionBottom - padding + 'px'
                        // }
                    }
                    // reverse (position top)
                    else if (windowHeight / 2 < triggerPositionTop - scrollPosition) {
                        modalPopupBody.style.bottom = windowHeight - triggerPositionTop + padding + scrollPosition + 'px';

                        //overflow top
                        // if (windowHeight < windowHeight - triggerPositionTop + padding + modalPopupBodyHeight) {
                        //     modalPopupBody.style.overflow = 'auto'
                        //     modalPopupBody.style.maxHeight = windowHeight - (windowHeight - triggerPositionTop + padding) + 'px'
                        // }
                    }
                }
                modalTrigger.classList.add('is-modal-open');
            }, // [1]
            onClose: function (modalPopup, trigger, event) {
                const modalPopupBody = modalPopup.querySelector('.modal__container');
                const dropDown = modalPopup.classList.contains('micromodal-slide-dropdown');
                const selectBox = modalPopup.classList.contains('micromodal-slide-select');

                if (dropDown || selectBox) {
                    setTimeout(function () {
                        modalPopupBody.removeAttribute('style');
                    }, 500)
                }
                modalTrigger.classList.remove('is-modal-open');

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
    }
}
