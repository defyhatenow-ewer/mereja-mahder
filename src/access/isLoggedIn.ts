import { AccessArgs } from 'payload'
import { User } from '../payload-types'

type LoggedIn = (args: AccessArgs<User>) => boolean

export const isLoggedIn: LoggedIn = ({ req: { user } }) => {
  // Return true if user is logged in, false if not
  return Boolean(user)
}
