# Node-CRUD restful
NodeJS Users CRUD, with expressJS and mongoDB.

## Resources

- Node.Js
- AWS Cognito
- Express.Js
- MongoDb
- Mongoose
- Postman
- BodyParser

## Routes

|          ROUTE            |       HTTP        |      DESCRIPTION      | 
| ------------------------- | ----------------- | --------------------- | 
| /api/                     |       GET         | Main page             | 
| /api/users                |       GET         | Show all user         | 
| /api/users                |       POST        | New User and Sing Up  | 
| /api/users/:user_id       |       GET         | Show by id            | 
| /api/users/:user_id       |       PUT         | Update user by id     |    
| /api/users/:user_id       |       DELETE      | Delete user by id     |
| /api/login                |       POST        | Login, generate Token |
| /api/singUp               |       POST        | Sing Up Cognito       |


* For easy testing , when a user is created they automatically register in cognito. Without validation.

## Running

```
npm install
```
Then run API with:
```
npm run dev
```
## Examples 

Create user // Sing up Cognito :

       {
       
       "email":"daniel.avila@rottay.com",
       "password":"Colpix2019!",
       "name":"Daniel Avila",
       "nickname":"davila",
       "supervisorId":"5da780d626e00fd730c7fe3b"
       
       } 

Login :

       {
       
       "email":"daniel.avila@rottay.com",
       "password":"Colpix2019!"
         
       } 

Show token on terminal .

Token example :

eyJraWQiOiI4TjQ1czErSW5Rd3kxb2pMVHJxV0xLbnBrZ1QwbE1kNVdOdkJsUzdKdXdrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmQ5NjE0OS03NzE5LTQ2MTMtYjUxMi04ODliMTgzMmQyM2EiLCJldmVudF9pZCI6IjcwNmE3MTFlLWRmNTMtNDUyNS1hMzA5LTdjZGRiMzNkMWQxZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzEzNDA3NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdjU0NmUzE3YyIsImV4cCI6MTU3MTM0NDM3OSwiaWF0IjoxNTcxMzQwNzc5LCJqdGkiOiIzZTJjNzMxMS1iYTRlLTQ4NGQtYTlkNi1kNDM2MWM0ZmEwMjUiLCJjbGllbnRfaWQiOiI3cnU3bmRwcW0yOTZzOWxtcmU3aGlxNWtmMiIsInVzZXJuYW1lIjoiYXNhZGFxcWFzZGFAZ21haWwuY29tIn0.JP0aJkvAr9i3XsgoYRBgL2KHez9fN0vnkwxcxWFPjFt0n3__L-7Xc4JcDcS0xWstSsgktjS_-WqLQphLuGHDzXqrSckXkQAF7Io14T9W0Ewcr3rmDmjsmTLGLiNGdO7TD7pVTquJu-uSXSN9hn_4ECpEDjqRYgeUi28Y0jgd51xJFrSAZQCxqcPioQoT_Bj4PAQMSNGg-toeuRzXrRizQb069dnMm_ZkWmkUXBYO7FHLt-DZbvoyDK32lnVcOCGTVgKOX0h-2sdJi2oQlZ1dE1b5ofTbDkpNzTtjC-5boXYAZ5HJNtTYQ6dfH3m6qcCYI-W41-m71cIlfzF-4CkEuw

--------------------------------------------------------------------------------------------------------------------------

GET - {ID}

/api/users/5da8c1680d72321e98772e5e?token=eyJraWQiOiI4TjQ1czErSW5Rd3kxb2pMVHJxV0xLbnBrZ1QwbE1kNVdOdkJsUzdKdXdrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmQ5NjE0OS03NzE5LTQ2MTMtYjUxMi04ODliMTgzMmQyM2EiLCJldmVudF9pZCI6IjcwNmE3MTFlLWRmNTMtNDUyNS1hMzA5LTdjZGRiMzNkMWQxZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzEzNDA3NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdjU0NmUzE3YyIsImV4cCI6MTU3MTM0NDM3OSwiaWF0IjoxNTcxMzQwNzc5LCJqdGkiOiIzZTJjNzMxMS1iYTRlLTQ4NGQtYTlkNi1kNDM2MWM0ZmEwMjUiLCJjbGllbnRfaWQiOiI3cnU3bmRwcW0yOTZzOWxtcmU3aGlxNWtmMiIsInVzZXJuYW1lIjoiYXNhZGFxcWFzZGFAZ21haWwuY29tIn0.JP0aJkvAr9i3XsgoYRBgL2KHez9fN0vnkwxcxWFPjFt0n3__L-7Xc4JcDcS0xWstSsgktjS_-WqLQphLuGHDzXqrSckXkQAF7Io14T9W0Ewcr3rmDmjsmTLGLiNGdO7TD7pVTquJu-uSXSN9hn_4ECpEDjqRYgeUi28Y0jgd51xJFrSAZQCxqcPioQoT_Bj4PAQMSNGg-toeuRzXrRizQb069dnMm_ZkWmkUXBYO7FHLt-DZbvoyDK32lnVcOCGTVgKOX0h-2sdJi2oQlZ1dE1b5ofTbDkpNzTtjC-5boXYAZ5HJNtTYQ6dfH3m6qcCYI-W41-m71cIlfzF-4CkEuw


GET - ALL

