export interface Photo {
  id: string; // Ідентифікатор
  title: string; // Назва
  author: string; // Автор
  pImage: string; // Посилання на зображення (поки-що шляхи до файлів)
  views: number; // Кількість переглядів
  isPremium: boolean; // Статус Premium
  tags: string[]; // Теги
  uploadDate: Date; // Дата завантаження
}
