import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const usersFilePath = path.join(
  process.cwd(),
  'data',
  'users.json'
)

const resetTokensFilePath = path.join(
  process.cwd(),
  'data',
  'password-resets.json'
)

type PasswordResetToken = {
  userId: string
  tokenHash: string
  expiresAt: number
  used: boolean
}

export function getUsers() {
  try {
    const data = fs.readFileSync(
      usersFilePath,
      'utf-8'
    )

    return JSON.parse(data)
  } catch {
    return []
  }
}

export function saveUsers(users: any[]) {
  fs.writeFileSync(
    usersFilePath,
    JSON.stringify(users, null, 2)
  )
}

export function findUserByEmail(
  email: string
) {
  const users = getUsers()

  return users.find(
    (user: any) =>
      user.email.toLowerCase() ===
      email.toLowerCase()
  )
}

export function createUser(
  name: string,
  email: string,
  password: string
) {
  const users = getUsers()

  const existing = users.find(
    (u: any) =>
      u.email.toLowerCase() ===
      email.toLowerCase()
  )

  if (existing) {
    throw new Error(
      'User already exists'
    )
  }

  const hashedPassword =
    bcrypt.hashSync(password, 10)

  const newUser = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  }

  users.push(newUser)

  saveUsers(users)

  return newUser
}

export function validateUser(
  email: string,
  password: string
) {
  const user =
    findUserByEmail(email)

  if (!user) {
    return null
  }

  const isValid =
    bcrypt.compareSync(
      password,
      user.password
    )

  if (!isValid) {
    return null
  }

  return user
}

/* ==========================================================
   PASSWORD RESET
========================================================== */

function getResetTokens(): PasswordResetToken[] {
  try {
    if (
      !fs.existsSync(
        resetTokensFilePath
      )
    ) {
      return []
    }

    const data =
      fs.readFileSync(
        resetTokensFilePath,
        'utf-8'
      )

    const parsed = JSON.parse(data)

    return Array.isArray(parsed)
      ? parsed
      : []
  } catch {
    return []
  }
}

function saveResetTokens(
  tokens: PasswordResetToken[]
) {
  fs.writeFileSync(
    resetTokensFilePath,
    JSON.stringify(
      tokens,
      null,
      2
    )
  )
}

export function createPasswordResetToken(
  userId: string
) {
  const tokens =
    getResetTokens()

  const now = Date.now()

  // Remove expired/used tokens
  const activeTokens =
    tokens.filter(
      token =>
        !token.used &&
        token.expiresAt > now
    )

  const rawToken =
    crypto.randomBytes(32).toString('hex')

  const tokenHash =
    crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex')

  activeTokens.push({
    userId,
    tokenHash,
    expiresAt:
      now + 15 * 60 * 1000,
    used: false,
  })

  saveResetTokens(
    activeTokens
  )

  return rawToken
}

export function resetPassword(
  rawToken: string,
  newPassword: string
) {
  const tokens =
    getResetTokens()

  const tokenHash =
    crypto
      .createHash('sha256')
      .update(rawToken)
      .digest('hex')

  const tokenIndex =
    tokens.findIndex(
      token =>
        token.tokenHash ===
          tokenHash &&
        !token.used &&
        token.expiresAt >
          Date.now()
    )

  if (tokenIndex === -1) {
    return false
  }

  const token =
    tokens[tokenIndex]

  const users =
    getUsers()

  const userIndex =
    users.findIndex(
      (user: any) =>
        user.id ===
        token.userId
    )

  if (userIndex === -1) {
    return false
  }

  users[userIndex].password =
    bcrypt.hashSync(
      newPassword,
      10
    )

  saveUsers(users)

  // One-time use
  tokens[tokenIndex].used =
    true

  saveResetTokens(
    tokens
  )

  return true
}