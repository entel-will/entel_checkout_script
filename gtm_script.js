/*--------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- */
/* -------------------------------------- */
/* ------------ STEP PROFILE ------------ */
/* -------------------------------------- */
/* -------------------------------------- */

/*--------------------------------------------------------------------------------------------------------------------*/
var array_1 = ['client-email', 'client-first-name', 'client-appat', 'client-apmat', 'client-document', 'client-phone']
var array_2 = ['client-company-name', 'client-company-document']

var loopArray1
var loopArray2

function myStartloopArray1() {
    loopArray1 = setInterval(function(){
        validateIpunts(array_1)
    }, 500)
}

function myStartloopArray2() {
    loopArray2 = setInterval(function(){
        validateIpunts(array_1.concat(array_2))
    }, 500)
}

window.addEventListener('popstate', function() {
    if (/profile/i.test(window.location.href)) {
        // setting disable to button
        myStartloopArray1()
    }
})

document.querySelector('.box-client-info-pj .links').addEventListener('click', function(event) {
    if ((document.querySelectorAll('#is-corporate-client')[0].style.display === 'none') === true ) {
        //
        clearInterval(loopArray1)
        myStartloopArray2()
    } else {
        // 
        //validateIpunts(array_1)
        clearInterval(loopArray2)
        myStartloopArray1()

        for (var i = 0; i < array_2.length; i++ ) {
            document.querySelector('#' + array_2[i]).value = ''
            document.querySelector('#' + array_2[i]).classList.remove('success')
        }
    }
})

// Validate inputs
function validateIpunts (array) {
    if (validateInputsClass(array)) {
        document.getElementById('go-to-shipping').disabled = false
    } else {
        document.getElementById('go-to-shipping').disabled = true
    }
}

// function to validate inputs class
function validateInputsClass (array) {
    var flag = true
    if (true) {
        for (var i = 0; i < array.length; i++) {
            var className = document.querySelector('#' + array[i]).getAttribute('class')
            if (className.indexOf('success') < 0) {
                flag = false
            }
        }
    }

    return flag
}
/*--------------------------------------------------------------------------------------------------------------------*/

/* --------------------------------------- */
/* --------------------------------------- */
/* ------------ STEP SHIPPING ------------ */
/* --------------------------------------- */
/* --------------------------------------- */

/*--------------------------------------------------------------------------------------------------------------------*/
// event to measure pop-up impressions 'outside the delivery zone'
var interval_fuera_zona_delivery = setInterval(function() {
    var modal_error_zona_delivery = document.querySelectorAll('.unavailable-message-modal')
    if (modal_error_zona_delivery.length) {
        if (modal_error_zona_delivery[0].style.display != 'none') {
            clearInterval(interval_fuera_zona_delivery)

            var inputState = document.querySelectorAll('input[name=state][type=hidden]'),
                inputCity = document.querySelectorAll('input[name=city][type=hidden]'),
                inputNeighborhood = document.querySelectorAll('input[name=neighborhood][type=hidden]'),
                inputStreet = document.querySelectorAll('input[name=street][type=hidden]'),
                direccionState = inputState.length ? inputState[0].value : '',
                direccionCity = inputCity.length ? inputCity[0].value : '',
                direccionNeighborhood = inputNeighborhood.length ? inputNeighborhood[0].value : '',
                direccionStreet = inputStreet.length ? inputStreet[0].value : '',
                direccionFinal = direccionState + ' - ' + direccionCity + ' - ' + direccionNeighborhood + ' - ' + direccionStreet,        
                dataLayer = window.dataLayer || []

            dataLayer.push({
                'event': 'fuera_zona_delivery',
                'direccion': direccionFinal
            })
      }
    }
}, 500)
/*--------------------------------------------------------------------------------------------------------------------*/
// add steps popup html
window.addEventListener('popstate', function() {
    if (/shipping/i.test(window.location.href)) {
        setTimeout(function(){
            var _body = document.querySelector('body'),
                container = document.createElement('div'),
                overlay = document.createElement('div'),
                h5 = document.createElement('h5'),
                ul = document.createElement('ul'),
                li1 = document.createElement('li'),
                li2 = document.createElement('li'),
                li3 = document.createElement('li'),
                picture = document.createElement('picture'),
                source1 = document.createElement('source'),
                source2 = document.createElement('source'),
                img = document.createElement('img'),
                a = document.createElement('a')

            container.setAttribute('class','step-popup')
            overlay.setAttribute('class','popup-overlay')
            _body.appendChild(container)
            _body.appendChild(overlay)
            container.appendChild(h5)
            container.appendChild(ul)    
            ul.appendChild(li1)
            ul.appendChild(li2)
            ul.appendChild(li3)
            container.appendChild(picture)
            picture.appendChild(source1)
            picture.appendChild(source2)
            picture.appendChild(img)
            container.appendChild(a)
            h5.appendChild(document.createTextNode('Para poder ubicar tu dirección, sigue estos pasos:'))
            li1.appendChild(document.createTextNode('Ingresa solo el nombre de la calle, avenida o jirón.'))
            li2.appendChild(document.createTextNode('Recuerda en agregar tu número y distrito.'))
            li3.appendChild(document.createTextNode('Finalmente, ubica y selecciona tu dirección en la lista.'))
            source1.setAttribute('media','(min-width: 650px)')
            source1.setAttribute('srcset','/arquivos/step-popup-img-desktop.jpg')
            source2.setAttribute('media','(min-width: 465px)')
            source2.setAttribute('srcset','/arquivos/step-popup-img-desktop.jpg')
            img.setAttribute('src','/arquivos/step-popup-img.jpg')
            a.setAttribute('href','javascript:void(0)')
            a.appendChild(document.createTextNode('Entendido'))

            // elements to click to open steps popup
            build_Step_Open_Pop_Up_Button ()
        }, 500)
    }    
})

