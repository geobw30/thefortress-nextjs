# Deployment Guide for The Fortress Website

This document provides instructions for deploying The Fortress website to a production environment.

## Prerequisites

Before deploying, ensure you have:

1. A server or cloud platform account (Vercel, Netlify, AWS, etc.)
2. A MongoDB database (MongoDB Atlas recommended)
3. A Cloudinary account for image storage
4. Domain name (optional but recommended)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

#### Steps:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Sign up for a Vercel account at [vercel.com](https://vercel.com)

3. Connect your Git repository to Vercel:
   - Click "New Project"
   - Import your Git repository
   - Configure the project settings:
     - Framework: Next.js
     - Build Command: `npm run build`
     - Output Directory: `.next`
     - Install Command: `npm install`

4. Set up environment variables in Vercel:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add the following variables:
     ```
     MONGODB_URI=your_production_mongodb_connection_string
     NEXTAUTH_SECRET=your_nextauth_secret
     CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     NEXTAUTH_URL=https://yourdomain.com
     ```

5. Deploy the project:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

6. Configure custom domain (optional):
   - Go to project settings
   - Navigate to "Domains"
   - Add your custom domain
   - Follow the DNS configuration instructions

### Option 2: Netlify

#### Steps:

1. Build your application locally:
   ```bash
   npm run build
   ```

2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

3. Login to Netlify:
   ```bash
   netlify login
   ```

4. Deploy to Netlify:
   ```bash
   netlify deploy
   ```
   - Select "Create & configure a new site"
   - Choose your team
   - Enter a site name
   - Set publish directory to `.next`
   - Set build command to `npm run build`

5. Set up environment variables:
   - Go to your site settings in Netlify
   - Navigate to "Environment variables"
   - Add all required environment variables

6. Configure redirects for Next.js:
   Create a `_redirects` file in your public directory:
   ```
   /api/*  /.netlify/functions/api/:splat  200
   /_next/data/*  /.netlify/functions/next_data/:splat  200
   /*  /.netlify/functions/next_server  200
   ```

### Option 3: Traditional Server Deployment

#### Steps:

1. Build your application:
   ```bash
   npm run build
   ```

2. Install dependencies:
   ```bash
   npm install --production
   ```

3. Copy the following files and directories to your server:
   - `.next` (build output)
   - `public` (static assets)
   - `package.json`
   - `package-lock.json`
   - `.env.local` (with production environment variables)

4. Install Node.js on your server (version 16 or higher)

5. Install PM2 (process manager for Node.js):
   ```bash
   npm install -g pm2
   ```

6. Start your application with PM2:
   ```bash
   pm2 start npm --name "thefortress" -- start
   ```

7. Set up a reverse proxy (Nginx or Apache) to serve your application

8. Configure SSL certificate (Let's Encrypt recommended)

## Environment Variables

Ensure the following environment variables are set in your production environment:

```
MONGODB_URI=your_production_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NEXTAUTH_URL=https://yourdomain.com
```

## Database Migration

If you're migrating from a development database to production:

1. Export data from development database:
   ```bash
   mongodump --uri="mongodb://localhost:27017/thefortress" --out=./backup
   ```

2. Import data to production database:
   ```bash
   mongorestore --uri="your_production_mongodb_connection_string" ./backup
   ```

## Monitoring and Maintenance

### Monitoring

- Set up application performance monitoring (e.g., Sentry, LogRocket)
- Set up uptime monitoring (e.g., UptimeRobot)
- Set up error tracking

### Maintenance

- Regular database backups
- Update dependencies regularly
- Monitor disk space and memory usage
- Review and rotate logs

## Troubleshooting

### Common Issues

1. **Application not starting**
   - Check environment variables
   - Verify database connection
   - Check build logs for errors

2. **Authentication not working**
   - Verify NEXTAUTH_URL is set correctly
   - Check NextAuth.js configuration
   - Verify database connection

3. **Images not loading**
   - Check Cloudinary configuration
   - Verify Cloudinary account credentials
   - Check image upload permissions

4. **Slow performance**
   - Check database performance
   - Optimize images
   - Use a CDN for static assets

### Logs

Check logs for error messages:
- Vercel: Check deployment logs in the Vercel dashboard
- Netlify: Check deploy logs in the Netlify dashboard
- Traditional server: Check PM2 logs with `pm2 logs`

## Security Considerations

- Use HTTPS in production
- Keep dependencies up to date
- Use strong, unique passwords
- Regularly rotate API keys
- Implement proper authentication and authorization
- Use environment variables for sensitive data
- Set up proper CORS policies

## Backup and Recovery

- Regular database backups
- Version control for code
- Document deployment process
- Test recovery procedures regularly

## Scaling

For high-traffic applications:

- Use a CDN for static assets
- Implement database indexing
- Use caching strategies
- Consider load balancing
- Monitor performance metrics

## Conclusion

After following these deployment instructions, your website should be live and accessible to users. Remember to test all functionality in the production environment to ensure everything is working correctly.