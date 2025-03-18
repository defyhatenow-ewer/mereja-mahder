import { Payload } from 'payload'

export const seed = async (payload: Payload): Promise<void> => {
  await payload.delete({
    collection: 'spaces',
    where: {},
  })
  await payload.delete({
    collection: 'users',
    where: {},
  })

  const affSpace = await payload.create({
    collection: 'spaces',
    data: {
      title: 'aff',
    },
  })

  const partnerSpace = await payload.create({
    collection: 'spaces',
    data: {
      title: 'partners',
    },
  })

  const womenSpace = await payload.create({
    collection: 'spaces',
    data: {
      title: 'women_safe_space',
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Super Admin',
      email: 'saisilinus19@gmail.com',
      password: 'test',
      role: 'admin',
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'AFF Editor',
      email: 'aff@gmail.com',
      password: 'test',
      role: 'editor',
      space: affSpace.id,
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Partner Editor',
      email: 'partner@gmail.com',
      password: 'test',
      role: 'editor',
      space: partnerSpace.id,
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Women Safe Space Editor',
      email: 'curator@gmail.com',
      password: 'test',
      role: 'editor',
      space: womenSpace.id,
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Fellow',
      email: 'fellow@gmail.com',
      password: 'test',
      role: 'fellow',
      space: affSpace.id,
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Partner',
      email: 'partner2@gmail.com',
      password: 'test',
      role: 'partner',
      space: partnerSpace.id,
      isApproved: true,
    },
  })

  await payload.create({
    collection: 'users',
    data: {
      name: 'Curator',
      email: 'curator2@gmail.com',
      password: 'test',
      role: 'curator',
      space: womenSpace.id,
      isApproved: true,
    },
  })
}
