# The Fortress - Non-Profit Organization Website

This is a Next.js website for a non-profit organization called "The Fortress" that focuses on education, healthcare, and sustainable development in underserved communities.

## Features

- Responsive design with modern UI
- User authentication (login/register)
- Admin panel for content management
- Image gallery with upload functionality
- Stories and testimonials section with upload functionality
- CMS-like system for managing content

## Technologies Used

- Next.js 13+ (App Router)
- React
- MongoDB with Mongoose
- NextAuth.js for authentication
- Cloudinary for image storage
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- MongoDB database
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd thefortress
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

```
thefortress/
├── app/                 # Next.js app router pages
│   ├── api/             # API routes
│   ├── about/           # About page
│   ├── admin/           # Admin dashboard
│   ├── dashboard/       # User dashboard
│   ├── donate/          # Donate page
│   ├── gallery/         # Gallery page
│   ├── impact/          # Impact page
│   ├── login/           # Login page
│   ├── programs/        # Programs page
│   ├── register/        # Register page
│   ├── stories/         # Stories page
│   ├── layout.js        # Root layout
│   └── page.js          # Home page
├── components/          # React components
│   ├── layout/          # Layout components (Header, Footer)
│   └── sections/        # Section components (Hero, About, etc.)
├── lib/                 # Utility functions and configurations
├── models/              # Mongoose models
├── public/              # Static assets
└── styles/              # Global styles
```

## Authentication

The website uses NextAuth.js for authentication with credentials provider. Users can register and log in to the system. Admin users have additional privileges to manage content through the admin panel.

## Content Management

### Gallery
Authenticated users can upload images to the gallery. Admin users can manage all gallery images.

### Stories
Authenticated users can share their stories and testimonials. Admin users can manage all stories.

## Deployment

To deploy the application, you can use Vercel, which is optimized for Next.js applications. Make sure to set up the environment variables in your deployment platform.

### Docker Deployment

This project includes Docker support for consistent development and production environments:

1. Copy the `.env.example` file to `.env.local` and fill in your configuration:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

2. Build and run with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Access the application at http://localhost:3000

For production deployment, you can build the Docker image separately:
```bash
docker build -t thefortress-app .
docker run -d -p 3000:3000 thefortress-app
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [NextAuth.js Documentation](https://next-auth.js.org/getting-started/introduction)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.