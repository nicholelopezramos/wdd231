document.querySelectorAll('.card a').forEach(function (cardLink) {
    cardLink.addEventListener('click', function (e) {
        e.preventDefault();
        var modalId = e.target.getAttribute('data-modal');
        var modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        modal.setAttribute('aria-hidden', 'false');
        modal.querySelector('.modal-content').focus();
    });
});

document.querySelectorAll('.close-btn').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', function () {
        var modal = closeBtn.closest('.modal');
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
        document.querySelector('.cards-container').focus();
    });
});

// Close modal when pressing Esc key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(function (modal) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
        });
    }
});
