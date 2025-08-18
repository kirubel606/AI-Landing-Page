"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/Card"
import { Badge } from "./ui/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar"
import { Mail, Phone, ChevronDown, ChevronRight } from "lucide-react"

function UnitCard({ unit, depth = 0 }) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [showTooltip, setShowTooltip] = useState(false)

  const hasChildren = unit.children && unit.children.length > 0
  const indentLevel = depth * 2

  // Color scheme based on depth
  const getCardColors = (depth) => {
    const colors = [
      "from-orange-500 to-[#003366]",
      "from-[#003366] to-[#003366]",
      "from-orange-700 to-orange-700",
      "from-orange-500 to-orange-600",
    ]
    return colors[depth % colors.length]
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className={`ml-${indentLevel}`}>
      <div className="relative mb-4">
        <Card
          className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-0 overflow-hidden"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className={`h-2 bg-gradient-to-r ${getCardColors(depth)}`} />

          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {hasChildren && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                  )}

                  <h3 className="text-xl font-semibold text-gray-900">{unit.name}</h3>

                  <Badge variant="secondary" className="text-xs">
                    Level {unit.level}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-3">{unit.description}</p>

                {unit.in_charge && (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={unit.in_charge.photo || undefined} />
                      {!unit.in_charge.photo && (
                      <AvatarFallback className="text-xs bg-gray-200">
                      {getInitials(unit.in_charge.name)}
                    </AvatarFallback>
                      )}

                    </Avatar>

                    <div>
                      <p className="font-medium text-gray-900 text-sm">{unit.in_charge.name}</p>
                      <p className="text-xs text-gray-500">{unit.in_charge.position}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tooltip */}
        {showTooltip && unit.in_charge && (
          <div className="absolute top-0 left-0 ml-4 z-10 w-80 bg-white rounded-lg shadow-xl border p-4 animate-in fade-in-0 zoom-in-95">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
              <AvatarImage src={unit.in_charge.photo || undefined} />
                      {!unit.in_charge.photo && (
                      <AvatarFallback className="text-xs bg-gray-200">
                      {getInitials(unit.in_charge.name)}
                    </AvatarFallback>
                      )}
              </Avatar>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{unit.in_charge.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{unit.in_charge.position}</p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${unit.in_charge.email}`} className="hover:text-[#003366] transition-colors">
                      {unit.in_charge.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{unit.in_charge.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t">
              <p className="text-xs text-gray-500">Department: {unit.name}</p>
            </div>
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-8 border-l-2 border-gray-200 pl-6">
          {unit.children.map((child) => (
            <UnitCard key={child.id} unit={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export function OrganizationalChart({ data }) {
  return (
    <div className="space-y-6 mx-5">
      {data.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  )
}
