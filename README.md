# Validation

Required jQuery.

##  Using:

 Required attribute [data-check] in the block for the validation element.<br />
 This attribute has 2 parameters.<br />
 Parameters write through the separator '|'.<br />

 1. Type of element for validation ('input' or 'select').<br />
 2. Mode for show error:<br />
    'mode-1': Class 'error-validation' is added for 1.5 seconds.<br />
    'mode-2': Show error message.<br />

 Example attribute [data-check]: data-check="input|mode-1".

 If the element for validation is an input, then we add attribute [data-input-check] to it.<br />
 Parameters for this attribute are optional.
 Parameters write through the separator '|'.
 1. "required" - Field is required.
 2. "number" - Only integer.
 3. "num:5<>12" - Only integer and length 5 - 12.
 2. "mail" - Only email address.
 3. "min:5" - Length min 5.
 4. "max:12" - Length max 12.
 5. "allow:[A-z]" - RegExp.
 6. "phone" - Only phone.
 8. "password_confirmation" - For password confirmation.

 Example attribute [data-input-check]: data-input-check="required|email".

 Example using all validation - index.html
 
