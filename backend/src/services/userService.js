
import bcrypt from 'bcrypt'
import db from '../db/models'
const saltRounds = 10
const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)
const createUser = async (username, email, password) => {
    let hash = await hashPassword(password)
    await db.User.create({ username, email, password: hash });
}
const readUser = async () => {
    //test relationship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ["id", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true
    })
    let role = await db.Group.findAll({
        where: { id: 1 },
        include: db.Role,
        raw: true,
        nest: true
    })
    console.log(newUser)
    console.log(role)
    const users = await db.User.findAll()
    return users
}
const deleteUser = async (id) => {
    await db.User.destroy({ where: { id } })
}
const readUserById = async (id) => {
    const user = await db.User.findByPk(id)
    return user
}
const updateUser = async (username, email, id) => {
    await db.User.update({ username, email }, { where: { id } })
}
module.exports = {
    createUser, readUser, deleteUser, readUserById, updateUser
}