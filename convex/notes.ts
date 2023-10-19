import { v } from "convex/values";
import {mutation, query} from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const notes = await ctx.db.query("notes").collect();

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