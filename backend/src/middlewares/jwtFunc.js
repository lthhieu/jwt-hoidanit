import jwt from 'jsonwebtoken'
require('dotenv').config()

const nonSecurePaths = ['/', '/login', '/register', '/logout']
const createJwt = (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    } catch (e) {
        console.log(e)
        return null
    }
}

const verifyJwt = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        console.log(e)
        return null
    }
}

const extractToken = (req) => {
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        return req.headers.authorization.split(' ')[1]
    }
    return null
}

const checkUserJwt = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next()
    let cookies = req.cookies
    let tokenFromHeader = extractToken(req)
    if (cookies?.access_token || tokenFromHeader) {
        let token = cookies?.access_token ? cookies?.access_token : tokenFromHeader
        let decoded = verifyJwt(token)
        if (decoded) {
            req.user = decoded
            req.token = token
            next()
        }
        else return res.status(401).json({
            ec: '-1',
            em: 'Token expires',
            dt: ''
        })
    }
    else {

        return res.status(401).json({
            ec: '-1',
            em: 'Not auth checkUserJwt',
            dt: ''
        })
    }
}

const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next()
    if (req?.user) {
        let email = req?.user?.email
        let roles = req?.user?.role?.Roles
        let url = req.path
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                ec: '-1',
                em: 'Dont have permission',
                dt: ''
            })
        }
        if (roles.some(item => item.url === url)) {
            next()
        } else {
            return res.status(403).json({
                ec: '-1',
                em: 'Dont have permission',
                dt: ''
            })
        }
    } else {
        return res.status(401).json({
            ec: '-1',
            em: 'Not auth check permission',
            dt: ''
        })
    }
}

module.exports = { createJwt, verifyJwt, checkUserJwt, checkUserPermission }