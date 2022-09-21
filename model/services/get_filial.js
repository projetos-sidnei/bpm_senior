


const mapResponseToValuesAndLabels = (data) => {
  return {
    codEmp: data.CODEMP,
    select: `${data.CODFIL} -${data.SIGUFS} - ${data.CODFIL}`, // Modificar, aperfeiçoar
  };
};

const mapFilial = (data) => ({
  codEmp: data.CODEMP,
  codFil: data.CODFIL,
  uf: data.SIGUFS,
  cidade: data.CIDFIL,
  filial: data.SIGFIL,
});

async function loadOptions() {
  var data = await fetch(`http://api.tigcm.com.br:3000/sapiens/filiais`)
    .then((response) => response.json())
    .then((response) => response.resultado.map(mapResponseToValuesAndLabels));
  var dataFilter = data.filter((item) => {//Condição excluir da consulta as empresas 2, 3 e 4 e evitar duplicidade.
    if (item.codEmp != 2 && item.codEmp != 3 && item.codEmp != 4 && item.codEmp != 100) return item;
  });
console.log(dataFilter);
  return dataFilter;
}

// async function getFiliais() {
//   var data: [] = null;

//   try {
//     data = await fetch(`http://api.tigcm.com.br:3000/sapiens/filiais`)
//       .then((response) => response.json())
//       .then((response) => response.resultado.map(mapFilial));
//   } catch (err) {
//     console.log(err);
//     return err;
//   }

//   return data;
// }

// export { loadOptions, getFiliais };