import React from 'react';
import NotificationPage from '@/components/NotificationPage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div className="h-screen w- flex flex-col overflow-hidden">
            {/* Sticky Header */}
            <div className="md:ml-20">
        <div className="max-w-7xl mx-auto">
            <div className="px-4 py-2 md:py-6 md:px-8 flex items-center sticky top-0 z-10">
                <Link href="/">
                <Button variant="ghost" size="icon" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Button></Link>
                <h1 className="text-2xl md:text-3xl font-semibold">Notifications</h1>
            </div></div></div>
            
            {/* Scrollable Notification List */}
            <div className="flex w-screen justify-center overflow-y-auto">
                <NotificationPage />
            </div>
        </div>
    );
}

export default Home;
