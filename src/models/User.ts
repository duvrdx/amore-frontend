import Entity from './Entity'

export default interface User extends Entity{
  first_name: string,
  last_name: string,
  email: string,
  username: string,
  phone: string,
  password: string,
  zip_code: string,
  house_number: number
}
