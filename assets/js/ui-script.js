
$(function () {
    toggleActiveClass.init();
    tabContent.init();
    accordionContent.init();
    formStyle.init();
});

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
