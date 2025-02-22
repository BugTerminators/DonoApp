"use client";

import { Calendar } from 'lucide-react';
import React, { useState } from 'react'
import { Button } from './ui/button';

const FoodDetails = () => {

    const [selectedType, setSelectedType] = useState<string>('');
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);

    const dietaryOptions = [
        { id: 'nonveg', label: 'Non Veg', icon: '▲', color: 'text-red-500 bg-red-50' },
        { id: 'veg', label: 'Veg', icon: '●', color: 'text-green-500 bg-green-50' },
        { id: 'egg', label: 'Egg', icon: '●', color: 'text-yellow-500 bg-yellow-50' }
    ];

    const typeOptions = [
        { id: 'packaged', label: 'Packaged', icon: '📦' },
        { id: 'homemade', label: 'Home-Made', icon: '🍳' }
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">More Details</h2>

            <div className="space-y-4">
                {/* Date Fields */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-500 mb-2">Manufacturing Date</p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">--/--/----</span>
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-4">
                        <p className="text-sm text-gray-500 mb-2">Expiration Date</p>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">--/--/----</span>
                            <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                {/* Dietary Information */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Dietary Information</p>
                    <div className="flex gap-3">
                        {dietaryOptions.map((option) => (
                            <Button
                                key={option.id}
                                variant="outline"
                                className={`rounded-xl px-4 py-2 ${selectedDietary.includes(option.id) ? option.color : 'bg-gray-50'
                                    }`}
                                onClick={() => {
                                    const newSelected = selectedDietary.includes(option.id)
                                        ? selectedDietary.filter(id => id !== option.id)
                                        : [...selectedDietary, option.id];
                                    setSelectedDietary(newSelected);
                                }}
                            >
                                <span className={option.color.split(' ')[0]}>{option.icon}</span>
                                <span className="ml-2">{option.label}</span>
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Type Selection */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold">Type</p>
                    <div className="flex gap-3">
                        {typeOptions.map((option) => (
                            <Button
                                key={option.id}
                                variant="outline"
                                className={`rounded-xl px-4 py-2 flex-1 ${selectedType === option.id ? 'bg-gray-100' : 'bg-gray-50'
                                    }`}
                                onClick={() => setSelectedType(option.id)}
                            >
                                <span className="mr-2">{option.icon}</span>
                                {option.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodDetails