const glow = document.querySelector('.cursor-glow');

if (glow) {
    window.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

// Keep the existing fade transition for links to pages on this site.
// External links and download links are left to the browser.
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const url = new URL(this.href, window.location.href);
        const isInternalPage = url.origin === window.location.origin
            && url.pathname.endsWith('.html')
            && !this.hasAttribute('download')
            && !this.target;

        if (!isInternalPage) return;

        e.preventDefault();
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = url.href;
        }, 300);
    });
});
