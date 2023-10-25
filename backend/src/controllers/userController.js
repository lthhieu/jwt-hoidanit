import userApiService from '../services/userApiService'
const readFunc = async (req, res) => {
    try {
        if (req?.query?.page && req?.query?.limit) {
            let { page, limit } = req?.query
            let result = await userApiService.getUsersWithPagination(+page, +limit)
            return res.status(200).json({
                em: result.em,
                ec: result.ec,
                dt: result.dt
            })
        } else {
            let result = await userApiService.getAllUsers()
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
const updateFunc = async (req, res) => {
    try {


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
            let result = await userApiService.deleteUser(id)
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
const createFunc = async (req, res) => {
    try {
        let { email, username, password, phone, address, sex } = req.body
        if (!(email && username && password && phone && address)) {
            return res.status(200).json({
                em: "Missing required params",
                ec: "1",
                dt: ""
            })
        }
        let result = await userApiService.createNewUser({ email, username, password, phone, address, sex, groupId: req?.body?.groupId || 4 })
        return res.status(200).json({
            em: result.em,
            ec: result.ec,
            dt: ""
        })
    } catch (e) {
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
const getUserAccount = async (req, res) => {
    return res.status(200).json({
        em: "ok",
        ec: "0",
        dt: {
            role: req.user.role,
            account: { email: req.user.email, username: req.user.username },
            access_token: req.token
        }
    })
}
module.exports = { readFunc, updateFunc, deleteFunc, createFunc, getUserAccount }