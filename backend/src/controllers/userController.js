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
module.exports = { readFunc, updateFunc, deleteFunc }