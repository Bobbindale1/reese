# Chronological Bible Reading Tracker

## Overview

A web application that helps users follow a 365-day chronological Bible reading plan through daily video content. Users can track their progress through two viewing modes: Calendar Mode (matching specific dates of the year) and Day Number Mode (sequential 1-365). The application features YouTube video integration, progress tracking with localStorage persistence, and a clean, focused design optimized for spiritual content consumption.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18+ with TypeScript for type safety and modern component patterns
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- shadcn/ui component library (Radix UI primitives) following the "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theme customization (light/dark mode support)
- Custom typography: Inter for UI elements, Georgia/Merriweather for content

**State Management Strategy**
- LocalStorage for persistence of:
  - Current viewing mode (calendar vs. day number)
  - Current day position
  - Watched video tracking (Set of day numbers)
  - Theme preference (light/dark)
- React Query for server data (video metadata from YouTube API)
- React Context for theme provider
- Component-level useState for UI interactions

**Design System**
- Material Design principles adapted for spiritual content
- Spacing system based on Tailwind units (2, 4, 6, 8, 12, 16)
- Responsive breakpoints: Mobile-first, tablet at 768px, desktop max-width of 6xl
- Focus on calm, distraction-free environment with neutral color palette

### Backend Architecture

**Server Framework**
- Express.js for HTTP server
- Node.js with ES modules (type: "module")
- TypeScript for type safety across full stack

**API Structure**
- RESTful endpoint: `GET /api/videos` - Fetches all 365 video metadata
- Static file serving for production builds
- Development mode uses Vite middleware for HMR

**Data Flow**
- YouTube Data API v3 integration to fetch playlist metadata
- 12 monthly playlists aggregated into single 365-day dataset
- Video data includes: dayNumber, youtubeId, title, scriptureReference
- No database for video data (fetched fresh from YouTube API)

### Data Storage Solutions

**User Data (Client-Side)**
- LocalStorage for all user progress and preferences
- No server-side user accounts or authentication currently implemented
- Schema includes basic User model (id, username, password) prepared for future use

**Content Data**
- YouTube as content delivery platform
- Playlist-based organization (12 monthly playlists)
- Video metadata cached client-side via React Query

**Database Schema (Prepared but Unused)**
- PostgreSQL schema defined via Drizzle ORM
- Users table ready for authentication implementation
- Schema location: `shared/schema.ts`
- Migration support configured via drizzle-kit

### External Dependencies

**YouTube Data API v3**
- Playlist data retrieval for 12 monthly playlists
- Video metadata extraction (title, position, videoId)
- Requires YOUTUBE_API_KEY environment variable
- Rate limits apply per Google's API quotas

**UI Component Libraries**
- Radix UI: Comprehensive set of accessible primitives (@radix-ui/react-*)
- Embla Carousel for potential carousel functionality
- Lucide React for icon system
- date-fns for date manipulation and formatting

**Development Dependencies**
- Drizzle ORM with PostgreSQL dialect (prepared for future use)
- Zod for schema validation
- ESBuild for server bundling in production
- tsx for TypeScript execution in development

**Session Management (Prepared)**
- express-session with connect-pg-simple store configured
- Currently using in-memory storage (MemStorage class)
- Database credentials configured via DATABASE_URL environment variable

**Build & Deployment**
- Vite builds client to `dist/public`
- ESBuild bundles server to `dist/index.cjs`
- Whitelist strategy for server dependencies (reduces syscalls)
- Production server serves static files from compiled build