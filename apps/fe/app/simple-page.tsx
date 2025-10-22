"use client";

import { Gem, Package, Star, Trophy, User } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("collection");

    return (
        <div className="min-h-screen bg-background p-8">
            <header className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Gem className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold">GachaVault</h1>
                </div>
                <p className="text-lg text-muted-foreground">
                    Manage your collection, pull new characters, and climb the
                    leaderboards!
                </p>
            </header>

            <nav className="mb-8">
                <div className="flex space-x-4">
                    <Button
                        variant={activeTab === "collection" ? "default" : "outline"}
                        onClick={() => setActiveTab("collection")}
                        className="flex items-center space-x-2"
                    >
                        <Package className="h-4 w-4" />
                        <span>Collection</span>
                    </Button>
                    <Button
                        variant={activeTab === "pulls" ? "default" : "outline"}
                        onClick={() => setActiveTab("pulls")}
                        className="flex items-center space-x-2"
                    >
                        <Gem className="h-4 w-4" />
                        <span>Pulls</span>
                    </Button>
                    <Button
                        variant={activeTab === "leaderboards" ? "default" : "outline"}
                        onClick={() => setActiveTab("leaderboards")}
                        className="flex items-center space-x-2"
                    >
                        <Trophy className="h-4 w-4" />
                        <span>Leaderboards</span>
                    </Button>
                    <Button
                        variant={activeTab === "profile" ? "default" : "outline"}
                        onClick={() => setActiveTab("profile")}
                        className="flex items-center space-x-2"
                    >
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                    </Button>
                </div>
            </nav>

            <main>
                {activeTab === "collection" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Collection Rate
                                            </p>
                                            <p className="text-3xl font-bold">75.5%</p>
                                        </div>
                                        <Package className="h-10 w-10 text-blue-500" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Characters Owned
                                            </p>
                                            <p className="text-3xl font-bold">156/206</p>
                                        </div>
                                        <Star className="h-10 w-10 text-yellow-500" />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground">
                                                Power Score
                                            </p>
                                            <p className="text-3xl font-bold">98,750</p>
                                        </div>
                                        <Trophy className="h-10 w-10 text-green-500" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Card
                                    key={i}
                                    className="group cursor-pointer hover:shadow-lg transition-all"
                                >
                                    <CardContent className="p-0">
                                        <div className="aspect-3/4 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 relative rounded-t-lg">
                                            <div className="absolute top-2 left-2 flex space-x-1">
                                                {Array.from({ length: 5 }).map((_, j) => (
                                                    <Star
                                                        key={j}
                                                        className="h-3 w-3 fill-yellow-400 text-yellow-400"
                                                    />
                                                ))}
                                            </div>
                                            <div className="absolute bottom-2 left-2">
                                                <Badge variant="secondary">Lv. 80</Badge>
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm">Character {i}</h3>
                                            <Badge variant="outline" className="mt-1 text-xs">
                                                Fire
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === "pulls" && (
                    <div className="max-w-2xl mx-auto space-y-6">
                        <Card>
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="space-y-4">
                                    <h2 className="text-2xl font-bold">Gacha Summon</h2>
                                    <div className="flex justify-center space-x-4">
                                        <Badge variant="secondary" className="px-4 py-2">
                                            <Gem className="h-4 w-4 mr-2" />
                                            89 Gems
                                        </Badge>
                                    </div>
                                </div>

                                <div className="bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-12">
                                    <Gem className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                                    <p className="text-lg text-muted-foreground">
                                        Ready to summon!
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button className="h-12 text-lg" variant="outline">
                                        <Gem className="w-4 h-4 mr-2" />
                                        Single Pull (1 💎)
                                    </Button>
                                    <Button className="h-12 text-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                        10-Pull (10 💎)
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "leaderboards" && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {[
                                { label: "Current Rank", value: "#156" },
                                { label: "Season Score", value: "98,750" },
                                { label: "Percentile", value: "99.7%" },
                                { label: "Total Players", value: "48,392" },
                            ].map((stat, i) => (
                                <Card key={i}>
                                    <CardContent className="p-6 text-center">
                                        <p className="text-sm text-muted-foreground">
                                            {stat.label}
                                        </p>
                                        <p className="text-3xl font-bold">{stat.value}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between p-4 border-b last:border-0"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <span className="text-lg font-bold">#{i}</span>
                                            <div className="w-10 h-10 bg-linear-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                                                P{i}
                                            </div>
                                            <span className="font-semibold">Player {i}</span>
                                        </div>
                                        <span className="font-bold">
                                            {(100000 - i * 1000).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                )}

                {activeTab === "profile" && (
                    <div className="max-w-2xl mx-auto">
                        <Card>
                            <CardContent className="p-8 text-center space-y-6">
                                <div className="w-24 h-24 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto">
                                    JD
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">John Doe</h2>
                                    <p className="text-muted-foreground">
                                        Player since January 2024
                                    </p>
                                    <Badge variant="secondary" className="mt-2">
                                        Level 42
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-lg bg-accent/10">
                                        <p className="text-2xl font-bold">156</p>
                                        <p className="text-sm text-muted-foreground">Global Rank</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-accent/10">
                                        <p className="text-2xl font-bold">2,847</p>
                                        <p className="text-sm text-muted-foreground">Total Pulls</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </main>
        </div>
    );
}
