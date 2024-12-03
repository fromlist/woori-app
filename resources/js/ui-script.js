
$(function () {
    bsCardResize.init();
    tabContent.init();
    accordionContent.init();
    formStyle.init();
    toggle.init()
    switchClass.init()
    $swal;
    toastrCont.init();
    microModalFunc.init();
    stickyContent();
});

const toggle = {
    init: function () {
        $toggleCont = $('[data-toggle="toggle-trigger"]');
        $toggleClass = 'is-toggled';
        toggle.onClick();
    },
    onClick: function () {
        $toggleCont.on('click', function () {
            const toggleWrap = $(this).closest('[data-toggle="toggle-wrap"]');
            if (toggleWrap.hasClass($toggleClass)) {
                toggleWrap.removeClass($toggleClass);
            } else {
                toggleWrap.addClass($toggleClass);
            }
        })
    }
}

const switchClass = {
    init: function () {
        $switchClassBefore = $toggleCont.data('switch-before');
        $switchClassAfter = $toggleCont.data('switch-after');
        switchClass.onClick();
    },
    onClick: function () {
        $toggleCont.on('click', function () {
            if ($(this).hasClass($switchClassBefore)) {
                $(this).removeClass($switchClassBefore).addClass($switchClassAfter);
            } else {
                $(this).removeClass($switchClassAfter).addClass($switchClassBefore);
            }
        })
    }
}


// global tab
const bsCardResize = {
    init: function () {
        const bsCard = $('.bs-card');
        const bsParent = $('.bs-card-wrap').parent('').outerWidth();
        const bsCardwWidth = 360;
        let percent = (bsParent / bsCardwWidth).toFixed(1);
        // console.log(percent)
        bsCard.css('zoom', percent);
        bsCardResize.onResize();
    },
    onResize: function () {
        $(window).resize(function () {
            setTimeout(function () {
                bsCardResize.init();
            }, 300)
        })
    }
}


// global tab
const tabContent = {
    init: function () {
        $tabList = $('.tab-list li');
        $trigger = $tabList.find('button') //toggle;
        tabContent.onClick();
        tabContent.afterLoadTab();
    },
    onClick: function () {
        $trigger.on('click', function () {
            const $parent = $(this).closest('li');
            // 선택 탭 활성화
            $parent.addClass('tab-active');
            $(this).attr({
                'aria-selected': 'true'
            })
            // 기존 탭 비활성화
            $parent.siblings().removeClass('tab-active');
            $parent.siblings().find('button').attr({
                'aria-selected': 'false'
            });

            // 선택된 연관된 탭 패널 활성화
            $('#' + $(this).attr('data-controls')).addClass('tab-active').attr({ 'aria-selected': 'true' });
            // 기존 탭 패널 비활성화
            $('#' + $(this).attr('data-controls')).siblings('.tabpanel').removeClass('tab-active').attr({ 'aria-selected': 'false' });

        })
    },
    afterLoadTab: function () {
        $trigger = $tabList.find('button:not(.link), a:not(.link)')
        $trigger.each(function () {
            const $parent = $(this).closest('li');
            if ($parent.hasClass('tab-active')) {
                $(this).attr({
                    'aria-selected': 'true'
                })
                $('#' + $(this).attr('data-controls')).addClass('tab-active').attr({ 'aria-selected': 'true' });
            } else {
                $(this).attr({
                    'aria-selected': 'false'
                });
                $('#' + $(this).attr('data-controls')).removeClass('tab-active').attr({ 'aria-selected': 'false' });
            }
        });
    }
}

// global accordion
const accordionContent = {
    init: function () {
        $accordionList = $('.accordion-content .acc-title');
        $trigger = $accordionList;
        accordionContent.onClick();
        accordionContent.afterLoad();
    },
    onClick: function () {
        $trigger.on('click', function () {
            const parent = $(this).closest('.acc-title')
            if (parent.hasClass('acc-active')) {
                parent.removeClass('acc-active');
                $(this).attr('aria-expanded', 'true');
                $('#' + $(this).attr('data-controls')).removeClass('acc-active');
            } else {
                parent.addClass('acc-active');
                $(this).attr('aria-expanded', 'false');
                $('#' + $(this).attr('data-controls')).addClass('acc-active');
            }
        })
    },
    afterLoad: function () {
        $trigger.each(function () {
            const parent = $(this).closest('.acc-title')
            if (parent.hasClass('acc-active')) {
                $(this).attr('aria-expanded', 'false');
                $('#' + $(this).attr('data-controls')).addClass('acc-active')
            } else {
                $(this).attr('aria-expanded', 'true');
                $('#' + $(this).attr('data-controls')).removeClass('acc-active')
            }
        });
    }
}

// global form
const formStyle = {
    init: function () {
        formStyle.textareaResize();
    },

    textareaResize: function () {
        $.each($('textarea'), function () {
            if (!$(this).is('[readonly]')) {
                const offset = this.offsetHeight - this.clientHeight;
                const resizeTextarea = function (el) {
                    $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
                    $(el).addClass('areaResize')
                };
                $(document).on('keyup input', 'textarea', function () {
                    resizeTextarea(this);
                });
            }
        });
    },
}

const toastrCont = {
    init: function () {
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
    }
}

