import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Home from "./pages/home";
import Prediction from "./pages/prediction";
import FutureRisks from "./pages/future-risks";
import NotFound from "./pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/prediction" component={Prediction} />
      <Route path="/future-risks" component={FutureRisks} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Router />
          </main>
          <footer className="bg-gray-900 text-white py-12 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                      </svg>
                    </div>
                    <span className="text-xl font-bold">AquaSmart</span>
                  </div>
                  <p className="text-gray-400 text-sm">AI-driven platform for sustainable water conservation and community awareness.</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Features</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">AI Predictions</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Smart Assistant</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Community Dashboard</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Conservation Tips</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Resources</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Water Crisis Guide</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">IoT Integration</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">API Documentation</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Community Forum</a></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4">Connect</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Support</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Join Newsletter</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Partnership</a></li>
                    <li><a href="#" className="hover:text-white transition-colors duration-200">Sustainability Report</a></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8 mt-8 text-center">
                <p className="text-gray-400 text-sm">&copy; 2024 AquaSmart. Built for AURA Challenge - Smart Resource Management & AI-Driven Sustainability.</p>
              </div>
            </div>
          </footer>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
