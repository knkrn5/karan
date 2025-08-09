import { FaGlobe, FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

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
      {
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        duration: 'Jun 2020 - Dec 2021',
        achievements: [
          'Built responsive web applications using React and Node.js',
          'Integrated payment systems and third-party APIs',
          'Collaborated with design team to implement pixel-perfect UIs',
          'Maintained 99.9% uptime for production applications',
        ],
      },
      {
        title: 'Frontend Developer',
        company: 'WebSolutions LLC',
        location: 'New York, NY',
        duration: 'Mar 2019 - May 2020',
        achievements: [
          'Developed interactive dashboards for data visualization',
          'Optimized bundle size reducing load times by 30%',
          'Implemented responsive design across multiple devices',
          'Worked with cross-functional teams in Agile environment',
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
    skills: {
      'Programming Languages': ['JavaScript', 'TypeScript', 'Python', 'Java'],
      Frontend: ['React', 'Next.js', 'Vue.js', 'HTML5', 'CSS3', 'Tailwind CSS'],
      Backend: ['Node.js', 'Express', 'Django', 'REST APIs', 'GraphQL'],
      Database: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
      'Cloud & DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
      Tools: ['VS Code', 'Figma', 'Postman', 'Jira', 'Slack'],
    },
    projects: [
      {
        name: 'E-Commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
        link: 'github.com/alexjohnson/ecommerce',
      },
      {
        name: 'Task Management App',
        description: 'Real-time collaborative task management application with team features',
        technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
        link: 'github.com/alexjohnson/taskmanager',
      },
    ],
  };

  return (
    <div className="h-screen p-1 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
      <div className="max-w-198 h-screen p-5 text-black font-serif bg-white mx-auto">
        <section className="text-center">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-sm">{resumeData.personalInfo.location}</p>
          <div className="flex justify-center items-center text-xs space-x-1 underline underline-offset-1 max-sm:flex-col">
            {/* Phone */}
            <a href={`tel:${resumeData.personalInfo.phone}`} className=" hover:underline">
              <FaPhone className="inline-block mr-1" />
              {resumeData.personalInfo.phone}
            </a>
            {/* Email */}
            <a href={`mailto:${resumeData.personalInfo.email}`} className=" hover:underline block">
              <IoIosMail className="inline-block mr-1" />
              {resumeData.personalInfo.email}
            </a>
            <a
              href={`https://${resumeData.personalInfo.linkedin}`}
              className=" hover:underline block"
            >
              <FaLinkedin className="inline-block mr-1" />
              {resumeData.personalInfo.linkedin}
            </a>
            <a
              href={`https://${resumeData.personalInfo.github}`}
              className=" hover:underline block"
            >
              <FaGithub className="inline-block mr-1" />
              {resumeData.personalInfo.github}
            </a>
            <a
              href={`https://${resumeData.personalInfo.website}`}
              className=" hover:underline block"
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
                {resumeData.education[0].degree} {`CGPA- ${resumeData.education[0].cgpa}`}
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
            <p>
              <strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java
            </p>
            <p>
              <strong>Frontend:</strong> React.js, HTML5, CSS3, Tailwind CSS
            </p>
            <p>
              <strong>Backend:</strong> Node.js (Express), Python (FastAPI)
            </p>
            <p>
              <strong>Databases:</strong> SQLite, MongoDB, PostgreSQL, Redis
            </p>
            <p>
              <strong>Cloud & DevOps:</strong> Render, Azure, Docker, Git, CI/CD (GitHub Actions)
            </p>
            <p>
              <strong>Tools:</strong> VS Code, Postman, Auth0, Zustand, Nodemailer, CodeMirror
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