function build_Step_Open_Pop_Up_Button () {
    // remove this element if it exists
    if(document.querySelector('#gtm-label-shipping p')){
        document.querySelector('#gtm-label-shipping p').remove()
    }

    var content_click_to_open_popup = document.querySelectorAll("#gtm-label-shipping")[0],
        content_click_to_open_popup_p = document.createElement('p'),
        content_click_to_open_popup_p_a = document.createElement('a')

    content_click_to_open_popup.appendChild(content_click_to_open_popup_p)
    content_click_to_open_popup_p.setAttribute('class','btn-dir-here')
    content_click_to_open_popup_p.appendChild(document.createTextNode('Si no encuentras tu dirección, ingresa '))
    content_click_to_open_popup_p.appendChild(content_click_to_open_popup_p_a)
    content_click_to_open_popup_p_a.setAttribute('href','javascript:void(0)')
    content_click_to_open_popup_p_a.appendChild(document.createTextNode('aquí'))

    // events to open steps popup
    document.querySelector('.btn-dir-here a').addEventListener("click", function() {
        document.querySelector('.step-popup').classList.add("active")
        document.querySelector('.popup-overlay').classList.add("active")
    })

    document.querySelector('.step-popup a').addEventListener("click", function() {
        document.querySelector('.step-popup').classList.remove("active")
        document.querySelector('.popup-overlay').classList.remove("active")
    })

    document.querySelector('.popup-overlay').addEventListener("click", function() {
        document.querySelector('.step-popup').classList.remove("active")
        document.querySelector('.popup-overlay').classList.remove("active")
    })
}
/*--------------------------------------------------------------------------------------------------------------------*/

/* verificar modal error pago tarjeta */
var interval_modalerrorpago = setInterval(function() {
    if (document.querySelectorAll(".payment-unauthorized-modal").length) {
        if (document.querySelectorAll(".payment-unauthorized-modal")[0].style.display == "block") {
            clearInterval(interval_modalerrorpago)
            var dataLayer = window.dataLayer || []
            dataLayer.push({
                'event': 'event.modalErrorPago',
                'eventLabel': document.querySelectorAll(".payment-unauthorized-message3 small")[0].textContent
            })
        }
    }
}, 100)

/*--------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- */
/* -------------------------------------- */
/* ---------- RECOJO EN TIENDA ---------- */
/* -------------------------------------- */
/* -------------------------------------- */

/*--------------------------------------------------------------------------------------------------------------------*/

/*let intervalVar,
    stringPickupInStore = '<div class="pickup-in-store-title">O también puedes recoger en tienda</div>'
    + '<p class="pickup-in-store">'
        + '<span class="pickup-in-store__check"></span>'
        + '<img class="icon-store" src="https://enteltest.vteximg.com.br/arquivos/icon-pick-up-in-store.png" alt="Recojo en tienda - Entel" />'
        + '<span class="pickup-in-store__title"><b>Recojo en tienda Jockey Plaza GRATIS</b></span>'
        + '<span class="pickup-in-store__schedule"><b>Atención:</b><br>Lunes - Domingo : 10:00am a 10:00pm</span>'
        + '<br>(Tienes 2 días hábiles para recoger tu pedido)'
    + '</p>'

// append html into container
function load_pickap_in_store() {
    intervalVar = setInterval(function () {
        if (window.location.href.indexOf('shipping') > -1 && $('#map-canvas').length > 0) {
            $('body').find('.ship-reference.input.text').after(stringPickupInStore)
    
            // event to activate pickup in store
            $('body').find('.pickup-in-store').click(function() {
                // pickup in store off
                if ($(this).hasClass('active') == true) {
                    $('body').find('#ship-reference').val($('body').find('#ship-reference').val().replace('Retiro en Tienda Jockey - ',''))                    
                    $('body').find('#ship-reference').removeAttr('disabled')
                    $('body').find('.ship-reference.input.text').css('opacity','')
                    $('body').find('.address-shipping-options').css({'opacity':'','position':'','z-index':''})
                // pickup in store on
                } else {
                    $('body').find('#ship-reference').val('Retiro en Tienda Jockey - ' + $('body').find('#ship-reference').val())                    
                    $('body').find('#ship-reference').attr('disabled','disabled')
                    $('body').find('.ship-reference.input.text').css('opacity','0.6')
                    $('body').find('.address-shipping-options').css({'opacity':'0','position':'absolute','z-index':'-1'})                
                }
                $(this).toggleClass('active')
            })
    
            $('body').find('.search-another-address-btn').click(function() {
                load_pickap_in_store()
            })
    
            clearInterval(intervalVar)
        }
    }, 100)
}

load_pickap_in_store()*/

