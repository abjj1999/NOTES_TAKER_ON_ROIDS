"use client";

import {
    Dialog, 
    DialogContent, 
    DialogHeader
} from "@/components/ui/dialog";
import { useSetting } from "@/hooks/use-setting";
import {Label} from "@/components/ui/label";
import ModeToggle from "@/components/mode-toggle";


export const SettingModal = () => {
    const settings = useSetting();

    return (
        <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
            <DialogContent>
            <DialogHeader className="border-b pb-3">
                <h2 className="text-lg font-semibold">
                Settings
                </h2>
            </DialogHeader>
                <div className="flex items-center justify-between space-y-4">
                    <div className="flex flex-col gap-y-1">
                        <Label>
                            Theme
                        </Label>
                        <span className="text-[0.8rem] text-muted-foreground">
                            Customize ROIDS
                        </span>
                    </div>
                        <ModeToggle />
                </div>
            </DialogContent>
        </Dialog>
    );
}