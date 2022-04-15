//Nome: Lucas Henrique Costa de Arruda
//Universidade: IFPE Campus Recife
//Curso: Análise e Desenvolvimento de Sistemas
//Semestre atual: 4º período

//Lista de pacotes do desafio
let arrayPacotes = ["288355555123888", "335333555584333", "223343555124001", "002111555874555", "111188555654777", "111333555123333", "432055555123888", "079333555584333", "155333555124001", "333188555584333", "555288555123001", "111388555123555", "288000555367333", "066311555874001", "110333555123555", "333488555584333", "455448555123001", "022388555123555", "432044555845333", "034311555874001"]

let arrayCodPacotes = []

const whichCityRegion = trinca => {
    if (trinca >= 001 && trinca <= 099) return `Cidade ${trinca}, região Sudeste`
    else if (trinca >= 100 && trinca <= 199) return `Cidade ${trinca}, região Sul`
    else if (trinca >= 201 && trinca <= 299) return `Cidade ${trinca}, região Centro-oeste`
    else if (trinca >= 300 && trinca <= 399) return `Cidade ${trinca}, região Nordeste`
    else if (trinca >= 400 && trinca <= 499) return `Cidade ${trinca}, região Norte`
    else return "Não processado"
}

const whichProduct = trinca => {
    switch (trinca) {
        case 001:
            return "Joias"
            break;
        case 111:
            return "Livros"
            break;
        case 333:
            return "Eletrônicos"
            break;
        case 555:
            return "Bebidas"
            break;
        case 888:
            return "Brinquedos"
            break;
        default:
            return "Não processado"
    }
}

const specialCases = codBarras => {
    let restricoes = []

    //Caso extra codigo de origem/destino fora do codigo de referencia
    if (whichCityRegion(Number(codBarras.substr(0, 3))) == "Não processado" || whichCityRegion(Number(codBarras.substr(3, 3))) == "Não processado") {
        restricoes.push("Cidade ou Região fora do código de referência")
    }

    if ((whichProduct(Number(codBarras.substr(12, 3)))) == "Não processado") {
        restricoes.push("Tipo do produto inválido")
    }
    if ((whichProduct(Number(codBarras.substr(12, 3)))) == "Joias" && (Number(codBarras.substr(0, 3))) >= 201 && Number(codBarras.substr(0, 3)) <= 299) {
        restricoes.push("Não é possível despachar pacotes contendo jóias tendo como região de origem o Centro-oeste")
    }
    if (Number(codBarras.substr(9, 3)) == 367) {
        restricoes.push("Vendedor com o CNPJ inativo(Pacote inválido)")
    }
    return restricoes;
}

const registerPackage = codBarras => {
    let condicoes = specialCases(codBarras)
    if (condicoes.length == 0) { //Não fere nenhuma das condições especiais
        arrayCodPacotes.push(codBarras)
        console.log(`Pacote ${codBarras} registrado com sucesso`)
        console.log(`Região de origem: ${whichCityRegion(Number(codBarras.substr(0, 3)))}`)
        console.log(`Região de destino: ${whichCityRegion(Number(codBarras.substr(3, 3)))}`)
        console.log(`Código da Loggi: ${codBarras.substr(6, 3)}`)
        console.log(`Código do Vendedor do produto: ${codBarras.substr(9, 3)}`)
        console.log(`Tipo do produto: ${whichProduct(Number(codBarras.substr(12, 3)))} \n`)
    } else {
        arrayCodPacotes.push(codBarras)
        console.log(`O código de barras ${codBarras} apresenta os seguintes erros:`)
        condicoes.forEach(msg => {
            console.log(msg)
        })
        console.log("\n")
    }
}

console.log("Registro de pacotes \n")


for (let i = 0; i < arrayPacotes.length; i++) {
    registerPackage(arrayPacotes[i])
}
console.log("\n")

