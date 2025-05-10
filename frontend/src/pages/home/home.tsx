import { useEffect, useState } from 'react';
import Chatbot from '../chatbot/chatbot';
import HeroSectionOne from './heroSectionOne';
import HeroSectionTwo from './heroSectionTwo';
import { HomePageSeoMetaTags } from './homePageSeoMetaTags';
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import axios from 'axios';
import { useAuthCheck } from '../../hooks/authCheckHook';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface MyProject {
  id: string;
  img: string;
  name: string;
  description: string;
  bgColor: string;
  link: string;
}

function Home() {
  const projects: MyProject[] = [
    {
      id: 'proj_wealthpsychology',
      img: 'https://res.cloudinary.com/dywuvwqth/image/upload/v1743429589/karan.email/rinkpptt11gjweedg7mx.png',
      name: 'WealthPsychology: -',
      description: `Teaches the principles of financial psychology, and explains different financial concepts.`,
      bgColor: 'bg-lime-500',
      link: 'https://wealthpsychology.karan.email/',
    },
    {
      id: 'proj_explanatorai',
      img: 'https://res.cloudinary.com/dywuvwqth/image/upload/v1743587227/karan.email/m8yyptura5kuao1nzugt.jpg',
      name: 'Explanator AI: -',
      description: `Include the Chatbots, and custom Datasets of Different models and APIs.`,
      bgColor: 'bg-blue-500',
      link: 'https://explanatorai.site',
    },
    {
      id: 'proj_otherprojects',
      img: 'https://res.cloudinary.com/dywuvwqth/image/upload/v1743587228/karan.email/vrqkgi7qwemhcttfsvvl.jpg',
      name: 'Other Projects: -',
      description: `Developing some other projects, and working on some new ideas. Using different technologies.`,
      bgColor: 'bg-orange-500',
      link: 'https://github.com/knkrn5',
    },
  ];

  const isAuthenticated = useAuthCheck();

  const [userLikeDislike, setUserLikeDislike] = useState<Record<string, string>>({});
  const [allProjectsLikeDislikeCounts, setallProjectsLikeDislikeCounts] = useState<
    { projectId: string; likeCount: number; dislikeCount: number }[]
  >([]);

  async function sendLikeDislike(projectId: string, likeDislike: string) {
    try {
      await axios.post(
        `${BACKEND_URL}/api/projects/add-projects-like-dislike-interaction`,
        {
          projectId,
          likeDislike,
        },
        { withCredentials: true }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error send like or dislike:', error.response?.data);
      } else {
        console.error('unexpected Error send like or dislike:', error);
      }
    }
  }

  async function handleLikeDislike(e: React.MouseEvent<HTMLButtonElement>, projectId: string) {
    if (!isAuthenticated) {
      alert('Please login to like or dislike projects.');
      return;
    }

    const clickedLikeDislikeValue = e.currentTarget?.value ?? 'null';
    const currentValue = userLikeDislike[projectId];

    let newLikeDislikeValue = clickedLikeDislikeValue;
    if (currentValue === clickedLikeDislikeValue) {
      newLikeDislikeValue = 'null';
    }

    setUserLikeDislike(prev => ({
      ...prev,
      [projectId]: newLikeDislikeValue,
    }));

    // updating the like/dislike counts optimistically
    setallProjectsLikeDislikeCounts(prevCounts =>
      prevCounts.map(item => {
        if (item.projectId !== projectId) return item;

        let { likeCount, dislikeCount } = item;

        // removing previous selection
        if (currentValue === 'like') likeCount--;
        if (currentValue === 'dislike') dislikeCount--;

        // appling new selection
        if (newLikeDislikeValue === 'like') likeCount++;
        if (newLikeDislikeValue === 'dislike') dislikeCount++;

        return { ...item, likeCount, dislikeCount };
      })
    );

    await sendLikeDislike(projectId, newLikeDislikeValue);
  }

  async function getUserProjectsLikeDislike() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/projects/get-user-projects-like-dislike-interaction`,
        {
          withCredentials: true,
        }
      );
      const { data } = response.data;

      data.forEach((project: { projectId: string; likeDislikeValue: string }) => {
        setUserLikeDislike(prevState => ({
          ...prevState,
          [project.projectId]: project.likeDislikeValue,
        }));
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error get user like or dislike:', error.response?.data);
      } else {
        console.error('unexpected Error get user like or dislike:', error);
      }
    }
  }

  async function getAllProjectsLikeDislike() {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/projects/get-all-projects-like-dislike-interaction`
      );
      const { data } = response.data;

      setallProjectsLikeDislikeCounts(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error get all projects like or dislike:', error.response?.data);
      } else {
        console.error('unexpected Error get all projects like or dislike:', error);
      }
    }
  }

  useEffect(() => {
    getUserProjectsLikeDislike();
    getAllProjectsLikeDislike();
  }, []);

  return (
    <>
      <Chatbot />
      <HomePageSeoMetaTags />
      <HeroSectionOne />
      {/* Container for the timeline */}
      <div className="relative mx-auto px-4 py-12 lg:px-[10%] bg-gradient-to-br from-gray-150 via-gray-300 to-gray-150 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
        {/* Vertical center line */}
        <div className="max-[550px]:hidden block  absolute left-1/2 top-0 h-full w-[5px]  transform -translate-x-1/2 shadow bg-gray-600 shadow-white dark:bg-gray-400 dark:shadow-sky-950 "></div>

        {/* Project list */}
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
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
                }  transform  transition-all duration-300 ease-in-out hover:scale-101 ${
                  index % 2 === 0 ? 'md:mr-5' : 'md:ml-5'
                }`}
              >
                <div className=" flex items-center max-[350px]:flex-col ">
                  <img alt="Project" className="w-48 h-48 object-cover " src={project.img} />
                  <div className=" p-2">
                    <h2 className="text-lg font-bold mb-2 after:block after:content-[''] after:h-[1px] after:w-full after:bg-black">
                      {project.name}
                    </h2>
                    <p className="text-sm mb-4">{project.description}</p>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => window.open(project.link, '_blank')}
                        className="relative group bg-green-600 active:bg-green-800 text-white font-semibold px-6 py-2 rounded-full cursor-pointer shadow-md transition-all duration-300 ease-in-out transform overflow-hidden"
                      >
                        <span className="relative z-10">Visit Project</span>
                        <span className="absolute w-0 h-full top-0 left-0 bg-green-800 group-hover:w-full transition-hover duration-300 ease-in-out"></span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* like / dislike buttons */}
              <div
                className={`absolute flex items-center gap-1 -bottom-5 rounded-full ${
                  project.bgColor
                } shadow-md border border-gray-100 p-1 transition-all duration-300 hover:shadow-lg ${
                  index % 2 === 0 ? 'left-2' : 'right-2'
                }`}
              >
                <button
                  type="button"
                  value={'like'}
                  className="flex p-1.5 rounded-full bg-blue-50 text-gray-500  transition-colors duration-200 cursor-pointer"
                  aria-label="Like"
                  onClick={e => handleLikeDislike(e, project.id)}
                >
                  {userLikeDislike[project.id] === 'like' ? (
                    <AiFillLike size={20} className="text-blue-600" />
                  ) : (
                    <AiOutlineLike
                      size={20}
                      className="hover:text-blue-600 hover:scale-105 duration-300 transition-transform "
                    />
                  )}
                  <span className="font-bold ">
                    {allProjectsLikeDislikeCounts.find(item => item.projectId === project.id)
                      ?.likeCount ?? 0}
                  </span>
                </button>
                <div className="h-4 w-px  bg-gray-200"></div>
                <button
                  type="button"
                  value={'dislike'}
                  className="flex p-1.5 rounded-full bg-red-50 text-gray-500  transition-colors duration-200 cursor-pointer"
                  aria-label="Dislike"
                  onClick={e => handleLikeDislike(e, project.id)}
                >
                  {userLikeDislike[project.id] === 'dislike' ? (
                    <AiFillDislike size={20} className="text-red-600" />
                  ) : (
                    <AiOutlineDislike
                      size={20}
                      className=" hover:scale-105 duration-300 transition-transform hover:text-red-600  "
                    />
                  )}
                  <span className="font-bold">
                    {allProjectsLikeDislikeCounts.find(item => item.projectId === project.id)
                      ?.dislikeCount ?? 0}
                  </span>
                </button>
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
