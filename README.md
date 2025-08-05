# Read Journey

Read Journey — це сучасний веб-застосунок для відстеження особистого прогресу у читанні книг. Користувач може додавати книги до своєї бібліотеки, починати та зупиняти читання, бачити деталі сесій читання у вигляді щоденника або графіка, а також переглядати рекомендовані книги.

## Макет

- [Figma](https://www.figma.com/design/z2FwJzJCBVG2bwneJs3JNH/ReadJourney--Copy-?node-id=18710-2376&t=8a8vCeq7bRzyRpV9-0)

## Технічне завдання

- [ТЗ](https://docs.google.com/spreadsheets/d/1_f4IZzXDs6QhQq3mOCOMktYasPW1XphdTO82rdrkyW8/edit?gid=1060862504#gid=1060862504)

## Live (GitHub Pages)

- (aishchuk22.github.io/read-journey/)

## Технології

- **React 19**
- **Vite** — збірка
- **React Router v7**
- **Redux Toolkit** — глобальний state management
- **Axios** — HTTP-запити
- **Yup + React Hook Form** — валідація форм
- **React Hot Toast** — повідомлення про помилки/успіх
- **Recharts & Victory** — графіки прогресу
- **CSS Modules + modern-normalize**

## Запуск локально

```bash
git clone https://github.com/ТВІЙ_НІК/read-journey.git
cd read-journey
npm install
npm run dev
```

## Backend API

- (https://readjourney.b.goit.study/api-docs/)

## Технічне завдання

📱 Адаптивність - Mobile (320px+ — гумова, 375px+ — адаптивна) - Tablet (768px+) - Desktop (1440px+)

🧠 ФУНКЦІОНАЛ
🧾 Головні сторінки

- /register — Реєстрація
- /login — Логін
- /recommended — Рекомендовані книги
- /library — Моя бібліотека
- /reading/:{bookId} — Сторінка читання

📌 Основні компоненти

- Register/Login — форми з валідацією через Yup + React Hook Form
- Dashboard — універсальна панель з контекстним вмістом залежно від сторінки
- Header — лого, навігація, бургер-меню для mobile/tablet, UserBar
- RecommendedBooks — серверна пагінація, картки книг, модалка з деталями
- MyLibraryBooks — фільтр по статусу, картки книг, модалка з кнопкою "Start reading"
- ReadingDashboard — форма з кнопкою To start/To stop, графік або щоденник
- ProgressSection / DetailsSection — прогрес читання, індикатори, статистика, сесії
- CompletionModal — модалка з повідомленням про завершене читання

⚠️ Обробка помилок
Усі помилки з backend'а обробляються через toast'и (react-hot-toast)
Помилки валідації — inline під полем

## Структура проекту

src/
├── assets/ # іконки, картинки
├── components/ # всі компоненти
│ └── ReadingDashboard/
├── pages/ # сторінки (RegisterPage, ReadingPage, etc)
├── redux/ # слайси, операції, селектори
├── routes/ # роутинг, приватні маршрути
├── styles/ # глобальні стилі, змінні
├── validation/ # yup-схеми
└── main.jsx
