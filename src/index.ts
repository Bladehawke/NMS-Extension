import path from "path";
import * as vortexApi from "vortex-api"; 

import {
    EXTENSION_NAME_INTERNAL,
    EXTENSION_NAME_VORTEX,
    GAME_EXE_RELATIVE_PATH,
    GAME_ID,
    GOGAPP_ID,
    STEAMAPP_ID,
  } from "./index.metadata";

export const findGame = () =>
    vortexApi.util.GameStoreHelper.findByAppId([STEAMAPP_ID, GOGAPP_ID]).then(
        (game: vortexApi.types.IGameStoreEntry) => game.gamePath,
    );

const prepareForModding = (discovery) =>
    vortexApi.fs.readdirAsync(path.join(discovery.path));

const main = (context) => {
    context.registerGame({
        id: GAME_ID,
        name: "No Man's Sky",
        mergeMods: true,
        queryPath: findGame,
        queryModPath: () => "",
        logo: "gameart.png",
        executable: () => "Binaries/NMS.exe",
        requiredFiles: ["Binaries/NMS.exe"],
        compatible: {
            symlinks: true,
        },
        requiresLauncher: false,
        setup: prepareForModding,
        environment: {
            SteamAPPId: STEAMAPP_ID,
        },
        details: {
            steamAppId: STEAMAPP_ID,
            gogAppId: GOGAPP_ID,
        },
    });
}

module.exports = {
    default: main,
};
  