import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ImpactStats from "@/components/impact-stats";
import Chatbot from "@/components/chatbot";
import WaterTips from "@/components/water-tips";

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 mb-12" role="banner">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          Smart Water Conservation
          <span className="block text-transparent bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text">
            Powered by AI
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
          Join thousands of households reducing their water footprint with personalized insights, 
          AI-driven predictions, and community-powered conservation strategies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gradient-to-r from-blue-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            data-testid="start-conservation-button"
          >
            Start Conserving Now
          </Button>
          <Link href="/prediction">
            <Button 
              variant="outline"
              className="glass-effect text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all duration-200"
              data-testid="view-predictions-button"
            >
              View Predictions
            </Button>
          </Link>
        </div>
      </section>

      {/* Impact Stats */}
      <ImpactStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Assistant Chat */}
        <Chatbot />

        {/* Water Saving Tips */}
        <WaterTips />
      </div>
    </div>
  );
}