/api/users/?token=eyJraWQiOiI4TjQ1czErSW5Rd3kxb2pMVHJxV0xLbnBrZ1QwbE1kNVdOdkJsUzdKdXdrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmQ5NjE0OS03NzE5LTQ2MTMtYjUxMi04ODliMTgzMmQyM2EiLCJldmVudF9pZCI6IjcwNmE3MTFlLWRmNTMtNDUyNS1hMzA5LTdjZGRiMzNkMWQxZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzEzNDA3NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdjU0NmUzE3YyIsImV4cCI6MTU3MTM0NDM3OSwiaWF0IjoxNTcxMzQwNzc5LCJqdGkiOiIzZTJjNzMxMS1iYTRlLTQ4NGQtYTlkNi1kNDM2MWM0ZmEwMjUiLCJjbGllbnRfaWQiOiI3cnU3bmRwcW0yOTZzOWxtcmU3aGlxNWtmMiIsInVzZXJuYW1lIjoiYXNhZGFxcWFzZGFAZ21haWwuY29tIn0.JP0aJkvAr9i3XsgoYRBgL2KHez9fN0vnkwxcxWFPjFt0n3__L-7Xc4JcDcS0xWstSsgktjS_-WqLQphLuGHDzXqrSckXkQAF7Io14T9W0Ewcr3rmDmjsmTLGLiNGdO7TD7pVTquJu-uSXSN9hn_4ECpEDjqRYgeUi28Y0jgd51xJFrSAZQCxqcPioQoT_Bj4PAQMSNGg-toeuRzXrRizQb069dnMm_ZkWmkUXBYO7FHLt-DZbvoyDK32lnVcOCGTVgKOX0h-2sdJi2oQlZ1dE1b5ofTbDkpNzTtjC-5boXYAZ5HJNtTYQ6dfH3m6qcCYI-W41-m71cIlfzF-4CkEuw


UPDATE

api/users/5da8cb1275bac422a2e82b45?token=eyJraWQiOiI4TjQ1czErSW5Rd3kxb2pMVHJxV0xLbnBrZ1QwbE1kNVdOdkJsUzdKdXdrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmQ5NjE0OS03NzE5LTQ2MTMtYjUxMi04ODliMTgzMmQyM2EiLCJldmVudF9pZCI6IjcwNmE3MTFlLWRmNTMtNDUyNS1hMzA5LTdjZGRiMzNkMWQxZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzEzNDA3NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdjU0NmUzE3YyIsImV4cCI6MTU3MTM0NDM3OSwiaWF0IjoxNTcxMzQwNzc5LCJqdGkiOiIzZTJjNzMxMS1iYTRlLTQ4NGQtYTlkNi1kNDM2MWM0ZmEwMjUiLCJjbGllbnRfaWQiOiI3cnU3bmRwcW0yOTZzOWxtcmU3aGlxNWtmMiIsInVzZXJuYW1lIjoiYXNhZGFxcWFzZGFAZ21haWwuY29tIn0.JP0aJkvAr9i3XsgoYRBgL2KHez9fN0vnkwxcxWFPjFt0n3__L-7Xc4JcDcS0xWstSsgktjS_-WqLQphLuGHDzXqrSckXkQAF7Io14T9W0Ewcr3rmDmjsmTLGLiNGdO7TD7pVTquJu-uSXSN9hn_4ECpEDjqRYgeUi28Y0jgd51xJFrSAZQCxqcPioQoT_Bj4PAQMSNGg-toeuRzXrRizQb069dnMm_ZkWmkUXBYO7FHLt-DZbvoyDK32lnVcOCGTVgKOX0h-2sdJi2oQlZ1dE1b5ofTbDkpNzTtjC-5boXYAZ5HJNtTYQ6dfH3m6qcCYI-W41-m71cIlfzF-4CkEuw



DELETE 

api/users/5da8cb1275bac422a2e82b45?oken=eyJraWQiOiI4TjQ1czErSW5Rd3kxb2pMVHJxV0xLbnBrZ1QwbE1kNVdOdkJsUzdKdXdrPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjNmQ5NjE0OS03NzE5LTQ2MTMtYjUxMi04ODliMTgzMmQyM2EiLCJldmVudF9pZCI6IjcwNmE3MTFlLWRmNTMtNDUyNS1hMzA5LTdjZGRiMzNkMWQxZiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE1NzEzNDA3NzksImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yXzdjU0NmUzE3YyIsImV4cCI6MTU3MTM0NDM3OSwiaWF0IjoxNTcxMzQwNzc5LCJqdGkiOiIzZTJjNzMxMS1iYTRlLTQ4NGQtYTlkNi1kNDM2MWM0ZmEwMjUiLCJjbGllbnRfaWQiOiI3cnU3bmRwcW0yOTZzOWxtcmU3aGlxNWtmMiIsInVzZXJuYW1lIjoiYXNhZGFxcWFzZGFAZ21haWwuY29tIn0.JP0aJkvAr9i3XsgoYRBgL2KHez9fN0vnkwxcxWFPjFt0n3__L-7Xc4JcDcS0xWstSsgktjS_-WqLQphLuGHDzXqrSckXkQAF7Io14T9W0Ewcr3rmDmjsmTLGLiNGdO7TD7pVTquJu-uSXSN9hn_4ECpEDjqRYgeUi28Y0jgd51xJFrSAZQCxqcPioQoT_Bj4PAQMSNGg-toeuRzXrRizQb069dnMm_ZkWmkUXBYO7FHLt-DZbvoyDK32lnVcOCGTVgKOX0h-2sdJi2oQlZ1dE1b5ofTbDkpNzTtjC-5boXYAZ5HJNtTYQ6dfH3m6qcCYI-W41-m71cIlfzF-4CkEuw