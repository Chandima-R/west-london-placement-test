'use client'

import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";

export const Questions = () => {
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const storedData = sessionStorage.getItem('userDetails');
        if (storedData) {
            setUserDetails(JSON.parse(storedData));
        }
    }, []);

    console.log(userDetails);

    const [activeTab, setActiveTab] = useState("page1");
    const tabs = ["page1", "page2", "page3", "page4", "page5"];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handlePrevious = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1]);
        }
    };

    const handleSubmit = () => {
        console.log("Form submitted!");
    };

    return (
        <div>
            <div className={'w-full flex items-center justify-center mx-auto'}>
                <Image src="/images/logo/west-london-logo.png" alt="west london - ielsts" width={1000}
                       height={1000}
                       className="w-48 h-auto "/>
            </div>
            <div>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="page1">Questions 1-10</TabsTrigger>
                        <TabsTrigger value="page2">Questions 11-20</TabsTrigger>
                        <TabsTrigger value="page3">Questions 21-30</TabsTrigger>
                        <TabsTrigger value="page4">Questions 31-40</TabsTrigger>
                        <TabsTrigger value="page5">Questions 41-50</TabsTrigger>
                    </TabsList>

                    {tabs.map((tab, index) => (
                        <TabsContent key={tab} value={tab}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Page {index + 1}</CardTitle>
                                    <CardDescription>Content for Page {index + 1} goes here.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor={`input-${index}`}>Input {index + 1}</Label>
                                        <Input id={`input-${index}`}/>
                                    </div>
                                </CardContent>
                                <CardFooter className={`flex ${index > 0 ? 'justify-between' : 'justify-end'}`}>
                                    {index > 0 && (
                                        <Button className={'rounded-xs h-10'} variant="outline"
                                                onClick={handlePrevious}>
                                            Previous
                                        </Button>
                                    )}
                                    {index < tabs.length - 1 ? (
                                        <Button className={'rounded-xs h-10'} variant="outline" onClick={handleNext}>
                                            Next
                                        </Button>
                                    ) : (
                                        <Button
                                            className="h-10 bg-blue-950 hover:bg-blue-800 text-white font-semibold py-3 rounded-xs transition-all flex items-center justify-center"
                                            onClick={handleSubmit}>Submit Answers</Button>
                                    )}
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </div>
    );
};