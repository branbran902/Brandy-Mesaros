const phoneInputField = document.querySelector("#interPhone");

const phoneInput = window.intlTelInput(phoneInputField, {
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

function process(event) {
    event.preventDefault();
    
    const error = document.querySelector("#error");
    const phoneNumber = phoneInput.getNumber();
   
    var phone = document.querySelector("#phone");
    phone.value = phoneNumber;

    const data = new URLSearchParams();
    data.append("phone", phoneNumber);

    fetch("http://phone-number-lookup-8877.twil.io/lookup", {
    method: "POST",
    body: data,
    })
    .then((response) => response.json())
    .then((json) => {
        if (json.success) {
        $('#phoneForm').trigger("submit");
        } else {
        error.style.display = "";
        error.innerHTML = `Invalid phone number.`;
        return false
        }
    })
    .catch((err) => {
        event.preventDefault();
        error.style.display = "";
        error.innerHTML = `Something went wrong: ${err}`;
        return false;
    });
    return false;
   }