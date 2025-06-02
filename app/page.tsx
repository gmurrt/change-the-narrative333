"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showFullProblem, setShowFullProblem] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Bold, full-width with impactful typography */}
      <section className="relative md:h-[70vh] h-[40vh] w-full overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url('https://cdn.britannica.com/41/94241-050-B7398B5E/Philadelphia-foreground-Schuylkill-River.jpg?w=1200')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Right-aligned welcome text */}
        <div className="relative p-2 z-10 w-fit h-full flex items-center ml-auto mr-16 -top-1/4">
          <div className="text-white max-w-md space-y-2">
            <h2 className="text-sm md:text-lg font-bold">
              Welcome to Philadelphia
            </h2>
            <p className="text-xs md:text-sm text-white/80">
              Centering community, justice, and resilience
              <br /> in the City of Brotherly Love.
            </p>
          </div>
        </div>
      </section>

      {/* Overlapping Typography Box with blend mode */}
      <div className="md:-mt-[5.8rem] lg:-mt-[8rem] -mt-[3rem] z-30 relative">
        <div className="container-custom">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase mb-4 tracking-tight">
            <span className="text-white whitespace-nowrap">THE POWER OF </span>
            <br />
            THE PEOPLE.
          </h1>
          <p className="text-lg md:text-2xl text-black mb-2">
            Centering People. Building Access. Driven by Justice.
          </p>
          <p className="text-sm mb-6">501(c)(3) Non-Profit Organization</p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/register">
              <Button className="bg-red-600 hover:bg-red-500 rounded-full text-lg px-6 py-4 font-bold">
                GET HELP
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                variant="outline"
                className="border-white rounded-full hover:text-black hover:bg-white/10 text-lg px-6 py-4 font-bold"
              >
                SUPPORT US
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Issues We Fight For Section - Inspired by SPLC layout */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-black mb-12 uppercase">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-[repeat(3,minmax(200px,1fr))] gap-6 auto-rows-[200px]">
            {/* Problem (Big block) */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 row-span-1 md:col-span-4 md:row-span-2 h-80 md:h-[41.5rem]">
              <Image
                src="https://images.unsplash.com/photo-1557089041-7fa93ffc2e08?w=600&auto=format&fit=crop&q=60"
                alt="Gun Violence Context"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Understanding the Problem
                </h3>
                <p className="text-sm">
                  Gun violence is not an isolated issue—it’s the result of
                  intersecting social challenges like poverty, housing
                  instability, underfunded schools, and generational trauma.
                </p>
                <Link
                  href="/about"
                  className="text-gold hover:underline font-medium mt-3"
                >
                  View More →
                </Link>
              </div>
            </div>

            {/* Solution */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 md:col-span-2 row-span-1 h-80">
              <Image
                src="https://images.unsplash.com/photo-1587426301582-fe3d3deaf58a?w=600&auto=format&fit=crop&q=60"
                alt="Solution Image"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">Our Approach</h3>
                <p className="text-sm">
                  We build bridges between communities and resources by
                  partnering with local organizations, creating resource hubs,
                  and increasing visibility through media and events.
                </p>
                <Link
                  href="/about"
                  className="text-gold hover:underline font-medium mt-3"
                >
                  View More →
                </Link>
              </div>
            </div>

            {/* Vision (Tall block) */}
            <div className="relative rounded-xl overflow-hidden group col-span-1 md:col-span-2 row-span-2 h-80">
              <Image
                src="https://images.unsplash.com/photo-1590962374541-d368b15568e9?w=600&auto=format&fit=crop&q=60"
                alt="Impact Image"
                width={987}
                height={640}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 p-6 flex flex-col justify-end text-white">
                <h3 className="text-2xl font-bold mb-2">The Impact</h3>
                <p className="text-sm">
                  We envision safer, more stable communities where individuals
                  have the tools to heal, grow, and break cycles of
                  trauma—unlocking their full potential.
                </p>
                <Link
                  href="/about"
                  className="text-gold hover:underline font-medium mt-3"
                >
                  View More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bold Mission Section - Large Typography */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="md:flex md:items-start md:gap-12">
            <div className="md:w-2/3">
              <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tight text-primary">
                CHANGE THE NARRATIVE. <br /> THEN THE NATION.
              </h2>

              <div className="prose max-w-none text-lg">
                <p className="mb-4">
                  Gun violence and systemic inequality continue to plague our
                  communities, particularly impacting underserved populations
                  and creating cycles of trauma that are difficult to break.
                </p>

                {showFullProblem ? (
                  <>
                    <p className="mb-4">
                      Many individuals affected by these issues lack access to
                      crucial resources, support systems, and opportunities for
                      healing and growth. This creates a perpetuating cycle
                      where:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>
                        <strong>
                          Limited access to mental health resources
                        </strong>{" "}
                        prevents healing from trauma
                      </li>
                      <li>
                        <strong>Economic barriers</strong> restrict
                        opportunities for advancement
                      </li>
                      <li>
                        <strong>Fragmented support systems</strong> make it
                        difficult to navigate available services
                      </li>
                      <li>
                        <strong>Stigma and misunderstanding</strong> around
                        violence and trauma prevent open dialogue and effective
                        solutions
                      </li>
                    </ul>
                    <p>
                      These challenges require a holistic approach that
                      addresses immediate needs while working toward long-term
                      systemic change—the mission at the heart of Change the
                      Narrative 333.
                    </p>
                  </>
                ) : null}

                <button
                  onClick={() => setShowFullProblem(!showFullProblem)}
                  className="flex items-center text-accent font-medium mt-2 hover:underline focus:outline-none"
                >
                  {showFullProblem ? (
                    <>
                      <span>Read Less</span>
                      <ChevronUp className="ml-1 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span>Read More</span>
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/3">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  National Impact
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      AL
                    </div>
                    <span className="text-sm font-medium">Alabama</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      FL
                    </div>
                    <span className="text-sm font-medium">Florida</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      GA
                    </div>
                    <span className="text-sm font-medium">Georgia</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      LA
                    </div>
                    <span className="text-sm font-medium">Louisiana</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      MS
                    </div>
                    <span className="text-sm font-medium">Mississippi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section with Bold Headlines */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase text-primary">
                LANDMARK CASES
              </h2>
              <div className="flex">
                <div className="w-24 h-24 bg-gray-200 mr-4 rounded"></div>
                <div>
                  <p className="text-lg">
                    Representing people from communities affected by violence,
                    creating precedents for justice.
                  </p>
                  <Link
                    href="/about"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase text-primary">
                INSPIRING HOPE
              </h2>
              <div className="flex">
                <div className="w-24 h-24 bg-gray-200 mr-4 rounded"></div>
                <div>
                  <p className="text-lg">
                    Sharing stories of resilience and recovery from those
                    who&apos;ve rebuilt after trauma.
                  </p>
                  <Link
                    href="/about"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase text-primary">
                TRACKING ISSUES
              </h2>
              <div className="flex">
                <div className="w-24 h-24 bg-gray-200 mr-4 rounded"></div>
                <div>
                  <p className="text-lg">
                    Monitoring incidents of violence and systemic inequality
                    across the nation.
                  </p>
                  <Link
                    href="/blog"
                    className="text-accent hover:underline font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Two Column Layout */}
      <section className="py-16">
        <div className="container-custom">
          <div className="md:flex md:items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase">
                Take Action
              </h2>
              <p className="text-xl mb-6">
                Change starts with individual actions. Join us in our mission to
                break cycles of violence and create stronger, more equitable
                communities.
              </p>
              <Link href="/register">
                <Button className="bg-white text-primary hover:bg-gray-100 font-bold">
                  GET INVOLVED
                </Button>
              </Link>
            </div>

            <div className="mt-8 md:mt-0 md:w-1/2 md:pl-12">
              <Image
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?q=80&w=1074&auto=format&fit=crop"
                alt="People at protest"
                width={1074}
                height={720}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
