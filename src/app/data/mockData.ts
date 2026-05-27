import { Quotation, BenchmarkPrice } from '../types';

export const mockQuotations: Quotation[] = [
  {
    id: 'q1',
    vendorName: 'Design Studio A',
    uploadDate: new Date('2026-05-15'),
    totalAmount: 48500,
    items: [
      {
        id: 'q1-1',
        category: 'Living Room',
        description: 'TV Feature Wall with Storage',
        quantity: 1,
        unit: 'set',
        unitPrice: 8500,
        total: 8500,
        materialSpec: 'Plywood with laminate finish',
        brand: 'Formica',
        breakdown: { material: 5500, labor: 3000 }
      },
      {
        id: 'q1-2',
        category: 'Living Room',
        description: 'Ceiling False Ceiling with LED Strip',
        quantity: 12,
        unit: 'sqm',
        unitPrice: 180,
        total: 2160,
        materialSpec: 'Gypsum board',
        brand: 'Gyproc',
        breakdown: { material: 1200, labor: 960 }
      },
      {
        id: 'q1-3',
        category: 'Kitchen',
        description: 'Kitchen Cabinet with Countertop',
        quantity: 8,
        unit: 'linear ft',
        unitPrice: 1200,
        total: 9600,
        materialSpec: 'Solid plywood carcass, quartz countertop',
        brand: 'Caesarstone',
        breakdown: { material: 6800, labor: 2800 }
      },
      {
        id: 'q1-4',
        category: 'Kitchen',
        description: 'Backsplash Tiling',
        quantity: 4,
        unit: 'sqm',
        unitPrice: 280,
        total: 1120,
        materialSpec: 'Ceramic tiles',
        brand: 'Generic',
        breakdown: { material: 720, labor: 400 }
      },
      {
        id: 'q1-5',
        category: 'Bedroom',
        description: 'Wardrobe System',
        quantity: 2,
        unit: 'set',
        unitPrice: 6500,
        total: 13000,
        materialSpec: 'Plywood with melamine finish',
        brand: 'Egger',
        breakdown: { material: 9000, labor: 4000 }
      },
      {
        id: 'q1-6',
        category: 'Bathroom',
        description: 'Complete Bathroom Renovation',
        quantity: 1,
        unit: 'set',
        unitPrice: 8500,
        total: 8500,
        materialSpec: 'Floor tiles, wall tiles, sanitary ware',
        breakdown: { material: 5500, labor: 3000 }
      },
      {
        id: 'q1-7',
        category: 'Flooring',
        description: 'Vinyl Flooring Installation',
        quantity: 45,
        unit: 'sqm',
        unitPrice: 85,
        total: 3825,
        materialSpec: 'SPC vinyl flooring',
        brand: 'Floorify',
        breakdown: { material: 2700, labor: 1125 }
      },
      {
        id: 'q1-8',
        category: 'Painting',
        description: 'Full House Painting',
        quantity: 1,
        unit: 'lot',
        unitPrice: 1795,
        total: 1795,
        materialSpec: 'Premium odorless paint',
        brand: 'Nippon',
        breakdown: { material: 795, labor: 1000 }
      }
    ],
    notes: 'Includes 1-year warranty on workmanship'
  },
  {
    id: 'q2',
    vendorName: 'Reno Masters',
    uploadDate: new Date('2026-05-18'),
    totalAmount: 52800,
    items: [
      {
        id: 'q2-1',
        category: 'Living Room',
        description: 'Feature Wall Package',
        quantity: 1,
        unit: 'set',
        unitPrice: 9200,
        total: 9200,
        materialSpec: 'MDF with veneer finish, includes shelving',
        brand: 'Custom',
        breakdown: { material: 6000, labor: 3200 }
      },
      {
        id: 'q2-2',
        category: 'Living Room',
        description: 'False Ceiling with Downlights',
        quantity: 12,
        unit: 'sqm',
        unitPrice: 220,
        total: 2640,
        materialSpec: 'Gypsum board with 8 LED downlights included',
        brand: 'Gyproc',
        breakdown: { material: 1560, labor: 1080 }
      },
      {
        id: 'q2-3',
        category: 'Kitchen',
        description: 'Modular Kitchen System',
        quantity: 8,
        unit: 'linear ft',
        unitPrice: 1450,
        total: 11600,
        materialSpec: 'Marine plywood, quartz countertop, soft-close hinges',
        brand: 'Caesarstone Premium',
        breakdown: { material: 8200, labor: 3400 }
      },
      {
        id: 'q2-4',
        category: 'Kitchen',
        description: 'Splashback Installation',
        quantity: 4,
        unit: 'sqm',
        unitPrice: 320,
        total: 1280,
        materialSpec: 'Porcelain tiles with grout sealing',
        brand: 'Roca',
        breakdown: { material: 880, labor: 400 }
      },
      {
        id: 'q2-5',
        category: 'Bedroom',
        description: 'Built-in Wardrobe',
        quantity: 2,
        unit: 'set',
        unitPrice: 7200,
        total: 14400,
        materialSpec: 'Marine plywood with laminate, soft-close',
        brand: 'Egger Premium',
        breakdown: { material: 10000, labor: 4400 }
      },
      {
        id: 'q2-6',
        category: 'Bathroom',
        description: 'Bathroom Makeover',
        quantity: 1,
        unit: 'set',
        unitPrice: 9500,
        total: 9500,
        materialSpec: 'Premium tiles, Grohe fixtures, glass partition',
        brand: 'Grohe',
        breakdown: { material: 6500, labor: 3000 }
      },
      {
        id: 'q2-7',
        category: 'Flooring',
        description: 'Premium Vinyl Flooring',
        quantity: 45,
        unit: 'sqm',
        unitPrice: 95,
        total: 4275,
        materialSpec: 'SPC luxury vinyl with underlayment',
        brand: 'Karndean',
        breakdown: { material: 3150, labor: 1125 }
      },
      {
        id: 'q2-8',
        category: 'Electrical',
        description: 'Electrical Works & Rewiring',
        quantity: 1,
        unit: 'lot',
        unitPrice: 2500,
        total: 2500,
        materialSpec: 'Complete electrical inspection and upgrades',
        breakdown: { material: 1200, labor: 1300 }
      }
    ],
    notes: '2-year warranty, includes post-renovation cleaning'
  },
  {
    id: 'q3',
    vendorName: 'Interior Craft Co.',
    uploadDate: new Date('2026-05-20'),
    totalAmount: 43200,
    items: [
      {
        id: 'q3-1',
        category: 'Living Room',
        description: 'TV Console & Feature Wall',
        quantity: 1,
        unit: 'set',
        unitPrice: 7800,
        total: 7800,
        materialSpec: 'Plywood with paint finish',
        brand: 'Generic',
        breakdown: { material: 4800, labor: 3000 }
      },
      {
        id: 'q3-2',
        category: 'Living Room',
        description: 'Ceiling Works',
        quantity: 12,
        unit: 'sqm',
        unitPrice: 150,
        total: 1800,
        materialSpec: 'Gypsum board, lighting extra',
        brand: 'Standard',
        breakdown: { material: 960, labor: 840 }
      },
      {
        id: 'q3-3',
        category: 'Kitchen',
        description: 'Kitchen Cabinets',
        quantity: 8,
        unit: 'linear ft',
        unitPrice: 980,
        total: 7840,
        materialSpec: 'Plywood carcass, laminate countertop',
        brand: 'Formica',
        breakdown: { material: 5200, labor: 2640 }
      },
      {
        id: 'q3-4',
        category: 'Bedroom',
        description: 'Wardrobe',
        quantity: 2,
        unit: 'set',
        unitPrice: 5500,
        total: 11000,
        materialSpec: 'Plywood with laminate',
        brand: 'Standard',
        breakdown: { material: 7200, labor: 3800 }
      },
      {
        id: 'q3-5',
        category: 'Bathroom',
        description: 'Bathroom Renovation',
        quantity: 1,
        unit: 'set',
        unitPrice: 7500,
        total: 7500,
        materialSpec: 'Standard tiles and fittings',
        brand: 'HDB Grade',
        breakdown: { material: 4800, labor: 2700 }
      },
      {
        id: 'q3-6',
        category: 'Flooring',
        description: 'Vinyl Floor Installation',
        quantity: 45,
        unit: 'sqm',
        unitPrice: 72,
        total: 3240,
        materialSpec: 'Standard SPC vinyl',
        brand: 'Generic',
        breakdown: { material: 2250, labor: 990 }
      },
      {
        id: 'q3-7',
        category: 'Painting',
        description: 'House Painting',
        quantity: 1,
        unit: 'lot',
        unitPrice: 1520,
        total: 1520,
        materialSpec: 'Standard paint, 2 coats',
        brand: 'Dulux',
        breakdown: { material: 620, labor: 900 }
      },
      {
        id: 'q3-8',
        category: 'Doors',
        description: 'Bedroom Door Replacement',
        quantity: 2,
        unit: 'unit',
        unitPrice: 750,
        total: 1500,
        materialSpec: 'Solid core doors with hardware',
        brand: 'Standard',
        breakdown: { material: 1000, labor: 500 }
      }
    ],
    notes: '1-year warranty on carpentry work'
  }
];

