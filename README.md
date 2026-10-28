# 08-zustand — NoteHub

Next.js App Router, TypeScript, Axios, TanStack Query, Zustand and CSS Modules.

## Запуск

1. Откройте папку с package.json и выполните `npm install`.
2. Создайте `.env.local` рядом с package.json:

```dotenv
NEXT_PUBLIC_NOTEHUB_TOKEN=ваш_токен_NoteHub
```

Используйте тот же токен, что в предыдущем задании, без слова Bearer.

3. Выполните `npm run dev` и откройте http://localhost:3000.

## Что изменилось

- В RootLayout, странице 404 и странице создания экспортирована типизированная metadata; страницы фильтра и детали используют асинхронную generateMetadata с Promise<Metadata>.
- Каждая страница имеет title, description и Open Graph: title, description, url, images с width, height, alt.
- Данные заметки для SEO и SSR загружаются через fetchNoteById и React cache, чтобы повторно использовать результат в рамках одного серверного рендера.
- Roboto подключен глобально через next/font/google с weight, variable, display, subsets и классом на body.
- Создание перенесено на `/notes/action/create`. Кнопка в списке теперь Link. Модальное окно создания и его состояния удалены; модальное превью деталей сохранено.
- NoteForm использует обычные input/textarea/select, defaultValue и React form action. Formik удален.
- `lib/store/noteStore.ts`: типизированный Zustand create<NoteStore>() с draft, setDraft, clearDraft; persist хранит только draft под ключом `notehub-draft`.
- Черновик обновляется на каждое изменение. После перезагрузки он восстанавливается из localStorage до отображения полей, без рассогласования SSR и клиента.
- Cancel вызывает router.back() и сохраняет draft. Ошибка API сохраняет форму и draft. Успешное создание очищает draft, инвалидирует кеш notes и вызывает router.push('/notes/filter/all').
- Сохранены SSR/CSR, фильтры, поиск с debounce, пагинация, удаление, параллельный sidebar и перехваченный маршрут превью.

API-функции находятся именно в `lib/api.ts` (импорты `@/lib/api`), с учетом замечания предыдущей проверки. Общие типы заметки — в `types/note.ts`.

## Проверка

```bash
npm run build
npm run format:check
```

В процессе подготовки проверены сборка с TypeScript и Roboto, метаданные в HTML готового сервера, фильтры и перехват маршрута. Клиентские проверки подтвердили обновление всех полей draft, сохранение после Cancel, восстановление в новой загрузке страницы, сохранность при ошибке, очистку и переход после успешной отправки. Запросы в этих проверках использовали тестовые ответы API.

Перед сдачей проверьте приложение со своим токеном: создайте и удалите заметку, смените тег, выполните поиск, откройте View details. Введите черновик, нажмите Cancel, вернитесь и обновите страницу — все поля должны сохраниться. Затем создайте заметку — она должна появиться в All notes, а новая форма должна быть пустой с тегом Todo.

## Vercel

Создайте репозиторий `08-zustand`, загрузите содержимое проекта и импортируйте его в Vercel. Оставьте настройки Next.js по умолчанию. До Deploy добавьте `NEXT_PUBLIC_NOTEHUB_TOKEN`. Локальный `.env.local` не загружается в GitHub.

Для Open Graph URL приложение использует NEXT_PUBLIC_SITE_URL, затем VERCEL_PROJECT_PRODUCTION_URL, а локально — разрешенную заданием заглушку https://notehub.com. После первого деплоя можно явно добавить NEXT_PUBLIC_SITE_URL со значением постоянного адреса из Domains (https://ваш-проект.vercel.app) и выполнить Redeploy.

Для сдачи нужны ссылка на репозиторий и постоянный production URL из Domains на Vercel.

Стили GoIT: https://github.com/goitacademy/react-notehub-styles/tree/hw-08. Лицензия — STYLES-LICENSE.
