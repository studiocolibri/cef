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
    switch (this.value) {
        case "Service juridique" :
            formJuridiqueContainer.classList.add('visible');
            break;
        case "Demande d'animation" :
            formAnimationContainer.classList.add('visible');
            break;
        case "Locales & Régionales" :
            formLocalesRegionalesContainer.classList.add('visible');
            break;
        case "Demande de stage" :
            formStagesContainer.classList.add('visible');
            break;
    }
    if (this.value == "") {
        formSubmit.classList.remove('visible');
    } else {
        formSubmit.classList.add('visible');
    }
}

formSubjects.addEventListener('change', subjectsHook);