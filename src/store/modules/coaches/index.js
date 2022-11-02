import mutations from './mutations';
import actions from './actions';
import getters from './getters';


export default {
    namespaced: true,
    state() {
        return {
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Valera',
                    lastName: 'Zmishenko',
                    areas: ['gladiator','pozhiloi','zhmih', 'backend', 'frontend', 'career'],
                    description: "The old man from Samara",
                    hourlyRate: 1000000000000
                },
                {
                    id: 'c2',
                    firstName: 'Vladimir',
                    lastName: 'Chert',
                    areas: ['frontend'],
                    description: "Prosto chert",
                    hourlyRate: 666
                }
            ]
        };
    },
    mutations,
    actions,
    getters
};