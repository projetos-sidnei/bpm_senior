


const mapResponseToValuesAndLabels = (data) => {
  return {
    value: data.CODFIL,
    codEmp: data.CODEMP,
    nomCid: data.CIDFIL,
    label: `${data.CODFIL} - ${
      data.CODEMP == 1 && data.CODFIL == 100
        ? "DDS"
        : "" || (data.CODEMP == 1 && data.CODFIL == 101)
        ? "CG"
        : "" || (data.CODEMP == 1 && data.CODFIL == 200)
        ? "VG"
        : "" || (data.CODEMP == 1 && data.CODFIL == 201)
        ? "ROO"
        : "" || (data.CODEMP == 1 && data.CODFIL == 202)
        ? "SNP"
        : "" || (data.CODEMP == 1 && data.CODFIL == 300)
        ? "VI"
        : "" || (data.CODEMP == 1 && data.CODFIL == 301)
        ? "PV"
        : "" || (data.CODEMP == 1 && data.CODFIL == 302)
        ? "RB"
        : "" || (data.CODEMP == 1 && data.CODFIL == 303)
        ? "JIP"
        : "" || (data.CODEMP == 1 && data.CODFIL == 400)
        ? "NP"
        : "" || (data.CODEMP == 1 && data.CODFIL == 401)
        ? "ST"
        : "" || (data.CODEMP == 1 && data.CODFIL == 402)
        ? "AN"
        : "" || (data.CODEMP == 1 && data.CODFIL == 403)
        ? "MRB"
        : "" || (data.CODEMP == 1 && data.CODFIL == 404)
        ? "ATM"
        : "" || (data.CODEMP == 6 && data.CODFIL == 600)
        ? "VG"
        : "" || (data.CODEMP == 6 && data.CODFIL == 601)
        ? "CBA"
        : "" || (data.CODEMP == 6 && data.CODFIL == 602)
        ? "LRV"
        : "" || (data.CODEMP == 8 && data.CODFIL == 800)
        ? "DDS"
        : "" || (data.CODEMP == 9 && data.CODFIL == 900)
        ? "CG"
        : "" || (data.CODEMP == 9 && data.CODFIL == 901)
        ? "CMB"
        : "" || (data.CODEMP == 9 && data.CODFIL == 902)
        ? "TL"
        : ""
    }-${data.SIGUFS}`, // Modificar, aperfeiçoar
  };
};

// const mapFilial = (data: {
//   CODEMP: string;
//   CODFIL: string;
//   SIGUFS: string;
//   CIDFIL: string;
//   SIGFIL: string;
// }) => ({
//   codEmp: data.CODEMP,
//   codFil: data.CODFIL,
//   uf: data.SIGUFS,
//   cidade: data.CIDFIL,
//   filial: data.SIGFIL,
// });

async function loadOptions() {
  var data = await fetch(`http://api.tigcm.com.br:3000/sapiens/filiais`)
    .then((response) => response.json())
    .then((response) => response.resultado.map(mapResponseToValuesAndLabels));

  var dataFilter = data.filter((item) => {//Condição excluir da consulta as empresas 2, 3 e 4 e evitar duplicidade.
    if (item.codEmp != 2 && item.codEmp != 3 && item.codEmp != 4) return item;
  });

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