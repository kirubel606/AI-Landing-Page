"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Mail, Phone, Brain, Network, Zap } from "lucide-react"
import { Card, CardContent } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"

const TreeNode = ({ unit, isRoot = false, isLast = false, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)
  const hasChildren = unit.children && unit.children.length > 0
  const isDirector = unit.in_charge?.position.includes("Director General")

  const getNodeIcon = () => {
    if (isDirector) return <Brain className="w-4 h-4" />
    if (unit.level === 1) return <Network className="w-4 h-4" />
    return <Zap className="w-3 h-3" />
  }

  return (
    <div className="relative bg-white">
      {!isRoot && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div
            className="w-0.5 h-12 animate-pulse"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #f7941d 20%, #0b0d44 50%, #f7941d 80%, transparent 100%)",
              boxShadow: "0 0 8px rgba(247, 148, 29, 0.4)",
              animation: "pulse 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      )}

      {/* Main node */}
      <div className="flex flex-col items-center mb-16">
        <div className="relative">
          <Card
            className={`relative transition-all duration-300 cursor-pointer w-48 bg-white border hover:scale-105 hover:-translate-y-1 ${
              isDirector
                ? "border-2 border-[#0b0d44]/30 shadow-lg hover:shadow-xl hover:shadow-[#F7941D]/20 hover:border-[#F7941D]/50"
                : "border-[#0b0d44]/20 hover:shadow-lg hover:shadow-[#F7941D]/20 hover:border-[#F7941D]/60"
            }`}
            style={{
              boxShadow: isDirector ? "0 0 20px rgba(11, 13, 68, 0.3)" : "0 0 20px rgba(11, 13, 68, 0.1)",
            }}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <CardContent className="p-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <div
                    className={`p-2 rounded-full mr-2 ${isDirector ? "bg-[#0b0d44]/20 text-[#0b0d44]" : "bg-[#0b0d44]/10 text-[#0b0d44]"}`}
                  >
                    {getNodeIcon()}
                  </div>
                  <h3 className={`font-bold ${isDirector ? "text-sm" : "text-xs"} text-foreground leading-tight`}>
                    {unit.name}
                  </h3>
                </div>


                {unit.in_charge && (
                  <div className="flex flex-col items-center">
                    <Avatar className={`border-2 border-[#0b0d44]/30 ${isDirector ? "w-12 h-12" : "w-10 h-10"} mb-2`}>
                      <AvatarImage src={unit.in_charge.photo || undefined} />
                      {!unit.in_charge.photo && (
                        <AvatarFallback className="bg-[#0b0d44]/10 text-[#0b0d44] font-semibold text-xs">
                        {unit.in_charge.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}

                    </Avatar>
                    <p className="text-xs font-medium text-[#0b0d44] text-center leading-tight">
                      {unit.in_charge.name}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {showTooltip && unit.in_charge && (
            <div className="absolute z-50 left-1/2 transform -translate-x-1/2 top-full mt-2 w-72 bg-white/95 backdrop-blur-sm border border-[#0b0d44]/30 rounded-lg shadow-xl p-4">
              <div className="text-center mb-3">
                <h4 className="font-semibold text-foreground text-sm mb-1">{unit.name}</h4>
                <p className="text-xs text-muted-foreground mb-2">{unit.description}</p>
              </div>

              <div className="bg-[#0b0d44]/5 rounded-lg p-3 border border-[#0b0d44]/20">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="w-10 h-10 border-2 border-[#0b0d44]/30">
                    <AvatarImage src={unit.in_charge.photo || undefined} />
                    {!unit.in_charge.photo && (
                    <AvatarFallback className="bg-[#0b0d44]/10 text-[#0b0d44] font-semibold text-xs">
                    {unit.in_charge.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                    )}

                  </Avatar>
                  <div>
                    <h5 className="font-semibold text-foreground text-sm">{unit.in_charge.name}</h5>
                    <p className="text-[#0b0d44] font-medium text-xs">{unit.in_charge.position}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <a
                    href={`mailto:${unit.in_charge.email}`}
                    className="flex items-center space-x-2 text-[#0b0d44] hover:text-[#F7941D] transition-colors p-2 rounded bg-[#0b0d44]/5 hover:bg-[#F7941D]/10 text-xs"
                  >
                    <Mail className="w-3 h-3" />
                    <span>{unit.in_charge.email}</span>
                  </a>
                  <a
                    href={`tel:${unit.in_charge.phone}`}
                    className="flex items-center space-x-2 text-[#0b0d44] hover:text-[#F7941D] transition-colors p-2 rounded bg-[#0b0d44]/5 hover:bg-[#F7941D]/10 text-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>{unit.in_charge.phone}</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 p-2 rounded-full bg-[#0b0d44]/10 hover:bg-[#F7941D]/20 border border-[#0b0d44]/30 transition-all duration-300 hover:scale-110"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-[#0b0d44]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-[#0b0d44]" />
            )}
          </button>
        )}
      </div>

      {/* Children nodes */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {unit.children.length > 1 && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8">
              <div
                className="h-0.5 animate-pulse"
                style={{
                  width: `${(unit.children.length - 1) * 400}px`,
                  background:
                    "linear-gradient(90deg, transparent 0%, #f7941d 20%, #0b0d44 50%, #f7941d 80%, transparent 100%)",
                  boxShadow: "0 0 8px rgba(247, 148, 29, 0.4)",
                  animation: "pulse 2s ease-in-out infinite",
                }}
              ></div>
            </div>
          )}

          <div
            className={`grid gap-6 ${unit.children.length === 1 ? "grid-cols-1 justify-items-center" : unit.children.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
          >
            {unit.children.map((child, index) => (
              <div key={child.id} className="relative">
                {unit.children.length > 1 && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-0.5 h-8 animate-pulse"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent 0%, #f7941d 20%, #0b0d44 50%, #f7941d 80%, transparent 100%)",
                        boxShadow: "0 0 8px rgba(247, 148, 29, 0.4)",
                        animation: "pulse 2s ease-in-out infinite",
                      }}
                    ></div>
                  </div>
                )}
                <TreeNode unit={child} isLast={index === unit.children.length - 1} depth={depth + 1} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export const AIOrganizationalChart = ({ data }) => {
  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-white">
      <div className="space-y-16">
        {data.map((unit) => (
          <TreeNode key={unit.id} unit={unit} isRoot={true} />
        ))}
      </div>
    </div>
  )
}
