import Entity from './Entity'

export default interface Order extends Entity{
  customer: number,
  items: number[],
  status: string,
  total: number,
  created_at: string,
}
