const { Kafka } = require("kafkajs")

// configura o kafka informando um client id e o endereço do broker
const kafka = new Kafka({
    clientId: "node-example",
    brokers:['localhost:9092']
})

// cria um consumer, passando o nome do group
const consumer = kafka.consumer({groupId: "node-consumer"})

// cria uma variavel que recebe uma função assincrona
const run  = async () => {
    //conecta o consumer no broker
    await consumer.connect()
    // inscreve o consumer no topico e informa para pegar mensagens desde o inicio
    await consumer.subscribe({topic: 'topic1', fromBeginning: true})
    
    // deixa o consumer olhando as mensagens que vão chegar
    await consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                value: message.value.toString()
            })
        }
    })

}

// invoca a funcao run
run();