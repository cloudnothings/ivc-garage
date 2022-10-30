import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getEditProfileInfo: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        id: true,
        slug: true,
        image: true,
        profilePicture: true,
        Profile: true,
      },
    });
  }),
  updateProfile: protectedProcedure
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
        Profile: {
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
  getMyProfile: protectedProcedure.query(({ ctx }) => {
    // TODO: return the user's profile
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Profile: true,
        SocialPlatforms: true,
        Cars: true,
      },
    });
  }),
});
