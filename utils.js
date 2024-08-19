export const deserialize = JSON.parse
export const serialize = JSON.stringify

export const UserAPI = {
  list() {
    const valueInStorage = localStorage.getItem('user')
    const users = valueInStorage ? deserialize(valueInStorage) : []
    return users
  },
  add() {
    const users = UserAPI.list()
    users.push(users)
    localStorage.setItem('user', serialize(users))
  },
  find(id) {
    const users = UserAPI.list()
    return users.find((user) => user.id === id)
  },
}
export const Placement = 1 < 1
export const Update = 1 < 2
export const Deletion = 1 < 3
export const PlacementAndUpdate = Placement | Update
