# UI Component Library

Thư viện components UI cho ứng dụng Knowledge Graph, được xây dựng trên nền tảng React, Tailwind CSS và shadcn/ui.

## Cài đặt

```bash
# Từ thư mục gốc của monorepo
npm install -D @your-org/ui
```

## Cấu trúc

- `src/`: Mã nguồn của các components
- `dist/`: Mã đã được biên dịch (tạo ra sau khi build)
- `types/`: Type definitions

## Sử dụng

### Import components

```tsx
import { Button, Card, EntityCard } from '@your-org/ui';

function MyComponent() {
  return (
    <Card>
      <EntityCard 
        id="1"
        name="Example Entity"
        type="Person"
        properties={[
          { key: 'name', value: 'John Doe' },
          { key: 'age', value: 30 }
        ]}
      />
      <Button>Chi tiết</Button>
    </Card>
  );
}
```

## Components

Thư viện cung cấp các component chính sau:

### Layout Components

- **AppLayout**: Layout chính của ứng dụng với sidebar, navbar và content area
- **SidebarMenu, SidebarMenuItem**: Menu điều hướng bên trái

### Data Display Components

- **EntityCard**: Hiển thị thông tin về một entity trong graph
- **ResultCard**: Hiển thị kết quả truy vấn tri thức
- **StatisticCard**: Hiển thị thông tin thống kê dạng card
- **EmptyState**: Hiển thị trạng thái trống khi không có dữ liệu

### Activity & Notification Components

- **RecentActivityItem**: Hiển thị hoạt động gần đây
- **NotificationItem**: Hiển thị thông báo

### User Interface Components

- **SearchBar**: Thanh tìm kiếm với lịch sử và gợi ý
- **UserDropdown**: Dropdown menu cho người dùng
- **ConfirmDialog**: Hộp thoại xác nhận các hành động

### Ontology Components

- **OntologyGraph**: Trực quan hóa cấu trúc ontology
- **ClassDetails**: Hiển thị và chỉnh sửa chi tiết class

### Re-exported từ shadcn/ui

- Button
- Card
- Input
- NavigationMenu
- Table
- Tabs
- ...và nhiều components khác

## Thiết lập Shadcn/UI

Để sử dụng đầy đủ các components từ shadcn/ui, bạn cần cài đặt chúng vào dự án của mình:

```bash
# Khởi tạo shadcn UI trong dự án
npx shadcn-ui@latest init

# Cài đặt các components cần thiết
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
# ... và các components khác
```

## Phát triển

### Cài đặt dependencies

```bash
npm install
```

### Build thư viện

```bash
npm run build
```

### Phát triển với watch mode

```bash
npm run dev
```

## License

MIT
