function onLoadCheckboxAndTextArea() {
  var section = getElement('id-check-textarea');
  var htmlComponent;
  var htmlRadio;
  var htmlTextArea;


  /** CONVERTE A DATA LOCAL EM DATA NO FORMATO YYYY-MM-DD */
  let dtNow = new Date().toISOString().slice(0, 10);
  //BLOQUEIA DATAS ANTERIOR A DATA ATUAL NO CALENDÁRIO.
  getElement('dateCur').setAttribute('min', dtNow);
  //SETA A DATA ATUAL PARA O USUÁRIO
  getElement('dateCur').value = dtNow;

  /**
   * O LOOP VARRE O ARQUIVO DATA NA PASTA MODEL/DATA E GERA OS CHECKBOXS E TEXTAREAS
   * DINAMICAMENTE.
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
    value.radios.forEach((item, index) => {
      htmlRadio = `
      <div class="col-md-11">
        <div class="form-check mt-1">
          <input class="ml-5 form-check-input" type="radio" name="nameRDO${value.sigla}" value="" id="idRDO${value.sigla}${index + 1}">
          <label class="ml-6 form-check-label"  for="idRDO${value.sigla}${index + 1}">
            ${item}
          </label>
          <div class="invalid-feedback">
          Este campo precisa ser preenchido.
        </div>
        </div>
      </div>
    `;
      section.innerHTML += htmlRadio;
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
  isCheckedFirstRadio();
  eventTextArea();
  validationSelectItem();

}

/**
 * FUNÇÃO PARA INICIAR OS PRIMEIROS RADIOS BUTTONS NO FORMULÁRIO
 */
function isCheckedFirstRadio() {
  let indexController = 0;
  var radio = getDynamicElement('input').filter(input => input.type === 'radio');
  for (let i = 0; i < radio.length; i++) {
    /**
     * Elimina os radios buttons que já estão setados na seção RH e Síntese com true, e limita o contador a percorrer todo o array
     * até a última posição do array sem necessidade, assim todos os primeiros radios buttons serão inicializados com true.
     *  */
    if (indexController <= radio.length - 1) {
      radio[indexController].checked = true;
    }
    /**
     * Este contador serve para controlar a posição do item dentro do array, neste sentido os primeiros radios buttons são encontrados 
     * dentro do array, que não caso são, o 0,4,8,12,16,10,24,28,32 e 36, portanto andam de 4 em 4 indices, dentro da estrutura 
     * estabelecida isso pode mudar caso o layout mudar.
     */
    indexController = indexController + 4;
  }

}

/**
 * Validação do campo de checkbox Avaliação
 */
// function validationInputCheckbox() {
//   getElement('idCHKAV01').addEventListener('click', function () { 
//     if (this.checked) return getElement('idCHKAV01').setAttribute("class", "form-check-input");
//     return getElement('idCHKAV01').setAttribute("class", "form-check-input is-invalid");
//   });
// }

/**
 * VALIDAÇÃO DOS CAMPOS DE TEXTO INFORMAÇÕES GERAIS
 */
function validationInputText() {
  var inputText = getDynamicElement('input').filter(input => input.type === 'text');
  inputText.forEach((input) => {
    getElement(input.id).addEventListener('input', function () {
      if (isEmpty(this.value)) {
        getElement(input.id).setAttribute("class", "form-control is-invalid");
      } else {
        getElement(input.id).setAttribute("class", "form-control");
      }
    });
  });
}

/**
 * VALIDAÇÃO DO CAMPO SELECT ITEM PARA FILIAIS
 */
function validationSelectItem() {
  getDynamicElement('select').forEach((select) => {
    getElement(select.id).addEventListener('change', function () {
      if (!isEmpty(this.value)) {
        getElement(select.id).setAttribute("class", "form-control");
      }
    });
  });
}

/**
 * FUNÇÃO PARA EVENTO PARA TESTE DOS TEXTAREAS
 */
function eventTextArea() {
  getDynamicElement('textarea').forEach((element) => {
    getElement(element.id).addEventListener('input', function () {
      getTextValue(this.value);
    });
  });
}

/**
 * FUNÇÃO PARA VALIDAR SE UM CAMPO DE TEXTO ESTÁ VAZIO.
 * @param {!str.trim().length} str 
 * @returns 
 */
function isEmpty(str) {
  return !str.trim().length;
}

/**
 * FUNÇÃO COMPLEMENTAR DE TEXT DE RETORNO DOS CAMPOS DE TEXTOS.
 * @param {text} text 
 * @returns 
 */
function getTextValue(text) {
  return text;
}


function setViewSection() {
   /**
    * Está seção será criada dinamicamente após preencher o primeiro formulário e
    * só irá aparecer na etapa que o RH precisa preencher.
    */
    var sectionEspacoRh = getElement('id-espaco-rh');
    var sectionEspacoRhHtml = ` <div class="col-md-11">
                                   <p class="text-start fs-5">ESPAÇO DO RH:</p>
                                   <p class="text-start fs-6">DE MANEIRA GERAL, COMO O FUNCIONÁRIO PODE SER CLASSIFICADO?</p>
                                   <div class="form-check mt-1">
                                     <input class="ml-5 form-check-input" name="nameRDOSDH" type="radio" value="" id="idRDORH01" checked>
                                     <label class="ml-6 form-check-label"  for="idRDORH01">
                                       Trata-se de excelente aquisição para a empresa.
                                     </label>
                                   </div>
                                   <div class="form-check mt-1">
                                     <input class="ml-5 form-check-input" name="nameRDOSDH" type="radio" value="" id="idRDORH02">
                                     <label class="ml-6 form-check-label"  for="idRDORH02">
                                       Boa contratação.
                                     </label>
                                     <div class="invalid-feedback">
                                       Este campo precisa ser preenchido.
                                     </div>
                                   </div>
                                   <div class="form-check mt-1">
                                     <input class="ml-5 form-check-input" name="nameRDOSDH" type="radio" value="" id="idRDORH03">
                                     <label class="ml-6 form-check-label"  for="idRDORH03">
                                       Não atende as necessidades da empresa.
                                     </label>
                                     <div class="invalid-feedback">
                                       Este campo precisa ser preenchido.
                                     </div>
                                   </div>
                                  </div>`;
    sectionEspacoRh.innerHTML += sectionEspacoRhHtml;
    
}