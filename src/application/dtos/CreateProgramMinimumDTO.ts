export interface CreateProgramMinimumDTO {
  instrument?: string
  meetings?: { name: string }[]
  cults?: { name: string }[]
  officialization?: { name: string }[]
}