//Desafio 1
const destinyPackages = (arrayPackages = arrayCodPacotes) => {
    let qtdeDestinoSul = 0
    let qtdeDestinoSudeste = 0
    let qtdeDestinoCentroOeste = 0
    let qtdeDestinoNordeste = 0
    let qtdeDestinoNorte = 0
    arrayPackages.forEach((codigoPacote => {
        let trinca = Number(codigoPacote.substr(3, 3))
        switch (whichCityRegion(trinca)) {
            case `Cidade ${trinca}, região Sudeste`:
                qtdeDestinoSudeste++
                break
            case `Cidade ${trinca}, região Sul`:
                qtdeDestinoSul++
                break
            case `Cidade ${trinca}, região Centro-oeste`:
                qtdeDestinoCentroOeste++
                break
            case `Cidade ${trinca}, região Nordeste`:
                qtdeDestinoNordeste++
                break
            case `Cidade ${trinca}, região Norte`:
                qtdeDestinoNorte++
                break
        }
    }))
    return {
        qtdeDestinoSudeste,
        qtdeDestinoSul,
        qtdeDestinoCentroOeste,
        qtdeDestinoNordeste,
        qtdeDestinoNorte
    }
}

//Desafio 2
//A única condição passada para um pacote ser inválido foi a do vendedor 
const validAndInvalidPackage = (arrayPackages = arrayCodPacotes) => {
    let pacotesInvalidos = [];
    let pacotesValidos = [];
    arrayPackages.forEach(codigoPacote => {
        let trinca = Number(codigoPacote.substr(9, 3))
        if (trinca == 367) pacotesInvalidos.push(codigoPacote)
        else pacotesValidos.push(codigoPacote)
    })
    return {
        pacotesValidos,
        pacotesInvalidos
    }
}

//Desafio 3
const destinySouthWithToy = (arrayPackages = arrayCodPacotes) => {
    let arraydestinySouthWithToy = []
    arrayPackages.forEach(codigoPacote => {
        let trincaOrigin = Number(codigoPacote.substr(0, 3))
        let trincaProduto = Number(codigoPacote.substr(12, 3))
        if (whichCityRegion(trincaOrigin) == `Cidade ${trincaOrigin}, região Sul` && whichProduct(trincaProduto) == "Brinquedos") arraydestinySouthWithToy.push(codigoPacote)
    })
    return arraydestinySouthWithToy
}

//Desafio 4
const listByDestiny = (arrayPackages = arrayCodPacotes) => {
    let arrayDestinoSul = []
    let arrayDestinoSudeste = []
    let arrayDestinoCentroOeste = []
    let arrayDestinoNordeste = []
    let arrayDestinoNorte = []
    arrayPackages = validAndInvalidPackage(arrayPackages).pacotesValidos
    arrayPackages.forEach(codPacote => {
        let trinca = Number(codPacote.substr(3, 3))
        switch (whichCityRegion(trinca)) {
            case `Cidade ${trinca}, região Sudeste`:
                arrayDestinoSudeste.push(codPacote)
                break
            case `Cidade ${trinca}, região Sul`:
                arrayDestinoSul.push(codPacote)
                break
            case `Cidade ${trinca}, região Centro-oeste`:
                arrayDestinoCentroOeste.push(codPacote)
                break
            case `Cidade ${trinca}, região Nordeste`:
                arrayDestinoNordeste.push(codPacote)
                break
            case `Cidade ${trinca}, região Norte`:
                arrayDestinoNorte.push(codPacote)
                break
        }
    })
    console.log(`Pacotes por região de destino`)
    console.log("\nRegião Sudeste")
    arrayDestinoSudeste.forEach(cod => {
        console.log(cod)
    })
    console.log("\nRegião Sul")
    arrayDestinoSul.forEach(cod => {
        console.log(cod)
    })
    console.log("\nRegião Centro-Oeste")
    arrayDestinoCentroOeste.forEach(cod => {
        console.log(cod)
    })
    console.log("\nRegião Nordeste")
    arrayDestinoNordeste.forEach(cod => {
        console.log(cod)
    })

    console.log("\nRegião Norte")
    arrayDestinoNorte.forEach(cod => {
        console.log(cod)
    })
    return {
        arrayDestinoSul,
        arrayDestinoSudeste,
        arrayDestinoCentroOeste,
        arrayDestinoNordeste,
        arrayDestinoNorte
    }
}

