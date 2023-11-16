
// Com Middleware:
import express, { json } from 'express';
import { v4 } from 'uuid';
import cors from 'cors';


const port = 3002;
const app = express();
app.use(json());
app.use(cors("https://rolamentos-flavia-ramos.netlify.app/"));

app.listen(port, () => {
    console.log (`🚀 Server Started on port ${port}`)
})

const bearings = []

const checkBearingId = (request, response, next) => {
    const {id} = request.params // precisamos da informação do ID que queremos atualizar primeiramente
    //ele vai pegar o ID lá na url do insomnia, que vai ta aparecendo no params;
    const index = bearings.findIndex(bearing => bearing.id === id)  //achar a posição onde está o ID dentro do array com
    //findIndex pra isso dizemos que queremos o ID que eu digitar na barra de url do insomnia do PUT
    if (index < 0){
        return response.status(404).json({error: "bearing not found"})
    } // aqui é pra dar a mensagem caso o ID esteja errado, pq no findIndex ele retorna -1 quand não acha algo
    request.bearingId = id
    request.BearingIndex = index
    next()
}

app.get('/', (request, response) => {
    return response.json("hello word")
})

app.get('/bearings', (request, response) => {
    return response.json(bearings) //retorna todos meus usuários
})

app.post('/bearings', (request, response) => {
    const { name, number, price} = request.body // pega o que eu coloquei no Body
    const bearing = { id:v4(), name, number, price } // cria um ID para os dados do body e armazena os 3 no USER
    bearings.push(bearing) // pega a variável USERS que tava com o array vazio e adiciona (push) o que eu criei na linha de cima

    return response.status(201).json(bearing) // retorna o usuário que criamos apenas e coloca o status lá de cima com 201
})

//você volta na aba GET do insomnia e clica SEND e ele vai trazer
//todos os usuarios criados, ou seja o array USERS

app.put('/bearings/:id', checkBearingId, (request, response) => {
    const id = request.bearingId
    const { name, number, price} = request.body // pegar as informações novas no Insomnia no Body de JSON do PUT

    const updateBearing = { id, name, number, price } //estou reformulando os dados do meu usuário, criando o usuário atualizado;
    // o ID que já existe, vamos pegar da verificação anterior (UserId), o novo name e novo age que vieram do body pela const name, age.
    const index = request.BearingIndex // ele puxa do IF do checkUserId
    bearings[index] = updateBearing //aqui ele vai procurar o array USERS e vai dizer que o index tal (posição)
    //deve ser  o que resultar do updateUser (substituindo os dados)
   
    return response.json(updateBearing)
})

app.delete('/bearings/:id', checkBearingId, (request, response) => {
    const index = request.BearingIndex // ele puxa do IF do checkUserId pelo ID que colocamos na URL
   
    bearings.splice(index, 1) // aqui eu puxo a posição x do index e deleto só 1, ou seja, só ele

    return response.status(204).json() 
})

