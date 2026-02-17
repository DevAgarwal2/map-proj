"use client";

import { Agent } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageSquare, Users, Sparkles, ArrowUpRight } from "lucide-react";

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  featured?: boolean;
}

export function AgentCard({ agent, onSelect, featured }: AgentCardProps) {
  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border ${
        featured 
          ? "border-primary/30 bg-gradient-to-br from-primary/5 to-transparent" 
          : "hover:border-primary/20"
      }`}
      onClick={() => onSelect(agent)}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="gap-1 bg-primary/10 text-primary border-0">
            <Sparkles className="h-3 w-3" />
            Featured
          </Badge>
        </div>
      )}

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <Avatar className={`${featured ? "h-14 w-14" : "h-12 w-12"} shrink-0`}>
            <AvatarFallback className={`font-semibold text-base ${
              featured 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted"
            }`}>
              {agent.avatar}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base leading-tight mb-1 truncate">
              {agent.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{agent.category}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span>{agent.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.tags.slice(0, 4).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-[11px] font-normal px-2 py-0.5 bg-muted"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{agent.usageCount.toLocaleString()} users</span>
          </div>
          
          <Button 
            size="sm" 
            className={`gap-1.5 ${featured ? "" : "opacity-0 group-hover:opacity-100 transition-opacity"}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(agent);
            }}
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Chat
            <ArrowUpRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
