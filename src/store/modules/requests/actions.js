export default {
    contactCoach: async function (context, payload) {
        let newRequest, response, responseData;
        newRequest = {
            coachId: payload.coachId,
            email: payload.email,
            message: payload.message
        };
        response = await fetch(`https://bigg-app-9b256-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        responseData = await response.json();

        if (response.ok) {
            newRequest.id = responseData.name;
            newRequest.coachId = payload.coachId;
            context.commit('addRequest', newRequest);
        } else {
            throw new Error(responseData.message || 'Failed to send request');
        }
    },
    fetchRequests: async function (context) {
        const coachId = context.rootGetters.userId;
        const response = await fetch(`https://bigg-app-9b256-default-rtdb.firebaseio.com/requests/${coachId}.json`);
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to send request');
        }

        const requests = [];

        for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                message: responseData[key].message
            };
            requests.push(request);
        }

        context.commit('setRequests', requests);
    }
};