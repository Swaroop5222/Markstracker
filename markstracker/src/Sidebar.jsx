import React from 'react';
import { BarChart3, Upload, Eye, Home } from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '#', active: true },
        { icon: Upload, label: 'Upload Marks', href: '#' },
        { icon: Eye, label: 'View Marks', href: '#' },
        { icon: BarChart3, label: 'Analytics', href: '#' },
    ];

    return (
        <div className="w-64 bg-white/80 backdrop-blur-sm shadow-lg border-r border-white/20 h-full">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Navigation</h3>
                <nav className="space-y-2">
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${item.active
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.label}</span>
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;