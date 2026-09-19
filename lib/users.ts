import bcrypt from 'bcryptjs'
import crypto from 'crypto'

import { prisma } from './prisma'

export type UserRecord = {
  id: string
  name: string
  email: string
  password: string
}

type PasswordResetToken = {
  id: string
  userId: string
  tokenHash: string
  expiresAt: Date
  used: boolean
}

function toUserRecord(user: UserRecord): UserRecord {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password: user.password,
  }
}

export async function getUsers(): Promise<UserRecord[]> {
  const users = await prisma.user.findMany()
  return users.map(toUserRecord)
}

export async function saveUsers(users: UserRecord[]) {
  await prisma.$transaction(
    users.map(user =>
      prisma.user.upsert({
        where: { id: user.id },
        create: {
          id: user.id,
          name: user.name,
          email: user.email.toLowerCase(),
          password: user.password,
        },
        update: {
          name: user.name,
          email: user.email.toLowerCase(),
          password: user.password,
        },
      })
    )
  )
}

export async function findUserByEmail(
  email: string
): Promise<UserRecord | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email.trim().toLowerCase(),
    },
  })

  return user ? toUserRecord(user) : null
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<UserRecord> {
  const normalizedEmail = email.trim().toLowerCase()
  const existing = await findUserByEmail(normalizedEmail)

  if (existing) {
    throw new Error('User already exists')
  }

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      name,
      email: normalizedEmail,
      password: bcrypt.hashSync(password, 10),
    },
  })

  return toUserRecord(user)
}

export async function validateUser(
  email: string,
  password: string
): Promise<UserRecord | null> {
  const user = await findUserByEmail(email)

  if (!user) {
    return null
  }

  const isValid = bcrypt.compareSync(password, user.password)
  return isValid ? user : null
}

export async function createPasswordResetToken(
  userId: string
): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString('hex')
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex')
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 15 * 60 * 1000)

  await prisma.$transaction(async transaction => {
    await transaction.passwordResetToken.deleteMany({
      where: {
        userId,
        OR: [
          { used: true },
          { expiresAt: { lte: now } },
        ],
      },
    })

    await transaction.passwordResetToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
        used: false,
      },
    })
  })

  return rawToken
}

export async function resetPassword(
  rawToken: string,
  newPassword: string
): Promise<boolean> {
  const tokenHash = crypto
    .createHash('sha256')
    .update(rawToken)
    .digest('hex')
  const now = new Date()
  const passwordHash = bcrypt.hashSync(newPassword, 10)

  return prisma.$transaction(async transaction => {
    const token: PasswordResetToken | null =
      await transaction.passwordResetToken.findFirst({
        where: {
          tokenHash,
          used: false,
          expiresAt: { gt: now },
        },
      })

    if (!token) {
      return false
    }

    const user = await transaction.user.findUnique({
      where: { id: token.userId },
    })

    if (!user) {
      return false
    }

    await transaction.user.update({
      where: { id: user.id },
      data: { password: passwordHash },
    })

    await transaction.passwordResetToken.update({
      where: { id: token.id },
      data: { used: true },
    })

    return true
  })
}
