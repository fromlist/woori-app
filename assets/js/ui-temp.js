// pub
let windowsize = window.innerWidth;
var current_path = window.location.pathname;
var localhost = window.location.href;

$(document).ready(function () {
    vsCode = "vscode:///Users/finenuts/Desktop/woori/"; //source file 경로
    var vsCodeHref = '<a class="vscodepath" href=' + '"' + vsCode + current_path + '"></a>';
    $('body').after(vsCodeHref);

})
