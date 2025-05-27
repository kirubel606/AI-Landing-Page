import CoolSvg from "../components/CoolSVg"
const categories = [
    { name: "Health", image: "../../public/Assets/health.png" },
    { name: "Agriculture", image: "../../public/Assets/agri.png" },
    {
        name: "Law Enforcement",
        image: "../../public/Assets/law.png",
    },
    {
        name: "Transportation",
        image: "../../public/Assets/trafic.png",
    },
    { name: "Health", image: "../../public/Assets/health.png" },
]

const contentCards = [
    {
        id: 1,
        image: "../../public/Assets/ai1.png",
        logo: "../../public/Assets/efp.png",
        timestamp: "July 2024",
        title: "Learn and Transcribe ET",
        description:
            "EFTApp, developed by ELI for the Federal Police, is a secure and efficient platform that enables citizens to report crimes in real time. Designed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information, ensuring swift action by law enforcement. Developed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information ensuring swift action by law enforcement.",
        category: "RECENT",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop",
        logo: "../../public/Assets/AI-Readiness.png",
        timestamp: "July 2024",
        title: "EFTApp",
        description:
            "EFTApp, developed by ELI for the Federal Police, is a secure and efficient platform that enables citizens to report crimes in real time. Designed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information, ensuring swift action by law enforcement. Developed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information ensuring swift action by law enforcement.",
        category: "RECENT",
    },
    {
        id: 3,
        image: "../../public/Assets/69.jpg",
        logo: "../../public/Assets/AI-Readiness.png",
        timestamp: "July 2024",
        title: "Learn and Transcribe ET",
        description:
            "EFTApp, developed by ELI for the Federal Police, is a secure and efficient platform that enables citizens to report crimes in real time. Designed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information, ensuring swift action by law enforcement. Developed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information ensuring swift action by law enforcement.",
        category: "RECENT",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=120&h=120&fit=crop",
        logo: "../../public/Assets/AI-Readiness.png",
        timestamp: "July 2024",
        title: "EFTApp",
        description:
            "EFTApp, developed by ELI for the Federal Police, is a secure and efficient platform that enables citizens to report crimes in real time. Designed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information, ensuring swift action by law enforcement. Developed to enhance public safety, EFTApp provides intuitive interfaces for submitting critical information ensuring swift action by law enforcement.",
        category: "RECENT",
    },
]

