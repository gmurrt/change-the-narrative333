"use client";

import { useAdminBlog } from "@/hooks/useAdminBlog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { TabsContent } from "./ui/tabs";
import { Button } from "./ui/button";
import { FileText, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Props {
    accountType : string;
}

const BlogTab = ({accountType} : Props) => {
  const { posts, loadingBlog } = useAdminBlog();

  const helpSeekerPosts = posts
    .filter((post) => post.type === accountType)
    .sort((a, b) => b.publishDate?.seconds - a.publishDate?.seconds)
    .slice(0, 5); // show only latest 5 posts

  return (
    <TabsContent value="blog">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2 text-accent" />
            Blog & Resources
          </CardTitle>
          <CardDescription>
            Read articles, stories, and access resources tailored to your
            interests.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            <p>
              Our blog contains stories, resources, and information to help you
              on your journey. Based on your profile, we've curated the
              following articles that may interest you:
            </p>

            <div className="grid grid-cols-1 gap-4">
              {helpSeekerPosts.length === 0 ? <>
                <div className="text-center">
                  No blogs for {accountType} yet.
                </div>
              </> : helpSeekerPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <CardDescription>
                      For help seekers •{" "}
                      {post.publishDate
                        ? post.publishDate
                            .toDate()
                            .toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })
                        : "Unpublished"}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      asChild
                      variant="ghost"
                      className="flex items-center p-0"
                    >
                      <Link href={`/blog/${post.id}`}>
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="w-fit hover:text-black" asChild>
              <Link href="/blog">{helpSeekerPosts.length === 0 ? 'View other blogs' : 'View All Blog Posts' }</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default BlogTab;
