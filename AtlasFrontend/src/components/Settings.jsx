import React, { useEffect, useState } from "react";

import 
{ 
    UserRound, 
    UserPen, 
    Clock3, 
    ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const cards = 
[
    {
        title: "My Profile",
        description: "View your profile and account information.",
        icon: UserRound,
        path: "/my-profile",
    },
    {
        title: "Update Account Details",
        description: "Update your username, email, etc.",
        icon: UserPen,
        path: "/update-profile",
    },
    {
        title: "Update Account Password",
        description: "Update your password to keep your account secure.",
        icon: UserPen,
        path: "/update-password",
    },
    
];

export function Settings() 
{
    const [settingsCards, setSettingsCards] = useState(cards)
    const 
    {
        userData
    }
    = useSelector(state => state.userReducer.userInfo)
    const navigate = useNavigate()



    useEffect(() =>
    {
        if(userData.role == "doctor")
        {
            setSettingsCards(prev =>
                [
                    ...prev,
                    {
                        title: "Manage Your Times",
                        description: "Add or remove appointment slots.",
                        icon: Clock3,
                        path: "/doctor-time-management",
                    },
                ]
            )
        }

    }, [])



    return (
        <div className="min-h-screen bg-[#F3F7F5] p-4 sm:p-6 lg:p-8">

            <div className="mb-7">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Settings
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                    Manage your account and clinic preferences.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 ">
                {settingsCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                        onClick={() => navigate(card.path)}
                        key={card.title}
                        className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-700 group-hover:text-white">
                                    <Icon size={23} />
                                </div>


                                <ArrowRight
                                    size={19}
                                    className="text-gray-400 transition group-hover:text-emerald-700"
                                />

                            </div>

                            <h2 className="mt-6 text-lg font-bold text-gray-900">
                                {card.title}
                            </h2>

                            <p className="mt-2 min-h-10 text-sm leading-6 text-gray-500">
                                {card.description}
                            </p>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}
