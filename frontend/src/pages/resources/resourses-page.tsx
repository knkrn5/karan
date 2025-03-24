import { IconType } from 'react-icons';
import {
  FaDatabase,
  FaCloud,
  FaGlobe,
  FaFileCode,
  FaCode,
  FaCodeBranch,
  FaServer,
  FaLock,
} from 'react-icons/fa';

type Tool = {
  name: string;
  description: string;
};

type Resource = {
  category: string | string[];
  icon: IconType;
  tools?: Tool[];
  color: string;
};

/* class CreateResource implements Resource {
  constructor(
    public category: string | string[],
    public icon: LucideIcon,
    public color: string,
    public tools?: Tool[]
  ) {}
} */

class CreateResourses implements Resource {
  category: string | string[];
  icon: IconType;
  tools?: Tool[];
  color: string;
  constructor(category: string | string[], icon: IconType, color: string, tools?: Tool[]) {
    this.category = category;
    this.icon = icon;
    this.color = color;
    this.tools = tools;
  }
}

const resources: Resource[] = [
  new CreateResourses('Database', FaDatabase, 'text-emerald-500', [
    {
      name: 'Neon',
      description: 'PostgreSQL database with real-time capabilities',
    },
    {
      name: 'MongoDB Atlas',
      description: 'NoSQL database with flexible schema design',
    },
  ]),

  new CreateResourses('Hosting', FaCloud, 'text-blue-500', [
    {
      name: 'Netlify',
      description: 'Modern Serverless hosting platform with CI/CD',
    },
    {
      name: 'Render',
      description: 'Modern hosting platform with CI/CD',
    },
  ]),

  new CreateResourses('CDN', FaGlobe, 'text-orange-500', [
    {
      name: 'Cloudflare',
      description: 'Global content delivery network for fast asset delivery',
    },
    {
      name: 'Cloudinary',
      description: 'Media optimization and delivery platform',
    },
  ]),

  new CreateResourses('CMS', FaFileCode, 'text-purple-500', [
    {
      name: 'Contentful',
      description: 'Headless content management system',
    },
  ]),

  new CreateResourses('CHATBOT API', FaCode, 'text-yellow-500', [
    {
      name: 'NVIDIA',
      description: 'https://integrate.api.nvidia.com/v1',
    },
    {
      name: 'GEMINI',
      description: 'From google import genai',
    },
  ]),

  new CreateResourses('Version Control', FaCodeBranch, 'text-red-500', [
    {
      name: 'GITHUB',
      description: 'A code hosting platform for version control',
    },
  ]),

  new CreateResourses('Cloud Providers', FaServer, 'text-cyan-500', [
    {
      name: 'AWS',
      description: 'Amazon’s cloud platform for storage, computing, and more.',
    },
    {
      name: 'AZURE',
      description: 'Microsoft’s cloud service for storage, AI, and networking.',
    },
  ]),

  new CreateResourses('Authentication', FaLock, 'text-fuchsia-500', [
    {
      name: 'OAuth',
      description: 'Open standard for authorization, enabling secure API access.',
    },
    {
      name: 'Clerk',
      description: 'User authentication and management platform for modern apps.',
    },
  ]),
];

function ResourceCard({ resource }: { resource: Resource }) {
  const { category, tools, icon: Icon, color } = resource;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        <div
          className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${color} bg-opacity-10 dark:bg-opacity-20`}
        >
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{category}</p>
          {tools && (
            <div className="mt-2 space-y-3">
              {tools.map((t: Tool, index: number) => (
                <div
                  key={index}
                  className="border-b dark:border-gray-700 last:border-b-0 pb-3 last:pb-0"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{t.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResourcesInfo() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Resources Used</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            These are the Essential tools and services used for creating Projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourcesInfo;
