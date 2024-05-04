import React from 'react';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const StartHere: React.FC = () => {

    const router = useRouter();

    const routeHacker = async () => {
        localStorage.setItem('userType', 'hacker')
        try {
            const response = await fetch('/api/hackers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }

        router.push('/api/auth/login');
    }

    const routeOrganiser = async () => {
        localStorage.setItem('userType', 'hacker')
        try {
            const response = await fetch('/api/organisers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }

        router.push('/api/auth/login');
    }

    return (
            <div className=" flex flex-row space-x-4 justify-center">
                    <Button color="primary" onClick={routeHacker} >
                        Hacker
                    </Button>
                    <Button color="secondary" onClick={routeOrganiser}>
                        Organiser
                    </Button>
            </div>
    );
};

export default StartHere;
