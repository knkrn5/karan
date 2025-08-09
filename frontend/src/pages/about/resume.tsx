import { FaGlobe, FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaArrowCircleDown, FaExternalLinkAlt } from 'react-icons/fa';

export default function Resume() {
  const resumeData = {
    personalInfo: {
      name: 'KARAN',
      title: 'Full Stack Developer',
      email: 'karan@email.com',
      phone: '+91 7428799482',
      location: 'Delhi, India',
      linkedin: 'linkedin.com/in/knkrn5',
      github: 'github.com/knkrn5',
      website: 'karan.email',
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
        cgpa: '7.5/10',
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
        link: 'https://wealthpsychology.karan.email/index.html',
        duration: 'May 2024',
        technologies: ['HTML5', 'CSS', 'JavaScript', 'Node.js', 'SQLite'],
        description: [
          'Built a full-stack financial education platform with calculators, quizzes, and blogs using Contentful CMS and an AI chatbot',
          'Designed SQLite database for efficient content storage and integrated Auth0 for secure user authentication.',
          'Implemented CI/CD pipeline with GitHub Actions and deployed on Render using Docker, reducing deployment time by 30%.',
          'Impact: Supported 200+ users during beta testing with positive feedback on usability',
        ],
      },
      {
        name: 'AI-Powered Chatbots',
        link: 'https://explanatorai.site/',
        duration: 'Nov 2024',
        technologies: ['HTML5', 'CSS', 'JavaScript', 'Python'],
        description: [
          'Developed an AI chatbot web app using Gemini and NVIDIA NIM APIs, supporting PDF, CSV, JSON, and TXT analysis.',
          'Enabled real-time chat with SSE-based streaming and integrated CodeMirror/Marked.js for code and Markdown rendering.',
          'Leveraged Hugging Face datasets for task-specific chatbot prompts, enhancing user interaction quality',
          'Impact: Achieved 95% accuracy in document analysis during testing',
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col p-1 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
      <div className="max-w-4xl h-screen p-5 text-black font-serif bg-white mx-auto">
        <section className="text-center">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-sm">{resumeData.personalInfo.location}</p>
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
              href={`https://${resumeData.personalInfo.linkedin}`}
              className=" rounded hover:bg-neutral-200 block"
            >
              <FaLinkedin className="inline-block mr-1" />
              {resumeData.personalInfo.linkedin}
            </a>
            <a
              href={`https://${resumeData.personalInfo.github}`}
              className=" rounded hover:bg-neutral-200 block"
            >
              <FaGithub className="inline-block mr-1" />
              {resumeData.personalInfo.github}
            </a>
            <a
              href={`https://${resumeData.personalInfo.website}`}
              className=" rounded hover:bg-neutral-200 block"
            >
              <FaGlobe className="inline-block mr-1" />
              {resumeData.personalInfo.website}
            </a>
          </div>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">SUMMARY</h2>
          <hr />
          <p className="text-xs">{resumeData.summary}</p>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">EDUCATION</h2>
          <hr />
          <div className="text-xs">
            <span className="flex justify-between">
              <strong>{resumeData.education[0].school}</strong>{' '}
              <p>
                <b>{resumeData.education[0].duration}</b>
              </p>
            </span>
            <span className="flex justify-between">
              <p>
                {resumeData.education[0].degree} <b>{`CGPA- ${resumeData.education[0].cgpa}`}</b>
              </p>{' '}
              <p>
                <i>{resumeData.education[0].location}</i>
              </p>
            </span>
          </div>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">TECHNICAL SKILLS</h2>
          <hr />
          <div className="text-xs">
            {Object.entries(resumeData.technicalSkills).map(([category, skills]) => (
              <div key={category}>
                <strong>{category}:</strong> {skills.join(', ')}
              </div>
            ))}
          </div>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">PROJECTS</h2>
          <hr />
          <div className="text-xs">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <strong className="hover:underline">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        {project.name} <FaExternalLinkAlt className="mx-1" /> |
                      </a>
                    </strong>
                    <p className="text-xs ml-1">{project.technologies.join(', ')}</p>
                  </div>
                  <p className="font-bold">{project.duration}</p>
                </div>
                <ul className="list-disc ml-5">
                  {project.description.map((desc, descIndex) => (
                    <li key={descIndex}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* save button */}
      <button
        title="Save Resume"
        type="button"
        className="printButton w-fit mt-5 mx-auto p-2 rounded-full text-white bg-black hover:scale-105 hover:shadow-lg duration-300 animate-bounce cursor-pointer"
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
}
