"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TextbookChapter, TextbookSection } from "@/lib/textbook-data";
import { cn } from "@/lib/utils";
import {
  IconArrowLeft,
  IconArrowRight,
  IconBookmark,
  IconBookmarkFilled,
  IconCheck
} from "@tabler/icons-react";
import * as React from "react";

interface TextbookContentProps {
  chapter?: TextbookChapter;
  section?: TextbookSection;
  onNavigatePrevious?: () => void;
  onNavigateNext?: () => void;
  onMarkComplete?: (sectionId: string) => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function TextbookContent({
  chapter,
  section,
  onNavigatePrevious,
  onNavigateNext,
  onMarkComplete,
  hasNext = true,
  hasPrevious = true,
}: TextbookContentProps) {
  const [isBookmarked, setIsBookmarked] = React.useState(false);
  const [fontSize, setFontSize] = React.useState("base");

  if (!chapter || !section) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <IconBookmark className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No Section Selected</h3>
            <p className="text-sm text-muted-foreground">
              Select a section from the table of contents to begin reading
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const fontSizeClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{chapter.title}</p>
              <h1 className="text-xl font-semibold">{section.title}</h1>
            </div>
            {section.duration && (
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {section.duration}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              {isBookmarked ? (
                <IconBookmarkFilled className="h-4 w-4" />
              ) : (
                <IconBookmark className="h-4 w-4" />
              )}
            </Button>

            <div className="hidden items-center gap-1 sm:flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize("sm")}
                className={cn(fontSize === "sm" && "bg-accent")}
              >
                A
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize("base")}
                className={cn(fontSize === "base" && "bg-accent")}
              >
                A
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFontSize("lg")}
                className={cn(fontSize === "lg" && "bg-accent", "text-lg")}
              >
                A
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl px-6 py-8">
          <div
            className={cn(
              "prose prose-gray dark:prose-invert max-w-none",
              fontSizeClasses[fontSize as keyof typeof fontSizeClasses],
            )}
          >
            <p className="lead">{section.content}</p>

            <h2>Introduction</h2>
            <p>
              This section covers the fundamental concepts that will form the
              foundation for your understanding of the subject matter. Pay close
              attention to the definitions and examples provided, as they will
              be referenced throughout the course.
            </p>

            <h3>Key Concepts</h3>
            <ul>
              <li>Understanding the basic principles and their applications</li>
              <li>
                Recognizing patterns and relationships between different
                elements
              </li>
              <li>
                Developing problem-solving strategies for complex scenarios
              </li>
              <li>Building a strong foundation for advanced topics</li>
            </ul>

            <h3>Learning Objectives</h3>
            <p>By the end of this section, you should be able to:</p>
            <ol>
              <li>Define and explain the core concepts introduced</li>
              <li>Apply these concepts to solve practical problems</li>
              <li>
                Identify connections between this material and previous topics
              </li>
              <li>Prepare for more advanced material in upcoming sections</li>
            </ol>

            <Card className="my-6">
              <CardContent className="p-4">
                <h4 className="mb-2 font-semibold">Example Problem</h4>
                <p className="text-sm text-muted-foreground">
                  Consider the following scenario and apply the concepts learned
                  in this section to find a solution...
                </p>
              </CardContent>
            </Card>

            <h3>Practice Exercises</h3>
            <p>
              Complete the following exercises to reinforce your understanding
              of the material. Solutions and detailed explanations are available
              in the appendix.
            </p>

            <div className="mt-8 rounded-lg bg-muted/50 p-4">
              <h4 className="mb-2 font-semibold">Summary</h4>
              <p className="text-sm">
                This section introduced the fundamental concepts necessary for
                understanding the broader topic. Remember to review the key
                points and complete the practice exercises before moving on to
                the next section.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-background">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onNavigatePrevious}
              disabled={!hasPrevious}
              className="gap-2"
            >
              <IconArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-4">
              {section.completed ? (
                <Badge variant="default" className="gap-1">
                  <IconCheck className="h-3 w-3" />
                  Completed
                </Badge>
              ) : (
                <Button
                  variant="default"
                  onClick={() => onMarkComplete?.(section.id)}
                  className="gap-2"
                >
                  <IconCheck className="h-4 w-4" />
                  Mark as Complete
                </Button>
              )}
            </div>

            <Button
              variant="outline"
              onClick={onNavigateNext}
              disabled={!hasNext}
              className="gap-2"
            >
              Next
              <IconArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

