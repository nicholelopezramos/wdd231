document.querySelectorAll('.card a').forEach(function (cardLink) {
    cardLink.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = e.currentTarget.getAttribute('data-modal'); 
        var modal = document.getElementById(modalId);

        if (modal) {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');

            modal.dataset.previousFocus = document.activeElement;

            modal.querySelector('.modal-content').focus();
        }
    });
});

document.querySelectorAll('.close-btn').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        var modal = closeBtn.closest('.modal');
        if (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');

            var previousFocus = modal.dataset.previousFocus;
            if (previousFocus) {
                previousFocus.focus();
            }
        }
    });
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(function (modal) {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');

                var previousFocus = modal.dataset.previousFocus;
                if (previousFocus) {
                    previousFocus.focus();
                }
            }
        });
    }
});
