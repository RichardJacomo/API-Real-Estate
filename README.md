# API-Real-Estate

# ROUTES:

# POST /users - CREATE A USER

    DESCRIPTION: In this route, you can create a user by defining whether they are an admin or a regular user using the admin key (true or false). This route returns the creation(createdAt) and update(updatedAt) dates of the user.

    BODY REQUIRED:
    {
        "name": "Maria",
        "email": "maria@mail.com",
        "password": "1234",
        "admin": true
    }

    EXPECTED:
    {
        "name": "Maria",
        "email": "maria@mail.com",
        "admin": true,
        "id": 1,
        "createdAt": "2023-03-05",
        "updatedAt": "2023-03-05",
        "deletedAt": null
    }

# GET /users - LIST ALL USERS

    DEDSCRIPTION: This route returns a list of all users existing in the database.

    NO BODY REQUIRED

    EXPECTED:
    [
     {
    	"name": "Maria",
    	"email": "maria@mail.com",
    	"admin": true,
    	"id": 1,
    	"createdAt": "2023-03-05",
    	"updatedAt": "2023-03-05",
    	"deletedAt": null
     }
    ]

# UPDATE /users/:id - UPDATE A USER BY PROVIDING ID

    DESCRIPTION: Regular user can only update itself and can't change itself to admin. Admin user can update all users on database. You need to provide the user id on request.

    BODY REQUIRED:
    {
    	"name": "Maria Updated",
    	"email": "maria.updated@mail.com",
        "password": "12345",
        "admin": false
    }

    EXPECTED:
    {
        "name": "Maria J",
        "email": "maria.c@mail.com",
        "admin": false,
        "id": 7,
        "createdAt": "2023-03-03",
        "updatedAt": "2023-03-04",
        "deletedAt": null
    }

# DELETE /users/:id - DELETE A USER BY PROVIDING ID

    DESCRIPTION: This route removes a user by using soft remove. You need to provide the user id on request.

    NO BODY REQUIRED

    EXPECTED:
    NO BODY EXPECTED

# POST /login - USER LOGIN

    DESCRIPTION: On this route you send email and password and receives the token.

    BODY REQUIRED:
    {
        "email": "maria@mail.com",
        "password": "1234"
    }

    EXPECTED:
    {
         "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjc4OTEwMjc0LCJleHAiOjE2Nzg5OTY2NzQsInN1YiI6IjEifQ.HZxi7OwHeOEZ67l4hRBWDOW-YcFGWZjo-e56PTa9tU0"
    }

# POST /categories - CREATE A REAL ESTATE CATEGORY

    DESCRIPTION: On this route you send a category name and receives a category with name and id.

    BODY REQUIRED:
    {
        "name": "Rent"
    }

    EXPECTED:
    {
        "name": "Rent",
        "id": 1
    }

# GET /categories - LIST ALL REAL ESTATE CATEGORIES

    DESCRIPTION: This route retrieves all the real estate categories that exist in the database.

    NO BODY REQUIRED

    EXPECTED:
    [
     {
    	"id": 1,
    	"name": "Rent"
     }
    ]

# POST /realEstate

    DESCRIPTION: This route create a real estate. You need to provide the address object. Category is optional.

    BODY REQUIRED:
    {
        "value": 100000.99,
        "size": 400,
        "sold": false,
        "address": {
            "street": "Street A",
            "zipCode": "1321345",
            "number": "123",
            "city": "São Paulo",
            "state": "sp"
    },
        "category": 1
    }

    EXPECTED:
    {
        "value": "100000.99",
        "size": 400,
        "address": {
    	    "id": 39,
    	    "street": "Street11",
    	    "zipCode": "1321345",
    	    "number": "123",
    	    "city": "São Paulo",
    	    "state": "sp"
     },
        "category": {
    	    "id": 1,
    	    "name": "Compra"
     },
        "id": 33,
        "sold": false,
        "createdAt": "2023-03-15",
        "updatedAt": "2023-03-15"
    }

