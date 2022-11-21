export const dbOptions = {
    mysql:{
        client: "mysql",
    connection:{
        host:'localhost',
        user:'root',
        password:'',
        database:'desafio8'
    }
    },
    sqlite:{
        client:'sqlite3',
    connection:{
        filename:'./DB/message.sqlite'
    },
    useNullAsDefault:true
    }
}