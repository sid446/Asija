const mongoose = require("mongoose");

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/asija"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Insight Schema
const insightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String, default: "General" },
  slug: { type: String, required: true, unique: true },
  published: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Insight = mongoose.model("Insight", insightSchema);

// Sample insights data
const sampleInsights = [
  {
    title: "The Future of Digital Transformation in Manufacturing",
    description:
      "Exploring how Industry 4.0 technologies are reshaping manufacturing processes and supply chains worldwide.",
    content: `Digital transformation is revolutionizing the manufacturing industry at an unprecedented pace. As we move deeper into the Industry 4.0 era, companies are leveraging cutting-edge technologies to optimize their operations, improve efficiency, and stay competitive in a rapidly evolving market.

## Key Trends Shaping Manufacturing

### 1. Internet of Things (IoT) Integration
IoT devices are becoming ubiquitous in modern manufacturing facilities, providing real-time data and insights that drive informed decision-making.

### 2. Artificial Intelligence and Machine Learning
AI-powered systems are enabling predictive maintenance, quality control, and process optimization, reducing downtime and improving product quality.

### 3. Robotics and Automation
Advanced robotics are taking over repetitive tasks, allowing human workers to focus on more complex and creative aspects of manufacturing.

### 4. Data Analytics and Big Data
The ability to collect, analyze, and act on large volumes of data is becoming a critical competitive advantage.

## Challenges and Opportunities

While the benefits are clear, manufacturers face several challenges in their digital transformation journey:

- Legacy system integration
- Cybersecurity concerns
- Skills gap in digital technologies
- High initial investment costs

However, the opportunities far outweigh the challenges. Companies that successfully navigate this transformation will enjoy:

- Improved operational efficiency
- Enhanced product quality
- Reduced costs and waste
- Better customer satisfaction
- Increased innovation capabilities

## Looking Ahead

The future of manufacturing lies in the seamless integration of digital and physical systems. Companies that embrace this change and invest in the right technologies and talent will thrive in the digital age.`,
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    category: "Technology",
    slug: "future-digital-transformation-manufacturing",
    published: true,
    featured: true,
  },
  {
    title: "Sustainable Business Practices: A Competitive Advantage",
    description:
      "How companies are integrating sustainability into their core business strategies for long-term success.",
    content: `Sustainability is no longer just a buzzword—it's becoming a fundamental business imperative. Companies across industries are recognizing that sustainable practices not only benefit the environment but also drive financial performance and enhance brand reputation.

## The Business Case for Sustainability

### 1. Cost Savings
Sustainable practices often lead to significant cost reductions through energy efficiency, waste reduction, and resource optimization.

### 2. Regulatory Compliance
With increasingly stringent environmental regulations, sustainable practices help companies stay ahead of compliance requirements.

### 3. Brand Reputation
Consumers are increasingly choosing brands that demonstrate environmental responsibility, creating a competitive advantage.

### 4. Innovation Driver
Sustainability challenges often lead to innovative solutions that can open new markets and revenue streams.

## Implementing Sustainable Practices

### Supply Chain Optimization
- Partner with sustainable suppliers
- Implement circular economy principles
- Reduce transportation emissions

### Energy Efficiency
- Adopt renewable energy sources
- Implement energy management systems
- Optimize facility operations

### Waste Reduction
- Implement zero-waste initiatives
- Recycle and reuse materials
- Design products for circularity

## Measuring Success

Key metrics for tracking sustainability performance include:

- Carbon footprint reduction
- Energy consumption per unit of output
- Waste diversion rates
- Water usage efficiency
- Supplier sustainability scores

## The Road Ahead

As sustainability becomes mainstream, companies that have already integrated these practices into their core operations will have a significant advantage. The key is to view sustainability not as a cost center, but as a strategic investment in the future.`,
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop",
    category: "Business",
    slug: "sustainable-business-practices-competitive-advantage",
    published: true,
    featured: true,
  },
  {
    title: "Cybersecurity in the Age of Digital Disruption",
    description:
      "Essential strategies for protecting digital assets in an increasingly connected world.",
    content: `As businesses accelerate their digital transformation, cybersecurity has become a critical concern for organizations of all sizes. The evolving threat landscape requires proactive strategies and robust security measures.

## Understanding the Threat Landscape

### 1. Ransomware Attacks
Ransomware continues to be one of the most prevalent and damaging cyber threats, with attacks becoming more sophisticated.

### 2. Supply Chain Vulnerabilities
Third-party vendors and suppliers can introduce security risks into your ecosystem.

### 3. Insider Threats
While external threats get most attention, insider threats can be equally damaging.

### 4. IoT and Edge Computing Risks
The proliferation of connected devices expands the attack surface significantly.

## Building a Strong Security Foundation

### 1. Risk Assessment
Regular security assessments help identify vulnerabilities and prioritize remediation efforts.

### 2. Employee Training
Human error remains one of the biggest security risks. Comprehensive training is essential.

### 3. Multi-Factor Authentication
Implementing MFA across all systems significantly reduces unauthorized access risks.

### 4. Zero Trust Architecture
Moving from perimeter-based security to zero trust principles provides better protection.

## Advanced Security Technologies

### AI and Machine Learning
AI-powered security tools can detect anomalies and respond to threats in real-time.

### Behavioral Analytics
Understanding normal user behavior helps identify potential security incidents.

### Automated Response
Automated incident response systems can contain threats before they cause significant damage.

## Compliance and Regulatory Considerations

Staying compliant with regulations like GDPR, CCPA, and industry-specific standards is crucial for avoiding penalties and maintaining customer trust.

## Future-Proofing Your Security

The key to effective cybersecurity is staying ahead of emerging threats through continuous monitoring, regular updates, and adaptive strategies.`,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop",
    category: "Technology",
    slug: "cybersecurity-age-digital-disruption",
    published: true,
    featured: false,
  },
  {
    title: "The Rise of Remote Work: Building Resilient Organizations",
    description:
      "Strategies for managing distributed teams and maintaining productivity in a post-pandemic world.",
    content: `The COVID-19 pandemic accelerated the adoption of remote work, fundamentally changing how organizations operate. While the shift presented challenges, it also opened new opportunities for building more flexible and resilient workplaces.

## The New Normal

Remote work is here to stay. Organizations that adapt successfully will have a competitive advantage in attracting and retaining top talent.

## Key Challenges

### 1. Communication Barriers
Maintaining effective communication across distributed teams requires new tools and strategies.

### 2. Collaboration Difficulties
Virtual collaboration tools have improved, but they still can't fully replicate in-person interactions.

### 3. Work-Life Balance
Remote work blurs the boundaries between professional and personal life.

### 4. Cultural Integration
Building company culture remotely requires intentional effort.

## Best Practices for Remote Work Success

### 1. Technology Investment
Invest in reliable collaboration tools, video conferencing, and project management software.

### 2. Clear Communication
Establish clear communication protocols and expectations.

### 3. Regular Check-ins
Frequent one-on-one and team meetings help maintain connection.

### 4. Flexible Policies
Create policies that support work-life balance and accommodate different needs.

## Measuring Remote Work Success

Key metrics include:

- Employee satisfaction scores
- Productivity metrics
- Retention rates
- Collaboration effectiveness
- Work-life balance indicators

## The Future of Work

The future workplace will likely be hybrid, combining the best of remote and office work. Organizations that embrace this change will be better positioned for long-term success.`,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
    category: "Business",
    slug: "rise-remote-work-building-resilient-organizations",
    published: true,
    featured: false,
  },
  {
    title: "Innovation in Healthcare: Technology-Driven Solutions",
    description:
      "How technology is transforming healthcare delivery and patient outcomes.",
    content: `The healthcare industry is undergoing a digital revolution, with technology playing an increasingly important role in improving patient care, operational efficiency, and medical outcomes.

## Digital Health Trends

### 1. Telemedicine
Remote healthcare delivery has become mainstream, improving access to care.

### 2. AI-Powered Diagnostics
Machine learning algorithms are assisting in disease detection and treatment planning.

### 3. Wearable Health Devices
Consumer wearables are providing continuous health monitoring capabilities.

### 4. Electronic Health Records
Digital patient records are improving care coordination and reducing errors.

## Challenges in Healthcare Innovation

### Regulatory Compliance
Healthcare is heavily regulated, making innovation challenging.

### Data Privacy
Patient data requires the highest levels of protection.

### Integration Issues
Legacy systems can hinder the adoption of new technologies.

### Cost Barriers
High development and implementation costs can be prohibitive.

## Opportunities for Improvement

### Personalized Medicine
Genetic testing and AI are enabling more personalized treatment approaches.

### Preventive Care
Technology enables better preventive care and early intervention.

### Operational Efficiency
Digital tools are streamlining administrative processes.

## The Future of Healthcare

Technology will continue to transform healthcare, making it more accessible, efficient, and effective. Organizations that embrace innovation will lead the way in improving patient outcomes.`,
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
    category: "Industry",
    slug: "innovation-healthcare-technology-driven-solutions",
    published: true,
    featured: false,
  },
];

async function seedInsights() {
  try {
    console.log("Starting to seed insights...");

    // Clear existing insights
    await Insight.deleteMany({});
    console.log("Cleared existing insights");

    // Insert sample insights
    const insertedInsights = await Insight.insertMany(sampleInsights);
    console.log(`Successfully seeded ${insertedInsights.length} insights`);

    // Log the inserted insights
    insertedInsights.forEach((insight, index) => {
      console.log(`${index + 1}. ${insight.title} (${insight.slug})`);
    });
  } catch (error) {
    console.error("Error seeding insights:", error);
  }
}

// Run the seeding function
async function main() {
  await connectDB();
  await seedInsights();
  console.log("Seeding completed!");
  process.exit(0);
}

main().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
