import { Crown, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Character {
    id: string;
    name: string;
    rarity: number;
    element: string;
    image: string;
    level: number;
    maxLevel: number;
    owned: boolean;
    duplicates?: number;
}

interface CharacterCardProps {
    character: Character;
    onClick?: () => void;
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
    const rarityColor = {
        1: "bg-gray-200 text-gray-800",
        2: "bg-green-200 text-green-800",
        3: "bg-blue-200 text-blue-800",
        4: "bg-purple-200 text-purple-800",
        5: "bg-yellow-200 text-yellow-800",
    };

    const elementColor = {
        Fire: "bg-red-100 text-red-800",
        Water: "bg-blue-100 text-blue-800",
        Earth: "bg-green-100 text-green-800",
        Air: "bg-cyan-100 text-cyan-800",
        Light: "bg-yellow-100 text-yellow-800",
        Dark: "bg-purple-100 text-purple-800",
    };

    return (
        <Card
            className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer group ${!character.owned ? "opacity-60 grayscale" : ""
                }`}
            onClick={onClick}
        >
            <div className="aspect-[3/4] relative">
                <img
                    src={character.image || "/placeholder-character.jpg"}
                    alt={character.name}
                    className="w-full h-full object-cover"
                />

                {/* Rarity Stars */}
                <div className="absolute top-2 left-2 flex space-x-1">
                    {Array.from({ length: character.rarity }).map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                </div>

                {/* Duplicate Count */}
                {character.duplicates && character.duplicates > 0 && (
                    <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
                        +{character.duplicates}
                    </Badge>
                )}

                {/* Level Badge */}
                <Badge variant="secondary" className="absolute bottom-2 left-2">
                    Lv. {character.level}
                </Badge>

                {/* Not Owned Overlay */}
                {!character.owned && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Not Owned</span>
                    </div>
                )}
            </div>

            <CardContent className="p-3">
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm truncate">{character.name}</h3>

                    <div className="flex items-center justify-between">
                        <Badge
                            variant="secondary"
                            className={`text-xs ${elementColor[character.element as keyof typeof elementColor] || elementColor.Light}`}
                        >
                            {character.element}
                        </Badge>

                        <div className="flex items-center space-x-1">
                            {character.rarity >= 4 && (
                                <Crown className="h-3 w-3 text-yellow-500" />
                            )}
                            {character.rarity === 5 && (
                                <Zap className="h-3 w-3 text-purple-500" />
                            )}
                        </div>
                    </div>

                    {character.owned && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Progress</span>
                                <span>
                                    {character.level}/{character.maxLevel}
                                </span>
                            </div>
                            <Progress
                                value={(character.level / character.maxLevel) * 100}
                                className="h-1"
                            />
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
