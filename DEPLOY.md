# Деплой на Render

Репозиторий уже подготовлен: сделан коммит, добавлены `.gitignore` и
`render.yaml`, файлы сайта лежат в `public/`.

Осталось три шага. Первые два требуют входа в аккаунт, поэтому их
нужно сделать самому — пароли и регистрацию за тебя я не ввожу.

## 1. Аккаунт GitHub

Если аккаунта ещё нет — https://github.com/signup (2 минуты).

Затем авторизовать CLI (уже установлен, `gh 2.98.0`):

```bash
gh auth login
```

Выбирай: `GitHub.com` → `HTTPS` → `Login with a web browser`.

## 2. Залить репозиторий

Одной командой из папки проекта:

```bash
cd ~/jggl-site && gh repo create jggl-site --private --source=. --remote=origin --push
```

`--private` можно заменить на `--public`. Render одинаково работает с обоими,
приватный просто требует подключения GitHub-аккаунта (шаг 3 это и делает).

## 3. Render

Открыть https://dashboard.render.com/static/new и подключить репозиторий
`jggl-site`. Значения полей:

| Поле              | Значение        |
|-------------------|-----------------|
| Name              | `jggl-site`     |
| Branch            | `main`          |
| Root Directory    | *(пусто)*       |
| Build Command     | `npm run build` |
| Publish Directory | `public`        |

Дальше **Create Static Site**. Первая сборка — меньше минуты: зависимостей
нет, `npm run build` только рендерит `public/index.html` из `build/data.js`.

Сайт появится на `https://jggl-site.onrender.com` (или на том имени,
которое задашь в Name).

### Вместо ручной формы

В репозитории лежит `render.yaml`, поэтому можно вместо формы завести
Blueprint: https://dashboard.render.com/blueprints → **New Blueprint
Instance** → выбрать репозиторий. Тогда все настройки, включая заголовки
кеширования, подтянутся из файла.

## Дальше

Каждый `git push` в `main` пересобирает и публикует сайт автоматически.
Правки текста — в `build/data.js`, затем:

```bash
npm run build && git commit -am "текст" && git push
```

## Свой домен

Render → сервис → **Settings** → **Custom Domains** → добавить домен,
затем прописать у регистратора CNAME на выданный Render адрес.
Сертификат Render выпустит сам.
