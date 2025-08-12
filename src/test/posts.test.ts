import { describe, it, expect } from 'vitest'

describe('Post Creation', () => {
  it('should validate post content', () => {
    const isValidPostContent = (content: string) => {
      return content.trim().length > 0 && content.length <= 2000
    }

    expect(isValidPostContent('Hello world!')).toBe(true)
    expect(isValidPostContent('')).toBe(false)
    expect(isValidPostContent('   ')).toBe(false)
    expect(isValidPostContent('a'.repeat(2001))).toBe(false)
  })

  it('should validate image URL format', () => {
    const isValidImageUrl = (url: string) => {
      if (!url) return true // Optional field
      try {
        const urlObj = new URL(url)
        return urlObj.protocol === 'http:' || urlObj.protocol === 'https:'
      } catch {
        return false
      }
    }

    expect(isValidImageUrl('')).toBe(true)
    expect(isValidImageUrl('https://example.com/image.jpg')).toBe(true)
    expect(isValidImageUrl('http://example.com/image.png')).toBe(true)
    expect(isValidImageUrl('invalid-url')).toBe(false)
    expect(isValidImageUrl('ftp://example.com/image.jpg')).toBe(false)
  })

  it('should format time ago correctly', () => {
    const formatTimeAgo = (date: Date) => {
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
      
      if (diffInSeconds < 60) return 'Just now'
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
      return `${Math.floor(diffInSeconds / 86400)}d ago`
    }

    const now = new Date()
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    expect(formatTimeAgo(new Date(now.getTime() - 30 * 1000))).toBe('Just now')
    expect(formatTimeAgo(oneMinuteAgo)).toBe('1m ago')
    expect(formatTimeAgo(oneHourAgo)).toBe('1h ago')
    expect(formatTimeAgo(oneDayAgo)).toBe('1d ago')
  })
})
