/**
 Validation

 @author Boris Nedovis
 @author borisnedovi@gmail.com

 @license MIT

 Required jQuery.

 Using:

 Required attribute [data-check] in the block for the validation element.
 This attribute has 2 parameters.
 Parameters write through the separator '|'.

 1.Type of element for validation ('input' or 'select').
 2.Mode for show error:
    'mode-1': Class 'error-validation' is added for 1.5 seconds.
    'mode-2': Show error message.

 Example attribute [data-check]: data-check="input|mode-1".

 If the element for validation is an input, then we add attribute [data-input-check] to it.
 Parameters for this attribute are optional.
 Parameters write through the separator '|'.
 1. "required" - Field is required.
 2. "number" - Only integer.
 3. "num:5<>12" - Only integer and length 5 - 12.
 2. "email" - Only email address.
 3. "min:5" - Length min 5.
 4. "max:12" - Length max 12.
 5. "allow:[A-z]" - RegExp.
 6. "phone" - Only phone.
 8. "password_confirmation" - For password confirmation.

 Example attribute [data-input-check]: data-input-check="required|email".

 If you want to add validation in your script, just add:
 if( validation() ) {...code}

 To add automatic validation to the form, add the [data-validation-form] attribute:
 <form action="#" data-validation-form> ... </form>

 Example using all validation - index.html
*/

app = [];

app.elements = [];

app.elements.validation = document.querySelectorAll('[data-check]');

function validation() {
    app.elements.validation.result = true;

    app.elements.validation.forEach(function(element) {
        if(app.elements.validation.result){
            checkElement(element);
        } else {
            return false;
        }
    });

    return app.elements.validation.result;
}

function checkElement(element) {
    $('.validation-msg').remove();

    let
        options = $(element).attr('data-check').split('|'),
        type = options[0],
        mode = options[1];

    if (type === "input") {
        checkInput(element, mode);
    } else if (type === "select") {
        checkSelect(element, mode);
    } else  {
        console.error("Unknown type: " + type);
        console.error(element);
    }
}

function checkInput(element, mode) {
    element = element.children[0];

    app.elements.validation.result =
        !element.getAttribute('data-input-check').split('|').some(function(parameter){

        let
            full_data = parameter.split(':'),
            length = element.value.length,
            object = element.closest('[data-check]');

        switch (full_data[0]) {
            case 'required' :
                if (length === 0) {
                    error(object, mode, 'Field is required.');
                    return true;
                }
                break;
            case 'num' :
                if(!/^\d+$/.test(Number(element.value))) {
                    element.value = element.value.replace(/[^0-9]/g,'');
                    error(object, mode, 'Only integer.');
                    return true;
                }

                let min_max = full_data[1].split('<>');

                if(length < Number(min_max[0])) {
                    error(object, mode, 'Not less than or equal to ' + min_max[0]);
                    return true;
                }
                if(length > Number(min_max[1])) {
                    error(object, mode, 'Not greater than or equal to ' + min_max[1]);
                    return true;
                }
                break;
            case 'number' :
                if(!/^\d+$/.test(Number(element.value))) {
                    element.value = element.value.replace(/[^0-9]/g,'');
                    error(object, mode, 'Only integer');
                    return true;
                } break;
            case 'email' :
                if(!/^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i.test(element.value)) {
                    error(object, mode, 'Invalid email address.');
                    return true;
                }
                break;
            case 'url' :
                if(!/^(http|https|ftp):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.test(element.value)) {
                    error(object, mode, 'Invalid URL');
                    return true;
                }
                break;
            case 'phone' :
                if(!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(element.value)) {
                    error(object, mode, 'Invalid Phone Number.');
                    return true;
                }
                break;
            case 'min' :
                if(length < full_data[1]) {
                    error(object, mode, 'The minimum length of the field is ' + full_data[1] +' characters.');
                    return true;
                } break;
            case 'max' :
                if(length > full_data[1]) {
                    error(object, mode, 'The maximum length of the field is ' + full_data[1] + ' characters.');
                    return true;
                }
                break;
            case 'allow' :
                let r = new RegExp("(?!^ |.* $)^" + full_data[1] + "+$");
                if (!r.test(element.value)) {
                    error(object, mode, 'Invalid character in line, or line starts or ends with a space.');
                    return true;
                }
                break;
            case 'password_confirmation' :
                if($('#new_password_1 input').val() !== $('#new_password_2 input').val()){
                    error($('#new_password_2'), mode, 'Passwords do not match');
                    return true;
                }
        }
    });
}

function checkSelect(element, mode) {
    if($(element).find("select option:selected").val() === "") {
        error(element, mode, 'Please select.');

        app.elements.validation.result = false;
    }
}

$('form[data-validation-form]').submit(function(){
    return validation();
});

$(document).on('keyup change', '[data-check]', function () {
    checkElement(this);
});

function error(element, mode = 'mode-1', msg = null) {
    if(mode === 'mode-1') {
        element = element.children[0];

        $(element).addClass('error-validation');

        setTimeout(function () {
            $(element).removeClass('error-validation');
        }, 1500)
    } else if(mode === 'mode-2') {
       $(element).after('<p class="validation-msg">' + msg + '</p>');
    } else  {
        console.error("Unknown mode: " + mode);
    }
}
