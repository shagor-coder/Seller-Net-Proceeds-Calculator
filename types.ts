
export interface SellerCosts {
  salePrice: number;
  purchasePrice: number;
  mortgagePayoff: number;
  otherLiens: number;
  agentCommissionPercent: number;
  buyerAgentCommissionPercent: number;
  closingCostsPercent: number;
  proratedPropertyTaxes: number;
  repairCredits: number;
  otherFees: number;
}

export interface CalculationResult {
  grossSale: number;
  totalCommissions: number;
  totalClosingCosts: number;
  sellingExpenses: number; // Negotiable costs
  debtPayoff: number;      // Unavoidable debt
  totalDeductions: number;
  netProceeds: number;
  appreciation: number;    // Sale Price - Purchase Price
  breakdown: Array<{ name: string; value: number; fill: string }>;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
