
$(function () {
    // bsCardResize.init();
    tabContent.init();
    formStyle.init();
    toggle.init()
    switchClass.init()
    $swal;
    toastrCont.init();
    // microModalFunc.init();
    stickyContent.init();
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

// business card
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
        $tabList = $('.tab-list li');
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


// global form
const formStyle = {
    init: function () {
        this.textareaResize();
        this.inputRemove()
    },
    textareaResize: function () {
        $(document).on('keyup input', 'textarea', function () {
            if (!$(this).is('[readonly]')) {
                const offset = this.offsetHeight - this.clientHeight;
                const resizeTextarea = function (el) {
                    $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
                    $(el).addClass('areaResize')
                };
                resizeTextarea(this);
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
            if ($('main').find('.bottom-btn:visible').length) {
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
const stickyContent = {
    init: function () {
        this.sentinal();
        this.snackBar();
    },
    sentinal: function () {
        // Initial state
        var scrollPos = 0;
        // adding scroll event

        //sentinal sticky content
        window.addEventListener('scroll', function () {

            const sentinalEl = document.querySelector('main .sticky-sentinal');
            const stickyEl = document.querySelector('main .sticky-content')

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
            }

            if ((document.body.getBoundingClientRect()).top > scrollPos) {
                document.body.setAttribute('data-scroll-direction', 'UP');
                if (stickyEl != null) {
                    stickyEl.style.top = sentinalEl.offsetTop + 'px';
                }
            }
            else {
                document.body.setAttribute('data-scroll-direction', 'DOWN');
                if (stickyEl != null) {
                    stickyEl.removeAttribute('style');
                }
            }
            scrollPos = (document.body.getBoundingClientRect()).top;



        });
    },
    snackBar: function () {

        var timer = null;
        var close = 500;
        snackBarFunc();

        window.addEventListener('scroll', function () {
            snackBarFunc();
        }, close);

        function snackBarFunc() {
            const snackbarEl = document.querySelector('.snackbar-content')
            const snackbarWrapper = document.querySelector('.content');

            if (snackbarEl != null) {
                snackbarWrapper.style.paddingBottom = snackbarEl.clientHeight + 'px';

                if (!snackbarEl.classList.contains('snackbar-disabled')) {
                    if (timer !== null) {
                        clearTimeout(timer);
                        snackbarEl.classList.remove('is-sticky')
                    }
                    timer = setTimeout(function () {
                        snackbarEl.classList.add('is-sticky')
                    }, close);
                }


                const mainContainer = document.querySelector('main');
                const bottomBtn = mainContainer.querySelectorAll('.bottom-btn')

                if (bottomBtn != null) {
                    bottomBtn.forEach(function (element) {
                        const visibility = window.getComputedStyle(element).display;
                        if (visibility === 'block') {
                            snackbarEl.style.bottom = element.clientHeight + 'px';
                        }
                    })
                }
            } else {
                snackbarWrapper.style.removeProperty('padding-bottom');
            }
        }

        // snackbar disabled button
        $(document).on('click', '[data-snackbar-close]', function () {
            $(this).closest('.snackbar-content').removeClass('is-sticky');
            $(this).closest('.snackbar-content').addClass('snackbar-disabled');
            clearTimeout(timer);
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
    fire01(title, confirmButtonText, showCancelButton, cancelButtonText, callback, fallback) {
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

        }).then(function (result) {
            if (result.isConfirmed) {
                if (callback) { callback(); }
            } else if (result.isDismissed) {
                if (fallback) { fallback(); }
            }
        });
    },
    fire02(title, status, confirmButtonText, showCancelButton, cancelButtonText, callback, fallback) {
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

        }).then(function (result) {
            if (result.isConfirmed) {
                if (callback) { callback(); }
            } else if (result.isDismissed) {
                if (fallback) { fallback(); }
            }
        });
    },
    fire03(title, text, showCancelButton, confirmButtonText, cancelButtonText, callback, fallback) {
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

        }).then(function (result) {
            if (result.isConfirmed) {
                if (callback) { callback(); }
            } else if (result.isDismissed) {
                if (fallback) { fallback(); }
            }
        });
    },
    fire04(title, text, icon, confirmButtonText, callback, fallback) {
        Swal.fire({
            showCloseButton: true,
            reverseButtons: true,
            confirmButtonText: confirmButtonText,
            customClass: {
                htmlContainer: 'mt40',
                actions: 'btn-wrap pt40',
                cancelButton: "btn-medium btn-outlined",
                confirmButton: "btn-medium btn-primary inflex",
            },
            buttonsStyling: false,
            // allowOutsideClick: false,
            html: `
                <i class="icon-only icon-48 ${icon} bg-icon-gray_1"></i>
                <strong class="title-large mt8">${title}</strong>
                <p class="body-large mt8 fw-400">${text}</p>
            `,
        }).then(function (result) {
            if (result.isConfirmed) {
                if (callback) { callback(); }
            } else if (result.isDismissed) {
                if (fallback) { fallback(); }
            }
        });
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
function menuCenter($el, menuCenterOption) {
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
}

var gnb = {
    init: function () {
        $gnbWrap = $('.gnb').closest('.modal__container');
        $gnbScrollWrap = $gnbWrap.find('.modal__content');
        gnb.oneDepthInit();
        gnb.scrollDown();
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
        menuCenter($el, menuCenterOption);

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
            if (menuCenterOption.scrollTarget.length !== 0) {
                menuCenter($el, menuCenterOption);
            }


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
    },

}

