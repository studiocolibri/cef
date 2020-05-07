const formSubjects = document.getElementById('form__subjects');
const formSubmit = document.getElementById('form__submit');
const formJuridiqueContainer = document.getElementById('juridique-container');
const formAnimationContainer = document.getElementById('animation-container');
const formLocalesRegionalesContainer = document.getElementById('locales-regionales-container');
const formStagesContainer = document.getElementById('stages-container');
const formSubcontainers = document.querySelectorAll('.form__subcontent');

function subjectsHook() {
    for (let i=0; i<formSubcontainers.length; i++) {
        formSubcontainers[i].classList.remove('visible');
    }
    switch (formSubjects.value) {
        case "1" :
            formJuridiqueContainer.classList.add('visible');
            break;
        case "2" :
            formAnimationContainer.classList.add('visible');
            break;
        case "3" :
            formLocalesRegionalesContainer.classList.add('visible');
            break;
        case "4" :
            formStagesContainer.classList.add('visible');
            break;
    }
    if (formSubjects.value == "0") {
        formSubmit.classList.remove('visible');
    } else {
        formSubmit.classList.add('visible');
    }
}

formSubjects.addEventListener('change', subjectsHook);