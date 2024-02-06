'use client'

import React, { useState, useEffect } from 'react';

export default function ClimateInfo() {
    // State to store fetched data
    const [climateData, setClimateData] = useState({
        climate: { humidity: 0, temperature: 0 },
        sensor_info: { location: '' },
    });

    // State to handle loading and error states
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from the endpoint on component mount
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_CLIMATE_API_URL;
        if (typeof apiUrl === 'undefined') {
            setError('API URL is not defined');
            setIsLoading(false);
            return;
        }

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setClimateData(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []); // Empty dependency array means this effect runs once on mount

    // Conditional rendering based on loading/error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Climate Information</h2>
            <hr />
            <h3>{climateData.sensor_info.location}</h3>
            <p>Temperature: {climateData.climate.temperature}°C</p>
            <p>Humidity: {climateData.climate.humidity}%</p>
        </div>
    );
}

