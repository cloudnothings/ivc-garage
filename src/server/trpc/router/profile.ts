import { router, publicProcedure, protectedProcedure } from "../trpc";

export const profileRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
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
        Car: true,
      },
    });
  }),
});
