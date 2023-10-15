import userService from '../services/userService'
const helloWorld = (req, res) => {
    const name = "Hieu"
    return res.render("home.ejs", { name })
}
const userPage = async (req, res) => {
    let users = await userService.readUser()
    return res.render("user.ejs", { users })
}
const createUser = async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    await userService.createUser(username, email, password)
    res.redirect('/users')
}
const deleteUser = async (req, res) => {
    await userService.deleteUser(req.params.id)
    res.redirect('/users')
}
const getUserInfoById = async (req, res) => {
    let user = await userService.readUserById(req.params.id)
    let userData = {}
    if (user?.length > 0) userData = user[0]
    return res.render("user-update.ejs", { userData })
}
const updateUser = async (req, res) => {
    let id = req.body.id
    let email = req.body.email
    let username = req.body.username
    await userService.updateUser(username, email, id)
    res.redirect('/users')
}
module.exports = { helloWorld, userPage, createUser, deleteUser, getUserInfoById, updateUser }