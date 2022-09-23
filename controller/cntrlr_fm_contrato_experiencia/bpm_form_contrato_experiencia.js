//Inicialização da API do workflow
this.workflowCockpit = workflowCockpit({
  init: _onLoadData,
  onSubmit: _saveData,
  onError: _rollback,
});

function _onLoadData(data, info) {
  setDefaultCheckbox('checked');
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
        if (item.type === 'Boolean' && item.value === 'true') {

          if (item.key != 'idCHKSI01' && item.key != 'idCHKRH01') {
            setDefaultCheckbox('noChecked');
            getElement(item.key).setAttribute("class", "form-check-input is-valid");
            getElement(item.key).checked = item.value;
          } else {
            getElement(item.key).setAttribute("class", "form-check-input is-valid");
            getElement(item.key).checked = item.value;
          }

        } else {
          getElement(item.key).value = (typeof item.value === 'undefined' ? '' : item.value);
        }
      });
    }
  });
};

function _saveData(data) {
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

  }

  /**
   * Adiciona as informações em um objeto váriavel newData para
   * permitir a consistência no banco SeniorX
   */
  let newData = {};
  let nomFil = getElement('nomFil');
  let dateCur = getElement('dateCur');

  console.log('dt:', dateCur.value);
  newData.dateCur = dateCur.value;

  newData.nomFil = nomFil.options[nomFil.selectedIndex].value;
  var inputText = getDynamicElement('input').filter(input => input.type === 'text');
  var inputCheckbox = getDynamicElement('input').filter(input => input.type === 'checkbox');
  var inputTextarea = getDynamicElement('textarea');
  //Coleta as informações digitas nos inputs text
  inputText.forEach(input => {
    newData[input.id] = input.value;
  });
  //Coleta as informações digitas nos inputs checkbox
  inputCheckbox.forEach(input => {
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
 * Função para validar se os Checkbosx foram selecionados
 * @returns isChecked: true or false
 */
function isFormValidCheck() {
  var isChecked;
  getDynamicElement('input').map(input => {

  });
  return isChecked;
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
 * Função para validar se alugm item do campo Select foi preenchido
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


