const GoogleSpreadsheet = require('google-spreadsheet')
const credenciais = require('./credentials.json') 
const {promisify} = require('util')
const docId = '[insira a sua chave aqui]'
/*
const doc = new GoogleSpreadsheet(docId)
doc.useServiceAccountAuth(credenciais, err => {
    doc.getInfo((err, info) => {
        console.log(info)
    })
})
*/

const accessSheet = async() => {
    const doc = new GoogleSpreadsheet(docId)
    await promisify(doc.useServiceAccountAuth)(credenciais)
    const info = await promisify(doc.getInfo)()

    const worksheet = info.worksheets[0]
    // carregar linhas ex
    const rows = await promisify(worksheet.getRows)({
        query: 'nome = "Valesca"' // se for necessario filtrar registros 
    })
    // incluir um registro 
    //await promisify(worksheet.addRow)({id: '5', nome: 'Iracema'})

    //  dessa forma vc recupera apenas as colunas passadas o nome deve ser exatamente o mesmo da planilha mais de uma dessa forma (row.nome, row.data)
    rows.forEach(row => {
        console.log(row.nome)
        row.del() // deleta a linha observe que a mesma foi setada na query
    });

    //console.log(rows)
    
}
accessSheet()
