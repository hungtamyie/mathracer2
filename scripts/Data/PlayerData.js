var PlayerData = {
    settings: {
        visual: {
            fps: 70,
            carDrawDepth: 2,
            carDrawDirections: 92,
            particleNumber: 50,
        },
        keybinds: {
            drive: "w",
            brake: "s",
            left: "a",
            right: "d",
            boost: " ",
            traction: "shift",
        },
        camera: {
            stiffness: 3,
            distanceInFront: 30,
        }
    },
    chosenPreset: 2,
    carPresets: [
        {
            name: "Preset_1",
            car: "striker",
            wheels: "ultrawides",
            decal: "stripe",
            spoiler: "series8",
            carColor: [[11, 25, 245], [21, 145, 251], [22, 179, 252]],
            trimColor: [255, 255, 200],
            decalColor: [10, 255, 250],
            gas: "canola",
            upgrades: {
                acceleration: 0,
                topSpeed: 0,
                braking: 0,
                handling: 0,
                boost: 0,
                tractionControl: 0,
            },
        },
        {
            name: "Preset_2",
            car: "kart",
            wheels: "crimsons",
            decal: "stripe",
            spoiler: "series8",
            carColor: [[54, 158, 122], [47, 186, 102], [31, 210, 43]],
            trimColor: [255, 255, 200],
            decalColor: [10, 255, 250],
            gas: "canola",
            upgrades: {
                acceleration: 1,
                topSpeed: 0,
                braking: 0,
                handling: 0,
                boost: 0,
                tractionControl: 0,
            },
        },
        {
            name: "Preset_3",
            car: "striker",
            wheels: "standard",
            decal: "stripe",
            spoiler: "stock",
            carColor: [[207, 187, 39], [214, 190, 32], [234, 212, 67]],
            trimColor: [255, 255, 200],
            decalColor: [255, 0, 15],
            gas: "canola",
            upgrades: {
                acceleration: 1,
                topSpeed: 0,
                braking: 0,
                handling: 0,
                boost: 0,
                tractionControl: 0,
            },
        },
        
    ]
}