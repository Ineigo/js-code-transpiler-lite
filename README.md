# js-code-transpiler-lite
Простой механизм для обновления кодовой базы (например: что-то переименовать или удалить)

## Получить ast дерево в json файлике в папочку astJSON
```bash
node sourceToAstJson.js path_to_file
```
## Получить обновленный файлик в папочку transpiled
```bash
npm start 'glob-mask-to-files' 'name-migration'
```

`name-migration` это файлик в папочке `migrations`, принцип простой можно придумать свои любые видоизменялки. 

Пока доступна только `marionette2to3` производит массовые переименования свойств и методов для перехода от marionette 2.x к 3.x.

