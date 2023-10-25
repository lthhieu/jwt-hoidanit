import db from '../db/models'
const getGroupWithRoles = async (user) => {
    try {
        let role = await db.Group.findOne({
            attributes: ['id', 'name', 'description'],
            where: { id: user?.groupId },
            include: [{
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [] }
            }]
        })
        return role ? role : {}
    } catch (e) { }
}
module.exports = { getGroupWithRoles }