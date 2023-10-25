import db from '../db/models'
const _ = require('lodash');
const createFunc = async (data) => {
    try {
        let roles = await db.Role.findAll({ attributes: ['url'], raw: true })
        const array2 = [
            { url: '/user/read' },
            { url: '/user/create' }
        ];

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
module.exports = {
    createFunc, getAllRoles, getRolesWithPagination, deleteRole
}