import Entity from './Entity'

export default interface Cart extends Entity{
  customer: number,
  items: number[],
}
