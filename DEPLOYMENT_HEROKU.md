# Heroku Deployment Guide

This document provides instructions for deploying The Fortress website to Heroku using Docker.

## Prerequisites

Before deploying, ensure you have:

1. A Heroku account
2. Heroku CLI installed
3. Docker installed
4. A MongoDB database (MongoDB Atlas recommended)
5. A Cloudinary account for image storage

## Deployment Steps

### 1. Login to Heroku

```bash
heroku login
```

### 2. Create a Heroku App

```bash
heroku create your-app-name
```

Or use an existing app:

```bash
heroku git:remote -a your-app-name
```

### 3. Set Environment Variables

Set the required environment variables in Heroku:

```bash
heroku config:set MONGODB_URI=your_mongodb_connection_string
heroku config:set NEXTAUTH_SECRET=your_nextauth_secret
heroku config:set NEXTAUTH_URL=https://your-app-name.herokuapp.com
heroku config:set CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
heroku config:set CLOUDINARY_API_KEY=your_cloudinary_api_key
heroku config:set CLOUDINARY_API_SECRET=your_cloudinary_api_secret

### 4. Deploy to Heroku

Deploy your application using Git:

```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

Or if you're using a different branch:

```bash
git push heroku your-branch:main
```

### 5. Scale the Application (Optional)

If needed, scale your application to run on a specific dyno type:

```bash
heroku ps:scale web=1
```

## Environment Variables

The following environment variables are required for the application to function properly:

- `MONGODB_URI`: Your MongoDB connection string
- `NEXTAUTH_SECRET`: A secret key for NextAuth.js
- `NEXTAUTH_URL`: The URL of your Heroku application (e.g., https://your-app-name.herokuapp.com)
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Troubleshooting

### Common Issues

1. **Application Crashes on Startup**:
   - Check that all required environment variables are set
   - Verify the MongoDB connection string is correct
   - Check the Heroku logs: `heroku logs --tail`

2. **Database Connection Issues**:
   - Ensure your MongoDB instance is accessible from Heroku
   - Check that IP whitelisting is configured correctly for MongoDB Atlas

3. **Image Upload Issues**:
   - Verify Cloudinary environment variables are set correctly
   - Check that your Cloudinary account has sufficient credits

### Viewing Logs

To view the application logs:

```bash
heroku logs --tail
```

## Additional Configuration

### Custom Domain

To use a custom domain with your Heroku application:

1. Add the domain to your Heroku app:
   ```bash
   heroku domains:add www.yourdomain.com
   ```

2. Configure your DNS provider to point to the Heroku domain provided in the output.

### SSL Certificate

Heroku automatically provides SSL certificates for *.herokuapp.com domains. For custom domains, you can add SSL through the Heroku dashboard or use the automated certificate management feature.

## Conclusion

After following these steps, your The Fortress website should be successfully deployed to Heroku. The application will automatically start and be accessible at https://your-app-name.herokuapp.com.