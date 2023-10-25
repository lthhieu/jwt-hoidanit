import roleService from '../services/roleService'
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


    } catch (e) {
        console.log(e)
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
module.exports = { readFunc, updateFunc, deleteFunc, createFunc }