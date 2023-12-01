# Woo Tube

## Description

This project is a video-sharing web application that supports functionalities similar to YouTube.

## Features

- **Registration and Login**: Users can create an account and log in using their email and password.    
- **Video Upload, Editing and Deletion**: Logged-in users can upload video files directly from their devices or record videos using the application and upload them. Users who have uploaded videos can edit the title and description or delete their videos.
- **Video Viewing**: All users can view uploaded videos and can use the search functionality to find specific videos.  
- **Commenting**: Users can comment on videos and respond to comments from other users.  

## Technology Stack

- PUG
- CSS
- JavaScript
- Express
- MongoDB

## Installation and Running

### System Requirements

Before installing and running the project, make sure the following software is installed on your system.

```
node 16.17.1
npm 8.15.0
```

### Installation

```
npm install
```

### Configuration

1. Create a `.env` file at the root of the project.
2. Add the following content to the `.env` file:
   
    ```sh
    DB_URL= # set MongoDB Atlas URL Here
    COOKIE_SECRET=test
    GH_CLIENT= # github Login Clinet Id
    GH_SECRET= # github Login Secret
    ```

### Build and Running

```sh
## build client
npm run build:assets
```
```sh
# start server
npm run dev:server 
```
