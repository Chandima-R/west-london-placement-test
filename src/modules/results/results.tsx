'use client'

import Image from "next/image";
import {useEffect, useState} from "react";

export const Results = () => {
    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: ""
    });

    useEffect(() => {
        const storedData = sessionStorage.getItem('userDetails');
        if (storedData) {
            setUserDetails(JSON.parse(storedData));
        }
    }, []);

    console.log(userDetails);

    return (
        <div>
            <div className={'w-full flex items-center justify-center mx-auto'}>
                <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000} height={1000}
                       className="w-48 h-auto "/>
            </div>
            <div className={'w-full bg-white rounded shadow p-4 mt-4'}>
                <h2 className={'text-xl font-semibold capitalize'}>Welcome, {userDetails?.firstName} {userDetails.lastName}</h2>

                <p>You have successfully completed the placement test.</p>

                <p className={'text-sm'}>You have scored: <span className={'font-semibold text-xl'}>score</span>/50</p>
            </div>
        </div>
    )
}