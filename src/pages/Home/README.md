# Home Page - Simple Design

Clean and simple home page for viewing and joining cricket matches and tournaments.

## Design Philosophy

- **Simple & Clean**: Minimal design with focus on content
- **Easy to Understand**: Clear information hierarchy
- **Single Color**: Uses primary green color, no gradients
- **Functional**: All information at a glance

## Features

### 1. Filters
- **City Dropdown**: Select city or "All Cities"
- **Area Dropdown**: Select area (enabled when city selected)
- **Date Chips**: Quick filters - All, Past, Today, Upcoming
- **Clean Layout**: Compact filter bar with white background

### 2. Match Cards
Matches are open events where players can join (not team vs team).

**Information Displayed:**
- Match title
- Description
- Date (day, month, year)
- Time
- Venue and area
- Player count (joined/max)
- Spots available
- Status badge (upcoming/live/completed)

**Example:**
```
Evening Cricket Match
Friendly evening match, all skill levels welcome

Wed, Jan 29, 2025
18:00
Shivaji Stadium, Kothrud
12 / 16 Players [4 spots left]
```

### 3. Tournament Cards
Simple tournament information with progress tracking.

**Information Displayed:**
- Tournament name
- Description
- Progress bar (completed/total matches)
- Date range
- Location
- Total matches
- Status badge

### 4. Layout
- **Responsive Grid**: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- **Consistent Spacing**: 2-unit spacing between cards
- **White Cards**: Clean white cards with subtle borders
- **Gray Background**: Light gray (#f9fafb) page background

## Components

### FilterBar
Simple filter controls with dropdowns and chips.
- Compact design
- White background
- Subtle shadow

### MatchCard
Clean card showing match details.
- Title and description
- Date, time, location
- Player count with availability
- Status badge
- No gradients, simple borders

### TournamentCard
Tournament information with progress.
- Name and description
- Progress bar
- Date range
- Location and match count
- Status badge

### SectionHeader
Simple section title with count badge.
- Bold title
- Count in colored badge
- Minimal spacing

### EmptyState
Clean empty state message.
- Search icon
- Message text
- Filter suggestion
- Dashed border

## Color Scheme

**Primary Color:** Green (#16a34a)
- Used for: Primary buttons, badges, active states

**Background Colors:**
- Page: #f9fafb (light gray)
- Cards: #ffffff (white)
- Empty state: #f9fafb

**Text Colors:**
- Primary: Default text color
- Secondary: Gray for less important info

**Borders:**
- Cards: #e5e7eb (light gray)
- Empty state: #d1d5db (dashed)

**Status Colors:**
- Live: Red (error)
- Upcoming: Green (primary)
- Completed: Green (success)
- Ongoing: Green (primary)

## Match Structure

Matches are **open events** where:
- Anyone can join
- Maximum player limit (e.g., 16 players)
- When full, teams are formed (e.g., 8 vs 8)
- Shows available spots
- No pre-defined teams

## Data Structure

### Match
```typescript
{
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  area: string;
  maxPlayers: number;
  joinedPlayers: number;
  status: 'upcoming' | 'live' | 'completed';
  description?: string;
}
```

### Tournament
```typescript
{
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  city: string;
  area: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  totalMatches: number;
  completedMatches: number;
  description?: string;
}
```

## Styling Guidelines

### Cards
- Border radius: 8px (2 units)
- Border: 1px solid #e5e7eb
- Padding: 20px (2.5 units)
- Hover: Subtle shadow increase
- No gradients

### Typography
- Title: h6, 600 weight
- Body: body2, regular weight
- Secondary: Smaller, gray color

### Spacing
- Card spacing: 16px (2 units)
- Internal spacing: 12-16px
- Section spacing: 32px (4 units)

### Shadows
- Default: 0 1px 3px rgba(0, 0, 0, 0.1)
- Hover: 0 4px 12px rgba(0, 0, 0, 0.1)
- No heavy shadows

## Responsive Design

**Mobile (xs):**
- 1 column layout
- Stacked filters
- Full width cards

**Tablet (sm):**
- 2 column layout
- Horizontal filters
- Medium cards

**Desktop (md+):**
- 3 column layout
- Horizontal filters
- Optimal card size

## User Experience

1. **Quick Scanning**: All info visible without clicking
2. **Clear Status**: Color-coded status badges
3. **Availability**: Shows spots left for matches
4. **Simple Filters**: Easy to understand and use
5. **No Clutter**: Clean, minimal design
6. **Fast Loading**: Simple components load quickly

## Future Enhancements

- Join match button
- Match details page
- User authentication
- Booking system
- Notifications
- Search functionality
- Sort options
- Map view
