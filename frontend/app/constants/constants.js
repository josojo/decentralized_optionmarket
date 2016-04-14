var keyMirror = require('keymirror');

module.exports = {
    SECONDS_PER_BLOCK: 15,
    CHANGE_EVENT: "change",
    config: keyMirror({
        UPDATE_ETHEREUM_CLIENT_SUCCESS: null,
        UPDATE_ETHEREUM_CLIENT_FAILED: null,
        UPDATE_PERCENT_LOADED_SUCCESS: null,
        UPDATE_DEMO_MODE: null,
        UPDATE_CONFIG: null,
        UPDATE_BTC_SWAP_CLIENT: null,

    }),
    LOAD_MARKETS:"LOAD_MARKETS",
    oracle: keyMirror({
        DO_FOO: null
    })
};
