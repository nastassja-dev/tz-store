# TZ Store — Project Instructions

## Контекст

Тестовое задание на стажировку frontend developer.
SPA — каталог продуктов с лайками, удалением, созданием и редактированием.
Деплой обязателен: GitHub Pages.

---

## Стек

| Слой | Технология |
|---|---|
| Язык | TypeScript |
| UI | React 18 |
| Стейт | Redux Toolkit (`createSlice`, `createAsyncThunk`) |
| Роутинг | React Router v6 |
| Форма | react-hook-form |
| Стили | SCSS (modules) |
| Иконки | lucide-react |
| Сборка | Vite |
| Деплой | gh-pages |

**Внешний API:** https://fakestoreapi.com  
Используемые эндпоинты:
- `GET /products` — список продуктов
- `GET /products/:id` — один продукт
- `POST /products` — создание (ответ не сохраняется на сервере, добавляем в store вручную)

---

## Структура папок

```
src/
├── api/
│   └── productsApi.ts        # fetch-функции: getProducts, getProductById, createProduct
│
├── components/
│   ├── Header/
│   │   ├── Header.tsx
│   │   └── Header.module.scss
│   ├── Footer/
│   │   ├── Footer.tsx
│   │   └── Footer.module.scss
│   ├── ProductCard/
│   │   ├── ProductCard.tsx
│   │   └── ProductCard.module.scss
│   ├── ProductGrid/
│   │   ├── ProductGrid.tsx
│   │   └── ProductGrid.module.scss
│   ├── Pagination/
│   │   ├── Pagination.tsx
│   │   └── Pagination.module.scss
│   ├── ImageUpload/           # drag & drop + url-поле
│   │   ├── ImageUpload.tsx
│   │   └── ImageUpload.module.scss
│   └── UI/
│       ├── Button/
│       └── Input/
│
├── pages/
│   ├── ProductsPage/
│   │   ├── ProductsPage.tsx
│   │   └── ProductsPage.module.scss
│   ├── ProductDetailPage/
│   │   ├── ProductDetailPage.tsx
│   │   └── ProductDetailPage.module.scss
│   └── CreateProductPage/     # создание + редактирование
│       ├── CreateProductPage.tsx
│       └── CreateProductPage.module.scss
│
├── store/
│   ├── store.ts               # configureStore
│   ├── hooks.ts               # типизированные useAppDispatch, useAppSelector
│   └── productsSlice.ts       # вся логика продуктов
│
├── types/
│   └── product.ts             # интерфейс Product
│
├── styles/
│   ├── _variables.scss        # токены: цвета, отступы, радиусы
│   ├── _reset.scss
│   └── global.scss
│
├── App.tsx                    # роутер
├── main.tsx
└── vite-env.d.ts
```

---

## Типы

```ts
// types/product.ts

export interface Product {
  id: string | number;
  title: string;
  description: string;
  image: string;
}

// Расширение стора (не приходит с API)
export type FilterType = 'all' | 'liked';
```

---

## Store — productsSlice

```ts
interface ProductsState {
  items: Product[];          // все продукты (API + созданные)
  likedIds: number[];        // id лайкнутых
  filter: FilterType;        // 'all' | 'liked'
  search: string;            // строка поиска (debounce на UI)
  currentPage: number;       // текущая страница пагинации
  status: 'idle' | 'loading' | 'error';
}
```

Экшены:
- `fetchProducts` — `createAsyncThunk`, загрузка с API
- `addProduct(product)` — добавление созданного продукта в `items`
- `updateProduct(product)` — обновление продукта по `id`
- `deleteProduct(id)` — удаление из `items`
- `toggleLike(id)` — добавить/убрать из `likedIds`
- `setFilter(filter)` — переключить фильтр
- `setSearch(query)` — обновить строку поиска
- `setPage(page)` — переключить страницу

---

## Роуты

| URL | Страница | Компонент |
|---|---|---|
| `/products` | Список продуктов | `ProductsPage` |
| `/products/:id` | Детальная страница | `ProductDetailPage` |
| `/products/:id/edit` | Редактирование | `CreateProductPage` (с предзаполнением) |
| `/create-product` | Создание продукта | `CreateProductPage` |
| `*` | Редирект на `/products` | — |

---

## Страницы — структура

### `/products`
- Header (глобальный)
- Сетка карточек: 4 колонки desktop / 3 tablet / 2 small tablet / 1 mobile
- Пагинация: 20 карточек на странице, снизу списка
- Footer (глобальный)

### `/products/:id`
- Двухколоночный layout (`1fr / 1.6fr`): картинка слева, текст справа
- Кнопка «Редактировать» (иконка карандаша) — вверху справа
- Кнопки «Назад к каталогу» и «Сохранить» — выровнены по правому краю, снизу

