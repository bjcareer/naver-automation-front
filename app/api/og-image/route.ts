import { NextRequest, NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
      redirect: 'follow',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    let imageUrl = $('meta[property="og:image"]').attr('content')

    if (!imageUrl) {
      imageUrl = $('meta[name="twitter:image"]').attr('content')
    }

    if (!imageUrl) {
      imageUrl = $('img').first().attr('src')
    }

    if (!imageUrl) {
      return NextResponse.json({ error: 'No image found' }, { status: 404 })
    }

    if (imageUrl.startsWith('//')) {
      imageUrl = `https:${imageUrl}`
    } else if (imageUrl.startsWith('/')) {
      const baseUrl = new URL(url)
      imageUrl = `${baseUrl.origin}${imageUrl}`
    }

    return NextResponse.json({ imageUrl })
  } catch (error) {
    console.error('Error fetching OG image:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch image' },
      { status: 500 }
    )
  }
}
