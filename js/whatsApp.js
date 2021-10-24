window.onload = function (e) {
    let errorCode = 0;
    let whatsApp = "#whatsApp";

    // let uId = document.querySelector(whatsApp).getAttribute("data-uw-id") || document.querySelector(whatsApp).getAttribute("uw-id");
    let phone = document.querySelector(whatsApp).getAttribute("data-uw-phone") || document.querySelector(whatsApp).getAttribute("uw-phone");
    let locationWidget = document.querySelector(whatsApp).getAttribute("uw-location");

    if (phone.length != 11) {
        errorCode == 3;
    }
    if (errorCode == 0) {
        let headObj = document.getElementsByTagName('head')[0];
        let linkObj = document.createElement('link');
        linkObj.setAttribute('rel', 'stylesheet');
        linkObj.setAttribute('type', 'text/css');
        linkObj.setAttribute('href', '/css/whatsapp.css');
        headObj.append(linkObj);
        let bodyObj = document.getElementsByTagName('body')[0];
        let aObj = document.createElement('a');
        aObj.innerHTML = 'Нажмите для связи<span>через WhatsApp</span>';
        aObj.setAttribute('href', 'https://wa.me/' + phone);
        aObj.setAttribute('target', '_blank');
        aObj.setAttribute('class', 'uw-whatsapp ' + locationWidget);
        bodyObj.append(aObj);
    } else {
        // console.log('UW error code is ' + errorCode.toString());
        // Раском = вывод ошибок
    }
};

function UwWhatsappClose() {
    waObj = document.getElementsByClassName('uw-whatsapp')[0];
    waObj.style.display = 'none';
}