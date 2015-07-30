const changeRecipient  = Symbol("changeRecipient");

export default {
    actions: {
        changeRecipient(...args) { return [changeRecipient, ...args]; }
    },
    filters: {
        changeRecipient([action]) { return action === changeRecipient;}
    }
};