// import React, { useState } from 'react';
// import { dummyTrailers } from '../assets/assets';
// import ReactPlayer from 'react-player';

// const TrailersSection = () => {
//   const [currentTrailer, setCurrentTrailer] = useState(dummyTrailers[0]);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Function to handle thumbnail clicks
//   const handleThumbnailClick = (trailer) => {
//     setCurrentTrailer(trailer);
//     setIsPlaying(true); // Auto-play the new selection
//   };

//   if (!currentTrailer) return <p className="text-center text-gray-300 py-10">No trailers available</p>;

//   return (
//     <div className="bg-black text-white py-12 px-6 md:px-16 lg:px-24">
//       <h2 className="text-xl font-medium mb-6 text-gray-400">Trailers</h2>

//       <div className="relative max-w-6xl mx-auto">
//         {/* MAIN VIDEO PLAYER CONTAINER */}
//         <div className="relative aspect-video bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-white/5">
//           <ReactPlayer
//             url={currentTrailer.videoUrl}
//             controls={true}
//             playing={isPlaying}
//             width="100%"
//             height="100%"
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//             style={{ position: 'absolute', top: 0, left: 0 }}
//           />
          
//           {/* TEXT OVERLAY 
//             'pointer-events-none' is CRITICAL here so clicks pass through to the video 
//           */}
//           {!isPlaying && (
//             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none flex flex-col justify-end p-6 md:p-12">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="bg-red-600 px-2 py-0.5 text-[10px] font-bold tracking-widest">MARVEL TELEVISION</div>
//               </div>
              
//               <div className="flex flex-col md:flex-row md:items-center gap-4">
//                 <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase">
//                   {currentTrailer.videoUrl.includes('WpW36ldAqnM') ? 'IRONHEART' : 'NEW TRAILER'}
//                 </h1>
//                 <div className="hidden md:block w-px h-12 bg-white/30 mx-2"></div>
//                 <p className="text-2xl md:text-4xl font-light uppercase tracking-[0.2em] text-gray-200">
//                   Official Trailer
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* THUMBNAILS LIST */}
//         <div className="flex gap-4 mt-8 overflow-x-auto no-scrollbar pb-4">
//           {dummyTrailers.map((trailer, index) => (
//             <div 
//               key={index}
//               onClick={() => handleThumbnailClick(trailer)}
//               className={`relative min-w-[180px] md:min-w-[240px] aspect-video cursor-pointer rounded-lg overflow-hidden transition-all duration-300 border-2 ${
//                 currentTrailer.videoUrl === trailer.videoUrl 
//                 ? 'border-white scale-105 shadow-lg z-10' 
//                 : 'border-transparent opacity-50 hover:opacity-100'
//               }`}
//             >
//               <img 
//                 src={trailer.image} 
//                 alt="trailer preview" 
//                 className="w-full h-full object-cover"
//               />
              
//               {/* Play Button Icon on Thumbnail */}
//               <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                 <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center backdrop-blur-sm">
//                   <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
//                 </div>
//               </div>

//               {/* Text label on thumbnail like in the screenshot */}
//               <div className="absolute bottom-2 left-2 right-2">
//                  <p className="text-[10px] font-bold uppercase truncate bg-black/40 inline-block px-1">
//                     {index === 0 ? "Ironheart Official" : "Trailer " + (index + 1)}
//                  </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TrailersSection;