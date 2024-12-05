export interface Service {
  id?: string; // ID của dịch vụ (không bắt buộc, vì khi tạo mới có thể chưa có)
  hotel_id: string; // ID khách sạn liên kết với dịch vụ
  name: string; // Tên dịch vụ
  price: number; // Giá dịch vụ
  description: string; // Mô tả dịch vụ
  service_type: string; // Loại dịch vụ
  available: boolean; // Trạng thái khả dụng
  time_range?: string | null; // Thời gian hoạt động (không bắt buộc)
  created_at?: string; // Thời điểm tạo (không bắt buộc)
  updated_at?: string; // Thời điểm cập nhật (không bắt buộc)
}
