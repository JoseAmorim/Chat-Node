import server from './app'

server.listen(process.env.PORT || 3333, () => {
    console.log(`Rodando na porta ${process.env.PORT}`)
})
