import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getMyUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    });
  }),
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    // Get my profile if it exists, otherwise create it
    const profile = await ctx.prisma.profile.findUnique({
      where: {
        userId: ctx.session.user.id
      }
    });
    if (profile) {
      return profile;
    }
    return ctx.prisma.profile.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      }
    });
  }),
  getMyCars: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.car.findMany({
      where: {
        userId: ctx.session.user.id
      }
    });
  }),
  editProfile: protectedProcedure
    .input(z.object({
      slug: z.string().optional(),
      profilePicture: z.string().optional(),
      profile: z.object({
        about: z.string().optional(),
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        publicEmail: z.string().optional(),
        privateProfile: z.boolean(),
        allowMentions: z.boolean(),
        allowComments: z.boolean(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        slug: input.slug ?? undefined,
        profile: {
          update: {
            about: input.profile.about ?? undefined,
            firstName: input.profile.firstName ?? undefined,
            lastName: input.profile.lastName ?? undefined,
            publicEmail: input.profile.publicEmail ?? undefined,
            privateProfile: input.profile.privateProfile,
            allowMentions: input.profile.allowMentions,
            allowComments: input.profile.allowComments,
          },
        },
      },
    })
  }),
});
