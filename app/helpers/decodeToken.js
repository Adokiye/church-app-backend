import jwtDecode from 'jwt-decode'

export const decodeToken = token => {
  try {
    const decodedToken = jwtDecode(token)
    if (decodedToken.exp < Date.now() / 1000) {
      return { status: false, message: 'expired' }
    }
    return decodedToken
  } catch (error) {
    return { status: false, message: 'invalid' }
  }
}
