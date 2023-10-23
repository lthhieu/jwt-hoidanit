import groupService from '../services/groupService'
const readFunc = async (req, res) => {
    try {
        let result = await groupService.getAllGroups()
        return res.status(200).json({
            em: result.em,
            ec: result.ec,
            dt: result.dt
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
module.exports = { readFunc }