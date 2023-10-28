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
            attributes: ["id", "username", "email", "phone", "sex", "address", "groupId"],
            include: { model: db.Group, attributes: ["name", "description"] },
            limit,
            offset,
            order: [['id', 'DESC']]
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
const createNewUser = async (data) => {
    try {
        // xem route /register
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
const updateFuncService = async (data) => {
    try {
        let { id, username, sex, groupId, address } = data
        //update
        await db.User.update({ username, sex, address, groupId }, { where: { id } })
        return {
            em: "Update successfully",
            ec: "0",
            dt: []
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
module.exports = {
    getAllUsers, createNewUser, deleteUser, getUsersWithPagination, updateFuncService
}