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
module.exports = {
    createFunc
}