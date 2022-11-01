import { createStore } from "vuex";

import coaches from "@/store/modules/coaches";
import requests from "@/store/modules/requests";

const store = createStore({
    modules: {
        coaches,
        requests
    }
});

export default store;