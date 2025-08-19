# TechFlow Solutions

## Overview

Hukitola Solutions is a modern IT services and technology consulting platform built as a full-stack web application. The project showcases a comprehensive digital presence for a technology company, featuring service offerings, project portfolios, client testimonials, pricing information, and an AI-powered chatbot for customer engagement. The application serves as both a marketing website and a lead generation platform with integrated contact management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built using **React 18** with **TypeScript** and follows a modern component-based architecture:

- **UI Framework**: Utilizes **shadcn/ui** components built on top of **Radix UI** primitives for consistent, accessible design
- **Styling**: **Tailwind CSS** with custom CSS variables for theming and a dark/light mode system
- **State Management**: **TanStack Query** (React Query) for server state management and caching
- **Routing**: **Wouter** for lightweight client-side routing
- **Build Tool**: **Vite** for fast development and optimized production builds
- **Component Structure**: Organized into reusable UI components, page components, and feature-specific sections

### Backend Architecture
The server-side follows a **Node.js/Express** RESTful API pattern:

- **Runtime**: **Node.js** with **TypeScript** using **tsx** for development
- **Framework**: **Express.js** with middleware for JSON parsing, URL encoding, and request logging
- **Database Integration**: **Drizzle ORM** configured for PostgreSQL with **Neon Database** as the cloud provider
- **Storage Pattern**: Abstracted storage interface with both in-memory and database implementations
- **Development Setup**: Integrated Vite middleware for seamless full-stack development

### Data Storage Solutions
The application uses a dual storage approach:

- **Development**: In-memory storage using JavaScript Maps for rapid prototyping
- **Production**: PostgreSQL database via **Neon Database** cloud service
- **ORM**: **Drizzle ORM** with **Zod** schema validation for type-safe database operations
- **Schema Design**: Relational schema with tables for users, contacts, and chat sessions using UUID primary keys

### Authentication and Authorization
Currently implements a basic user system:

- **User Management**: User registration and authentication capabilities built into the schema
- **Session Handling**: Prepared for session-based authentication with PostgreSQL session store
- **Security**: Password hashing and validation ready for implementation

### API Design
RESTful API endpoints following conventional patterns:

- **Contact Management**: `/api/contact` for form submissions and lead capture
- **Chat System**: `/api/chat/message` for AI chatbot interactions
- **Admin Functions**: `/api/contacts` for retrieving contact submissions
- **Response Format**: Consistent JSON responses with error handling middleware

## External Dependencies

### AI and Machine Learning
- **OpenAI GPT-4o**: Powers the intelligent chatbot for customer service and project consultation
- **AI Features**: Automated project suggestions, chat response generation, and business intelligence

### Cloud Services
- **Neon Database**: Serverless PostgreSQL database for production data storage
- **Vercel/Replit**: Deployment platform integration with automatic builds and deployments

### UI and Design
- **Radix UI**: Comprehensive primitive component library for accessibility and consistent behavior
- **Lucide React**: Modern icon library for consistent iconography
- **Google Fonts**: Inter font family for typography
- **Embla Carousel**: Carousel/slider functionality for project showcases

### Development Tools
- **TypeScript**: Static typing across the entire application
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **Drizzle Kit**: Database migrations and schema management

### Form and Validation
- **React Hook Form**: Form state management with performance optimization
- **Zod**: Schema validation for both client and server-side data validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

The architecture prioritizes type safety, developer experience, and scalability while maintaining a clean separation of concerns between frontend presentation, backend logic, and data persistence layers.