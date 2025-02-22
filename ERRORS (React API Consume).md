# Possible Errors and Their Solutions in React CRUD API Consumption

## 1. CORS Policy Error
### Error:
```
Access to fetch at 'http://localhost:3030/api/users' from origin 'http://localhost:5173' has been blocked by CORS policy.
```
### Cause:
The backend server does not allow requests from different origins.
### Solution:
- Install and use the `cors` package in the backend:
```sh
npm install cors
```
- Modify the backend (Node.js + Express):
```js
const cors = require('cors');
app.use(cors());
```

## 2. API Not Responding
### Error:
```
Failed to fetch
```
### Cause:
- The backend server is not running.
- The API URL is incorrect.
### Solution:
- Ensure the backend is running:
```sh
cd server
node server.js
```
- Verify the correct API endpoint in `UserList.jsx`.

## 3. Unexpected Token in JSON
### Error:
```
Unexpected token < in JSON at position 0
```
### Cause:
- The API might be returning an HTML error page instead of JSON.
### Solution:
- Check the network response in browser dev tools (`F12` > `Network` > `Fetch/XHR`).
- Ensure the backend API is returning JSON.
- Modify `fetch` to handle errors properly:
```js
fetch(API_URL)
    .then((res) => {
        if (!res.ok) {
            throw new Error("API response error");
        }
        return res.json();
    })
    .then((data) => setUsers(data))
    .catch((err) => console.error(err));
```

## 4. DELETE Request Not Working
### Error:
```
DELETE http://localhost:3030/api/users/123 404 (Not Found)
```
### Cause:
- The user ID is incorrect.
- The API endpoint does not support DELETE.
### Solution:
- Confirm the correct API route (`DELETE /api/users/:id`) exists in the backend.
- Log the user ID before sending the request:
```js
console.log(`Deleting user with ID: ${id}`);
```

## 5. `map` Function Error
### Error:
```
Cannot read properties of undefined (reading 'map')
```
### Cause:
- `users` is `undefined` before data is fetched.
### Solution:
- Initialize state properly:
```js
const [users, setUsers] = useState([]);
```
- Use optional chaining (`?.`):
```js
users?.map((user) => ... )
```

## 6. React Not Rendering Changes After API Calls
### Cause:
- State is not updating properly after CRUD operations.
### Solution:
- Call `fetchUsers()` after `DELETE` to refresh the list:
```js
fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => fetchUsers())
    .catch(err => console.error(err));
```

## Conclusion
These are common errors faced when consuming an API in a React CRUD app. Proper debugging and error handling can help resolve these issues efficiently!

