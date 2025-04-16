import React from 'react';
import { Container } from "@/components/ui/container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Privacy</h2>
            <p className="mb-4">
              Natural Pure Academy ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website.
            </p>
            <p>
              As a non-profit organization dedicated to education and research in the field of nutrition 
              and micronutrients, we take our responsibility to protect your data seriously.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">We may collect information about you in a variety of ways:</p>

            <h3 className="text-xl font-medium mb-2">Personal Data</h3>
            <p className="mb-4">
              When you interact with our site, we may collect personal information that you voluntarily provide, such as:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name and email address when you sign up for our newsletter</li>
              <li>Responses to our educational quizzes</li>
              <li>Feedback and survey responses</li>
              <li>Questions or comments submitted through our contact forms</li>
              <li>Your name, email address, and telephone number, that is necessary for us to provide services to you. You are under no obligation to provide us with personal information of any kind; however, your refusal to do so may prevent you from using certain features of the Website.</li>
            </ul>

            <h3 className="text-xl font-medium mb-2">Usage Data</h3>
            <p className="mb-4">
              We automatically collect certain information about how you interact with our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Pages viewed and time spent</li>
              <li>Referring website</li>
              <li>Geographic location (country/region level)</li>
              <li>Information our servers automatically collect when you access the Website, such as your IP address, browser type, operating system, access times, and the pages you have viewed directly before and after accessing the Website. This information does not identify you personally.</li>
            </ul>
            <h3 className="text-xl font-medium mb-2">Financial Data</h3>
            <p className="mb-4">
              If you choose to donate to our organization, financial information, such as data related to your payment method (e.g., credit card number, expiration date), is collected. All financial information is stored by our payment processor, and you are encouraged to review their privacy policy and contact them directly for responses to your questions.
            </p>
            <h3 className="text-xl font-medium mb-2">Mobile Device Data</h3>
            <p className="mb-4">
              Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Website from a mobile device.
            </p>
            <h3 className="text-xl font-medium mb-2">Data From Surveys and Assessments</h3>
            <p className="mb-4">
              Information you provide when participating in surveys, nutritional assessments, quizzes, or educational activities on our Website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="mb-4">We may use the information we collect about you for various purposes:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Provide, maintain, and improve our educational resources</li>
              <li>Process and respond to your inquiries</li>
              <li>Send newsletters and communications about our research and educational materials</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Conduct scientific research (with anonymized data)</li>
              <li>Comply with legal obligations</li>
              <li>To provide and maintain our Website and services</li>
              <li>To notify you about changes to our Website or services</li>
              <li>To allow you to participate in interactive features of our Website when you choose to do so</li>
              <li>To gather analysis or valuable information so that we can improve our Website and services</li>
              <li>To monitor the usage of our Website</li>
              <li>To detect, prevent and address technical issues</li>
              <li>To send you newsletters and educational materials (with your consent)</li>
              <li>To process and manage donations</li>
              <li>To fulfill any other purpose for which you provide information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Sharing Your Information</h2>
            <p className="mb-4">
              As a non-profit focused on education and research, we do not sell your personal information 
              to third parties. We may share your information in limited circumstances:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>With service providers who help us operate our website</li>
              <li>With research partners (using anonymized data only)</li>
              <li>When required by law or to protect our rights</li>
              <li>If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
              <li>We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
              <li>With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.</li>
              <li>If you interact with other users of the Website, those users may see your name, profile photo, and descriptions of your activity.</li>
              <li>When you post comments, contributions, or other content to the Website, your posts may be viewed by all users and may be publicly distributed outside the Website in perpetuity.</li>
              <li>We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
              <li>We may share your information with our business partners to offer you certain products, services, or promotions.</li>

            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Data Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Access to the data we hold about you</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@naturalpureacademy.org.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing 
              activities and to measure the effectiveness of our educational content. You can control cookies 
              through your browser settings.  For more information on how we use cookies, please refer to our Cookie Policy posted on the Website. We use Google Analytics to help us understand how our users use the Website. Google Analytics uses cookies to collect information about the number of visitors to the site, the pages they visit, and how long they stay. This information is used to compile reports and to help us improve the site. The cookies collect information in an anonymous form. For more information on how Google processes this data, see Google's privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no system is completely secure, and we cannot guarantee the absolute 
              security of your data. We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
            <p className="mb-4">
              We may update this Privacy Policy from time to time. The updated version will be indicated by 
              an updated "Revised" date and the updated version will be effective as soon as it is accessible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have questions or comments about this policy, please contact us at:
            </p>
            <p className="mb-4">
              Natural Pure Academy<br />
              privacy@naturalpureacademy.org<br />
              123 Science Way, Research Park<br />
              Cambridge, MA 02138
            </p>
          </section>

          <div className="border-t pt-6 text-sm text-gray-500">
            <p>Last updated: April 15, 2024</p>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;