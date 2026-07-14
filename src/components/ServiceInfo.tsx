import React from 'react';

const ServiceInfo = () => {
    return (
        <div className='bg-[#0a9396]/10 border-t-2 border-b-2 border-[#005f73]/50 my-10 p-5 md:p-10 px-5 lg:px-0'>
            <div className='max-w-7xl mx-auto bg-[#005f73]/30 text-[#0a9396] rounded-lg flex justify-center flex-wrap gap-4 md:gap-8'>
                
                {/* ১. মোট অ্যাডপ্ট হওয়া প্রাণীর সংখ্যা */}
                <div className='text-center p-5 md:p-10'>
                    <p className='text-2xl md:text-3xl lg:text-5xl font-bold'>1,200+</p>
                    <p className='text-xs lg:text-xl font-semibold mt-1'>Pets Adopted</p>
                </div>

                {/* ২. হ্যাপি ফ্যামিলি বা ওনার্স */}
                <div className='text-center p-5 md:p-10'>
                    <p className='text-2xl md:text-3xl lg:text-5xl font-bold'>950+</p>
                    <p className='text-xs lg:text-xl font-semibold mt-1'>Happy Families</p>
                </div>

                {/* ৩. কতগুলো রেসকিউ পার্টনার বা শেল্টার যুক্ত আছে */}
                <div className='text-center p-5 md:p-10'>
                    <p className='text-2xl md:text-3xl lg:text-5xl font-bold'>50+</p>
                    <p className='text-xs lg:text-xl font-semibold mt-1'>Partner Shelters</p>
                </div>

                {/* ৪. অ্যানিমেল ক্যাটাগরি/স্পিসিস */}
                <div className='text-center p-5 md:p-10'>
                    <p className='text-2xl md:text-3xl lg:text-5xl font-bold'>10+</p>
                    <p className='text-xs lg:text-xl font-semibold mt-1'>Pet Categories</p>
                </div>

            </div>
        </div>
    );
};

export default ServiceInfo;