
import bcrypt from 'bcrypt'
import mysql from 'mysql2/promise'
import bluebird from 'bluebird'

const saltRounds = 10
const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)
const createUser = async (username, email, password) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    let hash = await hashPassword(password)
    const [rows, fields] = await connection.execute(
        'INSERT INTO `users` (username, email, password) VALUES (?, ?, ?)',
        [username, email, hash]
    )
}
const readUser = async () => {
    // create the connection
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('SELECT * FROM `users`')
    return rows
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('DELETE FROM `users` WHERE `id` = ?', [id])
}
const readUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('SELECT * FROM `users` WHERE `id` = ?', [id])
    return rows
}
const updateUser = async (username, email, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird })
    const [rows, fields] = await connection.execute('UPDATE `users` SET `username` = ?, `email` = ? WHERE `id` = ?', [username, email, id])
}
module.exports = {
    createUser, readUser, deleteUser, readUserById, updateUser
}