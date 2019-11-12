export interface User {
  id: number
  group_id: number
  created_at: Date
  uploaded_at: Date
  created_in: string
  email: string,
  firstname: string
  lastname: string
  store_id: number
  website_id: number
  addresses: any[],
  disable_auto_group_change: number
  extension_attributes: object
}