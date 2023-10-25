import db from '../db/models'

const getAllUsers = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] }
        })
        if (users) {
            return {
                em: "success",
                ec: "0",
                dt: users
            }
        } else {
            return {
                em: "cannot get users",
                ec: "1",
                dt: []
            }
        }
    } catch (e) {
        console.log(e)
        return {
            em: "fail",
            ec: "1",
            dt: []
        }
    }

}
const getUsersWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let startingRow = (page - 1) * limit + 1

        let { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            limit,
            offset
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            users: rows,
            startingRow,
            endingRow: Math.min(offset + limit, count)
        }
        return {
            em: "success",
            ec: "0",
            dt: data
        }
    } catch (e) {
        console.log(e)
        return {
            em: "fail",
            ec: "1",
            dt: []
        }
    }
}
const updateUser = async (data) => {
    try {
        let { id, username, sex, phone, address } = data
        //update
        await db.User.update({ username, sex, phone, address }, { where: { id } })
    } catch (e) {
        console.log(e)
        return {
            em: "fail",
            ec: "1",
            dt: []
        }
    }

}
const createNewUser = async (data) => {
    try {
        let { email, username, password, phone, address, sex, groupId } = data
        //check existed email or phone
        if (await checkExistedEmailOrPhone(email, phone)) return { em: "Email or phone is existed", ec: "1" }
        //hash password
        let hash = await hashPassword(password)
        //create new user
        await db.User.create({ email, username, password: hash, phone, address, sex, groupId });
        return { em: "Create user successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return { em: "Error from service", ec: "-2", dt: '' }
    }
}
const deleteUser = async (id) => {
    try {
        await db.User.destroy({ where: { id } })
        return {
            em: "Delete successfully",
            ec: "0",
            dt: []
        }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot delete",
            ec: "1",
            dt: []
        }
    }
}
module.exports = {
    getAllUsers, updateUser, createNewUser, deleteUser, getUsersWithPagination
}