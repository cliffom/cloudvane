'use client';

import React, { useState, useEffect } from 'react';
import styles from './climate_info.module.css';
import { sendGTMEvent } from '@next/third-parties/google'

// Define a type for the climate data state
interface ClimateData {
    climate: {
        humidity: number;
        temperature: number;
    };
    sensor_info: {
        location: string;
    };
}

export default function ClimateInfo() {
    // State to store fetched data, with an explicit type
    const [climateData, setClimateData] = useState<ClimateData>({
        climate: { humidity: 0, temperature: 0 },
        sensor_info: { location: '' },
    });

    // State to handle loading and error states
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // State to track temperature unit, initialized to true (Celsius) by default
    const [isCelsius, setIsCelsius] = useState<boolean>(true);

    useEffect(() => {
        // Attempt to load the user's temperature unit preference from localStorage
        const savedUnit = localStorage.getItem('isCelsius');
        const unitPreference = savedUnit !== null ? savedUnit === 'true' : true;
        setIsCelsius(unitPreference);

        // Fetch climate data from the API
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
                setClimateData(data as ClimateData);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    // Function to toggle temperature unit and save preference to localStorage
    const toggleTemperatureUnit = () => {
        const newIsCelsius = !isCelsius;
        setIsCelsius(newIsCelsius);
        localStorage.setItem('isCelsius', String(newIsCelsius));
        sendGTMEvent({ event: 'buttonClicked', value: 'toggleTemperatureUnit' });
    };

    // Function to convert temperature
    const convertTemperature = (temperature: number): number => {
        return isCelsius ? temperature : (temperature * 9 / 5) + 32;
    };

    if (isLoading) return Placeholder('Loading...');
    if (error) return Placeholder(error);

    const displayTemperature = convertTemperature(climateData.climate.temperature);

    return (
        <div className={styles.climateData}>
            <h3>{climateData.sensor_info.location}</h3>
            <p className={styles.temperatureInfo}>
                Temperature: {displayTemperature.toFixed(1)}°{isCelsius ? 'C' : 'F'}
            </p>
            <p>Humidity: {climateData.climate.humidity}%</p>
            <button onClick={toggleTemperatureUnit} className={styles.conversionButton}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
        </div>
    );
}

function Placeholder(message: string) {
    return <div className={styles.climateData}>{message}</div>
}