const sidebarItems = [
    {
        title: "Learn and Transcribe ET",
        date: "2023-05-08T14:00:00Z",
        category: "DEVELOPMENT",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",
        image: "../../public/Assets/69.jpg",
    },
    {
        title: "Learn and Transcribe ET",
        image: "../../public/Assets/69.jpg",
        date: "2025-05-12T14:00:00Z",
        category: "DEVELOPMENT",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
    {
        title: "EFTApp",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
        date: "2025-04-20T14:00:00Z",
        category: "research",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
    {
        title: "Learn and Transcribe ET",
        image: "../../public/Assets/69.jpg",
        date: "2025-02-10T14:00:00Z",
        category: "DEVELOPMENT",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
    {
        title: "EFTApp",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
        date: "2025-03-25T14:00:00Z",
        category: "research",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
    {
        title: "Learn and Transcribe ET",
        image: "../../public/Assets/69.jpg",
        date: "2025-01-25T14:00:00Z",
        category: "DEVELOPMENT",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
    {
        title: "EFTApp",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=60&h=60&fit=crop",
        date: "2024-05-25T14:00:00Z",
        category: "case-study",
        description: "EFPApp, developed by EAII for the Federal Police, is a secure and efficient platform that enables...",

    },
]



const tabItems = [
    { label: "LATEST", value: "latest" },
    { label: "RESEARCH", value: "research" },
    { label: "CASE STUDIES", value: "case-study" },
];
const Research = () => {
  const [activeTab, setActiveTab] = useState("latest");


    
        const timeAgo = (dateString) => {
            const now = new Date();
            const date = new Date(dateString);
            const diff = Math.floor((now - date) / 1000); // diff in seconds
    
            const seconds = diff;
            const minutes = Math.floor(diff / 60);
            const hours = Math.floor(diff / 3600);
            const days = Math.floor(diff / 86400);
            const weeks = Math.floor(diff / 604800);
            const months = Math.floor(diff / 2592000);
            const years = Math.floor(diff / 31536000);
    
            if (seconds < 60) return "just now";
            if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
            if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
            if (days < 7) return `${days} day${days !== 1 ? "s" : ""} ago`;
            if (weeks < 4) return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
            if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
            return `${years} year${years !== 1 ? "s" : ""} ago`;
        };
    
        return (
          
            <div className="min-h-screen bg-gray-50">
                  <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      <CoolSvg/>

    </div>
                {/* Banner */}
                <div className="relative h-64 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
                    <img src="./../public/Assets/Andrew_Derr.png" className="h-full" />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 flex items-center justify-center h-full">
                        <div className="text-center text-white">
                            <Typography variant="h1" className="text-4xl font-bold mb-2 text-white">
                                Research & Development
                            </Typography>
                            <Typography variant="lead" className="text-lg opacity-90 text-white">
                                Advancing Innovation Through Technology
                            </Typography>
                        </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
                </div>
    
                {/* Category Cards */}
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                        {categories.map((category, index) => (
                            <Card key={index} className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                                <div className="relative h-32">
                                    <img
                                        src={category.image || "/placeholder.svg"}
                                        alt={category.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                        <Typography variant="small" className="text-white font-semibold">
                                            {category.name}
                                        </Typography>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
    
                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Content Cards */}
                        <div className="lg:col-span-2">
                            <Typography variant="h2" className="text-2xl font-bold mb-6 text-gray-900">
                                Health
                            </Typography>
                            <div className="space-y-4">
                                {contentCards.map((card) => (
                                    <Card key={card.id} className="overflow-hidden shadow-sm">
                                        <CardBody className="p-4">
                                            <div className="flex gap-4">
                                                {/* Card Image */}
                                                <div className="relative flex-shrink-0 w-40 h-36">
                                                    <img
                                                        src={card.image || "/placeholder.svg"}
                                                        alt={card.title}
                                                        className="w-full h-full rounded-lg object-cover"
                                                    />
    
                                                    {/* Circular logo at bottom-right */}
                                                    {card.logo && (
                                                        <img
                                                            src={card.logo}
                                                            alt={`${card.title} logo`}
                                                            className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-2 border-white shadow-md object-cover"
                                                        />
                                                    )}
                                                </div>
    
    
                                                {/* Card Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Typography variant="small" className="text-orange-500 text-xs">
                                                            {card.timestamp}
                                                        </Typography>
                                                        {/* <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs font-medium">
                                {card.category}
                              </span> */}
    
                                                    </div>
    
                                                    <Typography variant="h6" className="text-gray-900 font-semibold mb-2 text-sm leading-tight">
                                                        {card.title}
                                                    </Typography>
    
                                                    <Typography variant="small" className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-3">
                                                        {card.description}
                                                    </Typography>
    
                                                    <Button
                                                        size="sm"
                                                        className="bg-indigo-950 hover:bg-indigo-700 flex items-center gap-2 text-xs px-3 py-1.5"
                                                    >
                                                        <Download className="w-3 h-3" />
                                                        Download
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>
                        </div>
    
                        {/* Sidebar - Related Topics */}
                        <aside className="lg:col-span-1">
                            <Card className="shadow-sm">
                                <CardBody className="p-4">
                                    {/* Tab Headers */}
                                    <div className="flex gap-2 mb-4">
                                        {tabItems.map((tab) => (
                                            <button
                                                key={tab.value}
                                                onClick={() => setActiveTab(tab.value)}
                                                className={`px-4 py-2 text-xs font-medium transition-colors transform -skew-x-12 ${activeTab === tab.value
                                                    ? "bg-orange-500 text-white"
                                                    : " text-gray-600 hover:text-gray-900"
                                                    }`}
                                            >
                                                <span className="-skew-x-12 inline-block">{tab.label}</span>
                                            </button>
    
                                        ))}
                                    </div>
    
                                    {/* Tab Content */}
                                    {activeTab === "latest" && (
                                        <div className="space-y-3">
                                            {[...sidebarItems]
                                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                                .slice(0, 6)
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={item.image || "/placeholder.svg"}
                                                                alt={item.title}
                                                                className="w-[110px] h-[110px] rounded object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <Typography variant="small" className="text-gray-800 text-xs mb-1 inline-block">
                                                                {item.category} /
                                                            </Typography>
                                                            <Typography variant="small" className="text-gray-500 text-xs mb-1 inline">
                                                                {timeAgo(item.date)}
                                                            </Typography>
    
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-900 font-extrabold text-lg mb-1 block"
                                                                style={{ width: "500px" }}
                                                            >
                                                                {item.title}
                                                            </Typography>
    
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-500 text-xs block"
                                                                style={{ maxWidth: "500px" }}
                                                            >
                                                                {item.description}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
    
    
    
                                    {activeTab === "research" && (
                                        <div className="space-y-3">
                                            {sidebarItems
                                                .filter((item) => item.category === "research")
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={item.image || "/placeholder.svg"}
                                                                alt={item.title}
                                                                className="w-[110px] h-[110px] rounded object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <Typography variant="small" className="text-gray-800 text-xs mb-1 inline-block">
                                                                {item.category} /
                                                            </Typography>
                                                            <Typography variant="small" className="text-gray-500 text-xs mb-1 inline">
                                                                {timeAgo(item.date)}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-900 font-extrabold text-lg mb-1 block"
                                                                style={{ width: "500px" }}
                                                            >
                                                                {item.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-500 text-xs block"
                                                                style={{ maxWidth: "500px" }}
                                                            >
                                                                {item.description}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
    
                                    {activeTab === "case-study" && (
                                        <div className="space-y-3">
                                            {sidebarItems
                                                .filter((item) => item.category === "case-study")
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                                    >
                                                        <div className="flex-shrink-0">
                                                            <img
                                                                src={item.image || "/placeholder.svg"}
                                                                alt={item.title}
                                                                className="w-[110px] h-[110px] rounded object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <Typography variant="small" className="text-gray-800 text-xs mb-1 inline-block">
                                                                {item.category} /
                                                            </Typography>
                                                            <Typography variant="small" className="text-gray-500 text-xs mb-1 inline">
                                                                {timeAgo(item.date)}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-900 font-extrabold text-lg mb-1 block"
                                                                style={{ width: "500px" }}
                                                            >
                                                                {item.title}
                                                            </Typography>
                                                            <Typography
                                                                variant="small"
                                                                className="text-gray-500 text-xs block"
                                                                style={{ maxWidth: "500px" }}
                                                            >
                                                                {item.description}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
    
                                </CardBody>
                            </Card>
                        </aside>
                    </div>
                </div>
            </div>
        )
}

export default Research
