
$(function () {
    navigation.init();
    dropDown.init();
    toggleActiveClass.init();
    tabContent.init();
    accordionContent.init();
    tippyContent.init();
    themeSelect.init();
    // $('html').addClass('private');
});

// global variable
let $WINDOW_MODE = '';
let NAV_COLLAPSE = '';

const $html = $('html');
const preventScrollOn = function () {
    $html.css('overflow', 'hidden');
};
const preventScrollOff = function () {
    $html.css('overflow', '');
};

// navigation
const navigation = {
    init: function () {
        $navContent = $('.nav-content');
        navWrap = $navContent.closest('.navigation');
        navDep = $('.nav-content a').closest('li');
        $dep01 = $navContent.find('.dep01 > li');
        //false : 펼침, true : 닫힘
        NAV_COLLAPSE = $('.navigation .navTrigger').attr('aria-expanded') === 'true' ? true : false;
        NAV_DEP_OPEN = false;
        ANIMATION_TIME = 0;

        navigation.beforeLoad();
        navigation.onClick();
        navigation.collapse();
        navigation.onFocus();
        navigation.onFocusOut();
        navigation.onResize();

        if (NAV_COLLAPSE) {
            // navWrap.addClass('is-collapse');
            // navWrap.find('.navTrigger').attr('aria-expanded', 'true');

            if (navDep.hasClass('is-active')) {
                const child = navDep.closest('.is-current.is-active').children('a');
                child.attr('aria-expanded', 'true');
                navDep.removeClass('is-active is-reverse');
                // navDep.find('>ul').stop().slideUp(ANIMATION_TIME, 'linear');
                navigation.beforeLoad();
                NAV_DEP_OPEN = false;
                $dep01.removeClass('is-focus');
            }
        } else {
            if (navDep.hasClass('is-active')) {
                const currNavDep = navDep.closest('.is-current.is-active');
                const child = navDep.closest('.is-current.is-active').children('a');
                child.attr('aria-expanded', 'false');
                currNavDep.addClass('is-active');
                currNavDep.find('>ul').stop().slideDown(ANIMATION_TIME, 'linear');
                NAV_DEP_OPEN = true;
            }
        }

        $(document).on('click', function (e) {
            if (!navWrap.is(e.target) && !navWrap.has(e.target).length) {
                if (NAV_COLLAPSE) {
                    navigation.depthClose();
                    NAV_DEP_OPEN = false;
                }
            }
        })
    },
    onClick: function () {
        $(document).on('click', '.nav-content a', function (e) {
            if (!NAV_COLLAPSE) {
                ANIMATION_TIME = 0;
                NAV_DEP_OPEN = false;
            } else {
                ANIMATION_TIME = 0;
                NAV_DEP_OPEN = true;
            }
            // depth 있을 경우
            if ($(this).attr('aria-expanded')) {

                e.preventDefault();
                const parent = $(this).closest('li');

                if (!parent.hasClass('is-active')) {

                    //accessibility
                    $(this).attr('aria-expanded', 'false');

                    //event
                    parent.addClass('is-active');
                    parent.find('>ul').stop().slideDown(ANIMATION_TIME, 'linear');
                    parent.siblings('li.is-active').find('>ul').stop().slideUp(ANIMATION_TIME, 'linear');
                    parent.siblings('li.is-active').find('>a').attr('aria-expanded', 'true');
                    parent.siblings('li.is-active').removeClass('is-active is-reverse');

                    //dep02 overflow window
                    if (parent.find('>.dep02').length) {
                        const reverseTarget = parent.find('>.dep02');
                        const windowHeight = window.innerHeight;
                        const offsetSize = reverseTarget.offset().top + reverseTarget.outerHeight();

                        if (offsetSize > windowHeight) {
                            parent.addClass('is-reverse');
                        }
                    }

                } else {
                    $(this).attr('aria-expanded', 'true');

                    parent.removeClass('is-active is-reverse');
                    parent.find('>ul').stop().slideUp(ANIMATION_TIME, 'linear');

                    NAV_DEP_OPEN = false;
                }

            }

            $dep01.removeClass('is-focus');

        });
    },
    depthClose: function () {
        const isActive = $navContent.find('.dep01 > li.is-active');
        isActive.each(function () {
            if (isActive.find('>a').attr('aria-expanded')) {
                isActive.find('>a').attr('aria-expanded', 'true');
            }
            isActive.find('.dep02').css('display', 'none');
            isActive.removeClass('is-active is-reverse');
        })

    },
    beforeLoad: function () {
        $navContent.find('li').each(function () {
            if ($(this).find('> ul').length) {
                if ($(this).hasClass('is-current')) { // 현재 페이지에 진입해 있을 경우
                    if (!NAV_COLLAPSE) {
                        $(this).addClass('is-active')
                        $(this).find('> ul').css('display', 'block');
                    }
                    $(this).find('> a').attr('aria-expanded', 'false');
                } else {
                    $(this).find('> a').attr('aria-expanded', 'true');
                    $(this).find('> ul').css('display', 'none');
                }
            }
        });
    },
    collapse: function () {
        $(document).on('click', '.navigation .navTrigger', function (e) {
            if (NAV_COLLAPSE) {
                navWrap.removeClass('is-collapse');
                setCookie('navCollapse', 'false', 1);
                NAV_COLLAPSE = false;
                NAV_DEP_OPEN = false;
                $(this).attr('aria-expanded', 'false');
                navigation.beforeLoad();
            } else {
                navWrap.addClass('is-collapse');
                setCookie('navCollapse', 'true', 1);
                NAV_COLLAPSE = true;
                NAV_DEP_OPEN = true;
                $(this).attr('aria-expanded', 'true');
            }
        })
    },
    onFocus: function () {
        $dep01.on('mouseenter', function () {
            if (NAV_COLLAPSE && !NAV_DEP_OPEN) {
                $(this).addClass('is-focus');
            }
        })

    },
    onFocusOut: function () {
        $dep01.on('mouseleave', function () {
            if (NAV_COLLAPSE && !NAV_DEP_OPEN) {
                $(this).removeClass('is-focus');
            }
        })
    },
    onResize: function () {
        let delay = 300;
        let timer = null;
        $(window).on('resize', function () {
            clearTimeout(timer);
            timer = setTimeout(function () {

                if (window.innerWidth <= 1280) {
                    navWrap.addClass('is-collapse');
                    setCookie('navCollapse', 'true', 1);
                    NAV_COLLAPSE = true;
                    NAV_DEP_OPEN = true;
                    $('.navigation .navTrigger').attr('aria-expanded', 'true');
                }
            }, delay);
        });
    }

}


