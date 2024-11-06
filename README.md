# Project Title: Custom CMS For Manage Blogs

## Project Description

Developing a custom Content Management System (CMS) designed for managing content such as blog posts, pages, and media files. This CMS will utilize rich text editors like Draft.js or Quill, allowing users to create and edit content with ease and flexibility. It will integrate with a robust backend for secure content storage, ensuring that all user-generated content is accessible and manageable.

Key features include customizable forms for creating and editing posts and pages, along with file upload functionality that uses libraries like Cloudinary for efficient media management. Users will be able to categorize and tag content, navigate a hierarchical page structure for better organization, and utilize an intuitive interface for managing uploaded media. 

The CMS will support multiple user roles—super admin, admin, and user—each with distinct permissions. Additional functionalities will feature a comprehensive dashboard displaying site statistics and recent activity, integration with Google Analytics for tracking user interactions, and capabilities for saving drafts, scheduling posts, and tracking revisions. The system will also offer multi-language support and a guided tour functionality to assist new users in navigating the platform.

## Installation Guide

1. **Install dependencies and start the applications:**
   ```bash
   cd frontend && npm install && npm start & \
   cd ../backend && npm install && nodemon index.js
   ```
2. **Run Both Frontend & Backend:**
To start both the frontend and backend simultaneously, you can use the following command:
   ```
   cd frontend && npm run dev
   ```

----
# Key Features:

## 1. For Users:
* User Login/Authentication: Users can register, log in, and authenticate to access the platform.
* Browse Blogs: Users can view the list of available blog posts.
* View Detailed Posts: Users can click on individual blog posts to view full details, including images, text, and metadata.
* Like Blog Posts: Users can like blog posts, showing their appreciation and helping highlight popular content.
* Commenting and Replies: Users can leave comments on blog posts and reply to other users' comments.

## 2. For Admin:
* Create Blog: Admin can create new blog posts with rich content (content, images, etc.).
* Update Blog: Admin can update existing blog posts, making edits and changes as needed.

**2.1 Manage Blog Status:**
* Draft: Blog posts that are being worked on but not yet ready for publication.
* Scheduled: Blog posts that are scheduled to be published at a specific time.
* Published: Blog posts that are live and accessible to users.
* Archived: Older blog posts that are no longer active but stored for record-keeping.
* Deleted: Blog posts that have been permanently deleted.

**2.2 User Management:**
* View Active Users: Admin can see the list of active users who are currently registered on the platform.
* Total Users: Admin can view the total number of registered users.
* Manage Users: Admin can delete any user account, effectively preventing the user from logging in again.

**2.3 Activity Tracking:**
* Login/Logout Monitoring: Admin can view logs of user and admin logins and logouts.
* User Actions: Admin can track which users viewed, liked, or interacted with specific blog posts.
* Admin Actions: Admin can monitor their own actions (e.g., when they logged in, created/updated posts, etc.).
* Language Translation Settings: The platform supports language translation. Admin or Superadmin can easily change language values in the Settings page. The language setting can be updated easily whenever required, without needing code changes. This allows the platform to be quickly adapted for different languages based on user needs.

## 3. For SuperAdmin:
* The Superadmin has the highest level of control over the platform, with the ability to manage admins, their access, and track admin activities. A Superadmin is a single user who can control everything, including:

**3.1 Admin Access Control:**
* Activate/Deactivate Admins: Superadmin can activate or deactivate any admin user account. When an admin is deactivated, they lose their ability to log in or perform any actions within the system.
* Set Permissions for Admins: Superadmin can control which actions specific admins are allowed to perform. For example, an admin may only have permission to create blogs but not delete them.
* Assign/Restrict Functionalities: Superadmin can grant or revoke access to different sections of the admin dashboard.
* Blog Management: Superadmin can enable or disable an admin’s ability to create, update, or delete blogs.
* User Management: Superadmin can grant or deny access to the user management page (e.g., viewing or deleting users).
* Activity Log Access: Superadmin can grant or deny access to the logs that show user and admin activities (login/logout, user actions, etc.).

**3.2 Manage Admin Views:**
* Control Admin Access to Pages: Superadmin can control which pages or sections of the admin dashboard are visible to different admins. For instance, some admins might only have access to blog creation, while others can access the full admin functionality including user management and activity logs.
* API Logs: Superadmin can also restrict or grant access to API logs for admins, allowing them to monitor API requests and responses.

**3.3 Monitor Admin Activity:**
* Track Admin Actions: Superadmin can monitor which actions each admin has taken, including login/logout times, blog creation, user deletion, and more. This gives the Superadmin complete oversight over all admin activities.
* Total Users and Admins Count: Superadmin can view the total number of users and admins on the platform.
* Admin Role Assignment: The Superadmin is the only one who can assign new admins or modify the role of existing users (from regular user to admin)

---
# App Interface Walkthrough

## DashboardPage
![DashboardPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805421/gmb5evrxhk0xemvqld1e.png)

----
## CreateBlogPage
![CreateBlogPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805501/jgyywfqgyybcgwaxdz2y.png)

----
## AllBlogPostPage
![AllBlogPostPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805442/mtuvnvsra7mp1qmhqjpc.png)

----
## BlogPostPage
![BlogPostPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805529/gixr9vufcwnqubov7gqc.png)

----
## BlogDetailPage
![BlogDetailPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805685/jxj6vduq4ufku5eljguc.png)

----
## CategoriesPage
![CategoriesPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805635/j1oncoyofhysmelojfa0.png)

----
## ActivityPage
![ActivityPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805555/evbyuywqobb9ltnf32ah.png)

----
## APILogPage
![APILogPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805584/q5yo2cbteiyyzp8jtqvb.png)

----
## AccessControlPage
![AccessControlPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805476/mmxtp38adtqsy7fugtfi.png)

----
## LaunguageTranslationPage
![LaunguageTranslationPage](https://res.cloudinary.com/dx12uvyye/image/upload/v1730805660/z8pppcotflzhogdby5hz.png)
