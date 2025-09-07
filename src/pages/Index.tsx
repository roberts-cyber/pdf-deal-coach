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
            Salary Offer 
            <span className="bg-gradient-to-r from-accent to-accent-glow bg-clip-text text-transparent"> Negotiation</span> Hub
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Upload your job offer letter and get instant AI-powered salary analysis with expert negotiation strategies to maximize your compensation.
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
            <h2 className="text-3xl font-bold mb-4">Why Use Our Salary Analysis?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get data-driven insights to negotiate your best possible salary and benefits package with confidence.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent-foreground font-bold">AI</span>
              </div>
              <h3 className="font-semibold mb-2">Market Rate Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Compare your offer against current market data to identify undervalued compensation.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-success-foreground font-bold">💡</span>
              </div>
              <h3 className="font-semibold mb-2">Negotiation Scripts</h3>
              <p className="text-muted-foreground text-sm">
                Get specific talking points and counter-offer templates for salary discussions.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-foreground font-bold">⚡</span>
              </div>
              <h3 className="font-semibold mb-2">Counter Offer Builder</h3>
              <p className="text-muted-foreground text-sm">
                Generate professional counter-offer proposals with specific salary ranges and justifications.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;