listByDestiny()

//Desafio 5
const packageBySeller = (arrayPackages = arrayCodPacotes) => {
    arrayPackages = validAndInvalidPackage(arrayPackages).pacotesValidos
    let arrayCodigoVendedores = []
    let vendasVendedores = new Object
    arrayPackages.forEach(codBarras => {
        let trinca = Number(codBarras.substr(9, 3))
        if (!(trinca in arrayCodigoVendedores)) arrayCodigoVendedores.push(trinca)
    })
    arrayCodigoVendedores.forEach(codigo => {
        Object.defineProperty(vendasVendedores, codigo, {
            enumerable: true,
            writable: true,
            value: 0
        })
    })
    let arrayVendedores = Object.keys(vendasVendedores)

    arrayVendedores.forEach((valor, indice) => {
        arrayVendedores[indice] = Number(valor)
    })
    for (let i = 0; i < arrayPackages.length; i++) {
        if (arrayVendedores.includes(Number(arrayPackages[i].substr(9, 3)))) {
            let codVendedor = `${Number(arrayPackages[i].substr(9, 3))}`
            vendasVendedores[codVendedor]++
        }
    }
    console.log("\nLista de pacotes enviados por cada vendedor")
    arrayVendedores.forEach(codigo => {
        console.log(`Pacotes do vendedor ${codigo}: ${vendasVendedores[codigo]}`)
    })

    return vendasVendedores
}

packageBySeller()

//Desafio 6
const packageByDestiny =  (destiny,arrayPackages = arrayCodPacotes,) => {
    arrayPackages = validAndInvalidPackage(arrayPackages).pacotesValidos
    arrayDestiny = []
    arrayPackages.forEach(codPacote => {
        let trinca = Number(codPacote.substr(3, 3))
        if (whichCityRegion(trinca) == `Cidade ${trinca}, região ${destiny}`) {
            arrayDestiny.push(codPacote)
        }
    })
    return arrayDestiny
}

//Desafio 6
const packageByType = (type, arrayPackages = arrayCodPacotes,) => {
    arrayPackages = validAndInvalidPackage(arrayPackages).pacotesValidos
    arrayType = []
    arrayPackages.forEach(codPacote => {
        let trinca = Number(codPacote.substr(12, 3))
        if(whichProduct(trinca) == type) arrayType.push(codPacote)
    })
    return arrayType
}

//Desafio 7
const transportNorthThroughWestCenter = (arrayPackages = arrayCodPacotes) => {
    //Pacotes que já estariam no caminhão
    let arrayDestinyNorth = packageByDestiny("Norte")
    //Pacote que pegaria carona
    let arrayDestinyWestCenter = packageByDestiny("Centro-oeste")
    return [].concat(arrayDestinyNorth, arrayDestinyWestCenter)
}

//Desafio 8 e 9
const queueWestCenterFirstWithJewelry = () => {
    let arrayPackagesNorthWestCenter = transportNorthThroughWestCenter()
    arrayPackagesNorthWestCenter.sort(((a,b) => {
        //codigo do centro oeste é sempre menor do que o do norte
        if(Number(a.substr(12,3)) == 001 && Number(a.substr(3,3)) < Number(b.substr(3,3))) return -1
        
    }))
    console.log(arrayPackagesNorthWestCenter)    
}

//Desafio 10
console.log(validAndInvalidPackage().pacotesInvalidos)




