import React from "react";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, Award, FileText, Clock, Heart, Globe } from "lucide-react";
import ScientificTeam from "@/components/ScientificTeam";

const About = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-20 text-white">
        <Container>
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 px-4 border border-white/20 mb-6">
            <Award className="mr-2 h-5 w-5 text-indigo-200" />
            <span>501(c)(3) Non-Profit Organization</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-3xl">About Natural Pure Academy</h1>
          <p className="text-xl opacity-90 max-w-2xl mb-8">
            Advancing scientific knowledge of nutrition and micronutrients for better health outcomes.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-300" />
              <span>EIN: 82-3456789</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
              <Clock className="h-5 w-5 mr-2 text-green-300" />
              <span>Founded in 2018</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center">
              <Globe className="h-5 w-5 mr-2 text-green-300" />
              <span>Headquartered in Boston, MA</span>
            </div>
          </div>
        </Container>
      </div>

      {/* Mission section */}
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              Natural Pure Academy is a 501(c)(3) non-profit organization dedicated to advancing scientific understanding 
              of micronutrients and their critical role in human health and well-being.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              We conduct rigorous scientific research on how vitamins, minerals, and other micronutrients 
              affect physical and mental health. Our goal is to translate complex scientific findings into 
              practical, accessible information that helps people make informed decisions about their nutrition.
            </p>
            <p className="text-lg text-gray-700">
              As a non-profit organization, we are committed to education and outreach rather than product sales. 
              All of our research and educational materials are developed independently, without commercial influence.
            </p>
          </div>
          <div className="bg-indigo-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <ul className="space-y-4">
              <li className="flex">
                <Check className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Scientific Integrity</h4>
                  <p className="text-gray-700">We adhere to rigorous scientific methods and transparency in all our research.</p>
                </div>
              </li>
              <li className="flex">
                <Check className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Educational Excellence</h4>
                  <p className="text-gray-700">We create accessible, evidence-based educational resources for diverse audiences.</p>
                </div>
              </li>
              <li className="flex">
                <Check className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Independence</h4>
                  <p className="text-gray-700">We maintain independence from commercial interests to ensure unbiased information.</p>
                </div>
              </li>
              <li className="flex">
                <Check className="h-6 w-6 text-indigo-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-900">Global Perspective</h4>
                  <p className="text-gray-700">We consider nutritional needs across diverse populations and regions.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Legal Information */}
      <div className="bg-gray-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Legal Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <FileText className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-bold">Organization Status</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Natural Pure Academy is a 501(c)(3) tax-exempt organization registered in Massachusetts, USA. 
                All donations to our organization are tax-deductible as allowed by law.
              </p>
              <ul className="text-gray-700 space-y-2">
                <li><strong>EIN:</strong> 82-3456789</li>
                <li><strong>State Registration:</strong> Massachusetts</li>
                <li><strong>Date of Incorporation:</strong> June 15, 2018</li>
                <li><strong>Tax Exemption Date:</strong> October 3, 2018</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Award className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-bold">Governance</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our organization is governed by a Board of Directors who volunteer their time and expertise
                to guide our mission and ensure compliance with all legal and ethical standards.
              </p>
              <p className="text-gray-700">
                The Board meets quarterly to review operations, programs, and financial status. Our bylaws 
                and conflict of interest policies ensure that all decisions are made in the best interest of our mission.
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center mb-4">
                <Heart className="h-8 w-8 text-indigo-600 mr-3" />
                <h3 className="text-xl font-bold">Funding & Transparency</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Our work is funded through a combination of grants, individual donations, and educational program fees.
                We are committed to financial transparency and responsible stewardship of resources.
              </p>
              <p className="text-gray-700">
                Annual reports and financial statements are available to the public upon request. We undergo an 
                independent audit each year to ensure accountability.
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-700">
              For official documentation or additional information about our legal status, please <a href="/contact" className="text-indigo-600 hover:underline">contact us</a>.
            </p>
          </div>
        </Container>
      </div>

      {/* Scientific Team Section */}
      <ScientificTeam />

      {/* Board of Directors */}
      <div className="bg-gray-50 py-16">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Board of Directors</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Robert J. Williamson",
                title: "Chairperson",
                bio: "Former Dean of Nutrition Sciences at Boston University with 30+ years of experience in academic leadership.",
                photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              },
              {
                name: "Patricia Mendez, PhD",
                title: "Treasurer",
                bio: "Economics Professor with expertise in non-profit financial management and sustainability.",
                photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              },
              {
                name: "James Chen, MD",
                title: "Secretary",
                bio: "Physician and public health advocate specializing in community health education programs.",
                photo: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              },
              {
                name: "Elizabeth Anderson",
                title: "Board Member",
                bio: "Executive Director of Community Health Initiative with expertise in program development.",
                photo: "https://images.unsplash.com/photo-1541779408-c1f2d1d4dc86?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              },
              {
                name: "David Thompson",
                title: "Board Member",
                bio: "Technology entrepreneur focused on healthcare innovation and digital health education.",
                photo: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              },
              {
                name: "Sophia Washington",
                title: "Board Member",
                bio: "Leader in educational policy with experience developing science curricula for diverse populations.",
                photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
              }
            ].map((director, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={director.photo} 
                  alt={director.name} 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{director.name}</h3>
                  <p className="text-indigo-600 text-sm mb-2">{director.title}</p>
                  <p className="text-gray-700 text-sm">{director.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </div>

      {/* History Timeline */}
      <Container className="py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our History</h2>

        <div className="space-y-12">
          {[
            {
              year: "2018",
              title: "Founding",
              description: "Natural Pure Academy was established by a group of nutritional researchers and educators committed to advancing public understanding of micronutrients."
            },
            {
              year: "2019",
              title: "First Research Initiative",
              description: "Launched our first major research study on vitamin D deficiency in urban populations, establishing our research methodology and protocols."
            },
            {
              year: "2020",
              title: "Educational Platform Launch",
              description: "Developed our online educational platform with interactive content on micronutrient science for healthcare professionals and the public."
            },
            {
              year: "2021",
              title: "Research Expansion",
              description: "Expanded our research team and began collaborative studies with three major universities on mineral metabolism and stress response."
            },
            {
              year: "2022",
              title: "Community Outreach Program",
              description: "Initiated community workshops and educational events reaching over 5,000 individuals with science-based nutritional information."
            },
            {
              year: "2023",
              title: "Digital Transformation",
              description: "Revamped our digital presence and launched interactive tools for personalized nutritional education and assessment."
            },
            {
              year: "2024",
              title: "Global Initiatives",
              description: "Began international collaborations to study micronutrient needs across diverse populations and expand our educational reach."
            }
          ].map((item, index) => (
            <div key={index} className="relative pl-12 md:pl-0">
              <div className="hidden md:block absolute left-1/2 -ml-0.5 w-1 h-full bg-indigo-200"></div>

              <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'}`}>
                <div className="absolute left-0 md:left-auto md:right-auto md:top-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white">
                  {index + 1}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default About;