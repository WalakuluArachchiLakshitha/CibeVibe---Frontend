import React from 'react';
import { BlurCircle } from '../components/BlurCircle';
import { Title } from '../components/admin/Title';
import { MapPinIcon, PhoneIcon, ClockIcon, StarIcon, WifiIcon, ParkingCircleIcon, AccessibilityIcon } from 'lucide-react';

const theaters = [
    {
        id: 1,
        name: "CINEVIBE CINEMAS - COLOMBO CITY CENTRE",
        address: "123 Main Street, Downtown District, City Center",
        phone: "+1 (555) 123-4567",
        hours: "10:00 AM - 11:30 PM",
        rating: 4.8,
        screens: 12,
        features: ["IMAX", "Dolby Atmos", "4DX", "VIP Lounge"],
        image: "https://pbs.twimg.com/media/EJQVSg1UYAQVgxR.jpg",
        amenities: ["wifi", "parking", "accessibility"]
    },
    {
        id: 2,
        name: "CINEVIBE CINEMAS - MOUNT LAVINIA",
        address: "456 Shopping Boulevard, Mall Plaza, West Side",
        phone: "+1 (555) 234-5678",
        hours: "9:00 AM - 12:00 AM",
        rating: 4.6,
        screens: 8,
        features: ["3D", "Dolby Atmos", "Premium Seats"],
        image: "https://cdn.evt.com/wp-content/uploads/2025/10/02123627/EVENT-CINEMAS_MARION_4DX_screen-2200x1200.jpg",
        amenities: ["wifi", "parking"]
    },
    {
        id: 3,
        name: "CINEVIBE CINEMAS - ONE GALLE FACE MALL ",
        address: "789 River Road, Waterfront Area, East District",
        phone: "+1 (555) 345-6789",
        hours: "11:00 AM - 11:00 PM",
        rating: 4.9,
        screens: 10,
        features: ["IMAX", "ScreenX", "Luxury Recliners", "Dine-In"],
        image: "https://offloadmedia.feverup.com/saopaulosecreto.com/wp-content/uploads/2024/02/28190405/pexels-tima-miroshnichenko-7991579-1-1024x683.jpg",
        amenities: ["wifi", "parking", "accessibility"]
    },
    {
        id: 4,
        name: "CINEVIBE CINEMAS - KANDY CITY CENTER ",
        address: "321 Highland Avenue, Uptown Heights, North End",
        phone: "+1 (555) 456-7890",
        hours: "10:30 AM - 10:30 PM",
        rating: 4.7,
        screens: 6,
        features: ["3D", "Premium Sound", "Couple Seats"],
        image: "https://media.timeout.com/images/101832661/750/422/image.jpg",
        amenities: ["wifi", "accessibility"]
    }
];

const Theaters = () => {
    return (
        <div className="relative px-6 md:px-16 lg:px-40 pt-28 md:pt-36 pb-20 min-h-screen">
            <BlurCircle top="100px" left="100px" />
            <BlurCircle bottom="200px" right="100px" />

            <div className="text-center mb-12">
                <Title text1="Our" text2="Theaters" />
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Experience the magic of cinema at one of our state-of-the-art theater locations.
                    Each venue offers cutting-edge technology and premium comfort.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {theaters.map((theater) => (
                    <div
                        key={theater.id}
                        className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-primary/40 transition-all duration-300 group"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={theater.image}
                                alt={theater.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h3 className="text-xl font-bold text-white">{theater.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-yellow-400 font-medium">{theater.rating}</span>
                                    <span className="text-gray-400">• {theater.screens} Screens</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-start gap-3 text-gray-300">
                                <MapPinIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{theater.address}</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-300">
                                <PhoneIcon className="w-5 h-5 text-primary" />
                                <span className="text-sm">{theater.phone}</span>
                            </div>

                            <div className="flex items-center gap-3 text-gray-300">
                                <ClockIcon className="w-5 h-5 text-primary" />
                                <span className="text-sm">{theater.hours}</span>
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                                {theater.features.map((feature, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full font-medium"
                                    >
                                        {feature}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-4 pt-3 border-t border-white/10">
                                {theater.amenities.includes("wifi") && (
                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <WifiIcon className="w-4 h-4" />
                                        <span>Free WiFi</span>
                                    </div>
                                )}
                                {theater.amenities.includes("parking") && (
                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <ParkingCircleIcon className="w-4 h-4" />
                                        <span>Parking</span>
                                    </div>
                                )}
                                {theater.amenities.includes("accessibility") && (
                                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                                        <AccessibilityIcon className="w-4 h-4" />
                                        <span>Accessible</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Theaters;
