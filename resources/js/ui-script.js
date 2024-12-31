
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
    tippyContent.init();
    tableInnerScroll.init();
    AOS.init({
        once: true,
        offset: 150,
    });

});

const toggle = {
    init: function () {
        $toggleCont = $('[data-toggle="toggle-trigger"]');
        $toggleClass = 'is-toggled';
        this.onClick();
    },
    onClick: function () {
        $(document).on('click', '[data-toggle="toggle-trigger"]', function () {
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
        this.onClick();
    },
    onClick: function () {
        $(document).on('click', '[data-toggle="toggle-trigger"]', function () {

            const $switchBefore = this.dataset.switchBefore;
            const $switchAfter = this.dataset.switchAfter;
            const $switchInner = this.querySelectorAll("*");

            // target switch class
            if ($switchBefore !== undefined && !$switchAfter !== undefined) {
                const $switchBeforeArray = this.dataset.switchBefore.split(/\s+/);
                const $switchAfterArray = this.dataset.switchAfter.split(/\s+/);
                if (this.classList.contains(...$switchBeforeArray)) {
                    this.classList.add(...$switchAfterArray);
                    this.classList.remove(...$switchBeforeArray);
                } else {
                    this.classList.add(...$switchBeforeArray);
                    this.classList.remove(...$switchAfterArray);
                }
            }

            // target inner switch class
            $switchInner.forEach(function (items) {
                if (items.dataset.switchInnerBefore && items.dataset.switchInnerAfter) {
                    const $switchInnerBefore = items.dataset.switchInnerBefore.split(/\s+/);
                    const $switchInnerAfter = items.dataset.switchInnerAfter.split(/\s+/);
                    if (items.classList.contains(...$switchInnerBefore)) {
                        items.classList.add(...$switchInnerAfter);
                        items.classList.remove(...$switchInnerBefore);
                    } else {
                        items.classList.add(...$switchInnerBefore);
                        items.classList.remove(...$switchInnerAfter);
                    }
                }
            });


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
        this.onResize();
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
        $tabTrigger = $tabList.find('button') //toggle;
        this.onClick();
        this.afterLoadTab();
    },
    onClick: function () {
        $tabTrigger.on('click', function () {
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
        $tabTrigger = $tabList.find('button:not(.link), a:not(.link)')
        $tabTrigger.each(function () {
            const $parent = $(this).closest('li');
            if ($parent.hasClass('tab-active')) {
                $(this).attr({
                    'aria-selected': 'true'
                })
                $('#' + $(this).attr('data-controls')).addClass('tab-active').attr({ 'aria-selected': 'true' });

                const scroll = this.closest('.tab-list')
                const scrollPadding = $(scroll).css('padding-left').replace("px", "");

                const scrollPosition = scroll.scrollLeft;
                const scrollPositionLeft = $(this).offset().left;
                scroll.scrollTo({
                    left: scrollPositionLeft - scrollPadding,
                    behavior: 'smooth',
                })
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
        $accTrigger = $accordionList;
        this.onClick();
        this.afterLoad();
    },
    onClick: function () {
        $accTrigger.on('click', function () {
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
        $accTrigger.each(function () {
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
        this.textareaResize();
        this.inputRemove()
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
    inputRemove: function () {
        $(document).on('click', '.input-remove,.input-remove-small', function () {
            var inputText = $(this).closest('.input-wrap').find('input')
            inputText.val('').focus();
        })
    }
}

// toastr
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


//sticky
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

    const snackbarEl = document.querySelector('.snackbar-content')

    if (snackbarEl != null) {
        const snackbarWrapper = document.querySelector('.content');
        snackbarWrapper.style.paddingBottom = snackbarEl.clientHeight + 'px';

        var timer = null;
        var close = 1500;
        window.addEventListener('scroll', function () {
            if (!snackbarEl.classList.contains('`snackbar-disabled`')) {
                if (timer !== null) {
                    clearTimeout(timer);
                    snackbarEl.classList.remove('is-sticky')
                }
                timer = setTimeout(function () {
                    snackbarEl.classList.add('is-sticky')
                }, close);
            }
        }, close);

        // snackbar disabled button
        const snackbarElClose = snackbarEl.querySelector('[data-snackbar-close]')
        if (snackbarElClose != null) {
            snackbarElClose.addEventListener('click', function () {
                snackbarEl.classList.remove('is-sticky');
                snackbarEl.classList.add('snackbar-disabled');
                clearTimeout(timer);
            });
        }

        const mainContainer = document.querySelector('main');
        const bottomBtn = mainContainer.querySelector('.bottom-btn')
        if (bottomBtn != null) {
            snackbarEl.style.bottom = bottomBtn.clientHeight + 'px';
        }
    }

}


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
                    if (items.childElementCount > 4) {
                        modalPopup.classList.remove('micromodal-slide-select')
                        modalPopup.classList.add('micromodal-slide-bottom');
                    }
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
                        modalPopupBody.style.left = triggerPositionLeft + 'px';
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
                    }, 300)
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

// tippy tooltip
const tippyContent = {
    init: function () {
        //tooltip 제외 텍스트 없는 아이콘들
        const tippyWrap = document.querySelectorAll('[data-tippy]')
        tippyWrap.forEach(function (tippyButton) {
            const tippyContent = tippyButton.dataset.tippy
            // console.dir(tippyContent)
            tippy(tippyButton, {
                onTrigger(instance, event) {
                    instance.setContent(tippyContent);
                },
                allowHTML: true,
                content: tippyContent,
                trigger: 'click',
                zIndex: 'calc(var(--nav-zIndex) - 9)'
            });

        })
    },
}


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
                cancelButton: " btn-medium btn-outlined",
                confirmButton: "btn-medium btn-primary",
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
            title: `<span class="description ${status} body-large">${title}</span>`,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            customClass: {
                actions: 'btn-wrap',
                htmlContainer: 'al',
                cancelButton: "btn-medium btn-outlined",
                confirmButton: "btn-medium btn-primary",
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
                cancelButton: "btn-medium btn-outlined",
                confirmButton: "btn-medium btn-primary",
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
                cancelButton: "btn-medium btn-outlined",
                confirmButton: "btn-medium btn-primary",
            },
            buttonsStyling: false,
            // allowOutsideClick: false,
            html: `
                <i class="icon-only icon-48 ${icon} bg-icon-gray_1"></i>
                <strong class="title-large mt8">${title}</strong>
                <p class="body-large mt8 fw-400">${text}</p>
            `,
        })
    }
}

const tableInnerScroll = {
    init: function () {
        $scrollWrap = document.querySelectorAll('.table-col.overflow-visible');
        if ($scrollWrap != null) {
            $scrollWrap.forEach(function (items) {
                $scrollPosition = items.scrollLeft;
                if (items.scrollWidth <= $scrollPosition + items.offsetWidth) {
                    items.classList.add('scroll-end')
                } else {
                    items.classList.remove('scroll-end')

                }
            })
        }
        tableInnerScroll.onScroll();
    },
    onScroll: function () {
        if ($scrollWrap != null) {
            $scrollWrap.forEach(function (items) {
                items.addEventListener('scroll', () => {
                    $scrollPosition = items.scrollLeft;
                    if (items.scrollWidth <= $scrollPosition + items.offsetWidth) {
                        items.classList.add('scroll-end')
                    } else {
                        items.classList.remove('scroll-end')
                    }
                }, false)
            });
        }
    }
}


var gnb = {
    init: function () {
        $gnbWrap = $('.gnb').closest('.modal__container');
        $gnbScrollWrap = $gnbWrap.find('.modal__content');
        gnb.oneDepthInit();
        gnb.scrollDown();
    },
    menuCenter: function ($el, menuCenterOption) {
        var snbwrap = menuCenterOption.scrollWrap;
        var targetPos = menuCenterOption.scrollTarget.position();
        var box = menuCenterOption.scrollWrap.parent();
        var boxHalf = box.width() / 2;
        var pos;
        var scrollLeft2 = snbwrap.scrollLeft();
        var selectTargetPos = targetPos.left + menuCenterOption.scrollTarget.outerWidth() / 2;
        pos = selectTargetPos - boxHalf + scrollLeft2;
        if (menuCenterOption.animation === true) {
            setTimeout(function () {
                snbwrap.stop().animate({
                    scrollLeft: pos
                }, 100)
            })
        } else {
            snbwrap.scrollLeft(pos);
        }
    },

    oneDepthInit: function () {
        const gnbNavigation = $gnbWrap.find('.gnb-menu-nav')
        gnbNavigation.find('a').unbind('click').bind({
            'click': function (e) {
                e.preventDefault();
                const $stickyHeight = $gnbWrap.find('.main-header').outerHeight() + $gnbWrap.find('.gnb-menu-search').outerHeight() + $gnbWrap.find('.gnb-menu-nav').outerHeight();
                var targetId = $(this).attr('href');
                var targetY = $(targetId).offset().top - $stickyHeight + $gnbScrollWrap.scrollTop();
                $gnbScrollWrap.stop().animate({ scrollTop: targetY }, 150);
            }
        });
        var $el = $('.gnb .gnb-menu-nav ul');
        var menuCenterOption = {
            scrollWrap: $el,
            scrollTarget: $el.find('li.tab-active'),
            animation: true
        };
        gnb.menuCenter($el, menuCenterOption);

    },
    // gnb scroll 시 1뎁스 메뉴 좌우스크롤 및 active
    scrollDown: function () {
        $gnbScrollWrap.off().on('scroll', function () {
            //vertical scroll
            var $scrollDistance = Math.ceil($(this).scrollTop());
            const $stickyHeight = $gnbWrap.find('.main-header').outerHeight() + $gnbWrap.find('.gnb-menu-search').outerHeight() + $gnbWrap.find('.gnb-menu-nav').outerHeight();
            // menu auto scroll


            $('.gnb').find('.gnb-menu-list .gnb-menu-section[id]').each(function (i) {
                const $targetY = $(this).position().top - $stickyHeight + $gnbScrollWrap.scrollTop();
                if ($targetY <= $scrollDistance) {
                    $('.gnb .gnb-menu-nav li').siblings('').removeClass('tab-active').eq(i).addClass('tab-active');

                }
            })

            //scroll down active menu
            var $el = $('.gnb .gnb-menu-nav ul');
            var menuCenterOption = {
                scrollWrap: $el,
                scrollTarget: $el.find('li.tab-active'),
                animation: true
            };
            gnb.menuCenter($el, menuCenterOption);

        })
    },
    sizeCheck: function () {

        const $gnbScrollHeight = $gnbScrollWrap.outerHeight(); // device height - header height
        const $gnbHeight = $gnbWrap.find('.gnb').outerHeight(); // gnb outerheight
        const $stickyHeight = $gnbWrap.find('.main-header').outerHeight() + $gnbWrap.find('.gnb-menu-search').outerHeight() + $gnbWrap.find('.gnb-menu-nav').outerHeight(); // sticky height
        $('.gnb').find('.gnb-menu-list .gnb-menu-section[id]').each(function () {
            const $targetY = $(this).position().top;
            if ($targetY > $gnbHeight + $stickyHeight - $gnbScrollHeight) {
                $('.gnb').css('padding-bottom', $targetY - ($gnbHeight + $stickyHeight - $gnbScrollHeight))
            }
        });
    }

}

