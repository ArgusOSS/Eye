const BASE_URL = `http://${process.env.NEXT_PUBLIC_API_URL}`

const AUTH_URL = `${BASE_URL}/authentication`
const LOGIN_URL = `${AUTH_URL}/login`
const LOGOUT_URL = `${AUTH_URL}/logout`
const REGISTER_URL = `${AUTH_URL}/register`

const ME_URL = `${AUTH_URL}/me`
