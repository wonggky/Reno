import { Box, Container, Typography, Card, CardContent, Button } from '@mui/material';
import { Upload, TrendingUp, Shield, BookOpen, CheckCircle, AlertCircle } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const features = [
    {
      icon: <Upload size={40} />,
      title: 'Easy Upload',
      description: 'Upload multiple renovation quotations from different interior designers in PDF, Excel, or CSV format.'
    },
    {
      icon: <TrendingUp size={40} />,
      title: 'Smart Comparison',
      description: 'Automatically categorize and compare line items side-by-side in a standardized format.'
    },
    {
      icon: <Shield size={40} />,
      title: 'Price Transparency',
      description: 'Identify overpriced items, missing work scopes, and hidden costs before signing contracts.'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Renovation Dictionary',
      description: 'Understand technical jargon with our comprehensive renovation terminology guide.'
    }
  ];

  const problems = [
    'Different quotation formats make comparison difficult',
    'Technical terms are confusing for first-time renovators',
    'No visibility into fair market pricing',
    'Hidden costs discovered only during renovation',
    'Bundled items hide true component costs',
    'Material quality differences not clearly explained'
  ];

  const solutions = [
    'Standardized comparison format across all vendors',
    'Automated categorization and line-item matching',
    'Singapore market benchmark pricing data',
    'Missing item detection and alerts',
    'Breakdown of bundled packages',
    'Material specification comparison'
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 2
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
            <Box sx={{ flex: { xs: '1', md: '0 0 58%' } }}>
              <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
                Make Smarter Renovation Decisions
              </Typography>
              <Typography variant="h5" sx={{ mb: 3, opacity: 0.95 }}>
                Singapore's First Quotation Comparison Platform
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                Stop overpaying for renovations. Our transparency layer helps you compare quotations,
                understand pricing, and make informed decisions.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={onGetStarted}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: 18,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#f5f5f5'
                  }
                }}
              >
                Get Started Free
              </Button>
            </Box>
            <Box sx={{ flex: { xs: '1', md: '0 0 42%' }, width: '100%' }}>
              <Card sx={{ bgcolor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', color: 'white' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Average Savings
                  </Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    S$4,300
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Homeowners save an average of S$4,300 by comparing 3+ quotations
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* The Problem */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            The Renovation Industry Problem
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 4 }}>
            Information asymmetry leaves homeowners at a disadvantage
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', bgcolor: '#fff3e0' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <AlertCircle size={24} color="#e65100" />
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                      Common Challenges
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {problems.map((problem, idx) => (
                      <Typography component="li" key={idx} variant="body2" sx={{ mb: 1 }}>
                        {problem}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', bgcolor: '#e8f5e9' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CheckCircle size={24} color="#2e7d32" />
                    <Typography variant="h6" sx={{ fontWeight: 600, ml: 1 }}>
                      Our Solutions
                    </Typography>
                  </Box>
                  <Box component="ul" sx={{ pl: 2 }}>
                    {solutions.map((solution, idx) => (
                      <Typography component="li" key={idx} variant="body2" sx={{ mb: 1 }}>
                        {solution}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 3, textAlign: 'center' }}>
            How It Works
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3 }}>
            {features.map((feature, idx) => (
              <Card key={idx} sx={{ height: '100%', textAlign: 'center', p: 2 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Transparency Layer Explanation */}
        <Box sx={{ mb: 6 }}>
          <Card sx={{ bgcolor: '#f5f5f5' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
                Our Transparency Layer
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    What is Information Asymmetry?
                  </Typography>
                  <Typography variant="body1" paragraph>
                    In the renovation industry, interior designers and contractors have significantly more
                    knowledge about materials, labor costs, and market pricing than homeowners. This
                    imbalance—called information asymmetry—often leads to:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      Inflated quotations that homeowners cannot verify
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      Hidden fees discovered only during renovation
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      Difficulty comparing apples-to-apples across vendors
                    </Typography>
                    <Typography component="li" variant="body1">
                      Confusion around technical terminology and materials
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    How We Level the Playing Field
                  </Typography>
                  <Typography variant="body1" paragraph>
                    RenovationCompare SG provides the transparency layer that's been missing:
                  </Typography>
                  <Box component="ul" sx={{ pl: 3 }}>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Market Benchmarks:</strong> Real Singapore renovation pricing data
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Automated Analysis:</strong> Detect overpricing and missing items instantly
                    </Typography>
                    <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                      <strong>Standardized Format:</strong> Compare any quotation side-by-side
                    </Typography>
                    <Typography component="li" variant="body1">
                      <strong>Education:</strong> Understand every term with our renovation dictionary
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Card sx={{ bgcolor: 'primary.main', color: 'white', p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to Compare Your Quotations?
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
              Join hundreds of Singapore homeowners making smarter renovation decisions
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={onGetStarted}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontSize: 18,
                px: 5,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  bgcolor: '#f5f5f5'
                }
              }}
            >
              Start Comparing Now
            </Button>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
