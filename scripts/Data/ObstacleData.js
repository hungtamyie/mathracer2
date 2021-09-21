var OBSTACLE_DATA = {
    "treeA": {
        sx: 0,
        sy: 0,
        sw: 3,
        sh: 4,
        scale: 32,
        dh: -37,
        hitbox: [{
            type: "circle",
            radius: 13,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeB": {
        sx: 3,
        sy: 0,
        sw: 3,
        sh: 4,
        scale: 32,
        dh: -37,
        hitbox: [{
            type: "circle",
            radius: 15,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeC": {
        sx: 6,
        sy: 0,
        sw: 3,
        sh: 4,
        scale: 32,
        dh: -37,
        hitbox: [{
            type: "circle",
            radius: 13,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeD": {
        sx: 0,
        sy: 4,
        sw: 4,
        sh: 4,
        scale: 32,
        dh: -34,
        hitbox: [{
            type: "circle",
            radius: 15,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeE": {
        sx: 4,
        sy: 4,
        sw: 4,
        sh: 4,
        scale: 32,
        dh: -34,
        hitbox: [{
            type: "circle",
            radius: 15,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeF": {
        sx: 4,
        sy: 4,
        sw: 4,
        sh: 4,
        scale: 32,
        dh: -34,
        hitbox: [{
            type: "circle",
            radius: 15,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeG": {
        sx: 8,
        sy: 4,
        sw: 2,
        sh: 3,
        scale: 32,
        dh: -30,
        hitbox: [{
            type: "circle",
            radius: 10,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "treeH": {
        sx: 8,
        sy: 7,
        sw: 2,
        sh: 3,
        scale: 32,
        dh: -30,
        hitbox: [{
            type: "circle",
            radius: 12,
        }],
        bounce: 1.1,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1.1,
            },
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 5,
                flightSpeed: [3,10],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "rockA": {
        sx: 2,
        sy: 8,
        sw: 2,
        sh: 2,
        scale: 32,
        dh: -12,
        hitbox: [{
            type: "circle",
            radius: 18,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.7,
            }
        },
    },
    "rockB": {
        sx: 1,
        sy: 8,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -6,
        hitbox: [{
            type: "circle",
            radius: 10,
        }],
        bounce: 1.3,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.7,
            }
        },
    },
    "rockC": {
        sx: 4,
        sy: 8,
        sw: 2,
        sh: 1,
        scale: 32,
        dh: -2,
        hitbox: [{
            type: "circle",
            radius: 18,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.7,
            }
        },
    },
    "rockE": {
        sx: 4,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -1,
        hitbox: [{
            type: "circle",
            radius: 14,
        }],
        bounce: 1.3,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.7,
            }
        },
    },
    "rockF": {
        sx: 5,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -1,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.7,
            }
        },
    },
    "treeTiny": {
        sx: 0,
        sy: 8,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -10,
        hitbox: [{
            type: "circle",
            radius: 6,
        }],
        bounce: 1.3,
        hitBehavior: {
            particles: {
                type: "tree_bark",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [4,5],
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "tire": {
        sx: 0,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.4,
        hitBehavior: {
            filter: {
                type: "squash",
                value: 30,
                changeRate: 1, 
                movementAmount: 2,
            },
            sound: {
                soundName: "tire_hit",
                volume: 0.5,
            }
        },
    },
    "tireGrass": {
        sx: 1,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.4,
        hitBehavior: {
            filter: {
                type: "squash",
                value: 30,
                changeRate: 1, 
                movementAmount: 2,
            },
            sound: {
                soundName: "tire_hit",
                volume: 0.5,
            }
        },
    },
    "tireShort": {
        sx: 2,
        sy: 10,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -8,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.4,
        hitBehavior: {
            filter: {
                type: "squash",
                value: 30,
                changeRate: 1, 
                movementAmount: 2,
            },
            sound: {
                soundName: "tire_hit",
                volume: 0.5,
            }
        },
    },
    "pillar": {
        sx: 6,
        sy: 8,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 9,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
    "cone": {
        sx: 6,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -4,
        hitbox: [{
            type: "circle",
            radius: 6,
        }],
        bounce: 1.3,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1,
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "coneGrass": {
        sx: 7,
        sy: 9,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -4,
        hitbox: [{
            type: "circle",
            radius: 6,
        }],
        bounce: 1.3,
        hitBehavior: {
            filter: {
                type: "shake",
                value: 30,
                changeRate: 2, 
                movementAmount: 1,
            },
            sound: {
                soundName: "tree_hit",
                volume: 0.5,
            }
        },
    },
    "barrierLeft": {
        sx: 0,
        sy: 10,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
    "barrierRight": {
        sx: 1,
        sy: 10,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
    "barrierUp": {
        sx: 3,
        sy: 10,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 6,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
    "barrierSide": {
        sx: 4,
        sy: 10,
        sw: 1,
        sh: 1,
        scale: 32,
        dh: -9,
        hitbox: [{
            type: "circle",
            radius: 8,
        }],
        bounce: 1.1,
        hitBehavior: {
            particles: {
                type: "rock",
                amount: 10,
                speedThreshold: 4,
                flightSpeed: [2,6],
            },
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
    
    "pitStopFront": {
        sx: 0,
        sy: 11,
        sw: 5,
        sh: 4,
        scale: 32,
        dh: -50,
        hitbox: [{type: "line", p1: {x: -32, y: -5}, p2: {x: -4, y: 21}},
                 {type: "line", p1: {x: -62, y: -54}, p2: {x: 15, y: 20}},
                 {type: "line", p1: {x: 15, y: 20}, p2: {x: 20, y: 15}},
                 {type: "line", p1: {x: -20, y: -110}, p2: {x: 62, y: -25}},
                 {type: "line", p1: {x: -20, y: -125}, p2: {x: 65, y: -35}}],
        bounce: 1.1,
        hitBehavior: {
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            },
        }
    },
    "pitStopBack": {
        sx: 5,
        sy: 11,
        sw: 5,
        sh: 4,
        scale: 32,
        dh: -25,
        hitbox: [],
        bounce: 1.1,
        hitBehavior: {
            sound: {
                soundName: "rock_hit",
                volume: 0.5,
            }
        },
    },
}