
import React from 'react';
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { 
  Users, 
  FileText, 
  Award, 
  TrendingUp, 
  ThumbsUp, 
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Impact = () => {
  return (
    <div className="bg-white pb-16">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20 text-white">
        <Container>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">Our Impact on Nutritional Science and Health Education</h1>
          <p className="text-xl opacity-90 max-w-2xl mb-8">
            Natural Pure Academy is committed to advancing scientific understanding of micronutrients and 
            their role in human health. Here's how our research and education efforts are making a difference.
          </p>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 px-4 border border-white/20">
            <Award className="mr-2 h-5 w-5 text-indigo-200" />
            <span>501(c)(3) Non-Profit Organization</span>
          </div>
        </Container>
      </div>

      {/* Impact metrics */}
      <Container className="py-16 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-white shadow-md border-t-4 border-indigo-500">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-indigo-500 mr-3" />
              <h3 className="text-xl font-semibold">15,000+</h3>
            </div>
            <p className="text-gray-600">People educated through our nutrition resources annually</p>
          </Card>

          <Card className="p-6 bg-white shadow-md border-t-4 border-emerald-500">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-emerald-500 mr-3" />
              <h3 className="text-xl font-semibold">32</h3>
            </div>
            <p className="text-gray-600">Research studies conducted on micronutrient efficacy</p>
          </Card>

          <Card className="p-6 bg-white shadow-md border-t-4 border-amber-500">
            <div className="flex items-center mb-4">
              <Award className="h-8 w-8 text-amber-500 mr-3" />
              <h3 className="text-xl font-semibold">7</h3>
            </div>
            <p className="text-gray-600">Academic partnerships with leading universities</p>
          </Card>

          <Card className="p-6 bg-white shadow-md border-t-4 border-blue-500">
            <div className="flex items-center mb-4">
              <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
              <h3 className="text-xl font-semibold">78%</h3>
            </div>
            <p className="text-gray-600">Average improvement in nutritional knowledge after educational programs</p>
          </Card>
        </div>
      </Container>

      {/* Case studies */}
      <div className="bg-slate-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-12 text-center">Research Case Studies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-xl font-bold mb-4">Vitamin D Deficiency Study in Urban Populations</h3>
              <p className="text-gray-700 mb-4">
                Our 2023 study of 500 urban office workers found that 68% were deficient in Vitamin D,
                despite living in sunny regions. After a 6-month educational intervention:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>92% of participants increased outdoor activity</span>
                </li>
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>76% showed improved Vitamin D levels in follow-up testing</span>
                </li>
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>63% reported improved energy levels and mood</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Source: Journal of Nutritional Science, 2023
              </p>
            </Card>

            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-xl font-bold mb-4">Magnesium Intake and Stress Response</h3>
              <p className="text-gray-700 mb-4">
                Our longitudinal study with 300 participants explored the relationship between magnesium
                intake and physiological stress response. Key findings included:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Participants with optimal magnesium levels showed 42% lower cortisol during stress tests</span>
                </li>
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sleep quality improved by an average of 27% after magnesium optimization</span>
                </li>
                <li className="flex items-start">
                  <ThumbsUp className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Dietary changes were more effective than supplementation alone</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                Source: American Journal of Clinical Nutrition, 2024
              </p>
            </Card>
          </div>
        </Container>
      </div>

      {/* Testimonials */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Impact Testimonials</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white shadow-md">
            <div className="mb-4">
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                "As a healthcare provider, I've incorporated Natural Pure Academy's research into my patient 
                education materials. The results have been remarkable - patients are more engaged and 
                understand the 'why' behind nutritional recommendations."
              </p>
              <Separator className="my-4" />
              <div>
                <p className="font-semibold">Dr. Sarah Johnson</p>
                <p className="text-sm text-gray-500">Family Medicine Physician</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <div className="mb-4">
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                "Natural Pure Academy's educational materials have transformed our university nutrition 
                curriculum. Students gain a deeper understanding of micronutrients' biochemical roles 
                thanks to the Academy's evidence-based approach."
              </p>
              <Separator className="my-4" />
              <div>
                <p className="font-semibold">Professor Michael Turner</p>
                <p className="text-sm text-gray-500">Department of Nutritional Sciences, University of California</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white shadow-md">
            <div className="mb-4">
              <div className="flex space-x-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="italic text-gray-700 mb-4">
                "After attending Natural Pure Academy's community workshop on nutrition, I finally understood 
                why I had been feeling so tired. Their practical approach to addressing nutrient deficiencies 
                has completely changed my energy levels and overall health."
              </p>
              <Separator className="my-4" />
              <div>
                <p className="font-semibold">Jennifer Martinez</p>
                <p className="text-sm text-gray-500">Workshop Participant</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>

      {/* Future goals */}
      <div className="bg-indigo-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Future Impact Goals</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Research Expansion</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Launch 5 new large-scale studies on micronutrient interactions by 2026</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Establish research partnerships with 10 additional universities</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Publish 25 peer-reviewed articles in top nutritional science journals</span>
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-white shadow-md">
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Educational Outreach</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reach 100,000 people annually through our online educational resources</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Develop curriculum materials for K-12 nutrition education</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Launch mobile app for personalized nutrition education and tracking</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
              Support Our Research
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Impact;
