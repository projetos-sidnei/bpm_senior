//Inicialização da API do workflow
this.workflowCockpit = workflowCockpit({
  init: _onLoadData,
  onSubmit: _saveData,
  onError: _rollback,
});

function _onLoadData(data, info) {
  info.getUserData()
    .then(function (user) {
      // console.log(user.fullname);
      getElement('nomAva').value = user.fullname;
      getElement('nomAva').disable = true;
    }).then(function () {
      info.getPlatformData().then(function (platformData) {
        // console.log('plat:', platformData);
      });
    });

  info.getInfoFromProcessVariables().then(function (data) {
    if (!info.isRequestNew() && Array.isArray(data)) {
      data.map((item) => {
        console.log(item);
        if (item.type === 'Boolean' && item.value === 'true') {
          getElement(item.key).checked = item.value;
        } 
        getElement(item.key).value = (typeof item.value === 'undefined' ? '' : item.value);
        
      });
    }
  });
};

function _saveData(data) {
  /**
   * Validação campos de inputs
   */
  if (!isFormValidSelect()) {
    getElement('nomFil').setAttribute("class", "form-control is-invalid");
    throw new Error("Precisa selecionar algum item do campo UNIDADE/LOJA.");
  } else if (!isFormValidText()) {
    getDynamicElement('input').map(input => {
      if (input.type === 'text' && input.id != 'nomAva') {
        if (isEmpty(input.value)) {
          getElement(input.id).setAttribute("class", "form-control is-invalid");
          throw new Error("Esse campo precisa ser preenchido");
        }
      }
    });
  } else if (!isFormCheckbox()) {
    getElement('idCHKAV01').setAttribute("class", "form-check-input is-invalid");
    throw new Error("Esse campo precisa ser preenchido");
  };

  /**
   * Adiciona as informações em um objeto variável newData para
   * permitir a consistência no banco SeniorX
   */
  let newData = {};
  let nomFil = getElement('nomFil');
  let dateCur = getElement('dateCur');
  let idCHKAV01 = getElement('idCHKAV01');

  console.log('dt:', dateCur.value);
  newData.dateCur = dateCur.value;

  newData.nomFil = nomFil.options[nomFil.selectedIndex].value;
  newData.idCHKAV01 = idCHKAV01.checked;

  var inputText = getDynamicElement('input').filter(input => input.type === 'text');
  var inputRadio = getDynamicElement('input').filter(input => input.type === 'radio');
  var inputTextarea = getDynamicElement('textarea');
  //Coleta as informações digitas nos inputs text
  inputText.forEach(input => {
    newData[input.id] = input.value;
  });
  //Coleta as informações digitas nos inputs checkbox
  inputRadio.forEach(input => {
    newData[input.id] = input.checked;
  });
  //Coleta as informações digitas nos textareas
  inputTextarea.forEach(input => {
    newData[input.id] = input.value;
  });

  console.log('new:', newData);
  return {
    formData: newData,
  }
};

function _rollback() {

};

/**
 * Função para validar se os TextFields foram preenchidos
 * @returns isTextValid: true or false
 */

function isFormCheckbox() {
  return getElement('idCHKAV01').checked;
}

/**
 * Função para validar se os TextFields foram preenchidos
 * @returns isTextValid: true or false
 */
function isFormValidText() {
  var isTextValid;
  getDynamicElement('input').map(input => {
    if (input.type === 'text' && input.id != 'nomAva') {
      if (isEmpty(input.value)) return isTextValid = false;
      return isTextValid = true;
    }
  });
  return isTextValid;
}
/**
 * Função para validar se algum item do campo Select foi preenchido
 * @returns isSelected: true or false
 */
function isFormValidSelect() {
  var isSelected;
  getDynamicElement('select').map(input => {
    if (input.id === 'nomFil') {
      if (isEmpty(input.options[input.selectedIndex].value)) return isSelected = false;
      return isSelected = true;
    }
  });
  return isSelected;
}


