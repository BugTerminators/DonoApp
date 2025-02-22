import React from 'react';
import NotificationPage from '@/components/NotificationPage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="h-screen flex flex-col overflow-hidden">
            {/* Sticky Header */}
            <div className="px-4 py-2 md:py-6 md:px-8 flex items-center bg-white shadow-md sticky top-0 z-10">
                <Button variant="ghost" size="icon" className="mr-4">
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-2xl md:text-3xl font-semibold">Notifications</h1>
            </div>
            
            {/* Scrollable Notification List */}
            <div className="flex w-screen justify-center overflow-y-auto">
                <NotificationPage />
            </div>
        </div>
    );
}

export default Home;