# GET /categories/:id/realEstate - LIST ALL REAL ESTATES FROM A CATEGORY

    DESCRIPTION: This route retrieves all real estate properties from a specific category.

    NO BODY REQUIRED:

    EXPECTED:
    {
        "id": 1,
        "name": "Rent",
        "realEstate": [
    	{
    		"id": 1,
    		"sold": false,
    		"value": "100000.99",
    		"size": 400,
    		"createdAt": "2023-03-05",
    		"updatedAt": "2023-03-05"
    	},
    	{
    		"id": 2,
    		"sold": false,
    		"value": "100000.99",
    		"size": 400,
    		"createdAt": "2023-03-05",
    		"updatedAt": "2023-03-05"
    	},
     ]
    }

# GET /realEstate - LIST ALL REAL ESTATE PROPERTIES

    DESCRIPTION: This route retrieves all real estate properties in the database.

    NO BODY REQUIRED

    EXPECTED:
    [
     {
    	"id": 1,
    	"sold": false,
    	"value": "100000.99",
    	"size": 400,
    	"createdAt": "2023-03-05",
    	"updatedAt": "2023-03-05",
    	"address": {
    		"id": 2,
    		"street": "Street A",
    		"zipCode": "zipCod14",
    		"number": "2323",
    		"city": "São Paulo",
    		"state": "sp"
    	}
     },
     {
    	"id": 2,
    	"sold": false,
    	"value": "100000.99",
    	"size": 400,
    	"createdAt": "2023-03-05",
    	"updatedAt": "2023-03-05",
    	"address": {
    		"id": 3,
    		"street": "Street B",
    		"zipCode": "zipCod14",
    		"number": "2323",
    		"city": "São Paulo",
    		"state": "sp"
    	}
     },
    ]

# POST /schedules - CREATE A SCHEDULE TO A REAL ESTATE

    DESCRIPTION: This route allows a user to create a schedule for a real estate property by providing its id. A user cannot create a schedule for two different real estate properties at the same date and time. Moreover, a real estate property cannot have two schedules for the same date and time. The available time slots are from 8AM to 6PM on weekdays, which are Monday to Friday.

    BODY REQUIRED:
    {
        "date": "2023-20-04",
        "hour": "03:00",
        "realEstateId": 1
    }

    EXPECTED:
    {
        "message": "Schedule created"
    }

# GET /schedules/realEstate/:id - LIST ALL SCHEDULES FROM A SPECIFIC REAL ESTATE PROPERTY

    DESCRIPTION: This route retrieves all schedules from a specific real estate property, including category and address.

    NO BODY REQUIRED

    EXPECTED:
    {
        "id": 2,
        "sold": false,
        "value": "100000.99",
        "size": 400,
        "createdAt": "2023-03-05",
        "updatedAt": "2023-03-05",
        "address": {
    	    "id": 3,
    	    "street": "stree50",
    	    "zipCode": "zipCod14",
    	    "number": "2323",
    	    "city": "city",
    	    "state": "s0"
     },
        "category": {
    	    "id": 1,
    	    "name": "Compra"
     },
        "schedules": [
    	 {
    		"id": 3,
    		"date": "2023-10-24",
    		"hour": "12:32:00",
    		"user": {
    			"id": 1,
    			"name": "Maria",
    			"email": "maria@mail.com",
    			"admin": true,
    			"password": "$2a$10$0ZjtYEDa95yWX8oXCQYbQ.7HntYrSCluD5NMqrmp8L8wiaNUNq48G",
    			"createdAt": "2023-03-05",
    			"updatedAt": "2023-03-05",
    			"deletedAt": null
    		}
    	},
    	{
    		"id": 4,
    		"date": "2023-03-20",
    		"hour": "13:00:00",
    		"user": {
    			"id": 2,
    			"name": "João",
    			"email": "joao@mail.com",
    			"admin": true,
    			"password": "$2a$10$0ZjtYEDa95yWX8oXCQYbQ.7HntYrSCluD5NMqrmp8L8wiaNUNq48G",
    			"createdAt": "2023-03-05",
    			"updatedAt": "2023-03-05",
    			"deletedAt": null
    		}
    	},
     ]
    }
