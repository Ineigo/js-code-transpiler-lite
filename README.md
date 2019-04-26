# js-code-transpiler-lite
Простой механизм для обновления кодовой базы (например: что-то переименовать или удалить)

## Получить ast дерево в json файлике в папочку astJSON
```bash
node sourceToAstJson.js path_to_file
```
## Получить обновленный файлик в папочку transpiled
```bash
npm start 'glob-mask-to-files' 'name-migration' ['exclude-regexp']
// or
node index 'glob-mask-to-files' 'name-migration' ['exclude-regexp']

// Example
node index './project/src/**/*.js' marionette3to4
```

`name-migration` это файлик в папочке `migrations`, принцип простой можно придумать свои любые видоизменялки. 

## Миграции

- `marionette2to3` производит массовые переименования свойств и методов для перехода от marionette 2.x к 3.x.
- `marionette3to4` производит массовые переименования свойств и методов для перехода от marionette 3.x к 4.x.
