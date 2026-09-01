# Деплой

Сайт опубликован на **GitHub Pages**: https://vasilevaxco.github.io/jggl-site/

Источник — ветка `gh-pages`, в её корне лежит содержимое `public/`.
Файл `.nojekyll` отключает обработку Jekyll, чтобы файлы отдавались как есть.

## Обновить сайт

Правки текста — в `build/data.js`. Затем:

```bash
npm run build
git commit -am "правки"
git push origin main
npm run publish
```

`npm run publish` пересобирает `public/` и выталкивает его в корень
ветки `gh-pages` через `git subtree push`. Обновление появляется на сайте
через 30–60 секунд.

## Свой домен

Settings → Pages → Custom domain у репозитория, затем CNAME у регистратора
на `vasilevaxco.github.io`. Сертификат GitHub выпустит сам. После этого
добавь файл `public/CNAME` с доменом, иначе следующий `npm run publish`
сбросит настройку.

## Почему не Render

Render требует привязку банковской карты для верификации личности — даже
для бесплатных статических сайтов. Конфигурация под Render осталась в
`render.yaml` (build `npm run build`, publish `public`), так что при
желании перейти туда достаточно подключить репозиторий и добавить карту.

## Альтернативы без карты

Cloudflare Pages и Netlify тоже бесплатны и не требуют карту, работают с
приватным репозиторием. Обоим достаточно тех же настроек: build command
`npm run build`, output directory `public`.