export const benchmarkPrices: BenchmarkPrice[] = [
  { category: 'Living Room', itemType: 'TV Feature Wall', minPrice: 7000, maxPrice: 12000, averagePrice: 8800, unit: 'set' },
  { category: 'Living Room', itemType: 'False Ceiling', minPrice: 150, maxPrice: 250, averagePrice: 190, unit: 'sqm' },
  { category: 'Kitchen', itemType: 'Kitchen Cabinet', minPrice: 1000, maxPrice: 1600, averagePrice: 1250, unit: 'linear ft' },
  { category: 'Kitchen', itemType: 'Backsplash', minPrice: 250, maxPrice: 400, averagePrice: 300, unit: 'sqm' },
  { category: 'Bedroom', itemType: 'Wardrobe', minPrice: 5500, maxPrice: 8000, averagePrice: 6500, unit: 'set' },
  { category: 'Bathroom', itemType: 'Bathroom Renovation', minPrice: 7500, maxPrice: 12000, averagePrice: 9000, unit: 'set' },
  { category: 'Flooring', itemType: 'Vinyl Flooring', minPrice: 70, maxPrice: 110, averagePrice: 85, unit: 'sqm' },
  { category: 'Painting', itemType: 'House Painting', minPrice: 1200, maxPrice: 2500, averagePrice: 1700, unit: 'lot' },
  { category: 'Electrical', itemType: 'Electrical Works', minPrice: 2000, maxPrice: 3500, averagePrice: 2500, unit: 'lot' },
  { category: 'Doors', itemType: 'Door Replacement', minPrice: 600, maxPrice: 1000, averagePrice: 750, unit: 'unit' }
];
