import { beforeAll, afterEach, afterAll } from 'vitest'

// Mock Firebase
beforeAll(() => {
  // Mock Firebase functions
  global.fetch = vi.fn()
})

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  vi.restoreAllMocks()
})
