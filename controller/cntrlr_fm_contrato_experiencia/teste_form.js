function _saveDataTeste() {
 
  getDynamicElement().forEach((input) => {
    if (!isFormValid()) {
      if (input.id.includes('idCHK')) {
        console.log('SV:', input.id);
        getElement(input.id).setAttribute("class", "form-check-input is-invalid");
        throw new Error("Os dados informados não são válidos.");
      }
    }
    // console.log(input.id);
  });

  // console.log(getDynamicElement());
  
}

function isFormValid() {
  var input = getDynamicElement().filter(input => input.id.includes('idCHK'));
  input.forEach((input) => {
    const isChecked = getElement(input.id).checked;
    return isChecked;
  });
}