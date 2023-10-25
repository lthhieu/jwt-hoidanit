import db from '../db/models'
const { Op } = require("sequelize")
import bcrypt from 'bcrypt'
import { getGroupWithRoles } from './JwtService'
import { createJwt } from '../middlewares/jwtFunc'
const saltRounds = 10
const hashPassword = async (password) => await bcrypt.hash(password, saltRounds)
const comparePassword = async (password, hashPassword) => await bcrypt.compare(password, hashPassword)
const checkExistedEmailOrPhone = async (email, phone) => {
    let checkExistedEmailOrPhone = await db.User.findOne({
        where: {
            [Op.or]: [
                { email },
                { phone }
            ]
        }
    })
    if (checkExistedEmailOrPhone) return true
    else return false
}
const Register = async (data) => {
    try {
        let { email, username, password, phone, address, sex, groupId } = data
        //check existed email or phone
        if (await checkExistedEmailOrPhone(email, phone)) return { em: "Email or phone is existed", ec: "1" }
        //hash password
        let hash = await hashPassword(password)
        //create new user
        await db.User.create({ email, username, password: hash, phone, address, sex, groupId });
        return { em: "Create user successfully", ec: "0" }
    } catch (e) {
        console.log(e)
        return { em: "Error from service", ec: "-2" }
    }

}
const Login = async (data) => {
    try {
        let { valueLogin, password } = data
        //find user
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: valueLogin },
                    { phone: valueLogin }
                ]
            }, raw: true
        })
        if (user) {
            //check password
            if (await comparePassword(password, user.password)) {
                let role = await getGroupWithRoles(user)
                let token = createJwt({ email: user.email, role, username: user.username })

                return {
                    em: "successfully", ec: "0", dt: {
                        access_token: token, role, account: { email: user.email, username: user.username }
                    }
                }
            } else return { em: "Password is not correct", ec: "1" }
        } else {
            return { em: "Email or phone is not correct", ec: "1" }
        }
    } catch (e) {
        console.log(e)
        return { em: "Error from service", ec: "-2" }
    }
}
module.exports = { Register, Login }