"use client";

import { Coins, Gem, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function GachaPullSimulator() {
    const [currency, setCurrency] = useState({ coins: 12450, gems: 89 });
    const [isAnimating, setIsAnimating] = useState(false);
    const [lastPull, setLastPull] = useState<any>(null);

    const pullRates = [
        { rarity: 5, rate: 0.5, color: "from-yellow-400 to-orange-500" },
        { rarity: 4, rate: 4.5, color: "from-purple-400 to-purple-600" },
        { rarity: 3, rate: 25, color: "from-blue-400 to-blue-600" },
        { rarity: 2, rate: 40, color: "from-green-400 to-green-600" },
        { rarity: 1, rate: 30, color: "from-gray-400 to-gray-600" },
    ];

    const simulatePull = (pullType: "single" | "ten") => {
        const cost =
            pullType === "single" ? { coins: 0, gems: 1 } : { coins: 0, gems: 10 };

        if (currency.gems < cost.gems) {
            alert("Not enough gems!");
            return;
        }

        setIsAnimating(true);
        setCurrency((prev) => ({
            coins: prev.coins - cost.coins,
            gems: prev.gems - cost.gems,
        }));

        // Simulate pull result after animation
        setTimeout(() => {
            const random = Math.random() * 100;
            let cumulativeRate = 0;
            let pulledRarity = 1;

            for (const rate of pullRates) {
                cumulativeRate += rate.rate;
                if (random <= cumulativeRate) {
                    pulledRarity = rate.rarity;
                    break;
                }
            }

            const mockCharacters = [
                { name: "Aria", element: "Fire", image: "/placeholder-character.jpg" },
                { name: "Zephyr", element: "Air", image: "/placeholder-character.jpg" },
                {
                    name: "Terra",
                    element: "Earth",
                    image: "/placeholder-character.jpg",
                },
                { name: "Aqua", element: "Water", image: "/placeholder-character.jpg" },
                { name: "Luna", element: "Light", image: "/placeholder-character.jpg" },
                { name: "Void", element: "Dark", image: "/placeholder-character.jpg" },
            ];

            const randomChar =
                mockCharacters[Math.floor(Math.random() * mockCharacters.length)];

            setLastPull({
                ...randomChar,
                rarity: pulledRarity,
                isNew: Math.random() > 0.7,
            });

            setIsAnimating(false);
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        <span>Gacha Summon</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Currency Display */}
                    <div className="flex items-center justify-center space-x-4">
                        <Badge
                            variant="secondary"
                            className="flex items-center space-x-2 px-4 py-2"
                        >
                            <Coins className="h-4 w-4" />
                            <span className="font-semibold">
                                {currency.coins.toLocaleString()}
                            </span>
                        </Badge>
                        <Badge
                            variant="outline"
                            className="flex items-center space-x-2 px-4 py-2"
                        >
                            <Gem className="h-4 w-4" />
                            <span className="font-semibold">{currency.gems}</span>
                        </Badge>
                    </div>

                    {/* Pull Animation Area */}
                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-8 text-center min-h-[300px] flex items-center justify-center">
                        {isAnimating ? (
                            <div className="space-y-4">
                                <div className="w-16 h-16 mx-auto">
                                    <div className="w-full h-full bg-linear-to-r from-purple-500 to-pink-500 rounded-full animate-spin">
                                        <Sparkles className="w-8 h-8 text-white m-4" />
                                    </div>
                                </div>
                                <p className="text-lg font-semibold animate-pulse">
                                    Summoning...
                                </p>
                            </div>
                        ) : lastPull ? (
                            <div className="space-y-4">
                                <div className="relative">
                                    <div className="w-32 h-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-auto">
                                        <img
                                            src={lastPull.image}
                                            alt={lastPull.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 left-2 flex space-x-1">
                                            {Array.from({ length: lastPull.rarity }).map((_, i) => (
                                                <Star
                                                    key={`star-${i}`}
                                                    className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {lastPull.isNew && (
                                        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white">
                                            NEW!
                                        </Badge>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold">{lastPull.name}</h3>
                                    <Badge variant="secondary">{lastPull.element}</Badge>
                                    <p className="text-sm text-muted-foreground">
                                        {lastPull.rarity}★ Character
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Gem className="w-16 h-16 mx-auto text-purple-500" />
                                <p className="text-lg text-muted-foreground">
                                    Ready to summon!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pull Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button
                            onClick={() => simulatePull("single")}
                            disabled={isAnimating || currency.gems < 1}
                            className="h-12 text-lg"
                            variant="outline"
                        >
                            <Gem className="w-4 h-4 mr-2" />
                            Single Pull (1 💎)
                        </Button>
                        <Button
                            onClick={() => simulatePull("ten")}
                            disabled={isAnimating || currency.gems < 10}
                            className="h-12 text-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                            <Sparkles className="w-4 h-4 mr-2" />
                            10-Pull (10 💎)
                        </Button>
                    </div>

                    {/* Pull Rates */}
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">
                            Drop Rates
                        </h4>
                        <div className="grid grid-cols-5 gap-2">
                            {pullRates.map((rate) => (
                                <div key={rate.rarity} className="text-center">
                                    <div className="flex justify-center mb-1">
                                        {Array.from({ length: rate.rarity }).map((_, i) => (
                                            <Star
                                                key={`rate-star-${rate.rarity}-${i}`}
                                                className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground">{rate.rate}%</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