/*--------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- */
/* -------------------------------------- */
/* ---------- CAMPAÑA INTERBANK---------- */
/* -------------------------------------- */
/* -------------------------------------- */

/*--------------------------------------------------------------------------------------------------------------------*/

/*let htmlCampaignString = '<div class="entel-checkout-campaign-container"> <div class="entel-checkout-campaign"> <div class="entel-checkout-campaign__open-close"> <span class="text">Ver más</span> <span class="arrow"></span> </div> <div class="entel-checkout-campaign__title"> <h3> <span>Obtén hasta</span> <span class="desc">40<span><div class="symbol">%</div><div class="type-desc">dscto.</div></span></span> <span>en tus equipos<br>al pagar con tu tarjeta crédito y<br>débito Interbank.</span> </h3> </div> <div class="entel-checkout-campaign__content">Llévatelo en 3 sencillos pasos:</div> <ul class="entel-checkout-campaign__steps"> <li>Llena tus datos de identificación</li> <li>Ingresa la dirección de entrega</li> <li>Ingresa TUS DATOS DE PAGO</li> </ul> <div class="entel-checkout-campaign__minimessage">Recuerda que el descuento se verá<br>reflejado al momento de <span>ingresar los<br>datos de tu tarjeta Interbank</span> </div> <img class="entel-checkout-campaign__main-img" src="https://enteltest.vteximg.com.br/arquivos/image-bar-interbank-v2.png" alt="Obtén hasta 40% de dscto con Interbank"> </div> </div>'

$('body').append(htmlCampaignString)

$('body').find('.entel-checkout-campaign .entel-checkout-campaign__title').hide()
$('body').find('.entel-checkout-campaign .entel-checkout-campaign__content').hide()
$('body').find('.entel-checkout-campaign .entel-checkout-campaign__steps').hide()

$('.entel-checkout-campaign-container').height(98)

$('body').find('.entel-checkout-campaign .entel-checkout-campaign__open-close').click(function() {
    if ($(this).hasClass('active')) {
        // button to open
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__open-close .text').html('Ver más')
        // hidding blocks
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__title').hide()
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__content').hide()
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__steps').hide()
        // setting hight
        $('.entel-checkout-campaign-container').height(98)
    } else {
        // button  to close
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__open-close .text').html('Ocultar')
        // showing blocks
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__title').show()
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__content').show()
        $('body').find('.entel-checkout-campaign .entel-checkout-campaign__steps').show()
        // setting hight
        $('.entel-checkout-campaign-container').height(310)
    }
    $(this).toggleClass('active')
})*/

/*--------------------------------------------------------------------------------------------------------------------*/

/* -------------------------------------- */
/* -------------------------------------- */
/* ------------ INPUT CONTROL ----------- */
/* -------------------------------------- */
/* -------------------------------------- */

/*--------------------------------------------------------------------------------------------------------------------*/

function control_inputs() {
    int_piso = setInterval(function () {
        if ($('#ship-more-info').length > 0) {
            $('#ship-more-info').attr('maxlength','30')
            $('#ship-more-info').attr('data-parsley-maxlength','30')
            clearInterval(int_piso)
        }
    }, 500)

    int_ref = setInterval(function () {
        if ($('#ship-reference').length > 0) {
            $('#ship-reference').attr('maxlength','80')
            $('#ship-reference').attr('data-parsley-maxlength','80')
            clearInterval(int_ref)
        }
    }, 500)
}

function other_address() {
    int_other_address = setInterval(function () {
        if ($('.search-another-address-btn').length > 0) {
            $('.search-another-address-btn').click(function() {
                control_inputs()
            })
            clearInterval(int_other_address)
        }
    }, 500)
}

function edit_address() {
    int_edit_address = setInterval(function () {
        if ($('#edit-shipping-data').length > 0) {
            $('#edit-shipping-data').click(function() {
                other_address()
            })
            clearInterval(int_edit_address)
        }
    }, 500)
}

control_inputs()
other_address()
edit_address()

/*--------------------------------------------------------------------------------------------------------------------*/

function control_inputs_names() {
    int_ape_mat = setInterval(function () {
        if ($('#client-appat').length > 0) {
            $('#client-appat').attr('maxlength','20')
            clearInterval(int_ape_mat)
        }
    }, 500)

    int_ape_pat = setInterval(function () {
        if ($('#client-apmat').length > 0) {
            $('#client-apmat').attr('maxlength','20')
            clearInterval(int_ape_pat)
        }
    }, 500)
}

function control_edit_name() {
    int_edit_name = setInterval(function () {
        if ($('#edit-profile-data').length > 0) {
            $('#edit-profile-data').click(function() {
                control_inputs_names()
            })
            clearInterval(int_edit_name)
        }
    }, 500)
}

control_inputs_names()
control_edit_name()