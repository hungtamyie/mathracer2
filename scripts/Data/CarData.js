var CAR_DATA = {
    striker: {
        name: "Striker",
        unlockCost: 0,
        unlockRequirements: 0,
        spriteDimensions: {
            w: 48,
            h: 64,
            layerDistance: 3,
            drawSize: 50,
            drawHeightOffset: 0,
        },
        bodySpriteData: {
            x: 0,
            y: 0,
            layerStart: 0,
            layersTotal: 13,
        },
        hitboxData: {
            radius: 12,
            distanceBetweenCircles: 4,
        },
        stats: {
            topSpeed: 25,
            accelerationLowSpeed: 3.5,
            accelerationMidSpeed: 2.5,
            accelerationHighSpeed: 1.5,
            reverseAcceleration: 4,
            turnSpeed: 17,
            brakeForce: 6,
            grip: 5,
            gripLossSpeedMultiplier: 0.8,
            gripLossAngleMultiplier: 2,
            turnSpeedLossMultiplier: 0.1,
            straightSpeedLoss: 7,
            driftingSpeedLoss: 2,
            boostPower: 0,
            boostTime: 0,
            maxBoost: 0,
            tractionControlPower: 0,
            maxTractionControl: 0,
            maxFuel: 350,
            fuelDecayRate: 15,
        },
        wheels: {
            standard: {
                name: "Standard",
                spriteData: {
                    x: 0,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                ],
                description: "Standard wheels."
            },
            ultrawides: {
                name: "Ultrawides",
                spriteData: {
                    x: 5,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                    /*["grip", "ADD", 1.5],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.3],
                    ["brakeForce", "ADD", 0.2],
                    ["accelerationLowSpeed", "MULTIPLY", 0.9],
                    ["accelerationMidSpeed", "MULTIPLY", 0.7],
                    ["accelerationHighSpeed", "MULTIPLY", 0.7],*/
                    ["grip", "ADD", 1.3],
                    ["turnSpeed", "ADD", 0.3],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.1],
                    ["brakeForce", "ADD", 0.9],
                    ["accelerationLowSpeed", "MULTIPLY", 1.2],
                    ["accelerationMidSpeed", "MULTIPLY", 1.1],
                    ["accelerationHighSpeed", "MULTIPLY", 1.1]
                ],
                Description: "Super wide wheels. Better handling as a trade off for speed."
            }
        },
        decals: {
            stripe: {
                name: "Stripe",
                spriteData: {
                    x: 0,
                    y: 4,
                    layerStart: 2,
                    layersTotal: 11, 
                },
            }
        },
        spoilers: {
            series8: {
                name: "Series 8",
                spriteData: {
                    x: 0,
                    y: 5,
                    layerStart: 10,
                    layersTotal: 11,
                },
                modifiers: [
                    ["grip", "ADD", 0.5],
                    ["brakeForce", "ADD", 0.2],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.1],
                ],
            },
            stock: {
                name: "Stock Spoiler",
                spriteData: {
                    x: 0,
                    y: 6,
                    layerStart: 10,
                    layersTotal: 22,
                },
                modifiers: [
                    ["grip", "ADD", 0.1],
                    ["brakeForce", "ADD", 0.01],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.05],
                ],
            }
        },
        upgradeData: {
            baseCost: 100,
            costMultiplier: 1.5,
            maxLevels: {
                acceleration: 1,
                topSpeed: 3,
                braking: 3,
                handling: 3,
                boost: 0,
                tractionControl: 0,
            }
        }
    },
    kart: {
        name: "Kart",
        unlockCost: 0,
        unlockRequirements: 0,
        spriteDimensions: {
            w: 48,
            h: 64,
            layerDistance: 3,
            drawSize: 50,
            drawHeightOffset: -5,
        },
        bodySpriteData: {
            x: 0,
            y: 0,
            layerStart: 0,
            layersTotal: 16,
        },
        hitboxData: {
            radius: 12,
            distanceBetweenCircles: 4,
        },
        stats: {
            topSpeed: 15,
            accelerationLowSpeed: 1.5,
            accelerationMidSpeed: 1,
            accelerationHighSpeed: 0.3,
            reverseAcceleration: 5,
            turnSpeed: 13,
            brakeForce: 6,
            grip: 6,
            gripLossSpeedMultiplier: 0.5,
            gripLossAngleMultiplier: 2,
            turnSpeedLossMultiplier: 0.1,
            straightSpeedLoss: 9,
            driftingSpeedLoss: 4,
            boostPower: 0,
            boostTime: 0,
            maxBoost: 0,
            tractionControlPower: 0,
            maxTractionControl: 0,
            maxFuel: 450,
            fuelDecayRate: 20,
        },
        wheels: {
            standard: {
                name: "Standard",
                spriteData: {
                    x: 0,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                ],
                description: "Standard wheels."
            },
            crimsons: {
                name: "Crimson Rubber Wheelsq",
                spriteData: {
                    x: 5,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                    ["accelerationLowSpeed", "ADD", 0.5],
                    ["accelerationMidSpeed", "ADD", 0.25],
                    ["accelerationHighSpeed", "ADD", 0.1],
                ],
                description: "Made with a special material that improves acceleration"
            }
        },
        decals: {
            stripe: {
                name: "Stripe",
                spriteData: {
                    x: 0,
                    y: 4,
                    layerStart: 2,
                    layersTotal: 11, 
                },
            }
        },
        spoilers: {
            series8: {
                name: "Series 8",
                spriteData: {
                    x: 0,
                    y: 5,
                    layerStart: 10,
                    layersTotal: 6,
                },
                modifiers: [],
            },
        },
        upgradeData: {
            baseCost: 100,
            costMultiplier: 1.5,
            maxLevels: {
                acceleration: 1,
                topSpeed: 3,
                braking: 3,
                handling: 3,
                boost: 0,
                tractionControl: 0,
            }
        }
    },
    zipline: {
        name: "Zipline",
        unlockCost: 0,
        unlockRequirements: 0,
        spriteDimensions: {
            w: 48,
            h: 64,
            layerDistance: 2.5,
            drawSize: 50,
            drawHeightOffset: 0,
        },
        bodySpriteData: {
            x: 0,
            y: 0,
            layerStart: 0,
            layersTotal: 13,
        },
        hitboxData: {
            radius: 12,
            distanceBetweenCircles: 4,
        },
        stats: {
            topSpeed: 25,
            accelerationLowSpeed: 3.5,
            accelerationMidSpeed: 2.5,
            accelerationHighSpeed: 1.5,
            reverseAcceleration: 4,
            turnSpeed: 17,
            brakeForce: 6,
            grip: 5,
            gripLossSpeedMultiplier: 0.8,
            gripLossAngleMultiplier: 2,
            turnSpeedLossMultiplier: 0.1,
            straightSpeedLoss: 7,
            driftingSpeedLoss: 2,
            boostPower: 0,
            boostTime: 0,
            maxBoost: 0,
            tractionControlPower: 0,
            maxTractionControl: 0,
            maxFuel: 350,
            fuelDecayRate: 15,
        },
        wheels: {
            standard: {
                name: "Standard",
                spriteData: {
                    x: 0,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                ],
                description: "Standard wheels."
            },
            ultrawides: {
                name: "Ultrawides",
                spriteData: {
                    x: 5,
                    y: 1,
                    layerStart: 0,
                    layersTotal: 5, 
                },
                modifiers: [
                    /*["grip", "ADD", 1.5],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.3],
                    ["brakeForce", "ADD", 0.2],
                    ["accelerationLowSpeed", "MULTIPLY", 0.9],
                    ["accelerationMidSpeed", "MULTIPLY", 0.7],
                    ["accelerationHighSpeed", "MULTIPLY", 0.7],*/
                    ["grip", "ADD", 1.3],
                    ["turnSpeed", "ADD", 0.3],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.1],
                    ["brakeForce", "ADD", 0.9],
                    ["accelerationLowSpeed", "MULTIPLY", 1.2],
                    ["accelerationMidSpeed", "MULTIPLY", 1.1],
                    ["accelerationHighSpeed", "MULTIPLY", 1.1]
                ],
                Description: "Super wide wheels. Better handling as a trade off for speed."
            }
        },
        decals: {
            stripe: {
                name: "Stripe",
                spriteData: {
                    x: 0,
                    y: 4,
                    layerStart: 2,
                    layersTotal: 11, 
                },
            }
        },
        spoilers: {
            series8: {
                name: "Series 8",
                spriteData: {
                    x: 0,
                    y: 5,
                    layerStart: 10,
                    layersTotal: 11,
                },
                modifiers: [
                    ["grip", "ADD", 0.5],
                    ["brakeForce", "ADD", 0.2],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.1],
                ],
            },
            stock: {
                name: "Stock Spoiler",
                spriteData: {
                    x: 0,
                    y: 6,
                    layerStart: 10,
                    layersTotal: 22,
                },
                modifiers: [
                    ["grip", "ADD", 0.1],
                    ["brakeForce", "ADD", 0.01],
                    ["gripLossSpeedMultiplier", "SUBTRACT", 0.05],
                ],
            }
        },
        upgradeData: {
            baseCost: 100,
            costMultiplier: 1.5,
            maxLevels: {
                acceleration: 1,
                topSpeed: 3,
                braking: 3,
                handling: 3,
                boost: 0,
                tractionControl: 0,
            }
        }
    }
}
