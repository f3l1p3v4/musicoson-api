export interface Task {
  id: string
  title: string
  description: string
  observation?: string
  delivery_date?: Date
  status: 'PENDING' | 'COMPLETED'
  category: 'MSA' | 'METODO' | 'HINOS'
  instructorId: string
  studentId?: string
  group?: 'GROUP_01' | 'GROUP_02' | 'GROUP_03' | 'GROUP_04'
  createdAt: Date
  updatedAt: Date
}