// global dropdown
const dropDown = {
    init: function () {
        CLASS_DROPDOWN_ACTIVE = 'is-dropdown';
        CLASS_SELECTED_ACTIVE = 'is-selected';
        let par = '';
        let _this = '';
        dropDown.onClick();
        dropDown.select();
    },
    open: function () {
        par.addClass(CLASS_DROPDOWN_ACTIVE);
        par.find('>.target').slideDown(0);
        _this.attr('aria-expanded', 'false');
    },
    close: function () {
        par.removeClass(CLASS_DROPDOWN_ACTIVE);
        par.find('>.target').slideUp(0);
        _this.attr('aria-expanded', 'true');
        par.find('.trigger').focus();
    },
    select: function () {
        $(document).on('click', '.dropDown ul.target > li > button', function () {
            const siblings = $(this).closest('li').siblings('li');
            if (par.hasClass(CLASS_DROPDOWN_ACTIVE)) {
                siblings.removeClass(CLASS_SELECTED_ACTIVE);
                $(this).closest('li').addClass(CLASS_SELECTED_ACTIVE);
                const value = $(this).html();
                par.find('.trigger').html('');
                par.find('.trigger').append(value);
                dropDown.close();
            }
        });
    },
    onClick: function () {
        $(document).on('click', '.dropDown .trigger', function (e) {
            _this = $(this)
            par = $(this).closest('.dropDown');
            if (par.find('.target').length) {
                if (!par.hasClass(CLASS_DROPDOWN_ACTIVE)) {
                    $(`.dropDown.${CLASS_DROPDOWN_ACTIVE}`).each(function () {
                        $(this).removeClass(CLASS_DROPDOWN_ACTIVE);
                        $(this).find('>.target').slideUp(0);
                        $(this).find('.trigger').attr('aria-hidden', 'true');
                    })
                    dropDown.open();
                } else {
                    dropDown.close();
                }
            }
        });
    },

}

