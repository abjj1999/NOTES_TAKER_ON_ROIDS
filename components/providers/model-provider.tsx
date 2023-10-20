"use client";

import { useEffect, useState } from "react";

import { SettingModal } from "../models/setting-modal";

export const ModelProvider = () => {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);
    
    if (!mounted) return null;
    
    return (
        <>
        <SettingModal />
        </>
    );
}