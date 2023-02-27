#APIs and their structure
---------------------------------------

1. http://localhost:8000/auth/register (POST)
        request -> name, email, password
        response -> message 

2. http://localhost:8000/auth/login (POST)
        request -> email, password
        response -> success msg, token

3. http://localhost:8000/notes/create (POST)
        request -> authrization barear token, {heading, note, tag}
        response -> message

4. http://localhost:8000/notes (GET)
        request -> authrization barear token
        response -> json data

5. http://localhost:8000/notes/edit/:Id (PATCH)
        request -> authrization barear token, {heading || note || tag}
        response -> message

6. http://localhost:8000/notes/delete/:Id (DELETE)
        request -> authrization barear token
        response -> message
