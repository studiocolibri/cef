window.onload = function() {

    // Main nav : keyboard navigation and accessibility
    let navBtn = document.querySelector('.site-nav__button');
    let navCheckbox = document.querySelector('.site-nav__checkbox');
    let navDropDownLink = document.querySelector('.site-nav__dropdown .site-nav__link');
    let navDropDownList = document.querySelector('.site-nav__dropdown__list');

    let openNav = function() {
        navCheckbox.checked = true;
        navBtn.setAttribute('aria-expanded', true);
    }
    let closeNav = function() {
        navCheckbox.checked = false;
        navBtn.setAttribute('aria-expanded', false);
    }
    let toggleNav = function() {
        if (navCheckbox.checked == false) { openNav(); }
        else { closeNav(); }
    };
    navBtn.addEventListener('click', toggleNav);

    // mobile dropdown
    navDropDownLink.addEventListener('click', function(e) {
        e.preventDefault();
        navDropDownList.classList.toggle('opened');
    })

    // aria-expanded  
    navCheckbox.addEventListener('change', function() {
        console.log('test');
        if (navCheckbox.checked == false) { 
            navBtn.setAttribute('aria-expanded', true);
        } else {
            navDropDownList.classList.remove('opened');
            navBtn.setAttribute('aria-expanded', false);
        }
    });
    
    // Escape key => close nav
    document.addEventListener('keydown', function(e) {
        if (e.keyCode == 27) { closeNav(); }
    });
}