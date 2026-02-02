# Booking Page

Simple booking page for reserving slots in cricket matches.

## Features

### 1. Player Count Selection
- **Max 8 slots** per booking
- Grid layout (4 columns)
- Visual selection indicator
- Limited by available spots
- Warning message when spots are limited

### 2. Player Details
- **Player 1 (You)**: Pre-filled with logged-in user's name
  - Name field is disabled
  - Green background to indicate it's you
  - Helper text: "Your name is pre-filled from your profile"
  
- **Additional Players** (if booking for more than 1):
  - Only requires **Full Name**
  - No WhatsApp number needed
  - Gray background for other players

### 3. Price Summary
- Price per player
- Number of players selected
- **Total amount** (auto-calculated)
- Savings message for group bookings

### 4. Complete Payment
- Sticky bottom bar
- Shows total amount
- Disabled until all names are filled
- Payment button

## Booking Rules

### Maximum Slots
- **1 user can book maximum 8 slots**
- Limited by available spots in match
- If only 5 spots available, can only book 5

### Player Information
- **Player 1**: Always the logged-in user (pre-filled, disabled)
- **Players 2-8**: Only name required (no phone number)

### Form Validation
- All player names must be filled
- Player 1 name cannot be empty (pre-filled)
- Payment button disabled until form is valid

## User Flow

1. **Select Number of Players** (1-8)
   - Click on number button
   - Grid shows all available options

2. **Enter Player Names**
   - Player 1: Already filled (You)
   - Players 2+: Enter names

3. **Review Price**
   - See per-player price
   - See total amount
   - See savings message

4. **Complete Payment**
   - Click "Complete Payment"
   - Payment integration (coming soon)

## Data Structure

### BookingPlayer
```typescript
{
  name: string;
}
```

### Booking Data
```typescript
{
  matchId: string;
  numberOfPlayers: number;
  players: BookingPlayer[];
  totalAmount: number;
}
```

## Example

### Booking for 1 Player
```
Player 1 (You): Rahul Sharma [Disabled]
Total: ₹200
```

### Booking for 3 Players
```
Player 1 (You): Rahul Sharma [Disabled]
Player 2: Amit Patel
Player 3: Vijay Kumar
Total: ₹600
```

## Styling

### Player 1 (You)
- Background: Light green (#f0fdf4)
- Border: Green (#bbf7d0)
- Disabled input
- Helper text shown

### Other Players
- Background: Light gray (#f9fafb)
- Border: Gray (#e5e7eb)
- Enabled input
- No helper text

## Future Enhancements

- Payment gateway integration
- Booking confirmation email/SMS
- Booking history
- Cancel booking
- Modify booking
- Add player profile pictures
- Team assignment preview
