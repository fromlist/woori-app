$(document).ready(function () {
    $('.left .header-btn').on('click', function () {
        window.location.href = '/html'
        console.log(window.location.href)
    })
    const scrollWrap = document.querySelector('.table-col.overflow-visible');
    if (scrollWrap != null) {
        scrollWrap.addEventListener('scroll', () => {
            const scrollPosition = scrollWrap.scrollLeft;
            if (scrollWrap.scrollWidth <= scrollPosition + scrollWrap.offsetWidth) {
                scrollWrap.classList.add('scroll-end')
            } else {
                scrollWrap.classList.remove('scroll-end')

            }
        }, false)
    }
});
