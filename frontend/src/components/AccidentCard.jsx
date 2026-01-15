import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Camera } from 'lucide-react';

const AccidentCard = ({ accident }) => {
    const navigate = useNavigate();
    const { id, imageUrl, confidence, location, timestamp, cameraId } = accident;
    const date = new Date(timestamp);

    // Determine severity color based on confidence (mock logic)
    const isHighConf = confidence > 80;

    return (
        <div
            onClick={() => navigate(`/accident/${id}`)}
            className="bg-surface rounded-lg overflow-hidden border border-gray-700 hover:border-danger/50 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all cursor-pointer group"
        >
            <div className="relative h-48 bg-gray-900">
                <img
                    src={imageUrl}
                    alt="Accident Detection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image' }}
                />
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-gray-600">
                    <span className={`font-bold ${isHighConf ? 'text-danger' : 'text-yellow-400'}`}>
                        {confidence}% CONFIDENCE
                    </span>
                </div>
            </div>

            <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2 text-muted text-sm">
                        <Camera className="w-4 h-4" />
                        <span>ID: {cameraId}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">
                        #{id.slice(-6)}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-text">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="truncate">{location}</span>
                </div>

                <div className="flex items-center gap-2 text-muted text-sm border-t border-gray-700 pt-3">
                    <Clock className="w-4 h-4" />
                    <span>{date.toLocaleDateString()} {date.toLocaleTimeString()}</span>
                </div>
            </div>
        </div>
    );
};

export default AccidentCard;
