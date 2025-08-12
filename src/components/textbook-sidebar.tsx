"use client";

import * as React from "react";
import { 
  IconBook,
  IconCheck,
  IconChevronRight,
  IconClock
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Textbook, TextbookChapter } from "@/lib/textbook-data";

interface TextbookSidebarProps extends React.ComponentProps<typeof Sidebar> {
  textbook: Textbook;
  currentSectionId?: string;
  onSectionSelect?: (chapterId: string, sectionId: string) => void;
}

export function TextbookSidebar({ 
  textbook, 
  currentSectionId,
  onSectionSelect,
  ...props 
}: TextbookSidebarProps) {
  const [openChapters, setOpenChapters] = React.useState<string[]>([textbook.chapters[0]?.id]);

  const toggleChapter = (chapterId: string) => {
    setOpenChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const calculateChapterProgress = (chapter: TextbookChapter): number => {
    if (!chapter.sections.length) return 0;
    const completed = chapter.sections.filter(s => s.completed).length;
    return Math.round((completed / chapter.sections.length) * 100);
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto py-3">
              <IconBook className="!size-5" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-sm font-semibold line-clamp-1">
                  {textbook.title}
                </span>
                <span className="text-xs text-muted-foreground">
                  {textbook.author}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-3 pb-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span>Overall Progress</span>
            <span>{textbook.totalProgress || 0}%</span>
          </div>
          <Progress value={textbook.totalProgress || 0} className="h-2" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Table of Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {textbook.chapters.map((chapter) => {
                const chapterProgress = calculateChapterProgress(chapter);
                const isOpen = openChapters.includes(chapter.id);
                
                return (
                  <Collapsible 
                    key={chapter.id} 
                    open={isOpen}
                    onOpenChange={() => toggleChapter(chapter.id)}
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <IconChevronRight 
                            className={cn(
                              "!size-4 transition-transform",
                              isOpen && "rotate-90"
                            )} 
                          />
                          <div className="flex flex-1 items-center justify-between">
                            <span className="text-sm">{chapter.title}</span>
                            {chapterProgress > 0 && (
                              <Badge 
                                variant={chapterProgress === 100 ? "default" : "secondary"}
                                className="ml-2 h-5 px-1.5 text-[10px]"
                              >
                                {chapterProgress}%
                              </Badge>
                            )}
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {chapter.sections.map((section) => (
                            <SidebarMenuSubItem key={section.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={currentSectionId === section.id}
                                onClick={() => onSectionSelect?.(chapter.id, section.id)}
                                className="cursor-pointer"
                              >
                                <div className="flex items-start gap-2 py-2">
                                  <div className="mt-0.5">
                                    {section.completed ? (
                                      <IconCheck className="!size-4 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <div className="!size-4 rounded-full border-2 border-muted-foreground/30" />
                                    )}
                                  </div>
                                  <div className="flex-1 space-y-1">
                                    <div className="text-sm leading-none">
                                      {section.title}
                                    </div>
                                    {section.duration && (
                                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <IconClock className="!size-3" />
                                        <span>{section.duration}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}