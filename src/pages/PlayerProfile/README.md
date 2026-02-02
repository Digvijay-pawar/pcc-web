# Player Profile Page

Clean and simple player profile page showing player details, availability, match history, and photo gallery.

## Structure

```
PlayerProfile/
├── PlayerProfile.tsx              # Main profile page
├── hook/
│   └── usePlayerProfile.tsx      # Data fetching hook
├── components/
│   ├── ProfileHeader.tsx         # Player basic info with edit button
│   ├── AvailabilitySection.tsx   # Weekly availability display
│   ├── MatchHistorySection.tsx   # List of joined matches
│   ├── GallerySection.tsx        # Photo gallery with match details
│   └── index.ts                  # Component exports
└── README.md                     # This file
```

## Features

### 1. Profile Header
- **Profile Picture**: Avatar with green border
- **Basic Info**: Name, email, phone, location
- **Member Since**: Join date display
- **Edit Button**: Opens edit profile dialog

### 2. Availability Section
- **Weekly Calendar**: M, T, W, T, F, S, S display
- **Visual Indicators**:
  - Available days: Green background, white text, bold border
  - Unavailable days: Gray background, disabled appearance
- **Summary**: Text list of available days below calendar
- **Example**: If available on Saturday & Sunday, only those two "S" boxes are highlighted

### 3. Match History
- **List View**: All matches joined by player
- **Match Details**:
  - Match title
  - Date (formatted)
  - Venue and area
- **Count Badge**: Shows total matches
- **Empty State**: Message when no matches

### 4. Statistics Card
- **Total Matches**: Count of matches joined
- **Photos**: Count of gallery photos
- **Clean Display**: Large numbers with labels

### 5. Gallery Section
- **Photo Grid**: Responsive 3-column layout
- **Photo Cards**:
  - Match photo
  - Match title
  - Date
  - Venue
- **Hover Effect**: Card lifts on hover
- **Match Context**: Each photo shows which match it's from
- **Count Badge**: Shows total photos

## Components

### ProfileHeader
Player basic information with edit functionality.

**Props:**
- `player: Player` - Player data
- `onEditProfile: () => void` - Edit button handler

**Features:**
- Large avatar with border
- Contact information with icons
- Edit profile button
- Responsive layout

### AvailabilitySection
Weekly availability calendar display.

**Props:**
- `availability: Player['availability']` - Day-by-day availability

**Features:**
- 7-day week display (M-S)
- Color-coded availability
- Available days highlighted in green
- Unavailable days grayed out
- Text summary below calendar
- Responsive sizing

**Day Display:**
```
M  T  W  T  F  S  S
□  □  □  □  □  ✓  ✓

Available on: Saturday, Sunday
```

### MatchHistorySection
List of matches joined by player.

**Props:**
- `matches: MatchHistory[]` - Array of match records

**Features:**
- Chronological list
- Match title and details
- Date and location
- Count badge
- Empty state
- Hover effects

### GallerySection
Photo gallery with match context.

**Props:**
- `photos: GalleryPhoto[]` - Array of photos

**Features:**
- Responsive grid (3 columns on desktop)
- Photo cards with details
- Match title on each photo
- Date and venue information
- Hover animation
- Count badge
- Empty state

**Photo Card Shows:**
- Match photo (180px height)
- Match title
- Date
- Venue

## Data Structure

### Player
```typescript
{
  id: string;
  name: string;
  email: string;
  mobileNumber: string;
  city: string;
  area: string;
  profileImage?: string;
  joinedDate: string;
  availability: {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
  };
}
```

### MatchHistory
```typescript
{
  id: string;
  matchTitle: string;
  date: string;
  venue: string;
  city: string;
  area: string;
}
```

### GalleryPhoto
```typescript
{
  id: string;
  imageUrl: string;
  matchId: string;
  matchTitle: string;
  date: string;
  venue: string;
}
```

## Availability Display

### Visual Design
- **Available Day**: 
  - Green background (#16a34a)
  - White text
  - Bold border
  - Full opacity
  
- **Unavailable Day**:
  - Light gray background (#f3f4f6)
  - Gray text (#9ca3af)
  - Light border
  - Reduced opacity
  - Disabled cursor

### Example
If player is available on Saturday and Sunday:
```
M    T    W    T    F    S    S
□    □    □    □    □    ✓    ✓
Gray Gray Gray Gray Gray Green Green
```

## Layout

### Desktop (lg)
- Profile header: Full width
- Availability: Full width
- Match history: 50% width (left)
- Statistics: 50% width (right)
- Gallery: Full width, 3 columns

### Tablet (md)
- Profile header: Full width
- Availability: Full width
- Match history: 50% width
- Statistics: 50% width
- Gallery: Full width, 2 columns

### Mobile (xs)
- All sections: Full width
- Gallery: 1 column
- Stacked layout

## Styling

### Colors
- Primary: Green (#16a34a)
- Background: Light gray (#f9fafb)
- Cards: White
- Borders: #e5e7eb
- Text: Default black/gray

### Cards
- Border radius: 8px
- Border: 1px solid #e5e7eb
- Padding: 24px
- Background: White

### Spacing
- Section spacing: 24px
- Card spacing: 16px
- Internal spacing: 12-16px

## User Actions

### Edit Profile
- Click "Edit Profile" button
- Opens edit dialog/page
- Can update:
  - Name
  - Email
  - Phone
  - Location
  - Profile picture
  - Availability

### View Match Details
- Click on match in history
- Opens match details page

### View Photo
- Click on gallery photo
- Opens full-size view
- Shows match context

## Future Enhancements

- Edit availability inline
- Upload photos to gallery
- Delete photos
- Share profile
- Download statistics
- Export match history
- Print profile
- QR code for profile
- Social media links
- Performance stats
- Achievements/badges
- Friend list
- Match invitations
