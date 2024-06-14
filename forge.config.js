const { FusesPlugin } = require("@electron-forge/plugin-fuses");
const { FuseV1Options, FuseVersion } = require("@electron/fuses");

module.exports = {
    packagerConfig: {
        asar: true,
        // osxSign: {
        //     identity: "[your apple identity]",
        //     "hardened-runtime": true,
        //     entitlements: "entitlements.plist",
        //     "entitlements-inherit": "entitlements.plist",
        //     "signature-flags": "library",
        // },
        // osxNotarize: {
        //     appleId: "apple ID",
        //     appleIdPassword: "apple ID password",
        // },
    },
    rebuildConfig: {},
    makers: [
        {
            name: "@electron-forge/maker-squirrel",
            config: {
                // certificateFile: "./assets/cert.pfx",
                // certificatePassword: process.env.CERTIFICATE_PASSWORD,
            },
        },
        {
            name: "@electron-forge/maker-appx",
            config: {
                // publisher: "CN=VV",
                // devCert: "./assets/cert.pfx",
                // certPass: process.env.CERTIFICATE_PASSWORD
            },
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"],
        },
        // {
        //     name: "@electron-forge/maker-deb",
        //     config: {},
        // },
        // {
        //     name: "@electron-forge/maker-rpm",
        //     config: {},
        // },
        {
            name: "@electron-forge/maker-dmg",
            config: {
                background: "./src/images/bg-doggy.jpg",
                format: "ULFO",
            },
        },
    ],
    plugins: [
        {
            name: "@electron-forge/plugin-auto-unpack-natives",
            config: {},
        },
        // Fuses are used to enable/disable various Electron functionality
        // at package time, before code signing the application
        new FusesPlugin({
            version: FuseVersion.V1,
            [FuseV1Options.RunAsNode]: false,
            [FuseV1Options.EnableCookieEncryption]: true,
            [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
            [FuseV1Options.EnableNodeCliInspectArguments]: false,
            [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
            [FuseV1Options.OnlyLoadAppFromAsar]: true,
        }),
    ],
};
