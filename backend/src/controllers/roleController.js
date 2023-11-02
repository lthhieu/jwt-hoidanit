import roleService from '../services/roleService'
const updateFunc = async (req, res) => {
    try {
        let response = await roleService.updateFunc(req.body)
        return res.status(200).json({
            em: response.em,
            ec: response.ec,
            dt: response.dt
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const createFunc = async (req, res) => {
    try {
        let response = await roleService.createFunc(req.body)
        return res.status(200).json({
            em: response.em,
            ec: response.ec,
            dt: response.dt
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const deleteFunc = async (req, res) => {
    try {
        let { id } = req?.body
        if (id) {
            if (id <= 11) {
                return res.status(200).json({
                    em: "Cannot delete default role",
                    ec: "1",
                    dt: ""
                })
            }
            let result = await roleService.deleteRole(id)
            return res.status(200).json({
                em: result.em,
                ec: result.ec,
                dt: result.dt
            })
        } else {
            return res.status(200).json({
                em: "No any ID",
                ec: "1",
                dt: ""
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const readFunc = async (req, res) => {
    try {
        if (req?.query?.page && req?.query?.limit) {
            let { page, limit } = req?.query
            let result = await roleService.getRolesWithPagination(+page, +limit)
            return res.status(200).json({
                em: result.em,
                ec: result.ec,
                dt: result.dt
            })
        } else {
            let result = await roleService.getAllRoles()
            return res.status(200).json({
                em: result.em,
                ec: result.ec,
                dt: result.dt
            })
        }

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const readByGroupidFunc = async (req, res) => {
    try {
        if (req?.query?.groupid) {
            let { groupid } = req?.query
            let result = await roleService.readByGroupid(+groupid)
            return res.status(200).json({
                em: result.em,
                ec: result.ec,
                dt: result.dt
            })
        }
        return res.status(200).json({
            em: "No groupid",
            ec: "-1",
            dt: ""
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const assignGroupFunc = async (req, res) => {
    try {
        let response = await roleService.assignGroupFunc(req.body)
        return res.status(200).json({
            em: response.em,
            ec: response.ec,
            dt: response.dt
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
module.exports = { readFunc, updateFunc, deleteFunc, createFunc, readByGroupidFunc, assignGroupFunc }