import { FaGlobe, FaPhone } from 'react-icons/fa6';
import { IoIosMail } from 'react-icons/io';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Resume() {
  // useEffect(() => {
  //   window.location.href = '/assets/pdfs/KaranResume.pdf';
  // }, []);

  return (
    <div className="h-screen p-1 bg-gray-200 text-black dark:bg-slate-800 dark:text-white">
      <div className="max-w-198 h-screen p-5 text-black font-serif bg-white mx-auto">
        <section className="text-center">
          <h1 className="text-2xl font-bold">KARAN</h1>
          <p className="text-sm">India, Delhi-110054</p>
          <div className="flex justify-center items-center text-xs space-x-1 underline underline-offset-1">
            {/* Phone */}
            <a href="tel:+917458966253" className=" hover:underline">
              <FaPhone className="inline-block mr-1" />
              +91-7458966253
            </a>
            {/* Email */}
            <a href="mailto:karan@example.com" className=" hover:underline block">
              <IoIosMail className="inline-block mr-1" />
              karan@example.com
            </a>
            <a href="https://www.linkedin.com/in/knkrn5" className=" hover:underline block">
              <FaLinkedin className="inline-block mr-1" />
              linkedin.com/in/knkrn5
            </a>
            <a href="https://www.github.com/knkrn5" className=" hover:underline block">
              <FaGithub className="inline-block mr-1" />
              github.com/knkrn5
            </a>
            <a href="https://www.karan.email" className=" hover:underline block">
              <FaGlobe className="inline-block mr-1" />
              karan.email
            </a>
          </div>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">SUMMARY</h2>
          <hr />
          <p className="text-xs">
            Full-stack web developer specializing in the MERN stack with experience delivering
            scalable, containerized, and cloud-deployed applications. Skilled in integrating
            AI-powered features, optimizing backend performance, and implementing microservices
            architecture. Committed to building accessible, user-friendly solutions.
          </p>
        </section>
        <section className="mt-1">
          <h2 className="text-sm font-semibold">EDUCATION</h2>
          <hr />
          <div className="text-xs">
            <span className="flex justify-between">
              <strong>Galgotias University</strong>{' '}
              <p>
                <b>2021 – 2025</b>
              </p>
            </span>
            <span className="flex justify-between">
              <p>BCA - CGPA - 7.5/10</p>{' '}
              <p>
                <i>Greater Noida, UP</i>
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
