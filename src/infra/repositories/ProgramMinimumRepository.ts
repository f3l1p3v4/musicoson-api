import { prisma } from '../../infra/orm/PrismaClient'
import { ProgramMinimum } from '@prisma/client'
import { IProgramMinimumRepository } from '../../application/interfaces/IProgramMinimumRepository'
import { CreateProgramMinimumDTO } from '../../application/dtos/CreateProgramMinimumDTO'

export class ProgramMinimumRepository implements IProgramMinimumRepository {
  async create(
    data: CreateProgramMinimumDTO,
    instructorId: string,
  ): Promise<ProgramMinimum> {
    const existingProgramMinimum = await prisma.programMinimum.findFirst({
      where: {
        instrument: data.instrument,
        meetings: {
          every: {
            name: {
              in: data.meetings?.map((meeting) => meeting.name) || [],
            },
          },
        },
        cults: {
          every: {
            name: {
              in: data.cults?.map((cult) => cult.name) || [],
            },
          },
        },
        officialization: {
          every: {
            name: {
              in:
                data.officialization?.map(
                  (officialization) => officialization.name,
                ) || [],
            },
          },
        },
      },
    })

    if (existingProgramMinimum) {
      throw new Error('Datas already exists')
    }

    return await prisma.programMinimum.create({
      data: {
        instrument: data.instrument || '',
        meetings: {
          create:
            data.meetings?.map((meeting) => ({
              name: meeting.name,
            })) || [],
        },
        cults: {
          create:
            data.cults?.map((cult) => ({
              name: cult.name,
            })) || [],
        },
        officialization: {
          create:
            data.officialization?.map((officialization) => ({
              name: officialization.name,
            })) || [],
        },
        instructorId,
      },
    })
  }

  async findAll(): Promise<ProgramMinimum[]> {
    return await prisma.programMinimum.findMany({
      include: {
        meetings: true,
        cults: true,
        officialization: true,
      },
    })
  }

  async update(
    id: string,
    data: Partial<CreateProgramMinimumDTO>,
  ): Promise<ProgramMinimum> {
    return await prisma.programMinimum.update({
      where: { id },
      data: {
        instrument: data.instrument || '', // Garantir que o valor seja uma string
        meetings: data.meetings
          ? {
              deleteMany: {}, // Deleta todos os meetings antigos
              create: data.meetings.map((meeting) => ({
                name: meeting.name,
              })),
            }
          : undefined,
        cults: data.cults
          ? {
              deleteMany: {}, // Deleta todos os cults antigos
              create: data.cults.map((cult) => ({
                name: cult.name,
              })),
            }
          : undefined,
        officialization: data.officialization
          ? {
              deleteMany: {}, // Deleta todas as officializations antigas
              create: data.officialization.map((officialization) => ({
                name: officialization.name,
              })),
            }
          : undefined,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.programMinimum.delete({
      where: { id },
    })
  }

  async findById(id: string): Promise<ProgramMinimum | null> {
    return await prisma.programMinimum.findUnique({
      where: { id },
    })
  }
}
