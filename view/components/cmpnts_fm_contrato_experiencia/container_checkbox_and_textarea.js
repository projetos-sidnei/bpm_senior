function createSelectOptions() {

}

function onLoadCheckboxAndTextArea() {
  var section = getElement('id-check-textarea');
  var htmlComponent;
  var htmlCheckbox;
  var htmlTextArea;

  // loadOptions();
  /** SETA OS CHECKBOXS NA SEÇÃO ESPAÇÕ RH PARA MARCADO, ISSO OBRIGA O USUÁRIO
   * A ESCOLHER UMA OPÇÃO OU A PRIMEIRA FICA ATIVADA SEMPRE
   */

  /** CONVERTE A DATA LOCAL EM DATA NO FORMATO YYYY-MM-DD */
  let dtNow = new Date().toISOString().slice(0, 10);
  //BLOQUEIA DATAS ANTERIOS A DATA ATUAL NO CALENDARIO VISIVEL
  getElement('dateCur').setAttribute('min', dtNow);
  //SETA A DATA ATUAL PARA O USUÁRIO
  getElement('dateCur').value = dtNow;

  /**
   * O LOOP VARRE O ARQUIVO DATA NA PASTA MODEL/DATA E GERA OS CHECKBOXS E TEXTAREAS
   * DINAMINCAMENTE.
   */
  dataContratoExperiencia.map((value) => {
    /** CRIA A DIV COM O TITULO E O ICONE DE DUVIDA COM UM TOOLTIP */
    htmlComponent = `  
    <div class="col-md-11">  
      <label class="col-md-11" for="infoForm">
      ${value.title}
      <i data-bs-toggle="tooltip" data-bs-placement="right" title="${value.tooltip}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
        </svg>
      </i>
      </label>
    </div>
    `;
    section.innerHTML += htmlComponent;

    /** CRIA OS CHECKBOXS COM OS VALORES */
    value.checkbox.forEach((item, index) => {
      htmlCheckbox = `
      <div class="col-md-11">
        <div class="form-check mt-1">
          <input class="ml-5 form-check-input" type="checkbox" value="" id="idCHK${value.sigla}${index + 1}">
          <label class="ml-6 form-check-label"  for="idCHK${value.sigla}${index + 1}">
            ${item}
          </label>
          <div class="invalid-feedback">
          Este campo precisa ser preenchido.
        </div>
        </div>
      </div>
    `;
      section.innerHTML += htmlCheckbox;
    });

    /** CRIA OS TEXTSAREAS */
    htmlTextArea = `
     <div class="col-11 mb-5">
      <p class="mt-2 mb-1">Obs:</p>
      <textarea aria-required="false" id="idTXA${value.id}" rows="5" spellcheck="true" lang="pt-br" class="form-control" type="text" ref="input" aria-invalid="false"></textarea>
      </div>
    `;
    section.innerHTML += htmlTextArea;
  });
  validationInputText();
  isCheckBoxChecked();
  eventTextArea();
  validationSelectItem();

}

/** FUNÇÃO PARA VALIDAR SE OS CHECKBOX FORAM MARCADOS */
function isCheckBoxChecked() {
  //FUNÇÃO GETDYNAMICELMENTE RECUPERA O ELMENTE PASSADO NO PARAMETRO
  const checkbox = getDynamicElement('input').filter(input => input.type.includes('checkbox'));
  var isChecked;
  isChecked = checkbox.map((input) => {
    input.onclick = () => {
      input.onchange = function () {
        isChecked = input.checked;
        if (isChecked) {
          console.log(getElementsTxt());
          validationSelectItem();
          input.setAttribute("class", "form-check-input is-valid");
        } else if (input.id === 'idCHKAV1') {
          console.log(getElementsTxt());
          validationSelectItem();
          input.setAttribute("class", "form-check-input is-invalid");
        } else {
          console.log(getElementsTxt());
          input.setAttribute("class", "form-check-input");
        }
        checkboxEqualRadioButton(input);
      }
    };
  });
}


/** ESSA FUNÇÃO VALIDA O FUNCIONAMENTO DOS CHECKBOXS DA SEÇÃO
 * ESPAÇO RH PARA FUNCIONAR IGUAL AO RADIO BUTTON.
 */
