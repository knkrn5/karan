import { FaGlobe, FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaGithub, FaLinkedin, FaArrowCircleDown } from 'react-icons/fa';

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
        name: 'E-Commerce Platform',
        duration: '2022 – 2023',
        description: 'Full-stack e-commerce solution with payment integration and admin dashboard',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
        link: 'github.com/alexjohnson/ecommerce',
      },
      {
        name: 'Task Management App',
        duration: '2022 – 2023',
        description: 'Real-time collaborative task management application with team features',
        technologies: ['React', 'Socket.io', 'MongoDB', 'Express'],
        link: 'github.com/alexjohnson/taskmanager',
      },
    ],
  };

  return (
    <div className="flex flex-col p-1 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
      <div className="max-w-4xl h-screen p-5 text-black font-serif bg-white mx-auto">
        <section className="text-center">
          <h1 className="text-2xl font-bold">{resumeData.personalInfo.name}</h1>
          <p className="text-sm">{resumeData.personalInfo.location}</p>
          <div className="flex justify-center items-center text-xs space-x-1 underline underline-offset-2 max-sm:flex-col">
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
      </div>
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
