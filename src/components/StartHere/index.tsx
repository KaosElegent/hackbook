'use client';

import React, { useEffect, useState } from 'react';
import { Button, User } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { UserProfile } from '@auth0/nextjs-auth0/client';

const StartHere: React.FC = () => {
    const { user } = useUser();


    const router = useRouter();

    const routeOrganiser = async () => {
        localStorage.setItem('userType', 'organiser')
        router.push('/api/auth/login');
    }
    const routeHacker = async () => {
        localStorage.setItem('userType', 'hacker')
        router.push('/api/auth/login');
    }


    const createHacker = async() => {
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
    }

    const createOrganiser = async() => {
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
    }
    

    useEffect(() => {      
        if(user){
            if(localStorage.getItem("userType")==='organiser'){
                createOrganiser();
            }
            else{
                createHacker();
            }
            router.push('/dashboard');
        }
    }, [user]);

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
