var PlayerData = {
    settings: {
        visual: {
            fps: 70,
            carDrawDepth: 2,
            carDrawDirections: 92,
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
    chosenPreset: 0,
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
            carColor: [[11, 25, 245], [21, 145, 251], [22, 179, 252]],
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
        }
    ]
}