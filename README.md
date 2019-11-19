# Back-End


Snack vending machines in offices are the worst. They are stocked with snacks that either unhealthy or old and stale - and they are always in dire need of a restock. Nobody gets a say in which snacks are stocked or when they should be rotated or re-stocked. With Snackify - the office snack subscription service and app - send your office snacktime woes packing faster than Janet from HR did to your annoying cubicle-mate last week!


# BaseURL 
## https://snackify7.herokuapp.com/

# Endpoints

## Authentication
|Request Type|	Endpoint	|Description|
|:---------:|:-----------:|:---------------:|
|POST	|/auth/register/organization|	Creates New Organization|
|POST	|/auth/register/employee	|Creates Employee|
|POST	|/auth/login/organization|	Creates JWT*|
|POST	|/auth/login/employee	|Creates JWT*|
* JSON Web Tokens Used to Verify Users


## Changing the role of employee by employee ID (Only accessible to those with the role of orgAdmins and organizations)
|Request Type	|Endpoint|	Description|
|:-----------:|:-----------:|:----------------:|
|PUT|	/auth/:id/update-role	|Changes role of an employee|




## Snacks
|Request Type	|Endpoint	|Description|
|:---------:|:-----------:|:--------------:|
|GET|	/snacks	|Return All Snacks|
|GET	|/snacks/:id/nutrition	|Return Nutrition By Snack ID|
|POST|	/snacks/nutrition	|Creates Nutrition Fact|
|POST	|/snacks	   | Creates Snack|
|PUT	|/snacks/:id|	Updates a Snack by Snack ID|
|PUT	|/snacks/:id/nutrition	|Updates Nutrition Fact by Nutrition Fact ID|
|DELETE	|/snacks/:id	|Remove Snack By ID|
|DELETE	|/snacks/:id/nutrition|	Remove Nutrition Fact By Nutrition Fact ID |


## Subscriptions
|Request Type	|Endpoint	|Description|
|:---------:|:----------:|:---------------:|
|GET	|   /subs	|Return All Subscriptions|
|GET|	/subs/:id/snacks|	Return All Snacks For A Sub By Sub ID|
|POST	|/subs	|Adds New Subscription|
|PUT	|/subs/:id	|Update Subscription By ID|
|DELETE	|/subs/:id	|Remove Subscription By ID|

## Purchases
|Request Type	|Endpoint	|Description|
|:---------:|:------------:|:--------------:|
|GET	 |  /purchase	|Return All Purchases|
|POST	/purchase	|Adds New Purchase|
|PUT	|/purchase/:id|	Update Purchase By Purchase ID|
|DELETE	|/purchase/:id	|Remove Purchase By Purchase ID|

## Requests
|Request Type|	Endpoint	|Description|
|:---------:|:-----------:|:------------:|
|GET	|   /request	|Return All Requests|
|POST	|/request	|Adds New Request|
|PUT	|/request/:id|	Update Request By Request ID|
|DELETE|	/request/:id|	Remove Request By Request ID



# Data Models

## Authentication
### Register

#### A POST request to the /auth/register/organization endpoint expects to recieve an object as follows: (EVERY FIELD IS REQUIRED)
```javascript
{
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "organizationName": "Org Name",
    "contactPerson": "Fake Person",
    "role": "organization"
}
```

#### A POST request to the /auth/register/employee endpoint expects to recieve an object as follows: (EVERY FIELD IS REQUIRED)
```javascript
{
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "fullName": "Full Name",
    "contactPerson": "Fake Person",
    "role": "organization",
    "orgId": Organization # goes here
}
```

|Field	 |  Type	 |	    Unique   |
|:------:|:----------:|:--------------:|
|username |	String	|  true	|



### Login
#### A POST request to the auth/login/organization endpoint expects to recieve an object as follows:
```javascript
{
    "username": "username",
    "password": "happytree"
}
```

#### A POST request to the auth/login/employee endpoint expects to recieve an object as follows:
```javascript
{
    "username": "username",
    "password": "happytree"
}
```
NOTE: If successful, a JSON Web Token will be returned. This must be stored and used as authentication for API calls to snacks, subscriptions and request endpoints.


#### A GET request to the auth/employees enpoint will return an object as follows:
```javascript
[
    {
        "id": 1,
        "username": "jonbash2",
        "password": "$2a$10$Jk7zVyJU/wdgXvgNgxkIoOc4GT72OoQOH7ykmaHiGT8BT7rHxjtUi",
        "email": "jonbash@protonmail.com",
        "phoneNumber": "1234567890",
        "streetAddress": "124 Ross",
        "state": "Nowhere",
        "zipcode": "12345",
        "fullName": "Jon Bash",
        "contactPerson": "Jon Bash",
        "role": "Employee?",
        "orgId": 1
    },
    {
        "id": 2,
        "username": "jonbash3",
        "password": "$2a$10$GY1VaR9oTP2Wx/L3afjAJeXHh/xzcl6jm2J.vahOoFKcBtztkdQ8K",
        "email": "jonbash@protonmail.com",
        "phoneNumber": "1234567890",
        "streetAddress": "124 Ross",
        "state": "Nowhere",
        "zipcode": "12345",
        "fullName": "Jon Bash",
        "contactPerson": "Jon Bash",
        "role": "Employeeeeee?",
        "orgId": 1
    }
]
```




### Changing the Role
#### A PUT /auth/:id/update-role	endpoint will return an object as follows:
```javascript
{   
    "id": 1
    "username": "username"
    "password": "password",
    "email": "email@address.com",
    "phoneNumber": "3453453534",
    "streetAddress": "124 Ross",
    "state": "Nowhere",
    "zipcode": "12345",
    "fullName": "Full Name",
    "contactPerson": "Fake Person",
    "role": "organization",
    "orgId": Organization # goes here
}
```

### Subscriptions
#### A GET,PUT,POST request to the /subs endpoint will return an object as follows:
```javascript
[
    {
        "id": 2,
        "monthlyFee": "$5",
        "lengthOfSubscription": 4/4/4040,
        "nameOfSubscription": "Name",
        "orgId": 1
    }
]
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.

|Field	 |  Type	 |
|:------:|:----------:|
|monthlyFee| Float|
|lengthOfSubscriptions |	Datetime	|
|totalWeight |	Float|
|price |	Float	|


### Snacks
#### A GET, PUT, POST request to the /snacks endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "name": "Name",
    "numberOfServings": 2,
    "totalWeight": '1.5 grams',
    "price": 5.00,
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.

|Field	 |  Type	 |
|:------:|:----------:|
|name | string|
|numberOfServings |	Integer	|
|totalWeight |	Float|
|price |	Float	|

### Nutrition
#### A GET, PUT, POST request to the /snacks/nutrition endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "calories": 2,
    "totalFat": 2,
    "totalSugars": '1.5 grams',
    "protein": "1 gram",
    "carbs": "1 gram",
    "allergens": "none,
    "snackId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.

|Field	 |  Type	 |
|:------:|:----------:|
|calories | Float|
|totalFat |	Float	|
|totalSugars |	Float|
|protein |	Float	|
|carbs| Float |
|allergens | string|


### Request
#### A GET, PUT, POST request to the /request endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "snackName": "Name",
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.


### Purchase 
#### A GET, PUT, POST request to the /purchase endpoint will return an object as follows:
```javascript
{
    "id": 2,
    "snackName": "Name",
    "subId": 1
}
```
NOTE: For PUT requests an object only containing the changed field is required, if the field is to remain the same it is not needed. An 'id' isn't needed for POST requests.




