# Деплой

Сайт: **https://jgglentertainment.github.io/**

Репозиторий: https://github.com/jgglentertainment/jgglentertainment.github.io
(организация `jgglentertainment`, публичный — на бесплатном плане GitHub
Pages иначе не работает).

Устройство: ветка `main` — исходники, ветка `gh-pages` — собранный сайт в
корне, оттуда Pages его и раздаёт. Файл `.nojekyll` отключает обработку
Jekyll, иначе GitHub подменяет сайт отрендеренным README.

## Обновить сайт

Правки текста — в `build/data.js`. Затем:

```bash
cd ~/jggl-site && npm run build && git commit -am "правки" && git push origin main && npm run publish
```

`npm run publish` пересобирает `public/` и выталкивает его в корень ветки
`gh-pages`. Изменения появляются на сайте через 30–60 секунд.

## Свой домен

Если появится купленный домен (например `jgglentertainment.ai`):

1. Settings → Pages → Custom domain у репозитория
2. У регистратора — четыре A-записи на `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`, и CNAME `www` →
   `jgglentertainment.github.io`
3. Положить файл `public/CNAME` с доменом, иначе следующий `npm run publish`
   собьёт настройку
4. На Cloudflare проксирование выключить (серое облако), иначе GitHub не
   выпустит сертификат

## Старый адрес

`https://vasilevaxco.github.io/jggl-site/` пока продолжает работать — это
первый вариант деплоя. Репозиторий подключён как remote `old-jggl-site`.
Чтобы выключить: Settings → Pages → Unpublish site, либо удалить там ветку
`gh-pages`.

## Почему не Render

Render требует привязку банковской карты даже под бесплатную статику.
`render.yaml` оставлен в репозитории: build `npm run build`, publish `public`.
Те же настройки подойдут для Cloudflare Pages и Netlify — они бесплатны и
карту не требуют.
