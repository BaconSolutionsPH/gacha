"use client";

import { Gem, Package, Star, Trophy, User } from "lucide-react";
import { AnimatePresence, motion, stagger } from "motion/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
export default function HomePage() {
  const [activeTab, setActiveTab] = useState("collection");

  return (
    <div className="min-h-screen bg-background p-8">
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="w-10 h-10 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 },
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Gem className="h-6 w-6 text-white" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            GachaVault
          </motion.h1>
        </div>
        <motion.p
          className="text-lg text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Manage your collection, pull new characters, and climb the
          leaderboards!
        </motion.p>
      </motion.header>

      <motion.nav
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div className="flex space-x-4">
          {[
            { id: "collection", icon: Package, label: "Collection" },
            { id: "pulls", icon: Gem, label: "Pulls" },
            { id: "leaderboards", icon: Trophy, label: "Leaderboards" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((tab, index) => (
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.8 + index * 0.1,
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center space-x-2 relative overflow-hidden"
              >
                <motion.div
                  animate={
                    activeTab === tab.id
                      ? {
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <tab.icon className="h-4 w-4" />
                </motion.div>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-md"
                    layoutId="activeTab"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      <main>
        <AnimatePresence mode="wait">
          {activeTab === "collection" && (
            <motion.div
              key="collection"
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {[
                  {
                    label: "Collection Rate",
                    value: "75.5%",
                    icon: Package,
                    color: "text-blue-500",
                  },
                  {
                    label: "Characters Owned",
                    value: "156/206",
                    icon: Star,
                    color: "text-yellow-500",
                  },
                  {
                    label: "Power Score",
                    value: "98,750",
                    icon: Trophy,
                    color: "text-green-500",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {stat.label}
                            </p>
                            <motion.p
                              className="text-3xl font-bold"
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              transition={{
                                duration: 0.5,
                                delay: 0.3 + index * 0.1,
                                type: "spring",
                              }}
                            >
                              {stat.value}
                            </motion.p>
                          </div>
                          <motion.div
                            animate={{
                              rotate: [0, 5, -5, 0],
                              scale: [1, 1.1, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.2,
                            }}
                          >
                            <stat.icon className={`h-10 w-10 ${stat.color}`} />
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.3,
                    },
                  },
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <motion.div
                    key={`character-${i}`}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Card className="group cursor-pointer hover:shadow-lg transition-all overflow-hidden">
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
                          <h3 className="font-semibold text-sm">
                            Character {i}
                          </h3>
                          <Badge variant="outline" className="mt-1 text-xs">
                            Fire
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "pulls" && (
            <motion.div
              key="pulls"
              className="max-w-2xl mx-auto space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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

                  <motion.div
                    className="bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Gem className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                    </motion.div>
                    <motion.p
                      className="text-lg text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Ready to summon!
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="grid grid-cols-2 gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.6,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="h-12 text-lg w-full" variant="outline">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <Gem className="w-4 h-4 mr-2" />
                        </motion.div>
                        Single Pull (1 💎)
                      </Button>
                    </motion.div>
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="h-12 text-lg bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full">
                        10-Pull (10 💎)
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "leaderboards" && (
            <motion.div
              key="leaderboards"
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              className="max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <motion.div
                    className="w-24 h-24 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      duration: 0.8,
                      delay: 0.2,
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                  >
                    JD
                  </motion.div>
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
                      <p className="text-sm text-muted-foreground">
                        Global Rank
                      </p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-accent/10">
                      <p className="text-2xl font-bold">2,847</p>
                      <p className="text-sm text-muted-foreground">
                        Total Pulls
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
