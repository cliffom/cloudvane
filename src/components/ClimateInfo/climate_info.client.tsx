'use client';

import React, { useState, useEffect } from 'react';
import styles from './climate_info.module.css';
import { sendGTMEvent } from '@next/third-parties/google';
import { formatDistanceToNow } from 'date-fns';

interface ClimateData {
    [location: string]: {
        climate: {
            humidity: number;
            temperature: number;
        };
        sensor_info: {
            error: boolean;
            location: string;
            status: string;
        };
        last_updated: EpochTimeStamp;
    };
}

const convertTemperature = (temperature: number, isCelsius: boolean): number => {
    return isCelsius ? temperature : (temperature * 9 / 5) + 32;
};

const lastUpdated = (timestamp: EpochTimeStamp) => {
    return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
};

export default function ClimateInfo() {
    const [climateData, setClimateData] = useState<ClimateData>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isCelsius, setIsCelsius] = useState<boolean>(true);

    useEffect(() => {
        const savedUnit = localStorage.getItem('isCelsius');
        setIsCelsius(savedUnit !== null ? savedUnit === 'true' : true);

        const apiUrl = process.env.NEXT_PUBLIC_CLIMATE_API_URL;
        if (!apiUrl) {
            setError('API URL is not defined');
            setIsLoading(false);
            return;
        }

        fetch(apiUrl)
            .then(response => {
                if (!response.ok) throw new Error('Error getting climate data from the API');
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
    }, []);

    const toggleTemperatureUnit = () => {
        const newIsCelsius = !isCelsius;
        setIsCelsius(newIsCelsius);
        localStorage.setItem('isCelsius', String(newIsCelsius));
        sendGTMEvent({ event: 'buttonClicked', value: 'toggleTemperatureUnit' });
    };

    if (isLoading) return Placeholder('Loading...');
    if (error) return Placeholder(error);

    return (
        <div>
            {Object.values(climateData).map(data => (
                <div key={data.sensor_info.location} className={styles.climateData}>
                    <h3>{data.sensor_info.location}</h3>
                    <p>Status: {data.sensor_info.status}</p>
                    <p>Updated: {lastUpdated(data.last_updated)}</p>
                    <p>Temperature: {convertTemperature(data.climate.temperature, isCelsius).toFixed(1)}°{isCelsius ? 'C' : 'F'}</p>
                    <p>Humidity: {data.climate.humidity}%</p>
                </div>
            ))}
            <button onClick={toggleTemperatureUnit} className={styles.conversionButton}>
                Switch to {isCelsius ? 'Fahrenheit' : 'Celsius'}
            </button>
        </div>
    );
}

function Placeholder(message: string) {
    return <div className={styles.climateData}>{message}</div>;
}
