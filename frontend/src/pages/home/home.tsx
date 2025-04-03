import { HomeMetaTags } from '../../components/seo/pagesSeoComponents';
import HeroSectionOne from './heroSectionOne';
import HeroSectionTwo from './heroSectionTwo';

function Home() {
  class myProjects {
    img: string;
    name: string;
    description: string;
    bgColor: string;
    link: string;
    constructor(img: string, name: string, description: string, bgColor: string, link: string) {
      this.img = img;
      this.name = name;
      this.description = description;
      this.bgColor = bgColor;
      this.link = link;
    }
  }

  const projects: myProjects[] = [
    new myProjects(
      'https://res.cloudinary.com/dywuvwqth/image/upload/v1743429589/karan.email/rinkpptt11gjweedg7mx.png',
      'WealthPsychology: -',
      `Teaches the principles of financial psychology, and explains different financial concepts.`,
      'bg-lime-500',
      'https://wealthpsychology.in'
    ),
    new myProjects(
      'https://res.cloudinary.com/dywuvwqth/image/upload/v1743587227/karan.email/m8yyptura5kuao1nzugt.jpg',
      'Explanator AI: -',
      `Include the Chatbots, and custom Datasets of Different models and APIs.`,
      'bg-blue-500',
      'https://explanatorai.site'
    ),
    new myProjects(
      'https://res.cloudinary.com/dywuvwqth/image/upload/v1743587228/karan.email/vrqkgi7qwemhcttfsvvl.jpg',
      'Other Projects: -',
      `Developing some other projects, and working on some new ideas. Using different technologies.`,
      'bg-orange-500',
      'https://github.com/knkrn5'
    ),
  ];

  return (
    <>
      <HomeMetaTags />
      <HeroSectionOne />
      {/* Container for the timeline */}
      <div className="relative mx-auto px-4 py-12 lg:px-[10%] bg-gradient-to-br from-gray-150 via-gray-300 to-gray-150 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
        {/* Vertical center line */}
        <div className="max-[550px]:hidden block  absolute left-1/2 top-0 h-full w-[5px]  transform -translate-x-1/2 shadow bg-gray-600 shadow-white dark:bg-gray-400 dark:shadow-sky-950 "></div>

        {/* Project list */}
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`relative flex items-center ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Horizontal Line Connector */}
              <div
                className={`absolute top-1/2 w-[50%] h-[5px]  bg-gray-600 dark:bg-gray-400  hidden md:block ${
                  index % 2 === 0 ? 'right-1/2' : 'left-1/2'
                } transform -translate-y-1/2`}
              />

              {/* Project Card */}
              <div
                className={`w-[400px] rounded-lg overflow-hidden shadow-[6px_6px_12px_#333,-6px_-6px_120px_#444] dark:shadow-[6px_6px_12px_#111111,-6px_-6px_70px_#111] ${
                  project.bgColor
                }  transform  transition-all duration-300 ease-in-out hover:scale-103 ${
                  index % 2 === 0 ? 'md:mr-5' : 'md:ml-5'
                }`}
              >
                <div className="flex items-center max-[350px]:flex-col ">
                  <img alt="Project Image" className="w-48 h-48 object-cover " src={project.img} />

                  <div className=" p-2">
                    <h2 className="text-lg font-bold mb-2 after:block after:content-[''] after:h-[1px] after:w-full after:bg-black">
                      {project.name}
                    </h2>
                    <p className="text-sm mb-4">{project.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(project.link, '_blank')}
                        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-full cursor-pointer shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                      >
                        Visit Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <HeroSectionTwo />
    </>
  );
}

export default Home;