const stickyContent = function () {
    const headerEl = document.querySelector('header');
    const sentinalEl = document.querySelector('.sticky-sentinal');
    const stickyEl = document.querySelector('.sticky-content')
    // Initial state
    const handler = (entries) => {
        if (!entries[0].isIntersecting) {
            stickyEl.classList.add('enabled');
            stickyEl.style.top = sentinalEl.offsetTop + 'px';
        } else {
            stickyEl.classList.remove('enabled');
        }
    }

    const observer = new window.IntersectionObserver(handler);
    if (sentinalEl != null) {
        observer.observe(sentinalEl);

        // Initial state
        var scrollPos = 0;
        // adding scroll event
        window.addEventListener('scroll', function () {
            // detects new state and compares it with the new one
            if ((document.body.getBoundingClientRect()).top > scrollPos) {
                document.body.setAttribute('data-scroll-direction', 'UP');
                stickyEl.style.top = sentinalEl.offsetTop + 'px';
            }
            else {
                document.body.setAttribute('data-scroll-direction', 'DOWN');
                stickyEl.removeAttribute('style');

            }
            // saves the new position for iteration.
            scrollPos = (document.body.getBoundingClientRect()).top;
        });
    }
}


const microModalFunc = {
    init: function () {
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
    }
}


/*** layerpopup focus out prevent ***/
$(document).ready(function () {

    const focusableElementsString = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable], video";

    // dropdown open key event
    $(document).on('keydown', '.dropDown.is-dropdown, .toggleCont.is-toggle', function (event, target) {
        trapTabKey($(this), event);
    })


    //focusout prevent event
    function trapTabKey(obj, evt, target) {
        // if tab or shift-tab pressed
        if (evt.which == 9) {
            // get list of all children elements in given object
            const o = obj.find('*');
            // get list of focusable items
            let focusableItems;
            focusableItems = o.filter(focusableElementsString).filter(':visible')
            // get currently focused item
            let focusedItem;
            focusedItem = $(':focus');
            // get the number of focusable items
            var numberOfFocusableItems;
            numberOfFocusableItems = focusableItems.length
            // get the index of the currently focused item
            var focusedItemIndex;
            focusedItemIndex = focusableItems.index(focusedItem);

            if (evt.shiftKey) {
                //back tab
                // if focused on first item and user preses back-tab, go to the last focusable item
                if (focusedItemIndex == 0) {
                    focusableItems.get(numberOfFocusableItems - 1).focus();
                    evt.preventDefault();
                }
            } else {
                //forward tab
                // if focused on the last item and user preses tab, go to the first focusable item
                if (focusedItemIndex == numberOfFocusableItems - 1) {
                    focusableItems.get(0).focus();
                    evt.preventDefault();
                }
            }
        }
        if (evt.which == 27) {
            //dropDown
            if (obj.hasClass('dropDown')) {
                obj.removeClass('is-dropdown').find('.trigger').focus();
            }
            //toggle
            if (obj.hasClass('toggleCont')) {
                obj.removeClass('is-toggle').find('.toggleTrigger').focus();
                console.log(obj)
            }
        }
    }

});

// sweetalert
const $swal = {
    fire01(title, confirmButtonText, showCancelButton, cancelButtonText) {
        Swal.fire({
            showCancelButton: showCancelButton,
            showCloseButton: false,
            reverseButtons: true,
            title: title,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            customClass: {
                actions: 'btn-wrap',
                cancelButton: " btn-large btn-outlined",
                confirmButton: "btn-large btn-primary",
            },
            buttonsStyling: false,
            allowOutsideClick: false,

        })
    },
    fire02(title, status, confirmButtonText, showCancelButton, cancelButtonText) {
        Swal.fire({
            showCancelButton: showCancelButton,
            showCloseButton: false,
            reverseButtons: true,
            title: `<span class="description ${status} body-xlarge">${title}</span>`,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            customClass: {
                actions: 'btn-wrap',
                htmlContainer: 'al',
                cancelButton: "btn-large btn-outlined",
                confirmButton: "btn-large btn-primary",
            },
            buttonsStyling: false,
            allowOutsideClick: false,

        })
    },
    fire03(title, text, showCancelButton, confirmButtonText, cancelButtonText) {
        Swal.fire({
            showCancelButton: showCancelButton,
            showCloseButton: true,
            reverseButtons: true,
            title: title,
            text: text,
            confirmButtonText: '예',
            cancelButtonText: '아니요',
            customClass: {
                title: 'title-large',
                htmlContainer: 'al',
                actions: 'btn-wrap pt40',
                cancelButton: "btn-large btn-outlined",
                confirmButton: "btn-large btn-primary",
            },
            buttonsStyling: false,
            // allowOutsideClick: false,

        })
    },
    fire04(title, text, icon, confirmButtonText) {
        Swal.fire({
            showCloseButton: true,
            reverseButtons: true,
            confirmButtonText: confirmButtonText,
            customClass: {
                htmlContainer: 'mt40',
                actions: 'btn-wrap',
                cancelButton: "btn-large btn-outlined",
                confirmButton: "btn-large btn-primary",
            },
            buttonsStyling: false,
            // allowOutsideClick: false,
            html: `
                <i class="icon-only icon-48 ${icon} bg-icon bg-icon-gray_1"></i>
                <strong class="title-large mt8">${title}</strong>
                <p class="body-large mt8">${text}</p>
            `,
        })
    }
}
