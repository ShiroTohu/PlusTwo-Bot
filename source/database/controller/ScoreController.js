/**
 * Alters the score of a user in the database given a delta. If the user doesn't
 * exist in the database, the user is created with the delta as the initial value.
 * 
 * @param {User} referenceAuthor discord.js User object.
 * @param {int} delta the delta to alter the score by
 * @returns A User Model
 */
async function alterScore(userId, delta) {
    const user = await Users.findOne({
        where: {user_id: userId}
    });

    if (user) {
        return await user.increment('score', { by: delta });
    }
    
    return await Users.create({user_id: referenceAuthor.id, username: referenceAuthor.username, score: delta});
}