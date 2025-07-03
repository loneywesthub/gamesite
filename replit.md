# Replit.md

## Overview

This is a full-stack e-commerce application called "The Gaming Palace" - a gaming products marketplace built with React and Express. The application features a modern gaming-themed UI with product browsing, shopping cart functionality, user authentication via Replit Auth, and payment processing through Stripe integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: 
  - Tailwind CSS for utility-first styling
  - Shadcn/ui component library for consistent UI components
  - Custom gaming-themed color palette (royal purple and gold)
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Middleware**: 
  - Express sessions for authentication state
  - JSON/URL-encoded body parsing
  - Request logging middleware

### Authentication System
- **Provider**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **Strategy**: Passport.js with openid-client strategy
- **Security**: HTTP-only cookies, secure sessions

## Key Components

### Database Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Database**: Neon PostgreSQL (serverless)
- **Connection**: Connection pooling via @neondatabase/serverless
- **Schema**: Centralized schema definition in `/shared/schema.ts`

### Core Data Models
- **Users**: Profile management with Stripe customer integration
- **Products**: Gaming products with categories, pricing, and inventory
- **Shopping Cart**: User-specific cart items with quantity management
- **Orders**: Order processing with line items and status tracking
- **Reviews**: Product reviews with ratings and verification status
- **Sessions**: Authentication session storage

### Payment Processing
- **Provider**: Stripe API integration
- **Frontend**: @stripe/react-stripe-js for payment forms
- **Backend**: Server-side payment intent creation and processing
- **Features**: Payment element integration, customer management

### UI Component System
- **Base**: Radix UI primitives for accessibility
- **Styling**: Class variance authority for component variants
- **Components**: 40+ reusable UI components (buttons, cards, dialogs, etc.)
- **Theme**: Dark gaming theme with CSS custom properties

## Data Flow

### Authentication Flow
1. User initiates login via Replit Auth
2. OpenID Connect discovery and token exchange
3. User profile creation/update in database
4. Session establishment with PostgreSQL storage
5. Frontend receives authenticated user state

### Product Management Flow
1. Products initialized via admin endpoints
2. Client queries products with filtering/search
3. Real-time updates via React Query cache invalidation
4. Optimistic updates for cart operations

### Shopping Flow
1. Browse products with category filtering and search
2. Add items to cart with quantity management
3. Cart state synchronized across sessions
4. Checkout process with Stripe payment integration
5. Order creation and fulfillment tracking

### API Communication
- RESTful endpoints with consistent JSON responses
- Error handling with appropriate HTTP status codes
- Request/response logging for debugging
- CORS and security headers for production

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript
- **State Management**: @tanstack/react-query for server state
- **Routing**: wouter for lightweight routing
- **Forms**: react-hook-form with @hookform/resolvers
- **Validation**: Zod schemas with Drizzle integration

### UI Dependencies
- **Component Library**: 25+ @radix-ui components
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Icons**: Lucide React, React Icons (social media icons)
- **Utilities**: date-fns for date handling

### Backend Dependencies
- **Web Framework**: Express.js with TypeScript
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Authentication**: Passport.js, openid-client, express-session
- **Payment**: Stripe SDK for server-side processing
- **Session Storage**: connect-pg-simple for PostgreSQL sessions

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **Development**: tsx for TypeScript execution, nodemon-like watching
- **Code Quality**: TypeScript compiler, ESLint configuration

## Deployment Strategy

### Environment Configuration
- **Development**: Local development with Vite dev server and tsx
- **Production**: Built assets served by Express with esbuild bundling
- **Database**: Environment-based DATABASE_URL configuration
- **Secrets**: Environment variables for API keys and session secrets

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles server code to `dist/index.js`
3. **Assets**: Static files served from built frontend
4. **Database**: Drizzle migrations applied via `db:push` script

### Hosting Platform
- **Platform**: Replit with autoscale deployment
- **Port Configuration**: Express server on port 5000, external port 80
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Workflow**: Parallel development workflow with hot reloading

### Production Optimizations
- **Asset Bundling**: Vite optimizes frontend assets
- **Server Bundling**: esbuild creates efficient server bundle
- **Database**: Connection pooling for scalability
- **Sessions**: PostgreSQL-backed session storage for persistence

## Changelog

```
Changelog:
- June 21, 2025. Initial setup
- June 21, 2025. Expanded product catalog with 25+ products including PS4/PS5/Vita games, Apple and Alienware laptops, gaming PCs, and accessories. Made navigation functional with category filtering system.
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```