const users = ['mike']

exports.addUser = (user) => {
    users.push(user)
    return user
}

exports.getUsers = () => {
    return users
}