### `/create-product` и `/products/:id/edit`
- Идентичная структура с `/products/:id`
- Левая колонка: drag & drop зона + поле URL изображения под ней
- Правая колонка: поля формы (Название, Описание)
- Кнопки «Назад к каталогу» и «Сохранить продукт» — по правому краю, снизу
- При `/edit`: заголовок «Редактировать продукт», поля предзаполнены из store по `id`

### Header (глобальный)
- Логотип «TZ Store» — ссылка на `/products`
- Поиск (без кнопки, debounce 300ms) — пишет в store `search`
- Табы фильтра: «Все» / «Избранное»
- Кнопка «+» — ссылка на `/create-product`

### Footer (глобальный)
- Текст: «Developed by [Имя Фамилия]»
- Иконка GitHub → ссылка на профиль
- Иконка LinkedIn → ссылка на профиль

---

## Компонент ProductCard

- Одинаковая высота карточек: `display: grid; grid-template-rows: auto 1fr auto`
- Текст обрезается через `-webkit-line-clamp: 2` (title) и `3` (description)
- Иконка лайка: `Heart` из lucide-react, fill акцентным цветом когда лайк активен
- Иконка удаления: `Trash2` из lucide-react
- Клик по карточке (кроме иконок) → navigate `/products/:id`
- Лайк и удаление не всплывают на карточку: `e.stopPropagation()`

---

## Компонент ImageUpload

- Drag & drop зона: обрабатывает `dragover`, `dragleave`, `drop`
- При drop/выборе файла: `URL.createObjectURL(file)` → превью + значение поля `image`
- URL-поле под зоной: при вводе валидного URL показывает превью
- Оба источника пишут в одно поле формы `image` через `react-hook-form` `setValue`

---

## Дизайн-токены (SCSS variables)

```scss
// styles/_variables.scss

// Цвета
$bg-primary:       #F5F5F0;
$bg-secondary:     #EEEEE8;
$text-primary:     #1A1A18;
$text-secondary:   #6B6B66;
$border-color:     #B0AFA8;
$accent:           #E8C840;   // жёлтый — лайк, активный таб, акцент
$accent-hover:     #C9AC28;

// Радиусы
$radius-sm:  4px;
$radius-md:  8px;
$radius-lg:  12px;

// Отступы
$spacing-xs:  4px;
$spacing-sm:  8px;
$spacing-md:  16px;
$spacing-lg:  24px;
$spacing-xl:  40px;

// Типографика
$font-family:    'Inter', sans-serif;
$font-size-xs:   11px;
$font-size-sm:   12px;
$font-size-md:   14px;
$font-size-lg:   18px;
$font-size-xl:   24px;

// Переходы
$transition: 150ms ease;

// Иконки
$icon-stroke: 1.5px;
```

---

## Использование акцентного цвета

`$accent` применяется **только** в трёх местах:
1. Активный лайк на карточке (fill иконки сердца)
2. Активный таб фильтра (фон или подчёркивание)
3. Primary-кнопка (опционально — можно оставить тёмной)

Нигде больше — иначе акцент теряет вес.

---

## Дизайн-принципы

- Монохромный флэт: белый + почти-чёрный, один акцент
- Все бордеры: `1px solid $border-color`
- Никаких теней (`box-shadow: none`), кроме focus-ring на инпутах
- Иконки только outline, stroke 1.5px, библиотека lucide-react
- Шрифт Inter (подключить через Google Fonts или `@fontsource/inter`)

---

## Деплой — GitHub Pages

```ts
// vite.config.ts
export default defineConfig({
  // ВАЖНО: имя репозитория точь-в-точь
  base: '/название-репозитория/',
  plugins: [react()],
})
```

```json
// package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

При использовании React Router + GitHub Pages нужен `404.html` редирект —
скопировать `dist/index.html` в `dist/404.html` после сборки,
или использовать плагин `vite-plugin-single-spa`.

---

## Порядок разработки

1. Инициализация Vite + зависимости + структура папок
2. SCSS-токены + глобальные стили + reset
3. Store: `productsSlice` со всеми экшенами и типами
4. API-слой: `productsApi.ts`
5. Header + Footer компоненты
6. `ProductCard` + `ProductGrid`
7. `ProductsPage`: fetch, фильтр, поиск, пагинация
8. `ProductDetailPage`
9. `CreateProductPage` + `ImageUpload` (создание)
10. `CreateProductPage` в режиме редактирования (`/products/:id/edit`)
11. Деплой: настройка `vite.config.ts` + `gh-pages`
