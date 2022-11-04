import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getMyUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  getMyProfile: protectedProcedure.query(async ({ ctx }) => {
    // Get my profile if it exists, otherwise create it
    const profile = await ctx.prisma.profile.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
    if (profile) {
      return profile;
    }
    return await ctx.prisma.profile.create({
      data: {
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    });
  }),
  getMySocials: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.socialPlatforms.findFirst({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getSocials: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.socialPlatforms.findFirst({
        where: {
          userId: input.userId,
        },
      });
    }),
  getMyCars: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.car.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  getCars: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.car.findMany({
        where: {
          userId: input.userId,
        },
      });
    }),
  getMyDiscordId: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.account
      .findFirst({
        where: {
          provider: "discord",
          userId: ctx.session.user.id,
        },
        select: {
          providerAccountId: true,
        },
      })
      .then((account) => account?.providerAccountId);
  }),
  getDiscordId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.account
        .findFirst({
          where: {
            provider: "discord",
            userId: input.userId,
          },
          select: {
            providerAccountId: true,
          },
        })
        .then((account) => account?.providerAccountId);
    }),
  editSocialPlatforms: protectedProcedure
    .input(
      z.object({
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional(),
        tiktok: z.string().optional(),
        twitch: z.string().optional(),
        linkedin: z.string().optional(),
        spotify: z.string().optional(),
        github: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.socialPlatforms.upsert({
        where: {
          userId: ctx.session.user.id,
        },
        update: input,
        create: {
          ...input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
      return true;
    }),
  editProfile: protectedProcedure
    .input(
      z.object({
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
      })
    )
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
      });
    }),
  getProfile: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.profile.findFirst({
        where: {
          userId: input.userId,
        },
      });
    }),
  visitProfile: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.user.findFirst({
        where: {
          slug: input.slug,
        },
        include: {
          profile: {
            select: {
              privateProfile: true,
            },
          },
        },
      });
    }),
});
