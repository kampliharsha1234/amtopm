import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

export function getUsers() {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveUsers(users: any[]) {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
}

export function findUserByEmail(email: string) {
  const users = getUsers()
  return users.find((user: any) => user.email === email)
}

export function createUser(name: string, email: string, password: string) {
  const users = getUsers()
  const existing = users.find((u: any) => u.email === email)
  if (existing) throw new Error('User already exists')
  
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password: hashedPassword,
  }
  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function validateUser(email: string, password: string) {
  const user = findUserByEmail(email)
  if (!user) return null
  const isValid = bcrypt.compareSync(password, user.password)
  if (!isValid) return null
  return user
}