import React from 'react'
import { Phone, Clock, Store, Building2, MapPin } from 'lucide-react';

interface AdDetailsProps {
    ad: {
        name: string;
        location: string;
        mobile: string;
        advertiserType: string;
        workingHours: string;
        category: string;
    };
}

export default function AdDetails({ ad }: AdDetailsProps) {
    return (
        <div className='p-6 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-5xl mx-auto'>

            {/* Header Section */}
            <div className="flex gap-4 mb-6">
                <div className="bg-secondary/10 text-secondary rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl border border-secondary/10">
                    {ad.name?.trim()
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map(name => name[0].toUpperCase())
                        .join("")}
                </div>
                <div className="flex flex-col">
                    <h3 className="text-secondary font-bold text-xl">{ad.name}</h3>
                    <div className="flex items-center text-primary text-sm mt-1">
                        <MapPin size={16} />
                        <span className="mr-1">{ad.location}</span> 
                    </div>
                </div>
               
            </div>

            <hr className="border-primary-200 mb-8" />

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-10 text-center">

                {/* Mobile Number */}
                <div className="flex flex-col items-center">
                    <Phone className="text-secondary mb-2" size={24} />
                    <span className="text-primary  mb-1">رقم الموبايل</span>
                    <span className="font-bold dir-ltr">{ad.mobile}</span>
                </div>

                {/* Advertiser Type */}
                <div className="flex flex-col items-center">
                    <Building2 className="text-secondary mb-2" size={24} />
                    <span className="text-primary mb-1 text-center">Advertiser Type</span>
                    <span className="font-bold">{ad.advertiserType}</span>
                </div>

                {/* Working Hours */}
                <div className="flex flex-col items-center">
                    <Clock className="text-secondary mb-2" size={24} />
                    <span className="text-primary  mb-1">ساعات العمل</span>
                    <span className="font-bold">{ad.workingHours}</span>
                </div>

                {/* Category */}
                <div className="flex flex-col items-center">
                    <Store className="text-secondary mb-2" size={24} />
                    <span className="text-primary mb-1">Category</span>
                    <span className="font-bold">{ad.category}</span>
                </div>

            </div>

        </div>
    )
}