import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { FileText, ExternalLink, Brain, Upload, Loader2 } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  keyPoints: string[];
  negotiationTips: string[];
  riskAssessment: string;
  recommendedActions: string[];
}

export const PDFAnalyzer = () => {
  const { toast } = useToast();
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      setPdfUrl('');
      toast({
        title: "PDF uploaded",
        description: "Ready to analyze your document",
      });
    } else {
      toast({
        title: "Invalid file",
        description: "Please select a PDF file",
        variant: "destructive",
      });
    }
  };

  const handleOpenPDF = () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
    } else if (pdfFile) {
      const fileUrl = URL.createObjectURL(pdfFile);
      window.open(fileUrl, '_blank');
    } else {
      toast({
        title: "No PDF selected",
        description: "Please upload a PDF or provide a URL first",
        variant: "destructive",
      });
    }
  };

  const mockAnalyze = async (): Promise<AnalysisResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      summary: "This appears to be a business proposal with competitive pricing and standard terms. The offer includes a 12-month contract with quarterly review periods.",
      keyPoints: [
        "Contract duration: 12 months with auto-renewal clause",
        "Payment terms: Net 30 days",
        "Service level agreement: 99.5% uptime guarantee",
        "Pricing structure: Fixed monthly fee + usage-based charges",
        "Termination clause: 60-day notice required"
      ],
      negotiationTips: [
        "Request a shorter initial contract period (6 months) to evaluate performance",
        "Negotiate payment terms to Net 15 days for better cash flow",
        "Ask for improved SLA (99.9% uptime) with penalty clauses",
        "Seek volume discounts if usage exceeds certain thresholds",
        "Include performance benchmarks with regular review meetings"
      ],
      riskAssessment: "Medium risk. The contract terms are generally favorable but lack specific penalty clauses for underperformance. The auto-renewal clause requires careful attention.",
      recommendedActions: [
        "Schedule a call to discuss contract duration flexibility",
        "Request references from similar-sized clients",
        "Clarify data security and compliance measures",
        "Define clear success metrics and KPIs",
        "Negotiate escape clauses for underperformance"
      ]
    };
  };

  const handleAnalyze = async () => {
    if (!pdfUrl && !pdfFile) {
      toast({
        title: "No PDF selected",
        description: "Please upload a PDF or provide a URL first",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await mockAnalyze();
      setAnalysisResult(result);
      toast({
        title: "Analysis complete",
        description: "Your PDF has been analyzed successfully",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-2 border-dashed border-border hover:border-accent transition-colors">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload or Link PDF
          </CardTitle>
          <CardDescription>
            Upload a PDF file or provide a URL to analyze your business document
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pdf-url">PDF URL</Label>
            <Input
              id="pdf-url"
              type="url"
              placeholder="https://example.com/document.pdf"
              value={pdfUrl}
              onChange={(e) => {
                setPdfUrl(e.target.value);
                setPdfFile(null);
              }}
            />
          </div>
          
          <div className="text-center text-muted-foreground">or</div>
          
          <div className="space-y-2">
            <Label htmlFor="pdf-file">Upload PDF File</Label>
            <Input
              id="pdf-file"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="cursor-pointer"
            />
          </div>
          
          {(pdfUrl || pdfFile) && (
            <div className="flex gap-2 pt-4">
              <Button onClick={handleOpenPDF} variant="outline" className="flex-1">
                <ExternalLink className="h-4 w-4" />
                Open PDF
              </Button>
              <Button 
                onClick={handleAnalyze} 
                variant="professional" 
                className="flex-1"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-4 w-4" />
                    Analyze & Get Tips
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysisResult.summary}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Points:</h4>
                <ul className="space-y-1">
                  {analysisResult.keyPoints.map((point, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <Brain className="h-5 w-5" />
                Negotiation Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {analysisResult.negotiationTips.map((tip, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <span className="w-6 h-6 bg-success text-success-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{analysisResult.riskAssessment}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {analysisResult.recommendedActions.map((action, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};