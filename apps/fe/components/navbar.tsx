"use client";

import {
    Coins,
    Gem,
    LogOut,
    Menu,
    Package,
    Settings,
    Trophy,
    User,
    X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigation = [
        { name: "Collection", href: "/collection", icon: Package },
        { name: "Pulls", href: "/pulls", icon: Gem },
        { name: "Leaderboards", href: "/leaderboards", icon: Trophy },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <nav className="bg-card border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                <Gem className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-foreground">
                                GachaVault
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <item.icon className="h-4 w-4" />
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Currency Display */}
                        <div className="hidden sm:flex items-center space-x-4">
                            <Badge
                                variant="secondary"
                                className="flex items-center space-x-1"
                            >
                                <Coins className="h-3 w-3" />
                                <span>12,450</span>
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1">
                                <Gem className="h-3 w-3" />
                                <span>89</span>
                            </Badge>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder-avatar.jpg" />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Button variant="ghost" size="sm" className="hidden sm:flex">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="md:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <X className="h-4 w-4" />
                            ) : (
                                <Menu className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                            <div className="px-3 py-2 border-t border-border mt-2">
                                <div className="flex items-center space-x-4 mb-2">
                                    <Badge
                                        variant="secondary"
                                        className="flex items-center space-x-1"
                                    >
                                        <Coins className="h-3 w-3" />
                                        <span>12,450</span>
                                    </Badge>
                                    <Badge
                                        variant="outline"
                                        className="flex items-center space-x-1"
                                    >
                                        <Gem className="h-3 w-3" />
                                        <span>89</span>
                                    </Badge>
                                </div>
                                <Button variant="outline" size="sm" className="w-full">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
