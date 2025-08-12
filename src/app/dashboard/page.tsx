"use client";

import { TextbookContent } from "@/components/textbook-content";
import { TextbookGallery } from "@/components/textbook-gallery";
import { TextbookHeader } from "@/components/textbook-header";
import { TextbookSidebar } from "@/components/textbook-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  getAllTextbooks,
  getCurrentTextbook,
  Textbook
} from "@/lib/textbook-data";
import * as React from "react";

export default function DashboardPage() {
  const [currentTextbook, setCurrentTextbook] =
    React.useState<Textbook>(getCurrentTextbook());
  const [currentChapterId, setCurrentChapterId] = React.useState<string>(
    currentTextbook.chapters[0]?.id,
  );
  const [currentSectionId, setCurrentSectionId] = React.useState<string>(
    currentTextbook.chapters[0]?.sections[0]?.id,
  );
  const [galleryOpen, setGalleryOpen] = React.useState(false);
  const [textbooks] = React.useState<Textbook[]>(getAllTextbooks());

  const currentChapter = React.useMemo(
    () => currentTextbook.chapters.find((ch) => ch.id === currentChapterId),
    [currentTextbook, currentChapterId],
  );

  const currentSection = React.useMemo(
    () => currentChapter?.sections.find((s) => s.id === currentSectionId),
    [currentChapter, currentSectionId],
  );

  const handleSectionSelect = (chapterId: string, sectionId: string) => {
    setCurrentChapterId(chapterId);
    setCurrentSectionId(sectionId);
  };

  const handleTextbookSelect = (textbook: Textbook) => {
    setCurrentTextbook(textbook);
    setCurrentChapterId(textbook.chapters[0]?.id);
    setCurrentSectionId(textbook.chapters[0]?.sections[0]?.id);
  };

  const handleNavigatePrevious = () => {
    const allSections = currentTextbook.chapters.flatMap((ch) =>
      ch.sections.map((s) => ({ chapterId: ch.id, sectionId: s.id })),
    );
    const currentIndex = allSections.findIndex(
      (s) =>
        s.chapterId === currentChapterId && s.sectionId === currentSectionId,
    );
    if (currentIndex > 0) {
      const prev = allSections[currentIndex - 1];
      handleSectionSelect(prev.chapterId, prev.sectionId);
    }
  };

  const handleNavigateNext = () => {
    const allSections = currentTextbook.chapters.flatMap((ch) =>
      ch.sections.map((s) => ({ chapterId: ch.id, sectionId: s.id })),
    );
    const currentIndex = allSections.findIndex(
      (s) =>
        s.chapterId === currentChapterId && s.sectionId === currentSectionId,
    );
    if (currentIndex < allSections.length - 1) {
      const next = allSections[currentIndex + 1];
      handleSectionSelect(next.chapterId, next.sectionId);
    }
  };

  const handleMarkComplete = (sectionId: string) => {
    setCurrentTextbook((prev) => ({
      ...prev,
      chapters: prev.chapters.map((ch) => ({
        ...ch,
        sections: ch.sections.map((s) =>
          s.id === sectionId ? { ...s, completed: true } : s,
        ),
      })),
    }));
  };

  const hasPrevious = React.useMemo(() => {
    const allSections = currentTextbook.chapters.flatMap((ch) =>
      ch.sections.map((s) => ({ chapterId: ch.id, sectionId: s.id })),
    );
    const currentIndex = allSections.findIndex(
      (s) =>
        s.chapterId === currentChapterId && s.sectionId === currentSectionId,
    );
    return currentIndex > 0;
  }, [currentTextbook, currentChapterId, currentSectionId]);

  const hasNext = React.useMemo(() => {
    const allSections = currentTextbook.chapters.flatMap((ch) =>
      ch.sections.map((s) => ({ chapterId: ch.id, sectionId: s.id })),
    );
    const currentIndex = allSections.findIndex(
      (s) =>
        s.chapterId === currentChapterId && s.sectionId === currentSectionId,
    );
    return currentIndex < allSections.length - 1;
  }, [currentTextbook, currentChapterId, currentSectionId]);

  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 80)",
            "--header-height": "calc(var(--spacing) * 16)",
          } as React.CSSProperties
        }
      >
        <TextbookSidebar
          textbook={currentTextbook}
          currentSectionId={currentSectionId}
          onSectionSelect={handleSectionSelect}
          variant="inset"
        />
        <SidebarInset>
          <TextbookHeader
            currentTextbookTitle={currentTextbook.title}
            userName="Alex Johnson"
            userEmail="alex.johnson@university.edu"
            onGalleryOpen={() => setGalleryOpen(true)}
            onProfileClick={() => console.log("Profile clicked")}
            onPreferencesClick={() => console.log("Preferences clicked")}
            onLogout={() => console.log("Logout clicked")}
          />
          <div className="flex flex-1 flex-col">
            <TextbookContent
              chapter={currentChapter}
              section={currentSection}
              onNavigatePrevious={handleNavigatePrevious}
              onNavigateNext={handleNavigateNext}
              onMarkComplete={handleMarkComplete}
              hasPrevious={hasPrevious}
              hasNext={hasNext}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>

      <TextbookGallery
        open={galleryOpen}
        onOpenChange={setGalleryOpen}
        textbooks={textbooks}
        currentTextbookId={currentTextbook.id}
        onTextbookSelect={handleTextbookSelect}
      />
    </>
  );
}

