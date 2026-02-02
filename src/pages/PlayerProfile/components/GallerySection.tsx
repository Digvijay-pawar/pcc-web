import { Box, Typography, Stack, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { Collections, LocationOn } from '@mui/icons-material';
import type { GalleryPhoto } from '../../../types/player.types';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

const GallerySection = ({ photos }: GallerySectionProps) => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 2,
        p: 3,
        border: '1px solid #e5e7eb',
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" mb={2.5}>
        <Collections sx={{ fontSize: 24, color: 'secondary.main' }} />
        <Typography variant="h6" fontWeight="600" color="text.primary">
          Photo Gallery
        </Typography>
        <Chip
          label={photos.length}
          size="small"
          sx={{
            backgroundColor: 'secondary.main',
            color: 'white',
            fontWeight: 600,
            height: 24,
          }}
        />
      </Stack>

      {photos.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {photos.map((photo) => (
            <Box key={photo.id}>
              <Card
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
                  },
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={photo.imageUrl}
                    alt={photo.matchTitle}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(0, 0, 0, 0.6)',
                      backdropFilter: 'blur(4px)',
                      borderRadius: 1,
                      px: 1,
                      py: 0.5,
                    }}
                  >
                    <Typography variant="caption" color="white" fontWeight="600">
                      {new Date(photo.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 2, backgroundColor: '#f9fafb' }}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    color="text.primary"
                    mb={1}
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {photo.matchTitle}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {photo.venue}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            backgroundColor: '#f9fafb',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No photos yet
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default GallerySection;
