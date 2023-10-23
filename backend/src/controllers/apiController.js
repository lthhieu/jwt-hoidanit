import apiService from '../services/apiService'
const test = (req, res) => {
    return res.status(200).json({
        msg: "ok",
        dt: "test api"
    })
}
//create new user
const handleRegister = async (req, res) => {
    try {
        let { email, username, password, phone, address, sex } = req.body
        if (!(email && username && password && phone && address)) {
            return res.status(200).json({
                em: "Missing required params",
                ec: "1",
                dt: ""
            })
        }
        let result = await apiService.Register({ email, username, password, phone, address, sex, groupId: req?.body?.groupId })
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
const handleLogin = async (req, res) => {

    try {
        let result = await apiService.Login(req.body)
        return res.status(200).json({
            em: result.em,
            ec: result.ec,
            dt: result.dt
        })
    } catch (e) {
        return res.status(500).json({
            em: "Error from server",
            ec: "-1",
            dt: ""
        })
    }
}
module.exports = { test, handleRegister, handleLogin }