import { atom } from 'recoil'

export type MemberStatus = 'gold' | 'silver' | 'bronze' | 'none'

export type User = {
  id: number
  name: string
  email: string
  memberStatus: MemberStatus
}

export const userState = atom<User>({
  key: 'user',
  default: {
    id: 1,
    name: '平野紫耀',
    email: 'sho@gmail.com',
    memberStatus: 'none',
  },
})
