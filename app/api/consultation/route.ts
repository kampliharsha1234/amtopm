import { NextResponse } from 'next/server'
import { sendConsultationEmails } from '@/lib/email/consultation'

export async function POST(request: Request) {
try {
const body = await request.json()


const {
  name,
  phone,
  email,
  age,
  gender,
  problem,
  description,
} = body

if (
  !name ||
  !phone ||
  !email ||
  !age ||
  !gender ||
  !problem ||
  !description
) {
  return NextResponse.json(
    {
      success: false,
      error: 'Please fill in all required fields.',
    },
    { status: 400 }
  )
}

const cleanName = String(name).trim()
const cleanPhone = String(phone).trim()
const cleanEmail = String(email).trim().toLowerCase()
const cleanAge = String(age).trim()
const cleanGender = String(gender).trim()
const cleanProblem = String(problem).trim()
const cleanDescription = String(description).trim()

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if (!emailRegex.test(cleanEmail)) {
  return NextResponse.json(
    {
      success: false,
      error: 'Please enter a valid email address.',
    },
    { status: 400 }
  )
}

const numericAge = Number(cleanAge)

if (
  !Number.isInteger(numericAge) ||
  numericAge < 13 ||
  numericAge > 100
) {
  return NextResponse.json(
    {
      success: false,
      error: 'Please enter a valid age between 13 and 100.',
    },
    { status: 400 }
  )
}

await sendConsultationEmails({
  name: cleanName,
  phone: cleanPhone,
  email: cleanEmail,
  age: numericAge,
  gender: cleanGender,
  problem: cleanProblem,
  description: cleanDescription,
})

return NextResponse.json(
  {
    success: true,
    message: 'Consultation request submitted successfully.',
  },
  { status: 200 }
)


} catch (error) {
console.error('Consultation API error:', error)


const message =
  error instanceof Error
    ? error.message
    : 'Unknown server error.'

return NextResponse.json(
  {
    success: false,
    error: `Unable to submit your consultation request. ${message}`,
  },
  { status: 500 }
)


}
}
