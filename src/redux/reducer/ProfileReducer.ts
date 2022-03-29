import {SET_POST, SET_PROFILE, SET_STATUS} from "../action-type";
import {profileAPI} from "../../api/api";

interface PostDataType {
  id: number
  message: string
  author: string
  like: number
}

interface ProfileType {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
  }
  photos: {
    small: string | null
    large: string | null
  }
}

interface InitialStateType {
  postData: Array<PostDataType>
  profile: ProfileType | null
  defaultPostText: string
  defaultCountLike: number
  status: string | number
}

interface SetProfileAC {
  type: typeof SET_PROFILE
  profile: ProfileType
}

interface SetPostAC {
  type: typeof SET_POST
  postText: string
  countLike: number
}

interface SetStatusAC {
  type: typeof SET_STATUS
  status: string
}

type ActionsType = SetProfileAC | SetPostAC | SetStatusAC

const initialState: InitialStateType = {
  postData: [
    {id: 1, message: "This is my first post", author: "Benedict Cumberbatch", like: 23},
    {id: 2, message: "My favorite actor is Will Smith", author: "James McAvoy", like: 5},
    {id: 3, message: "This is a test web page", author: "Daniel Radcliffe", like: 10}
  ],
  profile: null,
  defaultPostText: 'Enter new post',
  defaultCountLike: 0,
  status: 'enter your status',
}

export const profileReducer = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case SET_POST:
      let post = {
        id: state.postData[state.postData.length - 1].id + 1,
        message: action.postText,
        author: "Indefinite author",
        like: action.countLike
      }
      return {
        ...state,
        postData: [...state.postData, post],
      }
    case SET_PROFILE:
      return {
        ...state,
        profile: {...action.profile}
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
      return {...state}
  }
}

export const getProfileTC = (currentId: number) => (dispatch: Function) => {
  profileAPI.getProfile(currentId)
    .then(data => {
      dispatch(setProfileAC(data))
    })
  profileAPI.getStatus(currentId).then(data => data.status === 200 && dispatch(setStatusAC(data.data)))
};

export const updateStatusTC = (status: string) => (dispatch: Function) => {
  profileAPI.setStatus(status).then(data => {
    data.resultCode === 0 ? dispatch(setStatusAC(status)) : console.error('Error status')
  })
}

const setProfileAC = (profile: ProfileType): SetProfileAC => ({
  type: SET_PROFILE,
  profile
})

export const setPostAC = (postText: string, countLike: number): SetPostAC => ({
  type: SET_POST,
  postText,
  countLike,
})

export const setStatusAC = (status: string): SetStatusAC => ({
  type: SET_STATUS,
  status
})

