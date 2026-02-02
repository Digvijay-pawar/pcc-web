# Theme Configuration

This directory contains the global theme configuration for the PCC (Pune City Cricket) application.

## Files

- `theme.ts` - Main theme configuration with MUI theme customization
- `index.ts` - Export file for easy imports

## Usage

### Using Theme in Components

```tsx
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ color: theme.palette.primary.main }}>
      Content
    </Box>
  );
};
```

### Using Gradients

```tsx
import { gradients } from '../../theme/theme';

const MyComponent = () => {
  return (
    <Box sx={{ background: gradients.primary }}>
      Content
    </Box>
  );
};
```

### Using Shadows

```tsx
import { shadows } from '../../theme/theme';

const MyComponent = () => {
  return (
    <Box sx={{ boxShadow: shadows.card }}>
      Content
    </Box>
  );
};
```

## Color Palette

### Primary Colors (Green - Cricket Field)
- Main: `#16a34a` (Cricket Green)
- Light: `#22c55e` (Light Green)
- Dark: `#15803d` (Dark Green)

### Secondary Colors (Blue - Sky/Water)
- Main: `#0284c7` (Sky Blue)
- Light: `#0ea5e9` (Light Blue)
- Dark: `#0369a1` (Dark Blue)

### Status Colors
- Success: `#22c55e` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Orange)
- Info: `#0ea5e9` (Blue)

## Gradients

- `primary` - Main gradient (Green to Blue - Field to Sky)
- `primaryDark` - Dark variant of primary gradient
- `secondary` - Secondary gradient (Blue shades)
- `light` - Light gradient (Light green to light blue)
- `greenBlue` - Vibrant green to blue gradient

## Shadows

- `card` - Standard card shadow (Green tint)
- `cardHover` - Card hover shadow (Green tint)
- `button` - Button shadow (Green tint)
- `buttonHover` - Button hover shadow (Green tint)

## Component Overrides

The theme includes default style overrides for:
- MuiButton
- MuiTextField
- MuiPaper
- MuiCard

These ensure consistent styling across the application.
