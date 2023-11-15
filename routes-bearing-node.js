

// Com explicação que não tem no INDEX

const express = require('express')
const uuid = require('uuid')

const port = 3002
const app = express()
app.use(express.json()) 

const bearings = []

app.get('/bearings', (request, response) => {
    return response.json(bearings) //retorna todos meus pedidos
})

app.post('/bearings', (request, response) => {
    const { name, number} = request.body // pega o que eu coloquei no Body
    const bearing = { id:uuid.v4(), name, number } // cria um ID para os dados do body e armazena os 3 no USER
    bearings.push(bearing) // pega a variável USERS que tava com o array vazio e adiciona (push) o que eu criei na linha de cima

    return response.status(201).json(bearing) // retorna o usuário que criamos apenas e coloca o status lá de cima com 201
})

//você volta na aba GET do insomnia e clica SEND e ele vai trazer
//todos os usuarios criados, ou seja o array USERS

app.put('/bearings/:id', (request, response) => {
    const {id} = request.params // precisamos da informação do ID que queremos atualizar primeiramente
    //ele vai pegar o ID lá na url do insomnia, que vai ta aparecendo no params;
    const { name, number} = request.body // pegar as informações novas no Insomnia no Body de JSON do PUT

    const updateBearings = { id, name, number} //estou reformulando os dados do meu usuário, criando o usuário atualizado;
    // o ID que já existe, o novo name e novo age que vieram do body pela const name, age.

    //vamos procurar o ID do cara para substituir:

    const index = bearings.findIndex(bearing => bearing.id === id)  //achar a posição onde está o ID dentro do array com
    //findIndex pra isso dizemos que queremos o ID que eu digitar na barra de url do insomnia do PUT
    if (index < 0){
        return response.status(404).json({message: "bearing not found"})
    } // aqui é pra dar a mensagem caso o ID esteja errado, pq no findIndex ele retorna -1 quand não acha algo

    bearings[index] = updateBearings //aqui ele vai procurar o array USERS e vai dizer que o index tal (posição)
    //deve ser  o que resultar do updateBearings (substituindo os dados)

    
    return response.json(updateBearings)
})

app.delete('/bearings/:id', (request, response) => {
    const {id} = request.params // precisamos da informação do ID que queremos atualizar primeiramente
    //ele vai pegar o ID lá na url do insomnia, que vai ta aparecendo no params;
    
    const index = bearings.findIndex(bearing => bearing.id === id)  //achar a posição onde está o ID dentro do array com
    //findIndex pra isso dizemos que queremos o ID que eu digitar na barra de url do insomnia
    if (index < 0){
        return response.status(404).json({message: "bearing not found"})
    }
    bearings.splice(index, 1)

    return response.status(204).json() 
})





app.listen(port, () => {
    console.log (`🚀 Server Started on port ${port}`)
})