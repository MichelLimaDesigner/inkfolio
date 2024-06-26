import { createSlice } from '@reduxjs/toolkit'
import { IProfile, initialState } from '../../types/profile.types'

export const slice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    changeProfile(state, { payload }) {
      return {
        ...state,
        user_id: payload.user_id,
        name: payload.name,
        phone: payload.phone,
        bio: payload.bio,
        tattoo_styles: payload.tattoo_styles,
        avatar: payload.avatar,
        address: payload.address,
        profile_cover: payload.profile_cover,
        profile_url: payload.profile_url,
        redes: payload.redes,
      }
    },
    removeProfile() {
      return {
        ...initialState,
      }
    },
  },
})

export const { changeProfile, removeProfile } = slice.actions

export const selectProfile = (state: { profile: IProfile }) => state.profile

export default slice.reducer
