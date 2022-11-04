import { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  slug: string;
};

export default async function returnUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slugs = prisma?.user.findMany({
    select: {
      slug: true,
    },
  });
  return slugs;
}
