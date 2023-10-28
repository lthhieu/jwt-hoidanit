import db from '../db/models'
const _ = require('lodash');
const createFunc = async (data) => {
    try {
        let roles = await db.Role.findAll({ attributes: ['url'], raw: true })

        // Sử dụng lodash differenceBy để loại bỏ phần tử trùng
        const resultArray = _.differenceBy(data, roles, 'url');
        if (resultArray.length === 0) {
            return { em: "Nothing to create", ec: "0", dt: '' }
        }
        await db.Role.bulkCreate(resultArray)
        return { em: "Create roles successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot create role",
            ec: "1",
            dt: ""
        }
    }

}
const getAllRoles = async () => {
    try {
        let roles = await db.Role.findAll({
            attributes: ["id", "url", "description"],
            include: [{
                model: db.Group,
                attributes: ['name', 'description'],
                through: { attributes: [] }
            }]
        })
        if (roles) {
            return {
                em: "success",
                ec: "0",
                dt: roles
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
const getRolesWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let startingRow = (page - 1) * limit + 1

        let { count, rows } = await db.Role.findAndCountAll({
            attributes: ["id", "url", "description"],
            include: [{
                model: db.Group,
                attributes: ['name', 'description'],
                through: { attributes: [] }
            }],
            distinct: true,
            limit,
            offset
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            roles: rows,
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
const deleteRole = async (id) => {
    try {
        await db.Role.destroy({ where: { id } })
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
const readByGroupid = async (id) => {
    try {
        let roles = await db.Group.findOne({
            attributes: ['name'], where: { id }, include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }]
        })
        return {
            em: "successfully",
            ec: "0",
            dt: roles
        }
    } catch (e) {
        console.log(e)
        return {
            em: "error from service",
            ec: "1",
            dt: []
        }
    }
}
const assignGroupFunc = async (data) => {
    try {
        await db.GroupRole.destroy({ where: { groupId: +data.groupId } })
        await db.GroupRole.bulkCreate(data.data)
        return { em: "Assign roles to successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot assign role",
            ec: "1",
            dt: ""
        }
    }
}
const updateFunc = async (data) => {
    try {
        let { id, url, description } = data
        if (id <= 11) {
            await db.Role.update({ description }, { where: { id } })
        } else {
            await db.Role.update({ url, description }, { where: { id } })
        }
        return { em: "Update role successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot update role",
            ec: "1",
            dt: ""
        }
    }
}
module.exports = {
    createFunc, getAllRoles, getRolesWithPagination, deleteRole, readByGroupid, assignGroupFunc, updateFunc
}