# sushi-kitchen
# REST API for **sushi-bar**

```
npm install
npm start
```

URL: http://localhost:3030

('/') GET ---> WELCOME 
<hr/>  

**('/users') ---> authController**    

(POST): /users/register --- (email, password)

(POST): /users/login --- (email, password)

(GET): /users/logout --- (token)
<hr/>  

**('/data/catalog') ---> dataController**


(POST) '/': /data/catalog ---> CREATE Item

(GET) '/': /data/catalog ---> GET ALL Items

(GET) '/:id': /data/catalog/:id ---> GET Item DETAILS 

(PUT) '/:id': /data/catalog/:id ---> UPDATE Item 
 
(DELETE) '/:id': /data/catalog/:id ---> DELETE Item 
 
<!-- (GET): /data/catalog?where=_ownerId%3D%22{userId}%22 ===> My Furniture  -->
