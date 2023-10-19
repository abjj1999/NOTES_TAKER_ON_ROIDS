import { v } from "convex/values";
import {mutation, query} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getSidebar = query({
    args:{
        parentNoteId: v.optional(v.id("notes")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const notes = await ctx.db.query("notes")
        .withIndex("by_user_parent", (q) => 
            q
             .eq("userId", userId)
             .eq("parentNote", args.parentNoteId)
        )
        .filter((q) => 
            q.eq(q.field("isArchived"), false)
        )
        .order("desc")
        .collect();

        return notes;
    }
})

export const create = mutation({
    args:{
        title: v.string(),
        parentNote: v.optional(v.id("notes")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const note = await ctx.db.insert("notes", {
            title: args.title,
            userId: userId,
            parentNote: args.parentNote,
            isArchived: false,
            isPublished: false,
        });
        
        return note;
    }
    
})