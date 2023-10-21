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

export const archive = mutation({
    args: {
        id: v.id("notes"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }

        const recusiveArchive = async (noteId: Id<"notes">) => {
            const children = await ctx.db.query("notes")
            .withIndex("by_user_parent", (q) =>(
                q.eq("userId", userId)
                .eq("parentNote", noteId)
            
            )).collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived:true
                })
                await recusiveArchive(child._id);
            }
        }



        const note = await ctx.db.patch(args.id, {
            isArchived: true,
        });

        await recusiveArchive(args.id);
        
        return note;

    }
})

export const getTrash = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const notes = await ctx.db.query("notes")
            .withIndex("by_user", (q) => (
                q.eq("userId", userId)
            ))
            .filter((q) => (
                q.eq(q.field("isArchived"), true)
            )).order("desc").collect();

        return notes;
    }
})

export const restore = mutation({
    args: {
        id: v.id("notes"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }
        const recusiveRestore = async (noteId: Id<"notes">) => {
            const children = await ctx.db.query("notes")
            .withIndex("by_user_parent", (q) =>(
                q.eq("userId", userId)
                .eq("parentNote", noteId)
            
            )).collect();

            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived:false
                })
                await recusiveRestore(child._id);
            }
        }

        const options: Partial<Doc<"notes">> = {
            isArchived: false,
        }

        if(existingNote.parentNote){
            const parentNote = await ctx.db.get(existingNote.parentNote);
            if(parentNote?.isArchived){
                options.parentNote = undefined;

            }
        }

        const notes = await ctx.db.patch(args.id, options);

        await recusiveRestore(args.id);

        return notes;

    }
})

export const remove = mutation({
    args:{
        id: v.id("notes"),
    
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }

        const note = await ctx.db.delete(args.id);

        return note;
    }
})

export const getSearch = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const notes = await ctx.db.query("notes")
            .withIndex("by_user", (q) => (
                q.eq("userId", userId)
            ))
            .filter((q) => (
                q.eq(q.field("isArchived"), false)
            )).order("desc").collect();

        return notes;
    }
})

export const getById = query({
    args:{noteId: v.id("notes")},
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        

        // const userId = identity?.subject;

        const note = await ctx.db.get(args.noteId);

        if (!note) {
            throw new Error("Note not found");
        }

        // if (note.userId !== userId) {
        //     throw new Error("Not authorized");
        // }
        if(note.isPublished && !note.isArchived){
            return note;
        }

        if(!identity){
            throw new Error("Not authenticated");
        }

        const userId = identity.subject;

        if(note.userId !== userId){
            throw new Error("Not authorized");
        }

        return note;
    }
});

export const update = mutation({
    args:{
        id: v.id("notes"),
        title: v.optional(v.string()),
        content: v.optional(v.string()),
        coverImage: v.optional(v.string()),
        icon: v.optional(v.string()),
        isPublished: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const {id, ...rest} = args;

        const existingNote = await ctx.db.get(id);

        if (!existingNote) {
            throw new Error("Note not found");
        };

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }

        const note = await ctx.db.patch(args.id, {
            ...rest,
        });

        return note;
    }
    
});

export const removeIcon = mutation({
    args:{
        id: v.id("notes"),
    
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }

        const note = await ctx.db.patch(args.id, {
            icon: undefined,
        });

        return note;
    }
})


export const removeCoverImage = mutation({
    args:{
        id: v.id("notes"),
    
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const existingNote = await ctx.db.get(args.id);

        if (!existingNote) {
            throw new Error("Note not found");
        }

        if (existingNote.userId !== userId) {
            throw new Error("Not authorized");
        }

        const note = await ctx.db.patch(args.id, {
            coverImage: undefined,
        });

        return note;
    }
})
