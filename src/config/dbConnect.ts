import knex from 'knex'

export const dbConn = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'alexandreb',
        password: 'alexandreb',
        database: 'usuarios'
    }
})
