import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
  Chip
} from '@mui/material';
import { ChevronDown, Search, BookOpen } from 'lucide-react';

interface Term {
  term: string;
  category: string;
  definition: string;
  example?: string;
  priceRange?: string;
}

const renovationTerms: Term[] = [
  {
    term: 'SPC Vinyl Flooring',
    category: 'Flooring',
    definition: 'Stone Plastic Composite flooring - a rigid, waterproof flooring made from limestone and stabilizers. More durable than regular vinyl.',
    example: 'Common in HDB flats, bedrooms, and living rooms',
    priceRange: 'S$70-110 per sqm installed'
  },
  {
    term: 'Quartz Countertop',
    category: 'Kitchen',
    definition: 'Engineered stone made from 90-95% crushed quartz mixed with resin. Non-porous, heat-resistant, and scratch-resistant.',
    example: 'Popular brands: Caesarstone, Silestone, Compac',
    priceRange: 'S$180-350 per linear foot'
  },
  {
    term: 'False Ceiling',
    category: 'Ceiling',
    definition: 'Secondary ceiling hung below the main structural ceiling to hide wiring, pipes, or create design features. Usually made from gypsum board.',
    example: 'Used to install recessed lighting or create cove lighting',
    priceRange: 'S$150-250 per sqm'
  },
  {
    term: 'Marine Plywood',
    category: 'Carpentry',
    definition: 'High-quality plywood made with waterproof glue. More moisture-resistant than regular plywood. Recommended for kitchen cabinets in humid Singapore.',
    example: 'Essential for kitchen cabinets near sink areas',
    priceRange: 'Adds S$200-400 per cabinet set vs regular plywood'
  },
  {
    term: 'Laminate',
    category: 'Materials',
    definition: 'Decorative surface finish made of thin plastic layers. Applied to plywood for cabinets and furniture. Less expensive than veneer.',
    example: 'Formica, Egger are common laminate brands',
    priceRange: 'Standard cabinet: S$500-800 per linear ft'
  },
  {
    term: 'Soft-close Hinges',
    category: 'Hardware',
    definition: 'Cabinet hinges with hydraulic dampers that prevent doors from slamming. Quieter and reduces wear on cabinets.',
    example: 'Blum is the premium brand for soft-close systems',
    priceRange: 'Adds S$8-15 per hinge'
  },
  {
    term: 'Backsplash / Splashback',
    category: 'Kitchen',
    definition: 'Protective wall covering behind kitchen countertop and stove to prevent water/oil damage. Usually ceramic or porcelain tiles.',
    example: 'Typically 60cm height above countertop',
    priceRange: 'S$250-400 per sqm including tiles and installation'
  },
  {
    term: 'Homogeneous Tiles',
    category: 'Flooring',
    definition: 'Porcelain tiles with color running through entire thickness. More durable than ceramic, better for high-traffic areas.',
    example: 'Recommended for living room, kitchen, and balcony',
    priceRange: 'S$45-80 per sqm (tiles only, add S$25-35 for installation)'
  },
  {
    term: 'Hacking',
    category: 'Demolition',
    definition: 'Demolition work to remove existing walls, tiles, or flooring. Required before new installation. Generates debris.',
    example: 'Floor tile hacking before installing new flooring',
    priceRange: 'S$3-8 per sqft depending on material'
  },
  {
    term: 'Screeding',
    category: 'Flooring',
    definition: 'Applying cement layer to level the floor surface before installing tiles or vinyl. Essential for even flooring.',
    example: 'Always required after floor hacking',
    priceRange: 'S$8-12 per sqm'
  },
  {
    term: 'Skim Coat',
    category: 'Painting',
    definition: 'Thin layer of plaster applied to walls to create smooth surface before painting. Removes minor imperfections.',
    example: 'Essential for newly plastered walls or repair works',
    priceRange: 'S$2-4 per sqft'
  },
  {
    term: 'Feature Wall',
    category: 'Living Room',
    definition: 'Accent wall with special treatment - can be built-in shelving, textured panels, or different color. Usually behind TV or sofa.',
    example: 'TV console with storage and display shelves',
    priceRange: 'S$7,000-15,000 depending on complexity'
  },
  {
    term: 'Cove Lighting',
    category: 'Lighting',
    definition: 'Indirect lighting installed in recessed ceiling grooves. Creates ambient lighting without visible light source.',
    example: 'LED strips hidden in false ceiling perimeter',
    priceRange: 'S$50-80 per linear meter'
  },
  {
    term: 'Downlight',
    category: 'Lighting',
    definition: 'Recessed ceiling light fixture that directs light downward. Usually LED. Requires false ceiling for installation.',
    example: '3-inch or 4-inch diameter, warm white or cool white',
    priceRange: 'S$15-45 per unit installed'
  },
  {
    term: 'Sanitary Ware',
    category: 'Bathroom',
    definition: 'Bathroom fixtures including toilet bowl, sink/basin, shower set, and accessories. Quality varies significantly.',
    example: 'Grohe, American Standard are premium brands',
    priceRange: 'Basic set: S$800-1,500, Premium: S$2,500-5,000'
  },
  {
    term: 'Shower Screen',
    category: 'Bathroom',
    definition: 'Glass partition separating shower area from rest of bathroom. Prevents water from splashing out.',
    example: 'Tempered glass 8mm or 10mm thickness',
    priceRange: 'S$550-1,200 depending on size and hardware'
  },
  {
    term: 'Overlay',
    category: 'Carpentry',
    definition: 'Thickness of cabinet door overhang covering the carcass. Full overlay means door completely covers frame, giving modern look.',
    example: 'Full overlay vs half overlay affects cabinet appearance',
    priceRange: 'Full overlay adds S$100-200 per cabinet'
  },
  {
    term: 'Linear Foot',
    category: 'Measurement',
    definition: 'Measurement unit for countertops and cabinets. One linear foot = 12 inches of length, regardless of depth.',
    example: '8 linear feet of kitchen cabinet = 8 feet long counter',
    priceRange: 'Kitchen cabinets typically S$1,000-1,600 per linear ft'
  },
  {
    term: 'Built-in Wardrobe',
    category: 'Bedroom',
    definition: 'Custom-made wardrobe fitted into wall recess or built floor-to-ceiling. Maximizes storage space.',
    example: 'Usually includes hanging space, drawers, and shelves',
    priceRange: 'S$5,500-8,000 per wardrobe (typical 2.4m width)'
  },
  {
    term: 'Carpentry Package',
    category: 'General',
    definition: 'Bundled quotation covering all custom woodwork - kitchen cabinets, wardrobes, shoe cabinets, TV console.',
    example: 'Typical HDB package includes kitchen + 2 wardrobes + shoe cabinet',
    priceRange: 'S$15,000-30,000 for 4-room HDB'
  }
];

