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

/*********************
::::INPUTS ADDRESS::::
**********************/

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

    /*int_map = setInterval(function () {
        //console.log('interval')
        if ($('#map-canvas').length > 0) {
            //console.log('mapa')
            setTimeout(() => {
                if ($('.box-delivery input[name="neighborhood"][type="hidden"]').length > 0) {
                    //console.log('gol')
                    let depa = $('.box-delivery input[name="state"][type="hidden"]').val(),
                        prov = $('.box-delivery input[name="city"][type="hidden"]').val(),
                        html_select = ''
                    //console.log(depa)
                    //console.log(prov)
                    if (depa.toLowerCase() === 'lima' && prov.toLowerCase() === 'lima') {
                        html_select = '<p class="ship-neighborhood input text"><label for="ship-neighborhood"><span data-i18n="shipping.addressForm.district">Distrito</span> <span class="item-required">*</span></label><select id="ship-neighborhood" class="input-xlarge error" name="neighborhood" data-parsley-trigger="change blur" data-parsley-required="true" data-based-city-change="true" data-parsley-id="1404"><option></option><option value="Lima">Lima</option><option value="Ancon">Ancon</option><option value="Ate">Ate</option><option value="Barranco">Barranco</option><option value="Breña">Breña</option><option value="Carabayllo">Carabayllo</option><option value="Chaclacayo">Chaclacayo</option><option value="Chorrillos">Chorrillos</option><option value="Cieneguilla">Cieneguilla</option><option value="Comas">Comas</option><option value="El Agustino">El Agustino</option><option value="Independencia">Independencia</option><option value="Jesus Maria">Jesus Maria</option><option value="La Molina">La Molina</option><option value="La Victoria">La Victoria</option><option value="Lince">Lince</option><option value="Los Olivos">Los Olivos</option><option value="Lurigancho">Lurigancho</option><option value="Lurin">Lurin</option><option value="Magdalena Del Mar">Magdalena Del Mar</option><option value="Miraflores">Miraflores</option><option value="Pachacamac">Pachacamac</option><option value="Pucusana">Pucusana</option><option value="Pueblo Libre">Pueblo Libre</option><option value="Puente Piedra">Puente Piedra</option><option value="Punta Hermosa">Punta Hermosa</option><option value="Punta Negra">Punta Negra</option><option value="Rimac">Rimac</option><option value="San Bartolo">San Bartolo</option><option value="San Borja">San Borja</option><option value="San Isidro">San Isidro</option><option value="San Juan De Lurigancho">San Juan De Lurigancho</option><option value="San Juan De Miraflores">San Juan De Miraflores</option><option value="San Luis">San Luis</option><option value="San Martin De Porres">San Martin De Porres</option><option value="San Miguel">San Miguel</option><option value="Santa Anita">Santa Anita</option><option value="Santa Maria Del Mar">Santa Maria Del Mar</option><option value="Santa Rosa">Santa Rosa</option><option value="Santiago De Surco">Santiago De Surco</option><option value="Surquillo">Surquillo</option><option value="Villa El Salvador">Villa El Salvador</option><option value="Villa Maria Del Triunfo">Villa Maria Del Triunfo</option></select></p>'
                        $('.box-delivery input[name="neighborhood"][type="hidden"]').after(html_select)
                        $('.box-delivery input[name="neighborhood"][type="hidden"]').remove()
                    } else if (depa.toLowerCase() === 'callao' && prov.toLowerCase() === 'callao') {
                        html_select = '<p class="ship-neighborhood input text"><label for="ship-neighborhood"><span data-i18n="shipping.addressForm.district">Distrito</span> <span class="item-required">*</span></label><select id="ship-neighborhood" class="input-xlarge error" name="neighborhood" data-parsley-trigger="change blur" data-parsley-required="true" data-based-city-change="true" data-parsley-id="7896"><option></option><option value="Bellavista">Bellavista</option><option value="Callao">Callao</option><option value="Carmen De La Legua Reynoso">Carmen De La Legua Reynoso</option><option value="La Perla">La Perla</option><option value="La Punta">La Punta</option><option value="Ventanilla">Ventanilla</option></select></p>'
                        $('.box-delivery input[name="neighborhood"][type="hidden"]').after(html_select)
                        $('.box-delivery input[name="neighborhood"][type="hidden"]').remove()
                    }
                }
                clearInterval(int_map)
            }, 1000)            
        }
    }, 500)*/
}

function other_address() {
    int_other_address = setInterval(function () {
        if ($('.search-another-address-btn').length > 0) {
            $('.search-another-address-btn').click(function() {
                control_inputs()
                other_address()
            })
            clearInterval(int_other_address)
        }
    }, 500)
}

function change_district() {
    int_district_select = setInterval(function () {
        if ($('#ship-neighborhood').length > 0) {    
            $('#ship-neighborhood').on('change', '', function (e) {
                setTimeout(() => {
                    other_address()
                }, 2000)
            })    
            clearInterval(int_district_select)
        }
    }, 500)
}

window.addEventListener('popstate', function() {
    if (/shipping/i.test(window.location.href)) {
        control_inputs()
        other_address()
        change_district()
    }
})

/*--------------------------------------------------------------------------------------------------------------------*/

/******************
::::INPUTS NAME::::
*******************/

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

function control_phone() {
    int_phone = setInterval(function () {
        if ($('#client-phone').length > 0) {
            // lenght limit
            $('#client-phone').attr('maxlength','9')
            $('#client-phone').attr('minlength','9')

            $('body').find('#client-phone').on('input', function(e) {
                let current_key = $(e.target).val()
                // only numbers
                if (current_key[0] !== '9') {
                    $(e.target).val('')
                } else {                    
                    $(e.target).val(current_key.replace(/[^0-9.]/g, ''))
                }                
            })
            clearInterval(int_phone)
        }
    }, 500)
}

function control_document() {
    int_document = setInterval(function () {
        if ($('#client-document').length > 0) {
            // lenght limit
            $('#client-document').attr('maxlength','8')
            $('#client-document').attr('minlength','8')

            $('body').find('#client-document').on('input', function(e) {
                // only numbers
                let current_key = $(e.target).val()
                $(e.target).val(current_key.replace(/[^0-9.]/g, ''))
            })
            clearInterval(int_document)
        }
    }, 500)
}

function control_ruc() {
    int_ruc = setInterval(function () {
        if ($('#client-company-document').length > 0) {
            // lenght limit
            $('#client-company-document').attr('maxlength','11')
            $('#client-company-document').attr('minlength','11')

            $('body').find('#client-company-document').on('input', function(e) {
                let current_key = $(e.target).val()
                // only numbers
                if (current_key[0] !== '1') {
                    $(e.target).val('')
                } else {                    
                    $(e.target).val(current_key.replace(/[^0-9.]/g, ''))
                }
            })
            clearInterval(int_ruc)
        }
    }, 500)
}

function control_edit_name() {
    int_edit_name = setInterval(function () {
        if ($('#edit-profile-data').length > 0) {
            $('#edit-profile-data').click(function() {
                control_inputs_names()
                control_phone()
                control_document()
                control_ruc()
            })
            clearInterval(int_edit_name)
        }
    }, 500)
}

control_inputs_names()
control_phone()
control_document()
control_ruc()
control_edit_name()