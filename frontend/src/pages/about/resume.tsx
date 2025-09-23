import { FaGlobe, FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaArrowCircleDown, FaExternalLinkAlt } from 'react-icons/fa';
import UrlAccessPassSetter from '../../utils/urlAccessPassSetter';
import { useSearchParams } from 'react-router';

export default function Resume() {
  const [searchParams] = useSearchParams();

  // missing data Experience/Internship/Open-source contributions/freelance, Certifications, Achievements
  const resumeData = {
    personalInfo: {
      name: 'KARAN',
      age: 24,
      title: 'Full Stack Developer',
      email: 'xkaranx5@gmail.com',
      phone: '+91 7428799482',
      address: {
        country: 'India',
        city: 'Delhi',
        region: 'Delhi NCR',
      },
      contact: {
        email: 'mail@karan.email',
        phone: 'N/A',
        linkedin: 'linkedin.com/in/knkrn5',
        github: 'github.com/knkrn5',
        website: 'karan.email',
      },
    },
    summary:
      'Full-stack web developer specializing in the MERN stack with experience delivering scalable, containerized, and cloud-deployed applications. Skilled in integrating AI-powered features, optimizing backend performance, and implementing microservices architecture. Committed to building accessible, user-friendly solutions.',
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Inc.',
        location: 'San Francisco, CA',
        duration: 'Jan 2022 - Present',
        achievements: [
          'Led development of microservices architecture serving 1M+ users',
          'Improved application performance by 40% through optimization',
          'Mentored 3 junior developers and conducted code reviews',
          'Implemented CI/CD pipelines reducing deployment time by 60%',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Computer Applications',
        school: 'Galgotias University',
        location: 'Greater Noida, India',
        duration: '2021 – 2025',
        cgpa: '7.75/10',
      },
    ],
    technicalSkills: {
      'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java'],
      Frontend: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
      Backend: ['Node.js(Express)', 'Python(Fastapi)', 'REST APIs'],
      Database: ['SQLite', 'PostgreSQL', 'MongoDB', 'Redis'],
      'Cloud & DevOps': ['AWS', 'Azure', 'Render', 'Docker', 'Git', 'CI/CD (GitHub Actions)'],
      Tools: ['VS Code', 'Postman', 'Auth0', 'Zustand', 'Nodemailer'],
    },
    projects: [
      {
        name: 'Finance Educational Web App',
        liveLink: 'https://wealthpsychology.karan.email/index.html',
        githubLink: 'https://github.com/knkrn5/WealthPsychology-app',
        duration: 'May 2024',
        technologies: ['HTML5', 'CSS', 'JavaScript', 'Node.js', 'SQLite'],
        description: [
          'Built a full-stack financial education platform with calculators, quizzes, and blogs using Contentful CMS.',
          'Designed SQLite database for efficient content storage and integrated Auth0 for secure user authentication.',
          'Implemented CI/CD pipeline with GitHub Actions and Configured Docker containerization.',
          'Impact: Deployed on Render using Docker, reducing deployment time by 30%.',
        ],
      },
      {
        name: 'AI-Powered Chatbots',
        liveLink: 'https://explanatorai.site/',
        githubLink: 'https://github.com/knkrn5/explanator-ai',
        duration: 'Nov 2024',
        technologies: ['HTML5', 'CSS', 'JavaScript', 'Python'],
        description: [
          'Developed an AI chatbot web app using Gemini and NVIDIA NIM APIs, supporting PDF, CSV, JSON, and TXT analysis.',
          'Enabled real-time chat with SSE-based streaming and integrated CodeMirror/Marked.js for code and Markdown rendering.',
          'Leveraged Hugging Face datasets for task-specific chatbots.',
          'Impact: Achieved 95% correctness in chatbot-generated responses during document-based Q&A testing.',
        ],
      },
      {
        name: 'Personal Website',
        liveLink: 'https://karan.email/',
        githubLink: 'https://github.com/knkrn5/karan',
        duration: 'Feb 2025',
        technologies: [
          'React/ts',
          'Tailwind CSS',
          'Node.js',
          'Python',
          'Java',
          'MongoDB',
          'PostgreSQL',
        ],
        description: [
          'Architected a microservices-based portfolio with Node.js (contact/chatbot), Python (e-commerce), and Java (authentication).',
          'Designed MongoDB/PostgreSQL schemas for data storage and Redis for OTP verification, ensuring scalability.',
          'Integrated Zustand, Nodemailer, and JWT/Bcrypt for state management, email notifications, and security.',
          'Impact: Reduced authentication latency and User Data retrieval time by 25% using Redis caching.',
        ],
      },
    ],
    languages: [
      {
        name: 'English',
        proficiency: 'Proficient',
      },
      {
        name: 'Hindi',
        proficiency: 'Native',
      },
    ],
    interests: ['Reading', 'Traveling', 'Gaming', 'Learning', 'Open Source Contribution'],
    availability: 'Open to remote opportunities and relocation.',
  };

  const pageAccessPassword = 'iKnowThisIsVisibleViaDevTool';
  const hasPermission = searchParams.get('pageAccessPass') === pageAccessPassword;

  if (hasPermission) {
    return (
      <div className="flex flex-col p-1 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
        <div className="max-w-4xl min-h-screen p-5 text-black font-serif bg-white mx-auto">
          <section className="text-center">
            <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
            <p className="text-sm">
              {resumeData.personalInfo.address.city}, {resumeData.personalInfo.address.country}
            </p>
            <div className="flex justify-center items-center text-xs space-x-1 underline underline-offset-2 max-sm:flex-col duration-300">
              {/* Phone */}
              <a
                href={`tel:${resumeData.personalInfo.phone}`}
                className="rounded hover:bg-neutral-200"
              >
                <FaPhone className="inline-block mr-1" />
                {resumeData.personalInfo.phone}
              </a>
              {/* Email */}
              <a
                href={`mailto:${resumeData.personalInfo.email}`}
                className=" rounded hover:bg-neutral-200 block"
              >
                <IoIosMail className="inline-block mr-1" />
                {resumeData.personalInfo.email}
              </a>
              <a
                href={`https://${resumeData.personalInfo.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded hover:bg-neutral-200 block"
              >
                <FaLinkedin className="inline-block mr-1" />
                {resumeData.personalInfo.contact.linkedin}
              </a>
              <a
                href={`https://${resumeData.personalInfo.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded hover:bg-neutral-200 block"
              >
                <FaGithub className="inline-block mr-1" />
                {resumeData.personalInfo.contact.github}
              </a>
              <a
                href={`https://${resumeData.personalInfo.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" rounded hover:bg-neutral-200 block"
              >
                <FaGlobe className="inline-block mr-1" />
                {resumeData.personalInfo.contact.website}
              </a>
            </div>
          </section>
          <section className="mt-1 text-sm">
            <h2 className="font-semibold">SUMMARY</h2>
            <hr />
            <p>{resumeData.summary}</p>
          </section>
          <section className="mt-1 text-sm">
            <h2 className="font-semibold">EDUCATION</h2>
            <hr />
            <div>
              <div className="flex justify-between">
                <strong>{resumeData.education[0].school}</strong>{' '}
                <p className="font-bold">{resumeData.education[0].duration}</p>
              </div>
              <div className="flex justify-between">
                <span className="flex flex-col">
                  <p>{resumeData.education[0].degree}</p>
                  <p className="font-serif">
                    <i>{`CGPA- ${resumeData.education[0].cgpa}`}</i>
                  </p>
                </span>
                <p>
                  <i>{resumeData.education[0].location}</i>
                </p>
              </div>
            </div>
          </section>
          <section className="mt-1 text-sm">
            <h2 className="font-semibold">TECHNICAL SKILLS</h2>
            <hr />
            <div>
              {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
                <div key={category}>
                  <strong>{category}:</strong> {skills.join(', ')}
                </div>
              ))}
            </div>
          </section>
          <section className="mt-1 text-sm">
            <h2 className="text-sm font-semibold">PROJECTS</h2>
            <hr />
            <div>
              {resumeData.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <strong className="hover:underline">
                        <a
                          title="Web Live link"
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center"
                        >
                          {project.name} <FaExternalLinkAlt className="mx-1" /> |
                        </a>
                      </strong>
                      <a
                        title="Source Code link"
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 rounded hover:bg-neutral-200 block"
                      >
                        <FaGithub className="inline-block mr-1" /> {' | '}
                      </a>
                      <p className=" ml-1">{project.technologies.join(', ')}</p>
                    </div>
                    <p className="font-bold">{project.duration}</p>
                  </div>
                  <ul className="list-disc ml-5">
                    {project.description.map((desc, descIndex) => (
                      <li key={descIndex} dangerouslySetInnerHTML={{ __html: desc }} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
          <section>
            <h2 className="text-sm font-semibold">LANGUAGES</h2>
            <hr />
            <ul className="list-disc ml-5">
              {resumeData.languages.map((language, index) => (
                <li key={index}>
                  <strong>{language.name}</strong> - {language.proficiency}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* save button */}
        <button
          title="Save Resume"
          type="button"
          className="printButton w-fit mt-5 mx-auto p-2 rounded-full text-white bg-black hover:invert hover:shadow-lg duration-300 animate-bounce cursor-pointer"
          onClick={() => {
            const newWindow = window.open('/resume', '_blank');
            if (newWindow) {
              newWindow.onload = () => {
                const header = newWindow.document.getElementsByTagName('header')[0];
                const footer = newWindow.document.getElementsByTagName('footer')[0];
                const printButton = newWindow.document.getElementsByClassName('printButton')[0];

                if (header) header.remove();
                if (footer) footer.remove();
                if (printButton) printButton.remove();

                newWindow.print();
              };
            }
          }}
        >
          <FaArrowCircleDown size={32} className="rounded-full text-white bg-black" />
        </button>
      </div>
    );
  } else {
    return <UrlAccessPassSetter pageAccessPassword={pageAccessPassword} />;
  }
}
