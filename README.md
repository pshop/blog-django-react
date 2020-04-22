Admin:

    username: admin
    password: admin

# JWT TOKEN

### OBTAIN


    http://127.0.0.1:8000/api/token/obtain/
    
    curl\
        --header "Content-Type: application/json"\
        -X POST http://127.0.0.1:8000/api/token/obtain\
        --data '{"username":"admin","password":"admin"}' 
returns :
 
    {"refresh":
        "[REFRESH_TOKEN]",
    "access":
        "[ACCESS_TOKEN]"
    }
    
## REFRESH


    http://127.0.0.1:8000/api/token/refresh
    
    curl\
        --header "Content-Type: application/json"\
        -X POST http://127.0.0.1:8000/api/token/refresh\
        --data '{"refresh":"[REFRESH_TOKEN]"}'
returns :
 
    {"refresh":
        "[REFRESH_TOKEN]",
    "access":
        "[ACCESS_TOKEN]"
    }
    
# USERS

### CREATE

    http://127.0.0.1:8000/api/user/create
    curl\
        --header "Content-Type: application/json"\
        -X POST http://127.0.0.1:8000/api/user/create\
        --data '{"username":"[USERNAME]","password":"[PASSWORD]"}'
returns :

    {"username": "[USERNAME]"}

### GET PUBLIC INFOS
    http://127.0.0.1:8000/api/user/public/[USER_ID]
    
# BLOG POSTS

### GET ALL
    
    http://127.0.0.1:8000/api/blogposts
    curl --header "Content-Type:application/json" -X GET http://127.0.0.1:8000/api/blogposts
return :

    TODO
    
### CREATE
    
    http://127.0.0.1:8000/api/blogposts
    curl\
        --header "Content-Type: application/json"\
        --header "Authorization: Bearer [ACCESS_TOKEN]"\
        -X POST http://127.0.0.1:8000/api/blogposts\
        --data '{"title":"[POST_TITLE]", "content":"[POST_CONTENT]"}'
    
