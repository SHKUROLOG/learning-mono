# LEARNING-MONO
## https://syntax.fun/

### Данный сайт позволяет пройти тестирование на знание языков программирования/технологий 
### Выбери интересующий тебя раздел, и пройди тестирование на знание

![image](https://user-images.githubusercontent.com/75541723/205600762-e1d3fbc8-3ffd-4745-b46f-e26b4c817b92.png)

![image](https://user-images.githubusercontent.com/75541723/205601213-9c42a5ec-25d4-4e97-9a9c-44454061de82.png)


## Проект представляет собой Single Page Application, так же является монорепозиторием, в процессе разработки ипользовал систему сборки Nx + Nrwl

## Стек технологий используемый в проекте

### FRONTEND
- Vue-TS
- HTML
- CSS

### BACKEND
- Node.js
- PostgreSQL
- Express
- Axios
- Prisma
- Docker
- Nginx

## Запуск:
- Необходимо запустить команду "prisma-generate" и сгенерировать схему Prisma (команда по запуску в корне папки backend в файле project.json)
- Так же нужно создать .env переменную в корне проекта в которую записать следующие строки с своими значениями 

 ```
VITE_SERVER_URL=http://localhost:3030
BUILDKIT_PROGRESS=plain
DATABASE_URL=postgres://user:password@port:5432/dbname?schema=learning
CLIENT_URL=http://localhost:3000
 ```


## Планы на будующее:
- [X] CI/CD
- [ ] Добавить анимаций
- [ ] Переписать CSS на SCSS
- [ ] Авторизация
- [ ] Аутентификация
- [ ] Регистрация
- [ ] Прогресс прохождения тестов пользователя
- [ ] Возможность предложить свой вопрос с ответами через форму




