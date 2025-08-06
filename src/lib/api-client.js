export const AUTH_ROUTE = "api/auth"
export const CONTACT_ROUTE = "api/contacts"
export const MESSAGE_ROUTE = "api/messages"
export const CHANNEL_ROUTE = "api/channel"

export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`
export const USER_INFO = `${AUTH_ROUTE}/user-info`
export const UPDATE_PROFILE = `${AUTH_ROUTE}/update-profile`
export const ADD_PROFILE_IMAGE = `${AUTH_ROUTE}/add-profile-image`
export const REMOVE_PROFILE = `${AUTH_ROUTE}/remove-profile-image`
export const LOGOUT = `${AUTH_ROUTE}/logout`

export const SEARCH_CONTACT = `${CONTACT_ROUTE}/search`
export const GET_DM_CONTACTS = `${CONTACT_ROUTE}/get-contacts`
export const GET_ALL_CONTACTS = `${CONTACT_ROUTE}/get-all-contacts`


export const UPLOAD_FILE = `${MESSAGE_ROUTE}/upload-file`
export const GET_MESSAGES = `${MESSAGE_ROUTE}/get-messages`

export const CREATE_CHANNEL = `${CHANNEL_ROUTE}/create-channel`
export const GET_CHANNELS = `${CHANNEL_ROUTE}/get-users-channels`
export const GET_CHANNEL_MESSAGES = `${CHANNEL_ROUTE}/get-channel-messages`