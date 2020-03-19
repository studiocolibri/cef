var observer = new IntersectionObserver(function(entries) {
    // no intersection with screen
    if(entries[0].intersectionRatio === 0)
        document.body.classList.add("sticky-nav");
    // fully intersects with screen
    else if(entries[0].intersectionRatio === 1)
        document.body.classList.remove("sticky-nav");
}, { threshold: [0,1] });

observer.observe(document.querySelector("#sticky-nav-marker"));