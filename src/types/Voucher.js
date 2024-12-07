export interface Voucher {
  id?: string; // ID of the voucher (optional for new vouchers)
  code: string; // Unique code for the voucher
  description: string; // Description of the voucher
  discount_amount: number; // Fixed discount amount
  discount_percentage: number; // Percentage discount
  max_discount_amount: number; // Maximum discount limit
  min_spend_amount: number; // Minimum spend amount required to use the voucher
  start_date: string; // Start date of the voucher's validity
  end_date: string; // End date of the voucher's validity
  usage_limit: number; // Maximum number of uses for the voucher
  status: string; // Status of the voucher (e.g., "active" or "inactive")
  created_at?: string; // Timestamp when the voucher was created (optional)
  updated_at?: string; // Timestamp when the voucher was last updated (optional)
}
