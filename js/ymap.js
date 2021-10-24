'use strict';
ymaps.ready(init);

function moveApartment(e){
    let element = document.querySelectorAll(`.rc-flat[data-id="${e}"]`)[0];
    
    element.scrollIntoView({
        block: "center",
        behavior: "smooth"
    });

    element.style.transitionDuration =  "400ms";
    element.style.boxShadow = "0 0 25px #c6ccd2";
    
    setTimeout(() => {
        element.style.boxShadow = "none";
    }, 2000);
};

function init() {

    let map = new ymaps.Map('map', {
        center: [44.70742978523055,37.705814666259755],
        zoom: 11,
        controls: ['searchControl', 'trafficControl', 'typeSelector','fullscreenControl', 'zoomControl', 'rulerControl', 'routeButtonControl'],
        suppressMapOpenBlock: true
    });

    if (screen.width <= 768) {
        map.behaviors.disable('drag');
    }
    map.behaviors.disable('scrollZoom');

    //Ожидание пока переменные создаються, иначе в редких случаях маркеров не будет
    let intervalCheck = setInterval (() => {
        let verifiable = document.getElementsByClassName('rc-flat__price__value');
        if(verifiable.length != 0){
            createPlacemark();
            clearInterval(intervalCheck);
        };
    }, 500);

    // перемещение к квартире
    

    function createPlacemark () {
        let roomsAndPlaces = document.getElementsByClassName('rc-flat__info');
        let addresses = document.getElementsByClassName('rc-flat__info__adress');
        let prices = document.getElementsByClassName('rc-flat__price__value');
        let links = document.getElementsByClassName('rc-flat');

        for (let i = 0; i < addresses.length; i++) {

            let link  = links[i].getAttribute('data-id');
            let room = roomsAndPlaces[i].textContent.split(':')[1];
            let places = roomsAndPlaces[i].textContent.split(':')[2];
    
            ymaps.geocode(addresses[i].textContent).then(function (res) {
                var coord = res.geoObjects.get(0).geometry.getCoordinates();
                var placemark = new ymaps.Placemark(coord, {
                    balloonContentHeader: prices[i].textContent + "&#8381 в сутки",
                    balloonContentBody: 
                    "Комнат: " + room.match(/\d+/)[0] + "<br/>" + 
                    "Спальных мест: " + places.substring(0, places.length - 4) + '<br/>' +
                    `<a onclick="moveApartment(${link})" style="font-weight:600; text-decoration:underline; cursor: pointer;">Перейти к квартире</a>`,
                    balloonContentFooter: addresses[i].textContent,
                    hintContent: addresses[i].textContent
                });
                map.geoObjects.add(placemark);
            });
        };
    };
};