const categories = Array.from(new Set(renovationTerms.map(t => t.category))).sort();

export default function RenovationAppendix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = renovationTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BookOpen size={32} style={{ marginRight: 12, color: '#1976d2' }} />
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Renovation Dictionary
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          Understand every technical term in your quotation
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder="Search for terms like 'quartz', 'hacking', 'laminate'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Chip
              label="All Categories"
              onClick={() => setSelectedCategory(null)}
              color={selectedCategory === null ? 'primary' : 'default'}
              variant={selectedCategory === null ? 'filled' : 'outlined'}
            />
            {categories.map(category => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {filteredTerms.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No terms found matching "{searchQuery}"
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Showing {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''}
          </Typography>
          {filteredTerms.map((term, idx) => (
            <Accordion key={idx} sx={{ mb: 1 }}>
              <AccordionSummary expandIcon={<ChevronDown />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
                    {term.term}
                  </Typography>
                  <Chip label={term.category} size="small" color="primary" variant="outlined" />
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="body1" paragraph>
                    {term.definition}
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                    {term.example && (
                      <Box sx={{ flex: 1 }}>
                        <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                          <CardContent>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                              Example / Common Use
                            </Typography>
                            <Typography variant="body2">
                              {term.example}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    )}

                    {term.priceRange && (
                      <Box sx={{ flex: 1 }}>
                        <Card variant="outlined" sx={{ bgcolor: '#e3f2fd' }}>
                          <CardContent>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'primary.main' }}>
                              Typical Singapore Price Range
                            </Typography>
                            <Typography variant="body2">
                              {term.priceRange}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      )}

      <Card sx={{ mt: 4, bgcolor: '#fffbf0', borderLeft: '4px solid #ff9800' }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Can't Find a Term?
          </Typography>
          <Typography variant="body2">
            If you encounter an unfamiliar term in your quotation that's not listed here,
            ask your interior designer for clarification. Reputable vendors should be willing
            to explain every line item in plain language.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
