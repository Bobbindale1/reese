# Design Guidelines: Chronological Bible Reading Tracker

## Design Approach

**Selected Approach:** Design System-based (Material Design principles) with spiritual content focus

This is a utility application prioritizing daily engagement, clear navigation, and progress tracking. The design should create a calm, focused environment for Bible study without visual distractions.

## Typography

**Font Families:**
- Primary: Inter (UI elements, navigation, labels)
- Content: Georgia or Merriweather (devotional text, descriptions)

**Hierarchy:**
- H1: 2.5rem (40px) - Main page titles
- H2: 1.75rem (28px) - Section headers, day titles
- Body: 1rem (16px) - Standard text
- Small: 0.875rem (14px) - Meta information, dates
- Caption: 0.75rem (12px) - Video stats, footnotes

## Layout System

**Spacing Units:** Tailwind units of 2, 4, 6, 8, 12, and 16
- Component padding: p-6 to p-8
- Section spacing: mb-8 to mb-12
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-6xl

**Grid Structure:**
- Desktop: Two-column layout (video player + sidebar)
- Tablet: Stacked with sticky navigation
- Mobile: Full-width single column

## Core Components

### Video Player Section
- Full-width responsive YouTube embed (16:9 aspect ratio)
- Day number badge positioned top-left of player
- Calendar date indicator below player
- Video title and Scripture reference as h2 below player
- Check/uncheck button prominently placed below title

### Navigation Controls
**Mode Switcher:**
- Toggle between "Calendar Mode" and "Day Number Mode"
- Pill-style toggle with clear active state
- Positioned prominently at top of interface

**Day Navigation:**
- Previous/Next day buttons (large, touch-friendly)
- Jump-to-day input field (Calendar Mode: date picker, Day Number Mode: number input 1-365)
- Current position indicator showing "Day X of 365"

### Progress Dashboard (Sidebar/Panel)
- Circular progress indicator showing completion percentage
- Stats cards displaying:
  - Total videos watched
  - Current streak
  - Videos remaining
- Mini calendar grid (Calendar Mode) with watched days marked
- Day list view (Day Number Mode) with checkmarks for completed days

### Video List/History
- Scrollable list of all 365 videos
- Each item shows: day number, date (Calendar Mode), title, watched status
- Click to jump to specific video
- Visual distinction between watched/unwatched

## Component Structure

**Primary Layout:**
```
[Mode Toggle - centered, mb-8]
[Two-column grid: lg:grid-cols-[2fr,1fr]]
  Left Column:
    - Video Player (aspect-video)
    - Day Badge + Date
    - Video Title + Scripture
    - Watch/Unwatch Button (prominent, mb-6)
    - Previous/Next Navigation (flex justify-between)
  Right Column:
    - Progress Dashboard (sticky top-8)
    - Quick Stats (grid-cols-2 gap-4)
    - Calendar/List View (max-h-96 overflow-scroll)
```

**Mobile Stack:**
All elements in single column, progress dashboard below video player.

## Interactions

**Video State Management:**
- Checkmark appears when marked as watched
- Subtle visual feedback on check/uncheck
- Progress indicators update immediately
- No auto-mark (user explicitly marks completion)

**Navigation Flow:**
- Smooth transitions between videos (no page reload)
- Keyboard shortcuts: Arrow keys for previous/next
- Persistent mode selection (stored in localStorage)

## Visual Hierarchy

**Priority Levels:**
1. Video player (largest viewport allocation)
2. Mode toggle + day navigation
3. Watch/unwatch action
4. Progress tracking
5. Historical list/calendar

**Focus States:**
- Clear outlines on all interactive elements
- High contrast for accessibility
- Keyboard navigation support throughout

## Accessibility

- ARIA labels for all video controls
- Screen reader announcements for progress updates
- Focus trap in modal dialogs (if used for jump-to-day)
- Minimum touch target: 44x44px for mobile
- Color-independent status indicators (icons + text)

## Images

**No hero image required** - This is a functional web app, not a marketing page. The YouTube video player serves as the primary visual element.

**Optional decorative elements:**
- Subtle background texture or gradient in header area
- Scripture-themed iconography for progress milestones
- Calendar icons for date indicators