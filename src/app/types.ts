export interface QuotationItem {
  id: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  materialSpec?: string;
  brand?: string;
  breakdown?: {
    material: number;
    labor: number;
    other?: number;
  };
}

export interface Quotation {
  id: string;
  vendorName: string;
  uploadDate: Date;
  totalAmount: number;
  items: QuotationItem[];
  notes?: string;
}

export interface BenchmarkPrice {
  category: string;
  itemType: string;
  minPrice: number;
  maxPrice: number;
  averagePrice: number;
  unit: string;
}

export interface ComparisonInsight {
  type: 'missing' | 'overpriced' | 'underpriced' | 'quality' | 'bundled';
  severity: 'low' | 'medium' | 'high';
  quotationId: string;
  itemId?: string;
  message: string;
  details?: string;
}
