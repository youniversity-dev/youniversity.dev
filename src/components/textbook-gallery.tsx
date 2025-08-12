"use client";

import * as React from "react";
import { 
  IconBook,
  IconClock,
  IconProgress,
  IconSearch,
  IconX
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textbook } from "@/lib/textbook-data";
import { cn } from "@/lib/utils";

interface TextbookGalleryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  textbooks: Textbook[];
  currentTextbookId?: string;
  onTextbookSelect: (textbook: Textbook) => void;
}

export function TextbookGallery({
  open,
  onOpenChange,
  textbooks,
  currentTextbookId,
  onTextbookSelect,
}: TextbookGalleryProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  
  const filteredTextbooks = textbooks.filter((textbook) =>
    textbook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    textbook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    textbook.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTextbookSelect = (textbook: Textbook) => {
    onTextbookSelect(textbook);
    onOpenChange(false);
  };

  const formatLastAccessed = (date?: Date) => {
    if (!date) return "Never accessed";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Textbook Library</DialogTitle>
          <DialogDescription>
            Browse and select from your available textbooks
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4">
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search textbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                <IconX className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <ScrollArea className="flex-1 px-6">
          <div className="grid gap-4 pb-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTextbooks.map((textbook) => (
              <Card
                key={textbook.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-lg",
                  currentTextbookId === textbook.id && "ring-2 ring-primary"
                )}
                onClick={() => handleTextbookSelect(textbook)}
              >
                <CardContent className="p-4">
                  <div className="aspect-[3/4] relative mb-4 overflow-hidden rounded-md bg-muted">
                    {textbook.coverImage ? (
                      <img
                        src={textbook.coverImage}
                        alt={textbook.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <IconBook className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    {currentTextbookId === textbook.id && (
                      <Badge className="absolute right-2 top-2">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold line-clamp-2">
                      {textbook.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {textbook.author}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {textbook.description}
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <IconProgress className="h-4 w-4" />
                        <span>Progress</span>
                      </div>
                      <span className="font-medium">
                        {textbook.totalProgress || 0}%
                      </span>
                    </div>
                    <Progress value={textbook.totalProgress || 0} className="h-2" />
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <IconClock className="h-3 w-3" />
                      <span>{formatLastAccessed(textbook.lastAccessed)}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredTextbooks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <IconBook className="mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-lg font-medium">No textbooks found</p>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search query
              </p>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}