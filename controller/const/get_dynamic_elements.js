function getDynamicElement(element) {
  var elements = document.getElementsByTagName(element); //("[id^=" + 'idCHK]');
  var idElements = [];
  for (let i = 0; i < elements.length; i++){
    idElements.push(elements[i]);
  }
  return idElements;
}