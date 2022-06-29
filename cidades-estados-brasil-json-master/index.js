import { promises as fs } from 'fs'

async function criarA_objeto() {
  var estados = await fs.readFile('Estados.json')
  estados = JSON.parse(estados)

  var cidades = await fs.readFile('Cidades.json')
  cidades = JSON.parse(cidades)

  for (var estado of estados) {
    const UF = cidades.filter(cidade => cidade.Estado == estado.ID)
    await fs.writeFile(`./estados/${estado.Sigla}.json`, JSON.stringify(UF))
  }
}
async function acharCidades(UF) {
  const dados = await fs.readFile(`./estados/${UF}.json`)
  let dado = await JSON.parse(dados)
  console.log(dado.length)
}
async function verificar() {
  var estados = await fs.readFile('Estados.json')
  estados = await JSON.parse(estados)
  let siglas = estados.map(e => e.Sigla)
  var ArrEstados = []
  for (var sigla of siglas) {
    let dado = await fs.readFile(`./estados/${sigla}.json`)
    var dados = { Nome: sigla, Qnt: JSON.parse(dado).length }
    ArrEstados.push(dados)
  }
  ArrEstados.sort((a, b) => {
    if (a.Qnt < b.Qnt) return 1
    if (a.Qnt > b.Qnt) return -1
    return 0
  })

  ArrEstados = ArrEstados.splice(0, 5)
  console.log(ArrEstados)
}
async function ordenaR() {
  var estados = await fs.readFile('Estados.json')
  estados = JSON.parse(estados)

  var cidades = await fs.readFile('Cidades.json')
  cidades = JSON.parse(cidades)

  var capitais = await fs.readFile('capitais.json')
  capitais =JSON.parse(capitais)

 estados.forEach(estado => {
    var lista = []
    var estadoA = null
    capitais.forEach(capital => {
      if (estado.Nome == capital.Estado){
        estadoA = capital.Região
      }
    });
    cidades.forEach(cidade => {
      if(cidade.Estado == estado.ID ){
        lista.push(cidade)
      }
    });

    fs.writeFile(`regiao/${estadoA}/${estado.Sigla}.json`, JSON.stringify(lista,null,2))
  });
}
//criarA_objeto()
//acharCidades('MG')
//verificar()
ordenaR()
