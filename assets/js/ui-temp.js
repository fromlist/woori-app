// pub
let windowsize = window.innerWidth;
var current_path = window.location.pathname;
var localhost = window.location.href;

function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + ((exdays == null) ? "" : ";path=/;expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
}
function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cooke = cookieName + "=;path=/;expires=" + expireDate.toGMTString();
}
function getCookie(cookieName) {
    cookieName = cookieName + "=";
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = "";
    if (start != -1) {
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if (end == -1) end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

$(document).ready(function () {
    // $('body').append("<h6></h6>");
    // $('h6').text(windowsize);
    var vsCode = "vscode://file///C://dpm-edip-user//src//main//webapp"; //source file 경로
    var vsCodeHref = '<a class="vscodepath" href=' + '"' + vsCode + current_path + '"></a>';
    $('body').after(vsCodeHref);

    if (getCookie('navCollapse')) {
        $('.navigation').addClass('is-collapse');
        $('.navigation').find('.navTrigger').attr('aria-expanded', 'true');
        NAV_COLLAPSE = true;
    }

    const themeSelector = document.querySelector('#themeSelector');
    const styleSheet = document.querySelector('#stylesheet-darkmode');

    if (getCookie('themeDark') === 'true') {
        themeSelector.checked = true;
        setCookie('themeDark', 'true', 365);
        document.querySelector('body').classList.add('dk')
        styleSheet.removeAttribute('disabled');
    }
    else if (getCookie('themeDark') === 'false') {
        themeSelector.checked = false;
        setCookie('themeDark', 'false', 365);
        document.querySelector('body').classList.remove('dk')
        styleSheet.setAttribute('disabled', 'disabled');
    }
})
$(window).resize(function () {
    windowsize = window.innerWidth;
    // $('h6').text(windowsize)
})