/*Author: Jaimi Maheshbhai Sheta (B00886563)*/

const RewardFetchAdmin = require("../models/voucherDetails")
const UserFetchAdmin = require("../models/userModel");
const EventFetchAdmin = require("../models/eventModel");

async function getAllUsersAdmin(req, res) {
    try {
        const UserFetchAdminData = await UserFetchAdmin.find()
        if (UserFetchAdminData && UserFetchAdminData.length > 0) {
            const resultResponse = {
                message: 'Users retrieved',
                success: true,
                data: UserFetchAdminData,
            }
            res.status(200).send(resultResponse)
        } else {
            const errorResponse = {
                message: 'No user found! please add the user first',
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

async function getAllRewardsAdmin(req, res) {
    try {
        const RewardFetchAdminData = await RewardFetchAdmin.find()
        if (RewardFetchAdminData && RewardFetchAdminData.length > 0) {
            const resultResponse = {
                message: 'Rewards retrieved',
                success: true,
                data: RewardFetchAdminData,
            }
            console.log(RewardFetchAdminData);
            res.status(200).send(resultResponse)
        } else {
            const errorResponse = {
                message: 'No reward found! please add the reward first',
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

async function getAllEventsAdmin(req, res) {
    try {
        const EventFetchAdminData = await EventFetchAdmin.find()
        if (EventFetchAdminData && EventFetchAdminData.length > 0) {
            const resultResponse = {
                message: 'Events retrieved',
                success: true,
                data: EventFetchAdminData,
            }
            res.status(200).send(resultResponse)
        } else {
            const errorResponse = {
                message: 'No event found! please add the event first',
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

async function deleteEvent(req, res) {
    let id = req.params.id;
    EventFetchAdmin.findByIdAndDelete(id).then(_ => {
        const resultResponse = {
            message: 'Event deleted successfully',
            success: true,
        }
        res.status(200).send(resultResponse);
    }).catch(err => {
        console.log(err);
        const errorResponse = {
            message: err,
            success: false,
        }
        res.status(500).json(errorResponse)
    })
}

async function addEvent(req, res) {
    EventFetchAdmin.create(req.body).then(_ => {
        const resultResponse = {
            message: 'Event created successfully',
            success: true,
        }
        res.status(200).send(resultResponse);
    }).catch(err => {
        console.log(err);
        const errorResponse = {
            message: err,
            success: false,
        }
        res.status(500).json(errorResponse)
    });
}

module.exports = {
    getAllRewardsAdmin,
    getAllUsersAdmin,
    getAllEventsAdmin,
    addEvent,
    deleteEvent
}