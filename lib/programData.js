export const programs = [
  {
    id: 1,
    title: "THE DROP-IN CENTRE",
    shortDescription: "A temporary safe loving haven for girls and women in need.",
    detailedDescription: `<p>The Drop-In Centre serves as a temporary safe haven for girls and women in need, providing immediate shelter and support. Our center offers a secure environment where vulnerable individuals can find respite from dangerous or unstable situations.</p>
      
      <p>At the heart of our approach is the belief that every person deserves dignity, safety, and the opportunity to rebuild their life. Our trained staff and volunteers provide compassionate care, including:</p>
      
      <ul>
        <li>Emergency shelter and basic necessities</li>
        <li>Counseling and emotional support services</li>
        <li>Case management and referral services</li>
        <li>Life skills training and educational support</li>
        <li>Health and wellness programs</li>
      </ul>
      
      <p>Our goal is to stabilize individuals in crisis and connect them with longer-term resources and support systems. We work closely with local social services, healthcare providers, and community organizations to ensure comprehensive care.</p>
      
      <p>Through our holistic approach, we aim to empower survivors to regain their independence and build a foundation for a brighter future.</p>`,
    image: "/images/our-programs-1.jpg",
    impact: "100+ girls rescued",
    goal: "Expand to 500 students by 2026"
  },
  {
    id: 2,
    title: "GAREP",
    shortDescription: "Girls At-Risk Empowerment Project serves girls in risky environments.",
    detailedDescription: `<p>The Girls At-Risk Empowerment Project (GAREP) is designed to reach and support girls who are in high-risk environments. Our program recognizes that prevention is often more effective than intervention, and we work proactively to provide alternatives to dangerous situations.</p>
      
      <p>GAREP operates through several key components:</p>
      
      <ul>
        <li><strong>Community Outreach:</strong> We conduct regular seminars, conferences, and community outreaches to educate families and communities about the importance of protecting girls from harmful practices and exploitation.</li>
        <li><strong>Mentorship Programs:</strong> Girls are paired with trained mentors who provide guidance, support, and positive role modeling.</li>
        <li><strong>Educational Support:</strong> We provide tutoring, school supplies, and advocacy to keep girls in school.</li>
        <li><strong>Skill Development:</strong> Workshops on leadership, self-defense, financial literacy, and other life skills.</li>
        <li><strong>Family Engagement:</strong> We work with families to address underlying issues that may put girls at risk.</li>
      </ul>
      
      <p>Our approach is community-based and culturally sensitive, recognizing that sustainable change happens when entire communities are engaged in protecting their children.</p>
      
      <p>Through GAREP, we've seen significant improvements in school retention rates, family relationships, and community awareness of girls' rights.</p>`,
    image: "/images/our-programs-2.jpg",
    impact: "200+ seminars, conferences and outreaches",
    goal: "Hold 20+ outreaches annually"
  },
  {
    id: 3,
    title: "EDUCATION AND SKILLING",
    shortDescription: "Girls and women are empowered through skilling and education.",
    detailedDescription: `<p>Education and skilling form the cornerstone of our empowerment strategy. We believe that knowledge and practical skills are fundamental tools that enable girls and women to break cycles of poverty and dependence.</p>
      
      <p>Our comprehensive education and skilling program includes:</p>
      
      <ul>
        <li><strong>Formal Education Support:</strong> Assistance with school enrollment, fees, supplies, and tutoring for girls who have fallen behind or been out of school.</li>
        <li><strong>Vocational Training:</strong> Hands-on training in various trades including tailoring, hairdressing, catering, and crafts.</li>
        <li><strong>Digital Literacy:</strong> Computer skills and internet literacy to prepare participants for the modern economy.</li>
        <li><strong>Entrepreneurship Development:</strong> Business planning, financial management, and market access support for those who want to start their own enterprises.</li>
        <li><strong>Leadership Training:</strong> Programs designed to develop confidence, public speaking skills, and community leadership abilities.</li>
      </ul>
      
      <p>We work with certified instructors and partner with established institutions to ensure our participants receive quality training that leads to recognized qualifications.</p>
      
      <p>Our graduates have gone on to start successful businesses, complete higher education, and become leaders in their communities. The program not only transforms individual lives but also strengthens entire families and communities.</p>`,
    image: "/images/our-programs-3.jpg",
    impact: "250+ girls skilled",
    goal: "Skill and educate 1000+ women and girls"
  },
  {
    id: 4,
    title: "WOMAN OF PURPOSE COMMUNITY OUTREACH",
    shortDescription: "Focused on helping women in the community through both on station training, and outreaches.",
    detailedDescription: `<p>The Woman of Purpose Community Outreach program extends our services beyond our center walls to reach women in their own communities. We recognize that many women face barriers to accessing our center-based services, including transportation, childcare responsibilities, or cultural constraints.</p>
      
      <p>Our community outreach model includes:</p>
      
      <ul>
        <li><strong>Mobile Services:</strong> Teams that travel to underserved areas to provide on-site training and support.</li>
        <li><strong>Community Training Hubs:</strong> Partnership with local venues to host regular training sessions and workshops.</li>
        <li><strong>Peer Education Networks:</strong> Training community members to become health and empowerment advocates in their own neighborhoods.</li>
        <li><strong>Specialized Support Groups:</strong> Focused groups addressing specific issues like maternal health, financial literacy, or domestic violence.</li>
        <li><strong>Resource Distribution:</strong> Providing essential items like hygiene kits, educational materials, and information about available services.</li>
      </ul>
      
      <p>Our outreach approach is flexible and responsive to community needs. We conduct regular assessments to identify priority areas and adapt our services accordingly.</p>
      
      <p>The program has been particularly effective in reaching marginalized populations including rural women, refugees, and women with disabilities. By bringing services directly to communities, we've been able to impact thousands of women who might otherwise not have access to our programs.</p>
      
      <p>Through this program, we're not just serving individuals but building community capacity for long-term change and resilience.</p>`,
    image: "/images/our-programs-4.jpg",
    impact: "1,000+ women supported",
    goal: "Create 5,000 sustainable jobs"
  }
];

// Helper function to find a program by ID
export function getProgramById(id) {
  return programs.find(program => program.id === parseInt(id));
}

// Helper function to get all program IDs for static generation
export function getAllProgramIds() {
  return programs.map(program => program.id.toString());
}