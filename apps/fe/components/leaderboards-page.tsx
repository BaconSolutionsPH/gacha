import { Crown, Medal, Star, TrendingUp, Trophy, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface LeaderboardEntry {
    rank: number;
    username: string;
    avatar: string;
    score: number;
    change: number;
    badge?: string;
}

interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ComponentType<any>;
    trend?: number;
}

function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-3xl font-bold">{value}</p>
                        {trend !== undefined && (
                            <p
                                className={`text-sm flex items-center mt-1 ${trend >= 0 ? "text-green-600" : "text-red-600"
                                    }`}
                            >
                                <TrendingUp className="w-3 h-3 mr-1" />
                                {trend > 0 ? "+" : ""}
                                {trend}%
                            </p>
                        )}
                    </div>
                    <Icon className="h-8 w-8 text-muted-foreground" />
                </div>
            </CardContent>
        </Card>
    );
}

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
    const getRankIcon = (rank: number) => {
        switch (rank) {
            case 1:
                return <Crown className="w-5 h-5 text-yellow-500" />;
            case 2:
                return <Medal className="w-5 h-5 text-gray-400" />;
            case 3:
                return <Medal className="w-5 h-5 text-orange-500" />;
            default:
                return (
                    <span className="text-lg font-bold text-muted-foreground">
                        #{rank}
                    </span>
                );
        }
    };

    return (
        <div className="flex items-center justify-between p-4 border-b border-border last:border-0">
            <div className="flex items-center space-x-4">
                <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold text-sm">
                    {entry.username.substring(0, 2).toUpperCase()}
                </div>

                <div className="flex flex-col">
                    <span className="font-semibold">{entry.username}</span>
                    {entry.badge && (
                        <Badge variant="secondary" className="w-fit text-xs">
                            {entry.badge}
                        </Badge>
                    )}
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-bold">{entry.score.toLocaleString()}</p>
                    <p
                        className={`text-sm ${entry.change >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                    >
                        {entry.change > 0 ? "+" : ""}
                        {entry.change}
                    </p>
                </div>
            </div>
        </div>
    );
}

export function LeaderboardsPage() {
    const mockLeaderboard: LeaderboardEntry[] = [
        {
            rank: 1,
            username: "DragonSlayer99",
            avatar: "",
            score: 158420,
            change: 12,
            badge: "Legend",
        },
        {
            rank: 2,
            username: "MysticMage",
            avatar: "",
            score: 145380,
            change: -3,
            badge: "Master",
        },
        { rank: 3, username: "ShadowHunter", avatar: "", score: 132950, change: 8 },
        {
            rank: 4,
            username: "ElementalKing",
            avatar: "",
            score: 128740,
            change: 5,
        },
        { rank: 5, username: "VoidWalker", avatar: "", score: 125630, change: -1 },
        {
            rank: 6,
            username: "CrystalGuardian",
            avatar: "",
            score: 122480,
            change: 15,
        },
        { rank: 7, username: "StormBreaker", avatar: "", score: 119350, change: 2 },
        {
            rank: 8,
            username: "PhoenixRising",
            avatar: "",
            score: 116220,
            change: -5,
        },
    ];

    const playerStats = {
        currentRank: 156,
        totalPlayers: 48392,
        percentile: 99.7,
        seasonScore: 98750,
    };

    return (
        <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Current Rank"
                    value={`#${playerStats.currentRank}`}
                    icon={Trophy}
                    trend={5}
                />
                <StatsCard
                    title="Season Score"
                    value={playerStats.seasonScore.toLocaleString()}
                    icon={Star}
                    trend={12}
                />
                <StatsCard
                    title="Percentile"
                    value={`${playerStats.percentile}%`}
                    icon={TrendingUp}
                />
                <StatsCard
                    title="Total Players"
                    value={playerStats.totalPlayers.toLocaleString()}
                    icon={Users}
                />
            </div>

            {/* Player Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                            <span>Rank #{playerStats.currentRank}</span>
                            <span>Next Rank: #{playerStats.currentRank - 1}</span>
                        </div>
                        <Progress value={75} className="h-3" />
                        <p className="text-sm text-muted-foreground">
                            You need 2,580 more points to reach rank #
                            {playerStats.currentRank - 1}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                        <Trophy className="w-5 h-5 text-yellow-500" />
                        <span>Global Leaderboard</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                            Weekly
                        </Button>
                        <Button variant="default" size="sm">
                            All Time
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {mockLeaderboard.map((entry) => (
                        <LeaderboardRow key={entry.rank} entry={entry} />
                    ))}
                </CardContent>
            </Card>

            {/* Achievement Highlights */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Collector",
                                description: "Obtained 100 unique characters",
                                icon: "🏆",
                            },
                            {
                                title: "Lucky Draw",
                                description: "Pulled 3 legendaries in a row",
                                icon: "🍀",
                            },
                            {
                                title: "Dedication",
                                description: "Logged in for 30 consecutive days",
                                icon: "📅",
                            },
                        ].map((achievement) => (
                            <div
                                key={achievement.title}
                                className="flex items-center space-x-3 p-4 rounded-lg border border-border bg-accent/5"
                            >
                                <div className="text-2xl">{achievement.icon}</div>
                                <div>
                                    <h4 className="font-semibold">{achievement.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
