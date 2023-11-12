import db from '../db/models'
const _ = require('lodash');
const createFunc = async (data) => {
    try {
        let projects = await db.Project.findAll({ attributes: ['name'], raw: true })

        // Sử dụng lodash differenceBy để loại bỏ phần tử trùng
        const resultArray = _.differenceBy(data, projects, 'name');
        if (resultArray.length === 0) {
            return { em: "Nothing to create", ec: "0", dt: '' }
        }
        // console.log(resultArray)
        await db.Project.bulkCreate(resultArray)
        return { em: "Create projects successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot create Project",
            ec: "1",
            dt: ""
        }
    }

}
const getAllProjects = async () => {
    try {
        let projects = await db.Project.findAll({
            attributes: ["id", "name", "description"],
            include: [{
                model: db.User,
                attributes: ['username'],
                through: { attributes: [] }
            }]
        })
        if (projects) {
            return {
                em: "success",
                ec: "0",
                dt: projects
            }
        } else {
            return {
                em: "cannot get projects",
                ec: "1",
                dt: []
            }
        }
    } catch (e) {
        console.log('hieu')
        console.log(e)
        return {
            em: "fail",
            ec: "1",
            dt: []
        }
    }

}
const getProjectsWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let startingRow = (page - 1) * limit + 1

        let { count, rows } = await db.Project.findAndCountAll({
            attributes: ["id", "name", "description"],
            include: [{
                model: db.User,
                attributes: ['username'],
                through: { attributes: [] }
            }],
            distinct: true,
            limit,
            offset
        })

        let data = {
            totalRows: count,
            totalPages: Math.ceil(count / limit),
            projects: rows,
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
const deleteProject = async (id) => {
    try {
        await db.Project.destroy({ where: { id } })
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
const updateFunc = async (data) => {
    try {
        let { id, name, description } = data
        if (!(id && name && description)) {
            return {
                em: "Missing params",
                ec: "1",
                dt: ""
            }
        }
        await db.Project.update({ name, description }, { where: { id } })

        return { em: "Update project successfully", ec: "0", dt: '' }
    } catch (e) {
        console.log(e)
        return {
            em: "Cannot update project",
            ec: "1",
            dt: ""
        }
    }
}
module.exports = {
    createFunc, getAllProjects, getProjectsWithPagination, deleteProject, updateFunc
}