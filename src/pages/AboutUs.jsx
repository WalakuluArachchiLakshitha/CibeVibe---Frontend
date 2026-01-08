import React from 'react';
import { BlurCircle } from '../components/BlurCircle';
import { Title } from '../components/admin/Title';
import {
    FilmIcon,
    UsersIcon,
    StarIcon,
    HeartIcon,
    AwardIcon,
    TargetIcon,
    SparklesIcon,
    GlobeIcon
} from 'lucide-react';

const stats = [
    { icon: FilmIcon, value: "300+", label: "Movies Shown" },
    { icon: UsersIcon, value: "1M+", label: "Happy Customers" },
    { icon: StarIcon, value: "4.9", label: "Average Rating" },
    { icon: AwardIcon, value: "25+", label: "Industry Awards" }
];

const team = [
    {
        name: "Shalinda Jayewardena",
        role: "Founder & CEO",
        image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        bio: "A visionary leader with 15+ years in the entertainment industry."
    },
    {
        name: "Ishara Abeywickrama",
        role: "Chief Technology Officer",
        image: "https://images.pexels.com/photos/20454417/pexels-photo-20454417/free-photo-of-skg-photography-professional-photography.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        bio: "Tech innovator driving the digital transformation of cinema."
    },
    {
        name: "Praneeth Amarasinghe",
        role: "Head of Operations",
        image: "https://media.licdn.com/dms/image/v2/D5603AQHt88gXN4Yuqg/profile-displayphoto-scale_400_400/B56Zkiz5IUHQAg-/0/1757225654099?e=2147483647&v=beta&t=GHVIYUHmN3qjxLBsISd55b2hhH8zgn8c-iglKSZU0po",
        bio: "Operations expert ensuring seamless movie experiences."
    },
    {
        name: "Sachini Gunasekara",
        role: "Creative Director",
        image: "https://www.denverheadshotco.com/wp-content/uploads/2023/06/Company-Headshots-scaled.jpg",
        bio: "Creative mind behind our stunning venue designs."
    }
];

const values = [
    {
        icon: HeartIcon,
        title: "Passion for Cinema",
        description: "We live and breathe movies. Every detail of our theaters is designed with film lovers in mind."
    },
    {
        icon: SparklesIcon,
        title: "Innovation First",
        description: "From IMAX to 4DX, we bring the latest in cinema technology to deliver unforgettable experiences."
    },
    {
        icon: TargetIcon,
        title: "Customer Focus",
        description: "Your comfort and satisfaction are our top priorities. We're here to make every visit special."
    },
    {
        icon: GlobeIcon,
        title: "Community Impact",
        description: "We believe in giving back, supporting local filmmakers and hosting community events."
    }
];

const AboutUs = () => {
    return (
        <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-36 pb-20 min-h-screen">
            <BlurCircle top="100px" left="100px" />
            <BlurCircle bottom="300px" right="50px" />

           
            <div className="text-center mb-16">
                <Title text1="About" text2="CineVibe" />
                <p className="text-gray-400 mt-4 max-w-3xl mx-auto text-lg">
                    Where passion for cinema meets cutting-edge technology.
                    Since 2015, we've been redefining the movie-going experience
                    with state-of-the-art theaters and unparalleled service.
                </p>
            </div>

       
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass p-6 rounded-2xl border border-white/10 text-center hover:border-primary/40 transition-all duration-300"
                    >
                        <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                        <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            {stat.value}
                        </div>
                        <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                    </div>
                ))}
            </div>

           
            <div className="max-w-4xl mx-auto mb-20">
                <div className="glass p-8 md:p-12 rounded-2xl border border-white/10">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Our Story
                        </span>
                    </h2>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                            CineVibe was born from a simple idea: everyone deserves a premium movie experience.
                            What started as a single theater in downtown has grown into a network of state-of-the-art
                            cinema destinations across the country.
                        </p>
                        <p>
                            Our founders believed that watching a film should be more than just sitting in a dark room.
                            It should be an immersive journey—a chance to escape, dream, and feel every emotion
                            the filmmakers intended. That's why we've invested in the best sound systems,
                            the clearest screens, and the most comfortable seating in the industry.
                        </p>
                        <p>
                            Today, CineVibe continues to push boundaries. We were among the first to introduce
                            4DX motion seats, premium dine-in experiences, and our innovative mobile booking system.
                            But at our core, we're still the same movie lovers who just want to share that magic with you.
                        </p>
                    </div>
                </div>
            </div>

          
            <div className="mb-20">
                <h2 className="text-2xl font-bold mb-10 text-center">
                    <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Our Values
                    </span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="glass p-6 rounded-2xl border border-white/10 hover:border-primary/40 transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                                <value.icon className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
                            <p className="text-gray-400 text-sm">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            
            <div>
                <h2 className="text-2xl font-bold mb-10 text-center">
                    <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Meet Our Team
                    </span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {team.map((member, index) => (
                        <div
                            key={index}
                            className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/40 transition-all duration-300 group"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            </div>
                            <div className="p-5 text-center">
                                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-gray-400 text-xs">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
