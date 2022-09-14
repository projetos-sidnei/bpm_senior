function getDynamicElement() {
  var inputs = document.getElementsByTagName("input"); //("[id^=" + 'idCHK]');
  var idInputs = [];
  for (let i = 0; i < inputs.length; i++){
    idInputs.push(inputs[i]);
  }
  return idInputs;
}