function checkboxEqualRadioButton(input) {

  switch (input.id) {
    case 'idCHKSI01':
      if (!input.id.checked) {
        getElement('idCHKSI01').checked = true;
        getElement('idCHKSI01').setAttribute("class", "form-check-input is-valid");
      }
      getElement('idCHKSI02').setAttribute("class", "form-check-input");
      return getElement('idCHKSI02').checked = false;
    case 'idCHKSI02':
      if (!input.id.checked) {
        getElement('idCHKSI02').checked = true;
        getElement('idCHKSI02').setAttribute("class", "form-check-input is-valid");
      }
      getElement('idCHKSI01').setAttribute("class", "form-check-input");
      return getElement('idCHKSI01').checked = false;
    case 'idCHKRH01':
      if (!input.id.checked) {
        getElement('idCHKRH01').checked = true;
        getElement('idCHKRH01').setAttribute("class", "form-check-input is-valid");
      }
      getElement('idCHKRH02').setAttribute("class", "form-check-input");
      getElement('idCHKRH03').setAttribute("class", "form-check-input");
      return (getElement('idCHKRH02').checked = false) || (getElement('idCHKRH03').checked = false);
    case 'idCHKRH02':
      if (!input.id.checked) {
        getElement('idCHKRH02').checked = true;
        getElement('idCHKRH02').setAttribute("class", "form-check-input is-valid");
      }
      getElement('idCHKRH01').setAttribute("class", "form-check-input");
      getElement('idCHKRH03').setAttribute("class", "form-check-input");
      return (getElement('idCHKRH01').checked = false) || (getElement('idCHKRH03').checked = false);
    case 'idCHKRH03':
      if (!input.id.checked || input.value === 'false') {
        getElement('idCHKRH03').checked = true;
        getElement('idCHKRH03').setAttribute("class", "form-check-input is-valid");
      }
      getElement('idCHKRH01').setAttribute("class", "form-check-input");
      getElement('idCHKRH02').setAttribute("class", "form-check-input");
      return (getElement('idCHKRH01').checked = false) || (getElement('idCHKRH02').checked = false);
  }
}
/**
 * VALIDAÇÃO DOS CAMPOS DE TEXTO INFORMAÇÕES GERAIS
 */
function validationInputText() {
  var inputText = getDynamicElement('input').filter(input => input.type === 'text');
  inputText.forEach((element) => {
    getElement(element.id).addEventListener('input', function () {
      if (isEmpty(this.value)) {
        getElement(element.id).setAttribute("class", "form-control is-invalid");
      } else {
        getElement(element.id).setAttribute("class", "form-control");
      }
    });
  });
}

function validationSelectItem() {
  getDynamicElement('select').forEach((select) => {
    getElement(select.id).addEventListener('change', function () {
      if (!isEmpty(this.value)) {
        getElement(select.id).setAttribute("class", "form-control");
      }
    });
  });
}

function eventTextArea() {
  getDynamicElement('textarea').forEach((element) => {
    getElement(element.id).addEventListener('input', function () {
      getTextValue(this.value);
    });
  });
}

function isEmpty(str) {
  // console.log('str:', str);
  return !str.trim().length;
}

function getTextValue(text) {
  return text;
}

/**
 * Função para atribuir para o checkboxs Espaço RH qual foi selecionado.
 * @param {'checked', 'noChecked'} isCheck 
 */
function setDefaultCheckbox(isCheck) {
  if (isCheck === 'checked') {
    getElement('idCHKSI01').checked = true;
    getElement('idCHKSI01').setAttribute("class", "form-check-input is-valid");
    getElement('idCHKRH01').checked = true;
    getElement('idCHKRH01').setAttribute("class", "form-check-input is-valid");
  } else {
    getElement('idCHKSI01').checked = false;
    getElement('idCHKSI01').setAttribute("class", "form-check-input");
    getElement('idCHKRH01').checked = false;
    getElement('idCHKRH01').setAttribute("class", "form-check-input");
  }

}

function getElementsTxt() {
  var isTextValid;
  getDynamicElement('input').map(input => { 
    if (input.type === 'text' && input.id != 'nomAva') {
      console.log('id:',input.id, ' - ', input.value);
      if (isEmpty(input.value)) return isTextValid = false;
      return isTextValid = true;
    }
  });
  return isTextValid;
}