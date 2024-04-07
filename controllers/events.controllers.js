/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

const EventFetchUser = require("../models/eventModel");

async function getAllEventsUser(req, res) {
    try {
        const EventFetchUserData = await EventFetchUser.find()
        console.log(EventFetchUserData);
        if (EventFetchUserData && EventFetchUserData.length > 0) {
            const resultResponse = {
                message: 'Events retrieved',
                success: true,
                data: EventFetchUserData,
            }
            res.status(200).send(resultResponse)
        } else {
            const errorResponse = {
                message: 'No event found!',
                success: false,
            }
            res.status(404).send(errorResponse)
        }
    } catch (err) {
        const errorResponse = {
            message: err,
            success: false,
        }
        res.status(500).json(errorResponse)
    }
}

module.exports = {
    getAllEventsUser,
}