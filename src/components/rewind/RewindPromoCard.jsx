import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUndo, FaHistory, FaUserTimes, FaTimes, FaCheck, FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_URL, DEFAULT_IMG } from "../../utils/helper/constant";
import RewindCardUI from "./RewindCardUI";
import HistoryModal from "./HistoryModal";




const RewindControlCard = () => {
    const user = useSelector(state => state.user.user);
    const isPremium = user?.isPremium;

    // State
    const [showModal, setShowModal] = useState(false);
    const [ignoredUsers, setIgnoredUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1. Fetch Ignored Users
    const handleOpenModal = async () => {
        setShowModal(true);
        setLoading(true);
        try {
            const res = await axios.post(`${Base_URL}/user/request/ignored`, {}, { withCredentials: true });
            setIgnoredUsers(res.data.data || []);
        } catch (error) {
            console.error("Error fetching ignored users:", error);
            toast.error("Failed to load history.");
        } finally {
            setLoading(false);
        }
    };

    // 2. Handle Actions
    const handleSendRequest = async (status, targetUserId) => {
        if (!targetUserId) return;

        try {
            // A. Send the Request
            await axios.post(
                `${Base_URL}/user/resend-request/send/${status}/${targetUserId}`,
                {},
                { withCredentials: true }
            );

            // B. Show Feedback
            toast.success(status === 'intrested' ? 'Connection Request Sent!' : 'User Ignored');

            // C. Refetch the list
            const res = await axios.post(`${Base_URL}/user/request/ignored`, {}, { withCredentials: true });
            setIgnoredUsers(res.data.data || []);

        } catch (error) {
            console.error('Request failed:', error);
            toast.error(error?.response?.data?.message || 'Action failed');
        }
    };

    return (
        <>
            <RewindCardUI
                isPremium={isPremium}
                onOpen={handleOpenModal}
            />

            {showModal && (
                <HistoryModal
                    onClose={() => setShowModal(false)}
                    loading={loading}
                    users={ignoredUsers}
                    onAction={handleSendRequest}
                />
            )}
        </>
    );
};

export default RewindControlCard;