import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getEditProfileInfo: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        Profile: true,
        SocialPlatforms: true,
      },
    });
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