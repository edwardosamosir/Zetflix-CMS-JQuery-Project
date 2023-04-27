# Zetflix API Documentation

## Endpoints:

List of available endpoints:

- `POST users/register`
- `POST users/login`
- `POST users/login-with-google`
- `POST /movies`
- `GET /movies`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `GET /genres`
- `POST /genres`
- `DELETE /genres/:id`

## POST users/register

### Description

- Create new user with role Admin  to system

### Request

- Body
  ```json
  {
    "username": "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address": "string"
  }
  ```

### Responses:

_201 - Created_

```json
{
  "id": "integer",
  "email": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

_400 - Bad Request_

```json
{
  "message": "Username is required!" 
}
OR
{
  "message": "Username already exists, please use another username!"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Email format is not valid!"
}
OR
{
  "message": "Email is already used, please use another email!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password length min are 5 characters!"
}
```

## POST users/login

### Description

- Log in to application using user's email and password

### Request

- Body
  ```json
  {
    "email" : "string",
    "password" : "string"
  }
  ```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid email or password "
}
```

## POST users/login-with-google

### Description

- Create User and Log in to application using user's google account(social media)

### Request

- Headers

```json
{
  "google_access_token": "<user_google_access_token>"
}
```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_201 - Created_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

## POST /movies

### Description

- Create new movie to database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```
- user

```json
{
  "authorId": "integer"
}
```
- body

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
}
```

### Responses:

_(201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "synopsis": "string",
  "imgUrl": "string",
  "trailerUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer",
  "updatedAt": "date",
  "createdAt": "date",
  "message": "Succesfully Added <movie_title> Movie!"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Title is Required"
}
OR
{
  "message": "Synopsis is Required"
}
OR
{
  "message": "Rating is Required"
}
OR
{
  "message": "Minimum Rating 1"
}
```


## GET /movies

### Description

- Get all movies from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
    {
        "id": 7,
        "title": "3 Idiots",
        "synopsis": "Rascal. Joker. Dreamer. Genius... You've never met a college student quite like Rancho..........",
        "trailerUrl": "https://www.youtube.com/watch?v=xvszmNXdM4w",
        "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/66A9MqXOyVFCssoloscw79z8Tew.jpg",
        "rating": 8,
        "genreId": 1,
        "authorId": 25,
        "createdAt": "2023-03-19T17:31:11.908Z",
        "updatedAt": "2023-03-19T17:31:11.908Z",
        "author": {
            "id": 25,
            "username": "smintyn",
            "email": "schiddyn@kickstarter.com",
            "role": "Staff",
            "phoneNumber": "4581447450",
            "address": "07133 Lakewood Court",
            "createdAt": "2023-03-19T17:31:10.062Z",
            "updatedAt": "2023-03-19T17:31:10.062Z"
        },
        "Genre": {
            "id": 1,
            "name": "Comedy",
            "createdAt": "2023-03-19T17:31:11.651Z",
            "updatedAt": "2023-03-19T17:31:11.651Z"
        }
    }
    ....
]
```


## Get /movies/:id

### Description

- Get a movie by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
[
  {
        "id": 1,
        "title": "Avengers: Infinity War",
        "synopsis": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle....",
        "trailerUrl": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        "rating": 8,
        "genreId": 11,
        "authorId": 1,
        "createdAt": "2023-03-19T17:31:11.908Z",
        "updatedAt": "2023-03-19T17:31:11.908Z",
        "author": {
            "id": 1,
            "username": "edwardosamosir",
            "email": "edwardosamosir@gmail.com",
            "role": "Admin",
            "phoneNumber": "81200009999",
            "address": "882 Fremont Trail",
            "createdAt": "2023-03-19T17:31:04.332Z",
            "updatedAt": "2023-03-19T17:31:04.332Z"
        },
        "Genre": {
            "id": 11,
            "name": "Science Fiction",
            "createdAt": "2023-03-19T17:31:11.651Z",
            "updatedAt": "2023-03-19T17:31:11.651Z"
        }
    }
]
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## Delete /movies/:id

### Description

- Delete a movie by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
{
  "message": "Successfully Removed <movie_title> Movie."
}
```

_(403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## GET /genres

### Description

- Get all movie genres from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
  {
        "id": 6,
        "name": "Action",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 2,
        "name": "Adventure",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 12,
        "name": "Animation",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 1,
        "name": "Comedy",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    }
  ...
]
```

## POST /genres

### Description

- Create new a movie genre to database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string"
}
```

### Responses:

_(201 - Created)_

```json
{
  "name": "string",
  "message": "Succesfully Added <genre_name> Genre!"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Genre is required!"
}
```

## Delete /genres/:id

### Description

- Delete a genre by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
{
  "message": "Successfully Removed <genre_name> Genre."
}
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## Global Error

### Responses:
_(500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}