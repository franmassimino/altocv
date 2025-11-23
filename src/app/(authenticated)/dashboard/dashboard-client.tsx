"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Edit, Settings, Share2, Sparkles, Target, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PersonalDataModal } from '@/components/modals/personal-data-modal';
import { FloatingButton } from '@/components/floating-button';
import { AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface CV {
  id: string;
  title: string;
  templateId: string;
  atsScore: number | null;
  lastAnalyzedAt: Date | null;
  updatedAt: Date;
  createdAt: Date;
}

interface DashboardClientProps {
  user: {
    id: string;
    name?: string | null;
    email: string | null;
    image?: string | null;
    credits: number;
    tier: string;
  };
  cvs: CV[];
}

export function DashboardClient({ user, cvs }: DashboardClientProps) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if the modal was previously dismissed
    const dismissed = localStorage.getItem("personalDataModalDismissed");

    // Show the modal only if it hasn't been dismissed
    if (!dismissed) {
      setShowModal(true);
    }
  }, []);

  const handleDismissModal = () => {
    setShowModal(false);
  };

  // Template preview images mapping (you can add more templates)
  const templateImages: Record<string, string> = {
    'modern-professional': '/templates/modern-professional.png',
    'elegant-minimal': '/templates/elegant-minimal.png',
    'creative-bold': '/templates/creative-bold.png',
    'default': '/templates/default.png',
  };

  const getTemplateImage = (templateId: string) => {
    return templateImages[templateId] || templateImages['default'];
  };

  return (
    <>
      <PersonalDataModal
        open={showModal}
        onDismiss={handleDismissModal}
        userId={user.id}
      />

      {/* FLOATING BUTTON */}
      <AnimatePresence>
        {!showModal && (
          <FloatingButton
            onClick={() => {
              setShowModal(true);
              localStorage.removeItem("personalDataModalDismissed");
            }}
          />
        )}
      </AnimatePresence>

      <div>
        {/* User Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back {user.name || 'User'}!
          </h1>
          <p className="text-muted-foreground">Ready to create a masterpiece?</p>
        </div>

        {/* CVs Grid or Empty State */}
        {cvs.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="mx-auto">
              <div className="flex justify-center mb-4">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl mb-2 font-bold">Your CVs workspace is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start by creating a new CV or previewing a template.
              </p>
              <div className="flex gap-3 justify-center mt-4">
                <Button size="lg">Create New CV</Button>
                <Link href="/cv-preview">
                  <Button size="lg" variant="secondary">
                    View Templates
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your CVs</h2>
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Create New CV
              </Button>
            </div>

            <div className="flex  gap-6">
              {cvs.map((cv) => (
                <Link key={cv.id} href={`/editor/${cv.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg hover:bg-card/90 transition-all duration-200 cursor-pointer w-[350px]">
                    {/* CV Preview Image */}
                    <div className="relative h-48 bg-sidebar flex items-center justify-center overflow-hidden">
                      <Image
                        src="/cv-preview.png"
                        alt={cv.title}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute top-3 right-3">
                        {cv.atsScore && (
                          <div className="bg-green-500/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            ATS: {cv.atsScore}%
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CV Details */}
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2 truncate">{cv.title}</h3>
                      <div className="text-sm text-muted-foreground mb-4 gap-4">
                        <p><b>Template:</b> {cv.templateId}</p>
                        <p>
                          <b>Updated:{' '}</b>
                          {formatDistanceToNow(new Date(cv.updatedAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          size="lg"
                          variant="destructive"
                          onClick={(e) => {
                            e.preventDefault();
                            window.location.href = `/editor/${cv.id}`;
                          }}
                        >
                          <Edit className="w-4 h-4 " />
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10"
                          onClick={(e) => {
                            e.preventDefault();
                            // Settings action
                          }}
                        >
                          <Settings className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-10"
                          onClick={(e) => {
                            e.preventDefault();
                            // Share action
                          }}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ATS Analyzer Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">AI-Powered Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ATS Analyzer Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 group-hover:from-primary/15 group-hover:to-primary/20 transition-all duration-300" />
                <Sparkles className="w-16 h-16 text-primary relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-3">AI-Powered ATS Analyzer</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Optimize your resume to pass Applicant Tracking Systems (ATS).
                  Our AI analyzer provides personalized recommendations to
                  improve your score and increase your chances of getting selected.
                </p>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Instant analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">AI recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-muted-foreground">Improve your score</span>
                  </div>
                </div>

                <Button className="w-full group mt-auto" size="lg">
                  <span>Analyze My Resume</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>

            {/* Job Match Card */}
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
              <div className="relative h-48 bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-accent/20 group-hover:from-accent/25 group-hover:to-accent/35 transition-all duration-300" />
                <Target className="w-16 h-16 text-accent-foreground relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl mb-3">Job Offer Matcher</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Upload a job description and discover how compatible you are.
                  Get a detailed match analysis and specific tips to
                  tailor your resume for each position.
                </p>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                    <span className="text-muted-foreground">Match percentage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                    <span className="text-muted-foreground">Skill gaps</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                    <span className="text-muted-foreground">Optimize resume</span>
                  </div>
                </div>

                <Button className="w-full group mt-auto" size="lg" variant="default">
                  <span>Calculate Match</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}