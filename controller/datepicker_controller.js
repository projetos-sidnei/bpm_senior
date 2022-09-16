$(function () {
  $('#dateC').datepicker(
    {
      format: 'dd/mm/yyyy',
      startDate: '+0',
      language: 'pt-BR',
    }).datepicker('setDate', 'now');
})

