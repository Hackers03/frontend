'use client'
import { conversationtype } from "@/utils/type";
import Conversation from "@/components/Conversation";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import { api } from "@/utils/api";
import { useState, useEffect } from "react";
import RequireAuth from "@/components/utils/RequireAuth";

const InboxPage =  () => {
    const {data: user} = useRetrieveUserQuery();
    const [conversations, setConversations] = useState<conversationtype []>()

    const getConversations = async () => {
        setConversations(await api.get('chat/').json<conversationtype[]>());
    }

    useEffect(() => {    
        getConversations();
    }, [])
    
    return (
        <RequireAuth>
            <div className="max-w-[1500px] mx-auto px-6 pb-6 space-y-4">
                <h1 className="my-6 text-2xl">Inbox</h1>

                {conversations?.map((conversation) => (
                    <Conversation
                        key={conversation.id}
                        conversation={conversation}
                    />
                ))}
            </div>
        </RequireAuth>
    );
}

export default InboxPage;