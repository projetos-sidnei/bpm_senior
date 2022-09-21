//Inicialização da API do workflow
this.workflowCockpit = workflowCockpit({
  init: _onLoadData,
  onSubmit: _saveData,
  onError: _rollback,
});

function _onLoadData(data, info) {
  // console.dir('d:', data.loadContext);
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
      var map = new Map();

      for (let i = 0; i < data.length; i++) {
        map.set(data[i].key, data[i].value);
      }
      console.log('map:', map);
      const nomFil = map.get('nomFil');
      const nomAva = map.get('nomAva');

      getElement('nomFil').value = nomFil;
      getElement('nomAva').value = nomAva;

      getDynamicElement('input').forEach(input => {
        if (input.id != 'nomAva') {
          let inputValue = map.get(input.id);
          getElement(input.id).value = inputValue;
        }
      });

      getDynamicElement('textarea').forEach(input => {
        let inputValue = map.get(input.id);
        getElement(input.id).value = inputValue;
      });
      // console.log(input);
    }
  });
};

function _saveData(data) {
  isValidar();

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
    newData.input.id = getElement(input.id).value;
  });
  //Coleta as informações digitas nos inputs checkbox
  inputCheckbox.forEach(input => {
    newData.input.id = getElement(input.id).checked;
  });
  //Coleta as informações digitas nos textareas
  inputTextarea.forEach(input => {
    newData.input.id = getElement(input.id).value;
  });

  console.log('new:', newData);
  return {
    formData: newData,
  }
};

function _rollback() {

};

function isFormValidCheck() {
  var isValid = false;
  getDynamicElement('input').map(input => {

    if (input.type === 'checkbox') {
      // console.log('ck:', input.id);
      if (input.id != 'idCHKSI01' &&
        input.id != 'idCHKSI02' &&
        input.id != 'idCHKRH01' &&
        input.id != 'idCHKRH02' &&
        input.id != 'idCHKRH03') {
        console.log('id:', input.id, ' - ', input.checked);
        isValid = { 'id': input.id, 'checked': input.checked };
      }
    }




    // if (input.id === 'idCHKAV01') {

    // }
    // else {
    //   isValid = input.checked;
    // }
  });
  // console.log(isValid);
  return isValid;
};

function isValidar() {
  var checkSelected = false;
  getDynamicElement('input').forEach(input => {

    if (input.type === 'checkbox' && input.checked) {

      if (input.id != 'idCHKRH01' && input.id != 'idCHKSI01') {
        console.log('inp1:', input.id, ' - ', input.checked);
        if (input.id === 'idCHKAV01') {
          console.log('inp2:', input.id, ' - ', input.checked);
          if (input.checked) {
            alert('Clicou');
          } 
          // checkSelected = false;
        } else if(input.id != 'idCHKAV01') {
          alert('Outro Clicou');
          // checkSelected = true;
        } else {
          alert('Outro N Clicou');
        }
      }





    }
  });
  // if (!checkSelected) {
  //   alert('Não Clicou');
  //   getDynamicElement('input').forEach(input => {
  //     if (input.type === 'checkbox' && input.id != 'idCHKSI01' &&
  //       input.id != 'idCHKSI02' &&
  //       input.id != 'idCHKRH01' &&
  //       input.id != 'idCHKRH02' &&
  //       input.id != 'idCHKRH03') {
  //       getElement(input.id).setAttribute("class", "form-check-input is-invalid");
  //       throw new Error("Os dados informados não são válidos.");
  //     }
  //     // else if (input.type === 'checkbox' && input.id.includes('idCHKACT')) {
  //     //   getElement(input.id).setAttribute("class", "form-check-input is-invalid");
  //     //   throw new Error("Os dados informados não são válidos.");
  //     // }
  //   });
  //   return false;
  // } else {
  //   return true;
  // }
}

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


