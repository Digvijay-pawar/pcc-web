import { Box, FormControl, InputLabel, Select, MenuItem, Stack, Chip } from '@mui/material';
import type { City, Area, FilterOptions } from '../../../types/match.types';

interface FilterBarProps {
  cities: City[];
  areas: Area[];
  filters: FilterOptions;
  onFilterChange: (key: keyof FilterOptions, value: string) => void;
}

const FilterBar = ({ cities, areas, filters, onFilterChange }: FilterBarProps) => {
  const dateFilters = [
    { value: 'all', label: 'All' },
    { value: 'past', label: 'Past' },
    { value: 'today', label: 'Today' },
    { value: 'upcoming', label: 'Upcoming' },
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 2.5,
        mb: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ xs: 'stretch', md: 'center' }}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>City</InputLabel>
          <Select
            value={filters.city}
            label="City"
            onChange={(e) => onFilterChange('city', e.target.value)}
          >
            <MenuItem value="all">All Cities</MenuItem>
            {cities.map((city) => (
              <MenuItem key={city.id} value={city.name}>
                {city.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Area</InputLabel>
          <Select
            value={filters.area}
            label="Area"
            onChange={(e) => onFilterChange('area', e.target.value)}
            disabled={filters.city === 'all'}
          >
            <MenuItem value="all">All Areas</MenuItem>
            {areas.map((area) => (
              <MenuItem key={area.id} value={area.name}>
                {area.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
          {dateFilters.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              onClick={() => onFilterChange('dateFilter', filter.value)}
              color={filters.dateFilter === filter.value ? 'primary' : 'default'}
              variant={filters.dateFilter === filter.value ? 'filled' : 'outlined'}
              size="small"
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default FilterBar;
