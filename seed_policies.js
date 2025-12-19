const mongoose = require("mongoose");
const Policy = require("./models/Policy");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/asija";

const samplePolicies = [
  {
    title: "Code of Conduct",
    content: `Our Code of Conduct establishes the standards of behavior expected from all employees. It serves as a guide for ethical decision-making and promotes a positive work environment.

Key Principles:
• Integrity: Act honestly and ethically in all business dealings
• Respect: Treat colleagues, clients, and stakeholders with dignity
• Professionalism: Maintain high standards of conduct and performance
• Compliance: Adhere to all applicable laws and regulations
• Confidentiality: Protect sensitive information and maintain privacy

Violations of this code may result in disciplinary action, up to and including termination of employment.`,
    category: "employee",
    subCategory: "HR",
    policyType: "text",
    order: 1,
  },
  {
    title: "Work From Home Policy",
    content: `This policy outlines the guidelines for working remotely to ensure productivity, security, and work-life balance.

Eligibility:
• Available to all full-time employees after probation period
• Subject to manager approval based on role requirements
• Maximum 3 days per week for non-essential roles

Requirements:
• Reliable internet connection and appropriate workspace
• Regular attendance at team meetings and check-ins
• Maintenance of productivity standards
• Secure handling of company data and equipment

Equipment and Expenses:
• Company will provide necessary equipment for remote work
• Internet reimbursement up to ₹2000 per month
• Home office setup allowance of ₹5000 annually

Communication:
• Use company communication tools for all work-related discussions
• Maintain regular working hours with flexibility for time zone differences
• Clear communication of availability and response times`,
    category: "employee",
    subCategory: "ADMIN",
    policyType: "text",
    order: 2,
  },
  {
    title: "IT Security Policy",
    content: `This policy establishes the requirements for protecting company information assets and ensuring cybersecurity.

Password Management:
• Use strong passwords (minimum 12 characters)
• Enable two-factor authentication wherever available
• Change passwords every 90 days
• Never share passwords or credentials

Data Protection:
• Encrypt sensitive data both in transit and at rest
• Use company-approved cloud storage solutions
• Never store company data on personal devices without authorization
• Report any suspected data breaches immediately

Device Security:
• Keep operating systems and software updated
• Install and maintain antivirus software
• Use VPN when connecting from public networks
• Lock devices when unattended

Email and Communication:
• Be cautious with email attachments and links
• Verify sender identity before opening suspicious emails
• Use encrypted communication for sensitive information
• Avoid discussing confidential matters on public platforms

Incident Reporting:
• Report security incidents to IT department immediately
• Do not attempt to investigate or resolve incidents yourself
• Preserve evidence and document the incident
• Cooperate fully with any investigations`,
    category: "employee",
    subCategory: "IT",
    policyType: "text",
    order: 3,
  },
  {
    title: "Leave Policy",
    content: `This policy outlines the various types of leave available to employees and the procedures for applying and managing leave.

Types of Leave:

1. Annual Leave:
   • 24 days per year for employees with less than 5 years service
   • 30 days per year for employees with 5+ years service
   • Accrues monthly and can be carried forward up to 60 days

2. Sick Leave:
   • 12 days per year
   • Can be accumulated up to 30 days
   • Requires medical certificate for absences over 3 days

3. Maternity Leave:
   • 26 weeks for female employees
   • 15 days paternity leave for male employees
   • Additional leave may be granted based on medical advice

4. Emergency Leave:
   • 5 days per year for unforeseen emergencies
   • Requires immediate notification to supervisor

Application Procedure:
• Submit leave application at least 7 days in advance
• Emergency leave can be applied with shorter notice
• All applications must be approved by immediate supervisor
• HR must be informed of all leave applications

Leave Encashment:
• Unused annual leave can be encashed at year-end
• Maximum 50% of accumulated leave can be encashed
• Encashment calculated at basic salary rate

Important Notes:
• Leave cannot be claimed retrospectively
• Pending work must be handed over before proceeding on leave
• Employees on long leave must ensure proper handover`,
    category: "employee",
    subCategory: "HR",
    policyType: "text",
    order: 4,
  },
  {
    title: "Professional Development Policy",
    content: `This policy supports employee growth and development through training, education, and skill enhancement opportunities.

Training and Development:
• Annual training budget of ₹50,000 per employee
• Mandatory compliance training for all staff
• Role-specific training programs
• Leadership development for management positions

Education Support:
• Reimbursement for job-related certifications (up to ₹25,000 per year)
• Support for professional memberships and conferences
• Study leave for examinations (maximum 10 days per year)

Career Development:
• Regular performance reviews and career discussions
• Individual Development Plans (IDP) for each employee
• Internal job posting system
• Succession planning for key positions

Learning Resources:
• Access to online learning platforms
• Internal knowledge sharing sessions
• Mentorship programs
• Cross-functional project opportunities

Performance and Growth:
• Clear career progression paths
• Skill-based promotions
• Recognition programs for achievements
• Feedback mechanisms for continuous improvement

Responsibilities:
• Employees must actively participate in development activities
• Managers must support and encourage growth initiatives
• Regular progress tracking and adjustment of development plans
• Documentation of all training and development activities`,
    category: "employee",
    subCategory: "HR",
    policyType: "text",
    order: 5,
  },
  {
    title: "Expense Reimbursement Policy",
    content: `This policy establishes guidelines for business expense reimbursement to ensure fair and consistent treatment.

Eligible Expenses:
• Travel expenses (airfare, train, taxi, hotel)
• Client entertainment (meals, events)
• Office supplies and equipment
• Professional development (conferences, training)
• Communication (mobile, internet for work purposes)

Approval Process:
• Expenses under ₹5,000 can be approved by immediate supervisor
• Expenses over ₹5,000 require department head approval
• Expenses over ₹25,000 require CEO approval
• All expenses must be pre-approved for amounts over ₹10,000

Documentation Requirements:
• Original receipts for all expenses
• Detailed expense reports with business purpose
• Approval from relevant stakeholders
• Submission within 30 days of incurring expense

Reimbursement Limits:
• Hotel accommodation: Up to ₹8,000 per night
• Meals: Up to ₹2,000 per day for local travel
• Air travel: Economy class only
• Ground transportation: Actual costs with receipts

Prohibited Expenses:
• Personal expenses
• Entertainment of a lavish nature
• Cash advances without proper justification
• Expenses without supporting documentation

Processing Time:
• Expense reports processed within 15 working days
• Reimbursements made via salary or bank transfer
• Any discrepancies communicated within 7 days

Policy Violations:
• Falsification of expense reports may result in disciplinary action
• Repeated violations may lead to suspension of reimbursement privileges
• Serious violations may result in termination`,
    category: "employee",
    subCategory: "ADMIN",
    policyType: "text",
    order: 6,
  },
];

async function seedPolicies() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully");

    console.log("Clearing existing policies...");
    await Policy.deleteMany({});

    console.log("Adding sample policies...");
    for (const policy of samplePolicies) {
      const newPolicy = new Policy(policy);
      await newPolicy.save();
      console.log(`Added: ${policy.title}`);
    }

    console.log("All sample policies added successfully!");
    console.log(`Total policies added: ${samplePolicies.length}`);
  } catch (error) {
    console.error("Error seeding policies:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedPolicies();
