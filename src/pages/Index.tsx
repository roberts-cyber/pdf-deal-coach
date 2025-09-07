import { PDFAnalyzer } from '@/components/PDFAnalyzer';
import heroImage from '@/assets/pdf-analysis-hero.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-glow/90" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            PDF Analysis & 
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent"> Negotiation</span> Hub
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Upload your business documents and get instant AI-powered analysis with expert negotiation tips to secure better deals.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <PDFAnalyzer />
        </div>
      </section>

      {/* Features */}
      <section className="bg-card py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Analysis?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get professional-grade insights that help you negotiate better terms and identify potential risks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-foreground font-bold">AI</span>
              </div>
              <h3 className="font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Advanced algorithms analyze your documents for key terms, risks, and opportunities.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-success-foreground font-bold">💡</span>
              </div>
              <h3 className="font-semibold mb-2">Expert Tips</h3>
              <p className="text-muted-foreground text-sm">
                Get actionable negotiation strategies based on industry best practices.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Instant Results</h3>
              <p className="text-muted-foreground text-sm">
                Get comprehensive analysis and recommendations in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;