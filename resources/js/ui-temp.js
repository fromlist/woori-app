$(document).ready(function () {
    $('.left .header-btn').on('click', function () {
        window.location.href = '/html'
        console.log(window.location.href)
    })
    const scroll = document.querySelector('.table-col.overflow-visible'); // We found the div
    scroll.addEventListener('scroll', () => {
        const scrollPosition = scroll.scrollLeft;
        // We saved the scroll position and check it with console log for any further actions 
        if (scroll.scrollWidth <= scrollPosition + scroll.offsetWidth) {
            scroll.classList.add('scroll-end')
        } else {
            scroll.classList.remove('scroll-end')

        }
    }, false)
});
