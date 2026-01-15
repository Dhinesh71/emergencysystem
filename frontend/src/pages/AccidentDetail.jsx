import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import { getAccidentById } from '../api/accident.api';
import { ArrowLeft, Calendar, Camera, MapPin, AlertTriangle, Download } from 'lucide-react';

const AccidentDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [accident, setAccident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAccident = async () => {
            try {
                setLoading(true);
                const data = await getAccidentById(id);
                setAccident(data);
            } catch (err) {
                setError('Accident not found or server error');
            } finally {
                setLoading(false);
            }
        };
        loadAccident();
    }, [id]);

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-text">Loading Details...</div>;
    if (error) return <div className="min-h-screen bg-background flex items-center justify-center text-danger">{error}</div>;
    if (!accident) return null;

    return (
        <div className="min-h-screen bg-background pb-12">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-muted hover:text-text mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Dashboard
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Image Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-surface rounded-lg p-2 border border-gray-700">
                            <div className="relative aspect-video bg-black rounded overflow-hidden">
                                <img
                                    src={accident.imageUrl}
                                    alt="Accident Full"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>

                        <div className="bg-surface rounded-lg p-6 border border-gray-700">
                            <h3 className="text-xl font-bold text-text mb-4 flex items-center gap-2">
                                <AlertTriangle className="text-warning" />
                                Analysis Data
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 bg-background rounded-lg border border-gray-700">
                                    <p className="text-xs text-muted">CONFIDENCE</p>
                                    <p className="text-2xl font-bold text-primary">{accident.confidence}%</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border border-gray-700">
                                    <p className="text-xs text-muted">SEVERITY</p>
                                    <p className="text-2xl font-bold text-danger">HIGH</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border border-gray-700">
                                    <p className="text-xs text-muted">VEHICLES</p>
                                    <p className="text-2xl font-bold text-text">--</p>
                                </div>
                                <div className="p-4 bg-background rounded-lg border border-gray-700">
                                    <p className="text-xs text-muted">CASUALTIES</p>
                                    <p className="text-2xl font-bold text-text">--</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-6">
                        <div className="bg-surface rounded-lg p-6 border border-gray-700">
                            <h3 className="uppercase text-muted text-xs font-bold tracking-wider mb-4 border-b border-gray-700 pb-2">
                                Meta Information
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">
                                        <Camera className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted">CAMERA ID</p>
                                        <p className="text-text font-mono">{accident.cameraId}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400">
                                        <Calendar className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted">TIMESTAMP</p>
                                        <p className="text-text font-mono">
                                            {new Date(accident.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted">LOCATION</p>
                                        <p className="text-text font-mono text-sm">{accident.location}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="bg-surface rounded-lg p-1 border border-gray-700 h-64">
                            <MapView location={accident.location} />
                        </div>

                        <button className="w-full py-3 bg-primary hover:bg-blue-600 rounded text-white font-bold transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Download Report
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AccidentDetail;
