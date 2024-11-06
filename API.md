## API Endpoints

**Note:** 

We provide a Postman collection that you can import to test the APIs easily. This collection is located at backend/collection/CMS.postman_collection.json and includes all the endpoints with example requests and responses.

1. **User Authentication and Management:**

- POST /signup: Creates a new user account. Expects user details in the request body.
- POST /login: Authenticates a user and returns a token. Expects credentials in the request body.
- GET /profile: Retrieves the profile information of the authenticated user. Requires a valid token.
- POST /user/logout: Logs out the authenticated user. Requires a valid token.
- PUT /profile: Updates the profile information of the authenticated user. Requires a valid token.
- DELETE /user: Deletes the specified user account. Requires admin permissions and a valid token.
- PUT /user/welcome: Deactivates the welcome message for a specified user. Requires admin permissions and a valid token.
- PUT /userAccess: Updates access permissions for users. Requires admin permissions and a valid token.

2. **Blog Management:**

- POST /create/blog: Creates a new blog post. Requires the user to be authenticated.
- POST /blogs: Fetches all blog posts. Requires the user to be authenticated.
- POST /blog/like: Allows a user to like a specific blog post. Requires the user to be authenticated.
- POST /blog/view: Retrieves a specific blog post for viewing. Requires the user to be authenticated.
- PUT /blog: Updates the status of a blog post (e.g., published, draft). Requires the user to be authenticated.
- PUT /updateBlog: Updates an existing blog post. Admin permissions are required for this action.

3. **Category Management:**

- POST /categories: Creates a new category. Requires the user to be authenticated and have admin permissions.
- POST /get-categories: Fetches all categories. Requires the user to be authenticated.
- DELETE /categories: Deletes a specified category. Requires the user to be authenticated and have admin permissions.

4. **Comment Management:**

- POST /comments: Creates a new comment on a blog post. Requires the user to be authenticated and validated.
- GET /comments: Fetches all comments. Requires the user to be authenticated.
- GET /comments/:id: Retrieves a specific comment by its ID. Requires the user to be authenticated.
- GET /comment/blog: Fetches comments for a specific blog post. Requires the user to be authenticated.
- PUT /comments/:id: Updates a specific comment by its ID. Requires the user to be authenticated.
- DELETE /comments/:id: Deletes a specific comment by its ID. Requires the user to be authenticated.
- POST /reply: Creates a reply to a specific comment. Requires the user to be authenticated.

5. **User Management:**

- GET /users: Fetches all users. Requires the user to be authenticated and have admin permissions.
- GET /user/statistic: Retrieves statistics about users. Requires the user to be authenticated and have admin permissions.
- POST /user/activity: Fetches all activities associated with users. Requires the user to be authenticated and have admin permissions.
- GET /user/activityTypes: Counts and retrieves the types of user activities. Requires the user to be authenticated and have admin permissions.
- DELETE /user/activity: Deletes a specific activity by its ID. Requires the user to be authenticated and have admin permissions.

6. **API Log Management:**

- GET /logs: Fetches all logs. Requires the user to be authenticated and have admin permissions.
- DELETE /logs: Deletes all logs. Requires the user to be authenticated and have admin permissions.

7. **Event and Notification Management:**

- GET /events: Retrieves a list of events. No authentication required.
- POST /send-notification: Sends a notification to users. Requires the user to be authenticated and have admin permissions.

8. **Tour Step Management:**

- POST /tourStep: Creates a new tour step. Requires the user to be authenticated and have admin permissions.
- GET /tourStep: Fetches all tour steps. Requires the user to be authenticated and have admin permissions.

9. **Language Translation Management:**

- POST /translate: Creates a new translation entry. Requires the user to be authenticated and have admin permissions.
- GET /translate: Fetches all translation entries. No authentication required.