// global toggle
const toggleActiveClass = {
    init: function () {
        CLASS_TOGGLE_ACTIVE = 'is-toggle';
        toggleActiveClass.onClick();
        let par = '';
        let togglePar = '';

    },
    open: function () {
        par.addClass(CLASS_TOGGLE_ACTIVE);
        par.find('.toggleTrigger .blind').attr('aria-hidden', 'false');
    },
    close: function () {
        par.removeClass(CLASS_TOGGLE_ACTIVE);
        par.find('.toggleTrigger .blind').attr('aria-hidden', 'true');
        par.find('.toggleTrigger').focus();
    },
    onClick: function () {
        $(document).on('click', '.toggleTrigger', function (e) {
            par = $(this).closest('.toggleCont');
            if (par.hasClass(CLASS_TOGGLE_ACTIVE)) {
                if (!par.hasClass('disableToggle')) {
                    toggleActiveClass.close();
                }
            } else {
                if (par.siblings('.toggleCont').length) {
                    par.siblings('.toggleCont').each(function () {
                        $(this).removeClass(CLASS_TOGGLE_ACTIVE);
                    })
                }
                if (par.hasClass('toggleGroup')) {
                    $('body').find('.toggleGroup.is-toggle').removeClass(CLASS_TOGGLE_ACTIVE);
                }
                toggleActiveClass.open();
            }
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
        $trigger = $accordionList.find('button');
        accordionContent.onClick();
        accordionContent.afterLoad();
    },
    onClick: function () {
        $trigger.on('click', function () {
            const parent = $(this).closest('.acc-title')
            if (parent.hasClass('active')) {
                parent.removeClass('active');
                $(this).attr('aria-expanded', 'true');
                $('#' + $(this).attr('data-controls')).removeClass('active');
            } else {
                parent.addClass('active');
                $(this).attr('aria-expanded', 'false');
                $('#' + $(this).attr('data-controls')).addClass('active');
            }
        })
    },
    afterLoad: function () {
        $trigger.each(function () {
            const parent = $(this).closest('.acc-title')
            if (parent.hasClass('active')) {
                $(this).attr('aria-expanded', 'false');
                $('#' + $(this).attr('data-controls')).addClass('active')
            } else {
                $(this).attr('aria-expanded', 'true');
                $('#' + $(this).attr('data-controls')).removeClass('active')
            }
        });
    }
}

// global tippy tooltip
const tippyContent = {
    init: function () {
        //tooltip 제외 텍스트 없는 아이콘들
        const tippyWrap = document.querySelectorAll('.btn-inner-ico:not(.tooltip-wrap):not(.noTippy),.btn-search button,.util-menu .btn-util,.grid-list .util .info .info-ico')
        tippyWrap.forEach(function (tippyButton) {
            if (tippyButton.querySelectorAll('.blind').length) {
                var text = tippyButton.querySelector('.blind').innerText;
                tippy(tippyButton, {
                    onTrigger(instance, event) {
                        text = instance.reference.querySelector('.blind').innerText;
                        instance.setContent(text);
                    },
                    content: text,
                    // trigger: 'click',
                    zIndex: 'calc(var(--nav-zIndex) - 9)'
                });

            }
        })
    },
}

const themeSelect = {
    init: function () {
        const themeSelector = document.querySelector('#themeSelector');
        const styleSheet = document.querySelector('#stylesheet-darkmode');
        if (themeSelector != null) {
            if (getCookie('themeDark') === '') {
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    themeSelector.checked = true;
                    setCookie('themeDark', 'true', 365);
                    document.querySelector('body').classList.add('dk');
                    styleSheet.removeAttribute('disabled');
                } else {
                    setCookie('themeDark', 'false', 365);
                    themeSelector.checked = false;
                    document.querySelector('body').classList.remove('dk');
                    styleSheet.setAttribute('disabled', 'disabled');
                }
            } else {
                if (getCookie('themeDark') === 'true') {
                    themeSelector.checked = true;
                }
                else if (getCookie('themeDark') === 'false') {
                    themeSelector.checked = false;
                }
            }
        }

        themeSelect.onChange();
    },
    onChange: function () {
        const themeSelector = document.querySelector('#themeSelector');
        const styleSheet = document.querySelector('#stylesheet-darkmode');
        if (themeSelector != null) {
            themeSelector.addEventListener("change", function () {
                if (this.checked === true) {
                    setCookie('themeDark', 'true', 365);
                    document.querySelector('body').classList.add('dk');
                    styleSheet.removeAttribute('disabled');
                } else {
                    setCookie('themeDark', 'false', 365);
                    document.querySelector('body').classList.remove('dk');
                    styleSheet.setAttribute('disabled', 'disabled');
                }
            });
        }

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


// global new window
const popupCenter = ({ url, title, w, h, l, t }) => {

    //open
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    let top = '';
    let left = '';
    if (l === undefined) {
        top = (height - h) / 2 / systemZoom + dualScreenTop;
        left = (width - w) / 2 / systemZoom + dualScreenLeft;
    } else {
        top = t + dualScreenTop;
        left = l + dualScreenLeft;
    };
    const newWindow = window.open(url, title,
        `scrollbars=yes, width=${w}, height=${h}, left=${left}, top=${top}`
    );
    if (window.focus) newWindow.focus();
}