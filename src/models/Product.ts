import Entity from './Entity'

export default interface Product extends Entity{
  price: number,
  image: string,
  created_at: Date,
  name: string,
  description: string,
  category: string,
  size: string,
}
