"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  FileText,
  Heart,
  HelpCircle,
  User,
} from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/utils"; // adjust path to your firebase setup
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SeekingHelpTab from "./SeekingHelpTab";
import WantToHelpTab from "./WantToHelpTab";
import BlogTab from "./BlogTab";
import ProfileCard from "./UserProfile";
import Link from "next/link";

const Dashboard = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"seekers" | "supporter">(
    "seekers"
  );

  const toggleAccountType = (type: "seekers" | "supporter") => {
    setAccountType(type);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-1/4">
            <ProfileCard toggleAccountType={toggleAccountType} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

            <Tabs defaultValue="seeking-help">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="seeking-help">Seeking Help</TabsTrigger>
                <TabsTrigger value="want-to-help">Want to Help</TabsTrigger>
                <TabsTrigger value="blog">View Blog</TabsTrigger>
                <TabsTrigger value="donation">Donation Info</TabsTrigger>
              </TabsList>

              <SeekingHelpTab />

              <WantToHelpTab />

              <BlogTab accountType={accountType} />

              <TabsContent value="donation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Heart className="h-5 w-5 mr-2 text-accent" />
                      Donation Information
                    </CardTitle>
                    <CardDescription>
                      Learn how your contributions make an impact.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <p>
                        Your donations help us provide critical services and
                        resources to those affected by gun violence and systemic
                        inequality. Here's how we allocate funds:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="bg-primary/10 rounded-lg p-6">
                          <p className="text-3xl font-bold text-primary mb-2">
                            60%
                          </p>
                          <p className="font-medium">Direct Support Services</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Connecting individuals with resources for mental
                            health, housing, and more
                          </p>
                        </div>

                        <div className="bg-secondary/10 rounded-lg p-6">
                          <p className="text-3xl font-bold text-secondary mb-2">
                            25%
                          </p>
                          <p className="font-medium">Community Programs</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Education, advocacy, and prevention initiatives
                          </p>
                        </div>

                        <div className="bg-accent/10 rounded-lg p-6">
                          <p className="text-3xl font-bold text-accent mb-2">
                            15%
                          </p>
                          <p className="font-medium">Operations</p>
                          <p className="text-sm text-gray-600 mt-2">
                            Staff, technology, and administrative costs
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center mt-6">
                        <Button className="flex items-center">
                          <Link href="/donate" className="flex items-center">
                            Make a Donation
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
